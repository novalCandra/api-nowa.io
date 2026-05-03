import { faker } from "@faker-js/faker"

export function PortofolioSeeder(users) {
    if (!users || users.length === 0) {
        throw new Error("Users array is empty or undefined")
    }

    const randomIndex = Math.floor(Math.random() * users.length)
    const selectedUser = users[randomIndex]

    if (!selectedUser || !selectedUser.id) {
        throw new Error("Selected user is invalid")
    }
    return {
        nama: faker.lorem.slug(),
        deskripsi: faker.lorem.text().slice(0, 150),
        imageUrl: faker.image.avatarGitHub(),
        link_portofolio: 'https://v10.fakerjs.dev/about/roadmap/v6.html#v6-1-first-bugfixes',
        adminId: selectedUser.id
    }
}