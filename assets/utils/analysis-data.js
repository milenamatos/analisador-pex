function getGoalDistribution(data, goalId, relation) {
  return data.find(item => item.id == goalId && item.relation === relation)?.count || 0
}

function getTotalPoints(data) {
  return data.reduce((sum, item) => {
    return sum +
      item.goals.reduce((goalSum, goal) => {
        return goalSum + parseInt(goal.points)
      }, 0)
  }, 0)
}

function getDistributionPercentageByIndicator(data, indicator) {
  const totalPoints = getTotalPoints(data)
  const goals = data.find(item => item.indicator === indicator).goals

  return goals.map(goal => ({
    ...goal,
    value: ((goal.points / totalPoints) * 100).toFixed(2)
  }))
}

function getDistributionPercentageByGoal(data, goal) {
  const totalPoints = getTotalPoints(data)
  const goals = data.map(indicator => {
    return indicator.goals.find(item => item.goal === goal)
  })

  return goals.map(goal => ({
    ...goal,
    value: ((goal.points / totalPoints) * 100).toFixed(2)
  }))
}

export {
  getGoalDistribution,
  getDistributionPercentageByIndicator,
  getDistributionPercentageByGoal
}