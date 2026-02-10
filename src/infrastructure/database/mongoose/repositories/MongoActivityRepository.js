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
    const activities = await ActivityModel.find(filters).sort({ dueDate: 1 });

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
    const activityDoc = await ActivityModel.findByIdAndUpdate(
      id,
      activityData,
      { new: true }
    );

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