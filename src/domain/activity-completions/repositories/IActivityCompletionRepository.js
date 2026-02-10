class IActivityCompletionRepository {
    async findByStudentAndActivity(studentId, activityId) {
        throw new Error("Method findByStudentAndActivity() must be implemented")
    }

    async create(completion) {
        throw new Error("Method create() must be implemented")
    }

    async update(id, completion) {
        throw new Error("Method update() must be implemented")
    }

    async findByStudent(studentId) {
        throw new Error("Method findByStudent() must be implemented")
    }
}

module.exports = IActivityCompletionRepository