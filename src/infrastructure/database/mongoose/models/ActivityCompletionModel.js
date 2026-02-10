const mongoose = require("mongoose")

const activityCompletionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

activityCompletionSchema.index({ studentId: 1, activityId: 1 }, { unique: true })

module.exports = mongoose.model("ActivityCompletion", activityCompletionSchema)