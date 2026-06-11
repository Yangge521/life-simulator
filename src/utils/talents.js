// ============================================================
// 人生模拟器 - 天赋/特质系统
// 出生时随机获得 1~3 个特质，深刻影响人生走向
// ============================================================

// ─── 天赋池（按稀有度） ─────────────────────────────────────
export const talentPool = {

  // ── 普通（80% 抽中概率）───────────────────────────────────
  common: [
    {
      id: 'strong_body',
      name: '体魄强健',
      icon: '💪',
      description: '天生体质好，不易生病',
      rarity: 'common',
      passive: { health: 10 },
      effectTag: 'strong_body',
      // 游戏中的被动效果回调标识
      hooks: { onAgeUp: 'healthBonus' }
    },
    {
      id: 'quick_learner',
      name: '学东西快',
      icon: '⚡',
      description: '学习效率比普通人高',
      rarity: 'common',
      passive: { intelligence: 8 },
      effectTag: 'quick_learner',
      hooks: { onEducation: 'intBonus' }
    },
    {
      id: 'social_butterfly',
      name: '自来熟',
      icon: '🦋',
      description: '天生善于和人打交道',
      rarity: 'common',
      passive: { social: 10 },
      effectTag: 'social_butterfly',
      hooks: { onSocialEvent: 'socialBonus' }
    },
    {
      id: 'optimist',
      name: '乐天派',
      icon: '☀️',
      description: '天性乐观，逆境也能笑着面对',
      rarity: 'common',
      passive: { happiness: 8 },
      effectTag: 'optimist',
      hooks: { onNegativeEvent: 'reduceUnhappiness' }
    },
    {
      id: 'night_owl',
      name: '夜猫子',
      icon: '🦉',
      description: '夜晚精力更充沛',
      rarity: 'common',
      passive: { creativity: 5, health: -3 },
      effectTag: 'night_owl'
    },
    {
      id: 'good_appetite',
      name: '好胃口',
      icon: '🍕',
      description: '吃嘛嘛香，身体倍棒',
      rarity: 'common',
      passive: { health: 5, happiness: 3 },
      effectTag: 'good_appetite'
    },
    {
      id: 'curious',
      name: '好奇心旺盛',
      icon: '🔍',
      description: '对什么都感兴趣',
      rarity: 'common',
      passive: { intelligence: 5, wisdom: 3 },
      effectTag: 'curious'
    },
    {
      id: 'stubborn',
      name: '倔脾气',
      icon: '🐂',
      description: '认准了就不回头',
      rarity: 'common',
      passive: { wisdom: 5, social: -5 },
      effectTag: 'stubborn'
    }
  ],

  // ── 稀有（15% 抽中概率）───────────────────────────────────
  rare: [
    {
      id: 'musical_genius',
      name: '绝对音感',
      icon: '🎵',
      description: '天赋异禀的音乐才能',
      rarity: 'rare',
      passive: { creativity: 15, charm: 5 },
      effectTag: 'musical_talent',
      unlockEvents: ['music_school', 'band_join', 'concert_perform']
    },
    {
      id: 'math_brain',
      name: '数学天才',
      icon: '🔢',
      description: '数字和逻辑在你面前无所遁形',
      rarity: 'rare',
      passive: { intelligence: 15 },
      effectTag: 'math_talent',
      unlockEvents: ['math_competition', 'programming_discovery']
    },
    {
      id: 'photographic_memory',
      name: '过目不忘',
      icon: '🧠',
      description: '看过的东西都不会忘记',
      rarity: 'rare',
      passive: { intelligence: 12, education: 10 },
      effectTag: 'photographic_memory'
    },
    {
      id: 'athletic',
      name: '运动健将',
      icon: '🏃',
      description: '身体协调性和爆发力远超常人',
      rarity: 'rare',
      passive: { health: 15, charm: 5 },
      effectTag: 'athletic_talent',
      unlockEvents: ['sports_team', 'olympic_trial', 'martial_arts']
    },
    {
      id: 'silver_tongue',
      name: '三寸不烂之舌',
      icon: '🗣️',
      description: '说服力和感染力极强',
      rarity: 'rare',
      passive: { charm: 15, social: 10 },
      effectTag: 'silver_tongue',
      unlockEvents: ['debate_champion', 'negotiation_expert']
    },
    {
      id: 'green_thumb',
      name: '植物亲和',
      icon: '🌱',
      description: '植物在你手中都长得特别好',
      rarity: 'rare',
      passive: { happiness: 8, wisdom: 5 },
      effectTag: 'green_thumb'
    },
    {
      id: 'animal_whisperer',
      name: '动物亲和',
      icon: '🐾',
      description: '动物天生对你亲近',
      rarity: 'rare',
      passive: { happiness: 10, social: 3 },
      effectTag: 'animal_whisperer'
    }
  ],

  // ── 史诗（4% 抽中概率）────────────────────────────────────
  epic: [
    {
      id: 'born_leader',
      name: '天生领袖',
      icon: '👑',
      description: '人们会不由自主地追随你',
      rarity: 'epic',
      passive: { social: 15, charm: 10, wisdom: 8 },
      effectTag: 'born_leader',
      unlockEvents: ['student_leader', 'company_ceo', 'community_leader']
    },
    {
      id: 'artistic_soul',
      name: '艺术灵魂',
      icon: '🎨',
      description: '你的内心住着一个艺术家',
      rarity: 'epic',
      passive: { creativity: 20, charm: 10, happiness: 5 },
      effectTag: 'artistic_soul',
      unlockEvents: ['art_exhibition', 'bestseller_novel', 'film_director']
    },
    {
      id: 'survivor',
      name: '不死之身',
      icon: '🛡️',
      description: '每次灾难你都能奇迹般活下来',
      rarity: 'epic',
      passive: { health: 20, wisdom: 5 },
      effectTag: 'survivor',
      hooks: { onDeathCheck: 'survivalBonus' }
    },
    {
      id: 'midas_touch',
      name: '点石成金',
      icon: '✨',
      description: '做什么生意都能赚钱',
      rarity: 'epic',
      passive: { wealth: 10, intelligence: 5 },
      effectTag: 'midas_touch',
      hooks: { onWealthChange: 'doubleGain' },
      unlockEvents: ['first_enterprise', 'business_empire']
    }
  ],

  // ── 传说（1% 抽中概率）────────────────────────────────────
  legendary: [
    {
      id: 'genius',
      name: '旷世奇才',
      icon: '🌟',
      description: '百年难遇的天才，注定改变世界',
      rarity: 'legendary',
      passive: { intelligence: 25, wisdom: 15, creativity: 10 },
      effectTag: 'genius',
      unlockEvents: ['breakthrough_invention', 'nobel_prize', 'world_changing_discovery']
    },
    {
      id: 'destiny_child',
      name: '命运之子',
      icon: '🌀',
      description: '你的人生仿佛被命运眷顾',
      rarity: 'legendary',
      passive: { happiness: 15, luck: 20 },
      effectTag: 'destiny_child',
      hooks: { onRandomEvent: 'luckyModifier' }
    },
    {
      id: 'time_traveler',
      name: '时间旅者',
      icon: '⏳',
      description: '你总觉得似曾相识...',
      rarity: 'legendary',
      passive: { wisdom: 25 },
      effectTag: 'time_traveler',
      hooks: { onChoice: 'dejaVu' },
      unlockEvents: ['predict_future', 'change_fate']
    },
    {
      id: 'empath_soul',
      name: '共情之心',
      icon: '💜',
      description: '你能感知他人的情绪，天生的心理导师',
      rarity: 'legendary',
      passive: { social: 20, wisdom: 15, charm: 10 },
      effectTag: 'empath_soul',
      unlockEvents: ['counselor_fame', 'heal_hearts']
    },
    {
      id: 'lucky_star',
      name: '福星高照',
      icon: '⭐',
      description: '你总能在关键时刻逢凶化吉',
      rarity: 'legendary',
      passive: { happiness: 10, health: 10 },
      effectTag: 'lucky_star',
      hooks: { onNegativeEvent: 'reduceImpact', onCrisis: 'escape' }
    },
    {
      id: 'phoenix_heart',
      name: '凤凰之心',
      icon: '🔥',
      description: '每次跌倒，你都会浴火重生',
      rarity: 'legendary',
      passive: { wisdom: 15, health: 15 },
      effectTag: 'phoenix_heart',
      hooks: { onFail: 'bonusRecovery' }
    }
  ],

  // ── 神话（0.1% 抽中概率）──────────────────────────────────
  mythical: [
    {
      id: 'chosen_one',
      name: '天选之人',
      icon: '✨',
      description: '你的人生注定不平凡，仿佛被上天选中',
      rarity: 'mythical',
      passive: { intelligence: 15, social: 15, health: 15, happiness: 15, wealth: 15 },
      effectTag: 'chosen_one',
      hooks: { onAgeUp: 'allBonus', onCrisis: 'miracleEscape' },
      unlockEvents: ['world_change', 'create_legacy']
    },
    {
      id: 'infinite_wisdom',
      name: '无穷智慧',
      icon: '🧠',
      description: '你的智慧深不可测，能洞察人生真谛',
      rarity: 'mythical',
      passive: { wisdom: 40, intelligence: 20 },
      effectTag: 'infinite_wisdom',
      hooks: { onChoice: 'wisdomInsight' }
    },
    {
      id: 'golden_tongue',
      name: '金口玉言',
      icon: '👑',
      description: '你说的话总能影响他人，天生的演说家',
      rarity: 'mythical',
      passive: { charm: 30, social: 25 },
      effectTag: 'golden_tongue',
      unlockEvents: ['political_career', 'motivational_speaker', 'change_society']
    }
  ]
}

// ─── 天赋颜色 ────────────────────────────────────────────────
export const talentRarity = {
  common:   { name: '普通', color: '#9e9e9e', bg: 'rgba(158,158,158,0.15)', probability: 0.70 },
  rare:     { name: '稀有', color: '#4facfe', bg: 'rgba(79,172,254,0.15)', probability: 0.20 },
  epic:     { name: '史诗', color: '#a855f7', bg: 'rgba(168,85,247,0.15)', probability: 0.07 },
  legendary:{ name: '传说', color: '#ffd700', bg: 'rgba(255,215,0,0.15)', probability: 0.025 },
  mythical: { name: '神话', color: '#ff4444', bg: 'rgba(255,68,68,0.15)', probability: 0.005 }
}

// ─── 随机抽取天赋 ────────────────────────────────────────────
export function rollTalents(familyType) {
  var talents = []
  var count = 1 + Math.floor(Math.random() * 3) // 1~3 个

  for (var i = 0; i < count; i++) {
    var rarity = rollRarity(familyType)
    var pool = talentPool[rarity]
    if (!pool || pool.length === 0) pool = talentPool.common

    // 去重
    var available = pool.filter(function(t) {
      return !talents.some(function(exist) { return exist.id === t.id })
    })
    if (available.length === 0) available = pool

    var talent = available[Math.floor(Math.random() * available.length)]
    talents.push(talent)
  }

  return talents
}

// ─── 根据家庭类型调整稀有度权重 ─────────────────────────────
function rollRarity(familyType) {
  var familyId = familyType ? familyType.id : 'middle'
  var r = Math.random()

  // 书香门第更容易出天才
  if (familyId === 'academic' || familyId === 'celebrity') {
    if (r < 0.03) return 'legendary'
    if (r < 0.10) return 'epic'
    if (r < 0.30) return 'rare'
    return 'common'
  }

  // 贫困/福利院出天赋概率略低
  if (familyId === 'poor' || familyId === 'foster' || familyId === 'farmer') {
    if (r < 0.005) return 'legendary'
    if (r < 0.03) return 'epic'
    if (r < 0.12) return 'rare'
    return 'common'
  }

  // 默认权重
  if (r < 0.01) return 'legendary'
  if (r < 0.05) return 'epic'
  if (r < 0.20) return 'rare'
  return 'common'
}

// ─── 应用天赋被动效果 ─────────────────────────────────────────
export function applyTalentPassives(character, talents) {
  if (!talents || talents.length === 0) return character

  var c = JSON.parse(JSON.stringify(character))
  for (var i = 0; i < talents.length; i++) {
    var passive = talents[i].passive
    if (!passive) continue
    var keys = Object.keys(passive)
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j]
      if (typeof passive[key] === 'number') {
        c[key] = Math.max(0, Math.min(100, (c[key] || 0) + passive[key]))
      }
    }
  }
  return c
}

// ─── 获取天赋解锁的特殊事件ID列表 ────────────────────────────
export function getTalentUnlockedEventIds(talents) {
  var ids = []
  if (!talents) return ids
  for (var i = 0; i < talents.length; i++) {
    var unlock = talents[i].unlockEvents
    if (unlock && Array.isArray(unlock)) {
      for (var j = 0; j < unlock.length; j++) {
        if (ids.indexOf(unlock[j]) === -1) {
          ids.push(unlock[j])
        }
      }
    }
  }
  return ids
}
