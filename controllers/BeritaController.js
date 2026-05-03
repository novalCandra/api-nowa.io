import { PrismaClient } from "../generated/prisma/index.js"
const prisma = new PrismaClient();
export const getAllBerita = async (req, res) => {
    try {
        const AllBerita = await prisma.berita.findMany({
            include: {
                admin: true
            }
        });

        if (!AllBerita) {
            return res.status(401).json({
                status: false,
                message: "Not Gell All Berita"
            })
        } else {
            return res.status(201).json({
                status: true,
                message: "Success All Berita",
                data: AllBerita
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            messahge: "Internal Error Serve"
        })
    }
}
export const getDetailsData = async (req, res) => {
    try {
        const { id } = req.params;
        const detailBarang = await prisma.berita.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!detailBarang) {
            return res.status(401).json({
                status: false,
                message: "Not Gell Detail Berita"
            })
        } else {
            return res.status(201).json({
                status: true,
                message: "Success Delails Berita",
                data: detailBarang
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            messahge: "Internal Error Serve"
        })
    }
}

export const createBerita = async (req, res) => {
    try {
        const { judul, deskripsi, tanggal } = req.body;
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

        const UpdateBerita = await prisma.berita.create({
            data: {
                judul, deskripsi, imageUrl, tanggal: new Date(tanggal), adminId: adminId.id
            },
            include: {
                admin: true
            }
        });

        if (!UpdateBerita) {
            return res.status(403).json({
                status: false,
                message: "Not Update berita"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Success Update Berita",
                data: UpdateBerita
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

export const updateBerita = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, deskripsi, tanggal } = req.body;
        let imageUrl;
        const file = req.file;
        if (file) {
            imageUrl = `/public/image/${file.filename}`
        }

        const updatePortofolio = await prisma.berita.update({
            where: {
                id: Number(id)
            },
            data: {
                judul, deskripsi, imageUrl, tanggal: new Date(tanggal),
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
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteBerita = async (req, res) => {
    try {
        const { id } = req.params;
        const AllBerita = await prisma.berita.delete({
            where: {
                id: Number(id)
            }
        });
        if (!AllBerita) {
            return res.status(401).json({
                status: false,
                message: "Not Gell Delete Berita"
            })
        } else {
            return res.status(201).json({
                status: true,
                message: "Success Delete Berita"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            messahge: "Internal Error Serve"
        })
    }
}