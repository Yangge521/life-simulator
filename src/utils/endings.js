// ============================================================
// 人生模拟器 - 多结局系统
// 根据人生轨迹（属性、经历、成就、故事线、天赋）生成独特结局
// 不再只有简单的分数评级，而是20+种独特结局
// ============================================================

// ─── 结局定义 ────────────────────────────────────────────────
export const endings = {

  // ── 正面结局 ──

  legendary_life: {
    id: 'legendary_life',
    name: '传奇人生',
    icon: '🌟',
    rarity: 'legendary',
    description: '你的一生如同一部史诗，被后世传颂。',
    requirement: { minScore: 85, requireFlag: 'changed_world' },
    titles: ['传奇人物', '人间奇迹', '时代标杆'],
    epitaph: '你的人生证明了：凡人亦可超越极限。'
  },

  billionaire: {
    id: 'billionaire',
    name: '商业帝国',
    icon: '👑',
    rarity: 'epic',
    description: '你白手起家，打造了一个庞大的商业帝国。',
    requirement: { minWealth: 95, minAge: 50 },
    titles: ['商业巨子', '商界传奇', '财富之王'],
    epitaph: '你的故事被写进了商学院的教科书。'
  },

  nobel_laureate: {
    id: 'nobel_laureate',
    name: '学术巅峰',
    icon: '🏆',
    rarity: 'epic',
    description: '你在学术领域做出了划时代的贡献。',
    requirement: { minIntelligence: 90, requireFlag: 'major_discovery' },
    titles: ['学术泰斗', '科学先驱', '知识之光'],
    epitaph: '人类的知识因你而更丰富。'
  },

  artist_legend: {
    id: 'artist_legend',
    name: '艺术永恒',
    icon: '🎭',
    rarity: 'epic',
    description: '你的艺术作品超越了时间的束缚，成为永恒。',
    requirement: { minCreativity: 90, requireFlag: 'masterpiece_created' },
    titles: ['艺术大师', '灵魂画家', '时代的诗人'],
    epitaph: '你的作品在千年后仍会被人仰望。'
  },

  happy_family: {
    id: 'happy_family',
    name: '天伦之乐',
    icon: '👨‍👩‍👧‍👦',
    rarity: 'rare',
    description: '你拥有一个充满爱和欢笑的大家庭。',
    requirement: { minHappiness: 80, requireFlag: 'married', requireFlag2: 'has_children' },
    titles: ['好丈夫/好妻子', '慈爱的父母', '家庭的中流砥柱'],
    epitaph: '你一生最大的成就，就是这个温暖的家。'
  },

  philanthropist: {
    id: 'philanthropist',
    name: '大爱无疆',
    icon: '💝',
    rarity: 'rare',
    description: '你将大部分财富和时间用于帮助他人。',
    requirement: { minWisdom: 70, requireFlag: 'significant_charity' },
    titles: ['慈善家', '人间天使', '奉献一生'],
    epitaph: '你留下的不是财富，而是数不清的温暖。'
  },

  explorer: {
    id: 'explorer',
    name: '环游世界',
    icon: '🌍',
    rarity: 'rare',
    description: '你走遍了世界的每个角落，看过了所有的风景。',
    requirement: { minWisdom: 60, requireFlag: 'traveled_everywhere' },
    titles: ['旅行家', '冒险家', '世界的过客'],
    epitaph: '你的足迹丈量了地球的每一寸土地。'
  },

  peaceful_life: {
    id: 'peaceful_life',
    name: '岁月静好',
    icon: '🍃',
    rarity: 'common',
    description: '你过着平凡但充实的生活，这是最难得的幸福。',
    requirement: { minHappiness: 70, minAge: 70 },
    titles: ['知足之人', '生活达人', '邻里的好榜样'],
    epitaph: '平凡才是真正的奢侈。'
  },

  wisdom_sage: {
    id: 'wisdom_sage',
    name: '智者之境',
    icon: '🦉',
    rarity: 'rare',
    description: '你历经沧桑，最终达到了超然物外的境界。',
    requirement: { minWisdom: 95, minAge: 65 },
    titles: ['智者', '人生导师', '通达之人'],
    epitaph: '你在平静中找到了人生的答案。'
  },

  rising_star: {
    id: 'rising_star',
    name: '少年天才',
    icon: '⭐',
    rarity: 'epic',
    description: '你在很年轻的时候就已经取得了惊人的成就。',
    requirement: { minAge: 18, maxAge: 30, minScore: 75 },
    titles: ['天才少年', '未来可期', '前途无量'],
    epitaph: '天妒英才，但你的光芒无法被掩盖。'
  },

  // ── 中性结局 ──

  ordinary_life: {
    id: 'ordinary_life',
    name: '平凡一生',
    icon: '🪨',
    rarity: 'common',
    description: '和大多数人一样，你度过了平凡的一生。',
    requirement: { maxScore: 65, minAge: 50 },
    titles: ['普通人', '默默无闻', '芸芸众生'],
    epitaph: '平凡不等于不幸福。'
  },

  workaholic: {
    id: 'workaholic',
    name: '工作狂人',
    icon: '💼',
    rarity: 'common',
    description: '你把大部分时间都献给了工作。',
    requirement: { minWealth: 65, maxHappiness: 45 },
    titles: ['拼命三郎', '职场战士', '没有生活的人'],
    epitaph: '你实现了财务自由，却失去了太多。'
  },

  lost_youth: {
    id: 'lost_youth',
    name: '迷茫青春',
    icon: '🌫️',
    rarity: 'common',
    description: '你花了很长时间才找到人生的方向。',
    requirement: { requireFlag: 'directionless_years', minAge: 35 },
    titles: ['迷茫者', '寻找者', '后知后觉'],
    epitaph: '虽然迟到，但你终于找到了属于自己的路。'
  },

  love_story: {
    id: 'love_story',
    name: '为爱而生',
    icon: '💕',
    rarity: 'rare',
    description: '你一生都在追寻爱情，终于找到了那个对的人。',
    requirement: { minCharm: 60, requireFlag: 'true_love', minHappiness: 65 },
    titles: ['痴情人', '爱情至上', '灵魂伴侣'],
    epitaph: '你相信爱情，而爱情也没有辜负你。'
  },

  late_bloomer: {
    id: 'late_bloomer',
    name: '大器晚成',
    icon: '🌺',
    rarity: 'rare',
    description: '年轻时默默无闻，中年后才绽放光芒。',
    requirement: { minAge: 55, minScore: 70, requireFlag: 'early_struggle' },
    titles: ['后来居上', '厚积薄发', '永不言弃'],
    epitaph: '人生从来不会太晚开始。'
  },

  // ── 新增更多结局 ──

  wanderer: {
    id: 'wanderer',
    name: '流浪诗人',
    icon: '🎒',
    rarity: 'rare',
    description: '你用一生丈量世界，灵魂永远在路上。',
    requirement: { minAge: 50, minHappiness: 60, requireFlag: 'traveled_world' },
    titles: ['游吟诗人', '天涯浪子', '无脚鸟'],
    epitaph: '你的灵魂不属于任何地方，却又属于每一寸土地。'
  },

  healer: {
    id: 'healer',
    name: '仁心仁术',
    icon: '⚕️',
    rarity: 'rare',
    description: '你把一生献给了救死扶伤的事业。',
    requirement: { minWisdom: 70, minSocial: 60, requireFlag: 'medical_career' },
    titles: ['白衣天使', '生命守护者', '医者仁心'],
    epitaph: '你救过的人，会永远记得你。'
  },

  teacher: {
    id: 'teacher',
    name: '桃李天下',
    icon: '📚',
    rarity: 'rare',
    description: '你用知识点亮了无数学生的未来。',
    requirement: { minIntelligence: 65, minWisdom: 60, requireFlag: 'teaching_career' },
    titles: ['启蒙者', '良师益友', '播种希望的人'],
    epitaph: '你的学生们，就是你最好的传承。'
  },

  survivor: {
    id: 'survivor',
    name: '绝处逢生',
    icon: '🔥',
    rarity: 'epic',
    description: '你经历了常人无法想象的磨难，却依然站起来。',
    requirement: { minAge: 60, minWisdom: 75, requireFlag: 'near_death_experience' },
    titles: ['不死鸟', '命运抗争者', '生命的奇迹'],
    epitaph: '命运想打倒你，但你从未屈服。'
  },

  secret_hero: {
    id: 'secret_hero',
    name: '无名英雄',
    icon: '🦸',
    rarity: 'epic',
    description: '你做过很多不为人知的善事，改变了无数人的命运。',
    requirement: { minWisdom: 70, minHappiness: 50, requireFlag: 'secret_kindness' },
    titles: ['幕后英雄', '沉默的善人', '暗夜星火'],
    epitaph: '你知道，这就够了。'
  },

  tech_pioneer: {
    id: 'tech_pioneer',
    name: '科技先驱',
    icon: '💻',
    rarity: 'epic',
    description: '你在科技领域开创了新的可能。',
    requirement: { minIntelligence: 80, requireFlag: 'tech_innovation' },
    titles: ['科技先锋', '改变者', '时代弄潮儿'],
    epitaph: '你的代码，运行在世界各地的屏幕上。'
  },

  culinary_master: {
    id: 'culinary_master',
    name: '美食人生',
    icon: '🍳',
    rarity: 'rare',
    description: '你用美食温暖了无数人的胃和心。',
    requirement: { minCreativity: 60, minHappiness: 70, requireFlag: 'chef_career' },
    titles: ['美食家', '味蕾艺术家', '温暖制造者'],
    epitaph: '你说过，爱是最好的调味料。'
  },

  sports_legend: {
    id: 'sports_legend',
    name: '体育传奇',
    icon: '🏅',
    rarity: 'epic',
    description: '你在体育赛场上创造了传奇。',
    requirement: { minHealth: 90, minWealth: 60, requireFlag: 'sports_career' },
    titles: ['冠军', '运动健将', '国家骄傲'],
    epitaph: '领奖台上的光芒，是你一生的荣耀。'
  },

  eternal_student: {
    id: 'eternal_student',
    name: '终身学习',
    icon: '📖',
    rarity: 'rare',
    description: '你活到老学到老，从未停止追求知识。',
    requirement: { minIntelligence: 70, minEducation: 85, minAge: 70 },
    titles: ['求知者', '学者', '智慧的朝圣者'],
    epitaph: '生命有限，知识无限。'
  },

  community_pillar: {
    id: 'community_pillar',
    name: '社区栋梁',
    icon: '🏘️',
    rarity: 'common',
    description: '你默默地为社区做贡献，被邻里尊重。',
    requirement: { minSocial: 60, minHappiness: 55, minAge: 50 },
    titles: ['好邻居', '热心人', '社区守护者'],
    epitaph: '你让大家相信，这个世界依然温暖。'
  },

  // ── 悲剧结局 ──

  tragic_genius: {
    id: 'tragic_genius',
    name: '悲剧天才',
    icon: '💀',
    rarity: 'epic',
    description: '你拥有无与伦比的才华，却被命运捉弄。',
    requirement: { minIntelligence: 85, maxHappiness: 30, maxHealth: 40 },
    titles: ['被诅咒的天才', '昙花一现', '未完成的交响曲'],
    epitaph: '如果命运对你温柔一些，你会改变整个世界。'
  },

  lonely_end: {
    id: 'lonely_end',
    name: '孤独终老',
    icon: '🕯️',
    rarity: 'common',
    description: '你一生独来独往，没有人在终点等你。',
    requirement: { maxSocial: 30, requireFlag: 'never_married' },
    titles: ['孤独者', '独行侠', '一个人的旅程'],
    epitaph: '你选择了孤独，或者说孤独选择了你。'
  },

  fall_from_grace: {
    id: 'fall_from_grace',
    name: '跌落神坛',
    icon: '⬇️',
    rarity: 'rare',
    description: '你曾经站在巅峰，却因一个错误失去了一切。',
    requirement: { requireFlag: 'was_rich', maxWealth: 30, minAge: 40 },
    titles: ['落魄英雄', '前车之鉴', '陨落的星辰'],
    epitaph: '成功容易守住难，你用一生学到了这个教训。'
  },

  illness_life: {
    id: 'illness_life',
    name: '与病共存',
    icon: '🏥',
    rarity: 'common',
    description: '疾病贯穿了你的一生，但你从未放弃。',
    requirement: { maxHealth: 25, minAge: 50 },
    titles: ['斗士', '不屈之人', '生命的奇迹'],
    epitaph: '你的坚强感动了每一个认识你的人。'
  },

  wanderer: {
    id: 'wanderer',
    name: '漂泊一生',
    icon: '⛵',
    rarity: 'common',
    description: '你从未安定下来，一辈子在漂泊。',
    requirement: { requireFlag: 'never_settled', minWisdom: 50 },
    titles: ['流浪者', '自由灵魂', '无根之人'],
    epitaph: '你一生都在路上，或许终点就是下一个起点。'
  },

  // ── 特殊/隐藏结局 ──

  reborn_sage: {
    id: 'reborn_sage',
    name: '涅槃重生',
    icon: '🔥',
    rarity: 'legendary',
    hidden: true,
    description: '经历巨大苦难后，你获得了超凡的智慧和内心的平静。',
    requirement: { requireFlag: 'near_death', minWisdom: 90, minHappiness: 60, minAge: 40 },
    titles: ['重生者', '觉悟之人', '凤凰涅槃'],
    epitaph: '你从灰烬中站起，比所有人都更强大。'
  },

  secret_identity: {
    id: 'secret_identity',
    name: '隐藏身份',
    icon: '🎭',
    rarity: 'legendary',
    hidden: true,
    description: '你的一生远比你表面看到的精彩得多...',
    requirement: { requireFlag: 'secret_life', minAge: 60 },
    titles: ['谜一样的人', '双重人生', '不为人知的英雄'],
    epitaph: '真相永远封存在了你的微笑里。'
  },

  time_loop: {
    id: 'time_loop',
    name: '时间轮回',
    icon: '🔄',
    rarity: 'mythic',
    hidden: true,
    description: '你有一种奇怪的感觉...这一切似乎不是第一次。',
    requirement: { requireFlag: 'deja_vu_memory', minWisdom: 95 },
    titles: ['轮回者', '时空旅者', '永恒之人'],
    epitaph: '这只是一个循环的开始...'
  },

  perfect_life: {
    id: 'perfect_life',
    name: '完美人生',
    icon: '🌈',
    rarity: 'mythic',
    hidden: true,
    description: '所有属性都达到了顶峰，这是百万分之一概率的人生。',
    requirement: { minScore: 95, minAge: 70, requireFlag: 'married', requireFlag2: 'has_children' },
    titles: ['人生赢家', '完美之人', '上天的宠儿'],
    epitaph: '你的一生就是"幸福"这个词的完美注解。'
  },

  // ════════════════════════════════════════════════════════════
  // 新增结局 - 2026-05-20 扩充
  // ════════════════════════════════════════════════════════════

  tech_giant: {
    id: 'tech_giant',
    name: '科技巨头',
    icon: '💻',
    rarity: 'legendary',
    description: '你创办了一家改变世界的科技公司，成为时代周刊封面人物。',
    requirement: { minScore: 80, minIntelligence: 90, minWealth: 85, requireFlag: 'entrepreneur' },
    titles: ['硅谷传奇', '创新之父', '数字时代的先驱'],
    epitaph: '你用一行代码改变了十亿人的生活，技术是你留给世界最好的礼物。'
  },

  medical_pioneer: {
    id: 'medical_pioneer',
    name: '医学先驱',
    icon: '🔬',
    rarity: 'epic',
    description: '你在医学领域取得重大突破，拯救了无数生命。',
    requirement: { minScore: 75, minIntelligence: 85, minAge: 50, requireFlag: 'doctor' },
    titles: ['生命守护者', '杏林圣手', '医学之光'],
    epitaph: '你的研究让死神退却了无数步，每一个被你拯救的生命都是你的勋章。'
  },

  art_master: {
    id: 'art_master',
    name: '艺术大师',
    icon: '🎭',
    rarity: 'epic',
    description: '你的艺术作品被博物馆收藏，影响了整整一代人。',
    requirement: { minScore: 70, minCreativity: 88, requireFlag: 'artist' },
    titles: ['当代毕加索', '灵魂画家', '艺术之神'],
    epitaph: '你的画笔描绘了人类最深的情感，时间无法褪去你作品中的光芒。'
  },

  peaceful_farmer: {
    id: 'peaceful_farmer',
    name: '田园诗人',
    icon: '🌾',
    rarity: 'rare',
    description: '你离开了都市的喧嚣，在乡间找到了内心的平静与富足。',
    requirement: { minHappiness: 70, minHealth: 70, maxAge: 80 },
    titles: ['田园隐士', '种豆南山', '归园田居'],
    epitaph: '采菊东篱下，悠然见南山。你用一生的选择证明，幸福不需要太多。'
  },

  globe_trotter: {
    id: 'globe_trotter',
    name: '环球旅行家',
    icon: '✈️',
    rarity: 'rare',
    description: '你走遍了世界的每一个角落，用脚步丈量了整个地球。',
    requirement: { minSocial: 70, minHappiness: 65, requireFlag: 'traveler' },
    titles: ['地球漫步者', '世界公民', '行走的百科全书'],
    epitaph: '你的护照盖满了章，你的心装满了世界的风景。'
  },

  charity_angel: {
    id: 'charity_angel',
    name: '慈善天使',
    icon: '🕊️',
    rarity: 'epic',
    description: '你将大部分财富捐给了慈善事业，帮助了无数需要帮助的人。',
    requirement: { minWealth: 60, minHappiness: 80, minWisdom: 70, requireFlag: 'charity' },
    titles: ['人间天使', '大爱无疆', '善的化身'],
    epitaph: '你散尽了千金，却收获了世间最珍贵的东西——爱与尊敬。'
  },

  esports_champion: {
    id: 'esports_champion',
    name: '电竞冠军',
    icon: '🎮',
    rarity: 'rare',
    description: '你在世界电竞赛事中夺冠，成为了电子竞技的传奇。',
    requirement: { minIntelligence: 70, minSocial: 65, maxAge: 30, requireFlag: 'gamer' },
    titles: ['电竞之王', '指尖战神', '操作天花板'],
    epitaph: '五个人的游戏，一个时代的传说。你的操作永远铭刻在电竞史上。'
  },

  family_guardian: {
    id: 'family_guardian',
    name: '家庭守护者',
    icon: '🏡',
    rarity: 'rare',
    description: '你没有惊天动地的成就，但你用一生的温柔守护了整个家庭。',
    requirement: { minHappiness: 75, minHealth: 60, requireFlag: 'married', requireFlag2: 'has_children' },
    titles: ['好家长', '家庭之柱', '温暖的港湾'],
    epitaph: '你的一生没有轰轰烈烈，但你家人的笑容就是最好的墓志铭。'
  },

  dark_horse: {
    id: 'dark_horse',
    name: '黑马逆袭',
    icon: '🐴',
    rarity: 'epic',
    description: '从小镇走出来的你，凭借过人的毅力和才华，创造了不可思议的逆袭。',
    requirement: { minScore: 80, minIntelligence: 75, minWealth: 75, requireFlag: 'poor_start' },
    titles: ['逆袭之王', '从零到一', '命运改写者'],
    epitaph: '起跑线不是终点线，你用一生证明了这句话。'
  },

  viral_influencer: {
    id: 'viral_influencer',
    name: '现象级网红',
    icon: '📱',
    rarity: 'common',
    description: '你成为了全网数千万粉丝的现象级网红，名利双收但争议不断。',
    requirement: { minSocial: 80, minCharm: 75, minWealth: 60 },
    titles: ['流量之王', '话题制造机', '网络之星'],
    epitaph: '你的每一条动态都能引爆热搜，流量是你这个时代最硬的货币。'
  },

  veteran_hero: {
    id: 'veteran_hero',
    name: '退伍英雄',
    icon: '🎖️',
    rarity: 'epic',
    hidden: true,
    description: '你在军旅生涯中保家卫国，退役后继续发光发热。',
    requirement: { minScore: 75, minHealth: 65, requireFlag: 'military_veteran' },
    titles: ['钢铁战士', '最可爱的人', '国之栋梁'],
    epitaph: '脱下军装，你依然是最可靠的人。军人的骨气，你保持了一辈子。'
  },

  lonely_genius: {
    id: 'lonely_genius',
    name: '孤独天才',
    icon: '🧪',
    rarity: 'epic',
    description: '你智商超群但在社交中格格不入，最终在学术领域留下了不朽的成果。',
    requirement: { minIntelligence: 95, maxSocial: 35, requireFlag: 'genius' },
    titles: ['旷世奇才', '独行侠', '学术泰斗'],
    epitaph: '你的论文被引用了上万次，但你最好的朋友始终是那盏深夜的台灯。'
  }
}

// ─── 结局稀有度配置 ─────────────────────────────────────────
export const endingRarity = {
  common:    { name: '普通', color: '#9e9e9e', bg: 'rgba(158,158,158,0.15)' },
  rare:      { name: '稀有', color: '#4facfe', bg: 'rgba(79,172,254,0.15)' },
  epic:      { name: '史诗', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  legendary: { name: '传说', color: '#ffd700', bg: 'rgba(255,215,0,0.15)' },
  mythic:    { name: '神话', color: '#ff4444', bg: 'rgba(255,68,68,0.15)' }
}

// ─── 根据人生数据计算结局 ────────────────────────────────────
export function calculateEnding(character, history, achievements, storyState, talents) {
  var flags = storyState ? (storyState.flags || []) : []
  if (!character._flags) character._flags = []
  flags = flags.concat(character._flags)

  var score = Math.round((
    (character.wealth || 0) +
    (character.happiness || 0) +
    (character.health || 0) +
    (character.intelligence || 0) +
    (character.social || 0) +
    (character.wisdom || 0) +
    (character.charm || 0) +
    (character.creativity || 0)
  ) / 8)

  var endingsList = Object.keys(endings)
  var matched = []

  for (var i = 0; i < endingsList.length; i++) {
    var ending = endings[endingsList[i]]
    var req = ending.requirement
    if (checkRequirement(req, character, flags, score)) {
      matched.push(ending)
    }
  }

  if (matched.length === 0) {
    // 默认结局
    return endings.ordinary_life
  }

  // 按稀有度排序，选最稀有的
  var rarityOrder = { mythic: 5, legendary: 4, epic: 3, rare: 2, common: 1 }
  matched.sort(function(a, b) {
    return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0)
  })

  return matched[0]
}

function checkRequirement(req, character, flags, score) {
  if (!req) return false

  if (req.minScore && score < req.minScore) return false
  if (req.maxScore && score > req.maxScore) return false
  if (req.minWealth && (character.wealth || 0) < req.minWealth) return false
  if (req.maxWealth && (character.wealth || 0) > req.maxWealth) return false
  if (req.minHappiness && (character.happiness || 0) < req.minHappiness) return false
  if (req.maxHappiness && (character.happiness || 0) > req.maxHappiness) return false
  if (req.minHealth && (character.health || 0) < req.minHealth) return false
  if (req.maxHealth && (character.health || 0) > req.maxHealth) return false
  if (req.minIntelligence && (character.intelligence || 0) < req.minIntelligence) return false
  if (req.minWisdom && (character.wisdom || 0) < req.minWisdom) return false
  if (req.minCharm && (character.charm || 0) < req.minCharm) return false
  if (req.minCreativity && (character.creativity || 0) < req.minCreativity) return false
  if (req.minSocial && (character.social || 0) < req.minSocial) return false
  if (req.maxSocial && (character.social || 0) > req.maxSocial) return false
  if (req.minAge && (character.age || 0) < req.minAge) return false
  if (req.maxAge && (character.age || 0) > req.maxAge) return false
  if (req.requireFlag && flags.indexOf(req.requireFlag) === -1) return false
  if (req.requireFlag2 && flags.indexOf(req.requireFlag2) === -1) return false

  return true
}

// ─── 生成结局详情（含总结故事）───────────────────────────────
export function generateEndingStory(character, ending, history, talents) {
  var story = ''

  // 开头
  var starts = [
    '在' + character.age + '岁那年，你的人生画上了句号。',
    '你走完了' + character.age + '年的人生旅程。',
    '时间定格在你' + character.age + '岁的那一天。'
  ]
  story += starts[Math.floor(Math.random() * starts.length)] + '\n\n'

  // 结局描述
  story += '【' + ending.name + '】\n'
  story += ending.description + '\n\n'

  // 标题
  story += '世人称你为：' + ending.titles[Math.floor(Math.random() * ending.titles.length)] + '\n\n'

  // 天赋回顾
  if (talents && talents.length > 0) {
    story += '你的天赋：'
    for (var i = 0; i < talents.length; i++) {
      story += talents[i].icon + talents[i].name
      if (i < talents.length - 1) story += '、'
    }
    story += '\n\n'
  }

  // 人生关键词统计
  var keywords = analyzeLifeKeywords(history)
  if (keywords.length > 0) {
    story += '你人生的关键词：' + keywords.join('、') + '\n\n'
  }

  // 墓志铭
  story += '「' + ending.epitaph + '」'

  return story
}

// ─── 分析人生关键词 ────────────────────────────────────────────
function analyzeLifeKeywords(history) {
  var keywords = {}
  var keywordMap = {
    '学业': ['考试', '学校', '大学', '学习', '成绩', '毕业', '教育'],
    '爱情': ['恋', '爱', '婚姻', '结婚', '离婚', '分手', '表白', '初恋'],
    '事业': ['工作', '升职', '创业', '公司', '老板', '裁员', '退休', 'CEO'],
    '家庭': ['孩子', '父母', '妈妈', '爸爸', '爷爷', '奶奶', '弟弟', '妹妹'],
    '健康': ['病', '医院', '手术', '养生', '锻炼', '住院'],
    '财富': ['钱', '投资', '买房', '贷款', '存款', '奖金'],
    '友谊': ['朋友', '闺蜜', '兄弟', '同学'],
    '旅行': ['旅行', '出国', '旅游', '世界'],
    '艺术': ['音乐', '画', '表演', '创作', '小说', '乐器'],
    '磨难': ['失败', '打击', '困难', '挫折', '逆境']
  }

  if (!history || history.length === 0) return []

  var historyText = ''
  for (var i = 0; i < history.length; i++) {
    historyText += (history[i].text || '') + ' '
  }

  var kks = Object.keys(keywordMap)
  for (var j = 0; j < kks.length; j++) {
    var kk = kks[j]
    var words = keywordMap[kk]
    var count = 0
    for (var k = 0; k < words.length; k++) {
      if (historyText.indexOf(words[k]) !== -1) count++
    }
    if (count > 0) {
      keywords[kk] = count
    }
  }

  // 按频率排序，取前5
  var sorted = Object.keys(keywords).sort(function(a, b) {
    return keywords[b] - keywords[a]
  })

  return sorted.slice(0, 5)
}
