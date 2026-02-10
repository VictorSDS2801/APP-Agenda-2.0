class UpdateActivity {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async execute(id, { subject, description, issueDate, dueDate }) {
        const existingActivity = await this.activityRepository.findById(id)
        if (!existingActivity) {
            throw new Error("Activity not found")
        }

        if (issueDate && dueDate) {
            const issue = new Date(issueDate)
            const due = new Date(dueDate)

            if (issue > due) {
                throw new Error("Issue date cannot be after due date")
            }
        }

        const updatedData = {
            subject: subject || existingActivity.subject,
            description: description || existingActivity.description,
            issueDate: issueDate ? new Date(issueDate) : existingActivity.issueDate,
            dueDate: dueDate ? new Date(dueDate) : existingActivity.dueDate
        }

        const updatedActivity = await this.activityRepository.update(id, updatedData)

        return updatedActivity
    }
}

module.exports = UpdateActivity