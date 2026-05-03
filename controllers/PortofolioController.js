import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const AllPortofolio = async (req, res) => {
    try {
        const allPortofolio = await prisma.portofolio.findMany({
            include: {
                admin: true
            }
        });
        if (!allPortofolio) {
            return res.status(403).json({
                status: false,
                message: "Not GET Porfolio"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success All GET Portofolio",
                data: allPortofolio
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const detailPortofolio = async (req, res) => {
    try {
        const { id } = req.params;
        const detailPortofolio = await prisma.portofolio.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                admin: true
            }
        })

        if (!detailPortofolio) {
            return res.status(403).json({
                status: false,
                message: "Not GET Details Porfolio"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success GET Details Portofolio",
                data: detailPortofolio
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const createPortofolio = async (req, res) => {
    try {
        const { nama, deskripsi, link_portofolio } = req.body;
        // Middleware auth
        const adminId = req.admin;
        if (!adminId || !adminId.id) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized: Admin data not found"
            });
        }
        const file = req.file;
        let imageUrl = null;

        if (file) {
            imageUrl = `/public/image/${file.filename}`
        }

        const CreatePortofolio = await prisma.portofolio.create({
            data: {
                nama, deskripsi, imageUrl, link_portofolio, adminId: adminId.id
            },
            include: {
                admin: true
            }
        });

        if (!CreatePortofolio) {
            return res.status(403).json({
                status: false,
                message: "Not Create Porfolio"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success Create Portofolio",
                data: CreatePortofolio
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const updatePortofolio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, deskripsi, link_portofolio } = req.body;
        let imageUrl;
        const file = req.file;
        if (file) {
            imageUrl = `/public/image/${file.filename}`
        }

        const updatePortofolio = await prisma.portofolio.update({
            where: {
                id: Number(id)
            },
            data: {
                nama, deskripsi, link_portofolio,
                ...(imageUrl && { imageUrl })
            },
            include: {
                admin: true
            }
        })

        if (!updatePortofolio) {
            return res.status(403).json({
                status: false,
                message: "Not Update Porfolio"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success Update Portofolio",
                data: updatePortofolio
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const deletePortofolio = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePortofolio = await prisma.portofolio.delete({
            where: {
                id: Number(id)
            }
        })
        if (!deletePortofolio) {
            return res.status(403).json({
                status: false,
                message: "Not DELETE Porfolio"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success DELETE Portofolio",
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