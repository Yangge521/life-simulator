// ============================================================
// 人生模拟器 - 闺蜜兄弟局系统
// 挚友关系、好感度、"局"聚会、死党羁绊
// ============================================================

// ─── 挚友类型 ────────────────────────────────────────────────
export const bestieTypes = {
  bestie: {
    id: 'bestie',
    name: '闺蜜',
    icon: '👯‍♀️',
    description: '无话不谈的知心挚友，可以分享一切秘密',
    gender: 'female',
    initAffection: 50,
    color: '#f472b6'
  },
  bro: {
    id: 'bro',
    name: '兄弟',
    icon: '🤜🤛',
    description: '生死与共的铁哥们，两肋插刀不在话下',
    gender: 'male',
    initAffection: 50,
    color: '#60a5fa'
  },
  confidant: {
    id: 'confidant',
    name: '知己',
    icon: '🧠',
    description: '精神上的共鸣者，无关性别，灵魂相通',
    gender: 'any',
    initAffection: 55,
    color: '#a78bfa'
  },
  childhood_buddy: {
    id: 'childhood_buddy',
    name: '发小',
    icon: '🧒',
    description: '从小一起长大的伙伴，知根知底',
    gender: 'any',
    initAffection: 60,
    color: '#fbbf24'
  },
  work_buddy: {
    id: 'work_buddy',
    name: '职场战友',
    icon: '💼',
    description: '职场上并肩作战的搭档，互帮互助',
    gender: 'any',
    initAffection: 40,
    color: '#34d399'
  }
}

// ─── 好感度等级 ──────────────────────────────────────────────
export const favorLevels = [
  { level: 0, name: '点头之交', icon: '👋',  color: '#9ca3af', minScore: 0,  desc: '见面打个招呼的关系' },
  { level: 1, name: '熟人',     icon: '🙂',  color: '#93c5fd', minScore: 15, desc: '偶尔能聊两句' },
  { level: 2, name: '普通朋友', icon: '😊',  color: '#67e8f9', minScore: 30, desc: '可以约着一起玩' },
  { level: 3, name: '好朋友',   icon: '😄',  color: '#4ade80', minScore: 45, desc: '有烦心事会互相倾诉' },
  { level: 4, name: '死党',     icon: '💪',  color: '#fbbf24', minScore: 60, desc: '不管发生什么都站你这边' },
  { level: 5, name: '至交',     icon: '💎',  color: '#a78bfa', minScore: 75, desc: '人生得一知己足矣' },
  { level: 6, name: '生死之交', icon: '🔥',  color: '#f472b6', minScore: 90, desc: '你们之间的羁绊超越了友情本身' }
]

// ─── 获取好感度等级 ──────────────────────────────────────────
export function getFavorLevel(score) {
  var level = favorLevels[0]
  for (var i = favorLevels.length - 1; i >= 0; i--) {
    if (score >= favorLevels[i].minScore) {
      level = favorLevels[i]
      break
    }
  }
  return level
}

// ─── "局"类型定义 ────────────────────────────────────────────
export const gatheringTypes = [
  {
    id: 'dinner_party',
    name: '饭局',
    icon: '🍽️',
    description: '约上三五好友，大快朵颐，畅聊人生',
    minAge: 12,
    affectionBoost: [3, 8],
    happinessBoost: [5, 15],
    cost: [200, 800],
    scenes: [
      '你们在一家热闹的火锅店里涮着毛肚，聊着各自的近况，热气和笑声交织在一起。',
      '路边的大排档，几瓶啤酒几碟小菜，从天南聊到地北，不知不觉就坐到了深夜。',
      '朋友新开了一家私房菜馆，你们去捧场，菜的味道意外地好，宾主尽欢。',
      '在家自己做饭请客，虽然卖相一般，但大家吃得格外开心。',
      '约在了那家排了三小时队的网红店，味道也就那样，但排队时聊的天才是最珍贵的。'
    ]
  },
  {
    id: 'drinks_party',
    name: '酒局',
    icon: '🍻',
    description: '推杯换盏间，真情流露',
    minAge: 18,
    affectionBoost: [2, 10],
    happinessBoost: [3, 10],
    cost: [300, 1500],
    scenes: [
      '小酒馆的角落里，两杯威士忌下肚，话说得比平时真诚十倍。',
      '天台上的深夜酒局，看着城市灯火，聊着那些白天不敢聊的话题。',
      '朋友失恋了，你陪着喝了一整晚，听他/她把心里话全倒出来。',
      'KTV包房里，唱歌的唱歌，喝酒的喝酒，有人醉了开始说胡话，大家笑成一团。'
    ]
  },
  {
    id: 'gaming_night',
    name: '游戏局',
    icon: '🎮',
    description: '虚拟世界的并肩作战，现实中也是最佳拍档',
    minAge: 8,
    affectionBoost: [4, 12],
    happinessBoost: [5, 20],
    cost: [50, 300],
    scenes: [
      '联机打到凌晨三点，你carry了全场，队友在语音里疯狂吹彩虹屁。',
      '网吧五连坐，输赢不重要，重要的是那种并肩作战的感觉。',
      '一起试了新出的双人游戏，配合默契，有人感叹"我们怎么这么合拍"。',
      '在手游里组队上分，你在关键时刻救了他/她，朋友感动得连发十个表情包。',
      '约在家里玩桌游，三国杀、狼人杀轮着来，笑声不断。'
    ]
  },
  {
    id: 'travel_together',
    name: '旅行局',
    icon: '✈️',
    description: '最好的友谊，经得起长途旅行的考验',
    minAge: 18,
    affectionBoost: [5, 15],
    happinessBoost: [10, 25],
    cost: [1500, 8000],
    scenes: [
      '你们来了一场说走就走的旅行，在海边看日出，觉得活着真好。',
      '自驾游的路上，车坏了，你们一起在路边等了三个小时拖车，反而成了最难忘的回忆。',
      '在陌生的城市迷路了，靠着彼此的默契找到了回酒店的路。',
      '爬了一整天的山，终于登顶的那一刻，你们相视一笑，什么都不用说。'
    ]
  },
  {
    id: 'karaoke_night',
    name: '唱K局',
    icon: '🎤',
    description: '放开嗓子，释放压力，这是属于你们的舞台',
    minAge: 14,
    affectionBoost: [3, 8],
    happinessBoost: [8, 18],
    cost: [200, 600],
    scenes: [
      '你唱了一首"朋友"，全场大合唱，有人眼眶红了。',
      '两个麦霸抢麦抢了一晚上，最后合唱了一首情歌对唱，笑到肚子疼。',
      '朋友点了一首你从来没听过的歌，唱得跑调到太平洋，但莫名觉得很好听。',
      '深夜的KTV，只剩下最后几个人，歌词里唱的都是你们的故事。'
    ]
  },
  {
    id: 'coffee_chat',
    name: '咖啡局',
    icon: '☕',
    description: '安静地坐在一起，享受片刻的宁静与默契',
    minAge: 16,
    affectionBoost: [2, 6],
    happinessBoost: [3, 8],
    cost: [60, 200],
    scenes: [
      '阳光透过咖啡店的落地窗洒进来，你们各自看着书，偶尔抬头聊两句。',
      '朋友突然约你出来，说没什么事，就是"想见见你"。',
      '你们在咖啡馆坐了一下午，从工作聊到人生，又聊回了最初认识的时候。',
      '加班到深夜，朋友带了杯热拿铁来你公司楼下，说"恰好路过"。'
    ]
  },
  {
    id: 'sports_together',
    name: '运动局',
    icon: '🏀',
    description: '一起流汗，一起变强，最好的友情是互相成就',
    minAge: 8,
    affectionBoost: [3, 10],
    happinessBoost: [5, 12],
    cost: [30, 500],
    healthBoost: [3, 8],
    scenes: [
      '篮球场上，你们打了一场酣畅淋漓的比赛，输了也开心。',
      '约好一起晨跑，坚持了三个月，两个人的精神状态都变好了。',
      '滑雪场上你摔了十次，朋友在一旁笑到岔气，但每次都会伸手拉你起来。',
      '健身房互相监督，一人偷懒另一个就念紧箍咒。'
    ]
  },
  {
    id: 'shopping_spree',
    name: '逛街局',
    icon: '🛍️',
    description: '一起逛吃逛吃，买到心仪的东西，快乐加倍',
    minAge: 10,
    affectionBoost: [1, 5],
    happinessBoost: [5, 12],
    cost: [300, 3000],
    scenes: [
      '你试了一件衣服，朋友说"好看"，然后又帮你搭配了一整套。',
      '逛了一下午，买了一堆东西，最后在奶茶店里瘫着喝奶茶，觉得今天完美。',
      '朋友拉着你去逛了十几家店，最后什么都没买，但就是很开心。',
      '你在商场里看中了一个包，朋友直接说"买！我赞助一半"，这份心意比什么都值钱。'
    ]
  },
  {
    id: 'deep_talk',
    name: '深夜谈心',
    icon: '🌙',
    description: '关掉所有灯，只留下真心话',
    minAge: 16,
    affectionBoost: [5, 15],
    happinessBoost: [2, 8],
    wisdomBoost: [3, 8],
    cost: [0, 100],
    scenes: [
      '凌晨两点，你们都睡不着，聊起了人生的意义、宇宙的尽头和各自的恐惧。天亮后谁也不提，但心里都记住了。',
      '朋友遇到了人生的十字路口，你陪他/她聊了整整一夜，最后他/她说"谢谢你，我知道该怎么做了"。',
      '你终于跟朋友坦白了藏在心里很久的秘密，对方没有评判，只是静静地听完后给你一个拥抱。',
      '坐在天台上，看着星星，什么话都没说，但你觉得这是最近最被理解的一次。'
    ]
  },
  {
    id: 'help_crisis',
    name: '患难见真情',
    icon: '🆘',
    description: '你需要帮助的时候，他/她第一个出现了',
    minAge: 10,
    affectionBoost: [10, 25],
    happinessBoost: [-5, 5],
    cost: [0, 500],
    scenes: [
      '你生病住院了，朋友放下工作赶来陪你，还带了你最爱喝的粥。',
      '你遇到了经济困难，朋友二话不说转了一笔钱过来，说"不急还"。',
      '你在工作上被人冤枉了，朋友站出来帮你作证，得罪了所有人也不在乎。',
      '你最崩溃的那个夜晚，是朋友从另一个城市坐高铁赶过来陪你的。'
    ]
  }
]

// ─── 创建挚友对象 ────────────────────────────────────────────
export function createBestie(typeId, character, customName) {
  var template = bestieTypes[typeId]
  if (!template) template = bestieTypes.bestie

  var surnames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴', '郑', '徐', '孙', '马', '朱']
  var femalePool = ['晓婷', '雨萱', '思琪', '雅静', '梦洁', '小曼', '琳琳', '文静', '若涵', '心悦']
  var malePool = ['子豪', '浩然', '天宇', '俊杰', '志远', '明辉', '逸飞', '小刚', '阿磊', '大鹏']

  var name = customName || ''
  if (!name) {
    var surname = surnames[Math.floor(Math.random() * surnames.length)]
    var givenPool = template.gender === 'female' ? femalePool : malePool
    if (template.gender === 'any') {
      givenPool = Math.random() > 0.5 ? femalePool : malePool
    }
    name = surname + givenPool[Math.floor(Math.random() * givenPool.length)]
  }

  return {
    id: 'bestie_' + typeId + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
    type: typeId,
    typeName: template.name,
    typeIcon: template.icon,
    name: name,
    gender: template.gender === 'any' ? (Math.random() > 0.5 ? '女' : '男') : template.gender,
    favorScore: template.initAffection,
    trust: 40,
    knowYears: 0,
    gatherings: [],        // 记录一起参与过的局
    memories: [],          // 关键回忆
    meetAge: 0,
    status: 'active',      // active, estranged, reunited
    lastGatheringAge: 0,
    conflictHistory: [],   // 争吵记录
    sharedSecret: false,   // 是否有共同秘密
    loyalty: 70            // 忠诚度，影响在关键时刻是否挺身而出
  }
}

// ─── 组织一次"局" ────────────────────────────────────────────
export function hostGathering(bestie, character, gatheringTypeId) {
  var gathering = null
  for (var i = 0; i < gatheringTypes.length; i++) {
    if (gatheringTypes[i].id === gatheringTypeId) {
      gathering = gatheringTypes[i]
      break
    }
  }
  if (!gathering) return null

  var age = character.age || 0
  if (age < gathering.minAge) {
    return { success: false, reason: '年龄不够' }
  }

  // 随机选一个场景
  var scene = gathering.scenes[Math.floor(Math.random() * gathering.scenes.length)]

  // 计算好感度提升
  var affMin = gathering.affectionBoost[0]
  var affMax = gathering.affectionBoost[1]
  var affectionGain = affMin + Math.floor(Math.random() * (affMax - affMin + 1))

  // 幸福感提升
  var hapMin = gathering.happinessBoost[0]
  var hapMax = gathering.happinessBoost[1]
  var happinessGain = hapMin + Math.floor(Math.random() * (hapMax - hapMin + 1))

  // 花费
  var costMin = gathering.cost[0]
  var costMax = gathering.cost[1]
  var cost = costMin + Math.floor(Math.random() * (costMax - costMin + 1))

  // 可能存在额外buff
  var healthGain = 0
  var wisdomGain = 0
  if (gathering.healthBoost) {
    healthGain = gathering.healthBoost[0] + Math.floor(Math.random() * (gathering.healthBoost[1] - gathering.healthBoost[0] + 1))
  }
  if (gathering.wisdomBoost) {
    wisdomGain = gathering.wisdomBoost[0] + Math.floor(Math.random() * (gathering.wisdomBoost[1] - gathering.wisdomBoost[0] + 1))
  }

  // 更新 bestie 状态
  bestie.favorScore = Math.min(100, (bestie.favorScore || 0) + affectionGain)
  bestie.trust = Math.min(100, (bestie.trust || 0) + Math.floor(affectionGain * 0.5))
  bestie.lastGatheringAge = age
  bestie.gatherings.push({
    type: gatheringTypeId,
    icon: gathering.icon,
    name: gathering.name,
    age: age,
    scene: scene,
    affectionGain: affectionGain
  })

  // 记忆
  bestie.memories.push({
    age: age,
    text: '和' + bestie.name + '在' + age + '岁那年搞了一次' + gathering.name + '。' + scene,
    type: 'gathering'
  })

  // 随机事件：成为更好的朋友
  if (bestie.favorScore > 75 && !bestie.sharedSecret && Math.random() > 0.7) {
    bestie.sharedSecret = true
    bestie.memories.push({
      age: age,
      text: bestie.name + '和你分享了从未告诉过任何人的秘密，你们的友谊更深了一层。',
      type: 'secret'
    })
  }

  return {
    success: true,
    scene: scene,
    gathering: gathering,
    effects: {
      happiness: happinessGain,
      wealth: -Math.round(cost / 100),
      health: healthGain,
      wisdom: wisdomGain
    },
    affectionGain: affectionGain,
    newLevel: getFavorLevel(bestie.favorScore)
  }
}

// ─── 挚友冲突事件 ────────────────────────────────────────────
export function checkBestieConflict(bestie, character, age) {
  // 好感度太低可能触发疏远
  if (bestie.favorScore < 20 && bestie.status === 'active') {
    bestie.status = 'estranged'
    bestie.memories.push({
      age: age,
      text: '你和' + bestie.name + '渐行渐远，曾经的友谊似乎走到了尽头。',
      type: 'conflict'
    })
    return {
      type: 'estrangement',
      text: bestie.name + '和你的联系越来越少了，不知不觉中，你们已经很久没有说过话了。',
      effect: { happiness: -10, wisdom: 5 }
    }
  }

  // 随机冲突（好感度增加真实感）
  if (bestie.favorScore > 40 && bestie.status === 'active' && Math.random() < 0.05) {
    var conflictTexts = [
      { text: bestie.name + '误会你说了他/她的坏话，你们吵了一架。', effect: { happiness: -8, social: -3 } },
      { text: '你和' + bestie.name + '因为一件事意见不和，互相冷战了。', effect: { happiness: -5, social: -2 } },
      { text: bestie.name + '借钱不还，你心里很不舒服。', effect: { happiness: -5, wealth: -2, wisdom: 3 } },
      { text: bestie.name + '放了你鸽子，你白等了一下午。', effect: { happiness: -10, social: -5 } },
      { text: bestie.name + '跟你说了一些不该说的话，伤害了你的自尊。', effect: { happiness: -12 } }
    ]
    var conflict = conflictTexts[Math.floor(Math.random() * conflictTexts.length)]
    bestie.favorScore = Math.max(0, bestie.favorScore - Math.floor(Math.random() * 15 + 5))
    bestie.conflictHistory.push({ age: age, text: conflict.text })
    bestie.memories.push({ age: age, text: conflict.text, type: 'conflict' })
    return {
      type: 'conflict',
      text: conflict.text,
      effect: conflict.effect,
      newScore: bestie.favorScore
    }
  }

  // 和解事件
  if (bestie.status === 'estranged' && bestie.favorScore < 30 && Math.random() < 0.08) {
    bestie.status = 'reunited'
    bestie.favorScore = Math.min(100, bestie.favorScore + 20)
    bestie.memories.push({
      age: age,
      text: bestie.name + '主动联系了你，一句"好久不见"让所有隔阂都烟消云散了。',
      type: 'reunion'
    })
    return {
      type: 'reunion',
      text: '有一天，' + bestie.name + '突然发来了一条消息："好久不见，你最近还好吗？"你们解开心结，重归于好。',
      effect: { happiness: 20, wisdom: 5 }
    }
  }

  return null
}

// ─── 挚友随机日常事件 ────────────────────────────────────────
export function getBestieDailyEvent(bestie, character, age) {
  var yearSinceLast = age - (bestie.lastGatheringAge || bestie.meetAge || 0)
  if (yearSinceLast < 1) return null // 今年已经互动过

  var events = []

  if (bestie.favorScore > 30) {
    events.push({
      text: bestie.name + '发了一条动态，你默默点了赞，心里觉得有这样一个朋友真好。',
      effect: { happiness: 3 }
    })
    events.push({
      text: bestie.name + '突然给你寄了一个小礼物，说"逛街看到就想到你了"。',
      effect: { happiness: 8, charm: 2 }
    })
    events.push({
      text: bestie.name + '打电话来跟你吐槽工作，你听着听着笑了——这家伙的烦恼跟你一模一样。',
      effect: { happiness: 5, wisdom: 2 }
    })
  }

  if (bestie.favorScore > 60) {
    events.push({
      text: bestie.name + '在你生日那天零点准时发来了祝福，你被暖到了。',
      effect: { happiness: 10, social: 3 }
    })
    events.push({
      text: bestie.name + '介绍了一个不错的人给你认识，你们聊得很投机。',
      effect: { social: 8, happiness: 5 }
    })
    events.push({
      text: bestie.name + '跟你分享了一个赚钱的副业机会，虽然你不一定做，但很感谢这份心意。',
      effect: { wealth: 3, wisdom: 3 }
    })
  }

  if (bestie.favorScore > 80) {
    events.push({
      text: bestie.name + '在你最需要支持的时候，毫不犹豫地站在了你这边。你突然理解了"生死之交"四个字的重量。',
      effect: { happiness: 15, wisdom: 5, social: 5 }
    })
  }

  if (events.length === 0) return null
  var ev = events[Math.floor(Math.random() * events.length)]
  bestie.lastGatheringAge = age
  return ev
}

// ─── 每年更新挚友关系 ────────────────────────────────────────
export function updateBesties(besties, character, age) {
  if (!besties || besties.length === 0) return besties

  var updated = []
  for (var i = 0; i < besties.length; i++) {
    var b = JSON.parse(JSON.stringify(besties[i]))

    // 计入相识年数
    if (b.meetAge > 0) {
      b.knowYears = age - b.meetAge
    }

    // 自然衰减：超过3年没有聚会，好感度微降
    var yearsSinceGathering = age - (b.lastGatheringAge || b.meetAge)
    if (yearsSinceGathering > 3 && b.status === 'active') {
      b.favorScore = Math.max(0, b.favorScore - (yearsSinceGathering - 3) * 2)
    }

    // 忠诚度随好感度微调
    b.loyalty = Math.min(100, Math.max(0, Math.round((b.favorScore + b.trust) / 2)))

    updated.push(b)
  }
  return updated
}

// ─── 获取挚友羁绊等级 ────────────────────────────────────────
export function getBestieBondLevel(bestie) {
  var score = bestie.favorScore || 0
  var level = getFavorLevel(score)

  // 特殊称号
  if (bestie.sharedSecret && score > 60) level.name = '知己'
  if (bestie.knowYears > 30 && score > 70) level.name = '一生挚友'
  if (bestie.knowYears > 50 && score > 80) level.name = '一生所伴'

  return {
    level: level,
    score: score,
    trust: bestie.trust || 0,
    loyalty: bestie.loyalty || 0,
    years: bestie.knowYears || 0,
    typeName: bestie.typeName || '挚友',
    typeIcon: bestie.typeIcon || '💎'
  }
}

// ─── 生成挚友相遇事件 ────────────────────────────────────────
export function generateBestieMeetEvent(bestie, character) {
  var age = character.age || 0
  var meetScenes = {
    bestie: [
      '新学期分到了同一个宿舍，你们从讨论护肤品开始，聊到了凌晨三点。',
      '在一家咖啡馆拼桌时认识的，发现对方也在看同一本书。',
      '在公司的团建活动中，你们组成了队友，配合默契得惊人。'
    ],
    bro: [
      '篮球场上打了一场球，你们互相欣赏对方的技术，打完球就加了微信。',
      '游戏里匹配到的队友，配合天衣无缝，聊了几句发现还在同一个城市。',
      '公司项目合作中认识的，一起加了无数个夜班后建立了革命友谊。'
    ],
    confidant: [
      '在一个读书会上认识的，你们对同一本书的理解惊人地相似。',
      '旅行途中认识的陌生人，聊了整整一路，觉得对方是世界上最懂自己的人。',
      '在深夜的便利店，你们都买了同一瓶酒，相视一笑，就聊了起来。'
    ],
    childhood_buddy: [
      '你们是邻居，从穿开裆裤的时候就认识了。',
      '幼儿园的第一天，你哭了，他/她递过来一颗糖。从此成了最好的朋友。',
      '小学的同桌，一起抄过作业也一起被罚站过，感情就在这些事情里慢慢建立的。'
    ],
    work_buddy: [
      '分配到同一个项目组，发现对方能力和自己互补，一拍即合。',
      '在新员工培训中认识的，你们是同期中唯一还保持联系的两个。',
      '你帮他/她挡过一次锅，他/她请你吃了一顿饭，从此成了职场上的生死搭档。'
    ]
  }

  var scenes = meetScenes[bestie.type] || meetScenes.bestie
  var scene = scenes[Math.floor(Math.random() * scenes.length)]

  bestie.meetAge = age
  bestie.lastGatheringAge = age
  bestie.memories.push({
    age: age,
    text: '在' + age + '岁那年，你遇到了' + bestie.name + '。' + scene,
    type: 'first_meet'
  })

  return {
    text: '你遇到了一个特别的人——' + bestie.name + '。' + scene + '你隐约觉得，这将会是一段珍贵的友谊。',
    effect: { happiness: 10, social: 8 },
    scene: scene
  }
}

// ─── 根据角色属性推荐适合的挚友类型 ──────────────────────────
export function recommendBestieType(character) {
  var social = character.social || 50
  var charm = character.charm || 50
  var happiness = character.happiness || 50
  var age = character.age || 0

  var types = []

  // 社交高 → 容易交到各种类型的朋友
  if (social > 60) {
    types.push('bestie', 'bro', 'confidant')
  }
  if (charm > 60) {
    types.push('bestie', 'confidant')
  }
  if (happiness > 60) {
    types.push('bro', 'work_buddy')
  }

  // 年龄相关
  if (age < 12) {
    types.push('childhood_buddy')
  }
  if (age >= 22 && age < 40) {
    types.push('work_buddy')
  }

  // 性别倾向
  if (character.gender === 'female') {
    if (types.indexOf('bestie') === -1) types.push('bestie')
  } else {
    if (types.indexOf('bro') === -1) types.push('bro')
  }

  // 去重
  var unique = []
  for (var i = 0; i < types.length; i++) {
    if (unique.indexOf(types[i]) === -1) unique.push(types[i])
  }

  return unique
}

// ─── 检查是否应该触发挚友相识事件 ────────────────────────────
export function checkBestieTrigger(character, existingBesties, age) {
  // 如果已经有2个以上的挚友，不再触发
  if (existingBesties && existingBesties.length >= 3) return null

  // 不同年龄段有不同的触发概率
  var chance = 0
  if (age === 6) chance = 0.5   // 小学入学，认识发小
  if (age === 12) chance = 0.3  // 初中
  if (age === 15) chance = 0.25 // 高中
  if (age === 18) chance = 0.2  // 大学
  if (age === 22) chance = 0.2  // 毕业工作
  if (age >= 25 && age <= 35 && Math.random() < 0.08) chance = 0.15 // 职场

  if (age % 5 === 0) chance = Math.max(chance, 0.08) // 逢5年有机会

  if (Math.random() > chance) return null

  var types = recommendBestieType(character)
  if (existingBesties && existingBesties.length > 0) {
    // 避免重复类型
    var existingTypes = {}
    for (var i = 0; i < existingBesties.length; i++) {
      existingTypes[existingBesties[i].type] = true
    }
    types = types.filter(function(t) { return !existingTypes[t] })
  }
  if (types.length === 0) return null

  var typeId = types[Math.floor(Math.random() * types.length)]
  var bestie = createBestie(typeId, character)
  var meetEvent = generateBestieMeetEvent(bestie, character)

  return { bestie: bestie, event: meetEvent }
}
