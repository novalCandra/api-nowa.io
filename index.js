import path from 'path';
import { fileURLToPath } from "url"
import express from 'express';
import dotenv from "dotenv";
import AuthRouter from './router/AuthRouter.js';
import PortofolioRouter from './router/PortofolioRouter.js';
import BeritaRouter from './router/BeritaRouter.js';
import LayananRouter from './router/layananRouter.js';
import cors from "cors"
const app = express();
const port = 2000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.send('Express NOWA')
});
app.use("/api", AuthRouter)
app.use("/api", PortofolioRouter)
app.use("/api", BeritaRouter)
app.use("/api", LayananRouter)
app.listen(port, () => {
    console.log(`BE PORT : ${port}`)
})