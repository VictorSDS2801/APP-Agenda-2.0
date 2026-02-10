const ToggleCompletion = require("../../../domain/activity-completions/usecases/ToggleCompletion")
const GetStudentCompletions = require("../../../domain/activity-completions/usecases/GetStudentCompletions")
const MongoActivityCompletionRepository = require("../../database/mongoose/repositories/MongoActivityCompletionRepository")
const MongoActivityRepository = require("../../database/mongoose/repositories/MongoActivityRepository")

class ActivityCompletionController {
    constructor() {
        this.activityCompletionRepository = new MongoActivityCompletionRepository()
        this.activityRepository = new MongoActivityRepository()
    }

    async toggle(req, res) {
        try {
            const { activityId } = req.params;
            const studentId = req.user.id; // ← CORRIGIDO: era StudentId

            const toggleCompletion = new ToggleCompletion(
            this.activityCompletionRepository, // ← ADICIONADO
            this.activityRepository // ← ADICIONADO
            );

            const completion = await toggleCompletion.execute({
            studentId,
            activityId
            });

            return res.status(200).json({
            message: "Completion status toggled successfully",
            completion
            });
        } catch (error) {
            return res.status(400).json({
            error: error.message
            });
        }
    }

    async getMyActivities(req, res) {
        try {
            const studentId = req.user.id;

            // Construir filtros apenas se tiverem valor
            const filters = {};

            if (req.query.tomorrow === 'true') {
            filters.tomorrow = true;
            }

            if (req.query.startDate) {
            filters.startDate = req.query.startDate;
            }

            if (req.query.endDate) {
            filters.endDate = req.query.endDate;
            }

            if (req.query.subject) {
            filters.subject = req.query.subject;
            }

            const getStudentCompletions = new GetStudentCompletions(
            this.activityCompletionRepository,
            this.activityRepository
            );

            const activities = await getStudentCompletions.execute({
            studentId,
            filters
            });

            return res.status(200).json(activities);
        } catch (error) {
            return res.status(400).json({
            error: error.message
            });
        }
    }
}

module.exports = ActivityCompletionController