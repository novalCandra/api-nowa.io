import z, { email } from "zod";

export const SchemaAuthLogin = z.object({
    email: z.string().email(),
    password: z.string()
})

export const SchemaPortofolio = z.object({
    nama: z.string(),
    deskripsi: z.string(),
    link_portofolio: z.string().optional(),
})

export const SchemaBerita = z.object({
    judul: z.string(),
    deskripsi: z.string(),
    tanggal: z.coerce.date({
        errorMap: () => ({ message: "Format tanggal tidak valid" })
    })
})

export const SchemaLayanan = z.object({
    nama: z.string(),
    deskripsi: z.string()
})