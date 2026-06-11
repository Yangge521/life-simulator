// ============================================================
// 人生模拟器 - 经济周期与社会事件系统
// 含：经济周期、社会大事、时代变迁、随机社会事件
// 让游戏世界更加真实，人生受到大环境影响
// ============================================================

// ─── 经济周期 ──────────────────────────────────────────────
export const economyCycles = [
  { id: 'boom', name: '经济繁荣', icon: '📈', multiplier: { wealth: 1.2, happiness: 1.1, stress: 0.9 }, duration: [3, 8] },
  { id: 'stable', name: '经济平稳', icon: '➡️', multiplier: { wealth: 1.0, happiness: 1.0, stress: 1.0 }, duration: [2, 5] },
  { id: 'recession', name: '经济衰退', icon: '📉', multiplier: { wealth: 0.8, happiness: 0.9, stress: 1.2 }, duration: [2, 5] },
  { id: 'depression', name: '经济萧条', icon: '💔', multiplier: { wealth: 0.6, happiness: 0.8, stress: 1.4 }, duration: [1, 3] },
  { id: 'recovery', name: '经济复苏', icon: '🌱', multiplier: { wealth: 0.9, happiness: 1.05, stress: 1.0 }, duration: [2, 4] }
]

// ─── 社会大事 ──────────────────────────────────────────────
export const socialEvents = [
  // ═══ 科技革命 ═══
  {
    id: 'internet_revolution', name: '互联网普及', icon: '🌐',
    ageRange: [15, 40], year: 2000,
    effect: { intelligence: 5, creativity: 5, social: 5 },
    description: '互联网改变了世界，也改变了你的生活',
    careerBonus: { tech: 20 },
    choices: [
      { text: '学习互联网技术', effect: { intelligence: 10, wealth: 5, creativity: 5 } },
      { text: '观望一下', effect: { wisdom: 3 } },
      { text: '投身互联网创业', effect: { wealth: -10, happiness: 5, creativity: 10 }, risk: { wealth: -20, happiness: -10 } }
    ]
  },
  {
    id: 'mobile_era', name: '移动互联网时代', icon: '📱',
    ageRange: [18, 45], year: 2010,
    effect: { social: 8, creativity: 3 },
    description: '智能手机改变了人们的生活方式',
    careerBonus: { tech: 25, creative: 10 },
    choices: [
      { text: '开发App', effect: { intelligence: 8, creativity: 5, wealth: 5 } },
      { text: '做自媒体', effect: { social: 10, creativity: 8, charm: 5 } },
      { text: '只是普通用户', effect: { happiness: 3 } }
    ]
  },
  {
    id: 'ai_revolution', name: 'AI革命', icon: '🤖',
    ageRange: [18, 55], year: 2023,
    effect: { intelligence: 8, creativity: 5 },
    description: '人工智能正在改变一切',
    careerBonus: { tech: 30 },
    careerThreat: { service: -15, manufacturing: -20 },
    choices: [
      { text: '学习AI技术', effect: { intelligence: 12, wealth: 5, creativity: 5 } },
      { text: '拥抱AI工具', effect: { intelligence: 5, creativity: 5, wisdom: 3 } },
      { text: '担心被AI取代', effect: { happiness: -8, stress: 10, wisdom: 5 } }
    ]
  },

  // ═══ 经济危机 ═══
  {
    id: 'financial_crisis', name: '金融危机', icon: '💸',
    ageRange: [20, 60], year: 2008,
    effect: { wealth: -15, happiness: -10 },
    description: '全球金融危机爆发，百业萧条',
    careerImpact: { finance: -25, tech: -10 },
    choices: [
      { text: '抄底投资', effect: { wealth: -20 }, risk: { wealth: 40, happiness: 20 }, successRate: 0.3 },
      { text: '保守储蓄', effect: { wisdom: 5, wealth: -5 } },
      { text: '失去工作', effect: { wealth: -25, happiness: -15 }, chance: 0.3 }
    ]
  },
  {
    id: 'housing_crisis', name: '房价暴涨', icon: '🏠',
    ageRange: [22, 50],
    effect: { wealth: -5, happiness: -8 },
    description: '房价一路飙升，年轻人望房兴叹',
    choices: [
      { text: '咬牙买房', effect: { wealth: -40, happiness: -10, wisdom: 5 }, longTermEffect: { wealth: 20 } },
      { text: '继续租房', effect: { happiness: -5, wealth: -3 } },
      { text: '回老家买房', effect: { wealth: -15, happiness: 5, social: -5 } }
    ]
  },

  // ═══ 公共卫生 ═══
  {
    id: 'pandemic', name: '全球疫情', icon: '😷',
    ageRange: [10, 80],
    effect: { health: -5, happiness: -15, social: -10 },
    description: '一场突如其来的疫情改变了世界',
    choices: [
      { text: '严格遵守防护', effect: { health: 5, happiness: -5, wisdom: 5 } },
      { text: '不在乎防护', effect: { health: -15, happiness: 3 }, risk: { health: -30, happiness: -20 }, successRate: 0.5 },
      { text: '做志愿者', effect: { wisdom: 10, social: 10, happiness: 5, health: -5 } }
    ]
  },

  // ═══ 社会变革 ═══
  {
    id: 'education_reform', name: '教育改革', icon: '📋',
    ageRange: [7, 22],
    effect: { education: 5 },
    description: '教育制度发生了重大改革',
    choices: [
      { text: '适应新制度', effect: { intelligence: 5, wisdom: 3 } },
      { text: '感到不适应', effect: { happiness: -5, education: -3 } }
    ]
  },
  {
    id: 'policy_change', name: '政策变化', icon: '📜',
    ageRange: [20, 70],
    effect: {},
    description: '新的政策出台，影响了很多人',
    careerImpact: { government: 10 },
    choices: [
      { text: '抓住机遇', effect: { wealth: 10, wisdom: 5 }, chance: 0.4 },
      { text: '观望等待', effect: { wisdom: 3 } }
    ]
  },

  // ═══ 自然灾害 ═══
  {
    id: 'earthquake', name: '地震', icon: '🌋',
    ageRange: [5, 80], chance: 0.002,
    effect: { health: -10, happiness: -15, wealth: -10 },
    description: '一场地震发生了',
    choices: [
      { text: '参与救援', effect: { wisdom: 10, social: 10, health: -5, happiness: 5 } },
      { text: '安全撤离', effect: { health: 5, wisdom: 3 } },
      { text: '捐款帮助', effect: { wealth: -5, happiness: 5, social: 5 } }
    ]
  },
  {
    id: 'flood', name: '洪灾', icon: '🌊',
    ageRange: [5, 80], chance: 0.003,
    effect: { health: -5, happiness: -10, wealth: -8 },
    description: '特大洪水来袭',
    choices: [
      { text: '参与抗洪', effect: { health: -8, wisdom: 10, social: 10 } },
      { text: '转移避险', effect: { health: 3, wealth: -3 } }
    ]
  },

  // ═══ 文化现象 ═══
  {
    id: 'cultural_wave', name: '文化热潮', icon: '🎵',
    ageRange: [10, 40],
    effect: { happiness: 5, creativity: 5 },
    description: '一股文化浪潮席卷而来',
    choices: [
      { text: '积极参与', effect: { happiness: 10, creativity: 8, social: 5 } },
      { text: '冷眼旁观', effect: { wisdom: 3 } }
    ]
  },
  {
    id: 'entrepreneurship_wave', name: '创业潮', icon: '🚀',
    ageRange: [20, 40],
    effect: { wealth: 5, creativity: 3 },
    description: '大众创业万众创新的时代',
    careerBonus: { tech: 15, service: 10 },
    choices: [
      { text: '投身创业', effect: { wealth: -10, happiness: 5, creativity: 10, wisdom: 5 }, risk: { wealth: -30, happiness: -15 }, successRate: 0.2 },
      { text: '找份稳定工作', effect: { wealth: 5, happiness: 3, wisdom: 3 } },
      { text: '先打工积累经验', effect: { wisdom: 8, intelligence: 3 } }
    ]
  }
]

// ─── 时代背景 ──────────────────────────────────────────────
export const eraBackgrounds = [
  {
    name: '改革开放初期', startYear: 1980, endYear: 1990,
    description: '改革开放的春风吹遍大地',
    effect: { wealth: 5, happiness: 5 },
    careerBonus: { manufacturing: 15, service: 10 },
    events: ['个体户兴起', '下海经商潮', '万元户出现']
  },
  {
    name: '经济腾飞期', startYear: 1990, endYear: 2000,
    description: '经济高速增长，机会遍地',
    effect: { wealth: 8, happiness: 3 },
    careerBonus: { manufacturing: 20, finance: 15 },
    events: ['房地产兴起', '股市狂飙', '国企改革']
  },
  {
    name: '互联网时代', startYear: 2000, endYear: 2010,
    description: '互联网改变了一切',
    effect: { intelligence: 5, creativity: 5 },
    careerBonus: { tech: 25, creative: 10 },
    events: ['门户网站', '电商崛起', '社交网络']
  },
  {
    name: '移动互联网时代', startYear: 2010, endYear: 2020,
    description: '手机成为了人的外延',
    effect: { social: 5, creativity: 3 },
    careerBonus: { tech: 30, service: 15 },
    events: ['移动支付', '短视频', '共享经济']
  },
  {
    name: 'AI时代', startYear: 2020, endYear: 2035,
    description: '人工智能正在重塑世界',
    effect: { intelligence: 8, creativity: 5 },
    careerBonus: { tech: 35 },
    careerThreat: { service: -15, manufacturing: -25 },
    events: ['大模型爆发', '自动驾驶', '人形机器人']
  }
]

// ─── 辅助函数 ──────────────────────────────────────────────

/**
 * 获取当前时代背景
 */
export function getCurrentEra(year) {
  for (var i = eraBackgrounds.length - 1; i >= 0; i--) {
    if (year >= eraBackgrounds[i].startYear && year <= eraBackgrounds[i].endYear) {
      return eraBackgrounds[i]
    }
  }
  return eraBackgrounds[eraBackgrounds.length - 1]
}

/**
 * 随机经济周期
 */
export function rollEconomyCycle() {
  const weights = [
    { cycle: economyCycles[0], weight: 25 }, // boom
    { cycle: economyCycles[1], weight: 40 }, // stable
    { cycle: economyCycles[2], weight: 20 }, // recession
    { cycle: economyCycles[3], weight: 5 },  // depression
    { cycle: economyCycles[4], weight: 10 }  // recovery
  ]
  
  var total = 0
  for (var i = 0; i < weights.length; i++) total += weights[i].weight
  var rand = Math.random() * total
  for (var i = 0; i < weights.length; i++) {
    rand -= weights[i].weight
    if (rand <= 0) return weights[i].cycle
  }
  return economyCycles[1]
}

/**
 * 检查是否触发社会事件
 */
export function checkSocialEvent(age, year, character) {
  for (var i = 0; i < socialEvents.length; i++) {
    var event = socialEvents[i]
    if (age < event.ageRange[0] || age > event.ageRange[1]) continue
    if (event.year && Math.abs(year - event.year) > 3) continue
    if (event.chance && Math.random() > event.chance) continue
    
    // 根据角色特征调整触发概率
    var triggerChance = 0.08
    if (character.wealth && character.wealth > 70) triggerChance += 0.03
    if (character.intelligence && character.intelligence > 70) triggerChance += 0.02
    
    if (Math.random() < triggerChance) return event
  }
  return null
}

/**
 * 应用经济周期对收入的影响
 */
export function applyEconomyToIncome(baseIncome, economyCycle) {
  if (!economyCycle || !economyCycle.multiplier) return baseIncome
  return Math.round(baseIncome * (economyCycle.multiplier.wealth || 1.0))
}

/**
 * 获取时代对职业的加成/惩罚
 */
export function getEraCareerModifier(careerIndustry, year) {
  var era = getCurrentEra(year)
  if (!era) return 0
  
  var bonus = 0
  if (era.careerBonus && era.careerBonus[careerIndustry]) {
    bonus += era.careerBonus[careerIndustry]
  }
  if (era.careerThreat && era.careerThreat[careerIndustry]) {
    bonus += era.careerThreat[careerIndustry]
  }
  
  return bonus / 100 // 返回百分比
}

/**
 * 生成年度社会大事新闻（纯展示用）
 */
export function generateYearNews(year, economy) {
  var news = []
  var era = getCurrentEra(year)
  
  if (era && era.events) {
    var event = era.events[Math.floor(Math.random() * era.events.length)]
    news.push({ type: 'era', text: '时代大事：' + event, icon: '📰' })
  }
  
  if (economy) {
    news.push({ type: 'economy', text: '经济形势：' + economy.name, icon: economy.icon })
  }
  
  // 随机小新闻
  var smallNews = [
    '今年夏天特别热', '今年冬天特别冷', '某明星爆出大瓜',
    '某地发生了交通事故', '新开了一家网红餐厅', '今年的诺贝尔奖揭晓了',
    '世界杯开始了', '奥运会即将举办', '某部电影票房破纪录',
    '新的科技产品发布了', '某城市被评为最宜居城市'
  ]
  if (Math.random() < 0.3) {
    news.push({ type: 'daily', text: smallNews[Math.floor(Math.random() * smallNews.length)], icon: '📝' })
  }
  
  return news
}
