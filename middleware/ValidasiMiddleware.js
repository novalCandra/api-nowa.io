import { ZodError } from "zod"

export const ValidasiMiddeleware = (schema) => async (req, res, next) => {
    try {
        schema.parse(req.body)
        return next()
    } catch (error) {
        if (error instanceof ZodError) {
            const erros = error.issues.map((err) => err.message)
            return res.status(500).json({
                error: "Invalid Request",
                details: erros
            })
        }
        return res.status(500).json({
            status: false,
            message: "Internal Serve Error"
        })
    }
}