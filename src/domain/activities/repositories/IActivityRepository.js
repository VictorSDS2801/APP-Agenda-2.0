class IActivityRepository {
    async create(activity) {
        throw new Error("Method create() must be implemented")
    }

    async findById(id) {
        throw new Error("Method findById() must be implemented")
    }

    async findAll(filters) {
        throw new Error("Method findAll() must be implemented")
    }

    async update(id, activity) {
        throw new Error("Method update() must be implemented")
    }

    async delete(id) {
        throw new Error("Method delete() must ne implemented")
    }
}

module.exports = IActivityRepository