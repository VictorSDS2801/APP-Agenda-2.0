class ListActivities {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(filters = {}) {
    let queryFilters = {};

    if (filters.tomorrow) {
      // Calcular data de amanhã em UTC
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

      console.log('🔍 Filtro Tomorrow - De:', tomorrow, 'Até:', dayAfter);

      queryFilters.dueDate = {
        $gte: tomorrow,
        $lt: dayAfter
      };
    }

    if (filters.startDate) {
      queryFilters.issueDate = {
        ...queryFilters.issueDate,
        $gte: new Date(filters.startDate + 'T00:00:00.000Z')
      };
    }

    if (filters.endDate) {
      queryFilters.dueDate = {
        ...queryFilters.dueDate,
        $lte: new Date(filters.endDate + 'T23:59:59.999Z')
      };
    }

    if (filters.subject) {
      queryFilters.subject = filters.subject;
    }

    console.log('🔍 QueryFilters final:', queryFilters);

    const activities = await this.activityRepository.findAll(queryFilters);

    console.log('🔍 Atividades encontradas:', activities.length);

    return activities;
  }
}

module.exports = ListActivities;