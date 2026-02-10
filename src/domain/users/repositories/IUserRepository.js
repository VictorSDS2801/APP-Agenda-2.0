class IUserRepository {
    async create(user) {
        throw new Error("Method create() must be implemented")
    }

    async findByUsername(username) {
        throw new Error("Method findByUsername() must be implemented")
    }

    async findById(id) {
        throw new Error("Method findById() must be implemented")
    }
}

module.exports = IUserRepository