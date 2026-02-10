const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class AuthenticateUser {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ username, password }) {
        if (!username || !password) {
            throw new Error("Username and password are required")
        }

        const user = await this.userRepository.findByUsername(username)
        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        }
    }
}

module.exports = AuthenticateUser