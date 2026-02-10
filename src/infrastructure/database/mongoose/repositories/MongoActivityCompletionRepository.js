const IActivityCompletionRepository = require("../../../../domain/activity-completions/repositories/IActivityCompletionRepository")
const ActivityCompletionModel = require("../models/ActivityCompletionModel")
const ActivityCompletion = require("../../../../domain/activity-completions/entities/ActivityCompletion")

class MongoActivityCompletionRepository extends IActivityCompletionRepository {
    async findByStudentAndActivity(studentId, activityId) {
        const doc = await ActivityCompletionModel.findOne({
            studentId,
            activityId
        })

        if (!doc) return null

        return new ActivityCompletion({
            id: doc._id.toString(),
            studentId: doc.studentId.toString(),
            activityId: doc.activityId.toString(),
            completed: doc.completed,
            completedAt: doc.completedAt,
            createdAt: doc.createdAt
        })
    }

    async create(completion) {
        const doc = await ActivityCompletionModel.create({
            studentId: completion.studentId,
            activityId: completion.activityId,
            completed: completion.completed,
            completedAt: completion.completedAt
        })

        return new ActivityCompletion({
            id: doc._id.toString(),
            studentId: doc.studentId.toString(),
            activityId: doc.activityId.toString(),
            completed: doc.completed,
            completedAt: doc.completedAt,
            createdAt: doc.createdAt
        })
    }

    async update(id, completion) {
        const doc = await ActivityCompletionModel.findByIdAndUpdate(
            id,
            {
                completed: completion.completed,
                completedAt: completion.completedAt
            },
            { new: true }
        )

        if (!doc) return null

        return new ActivityCompletion({
            id: doc._id.toString(),
            studentId: doc.studentId.toString(),
            activityId: doc.activityId.toString(),
            completed: doc.completed,
            completedAt: doc.completedAt,
            createdAt: doc.createdAt
        })
    }

    async findByStudent(studentId) {
        const docs = await ActivityCompletionModel.find({ studentId })

        return docs.map(doc => new ActivityCompletion({
            id: doc._id.toString(),
            studentId: doc.studentId.toString(),
            activityId: doc.activityId.toString(),
            completed: doc.completed,
            completedAt: doc.completedAt,
            createdAt: doc.createdAt
        }))
    }
}

module.exports = MongoActivityCompletionRepository