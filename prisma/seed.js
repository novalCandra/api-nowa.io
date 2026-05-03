import { PrismaClient } from '../generated/prisma/index.js';
import 'dotenv/config'
import { createSeederAdmin } from "./seed/dataAdminSeeder.js";
import { SeederBerita } from './seed/beritaSeeder.js';
import { LayananaSeeder } from './seed/layananSeeder.js';
import { PortofolioSeeder } from './seed/portofolioSeeder.js';
const prisma = new PrismaClient();
export async function main() {
    try {
        console.log("Creating Seeder Data 🛠️")
        let users = [];
        let beritas = [];
        let layanans = [];
        let portofolios = [];
        for (let i = 0; i < 1; i++) {
            const admin = await prisma.admin.create({
                data: await createSeederAdmin()
            })
            users.push(admin)
        }
        for (let i = 0; i < 5; i++) {
            const berita = await prisma.berita.create({
                data: {
                    ...SeederBerita(users),
                    adminId: users[0].id
                }
            })
        }

        for (let i = 0; i < 5; i++) {
            const layanan = await prisma.layanan.create({
                data: {
                    ...LayananaSeeder(users),
                    adminId: users[0].id
                }
            })
        }

        for (let i = 0; i < 5; i++) {
            const portololio = await prisma.portofolio.create({
                data: {
                    ...PortofolioSeeder(users),
                    adminId: users[0].id
                }
            })
        }
        console.log("Success Seeder Data ✅")
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect();
    }
}

main();