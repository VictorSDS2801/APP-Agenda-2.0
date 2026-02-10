const ActivityCompletion = require("../entities/ActivityCompletion")

class ToggleCompletion {
    constructor(activityCompletionRepository, activityRepository) {
        this.activityCompletionRepository = activityCompletionRepository
        this.activityRepository = activityRepository
    }

    async execute({ studentId, activityId }) {
        const activity = await this.activityRepository.findById(activityId)
        if (!activity) {
            throw new Error("Activity not found")
        }

        const existingCompletion = await this.activityCompletionRepository.findByStudentAndActivity(
            studentId,
            activityId
        )

        if (existingCompletion) {
            if (existingCompletion.completed) {
                existingCompletion.markAsIncomplete()
            } else {
                existingCompletion.markAsCompleted()
            }

            const updated = await this.activityCompletionRepository.update(
                existingCompletion.id,
                existingCompletion
            )
            return updated
        } else {
            const completion = new ActivityCompletion({
                studentId,
                activityId,
                completed: true,
                completedAt: new Date()
            })

            const created = await this.activityCompletionRepository.create(completion)
        
            return created
        }
    }
}

module.exports = ToggleCompletion