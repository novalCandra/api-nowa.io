import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
export const LoginSevices = async ({ email, password }) => {

    const admin = await prisma.admin.findUnique({
        where: { email }
    });

    if (!admin) {
        const error = new Error("Email not Found");
        error.statusCode = 403;
        throw error
    };

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
        const error = new Error("Wrong password");
        error.statusCode = 401
        throw error;
    }

    const { password: _, ...safeAdmin } = admin;

    const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "1d" }
    );

    return { admin: safeAdmin, token }
}