class DeleteActivity {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async execute(id) {
        const activity = await this.activityRepository.findById(id)
        if (!activity) {
            throw new Error("Activity not found")
        }

        await this.activityRepository.delete(id)

        return { message: "Activity deled sucessfully"}
    }
}

module.exports = DeleteActivity