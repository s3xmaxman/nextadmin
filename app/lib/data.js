import { User } from "./models"
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");
    const limitPage = 2;
    try {
        connectToDB();
        const users = await User.find({ username: { $regex: regex }}).limit(limitPage).skip((page - 1) * limitPage);
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}