class ActivityCompletion {
    constructor({ id, activityId, studentId, completed, completedAt, createdAt }) {
        this.id = id
        this.activityId = activityId
        this.studentId = studentId
        this.completed = completed || false
        this.completedAt = completedAt || null
        this.createdAt = createdAt || new Date()
    }

    markAsCompleted() {
        this.completed = true
        this.completedAt = new Date()
    }

    markAsIncomplete() {
        this.completed = false
        this.completedAt = null
    }
}

module.exports = ActivityCompletion