const IActivityRepository = require('../../../../domain/activities/repositories/IActivityRepository');
const ActivityModel = require('../models/ActivityModel');
const Activity = require('../../../../domain/activities/entities/Activity');

class MongoActivityRepository extends IActivityRepository {
  async create(activity) {
    const activityDoc = await ActivityModel.create({
      subject: activity.subject,
      description: activity.description,
      issueDate: activity.issueDate,
      dueDate: activity.dueDate
    });

    return new Activity({
      id: activityDoc._id.toString(),
      subject: activityDoc.subject,
      description: activityDoc.description,
      issueDate: activityDoc.issueDate,
      dueDate: activityDoc.dueDate,
      createdAt: activityDoc.createdAt
    });
  }

  async findById(id) {
    const activityDoc = await ActivityModel.findById(id);
    
    if (!activityDoc) return null;

    return new Activity({
      id: activityDoc._id.toString(),
      subject: activityDoc.subject,
      description: activityDoc.description,
      issueDate: activityDoc.issueDate,
      dueDate: activityDoc.dueDate,
      createdAt: activityDoc.createdAt
    });
  }

  async findAll(filters = {}) {
    console.log('🔍 MONGO findAll - Filtros recebidos:', JSON.stringify(filters, null, 2));
    
    const activities = await ActivityModel.find(filters).sort({ dueDate: 1 });
    
    console.log('🔍 MONGO findAll - Quantidade encontrada:', activities.length);
    if (activities.length > 0) {
      console.log('🔍 MONGO findAll - Primeira atividade:', {
        subject: activities[0].subject,
        dueDate: activities[0].dueDate
      });
    }

    return activities.map(doc => new Activity({
      id: doc._id.toString(),
      subject: doc.subject,
      description: doc.description,
      issueDate: doc.issueDate,
      dueDate: doc.dueDate,
      createdAt: doc.createdAt
    }));
  }

  async update(id, activityData) {
    console.log('🔍 MONGO - Atualizando atividade ID:', id);
    console.log('🔍 MONGO - Dados para atualizar:', activityData);
    
    const activityDoc = await ActivityModel.findByIdAndUpdate(
      id,
      activityData,
      { new: true }
    );

    console.log('🔍 MONGO - Documento atualizado:', activityDoc);

    if (!activityDoc) return null;

    return new Activity({
      id: activityDoc._id.toString(),
      subject: activityDoc.subject,
      description: activityDoc.description,
      issueDate: activityDoc.issueDate,
      dueDate: activityDoc.dueDate,
      createdAt: activityDoc.createdAt
    });
  }

  async delete(id) {
    await ActivityModel.findByIdAndDelete(id);
  }
}

module.exports = MongoActivityRepository;