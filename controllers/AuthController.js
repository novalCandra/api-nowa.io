import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();
export const ControllerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await prisma.admin.findUnique({
            where: { email }
        })

        if (!admin) {
            return res.status(403).json({
                status: false,
                message: "email and passord no database"
            })
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            return res.status(401).json({
                status: false,
                message: "Wrong Password"
            })
        }
        const { password: _, ...safeAdmin } = admin;

        const token = jwt.sign(
            { id: admin?.id, email: admin?.email, },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "1d" }
        )
        return res.status(201).json({
            status: true,
            message: "Login Success",
            data: admin,
            token: token
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Error Server"
        })
    }
}

export const ControllerLogout = async (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Success Logout"
    })
}