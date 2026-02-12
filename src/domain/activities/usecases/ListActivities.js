class ListActivities {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(filters = {}) {
    console.log('🔍 ListActivities - Filtros recebidos:', JSON.stringify(filters, null, 2));

    const activities = await this.activityRepository.findAll(filters);

    console.log('🔍 ListActivities - Atividades encontradas:', activities.length);

    return activities;
  }
}

module.exports = ListActivities;