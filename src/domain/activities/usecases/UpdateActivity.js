class UpdateActivity {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(id, { subject, description, issueDate, dueDate }) {
    // Verificar se atividade existe
    const existingActivity = await this.activityRepository.findById(id);
    if (!existingActivity) {
      throw new Error('Activity not found');
    }

    // Validar datas se forem fornecidas
    if (issueDate && dueDate) {
      const issue = new Date(issueDate + 'T00:00:00.000Z');
      const due = new Date(dueDate + 'T00:00:00.000Z');

      if (issue > due) {
        throw new Error('Issue date cannot be after due date');
      }
    }

    // Atualizar apenas os campos fornecidos
    const updatedData = {
      subject: subject || existingActivity.subject,
      description: description || existingActivity.description,
      issueDate: issueDate ? new Date(issueDate + 'T00:00:00.000Z') : existingActivity.issueDate,
      dueDate: dueDate ? new Date(dueDate + 'T00:00:00.000Z') : existingActivity.dueDate
    };

    const updatedActivity = await this.activityRepository.update(id, updatedData);

    return updatedActivity;
  }
}

module.exports = UpdateActivity;