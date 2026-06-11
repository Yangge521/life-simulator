// ============================================================
// 人生模拟器 - 人际关系系统
// NPCs with persistent relationships throughout life
// ============================================================

// ─── NPC 模板 ────────────────────────────────────────────────
const npcTemplates = [
  // ── 家人 ──
  { role: 'father', namePool: ['爸爸', '父亲'], gender: 'male',   ageOffset: 25, relation: 'family',   canDie: true,  canLeave: false },
  { role: 'mother', namePool: ['妈妈', '母亲'], gender: 'female', ageOffset: 23, relation: 'family',   canDie: true,  canLeave: false },
  { role: 'brother', namePool: ['哥哥', '弟弟'], gender: 'male',   ageOffset: 2,  relation: 'sibling', canDie: false, canLeave: true  },
  { role: 'sister',  namePool: ['姐姐', '妹妹'], gender: 'female', ageOffset: 2,  relation: 'sibling', canDie: false, canLeave: true  },
  // ── 童年朋友 ──
  { role: 'childhood_friend', namePool: ['发小A', '发小B'], gender: 'random', ageOffset: 0, relation: 'friend', canDie: false, canLeave: true },
  // ── 学校关系 ──
  { role: 'classmate',    namePool: ['同学A', '同学B', '同桌'], gender: 'random', ageOffset: 0, relation: 'acquaintance', canDie: false, canLeave: true },
  { role: 'teacher',      namePool: ['班主任', '恩师'], gender: 'random', ageOffset: 15, relation: 'mentor', canDie: false, canLeave: true },
  { role: 'crush',        namePool: ['暗恋对象', '初恋'], gender: 'random', ageOffset: 0, relation: 'love_interest', canDie: false, canLeave: true },
  // ── 成年关系 ──
  { role: 'colleague',  namePool: ['同事A', '同事B'], gender: 'random', ageOffset: 0, relation: 'colleague', canDie: false, canLeave: true },
  { role: 'boss',       namePool: ['上司', '老板'], gender: 'random', ageOffset: 5, relation: 'mentor', canDie: false, canLeave: true },
  { role: 'mentor',     namePool: ['人生导师', '贵人'], gender: 'random', ageOffset: 8, relation: 'mentor', canDie: false, canLeave: false },
  { role: 'rival',      namePool: ['竞争对手', '宿敌'], gender: 'random', ageOffset: 0, relation: 'rival', canDie: false, canLeave: true },
  { role: 'partner',    namePool: ['恋人', '伴侣'], gender: 'random', ageOffset: 0, relation: 'partner', canDie: false, canLeave: true },
  { role: 'ex',         namePool: ['前任'], gender: 'random', ageOffset: 0, relation: 'ex', canDie: false, canLeave: true },
  // ── 特殊 ──
  { role: 'stranger_helpful', namePool: ['陌生人'], gender: 'random', ageOffset: 0, relation: 'acquaintance', canDie: false, canLeave: true },
  { role: 'neighbor',  namePool: ['邻居大叔', '邻居阿姨'], gender: 'random', ageOffset: 10, relation: 'neighbor', canDie: true, canLeave: true }
]

// ─── 关系等级 ────────────────────────────────────────────────
export const relationLevels = {
  stranger:     { name: '陌生人',   icon: '❓', color: '#666', threshold: 0 },
  acquaintance: { name: '相识',     icon: '🤝', color: '#4facfe', threshold: 20 },
  friend:       { name: '朋友',     icon: '😊', color: '#4ade80', threshold: 40 },
  close_friend: { name: '好友',     icon: '💙', color: '#a855f7', threshold: 60 },
  best_friend:  { name: '挚友',     icon: '💎', color: '#ffd700', threshold: 80 },
  lover:        { name: '恋人',     icon: '💕', color: '#ff6b6b', threshold: 70 },
  partner:      { name: '伴侣',     icon: '💑', color: '#ffd700', threshold: 85 },
  ex:           { name: '前任',     icon: '💔', color: '#888', threshold: 0 },
  rival:        { name: '竞争对手', icon: '⚔️', color: '#ef4444', threshold: 30 },
  mentor:       { name: '导师',     icon: '🌟', color: '#22d3ee', threshold: 50 },
  family:       { name: '家人',     icon: '👨‍👩‍👧', color: '#fbbf24', threshold: 100 }
}

// ─── 初始化人际关系 ────────────────────────────────────────────
export function initRelationships(character) {
  var npcs = []
  var familyType = character.family ? character.family.id : 'middle'
  var gender = character.gender || 'male'

  // 固定家人
  npcs.push(createNPC('father', character, 25, gender === 'male' ? '男' : '女'))
  npcs.push(createNPC('mother', character, 23, gender === 'male' ? '男' : '女'))

  // 根据家庭类型决定兄弟姐妹
  if (familyType === 'wealthy' || familyType === 'middle') {
    // 富裕/中产：可能有1-2个兄弟姐妹
    if (Math.random() > 0.4) {
      npcs.push(createNPC('brother', character, Math.random() > 0.5 ? 3 : -2, gender === 'male' ? '男' : '女'))
    }
    if (Math.random() > 0.6) {
      npcs.push(createNPC('sister', character, Math.random() > 0.5 ? 2 : -3, gender === 'male' ? '男' : '女'))
    }
  } else if (familyType === 'poor') {
    // 贫困：兄弟姐妹可能更多
    if (Math.random() > 0.2) {
      npcs.push(createNPC('brother', character, Math.random() > 0.5 ? 2 : -1, gender === 'male' ? '男' : '女'))
    }
  }

  // 童年发小（6岁出现）
  npcs.push(createNPC('childhood_friend', character, 0, Math.random() > 0.5 ? '男' : '女', 6))

  // 邻居
  npcs.push(createNPC('neighbor', character, 10 + Math.floor(Math.random() * 10), Math.random() > 0.5 ? '男' : '女'))

  return npcs
}

function createNPC(role, character, ageOffset, preferredGender, appearAge) {
  var template = npcTemplates.filter(function(t) { return t.role === role })[0] || npcTemplates[0]
  var npcGender = preferredGender || (template.gender === 'random' ? (Math.random() > 0.5 ? '男' : '女') : template.gender)
  var name = generateNPCName(role, npcGender)

  return {
    id: 'npc_' + role + '_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    role: role,
    name: name,
    gender: npcGender,
    age: (character.age || 0) + ageOffset,
    relation: template.relation,
    affection: template.relation === 'family' ? 70 : (template.relation === 'mentor' ? 40 : 20),
    respect: template.relation === 'mentor' ? 70 : 30,
    trust: template.relation === 'family' ? 60 : 20,
    status: 'alive',         // alive, dead, left, estranged
    appearAge: appearAge || 0,  // 几岁开始出现
    canDie: template.canDie,
    canLeave: template.canLeave,
    memories: [],             // 共同经历的事件
    lastInteractionAge: -999,
    isActive: appearAge ? false : true  // 是否需要等到特定年龄才出现
  }
}

function generateNPCName(role, gender) {
  var surnames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴']
  var maleNames = ['伟', '强', '磊', '军', '明', '杰', '辉', '鹏', '超', '浩']
  var femaleNames = ['芳', '娟', '丽', '敏', '静', '婷', '雪', '慧', '洁', '玉']

  var roleNames = {
    father: ['爸爸', '父亲', '老爸'],
    mother: ['妈妈', '母亲', '老妈'],
    brother: ['哥哥', '弟弟', '兄长'],
    sister: ['姐姐', '妹妹', '小妹'],
    childhood_friend: null,  // 随机生成
    classmate: null,
    teacher: ['王老师', '李老师', '张老师', '刘老师'],
    crush: ['暗恋对象', '初恋'],
    colleague: null,
    boss: ['老板', '上司'],
    mentor: ['人生导师', '贵人'],
    rival: ['竞争对手', '宿敌'],
    partner: ['恋人', '伴侣'],
    ex: ['前任'],
    stranger_helpful: ['好心人'],
    neighbor: ['隔壁大叔', '邻居阿姨', '隔壁奶奶']
  }

  var names = roleNames[role]
  if (names) {
    return names[Math.floor(Math.random() * names.length)]
  }

  // 随机生成名字
  var surname = surnames[Math.floor(Math.random() * surnames.length)]
  var givenName = (gender === '男' ? maleNames : femaleNames)[Math.floor(Math.random() * (gender === '男' ? maleNames.length : femaleNames.length))]
  return surname + givenName
}

// ─── 每年更新人际关系 ─────────────────────────────────────────
export function updateRelationships(npcs, character, eventText) {
  if (!npcs || !npcs.length) return npcs
  var age = character.age || 0
  var result = npcs.slice()

  for (var i = 0; i < result.length; i++) {
    var npc = result[i]

    // 检查是否需要激活（到达出现年龄）
    if (!npc.isActive && age >= npc.appearAge) {
      npc.isActive = true
    }
    if (!npc.isActive) continue

    // 自然感情变化
    var ageDiff = Math.abs(age - (npc.lastInteractionAge || 0))
    if (ageDiff > 3 && npc.relation !== 'family') {
      // 久不联系，感情淡化
      npc.affection = Math.max(0, npc.affection - 2 * ageDiff)
    }

    // 随机事件：NPC主动互动
    if (Math.random() < getInteractionChance(npc, age)) {
      var interaction = generateInteraction(npc, character, age)
      if (interaction) {
        npc.affection = clamp(npc.affection + interaction.affectionDelta, 0, 100)
        npc.trust = clamp(npc.trust + (interaction.trustDelta || 0), 0, 100)
        npc.respect = clamp(npc.respect + (interaction.respectDelta || 0), 0, 100)
        npc.lastInteractionAge = age
        if (interaction.memory) {
          npc.memories.push({ age: age, text: interaction.memory })
        }
      }
    }

    // NPC 死亡检查
    if (npc.canDie && npc.status === 'alive' && npc.age > 60) {
      var deathChance = (npc.age - 60) * 0.005
      if (npc.role === 'father' || npc.role === 'mother') deathChance *= 1.5
      if (Math.random() < deathChance) {
        npc.status = 'dead'
        npc.deathAge = age
      }
    }

    // NPC 离开（搬家、断交等）
    if (npc.canLeave && npc.status === 'alive') {
      if (npc.affection < 10 && Math.random() < 0.1) {
        npc.status = 'estranged'
      }
      if (npc.relation === 'colleague' && Math.random() < 0.15) {
        npc.status = 'left'
        npc.leftAge = age
      }
    }

    result[i] = npc
  }

  // 新增NPC（根据年龄阶段）
  var newNPCs = getNewNPCsForAge(age, character, result)
  for (var j = 0; j < newNPCs.length; j++) {
    result.push(newNPCs[j])
  }

  return result
}

function getInteractionChance(npc, age) {
  if (npc.relation === 'family') return 0.6
  if (npc.relation === 'partner') return 0.8
  if (npc.relation === 'rival') return 0.3
  if (npc.relation === 'mentor') return 0.2
  if (age < 18) return 0.4
  if (age < 30) return 0.3
  return 0.15
}

function generateInteraction(npc, character, age) {
  var interactions = getInteractionsForRole(npc.role, npc.relation, age)
  if (!interactions.length) return null
  return interactions[Math.floor(Math.random() * interactions.length)]
}

function getInteractionsForRole(role, relation, age) {
  var all = [
    { role: 'family', texts: ['家人团聚，其乐融融', '一起吃了顿饭'], affectionDelta: 3, memory: '家庭聚餐' },
    { role: 'friend', texts: ['一起出去玩了', '互相聊了聊近况'], affectionDelta: 2, memory: '聚会' },
    { role: 'mentor', texts: ['得到了宝贵的建议', '导师分享了他的经验'], affectionDelta: 2, respectDelta: 5, memory: '得到指导' },
    { role: 'rival', texts: ['和竞争对手又较量了一番'], affectionDelta: -2, respectDelta: 3, memory: '竞争' },
    { role: 'partner', texts: ['和恋人共度美好时光', '一起规划了未来'], affectionDelta: 5, memory: '浪漫时光' },
    { role: 'colleague', texts: ['和同事合作完成了项目'], affectionDelta: 1, memory: '工作合作' }
  ]

  var matched = []
  for (var i = 0; i < all.length; i++) {
    if (all[i].role === relation || all[i].role === role) {
      matched.push(all[i])
    }
  }
  return matched.length ? matched : [{ role: 'default', texts: ['见面打了个招呼'], affectionDelta: 1 }]
}

function getNewNPCsForAge(age, character, existingNPCs) {
  var newNPCs = []
  var existingRoles = existingNPCs.map(function(n) { return n.role })

  if (age === 6 && existingRoles.indexOf('classmate') === -1) {
    newNPCs.push(createNPC('classmate', character, 0, Math.random() > 0.5 ? '男' : '女', 6))
  }
  if (age === 7 && existingRoles.indexOf('teacher') === -1) {
    newNPCs.push(createNPC('teacher', character, 15, '男', 7))
  }
  if (age >= 12 && age <= 16 && existingRoles.indexOf('crush') === -1 && Math.random() > 0.4) {
    newNPCs.push(createNPC('crush', character, 0, Math.random() > 0.5 ? '男' : '女', age))
  }
  if (age >= 22 && age <= 26 && existingRoles.indexOf('colleague') === -1) {
    newNPCs.push(createNPC('colleague', character, 0, Math.random() > 0.5 ? '男' : '女', age))
  }
  if (age >= 23 && age <= 28 && existingRoles.indexOf('boss') === -1) {
    newNPCs.push(createNPC('boss', character, 5, 'male', age))
  }
  if (age >= 25 && age <= 35 && existingRoles.indexOf('rival') === -1 && Math.random() > 0.5) {
    newNPCs.push(createNPC('rival', character, 0, Math.random() > 0.5 ? '男' : '女', age))
  }
  if (age >= 20 && existingRoles.indexOf('mentor') === -1 && Math.random() > 0.6) {
    newNPCs.push(createNPC('mentor', character, 8, Math.random() > 0.5 ? '男' : '女', age))
  }

  return newNPCs
}

// ─── 获取当前活跃关系（用于UI显示）────────────────────────────
export function getActiveRelationships(npcs, maxCount) {
  if (!npcs) return []
  maxCount = maxCount || 6
  var active = npcs.filter(function(n) {
    return n.isActive && (n.status === 'alive') && n.affection > 5
  })
  // 按亲密度排序
  active.sort(function(a, b) { return b.affection - a.affection })
  return active.slice(0, maxCount)
}

// ─── 获取关系等级描述 ─────────────────────────────────────────
export function getRelationLevel(npc) {
  var a = npc.affection || 0
  var levels = Object.keys(relationLevels)
  var current = 'stranger'
  for (var i = 0; i < levels.length; i++) {
    if (a >= relationLevels[levels[i]].threshold) {
      current = levels[i]
    }
  }
  return relationLevels[current]
}

// ─── 工具函数 ────────────────────────────────────────────────
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}
