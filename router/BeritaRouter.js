import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { createBerita, deleteBerita, getAllBerita, getDetailsData, updateBerita } from "../controllers/BeritaController.js";
import { ValidasiMiddeleware } from "../middleware/ValidasiMiddleware.js";
import { SchemaBerita } from "../utils/Schema.js";
import { upload } from "../utils/multer.js";
const BeritaRouter = express.Router();
BeritaRouter.get("/berita", verifyToken, getAllBerita);
BeritaRouter.get("/berita/:id", verifyToken, getDetailsData);
BeritaRouter.post("/berita", upload.single("imageUrl"), verifyToken, ValidasiMiddeleware(SchemaBerita), createBerita);
BeritaRouter.put("/berita/:id", upload.single("imageUrl"), verifyToken, ValidasiMiddeleware(SchemaBerita), updateBerita);
BeritaRouter.delete("/berita/:id", verifyToken, deleteBerita);
export default BeritaRouter;