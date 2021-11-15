import { getDbConnection } from "../db";
import { ObjectID } from "mongodb";
import jwt from "jsonwebtoken";

export const updateUserInfoRoute = {
	path: "/api/Users/:userId",
	method: "put",
	handler: async (req, res) => {
		const { authorization } = req.headers;
		const { userId } = req.params;
		const updates = ({ favouriteFood, hairColor, bio }) =>
			({
				favouriteFood,
				hairColor,
				bio,
			}(req.body));
		if (!authorization) {
			res.status(401).json({ message: "No Authorization Header Found" });
		}
		const token = authorization.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedJSON) => {
			if (err)
				return res.status(401).json({ message: "Unable to verify Token" });
			const { id } = decodedJSON;
			if (id !== userId)
				return res
					.status(403)
					.json({ message: "Not allowed to update this users Data" });
			const db = getDbConnection("react-auth-db");
			const result = await db
				.collection("Users")
				.findOneAndUpdate(
					{ _id: ObjectID(id) },
					{ $set: { info: updates } },
					{ returnOriginal: false }
				);
			const { email, isVerified, info } = result.value;
			jwt.sign(
				{ id, email, isVerified, info },
				process.env.JWT_SECRET,
				{ expiresIn: "2d" },
				(err, token) => {
					if (err) return res.status(200).json(err);
					res.status(200).json({ token });
				}
			);
		});
	},
};
