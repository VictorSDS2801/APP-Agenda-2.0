class UpdateActivity {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(id, { subject, description, issueDate, dueDate }) {
    console.log('🔍 BACKEND - Dados recebidos:', { subject, description, issueDate, dueDate });
    
    // Verificar se atividade existe
    const existingActivity = await this.activityRepository.findById(id);
    if (!existingActivity) {
      throw new Error('Activity not found');
    }

    // Converter strings de data para Date objects (só se forem fornecidas)
    let issue = existingActivity.issueDate;
    let due = existingActivity.dueDate;

    if (issueDate) {
      console.log('🔍 BACKEND - issueDate recebido:', issueDate, 'tipo:', typeof issueDate);
      // Se já tiver T no formato, usar diretamente, senão adicionar
      issue = new Date(issueDate.includes('T') ? issueDate : issueDate + 'T00:00:00.000Z');
      console.log('🔍 BACKEND - issue convertido:', issue);
    }

    if (dueDate) {
      console.log('🔍 BACKEND - dueDate recebido:', dueDate, 'tipo:', typeof dueDate);
      // Se já tiver T no formato, usar diretamente, senão adicionar
      due = new Date(dueDate.includes('T') ? dueDate : dueDate + 'T00:00:00.000Z');
      console.log('🔍 BACKEND - due convertido:', due);
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

    console.log('🔍 BACKEND - updatedData final:', updatedData);

    const updatedActivity = await this.activityRepository.update(id, updatedData);

    return updatedActivity;
  }
}

module.exports = UpdateActivity;