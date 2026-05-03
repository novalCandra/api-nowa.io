import { AllgetLayananServices, createLayananServices, deleteLayananServices, layananDetailServices, updateLayananServices } from "../services/layanan.service.js";

export const allGetLayanan = async (req, res) => {
    try {
        const data = await AllgetLayananServices();
        return res.status(200).json({ status: true, message: "Success All Layanan", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}
export const layananDetail = async (req, res) => {
    try {
        const data = await layananDetailServices(req.params.id);
        return res.status(200).json({ status: true, message: "Success Details Layanan", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}
export const postLayanan = async (req, res) => {
    try {
        const adminId = req.admin?.id;
        if (!adminId) {
            return res.status(401).json({ status: false, message: "Unauthorized" })
        }
        const { nama, deskripsi } = req.body;
        const data = await createLayananServices({ nama, deskripsi, adminId });
        return res.status(201).json({ status: true, message: "Success Create Layanan Data", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}
export const updateLayanan = async (req, res) => {
    try {
        const { nama, deskripsi } = req.body;
        const data = await updateLayananServices({ id: req.params.id, nama, deskripsi });
        return res.status(200).json({ status: true, message: "Success Create Layanan Data", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}
export const deleteLayanan = async (req, res) => {
    try {
        await deleteLayananServices(req.params.id);
        return res.status(200).json({ status: true, message: "Success Berita Delete" })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}