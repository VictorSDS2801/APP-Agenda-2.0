require("dotenv").config()
const app = require("./app")
const connectDatabase = require("./infrastructure/database/connection")

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await connectDatabase()

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error)
        process.exit(1)
    }
}

startServer()