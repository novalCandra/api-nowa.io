import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { allGetLayanan, deleteLayanan, layananDetail, postLayanan, updateLayanan } from "../controllers/LayananController.js";
import { ValidasiMiddeleware } from "../middleware/ValidasiMiddleware.js";
import { SchemaLayanan } from "../utils/Schema.js";
import { upload } from "../utils/multer.js";

const LayananRouter = express.Router();
LayananRouter.get("/layanan", allGetLayanan)
LayananRouter.get("/layanan/:id", layananDetail)
LayananRouter.post("/layanan", verifyToken, postLayanan)
LayananRouter.put("/layanan/:id", verifyToken, upload.none(), ValidasiMiddeleware(SchemaLayanan), updateLayanan)
LayananRouter.delete("/layanan/:id", verifyToken, deleteLayanan)
export default LayananRouter;