import multer from "multer";
import path from "path";

// Storage link
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName)
    }
})

export const upload = multer({ storage })