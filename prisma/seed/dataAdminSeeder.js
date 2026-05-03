import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"
export async function createSeederAdmin() {
    return {
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password', 10),
        role: 'admin'
    }
}