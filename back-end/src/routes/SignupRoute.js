import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpRoute = {
	path: "/api/signup",
	method: "post",
	handler: async (req, res) => {
		const { email, password } = req.body;
		const db = getDbConnection("react-auth-db");
		const user = await db.collection("Users").findOne({ email });
		if (user) {
			res.sendStatus(409);
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const basicInfo = {
			hairColor: "",
			bio: "",
			favouriteFood: "",
		};
		const createNewUser = await db.collection("Users").insertOne({
			email,
			hashPassword,
			info: basicInfo,
			isVerified: false,
		});
		const { insertedId } = createNewUser;
		jwt.sign(
			{ id: insertedId, email, info: basicInfo, isVerified: false },
			process.env.JWT_SECRET,
			{ expiresIn: "2d" },
			(err, token) => {
				if (err) {
					return res.status(500).send(err);
				}
				res.status(200).json({token});
			}
		);
	},
};
