const IUserRepository = require("../../../../domain/users/repositories/IUserRepository")
const UserModel = require("../models/UserModel")
const User = require("../../../../domain/users/entities/User")

class MongoUserRepository extends IUserRepository {
    async create(user) {
        const userDoc = await UserModel.create({
            username: user.username,
            password: user.password,
            role: user.role
        })

        return new User({
            id: userDoc._id.toString(),
            username: userDoc.username,
            password: userDoc.password,
            role: userDoc.role,
            createdAt: userDoc.createdAt
        })
    }

    async findByUsername(username) {
        const userDoc = await UserModel.findOne({ username })

        if (!userDoc) return null

        return new User({
            id: userDoc._id.toString(),
            username: userDoc.username,
            password: userDoc.password,
            role: userDoc.role,
            createdAt: userDoc.createdAt
        })
    }

    async findById(id) {
        const userDoc = await UserModel.findById(id)

        if (!userDoc) return null

        return new User({
            id: userDoc._id.toString(),
            username: userDoc.username,
            password: userDoc.password,
            role: userDoc.role,
            createdAt: userDoc.createdAt
        })
    }
}

module.exports = MongoUserRepository