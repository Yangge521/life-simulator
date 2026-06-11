// ============================================================
// 人生模拟器 - 健康系统（深度版）
// 含：疾病体系、心理健康、生活方式、成瘾/康复、体检、中医
// ============================================================

// ─── 疾病类型 ──────────────────────────────────────────────
export const diseases = [
  // ═══ 轻症 ═══
  {
    id: 'cold', name: '感冒', icon: '🤧', severity: 'minor',
    effect: { health: -5, happiness: -5 }, duration: 1, treatmentCost: 1,
    ageRange: [0, 100], contagionRate: 0.1
  },
  {
    id: 'flu', name: '流感', icon: '🤒', severity: 'minor',
    effect: { health: -8, happiness: -8 }, duration: 2, treatmentCost: 3,
    ageRange: [0, 100], contagionRate: 0.15
  },
  {
    id: 'food_poisoning', name: '食物中毒', icon: '🤮', severity: 'minor',
    effect: { health: -10, happiness: -10 }, duration: 1, treatmentCost: 2,
    ageRange: [5, 100]
  },
  {
    id: 'sprain', name: '扭伤', icon: '🦴', severity: 'minor',
    effect: { health: -5, happiness: -3 }, duration: 2, treatmentCost: 2,
    ageRange: [5, 80]
  },
  {
    id: 'conjunctivitis', name: '红眼病', icon: '👁️', severity: 'minor',
    effect: { health: -3, happiness: -5, charm: -3 }, duration: 1, treatmentCost: 1,
    ageRange: [3, 60], contagionRate: 0.2
  },

  // ═══ 中度 ═══
  {
    id: 'depression', name: '抑郁症', icon: '😢', severity: 'moderate',
    effect: { health: -10, happiness: -30, social: -10 }, duration: 5, treatmentCost: 10,
    ageRange: [15, 80], trigger: { happiness: { max: 30 } },
    choices: [
      { text: '寻求心理治疗', effect: { happiness: 15, health: 5, wealth: -10 }, wisdom: 10 },
      { text: '自我调节', effect: { happiness: 5, wisdom: 5 }, chance: 0.4 },
      { text: '忽视不管', effect: { happiness: -10, health: -5 }, chance: 0.7 }
    ]
  },
  {
    id: 'anxiety', name: '焦虑症', icon: '😰', severity: 'moderate',
    effect: { health: -8, happiness: -20, intelligence: -5 }, duration: 3, treatmentCost: 8,
    ageRange: [15, 70], trigger: { happiness: { max: 40 } }
  },
  {
    id: 'diabetes', name: '糖尿病', icon: '💉', severity: 'moderate',
    effect: { health: -15, happiness: -10 }, duration: -1, treatmentCost: 20,
    ageRange: [30, 100], trigger: { health: { max: 50 } }
  },
  {
    id: 'hypertension', name: '高血压', icon: '🩸', severity: 'moderate',
    effect: { health: -12, happiness: -5 }, duration: -1, treatmentCost: 15,
    ageRange: [35, 100], trigger: { health: { max: 55 } }
  },
  {
    id: 'asthma', name: '哮喘', icon: '😮‍💨', severity: 'moderate',
    effect: { health: -12, happiness: -8 }, duration: -1, treatmentCost: 12,
    ageRange: [5, 80]
  },
  {
    id: 'gastritis', name: '胃炎', icon: '🫁', severity: 'moderate',
    effect: { health: -10, happiness: -8 }, duration: 3, treatmentCost: 8,
    ageRange: [18, 80], trigger: { happiness: { max: 50 } }
  },
  {
    id: 'insomnia', name: '失眠症', icon: '😴', severity: 'moderate',
    effect: { health: -8, happiness: -12, intelligence: -5 }, duration: 4, treatmentCost: 6,
    ageRange: [18, 80], trigger: { happiness: { max: 45 } }
  },

  // ═══ 重症 ═══
  {
    id: 'heart_disease', name: '心脏病', icon: '❤️‍🩹', severity: 'severe',
    effect: { health: -30, happiness: -20 }, duration: -1, treatmentCost: 50,
    ageRange: [40, 100], trigger: { health: { max: 40 } }, deathRisk: 0.15
  },
  {
    id: 'stroke', name: '中风', icon: '🧠', severity: 'severe',
    effect: { health: -35, happiness: -25, intelligence: -15 }, duration: -1, treatmentCost: 60,
    ageRange: [45, 100], trigger: { health: { max: 35 } }, deathRisk: 0.2
  },
  {
    id: 'kidney_disease', name: '肾病', icon: '🫘', severity: 'severe',
    effect: { health: -25, happiness: -15 }, duration: -1, treatmentCost: 40,
    ageRange: [30, 100], trigger: { health: { max: 45 } }
  },
  {
    id: 'liver_disease', name: '肝病', icon: '🫀', severity: 'severe',
    effect: { health: -20, happiness: -15 }, duration: -1, treatmentCost: 35,
    ageRange: [25, 100], trigger: { health: { max: 50 } }
  },
  {
    id: 'pneumonia', name: '肺炎', icon: '🫁', severity: 'severe',
    effect: { health: -25, happiness: -15 }, duration: 3, treatmentCost: 25,
    ageRange: [0, 100], deathRisk: 0.05
  },

  // ═══ 危重 ═══
  {
    id: 'cancer', name: '癌症', icon: '🎗️', severity: 'critical',
    effect: { health: -50, happiness: -40, wealth: -30 }, duration: -1, treatmentCost: 100,
    ageRange: [30, 100], deathRisk: 0.3,
    choices: [
      { text: '积极治疗', effect: { health: 10, wealth: -50, happiness: -10 }, deathRiskReduction: 0.15 },
      { text: '保守治疗', effect: { wealth: -10, happiness: 5 }, deathRiskReduction: 0.05 },
      { text: '放弃治疗', effect: { happiness: -20, wisdom: 15 } }
    ]
  },
  {
    id: 'alzheimer', name: '阿尔茨海默症', icon: '🧓', severity: 'critical',
    effect: { health: -20, intelligence: -30, wisdom: -20, happiness: -15 }, duration: -1, treatmentCost: 30,
    ageRange: [60, 100], deathRisk: 0.1
  },
  {
    id: 'leukemia', name: '白血病', icon: '🩸', severity: 'critical',
    effect: { health: -45, happiness: -35, wealth: -40 }, duration: -1, treatmentCost: 80,
    ageRange: [5, 60], deathRisk: 0.25
  },

  // ═══ 罕见病 ═══
  {
    id: 'als', name: '渐冻症', icon: '🧊', severity: 'critical',
    effect: { health: -60, happiness: -50, social: -20 }, duration: -1, treatmentCost: 50,
    ageRange: [30, 70], deathRisk: 0.4, chance: 0.0003
  },
  {
    id: 'rare_disease', name: '罕见病', icon: '❓', severity: 'critical',
    effect: { health: -40, happiness: -30, wealth: -20 }, duration: -1, treatmentCost: 60,
    ageRange: [0, 60], deathRisk: 0.15, chance: 0.0005
  }
]

// ─── 心理状态系统 ──────────────────────────────────────────
export const mentalStates = {
  excellent: { name: '心理健康', icon: '🌞', effect: { happiness: 5 }, threshold: 80 },
  good: { name: '心理良好', icon: '🌤️', effect: { happiness: 2 }, threshold: 60 },
  normal: { name: '心理正常', icon: '☁️', effect: {}, threshold: 40 },
  low: { name: '心理低落', icon: '🌧️', effect: { happiness: -3 }, threshold: 20 },
  crisis: { name: '心理危机', icon: '⛈️', effect: { happiness: -8, health: -3 }, threshold: 0 }
}

/**
 * 获取当前心理状态
 */
export function getMentalState(happiness) {
  if (happiness >= 80) return mentalStates.excellent
  if (happiness >= 60) return mentalStates.good
  if (happiness >= 40) return mentalStates.normal
  if (happiness >= 20) return mentalStates.low
  return mentalStates.crisis
}

// ─── 成瘾系统 ──────────────────────────────────────────────
export const addictions = [
  {
    id: 'smoking', name: '吸烟', icon: '🚬',
    effect: { health: -3, happiness: 2 }, // 短期快乐，长期伤害
    yearlyDamage: { health: -2, happiness: -1 },
    quitDifficulty: 0.4, // 戒断成功率
    ageRange: [14, 80],
    triggerChance: 0.05
  },
  {
    id: 'drinking', name: '酗酒', icon: '🍺',
    effect: { health: -5, happiness: 5 },
    yearlyDamage: { health: -3, happiness: -2, intelligence: -1 },
    quitDifficulty: 0.3,
    ageRange: [16, 80],
    triggerChance: 0.03
  },
  {
    id: 'gambling', name: '赌博', icon: '🎰',
    effect: { wealth: -10, happiness: 5 },
    yearlyDamage: { wealth: -8, happiness: -5, social: -3 },
    quitDifficulty: 0.2,
    ageRange: [18, 70],
    triggerChance: 0.02
  },
  {
    id: 'gaming', name: '游戏沉迷', icon: '🎮',
    effect: { intelligence: -3, happiness: 5, health: -2 },
    yearlyDamage: { intelligence: -2, health: -1, social: -2 },
    quitDifficulty: 0.5,
    ageRange: [10, 35],
    triggerChance: 0.06
  },
  {
    id: 'drugs', name: '毒品', icon: '☠️',
    effect: { health: -15, happiness: 10, intelligence: -10 },
    yearlyDamage: { health: -10, happiness: -8, intelligence: -5, social: -10 },
    quitDifficulty: 0.1,
    ageRange: [15, 50],
    triggerChance: 0.005
  }
]

// ─── 生活方式 ──────────────────────────────────────────────
export const lifestyles = {
  healthy: {
    name: '健康生活', icon: '🏃',
    effects: { health: 3, happiness: 2, wisdom: 1 },
    requirements: { health: 50 },
    description: '规律作息，均衡饮食，坚持锻炼'
  },
  sedentary: {
    name: '久坐不动', icon: '🛋️',
    effects: { health: -2, happiness: -1 },
    description: '缺乏运动，长时间坐着'
  },
  workaholic: {
    name: '工作狂', icon: '💼',
    effects: { wealth: 3, health: -2, happiness: -1, stress: 3 },
    description: '拼命工作，忽视健康'
  },
  balanced: {
    name: '劳逸结合', icon: '⚖️',
    effects: { health: 1, happiness: 1, wisdom: 1 },
    description: '工作和生活保持平衡'
  },
  indulgent: {
    name: '放纵享乐', icon: '🎉',
    effects: { happiness: 3, health: -2, wealth: -2 },
    description: '及时行乐，不太在意未来'
  }
}

// ─── 健康事件 ──────────────────────────────────────────────
export const healthEvents = [
  // 正面
  { text: '你开始坚持锻炼身体', effect: { health: 10, happiness: 5 }, ageRange: [15, 70] },
  { text: '你戒掉了不良习惯', effect: { health: 15, wisdom: 5 }, ageRange: [20, 60] },
  { text: '你做了一次全面体检，发现身体很健康', effect: { happiness: 10 }, ageRange: [30, 80] },
  { text: '你开始注重养生', effect: { health: 10, wisdom: 5 }, ageRange: [45, 80] },
  { text: '你开始练太极拳', effect: { health: 8, happiness: 5, wisdom: 3 }, ageRange: [40, 90] },
  { text: '你参加了马拉松比赛', effect: { health: 5, happiness: 10, social: 5 }, ageRange: [20, 50] },
  { text: '你学会了冥想，内心更加平静', effect: { happiness: 8, wisdom: 5, health: 3 }, ageRange: [18, 80] },
  { text: '你换了一个更健康的饮食习惯', effect: { health: 8, happiness: 3 }, ageRange: [15, 80] },
  { text: '你开始每天散步', effect: { health: 5, happiness: 3 }, ageRange: [30, 100] },

  // 负面
  { text: '你因为工作压力大，身体出了问题', effect: { health: -15, happiness: -10 }, ageRange: [25, 55] },
  { text: '你住院治疗了一段时间', effect: { health: -20, wealth: -20, happiness: -15 }, ageRange: [40, 90] },
  { text: '你因为熬夜导致身体不适', effect: { health: -8, happiness: -5, intelligence: -3 }, ageRange: [15, 50] },
  { text: '你在运动中受伤了', effect: { health: -10, happiness: -5 }, ageRange: [10, 60] },
  { text: '你因为压力暴饮暴食', effect: { health: -5, happiness: -3, wealth: -3 }, ageRange: [18, 60] },
  { text: '你的视力严重下降', effect: { health: -5, happiness: -5 }, ageRange: [15, 60] },
  { text: '你因为久坐导致腰椎出了问题', effect: { health: -10, happiness: -8 }, ageRange: [25, 55] },

  // 选择型
  {
    text: '你发现自己有了一个不良嗜好',
    effect: {},
    ageRange: [14, 50],
    choices: [
      { text: '尝试一下', effect: { happiness: 8, health: -3 }, addictionRisk: true },
      { text: '坚决拒绝', effect: { wisdom: 8, happiness: -2 } }
    ]
  },
  {
    text: '医生建议你做一个手术',
    effect: {},
    ageRange: [35, 80],
    choices: [
      { text: '接受手术', effect: { health: 15, wealth: -30, happiness: -5 } },
      { text: '保守治疗', effect: { health: -5, wealth: -10 } },
      { text: '听天由命', effect: { wisdom: 5 } }
    ]
  },
  {
    text: '有人推荐你一种保健品',
    effect: {},
    ageRange: [40, 90],
    choices: [
      { text: '买来试试', effect: { wealth: -5, health: 2, happiness: 2 } },
      { text: '不信这些', effect: { wisdom: 3 } }
    ]
  }
]

// ─── 体检项目 ──────────────────────────────────────────────
export const checkupItems = [
  { id: 'basic', name: '基础体检', cost: 2, detectionRate: 0.5, ageRange: [20, 100] },
  { id: 'standard', name: '标准体检', cost: 5, detectionRate: 0.75, ageRange: [30, 100] },
  { id: 'comprehensive', name: '全面体检', cost: 15, detectionRate: 0.9, ageRange: [40, 100] },
  { id: 'premium', name: '高端体检', cost: 30, detectionRate: 0.95, ageRange: [50, 100] }
]

// ─── 中医养生 ──────────────────────────────────────────────
export const tcmRemedies = [
  { name: '艾灸', icon: '🔥', effect: { health: 5, happiness: 3 }, cost: 3 },
  { name: '针灸', icon: '📍', effect: { health: 8, happiness: -2 }, cost: 5 },
  { name: '中药调理', icon: '🌿', effect: { health: 6, wisdom: 2 }, cost: 4 },
  { name: '拔罐', icon: '🫙', effect: { health: 4, happiness: -1 }, cost: 2 },
  { name: '太极拳', icon: '🥋', effect: { health: 5, happiness: 3, wisdom: 3 }, cost: 0 },
  { name: '八段锦', icon: '🧘', effect: { health: 5, happiness: 2, wisdom: 2 }, cost: 0 }
]

// ─── 死亡原因 ──────────────────────────────────────────────
export const deathCauses = [
  { cause: '自然老死', minAge: 70, healthThreshold: 0, icon: '🕊️' },
  { cause: '疾病', minAge: 0, healthThreshold: 10, icon: '🦠' },
  { cause: '意外事故', minAge: 0, healthThreshold: 0, chance: 0.001, icon: '⚠️' },
  { cause: '心脏病发作', minAge: 40, healthThreshold: 20, icon: '❤️‍🩹' },
  { cause: '癌症', minAge: 30, healthThreshold: 15, icon: '🎗️' },
  { cause: '自杀', minAge: 15, healthThreshold: 5, happinessThreshold: 10, icon: '😢' },
  { cause: '过劳死', minAge: 25, healthThreshold: 30, stressThreshold: 80, icon: '💀' },
  { cause: '传染病', minAge: 0, healthThreshold: 25, icon: '🦠' }
]

// ─── 辅助函数 ──────────────────────────────────────────────

/**
 * 检查是否触发疾病
 */
export function checkDisease(character) {
  const eligibleDiseases = diseases.filter(function(d) {
    if (character.age < d.ageRange[0] || character.age > d.ageRange[1]) return false
    if (d.chance && Math.random() > d.chance) return false
    if (d.trigger) {
      var keys = Object.keys(d.trigger)
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var condition = d.trigger[key]
        if (condition.max && character[key] > condition.max) return false
        if (condition.min && character[key] < condition.min) return false
      }
    }
    return true
  })
  
  if (eligibleDiseases.length === 0) return null
  
  const baseChance = (100 - (character.health || 50)) / 500
  if (Math.random() > baseChance) return null
  
  return eligibleDiseases[Math.floor(Math.random() * eligibleDiseases.length)]
}

/**
 * 检查是否形成成瘾
 */
export function checkAddiction(character) {
  const eligible = addictions.filter(function(a) {
    if (character.age < a.ageRange[0] || character.age > a.ageRange[1]) return false
    if (character._addictions && character._addictions.indexOf(a.id) !== -1) return false
    return Math.random() < a.triggerChance
  })
  
  return eligible.length > 0 ? eligible[0] : null
}

/**
 * 尝试戒断成瘾
 */
export function tryQuitAddiction(addictionId, willpower) {
  const addiction = addictions.find(a => a.id === addictionId)
  if (!addiction) return { success: false, message: '未知成瘾类型' }
  
  const successChance = addiction.quitDifficulty * (1 + (willpower || 50) / 200)
  const success = Math.random() < successChance
  
  return {
    success,
    message: success ? `你成功戒掉了${addiction.name}！` : `戒断${addiction.name}失败了...`,
    addiction
  }
}

/**
 * 计算成瘾年度伤害
 */
export function calculateAddictionDamage(character) {
  if (!character._addictions || character._addictions.length === 0) return {}
  
  const damage = { health: 0, happiness: 0, wealth: 0, intelligence: 0, social: 0 }
  for (const addicId of character._addictions) {
    const addiction = addictions.find(a => a.id === addicId)
    if (addiction && addiction.yearlyDamage) {
      for (const key of Object.keys(addiction.yearlyDamage)) {
        damage[key] = (damage[key] || 0) + addiction.yearlyDamage[key]
      }
    }
  }
  return damage
}

/**
 * 计算生活方式对属性的年度影响
 */
export function calculateLifestyleEffect(lifestyle) {
  if (!lifestyle) return {}
  const style = lifestyles[lifestyle]
  return style ? style.effects : {}
}

/**
 * 进行体检
 */
export function performCheckup(character, checkupLevel) {
  const checkup = checkupItems.find(c => c.id === checkupLevel) || checkupItems[0]
  
  // 检查能否发现现有疾病
  const discoveredDiseases = []
  for (const disease of diseases) {
    if (character.age < disease.ageRange[0] || character.age > disease.ageRange[1]) continue
    if (Math.random() < checkup.detectionRate * 0.3) {
      discoveredDiseases.push(disease)
    }
  }
  
  return {
    cost: checkup.cost,
    discovered: discoveredDiseases,
    healthReport: generateHealthReport(character)
  }
}

/**
 * 生成健康报告
 */
function generateHealthReport(character) {
  const health = character.health || 50
  const happiness = character.happiness || 50
  
  let overall = '健康'
  if (health >= 80) overall = '非常健康'
  else if (health >= 60) overall = '比较健康'
  else if (health >= 40) overall = '亚健康'
  else if (health >= 20) overall = '不太健康'
  else overall = '需要就医'
  
  const mentalState = getMentalState(happiness)
  
  return {
    overall,
    mentalState: mentalState.name,
    mentalIcon: mentalState.icon,
    recommendations: generateRecommendations(character)
  }
}

/**
 * 生成健康建议
 */
function generateRecommendations(character) {
  const recs = []
  if ((character.health || 50) < 50) recs.push('建议增加运动量')
  if ((character.happiness || 50) < 40) recs.push('建议关注心理健康')
  if (character._addictions && character._addictions.length > 0) recs.push('建议戒除不良嗜好')
  if ((character.intelligence || 50) < 40 && character.age > 60) recs.push('建议多做脑力活动')
  if (character.age > 50) recs.push('建议每年进行一次全面体检')
  if (recs.length === 0) recs.push('继续保持良好的生活习惯')
  return recs
}
