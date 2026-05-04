import { createPortofolioServices, deletePortofolioServices, getAllPortofolioServices, getDetailPorfolioServices, updatePortofolioServices } from "../services/portofolio.service.js";
export const AllPortofolio = async (req, res) => {
    try {
        const data = await getAllPortofolioServices();
        return res.status(200).json({ status: true, message: "Success All portofolio", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const detailPortofolio = async (req, res) => {
    try {
        const data = await getDetailPorfolioServices(req.params.id)
        return res.status(200).json({ status: true, message: "Success Details portofolio", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const createPortofolio = async (req, res) => {
    try {
        const adminId = req.admin?.id;
        if (!adminId) {
            return res.status(401).json({ status: false, message: "Unauthorized" })
        }
        const { nama, deskripsi, link_portofolio } = req.body;
        const data = await createPortofolioServices({ nama, deskripsi, link_portofolio, adminId, file: req.file });
        return res.status(201).json({ status: true, message: "Success Create Portofolio", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const updatePortofolio = async (req, res) => {
    try {

        const adminId = req.admin?.id;
        if (!adminId) {
            return res.status(401).json({ status: false, message: "Unauthorized" })
        }
        const { nama, deskripsi, link_portofolio } = req.body;
        const data = await updatePortofolioServices({ id: req.params.id, nama, deskripsi, adminId, file: req.file })
        return res.status(200).json({ status: true, message: "Success Update Portofolio", data })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}

export const deletePortofolio = async (req, res) => {
    try {
        await deletePortofolioServices(req.params.id);
        return res.status(200).json({ status: true, message: "Success Portofolio Delete" })
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ status: false, message: error.message })
    }
}