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
      // Construir filtros
      const filters = {};

      // Filtro: atividades do próximo dia
      if (req.query.tomorrow === 'true') {
        const now = new Date();
        const tomorrow = new Date(Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          0, 0, 0, 0
        ));
        
        const dayAfter = new Date(Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 2,
          0, 0, 0, 0
        ));

        console.log('🔍 CONTROLLER - Filtro Tomorrow - De:', tomorrow, 'Até:', dayAfter);

        filters.dueDate = {
          $gte: tomorrow,
          $lt: dayAfter
        };
      }

      // Filtro: por matéria
      if (req.query.subject) {
        filters.subject = req.query.subject;
      }

      // Filtro: por data de início
      if (req.query.startDate) {
        filters.issueDate = {
          ...filters.issueDate,
          $gte: new Date(req.query.startDate + 'T00:00:00.000Z')
        };
      }

      // Filtro: por data de fim
      if (req.query.endDate) {
        filters.dueDate = {
          ...filters.dueDate,
          $lte: new Date(req.query.endDate + 'T23:59:59.999Z')
        };
    }

    console.log('🔍 CONTROLLER - Filtros processados:', JSON.stringify(filters, null, 2));

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