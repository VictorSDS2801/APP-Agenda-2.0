const Activity = require('../entities/Activity');

class CreateActivity {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute({ subject, description, issueDate, dueDate }) {
    // Validações
    if (!subject || !description || !issueDate || !dueDate) {
      throw new Error('All fields are required');
    }

    // Converter para Date UTC mantendo o dia correto
    const issue = new Date(issueDate + 'T00:00:00.000Z');
    const due = new Date(dueDate + 'T00:00:00.000Z');

    if (issue > due) {
      throw new Error('Issue date cannot be after due date');
    }

    // Criar entidade
    const activity = new Activity({
      subject,
      description,
      issueDate: issue,
      dueDate: due
    });

    // Salvar
    const createdActivity = await this.activityRepository.create(activity);

    return createdActivity;
  }
}

module.exports = CreateActivity;