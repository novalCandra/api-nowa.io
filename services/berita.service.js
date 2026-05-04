import prisma from "../lib/prisma.js"
export const getAllBeritaServices = async () => {
    const berita = await prisma.berita.findMany({
        include: { admin: true }
    })
    return berita;
}

export const getDetailBeritaServices = async (id) => {
    const berita = await prisma.berita.findUnique({
        where: { id: Number(id) }
    })
    if (!berita) {
        const errros = new Error("Berita Not Found")
        errros.statusCode = 404;
        throw errros
    }

    return berita
}

export const createBeritaServices = async ({ judul, deskripsi, tanggal, adminId, file }) => {
    let imageUrl;
    if (file) {
        imageUrl = `/public/image/${file.filename}`
    }
    const berita = await prisma.berita.create({
        data: {
            judul,
            deskripsi,
            imageUrl,
            tanggal: new Date(tanggal),
            adminId
        },
        include: { admin: true }
    })

    return berita
}

export const updateBeritaServices = async ({ id, judul, deskripsi, tanggal, adminId, file }) => {
    let imageUrl;
    if (file) {
        imageUrl = `/public/image/${file.filename}`
    }
    const berita = await prisma.berita.update({
        where: {
            id: Number(id)
        },
        data: {
            judul,
            deskripsi,
            tanggal: new Date(tanggal),
            ...(imageUrl && { imageUrl })
        },
        include: { admin: true }
    })
    return berita
}

export const deleteBeritaService = async (id) => {
    await prisma.berita.delete({
        where: { id: Number(id) }
    })
}