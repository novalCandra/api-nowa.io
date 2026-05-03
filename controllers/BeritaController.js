import { createBeritaServices, deleteBeritaService, getAllBeritaServices, getDetailBeritaServices, updateBeritaServices } from "../services/berita.service.js";
export const getAllBerita = async (req, res) => {
    try {
        const data = await getAllBeritaServices();
        return res.status(200).json({ status: true, message: "Success All Berita", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const getDetailsData = async (req, res) => {
    try {
        const data = await getDetailBeritaServices(req.params.id);
        return res.status(200).json({ status: true, message: "Success Detail Berita", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const createBerita = async (req, res) => {
    try {
        const adminId = req.admin?.id
        if (!adminId) {
            return res.status(401).json({ status: false, message: "Unauthorized" })
        }
        const { judul, deskripsi, tanggal } = req.body;
        const data = await createBeritaServices({ judul, deskripsi, tanggal, adminId, file: req.file });
        return res.status(201).json({ status: true, message: "Success Create Berita", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const updateBerita = async (req, res) => {
    try {
        const { judul, deskripsi, tanggal } = req.body;
        const data = await updateBeritaServices({ id: req.params.id, judul, deskripsi, tanggal, file: req.file });
        return res.status(200).json({ status: true, message: "Success Update Berita", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const deleteBerita = async (req, res) => {
    try {
        await deleteBeritaService(req.params.id);
        return res.status(200).json({ status: true, message: "Success Berita Delete" })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}