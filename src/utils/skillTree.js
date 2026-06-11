// ============================================================
// 人生模拟器 - 技能树系统
// 可以在学习/工作中提升技能等级，影响事件结果和结局
// ============================================================

// ─── 技能定义 ────────────────────────────────────────────────
export const skillTree = {

  // ── 学术技能 ──
  academic: {
    id: 'academic',
    name: '学术',
    icon: '📚',
    description: '学习能力和知识储备',
    maxLevel: 10,
    subSkills: [
      {
        id: 'math',
        name: '数学',
        icon: '🔢',
        levels: [
          { level: 1, name: '会算数', bonus: { intelligence: 2 } },
          { level: 3, name: '数学达人', bonus: { intelligence: 5 } },
          { level: 5, name: '数学竞赛选手', bonus: { intelligence: 10 }, unlockCareer: ['scientist', 'engineer', 'programmer', 'finance'] },
          { level: 8, name: '数学天才', bonus: { intelligence: 18 }, unlockEvent: 'math_breakthrough' }
        ]
      },
      {
        id: 'language',
        name: '语言',
        icon: '📝',
        levels: [
          { level: 1, name: '能说会道', bonus: { charm: 3 } },
          { level: 3, name: '文采斐然', bonus: { charm: 5, creativity: 3 } },
          { level: 5, name: '作家级别', bonus: { creativity: 10, charm: 8 }, unlockCareer: ['journalist', 'teacher'] },
          { level: 8, name: '文学大师', bonus: { wisdom: 15, creativity: 15 }, unlockEvent: 'publish_masterpiece' }
        ]
      },
      {
        id: 'science',
        name: '科学',
        icon: '🔬',
        levels: [
          { level: 1, name: '科学爱好者', bonus: { intelligence: 3 } },
          { level: 3, name: '小发明家', bonus: { intelligence: 5, creativity: 5 } },
          { level: 5, name: '研究员', bonus: { intelligence: 12 }, unlockCareer: ['scientist', 'doctor'] },
          { level: 8, name: '学术权威', bonus: { intelligence: 20, wisdom: 10 }, unlockEvent: 'noble_prize' }
        ]
      }
    ]
  },

  // ── 艺术技能 ──
  art: {
    id: 'art',
    name: '艺术',
    icon: '🎨',
    description: '艺术修养和创造力',
    maxLevel: 10,
    subSkills: [
      {
        id: 'music',
        name: '音乐',
        icon: '🎵',
        levels: [
          { level: 1, name: '音感不错', bonus: { creativity: 3, charm: 2 } },
          { level: 3, name: '会演奏乐器', bonus: { creativity: 5, charm: 5 }, unlockEvent: 'join_band' },
          { level: 5, name: '音乐人', bonus: { creativity: 10, charm: 8, happiness: 5 }, unlockCareer: ['artist_pro'] },
          { level: 8, name: '音乐大师', bonus: { creativity: 15, charm: 15 }, unlockEvent: 'famous_musician' }
        ]
      },
      {
        id: 'painting',
        name: '绘画',
        icon: '🖌️',
        levels: [
          { level: 1, name: '涂鸦爱好者', bonus: { creativity: 3 } },
          { level: 3, name: '画技不错', bonus: { creativity: 6 } },
          { level: 5, name: '画师', bonus: { creativity: 10, charm: 3 }, unlockEvent: 'art_exhibition' },
          { level: 8, name: '著名画家', bonus: { creativity: 18, charm: 10 }, unlockEvent: 'art_masterpiece' }
        ]
      },
      {
        id: 'acting',
        name: '表演',
        icon: '🎭',
        levels: [
          { level: 1, name: '不怕上台', bonus: { charm: 5 } },
          { level: 3, name: '演技在线', bonus: { charm: 8, social: 3 } },
          { level: 5, name: '专业演员', bonus: { charm: 15, social: 5 }, unlockCareer: ['artist_pro'] },
          { level: 8, name: '影帝/影后', bonus: { charm: 20, social: 10 }, unlockEvent: 'win_award' }
        ]
      }
    ]
  },

  // ── 社交技能 ──
  social: {
    id: 'social',
    name: '社交',
    icon: '👥',
    description: '人际交往和领导力',
    maxLevel: 10,
    subSkills: [
      {
        id: 'leadership',
        name: '领导力',
        icon: '👑',
        levels: [
          { level: 1, name: '小组长', bonus: { social: 3 } },
          { level: 3, name: '团队领袖', bonus: { social: 6, charm: 3 } },
          { level: 5, name: '管理者', bonus: { social: 10, wisdom: 5 }, unlockCareer: ['manager', 'entrepreneur'] },
          { level: 8, name: '商业领袖', bonus: { social: 18, wealth: 5 }, unlockEvent: 'ceo' }
        ]
      },
      {
        id: 'negotiation',
        name: '谈判',
        icon: '🤝',
        levels: [
          { level: 1, name: '会讨价还价', bonus: { social: 2, wealth: 2 } },
          { level: 3, name: '谈判高手', bonus: { social: 5, wealth: 5 } },
          { level: 5, name: '商业谈判专家', bonus: { social: 8, wealth: 10 }, unlockCareer: ['sales', 'lawyer', 'finance'] },
          { level: 8, name: '外交官级别', bonus: { social: 15, wisdom: 8 }, unlockEvent: 'diplomat' }
        ]
      },
      {
        id: 'persuasion',
        name: '说服力',
        icon: '🗣️',
        levels: [
          { level: 1, name: '能说会道', bonus: { charm: 3, social: 2 } },
          { level: 3, name: '说服力强', bonus: { charm: 6, social: 4 } },
          { level: 5, name: '演说家', bonus: { charm: 10, social: 8 }, unlockEvent: 'famous_speech' },
          { level: 8, name: '影响力人物', bonus: { charm: 15, social: 12 }, unlockEvent: 'social_influencer' }
        ]
      }
    ]
  },

  // ── 生活技能 ──
  life: {
    id: 'life',
    name: '生活',
    icon: '🌿',
    description: '生活技能和自我管理',
    maxLevel: 10,
    subSkills: [
      {
        id: 'cooking',
        name: '厨艺',
        icon: '🍳',
        levels: [
          { level: 1, name: '能做家常菜', bonus: { health: 2, happiness: 2 } },
          { level: 3, name: '厨艺不错', bonus: { health: 5, happiness: 5 } },
          { level: 5, name: '美食达人', bonus: { health: 8, happiness: 8, charm: 3 }, unlockCareer: ['chef'] },
          { level: 8, name: '厨神', bonus: { health: 12, happiness: 12, social: 5 }, unlockEvent: 'open_restaurant' }
        ]
      },
      {
        id: 'fitness',
        name: '健身',
        icon: '🏋️',
        levels: [
          { level: 1, name: '偶尔运动', bonus: { health: 3 } },
          { level: 3, name: '坚持锻炼', bonus: { health: 6, happiness: 3 } },
          { level: 5, name: '健身达人', bonus: { health: 10, charm: 5 }, unlockEvent: 'fitness_competition' },
          { level: 8, name: '运动员级别', bonus: { health: 18, charm: 8 }, unlockEvent: 'pro_athlete' }
        ]
      },
      {
        id: 'finance_mgmt',
        name: '理财',
        icon: '📈',
        levels: [
          { level: 1, name: '会存钱', bonus: { wealth: 3, wisdom: 2 } },
          { level: 3, name: '会投资', bonus: { wealth: 6, wisdom: 4 } },
          { level: 5, name: '投资达人', bonus: { wealth: 10, wisdom: 6 }, unlockEvent: 'smart_investment' },
          { level: 8, name: '金融大鳄', bonus: { wealth: 18, wisdom: 10 }, unlockEvent: 'wall_street' }
        ]
      }
    ]
  },

  // ── 特殊技能（隐藏）──
  special: {
    id: 'special',
    name: '特殊',
    icon: '✨',
    description: '特殊技能，需要特定条件解锁',
    maxLevel: 5,
    hidden: true,
    subSkills: [
      {
        id: 'martial_arts',
        name: '武术',
        icon: '🥋',
        levels: [
          { level: 1, name: '学了点防身术', bonus: { health: 5, wisdom: 3 } },
          { level: 3, name: '武术高手', bonus: { health: 10, charm: 5 } },
          { level: 5, name: '一代宗师', bonus: { health: 15, wisdom: 10, charm: 10 }, unlockEvent: 'martial_arts_master' }
        ],
        unlockCondition: { flag: 'martial_arts_start' }
      },
      {
        id: 'programming',
        name: '编程',
        icon: '💻',
        levels: [
          { level: 1, name: 'Hello World', bonus: { intelligence: 3 } },
          { level: 3, name: '能做小项目', bonus: { intelligence: 6, wealth: 3 } },
          { level: 5, name: '技术大牛', bonus: { intelligence: 12, wealth: 8 }, unlockEvent: 'tech_ceo' }
        ],
        unlockCondition: { flag: 'saw_computer' }
      },
      {
        id: 'medicine',
        name: '医术',
        icon: '💊',
        levels: [
          { level: 1, name: '懂点急救', bonus: { health: 3, wisdom: 3 } },
          { level: 3, name: '会看常见病', bonus: { health: 5, wisdom: 5 } },
          { level: 5, name: '神医', bonus: { health: 10, wisdom: 10 }, unlockEvent: 'save_lives' }
        ],
        unlockCondition: { flag: 'medical_interest' }
      }
    ]
  }
}

// ─── 初始化技能状态 ────────────────────────────────────────────
export function initSkillState() {
  var skills = {}
  var categories = Object.keys(skillTree)
  for (var i = 0; i < categories.length; i++) {
    var cat = skillTree[categories[i]]
    skills[cat.id] = {}
    var subs = cat.subSkills
    for (var j = 0; j < subs.length; j++) {
      skills[cat.id][subs[j].id] = 0
    }
  }
  return skills
}

// ─── 升级技能 ────────────────────────────────────────────────
export function upgradeSkill(skillState, categoryId, subSkillId, amount) {
  amount = amount || 1
  if (!skillState[categoryId]) return skillState
  var current = skillState[categoryId][subSkillId] || 0
  var category = skillTree[categoryId]
  var maxLevel = category ? (category.maxLevel || 10) : 10
  skillState[categoryId][subSkillId] = Math.min(maxLevel, current + amount)
  return skillState
}

// ─── 获取技能等级对应的奖励 ────────────────────────────────────
export function getSkillBonuses(skillState) {
  var totalBonus = {}
  var categories = Object.keys(skillTree)
  for (var i = 0; i < categories.length; i++) {
    var catId = categories[i]
    var cat = skillTree[catId]
    if (!cat) continue
    var subs = cat.subSkills
    for (var j = 0; j < subs.length; j++) {
      var sub = subs[j]
      var level = skillState[catId] ? (skillState[catId][sub.id] || 0) : 0
      var levels = sub.levels || []
      // 找到当前等级对应的最高奖励
      var bestLevel = null
      for (var k = 0; k < levels.length; k++) {
        if (levels[k].level <= level) {
          bestLevel = levels[k]
        }
      }
      if (bestLevel && bestLevel.bonus) {
        var keys = Object.keys(bestLevel.bonus)
        for (var m = 0; m < keys.length; m++) {
          var key = keys[m]
          totalBonus[key] = (totalBonus[key] || 0) + bestLevel.bonus[key]
        }
      }
    }
  }
  return totalBonus
}

// ─── 根据当前状态推荐可以升级的技能 ─────────────────────────────
export function getSuggestedSkillUps(skillState, age, storyState) {
  var suggestions = []

  // 根据年龄推荐
  if (age >= 6 && age <= 17) {
    suggestions.push({ catId: 'academic', subId: 'math', reason: '学生时期适合提升数学' })
    suggestions.push({ catId: 'academic', subId: 'language', reason: '学生时期适合提升语言' })
    suggestions.push({ catId: 'art', subId: 'music', reason: '年轻时候学乐器最好' })
  }
  if (age >= 18 && age <= 34) {
    suggestions.push({ catId: 'social', subId: 'leadership', reason: '职场需要领导力' })
    suggestions.push({ catId: 'social', subId: 'negotiation', reason: '学会谈判很重要' })
    suggestions.push({ catId: 'life', subId: 'finance_mgmt', reason: '开始理财吧' })
  }
  if (age >= 35) {
    suggestions.push({ catId: 'life', subId: 'fitness', reason: '身体健康最重要' })
    suggestions.push({ catId: 'life', subId: 'cooking', reason: '做饭养生' })
  }

  // 根据天赋推荐
  var flags = storyState ? storyState.flags || [] : []
  if (flags.indexOf('saw_computer') !== -1) {
    suggestions.push({ catId: 'special', subId: 'programming', reason: '你发现了编程的乐趣' })
  }
  if (flags.indexOf('martial_arts_start') !== -1) {
    suggestions.push({ catId: 'special', subId: 'martial_arts', reason: '继续修炼武术' })
  }
  if (flags.indexOf('medical_interest') !== -1) {
    suggestions.push({ catId: 'special', subId: 'medicine', reason: '你对医学有浓厚兴趣' })
  }

  return suggestions
}

// ─── 检查技能是否解锁了特定职业 ─────────────────────────────
export function getUnlockedCareers(skillState) {
  var careers = []
  var categories = Object.keys(skillTree)
  for (var i = 0; i < categories.length; i++) {
    var catId = categories[i]
    var cat = skillTree[catId]
    if (!cat) continue
    var subs = cat.subSkills
    for (var j = 0; j < subs.length; j++) {
      var sub = subs[j]
      var level = skillState[catId] ? (skillState[catId][sub.id] || 0) : 0
      var levels = sub.levels || []
      for (var k = 0; k < levels.length; k++) {
        if (levels[k].level <= level && levels[k].unlockCareer) {
          var unlockCareers = levels[k].unlockCareer
          for (var m = 0; m < unlockCareers.length; m++) {
            if (careers.indexOf(unlockCareers[m]) === -1) {
              careers.push(unlockCareers[m])
            }
          }
        }
      }
    }
  }
  return careers
}

// ─── 检查技能是否解锁了特殊事件 ────────────────────────────────
export function getUnlockedSkillEvents(skillState) {
  var events = []
  var categories = Object.keys(skillTree)
  for (var i = 0; i < categories.length; i++) {
    var catId = categories[i]
    var cat = skillTree[catId]
    if (!cat) continue
    var subs = cat.subSkills
    for (var j = 0; j < subs.length; j++) {
      var sub = subs[j]
      var level = skillState[catId] ? (skillState[catId][sub.id] || 0) : 0
      var levels = sub.levels || []
      for (var k = 0; k < levels.length; k++) {
        if (levels[k].level <= level && levels[k].unlockEvent) {
          if (events.indexOf(levels[k].unlockEvent) === -1) {
            events.push(levels[k].unlockEvent)
          }
        }
      }
    }
  }
  return events
}
