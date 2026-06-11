// ============================================================
// 人生模拟器 - 多周目传承系统
// 让每一轮游戏都有意义，传承点可解锁强力开局奖励
// ============================================================

import { achievements } from './achievements.js'
import { endings } from './endings.js'

// ─── 传承点类型 ────────────────────────────────────────────────
export const inheritanceTypes = [
  {
    id: 'memory_fragment',
    name: '记忆碎片',
    icon: '💎',
    description: '前世记忆的残片，让你对人生有更深的理解',
    effect: { wisdom: 5 },
    cost: 10,
    repeatable: true,
    maxLevel: 3
  },
  {
    id: 'talent_seed',
    name: '天赋种子',
    icon: '🌱',
    description: '觉醒微弱的天赋潜能',
    effect: { intelligence: 5, creativity: 5 },
    cost: 15,
    repeatable: true,
    maxLevel: 3
  },
  {
    id: 'lucky_charm',
    name: '幸运符',
    icon: '🍀',
    description: '冥冥中的好运眷顾',
    effect: { happiness: 5 },
    cost: 12,
    repeatable: true,
    maxLevel: 3
  },
  {
    id: 'health_base',
    name: '强健体魄',
    icon: '💪',
    description: '天生体质优于常人',
    effect: { health: 5 },
    cost: 12,
    repeatable: true,
    maxLevel: 3
  },
  {
    id: 'social_bond',
    name: '社交直觉',
    icon: '🤝',
    description: '天生善于处理人际关系',
    effect: { social: 5, charm: 3 },
    cost: 15,
    repeatable: true,
    maxLevel: 3
  },
  {
    id: 'financial_acumen',
    name: '理财直觉',
    icon: '💰',
    description: '对财富有天生的敏锐嗅觉',
    effect: { wealth: 5 },
    cost: 10,
    repeatable: true,
    maxLevel: 3
  },
  {
    id: 'phoenix_rebirth',
    name: '凤凰之魂',
    icon: '🔥',
    description: '传说中能从灰烬中重生的灵魂',
    effect: { health: 8, happiness: 5 },
    cost: 30,
    repeatable: false,
    maxLevel: 1,
    rarity: 'legendary',
    descriptionExtra: '开局自带被动：每年有5%几率清除所有负面状态'
  },
  {
    id: 'golden_touch',
    name: '点金之手',
    icon: '✨',
    description: '仿佛有神明庇佑，财富滚滚而来',
    effect: { wealth: 10, happiness: 5 },
    cost: 35,
    repeatable: false,
    maxLevel: 1,
    rarity: 'legendary',
    descriptionExtra: '开局自带被动：每次正收入额外+10%'
  },
  {
    id: 'photographic_memory',
    name: '过目不忘',
    icon: '🧠',
    description: '完美记忆人生中的每一个细节',
    effect: { intelligence: 10, wisdom: 5 },
    cost: 40,
    repeatable: false,
    maxLevel: 1,
    rarity: 'legendary',
    descriptionExtra: '开局自带被动：所有选择后果预览更准确'
  },
  {
    id: 'charming_aura',
    name: '魅力光环',
    icon: '💫',
    description: '天生自带让人亲近的气场',
    effect: { charm: 15, social: 10 },
    cost: 40,
    repeatable: false,
    maxLevel: 1,
    rarity: 'legendary',
    descriptionExtra: '开局自带被动：NPC初始好感度+20'
  },
  {
    id: 'blessed_child',
    name: '天选之子',
    icon: '👑',
    description: '被命运选中的人，所有属性小幅提升',
    effect: { wealth: 5, intelligence: 5, happiness: 5, health: 5, social: 5, charm: 5 },
    cost: 60,
    repeatable: false,
    maxLevel: 1,
    rarity: 'mythic',
    descriptionExtra: '终极传承：开局全属性+5，解锁所有稀有天赋抽取'
  }
]

// ─── 传承点计算 ────────────────────────────────────────────────
// 根据结局稀有度和成就解锁传承点
export function calculateInheritancePoints(ending, unlockedAchievements, gameHistory) {
  let points = 0
  
  // 结局基础分
  const endingRarityScores = {
    common: 5,
    uncommon: 8,
    rare: 12,
    epic: 20,
    legendary: 35,
    mythical: 50
  }
  points += endingRarityScores[(ending && ending.rarity)] || 0
  
  // 达成成就加分
  const achievementCount = (unlockedAchievements && unlockedAchievements.length) || 0
  points += achievementCount * 3
  
  // 隐藏成就双倍
  const hiddenAchievements = (unlockedAchievements && unlockedAchievements.filter)(id => {
    // 查找是否是隐藏成就
    for (const category of Object.values(achievements)) {
      const ach = category.find(a => a.id === id)
      if ((ach && ach.hidden)) return true
    }
    return false
  }).length || 0
  points += hiddenAchievements * 3
  
  // 游戏时长加分（活得越久贡献越多）
  const maxAge = (gameHistory && gameHistory.maxAge) || 0
  points += Math.floor(maxAge / 10)
  
  // 特殊成就额外加分
  if ((unlockedAchievements && unlockedAchievements.includes)('perfect_life')) points += 30
  if ((unlockedAchievements && unlockedAchievements.includes)('rebirth')) points += 20
  if ((unlockedAchievements && unlockedAchievements.includes)('prodigy')) points += 25
  if ((unlockedAchievements && unlockedAchievements.includes)('world_traveler')) points += 15
  
  return points
}

// ─── 应用传承效果 ──────────────────────────────────────────────
export function applyInheritance(character, selectedInheritances) {
  const result = { ...character }
  const passiveEffects = []
  
  // 累加基础效果
  for (const inh of selectedInheritances) {
    if (inh.effect) {
      for (const [key, val] of Object.entries(inh.effect)) {
        if (result[key] !== undefined) {
          result[key] = Math.min(100, result[key] + val)
        }
      }
    }
    
    // 收集被动效果
    if (inh.descriptionExtra) {
      passiveEffects.push(inh)
    }
  }
  
  result.passiveEffects = passiveEffects.map(p => ({
    id: p.id,
    name: p.name,
    icon: p.icon,
    description: p.descriptionExtra
  }))
  
  return result
}

// ─── 获取可用传承项 ────────────────────────────────────────────
export function getAvailableInheritances(unlockedInheritances, totalPoints) {
  return inheritanceTypes.map(inh => {
    // 检查当前已解锁次数
    const currentLevel = (unlockedInheritances && unlockedInheritances[inh.id]) || 0
    const canUnlock = totalPoints >= inh.cost
    const maxed = currentLevel >= inh.maxLevel
    
    return {
      ...inh,
      currentLevel,
      canUnlock,
      maxed,
      nextCost: inh.cost * (currentLevel + 1) // 升级花费递增
    }
  })
}

// ─── 传承总览数据 ──────────────────────────────────────────────
export function getInheritanceOverview(savedData) {
  const totalPoints = (savedData && savedData.totalInheritancePoints) || 0
  const unlockedInheritances = (savedData && savedData.unlockedInheritances) || {}
  const gamesPlayed = (savedData && savedData.gamesPlayed) || 0
  const bestEnding = (savedData && savedData.bestEnding) || null
  
  return {
    totalPoints,
    unlockedInheritances,
    gamesPlayed,
    bestEnding,
    available: getAvailableInheritances(unlockedInheritances, totalPoints)
  }
}

// ─── 解锁传承 ────────────────────────────────────────────────
export function unlockInheritance(unlockedInheritances, inheritanceId, cost) {
  const inh = inheritanceTypes.find(i => i.id === inheritanceId)
  if (!inh) return { success: false, error: '传承不存在' }
  
  const currentLevel = unlockedInheritances[inheritanceId] || 0
  if (currentLevel >= inh.maxLevel) {
    return { success: false, error: '已达最大等级' }
  }
  
  const actualCost = inh.cost * (currentLevel + 1)
  if (cost < actualCost) {
    return { success: false, error: '传承点不足' }
  }
  
  const newUnlocked = {
    ...unlockedInheritances,
    [inheritanceId]: currentLevel + 1
  }
  
  return {
    success: true,
    newUnlocked,
    spentPoints: actualCost,
    remainingPoints: cost - actualCost
  }
}

// ─── 解锁成就奖励（单局游戏结束后调用）───────────────────────
export function unlockGameEndRewards(ending, unlockedAchievements, gameHistory, savedData) {
  const earnedPoints = calculateInheritancePoints(ending, unlockedAchievements, gameHistory)
  const totalPoints = ((savedData && savedData.totalInheritancePoints) || 0) + earnedPoints
  const gamesPlayed = ((savedData && savedData.gamesPlayed) || 0) + 1
  
  // 更新最佳结局
  const currentBest = (savedData && savedData.bestEnding) || { rarity: 'common', score: 0 }
  const endingScore = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5, mythical: 6 }
  const newScore = endingScore[(ending && ending.rarity)] || 0
  const bestEnding = newScore > (endingScore[currentBest.rarity] || 0)
    ? { id: ending.id, name: ending.name, rarity: ending.rarity, icon: ending.icon }
    : currentBest
  
  return {
    earnedPoints,
    totalPoints,
    gamesPlayed,
    bestEnding,
    unlockedInheritances: (savedData && savedData.unlockedInheritances) || {}
  }
}

// ─── 重置存档（保留传承）───────────────────────────────────────
export function resetWithInheritance(savedData) {
  return {
    totalInheritancePoints: (savedData && savedData.totalInheritancePoints) || 0,
    unlockedInheritances: (savedData && savedData.unlockedInheritances) || {},
    gamesPlayed: (savedData && savedData.gamesPlayed) || 0,
    bestEnding: (savedData && savedData.bestEnding) || null
  }
}

// ─── 检查被动效果是否触发 ─────────────────────────────────────
export function checkPassiveEffects(character, gameState, event) {
  const effects = character.passiveEffects || []
  const triggers = []
  
  for (const passive of effects) {
    switch (passive.id) {
      case 'phoenix_rebirth':
        // 每年5%几率清除负面状态
        if (Math.random() < 0.05) {
          triggers.push({
            type: 'clear_negative',
            passive: passive,
            message: '🔥 凤凰之魂觉醒！你身上的负面状态被清除了！'
          })
        }
        break
        
      case 'golden_touch':
        // 正收入额外+10%（在计算时应用，这里标记）
        triggers.push({
          type: 'income_boost',
          passive: passive,
          mult: 0.1,
          message: '✨ 点金之手生效！收入+10%'
        })
        break
        
      case 'photographic_memory':
        // 选择后果更准确（在UI层处理，这里标记可用）
        triggers.push({
          type: 'memory_bonus',
          passive: passive,
          message: '🧠 过目不忘：你能更准确地预见选择的后果'
        })
        break
        
      case 'charming_aura':
        // NPC好感+20（在relationships.js初始化时应用，这里标记）
        triggers.push({
          type: 'charm_bonus',
          passive: passive,
          bonus: 20,
          message: '💫 魅力光环：你周围的人似乎更容易信任你'
        })
        break
    }
  }
  
  return triggers
}
