class GetStudentCompletions {
  constructor(activityCompletionRepository, activityRepository) {
    this.activityCompletionRepository = activityCompletionRepository;
    this.activityRepository = activityRepository;
  }

  async execute({ studentId, filters = {} }) {
    

    // Buscar todas as atividades (com filtros opcionais)
    const activities = await this.activityRepository.findAll(filters);
    
    // Buscar as conclusões do estudante
    const completions = await this.activityCompletionRepository.findByStudent(studentId);
    

    // Mapear completions por activityId para facilitar busca
    const completionsMap = {};
    completions.forEach(comp => {
      completionsMap[comp.activityId] = comp;
    });

    // Combinar atividades com status de conclusão
    const activitiesWithStatus = activities.map(activity => {
      const completion = completionsMap[activity.id];

      return {
        ...activity,
        completed: completion ? completion.completed : false,
        completedAt: completion ? completion.completedAt : null
      };
    });

    console.log('🎯 DEBUG - activitiesWithStatus:', activitiesWithStatus.length);

    return activitiesWithStatus;
  }
}

module.exports = GetStudentCompletions;