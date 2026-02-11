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

    // Converter strings de data para Date objects (só se forem fornecidas)
    let issue = existingActivity.issueDate;
    let due = existingActivity.dueDate;

    if (issueDate) {
      // Se já tiver T no formato, usar diretamente, senão adicionar
      issue = new Date(issueDate.includes('T') ? issueDate : issueDate + 'T00:00:00.000Z');
    }

    if (dueDate) {
      // Se já tiver T no formato, usar diretamente, senão adicionar
      due = new Date(dueDate.includes('T') ? dueDate : dueDate + 'T00:00:00.000Z');
    }

    // Validar datas
    if (issueDate && dueDate && issue > due) {
      throw new Error('Issue date cannot be after due date');
    }

    // Atualizar apenas os campos fornecidos
    const updatedData = {
      subject: subject || existingActivity.subject,
      description: description || existingActivity.description,
      issueDate: issue,
      dueDate: due
    };

    const updatedActivity = await this.activityRepository.update(id, updatedData);

    return updatedActivity;
  }
}

module.exports = UpdateActivity;