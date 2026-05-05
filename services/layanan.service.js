import prisma from "../lib/prisma.js";
export const AllgetLayananServices = async () => {
    const layanan = await prisma.layanan.findMany({
        include: { admin: true }
    })
    return layanan
}

export const layananDetailServices = async (id) => {
    const detailLayanan = await prisma.layanan.findUnique({
        where: { id: Number(id) },
        include: { admin: true }
    });

    if (!detailLayanan) {
        const erros = new Error("Layana Not Found");
        erros.statusCode = 404;
        throw erros
    };
    return detailLayanan
}

export const createLayananServices = async ({ nama, deskripsi, adminId }) => {
    const createLayanan = await prisma.layanan.createMany({
        data: {
            nama, deskripsi, adminId
        },
        include: { admin: true }
    })
    return createLayanan;
}


export const updateLayananServices = async ({ id, nama, deskripsi, adminId }) => {
    const updateLayanan = await prisma.layanan.update({
        where: {
            id: Number(id)
        },
        data: {
            nama, deskripsi
        },
        include: { admin: true }
    })

    return updateLayanan;
}


export const deleteLayananServices = async (id) => {
    await prisma.layanan.delete({
        where: { id: Number(id) }
    })
}