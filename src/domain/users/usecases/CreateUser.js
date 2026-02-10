const bcrypt = require("bcryptjs")
const User = require("../entities/User")

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ username, password }) {
        if (!username || !password) {
            throw new Error("Username and password are required")
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters")
        }

        const existingUser = await this.userRepository.findByUsername(username)
        if (existingUser) {
            throw new Error("Username already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            password: hashedPassword,
            role: "student"
        })

        const createdUser = await this.userRepository.create(user)

        return {
            id: createdUser.id,
            username: createdUser.username,
            role: createdUser.role,
            createdAt: createdUser.createdAt
        }
    }
}

module.exports = CreateUser