const Activity = require("../entities/Activity")

class CreateActivity {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async execute({ subject, description, issueDate, dueDate }) {
        if (!subject || !description || !issueDate || !dueDate) {
            throw new Error("All fields are required")
        }

        const issue = new Date(issueDate)
        const due = new Date(dueDate)

        if (issue > due) {
            throw new Error("Issue date cannot be after due date")
        }

        const activity = new Activity({
            subject,
            description,
            issueDate: issue,
            dueDate: due
        })

        const createdActivity = await this.activityRepository.create(activity)
        
        return createdActivity
    }
}

module.exports = CreateActivity