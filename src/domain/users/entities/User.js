class User {
    constructor({ id, username, password, role = "student", createdAt }) {
        this.id = id
        this.username = username
        this.password = password
        this.role = role
        this.createdAt = createdAt || new Date()
    }

    isAdmin() {
        return this.role === "admin"
    }

    isStudent() {
        return this.role === "student"
    }
}

module.exports = User