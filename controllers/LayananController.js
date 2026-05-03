import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const allGetLayanan = async (req, res) => {
    try {
        const getAllLayanana = await prisma.layanan.findMany({
            include: {
                admin: true
            }
        });
        if (!getAllLayanana) {
            return res.status(401).json({
                status: false,
                message: "Not Get All Layanan"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success All Layanan",
                data: getAllLayanana
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}
export const layananDetail = async (req, res) => {
    try {
        let { id } = req.params;
        const layananDetails = await prisma.layanan.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                admin: true
            }
        })
        if (!layananDetail) {
            return res.status(401).json({
                status: false,
                message: "Not Get Details Layanan"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success Detail Layanan",
                data: layananDetails
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}
export const postLayanan = async (req, res) => {
    try {
        const { nama, deskripsi } = req.body;
        const adminId = req.admin;
        const createLayanan = await prisma.layanan.create({
            data: {
                nama,
                deskripsi,
                adminId: adminId.id
            },
            include: {
                admin: true
            }
        })

        if (!createLayanan) {
            return res.status(402).json({
                status: false,
                message: "Not Create Layanan"
            })
        } else {
            return res.status(201).json({
                status: true,
                message: "Create Success Layanan",
                data: createLayanan
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}
export const updateLayanan = async (req, res) => {
    try {
        const body = req.body;
        const adminId = req.admin;
        let { id } = req.params
        const updateLayanan = await prisma.layanan.update({
            where: {
                id: Number(id)
            },
            data: {
                nama: body.nama,
                deskripsi: body.deskripsi,
                adminId: adminId.id
            },
            include: {
                admin: true
            }
        })

        if (!updateLayanan) {
            return res.status(402).json({
                status: false,
                message: "Not Update Layanan"
            })
        } else {
            return res.status(201).json({
                status: true,
                message: "Create Update Success Layanan",
                data: updateLayanan
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteLayanan = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteLayanans = await prisma.layanan.delete({
            where: {
                id: Number(id)
            },
            include: {
                admin: true
            }
        })
        if (!deleteLayanans) {
            return res.status(401).json({
                status: false,
                message: "Not Delete Layanan"
            })
        } else {
            return res.status(201).json({
                status: true,
                message: "Success Delete Layanan",
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}