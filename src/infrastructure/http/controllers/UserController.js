const CreateUser = require("../../../domain/users/usecases/CreateUser")
const AuthenticateUser = require("../../../domain/users/usecases/AuthenticateUser")
const MongoUserRepository = require("../../database/mongoose/repositories/MongoUserRepository")

class UserController {
    constructor() {
        this.userRepository = new MongoUserRepository()
    }

    async register(req, res) {
        try {
            const { username, password } = req.body

            const createUser = new CreateUser(this.userRepository)
            const user = await createUser.execute({ username, password })

            return res.status(201).json({ message: "User created sucessfully", user})

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body

            const authenticateUser = new AuthenticateUser(this.userRepository)
            const result = await authenticateUser.execute({ username, password })

            return res.status(200).json(result)
        } catch (error) {
            return res.status(401).json({ error: error.message})
        } 
    }
}

module.exports = UserController