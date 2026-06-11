// ============================================================
// 人生模拟器 - 成就系统
// 定义游戏中的成就目标，增加可玩性和追求
// ============================================================

export const achievements = {
  // ════════════════════════════════════════════════════════════
  // 人生成就（寿命相关）
  // ════════════════════════════════════════════════════════════
  life: [
    {
      id: 'first_step',
      name: '人生第一步',
      icon: '👶',
      description: '活到1岁',
      condition: { minAge: 1 },
      rarity: 'common'
    },
    {
      id: 'childhood',
      name: '无忧童年',
      icon: '🧒',
      description: '活到10岁',
      condition: { minAge: 10 },
      rarity: 'common'
    },
    {
      id: 'coming_of_age',
      name: '成年礼',
      icon: '🎉',
      description: '活到18岁',
      condition: { minAge: 18 },
      rarity: 'common'
    },
    {
      id: 'thirty',
      name: '而立之年',
      icon: '🌟',
      description: '活到30岁',
      condition: { minAge: 30 },
      rarity: 'common'
    },
    {
      id: 'forty',
      name: '不惑之年',
      icon: '📖',
      description: '活到40岁',
      condition: { minAge: 40 },
      rarity: 'uncommon'
    },
    {
      id: 'fifty',
      name: '知天命',
      icon: '🎯',
      description: '活到50岁',
      condition: { minAge: 50 },
      rarity: 'uncommon'
    },
    {
      id: 'sixty',
      name: '花甲之年',
      icon: '🌸',
      description: '活到60岁',
      condition: { minAge: 60 },
      rarity: 'rare'
    },
    {
      id: 'seventy',
      name: '古稀之年',
      icon: '🦅',
      description: '活到70岁',
      condition: { minAge: 70 },
      rarity: 'rare'
    },
    {
      id: 'eighty',
      name: '耄耋之年',
      icon: '🐢',
      description: '活到80岁',
      condition: { minAge: 80 },
      rarity: 'epic'
    },
    {
      id: 'ninety',
      name: '鲐背之年',
      icon: '🏔️',
      description: '活到90岁',
      condition: { minAge: 90 },
      rarity: 'epic'
    },
    {
      id: 'centenarian',
      name: '百岁老人',
      icon: '👑',
      description: '活到100岁',
      condition: { minAge: 100 },
      rarity: 'legendary'
    }
  ],
  
  // ════════════════════════════════════════════════════════════
  // 财富成就
  // ════════════════════════════════════════════════════════════
  wealth: [
    {
      id: 'penny_pincher',
      name: '勤俭持家',
      icon: '🐷',
      description: '财富达到30',
      condition: { minWealth: 30 },
      rarity: 'common'
    },
    {
      id: 'well_off',
      name: '小康生活',
      icon: '🏠',
      description: '财富达到50',
      condition: { minWealth: 50 },
      rarity: 'common'
    },
    {
      id: 'wealthy',
      name: '富裕人生',
      icon: '💎',
      description: '财富达到70',
      condition: { minWealth: 70 },
      rarity: 'uncommon'
    },
    {
      id: 'millionaire',
      name: '百万富翁',
      icon: '💰',
      description: '财富达到85',
      condition: { minWealth: 85 },
      rarity: 'rare'
    },
    {
      id: 'billionaire',
      name: '亿万富翁',
      icon: '🏰',
      description: '财富达到95',
      condition: { minWealth: 95 },
      rarity: 'legendary'
    },
    {
      id: 'rags_to_riches',
      name: '白手起家',
      icon: '📈',
      description: '从贫困家庭出身，财富达到80',
      condition: { minWealth: 80, familyType: ['poor', 'farmer', 'foster'] },
      rarity: 'epic'
    }
  ],
  
  // ════════════════════════════════════════════════════════════
  // 智力成就
  // ════════════════════════════════════════════════════════════
  intelligence: [
    {
      id: 'curious',
      name: '好学之心',
      icon: '📚',
      description: '智力达到50',
      condition: { minIntelligence: 50 },
      rarity: 'common'
    },
    {
      id: 'scholar',
      name: '学者',
      icon: '🎓',
      description: '智力达到70',
      condition: { minIntelligence: 70 },
      rarity: 'uncommon'
    },
    {
      id: 'genius',
      name: '天才',
      icon: '🧠',
      description: '智力达到90',
      condition: { minIntelligence: 90 },
      rarity: 'epic'
    },
    {
      id: 'omniscient',
      name: '全知者',
      icon: '🌌',
      description: '智力达到99',
      condition: { minIntelligence: 99 },
      rarity: 'legendary'
    },
    {
      id: 'phd',
      name: '博士学位',
      icon: '📜',
      description: '获得博士学位',
      condition: { flag: 'phd' },
      rarity: 'rare'
    }
  ],
  
  // ════════════════════════════════════════════════════════════
  // 幸福成就
  // ════════════════════════════════════════════════════════════
  happiness: [
    {
      id: 'content',
      name: '知足常乐',
      icon: '😊',
      description: '幸福达到60',
      condition: { minHappiness: 60 },
      rarity: 'common'
    },
    {
      id: 'happy_life',
      name: '幸福人生',
      icon: '😄',
      description: '幸福达到80',
      condition: { minHappiness: 80 },
      rarity: 'uncommon'
    },
    {
      id: 'blissful',
      name: '极乐人生',
      icon: '🌟',
      description: '幸福达到95',
      condition: { minHappiness: 95 },
      rarity: 'epic'
    },
    {
      id: 'true_happiness',
      name: '真正幸福',
      icon: '💖',
      description: '幸福、健康、财富都达到70',
      condition: { minHappiness: 70, minHealth: 70, minWealth: 70 },
      rarity: 'rare'
    }
  ],
  
  // ════════════════════════════════════════════════════════════
  // 感情成就
  // ════════════════════════════════════════════════════════════
  relationship: [
    {
      id: 'first_love',
      name: '初恋',
      icon: '💕',
      description: '经历第一次恋爱',
      condition: { flag: 'in_relationship' },
      rarity: 'common'
    },
    {
      id: 'married',
      name: '步入婚姻',
      icon: '💍',
      description: '结婚',
      condition: { flag: 'married' },
      rarity: 'common'
    },
    {
      id: 'parent',
      name: '为人父母',
      icon: '👶',
      description: '有了孩子',
      condition: { flag: 'has_child' },
      rarity: 'common'
    },
    {
      id: 'golden_wedding',
      name: '金婚',
      icon: '🏆',
      description: '婚姻维持50年',
      condition: { flag: 'married_50_years' },
      rarity: 'epic'
    },
    {
      id: 'big_family',
      name: '大家庭',
      icon: '👨‍👩‍👧‍👦',
      description: '有3个以上孩子',
      condition: { minChildren: 3 },
      rarity: 'rare'
    },
    {
      id: 'grandparent',
      name: '祖孙三代',
      icon: '👴',
      description: '当上祖父母',
      condition: { flag: 'has_grandchild' },
      rarity: 'uncommon'
    }
  ],
  
  // ════════════════════════════════════════════════════════════
  // 事业成就
  // ════════════════════════════════════════════════════════════
  career: [
    {
      id: 'first_job',
      name: '第一份工作',
      icon: '💼',
      description: '开始工作',
      condition: { flag: 'employed' },
      rarity: 'common'
    },
    {
      id: 'entrepreneur',
      name: '创业者',
      icon: '🚀',
      description: '开始创业',
      condition: { flag: 'is_entrepreneur' },
      rarity: 'uncommon'
    },
    {
      id: 'successful_entrepreneur',
      name: '成功创业者',
      icon: '🏆',
      description: '创业成功，财富达到80',
      condition: { flag: 'is_entrepreneur', minWealth: 80 },
      rarity: 'rare'
    },
    {
      id: 'manager',
      name: '管理层',
      icon: '👔',
      description: '成为管理者',
      condition: { flag: 'manager' },
      rarity: 'uncommon'
    },
    {
      id: 'ceo',
      name: 'CEO',
      icon: '👑',
      description: '成为CEO或高管',
      condition: { flag: 'executive' },
      rarity: 'rare'
    },
    {
      id: 'retired',
      name: '退休',
      icon: '🏖️',
      description: '安享退休生活',
      condition: { flag: 'retired' },
      rarity: 'common'
    }
  ],
  
  // ════════════════════════════════════════════════════════════
  // 特殊成就（隐藏）
  // ════════════════════════════════════════════════════════════
  special: [
    {
      id: 'rebirth',
      name: '涅槃重生',
      icon: '🔥',
      description: '从人生低谷重新崛起',
      condition: { flag: 'comeback' },
      rarity: 'legendary',
      hidden: true
    },
    {
      id: 'world_traveler',
      name: '环游世界',
      icon: '🌍',
      description: '走遍世界',
      condition: { flag: 'world_traveler' },
      rarity: 'epic',
      hidden: true
    },
    {
      id: 'philanthropist',
      name: '大慈善家',
      icon: '💝',
      description: '捐赠大量财富',
      condition: { flag: 'major_donor' },
      rarity: 'epic',
      hidden: true
    },
    {
      id: 'prodigy',
      name: '神童',
      icon: '🌟',
      description: '少年天才',
      condition: { flag: 'prodigy', maxAge: 15 },
      rarity: 'legendary',
      hidden: true
    },
    {
      id: 'all_round',
      name: '全能人生',
      icon: '🎯',
      description: '所有属性都达到60以上',
      condition: { minAllStats: 60 },
      rarity: 'legendary'
    },
    {
      id: 'perfect_life',
      name: '完美人生',
      icon: '✨',
      description: '所有属性都达到80以上',
      condition: { minAllStats: 80 },
      rarity: 'mythic'
    },
    {
      id: 'survivor',
      name: '绝处逢生',
      icon: '🔥',
      description: '经历重大危机后存活',
      condition: { flag: 'crisis_survivor' },
      rarity: 'epic',
      hidden: true
    },
    {
      id: 'second_chance',
      name: '第二次机会',
      icon: '🔄',
      description: '使用回溯功能重新开始',
      condition: { flag: 'used_rewind' },
      rarity: 'uncommon',
      hidden: true
    },
    {
      id: 'social_butterfly',
      name: '社交达人',
      icon: '🦋',
      description: '社交属性达到90',
      condition: { minSocial: 90 },
      rarity: 'rare'
    },
    {
      id: 'wisdom_sage',
      name: '智慧大师',
      icon: '🦉',
      description: '智慧达到95',
      condition: { minWisdom: 95 },
      rarity: 'epic'
    },
    {
      id: 'health_freak',
      name: '健康达人',
      icon: '💪',
      description: '健康达到95并保持10年',
      condition: { minHealth: 95, flag: 'health_maintained' },
      rarity: 'rare'
    },
    {
      id: 'artist_soul',
      name: '艺术灵魂',
      icon: '🎨',
      description: '创造力达到90',
      condition: { minCreativity: 90 },
      rarity: 'rare'
    },
    {
      id: 'charming',
      name: '魅力四射',
      icon: '💫',
      description: '魅力达到90',
      condition: { minCharm: 90 },
      rarity: 'rare'
    },
    {
      id: 'lucky_day',
      name: '幸运之星',
      icon: '🍀',
      description: '连续获得3次好运事件',
      condition: { flag: 'triple_lucky' },
      rarity: 'epic',
      hidden: true
    },
    {
      id: 'bookworm',
      name: '书虫',
      icon: '📚',
      description: '阅读100本书',
      condition: { flag: 'read_100_books' },
      rarity: 'uncommon'
    },
    {
      id: 'volunteer',
      name: '志愿者',
      icon: '🤝',
      description: '累计志愿1000小时',
      condition: { flag: 'volunteer_1000h' },
      rarity: 'uncommon'
    },
    {
      id: 'mentor',
      name: '人生导师',
      icon: '👨‍🏫',
      description: '帮助他人度过难关10次',
      condition: { flag: 'helped_10_people' },
      rarity: 'rare'
    },
    {
      id: 'pet_lover',
      name: '宠物达人',
      icon: '🐕',
      description: '养过5只以上宠物',
      condition: { flag: 'raised_5_pets' },
      rarity: 'uncommon'
    },
    {
      id: 'collector',
      name: '收藏家',
      icon: '🏆',
      description: '收集某类物品超过50件',
      condition: { flag: 'collector_50' },
      rarity: 'rare'
    },
    {
      id: 'wwdc_winner',
      name: 'WWDC设计大奖',
      icon: '🏆',
      description: '荣获苹果 WWDC 年度设计金奖',
      condition: { flag: 'wwdc_winner' },
      rarity: 'epic'
    },
    {
      id: 'app_store_featured',
      name: 'App Store首页推荐',
      icon: '📱',
      description: '开发的 App 荣获 App Store 首页编辑大图推荐',
      condition: { flag: 'app_store_featured' },
      rarity: 'rare'
    },
    {
      id: 'swift_council',
      name: 'Swift进化掌控者',
      icon: '🚀',
      description: '成为 Swift 进化委员会核心成员',
      condition: { flag: 'swift_council' },
      rarity: 'epic'
    },
    {
      id: 'silicon_valley_legend',
      name: '硅谷万亿传奇',
      icon: '👑',
      description: '创立万亿市值科技帝国并成功在纳斯达克 IPO',
      condition: { flag: 'silicon_valley_legend' },
      rarity: 'legendary'
    }
  ]
}

// ─── 成就稀有度颜色 ────────────────────────────────────────────
export const rarityColors = {
  common: { color: '#9e9e9e', name: '普通' },
  uncommon: { color: '#4caf50', name: '稀有' },
  rare: { color: '#2196f3', name: '精良' },
  epic: { color: '#9c27b0', name: '史诗' },
  legendary: { color: '#ff9800', name: '传说' },
  mythic: { color: '#f44336', name: '神话' }
}

// ─── 检查成就条件 ────────────────────────────────────────────
export function checkAchievement(achievement, character, storyState) {
  if (!achievement || !achievement.condition) return false
  
  const cond = achievement.condition
  const flags = (storyState && storyState.flags) || []
  
  // 年龄条件
  if (cond.minAge !== undefined && character.age < cond.minAge) return false
  if (cond.maxAge !== undefined && character.age > cond.maxAge) return false
  
  // 属性条件
  if (cond.minWealth !== undefined && character.wealth < cond.minWealth) return false
  if (cond.minIntelligence !== undefined && character.intelligence < cond.minIntelligence) return false
  if (cond.minHappiness !== undefined && character.happiness < cond.minHappiness) return false
  if (cond.minHealth !== undefined && character.health < cond.minHealth) return false
  if (cond.minSocial !== undefined && character.social < cond.minSocial) return false
  
  // 全属性条件
  if (cond.minAllStats !== undefined) {
    const min = cond.minAllStats
    if (character.wealth < min || character.intelligence < min || 
        character.happiness < min || character.health < min ||
        character.social < min) return false
  }
  
  // 标记条件
  if (cond.flag && !flags.includes(cond.flag)) return false
  
  // 家庭类型条件
  if (cond.familyType) {
    const familyTypes = Array.isArray(cond.familyType) ? cond.familyType : [cond.familyType]
    if (!familyTypes.includes(character.familyTypeId)) return false
  }
  
  // 孩子数量条件
  if (cond.minChildren !== undefined) {
    const children = ((storyState && storyState.relationship && storyState.relationship.children) || [])
    if (children.length < cond.minChildren) return false
  }
  
  return true
}

// ─── 获取所有成就（扁平化）────────────────────────────────────
export function getAllAchievements() {
  const all = []
  for (const category of Object.keys(achievements)) {
    for (const achievement of achievements[category]) {
      all.push({ ...achievement, category })
    }
  }
  return all
}

// ─── 检查新成就 ────────────────────────────────────────────
export function checkNewAchievements(character, storyState, unlockedIds) {
  const newAchievements = []
  const all = getAllAchievements()
  
  for (const achievement of all) {
    // 已解锁的跳过
    if (unlockedIds && unlockedIds.includes(achievement.id)) continue
    
    // 隐藏成就不显示提示（但仍然可以解锁）
    // if (achievement.hidden) continue
    
    // 检查条件
    if (checkAchievement(achievement, character, storyState)) {
      newAchievements.push(achievement)
    }
  }
  
  return newAchievements
}

// ─── 计算成就点数 ────────────────────────────────────────────
export function calculateAchievementPoints(unlockedAchievements) {
  const pointsMap = {
    common: 10,
    uncommon: 25,
    rare: 50,
    epic: 100,
    legendary: 200,
    mythic: 500
  }
  
  let total = 0
  for (const achievement of unlockedAchievements) {
    total += pointsMap[achievement.rarity] || 10
  }
  return total
}
