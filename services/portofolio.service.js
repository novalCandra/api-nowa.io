import prisma from "../lib/prisma.js";
export const getAllPortofolioServices = async () => {
    const portofolio = await prisma.portofolio.findMany({
        include: { admin: true }
    })

    return portofolio
}

export const getDetailPorfolioServices = async (id) => {
    const porfolioDetail = await prisma.portofolio.findUnique({
        where: { id: Number(id) }
    })
    if (!porfolioDetail) {
        const errors = new Error("portofolio not Found");
        errors.statusCode = 404;
        throw errors
    }
    return porfolioDetail;
}


export const createPortofolioServices = async ({ nama, deskripsi, link_portofolio, adminId, file }) => {
    let imageUrl;
    if (file) {
        imageUrl = `/public/image/${file.filename}`
    }
    const createPortofolio = await prisma.portofolio.create({
        data: {
            nama, deskripsi, link_portofolio, imageUrl, adminId
        },
        include: { admin: true }
    })

    return createPortofolio;
}

export const updatePortofolioServices = async ({ id, nama, deskripsi, link_portofolio, adminId, file }) => {
    let imageUrl;
    if (file) {
        imageUrl = `/public/image/${file.filename}`
    }
    const updatePortofolio = await prisma.portofolio.update({
        where: {
            id: Number(id)
        },
        data: {
            nama, deskripsi, link_portofolio, adminId, ...(imageUrl && { imageUrl })
        },
        include: { admin: true }
    })

    return updatePortofolio;
}

export const deletePortofolioServices = async (id) => {
    await prisma.portofolio.delete({
        where: { id: Number(id) }
    })
}