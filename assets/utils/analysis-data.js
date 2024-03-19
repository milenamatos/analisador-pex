function getGoalDistribution (data, goalId, relation) {
  return data.find(item => item.id == goalId && item.relation === relation)?.count || 0
}

export {
  getGoalDistribution
}