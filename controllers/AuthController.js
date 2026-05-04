import { LoginSevices } from "../services/auth.service.js";
export const ControllerLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const { admin, token } = await LoginSevices({ email, password })

        return res.status(200).json({
            status: true,
            message: "Login success",
            data: admin,
            token
        });

    } catch (error) {
        const statusCode = error.statusCode ?? 500;
        return res.status(statusCode).json({
            status: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const ControllerLogout = async (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Success Logout"
    })
}