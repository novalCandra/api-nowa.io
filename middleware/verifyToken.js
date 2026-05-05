import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const verifyToken = async (req, res, next) => {
    const secretKey = process.env.SECRET_KEY_JWT;
    if (!secretKey) {
        return res.status(500).json({
            message: "JWT secret not configured"
        });
    }
    if (!req?.headers.authorization?.startsWith("JWT ")) {
        return res.status(401).json({ status: false, message: "Unauthorized, no token" });
    }
    try {
        if (req?.headers.authorization?.startsWith("JWT ")) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, secretKey)
            const users = await prisma.admin.findUnique({
                where: {
                    id: decoded.id
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true
                }
            })

            if (!users) {
                return res.status(403).json({
                    status: false,
                    message: "The Token is Invalid"
                })
            }
            req.users = {
                id: users.id.toString(),
                name: users.name,
                email: users.email,
                role: users.role
            }
            req.admin = decoded;
            next();
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal error Server"
        })
    }
}