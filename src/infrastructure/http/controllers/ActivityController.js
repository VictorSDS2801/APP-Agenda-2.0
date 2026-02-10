const CreateActivity = require('../../../domain/activities/usecases/CreateActivity');
const UpdateActivity = require('../../../domain/activities/usecases/UpdateActivity');
const DeleteActivity = require('../../../domain/activities/usecases/DeleteActivity');
const ListActivities = require('../../../domain/activities/usecases/ListActivities');
const MongoActivityRepository = require('../../database/mongoose/repositories/MongoActivityRepository');

class ActivityController {
  constructor() {
    this.activityRepository = new MongoActivityRepository();
  }

  async create(req, res) {
    try {
      const { subject, description, issueDate, dueDate } = req.body;

      const createActivity = new CreateActivity(this.activityRepository);
      const activity = await createActivity.execute({
        subject,
        description,
        issueDate,
        dueDate
      });

      return res.status(201).json({
        message: 'Activity created successfully',
        activity
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

  async list(req, res) {
    try {
      // Query params: ?tomorrow=true ou ?startDate=2024-01-01&endDate=2024-12-31 ou ?subject=Matemática
      const filters = {
        tomorrow: req.query.tomorrow === 'true',
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        subject: req.query.subject
      };

      const listActivities = new ListActivities(this.activityRepository);
      const activities = await listActivities.execute(filters);

      return res.status(200).json(activities);
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { subject, description, issueDate, dueDate } = req.body;

      const updateActivity = new UpdateActivity(this.activityRepository);
      const activity = await updateActivity.execute(id, {
        subject,
        description,
        issueDate,
        dueDate
      });

      return res.status(200).json({
        message: 'Activity updated successfully',
        activity
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleteActivity = new DeleteActivity(this.activityRepository);
      const result = await deleteActivity.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }
}

module.exports = ActivityController;