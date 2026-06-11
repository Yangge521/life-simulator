// ============================================================
// 人生模拟器 - 隐藏剧情触发系统
// 跨系统联动的隐藏故事线，基于成就/天赋/关系/传承等多维度条件
// ============================================================

// ─── 隐藏剧情线定义 ─────────────────────────────────────────────
export const hiddenStoryLines = {
  
  // ════════════════════════════════════════════════════════════
  // 稀有组合触发
  // ════════════════════════════════════════════════════════════
  
  phoenix_rebirth: {
    id: 'phoenix_rebirth',
    name: '凤凰涅槃',
    icon: '🔥',
    rarity: 'epic',
    description: '浴火重生，你的人生经历了无数次跌倒又站起',
    triggerType: 'talent_ending',
    conditions: {
      hasTalent: ['phoenix_rebirth', 'phoenix_soul'],
      endingRarity: ['epic', 'legendary', 'mythical']
    },
    epitaph: '烈火焚身，凤凰涅槃，每一次倒下都是下一次崛起的序章',
    reward: {
      inheritanceBonus: 15,
      title: '永不言弃者'
    }
  },
  
  perfect_balance: {
    id: 'perfect_balance',
    name: '圆满人生',
    icon: '⚖️',
    rarity: 'legendary',
    description: '你的人生在财富、智慧、幸福、健康之间达到了完美的平衡',
    triggerType: 'all_stats',
    conditions: {
      minAllStats: 75,  // 所有属性 >= 75
      minAge: 50
    },
    epitaph: '人生如棋，步步为营，你走出了一条完美的人生之路',
    reward: {
      inheritanceBonus: 30,
      title: '完美人生家'
    }
  },
  
  centennial_wisdom: {
    id: 'centennial_wisdom',
    name: '百年智慧',
    icon: '🧓',
    rarity: 'epic',
    description: '活过百年，阅尽人间沧桑，你的智慧已臻化境',
    triggerType: 'longevity_wisdom',
    conditions: {
      minAge: 100,
      minWisdom: 80
    },
    epitaph: '百年光阴化作一盏明灯，照亮后来者的路',
    reward: {
      inheritanceBonus: 20,
      passive: '记忆增强：所有选择的后果预测更准确'
    }
  },
  
  social_butterfly: {
    id: 'social_butterfly',
    name: '社交之王',
    icon: '🦋',
    rarity: 'rare',
    description: '你一生结交了无数知己，人脉遍布天下',
    triggerType: 'relationship_social',
    conditions: {
      maxRelationships: 15,  // 至少15个NPC关系
      minSocial: 85
    },
    epitaph: '相识满天下，知心有几人，但你做到了两者兼得',
    reward: {
      inheritanceBonus: 12,
      passive: '社交直觉：NPC初始好感度+10'
    }
  },
  
  wealth_tycoon: {
    id: 'wealth_tycoon',
    name: '财富传奇',
    icon: '💰',
    rarity: 'rare',
    description: '从白手起家到富甲一方，你的财富故事激励着无数人',
    triggerType: 'wealth_career',
    conditions: {
      minWealth: 95,
      careerType: ['business', 'entrepreneur', 'investment']
    },
    epitaph: '千金散尽还复来，但你选择了将财富代代相传',
    reward: {
      inheritanceBonus: 15,
      passive: '理财直觉：财富增长+5%'
    }
  },
  
  genius_child: {
    id: 'genius_child',
    name: '神童传说',
    icon: '🧠',
    rarity: 'legendary',
    description: '天资聪颖加上不懈努力，你成为了时代的天才',
    triggerType: 'talent_intelligence',
    conditions: {
      hasTalent: ['genius', 'photographic_memory'],
      minIntelligence: 90,
      minAge: 30
    },
    epitaph: '三岁看老，而你证明了天才也需要汗水',
    reward: {
      inheritanceBonus: 25,
      title: '天才传承者'
    }
  },
  
  love_eternal: {
    id: 'love_eternal',
    name: '永恒之爱',
    icon: '💕',
    rarity: 'epic',
    description: '一生一世一双人，你的爱情故事传为佳话',
    triggerType: 'relationship_marriage',
    conditions: {
      maxRelationships: 3,  // 关系简单但深厚
      hasSpouse: true,
      spouseLoyalty: 95,
      minHappiness: 80
    },
    epitaph: '执子之手，与子偕老，这是最美的承诺',
    reward: {
      inheritanceBonus: 18,
      passive: '忠诚光环：伴侣关系不会因时间衰减'
    }
  },
  
  multiple_generations: {
    id: 'multiple_generations',
    name: '四世同堂',
    icon: '👨‍👩‍👧‍👦',
    rarity: 'rare',
    description: '你见证了四代人的成长，家族在你手中枝繁叶茂',
    triggerType: 'family_generations',
    conditions: {
      minChildren: 3,
      hasGrandchildren: true,
      hasGreatGrandchildren: true
    },
    epitaph: '家是最小的国，国是千万家，你经营好了自己的小家',
    reward: {
      inheritanceBonus: 15,
      passive: '家族传承：后代的初始属性+5'
    }
  },
  
  // ════════════════════════════════════════════════════════════
  // 特殊成就组合触发
  // ════════════════════════════════════════════════════════════
  
  world_citizen: {
    id: 'world_citizen',
    name: '环球旅行家',
    icon: '🌍',
    rarity: 'rare',
    description: '你踏遍了世界的每一个角落，用脚步丈量人生',
    triggerType: 'achievement_travel',
    conditions: {
      achievements: ['world_traveler', 'culture_traveler']
    },
    epitaph: '世界那么大，我想去看看，你做到了',
    reward: {
      inheritanceBonus: 10,
      passive: '文化包容：所有文化的NPC好感+15'
    }
  },
  
  marathon_life: {
    id: 'marathon_life',
    name: '人生马拉松',
    icon: '🏃',
    rarity: 'epic',
    description: '你的人生就像一场马拉松，每一步都算数',
    triggerType: 'achievement_milestone',
    conditions: {
      achievements: ['first_step', 'childhood', 'coming_of_age', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'century']
    },
    epitaph: '人生没有白走的路，每一步都算数',
    reward: {
      inheritanceBonus: 25,
      title: '人生完赛者'
    }
  },
  
  collector_king: {
    id: 'collector_king',
    name: '收藏大家',
    icon: '🏛️',
    rarity: 'rare',
    description: '你收藏了世间的珍奇异宝，每一件都有故事',
    triggerType: 'achievement_collect',
    conditions: {
      achievements: ['collector_king', 'art_collector'],
      minWealth: 70
    },
    epitaph: '收藏的不只是物品，更是一段段历史',
    reward: {
      inheritanceBonus: 12,
      passive: '鉴定之眼：发现稀有物品几率+20%'
    }
  },
  
  // ════════════════════════════════════════════════════════════
  // 传承系统联动触发
  // ════════════════════════════════════════════════════════════
  
  inheritance_master: {
    id: 'inheritance_master',
    name: '轮回掌控者',
    icon: '🔮',
    rarity: 'mythical',
    description: '你精通轮回之道，在无数次生命中积累智慧',
    triggerType: 'inheritance_games',
    conditions: {
      minGamesPlayed: 5,
      unlockedInheritances: 8  // 至少解锁8种传承
    },
    epitaph: '生死轮回，因果循环，你是跳出棋盘的棋手',
    reward: {
      inheritanceBonus: 50,
      title: '轮回掌控者',
      passive: '全属性+10，开局解锁所有天赋'
    }
  },
  
  first_blood: {
    id: 'first_blood',
    name: '初次轮回',
    icon: '🌅',
    rarity: 'common',
    description: '你开始了第一次轮回，新的旅程在等待着你',
    triggerType: 'inheritance_first',
    conditions: {
      minGamesPlayed: 1,
      gamesPlayed: 1
    },
    epitaph: '第一次说再见，是为了更好的重逢',
    reward: {
      inheritanceBonus: 5
    }
  },
  
  // ════════════════════════════════════════════════════════════
  // 隐藏特殊触发（超稀有）
  // ════════════════════════════════════════════════════════════
  
  secret_ending_unlock: {
    id: 'secret_ending_unlock',
    name: '命运改写者',
    icon: '✨',
    rarity: 'mythical',
    description: '你发现了改变命运的方法，书写了属于自己的结局',
    triggerType: 'secret_trigger',
    conditions: {
      hasTalent: ['destiny_child', 'time_traveler'],
      endingRarity: ['legendary', 'mythical'],
      minAge: 80
    },
    epitaph: '我命由我不由天，你证明了这一点',
    reward: {
      inheritanceBonus: 60,
      title: '命运改写者',
      unlockSpecialEnding: true
    }
  },
  
  true_ending: {
    id: 'true_ending',
    name: '真实结局',
    icon: '🌟',
    rarity: 'mythical',
    description: '你找到了隐藏的真实结局，达成了人生的最高境界',
    triggerType: 'true_ending',
    conditions: {
      allHiddenStorylines: true,  // 解锁所有隐藏剧情线
      minAllStats: 90,
      minAge: 100,
      unlockedInheritances: 10
    },
    epitaph: '当所有的故事都汇聚成一个，那便是你的人生真相',
    reward: {
      inheritanceBonus: 100,
      title: '真正的人生',
      unlockNewGamePlus: true
    }
  }
}

// ─── 触发器检查函数 ─────────────────────────────────────────────

/**
 * 检查所有隐藏剧情触发条件
 * @param {Object} gameData - 游戏数据
 * @param {Object} inheritanceData - 传承数据
 * @returns {Array} - 被触发的隐藏剧情线
 */
export function checkHiddenStoryTriggers(gameData, inheritanceData = {}) {
  const triggered = []
  
  for (const [id, story] of Object.entries(hiddenStoryLines)) {
    if (checkSingleTrigger(story, gameData, inheritanceData)) {
      triggered.push({
        id: story.id,
        name: story.name,
        icon: story.icon,
        rarity: story.rarity,
        description: story.description,
        epitaph: story.epitaph,
        reward: story.reward
      })
    }
  }
  
  return triggered
}

/**
 * 检查单条隐藏剧情触发条件
 */
function checkSingleTrigger(story, gameData, inheritanceData) {
  const { conditions } = story
  
  switch (story.triggerType) {
    case 'talent_ending':
      // 天赋 + 结局稀有度组合
      if (conditions.hasTalent) {
        const hasRequiredTalent = conditions.hasTalent.some(t => 
          (gameData.talents && gameData.talents.some(gT => gT.id === t))
        )
        if (!hasRequiredTalent) return false
      }
      if (conditions.endingRarity) {
        if (!conditions.endingRarity.includes(gameData.endingRarity)) return false
      }
      return true
      
    case 'all_stats':
      // 全属性检查
      if (conditions.minAllStats) {
        const stats = ['wealth', 'health', 'happiness', 'intelligence', 'social', 'wisdom', 'charm', 'creativity']
        for (const stat of stats) {
          if ((gameData[stat] || 0) < conditions.minAllStats) return false
        }
      }
      if (conditions.minAge && (gameData.age || 0) < conditions.minAge) return false
      return true
      
    case 'longevity_wisdom':
      if ((gameData.age || 0) < (conditions.minAge || 100)) return false
      if ((gameData.wisdom || 0) < (conditions.minWisdom || 80)) return false
      return true
      
    case 'relationship_social':
      const relCount = gameData.relationshipCount || 0
      if (relCount < (conditions.maxRelationships || 15)) return false
      if ((gameData.social || 0) < (conditions.minSocial || 85)) return false
      return true
      
    case 'wealth_career':
      if ((gameData.wealth || 0) < (conditions.minWealth || 95)) return false
      if (conditions.careerType) {
        if (!conditions.careerType.includes(gameData.careerType)) return false
      }
      return true
      
    case 'talent_intelligence':
      if (conditions.hasTalent) {
        const hasRequiredTalent = conditions.hasTalent.some(t =>
          (gameData.talents && gameData.talents.some(gT => gT.id === t))
        )
        if (!hasRequiredTalent) return false
      }
      if ((gameData.intelligence || 0) < (conditions.minIntelligence || 90)) return false
      if ((gameData.age || 0) < (conditions.minAge || 30)) return false
      return true
      
    case 'relationship_marriage':
      if (!gameData.isMarried) return false
      if ((gameData.relationshipCount || 0) > (conditions.maxRelationships || 3)) return false
      if ((gameData.happiness || 0) < (conditions.minHappiness || 80)) return false
      if (conditions.spouseLoyalty && (gameData.spouseLoyalty || 0) < conditions.spouseLoyalty) return false
      return true
      
    case 'family_generations':
      if ((gameData.children || 0) < (conditions.minChildren || 3)) return false
      if (!gameData.hasGrandchildren) return false
      if (!gameData.hasGreatGrandchildren) return false
      return true
      
    case 'achievement_travel':
    case 'achievement_milestone':
    case 'achievement_collect':
      if (conditions.achievements) {
        return conditions.achievements.every(ach => 
          (gameData.achievements && gameData.achievements.some(gAch => gAch === ach || gAch.id === ach))
        )
      }
      return false
      
    case 'inheritance_games':
      const games = inheritanceData.gamesPlayed || 0
      const unlockedCount = Object.keys(inheritanceData.unlockedInheritances || {}).length
      if (games < (conditions.minGamesPlayed || 5)) return false
      if (unlockedCount < (conditions.unlockedInheritances || 8)) return false
      return true
      
    case 'inheritance_first':
      const firstGames = inheritanceData.gamesPlayed || 0
      return firstGames === 1
      
    case 'secret_trigger':
      if (conditions.hasTalent) {
        const hasRequiredTalent = conditions.hasTalent.some(t =>
          (gameData.talents && gameData.talents.some(gT => gT.id === t))
        )
        if (!hasRequiredTalent) return false
      }
      if (conditions.endingRarity) {
        if (!conditions.endingRarity.includes(gameData.endingRarity)) return false
      }
      if ((gameData.age || 0) < (conditions.minAge || 80)) return false
      return true
      
    case 'true_ending':
      // 最严格的检查
      if ((gameData.age || 0) < (conditions.minAge || 100)) return false
      if ((conditions.unlockedInheritances || 10) > 
          Object.keys(inheritanceData.unlockedInheritances || {}).length) return false
      const stats2 = ['wealth', 'health', 'happiness', 'intelligence', 'social', 'wisdom', 'charm', 'creativity']
      for (const stat of stats2) {
        if ((gameData[stat] || 0) < (conditions.minAllStats || 90)) return false
      }
      return true
      
    default:
      return false
  }
}

/**
 * 计算隐藏剧情奖励
 */
export function calculateHiddenStoryRewards(triggeredStories) {
  let totalInheritanceBonus = 0
  let titles = []
  let passives = []
  
  for (const story of triggeredStories) {
    if (story.reward) {
      totalInheritanceBonus += story.reward.inheritanceBonus || 0
      if (story.reward.title) titles.push(story.reward.title)
      if (story.reward.passive) passives.push(story.reward.passive)
    }
  }
  
  return {
    totalInheritanceBonus,
    titles,
    passives,
    storyCount: triggeredStories.length
  }
}

/**
 * 保存已解锁的隐藏剧情
 */
export function saveHiddenStories(triggeredStories, savedData = {}) {
  const existing = savedData.unlockedHiddenStories || []
  const existingIds = new Set(existing.map(s => s.id))
  
  const newStories = triggeredStories.filter(s => !existingIds.has(s.id))
  
  return {
    ...savedData,
    unlockedHiddenStories: [...existing, ...newStories],
    hiddenStoryCount: ((savedData.unlockedHiddenStories && savedData.unlockedHiddenStories.length) || 0) + newStories.length
  }
}

/**
 * 获取隐藏剧情总览
 */
export function getHiddenStoriesOverview(savedData = {}) {
  const unlocked = savedData.unlockedHiddenStories || []
  const total = Object.keys(hiddenStoryLines).length
  
  return {
    unlockedCount: unlocked.length,
    totalCount: total,
    unlockedList: unlocked,
    progress: Math.round((unlocked.length / total) * 100)
  }
}
