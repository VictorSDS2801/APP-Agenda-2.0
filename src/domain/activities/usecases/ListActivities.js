class ListActivities {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async execute(filters = {}) {
        let queryFilters = {}

        if (filters.tomorrow) {
            const tomorrow = new Date()
            tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
            tomorrow.setUTCHours(0, 0, 0, 0)

            const dayAfter = new Date(tomorrow)
            dayAfter.setUTCDate(dayAfter.getUTCDate() + 1)

            queryFilters.dueDate = {
                $gte: tomorrow,
                $lt: dayAfter
            }
        }

        if (filters.startDate) {
            queryFilters.issueDate = {
                ...queryFilters.issueDate,
                $gte: new Date(filters.startDate)
            }
        }

        if (filters.endDate) {
            queryFilters.dueDate = {
                ...queryFilters.dueDate,
                $lte: new Date(filters.endDate)
            }
        }

        if (filters.subject) {
            queryFilters.subject = filters.subject
        }

        const activities = await this.activityRepository.findAll(queryFilters)

        return activities
    }
}

module.exports = ListActivities