import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const logIn = {
	path: "/api/login",
	method: "post",
	handler: async (req, res) => {
		const { email, password } = req.body;
		const db = getDbConnection("react-auth-db");
		const user = await db.collection("Users").findOne({ email });
		if (!user) {
			res.sendStatus(401);
		}
		const { _id: id, hashPassword, info, isVerified } = user;
		const passwordIsCorrect = await bcrypt.compare(password, hashPassword);
		if (passwordIsCorrect) {
			jwt.sign(
				{ id, isVerified, info, email },
				process.env.JWT_SECRET,
				{ expiresIn: "2d" },
				(err, token) => {
					if (err) {
						res.status(500).json(err);
					}
					res.status(200).json({ token });
				}
			);
		} else {
			res.sendStatus(401);
		}

		// const hashPassword = await bcrypt.hash(password, 10);
		// const basicInfo = {
		// 	hairColor: "",
		// 	bio: "",
		// 	favouriteFood: "",
		// };
		// const createNewUser = await db.collection("Users").insertOne({
		// 	email,
		// 	hashPassword,
		// 	info: basicInfo,
		// 	isVerified: false,
		// });
		// const { insertedId } = createNewUser;
		// jwt.sign(
		// 	{ id: insertedId, email, info: basicInfo, isVerified: false },
		// 	process.env.JWT_SECRET,
		// 	{ expiresIn: "2d" },
		// 	(err, token) => {
		// 		if (err) {
		// 			return res.status(500).send(err);
		// 		}
		// 		res.status(200).json({token});
		// 	}
		// );
	},
};
