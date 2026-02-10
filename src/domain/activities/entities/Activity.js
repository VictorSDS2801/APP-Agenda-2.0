class Activity {
    constructor({ id, subject, description, issueDate, dueDate, createdAt }) {
        this.id = id
        this.subject = subject
        this.description = description
        this.issueDate = issueDate
        this.dueDate = dueDate
        this.createdAt = createdAt || new Date()
    }

    isOverdue() {
        return new Date() > new Date(this.dueDate)
    }
}

module.exports = Activity