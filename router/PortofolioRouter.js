import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { AllPortofolio, createPortofolio, deletePortofolio, detailPortofolio, updatePortofolio } from "../controllers/PortofolioController.js";
import { ValidasiMiddeleware } from "../middleware/ValidasiMiddleware.js";
import { SchemaPortofolio } from "../utils/Schema.js";
import { upload } from "../utils/multer.js";

const PortofolioRouter = express.Router();

PortofolioRouter.get("/portofolio", AllPortofolio)
PortofolioRouter.post("/portofolio", verifyToken, upload.single("imageUrl"), createPortofolio)
PortofolioRouter.get("/portofolio/:id", detailPortofolio)
PortofolioRouter.put("/portofolio/:id", verifyToken, upload.single("imageUrl"), ValidasiMiddeleware(SchemaPortofolio), updatePortofolio)
PortofolioRouter.delete("/portofolio/:id", verifyToken, deletePortofolio)
export default PortofolioRouter;