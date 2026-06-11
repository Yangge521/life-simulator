// ============================================================
// 人生模拟器 - 特殊事件库
// 稀有事件、彩蛋、转折点
// ============================================================

export const specialEvents = [
  // ════════════════════════════════════════════════════════════
  // 好运事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'lottery_win',
    text: '你中了彩票大奖！',
    icon: '🎰',
    probability: 0.002,
    conditions: { minAge: 18 },
    choices: [
      { text: '谨慎理财', effect: { wealth: 30, wisdom: 5 }, followUp: '你明智地管理这笔财富' },
      { text: '改善生活', effect: { wealth: 20, happiness: 20 }, followUp: '你享受了一段美好的时光' },
      { text: '全部挥霍', effect: { wealth: -10, happiness: 30 }, followUp: '很快，钱就花光了...' }
    ]
  },
  {
    id: 'inheritance',
    text: '远房亲戚去世，留给你一笔遗产',
    icon: '📜',
    probability: 0.005,
    conditions: { minAge: 25 },
    effect: { wealth: 25 },
    followUp: '人生无常，珍惜眼前'
  },
  {
    id: 'viral_fame',
    text: '你的一段视频在网上爆火了！',
    icon: '📱',
    probability: 0.003,
    conditions: { minAge: 15, maxAge: 40 },
    choices: [
      { text: '趁势做网红', effect: { wealth: 15, social: 20, charm: 10 }, followUp: '你成了小有名气的网红', tag: 'internet_famous' },
      { text: '低调处理', effect: { wisdom: 10 }, followUp: '你选择回归正常生活' }
    ]
  },
  {
    id: 'meet_celebrity',
    text: '你意外认识了一位名人！',
    icon: '⭐',
    probability: 0.004,
    conditions: { minAge: 18 },
    choices: [
      { text: '建立联系', effect: { social: 15, charm: 5 }, followUp: '你们成了朋友' },
      { text: '只是礼貌问候', effect: { happiness: 5 }, followUp: '这只是一次偶遇' }
    ]
  },
  {
    id: 'investment_tip',
    text: '朋友给你透露了一个投资内幕',
    icon: '💡',
    probability: 0.006,
    conditions: { minAge: 22, minWealth: 30 },
    choices: [
      { text: '果断投资', effect: { wealth: 20 }, followUp: '你大赚了一笔！', tag: 'smart_investor' },
      { text: '保持谨慎', effect: { wisdom: 5 }, followUp: '你规避了风险' }
    ]
  },
  
  // ════════════════════════════════════════════════════════════
  // 灾难事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'car_accident',
    text: '你遭遇了一场车祸',
    icon: '🚗',
    probability: 0.003,
    conditions: { minAge: 18 },
    choices: [
      { text: '幸运生还', effect: { health: -15, wisdom: 10, happiness: 5 }, followUp: '你更加珍惜生命了' },
      { text: '伤势严重', effect: { health: -30, wealth: -10 }, followUp: '漫长的康复之路开始了' }
    ]
  },
  {
    id: 'natural_disaster',
    text: '你遭遇了自然灾害',
    icon: '🌊',
    probability: 0.002,
    conditions: { minAge: 5 },
    effect: { wealth: -20, happiness: -10 },
    followUp: '灾难无情，人间有爱'
  },
  {
    id: 'bankruptcy',
    text: '你的投资/生意失败了',
    icon: '📉',
    probability: 0.008,
    conditions: { minAge: 25, minWealth: 50 },
    effect: { wealth: -30, happiness: -15 },
    followUp: '失败是成功之母',
    tag: 'business_failed'
  },
  {
    id: 'fraud_victim',
    text: '你被诈骗了！',
    icon: '🎭',
    probability: 0.004,
    conditions: { minAge: 18 },
    choices: [
      { text: '及时止损', effect: { wealth: -10, wisdom: 10 }, followUp: '你学到了宝贵的一课' },
      { text: '损失惨重', effect: { wealth: -25, happiness: -10 }, followUp: '你陷入了一段低谷' }
    ]
  },
  
  // ════════════════════════════════════════════════════════════
  // 人生转折
  // ════════════════════════════════════════════════════════════
  {
    id: 'epiphany',
    text: '你突然顿悟了人生的真谛',
    icon: '💭',
    probability: 0.005,
    conditions: { minAge: 30 },
    effect: { wisdom: 20, happiness: 10 },
    followUp: '豁然开朗的感觉真好'
  },
  {
    id: 'midlife_crisis',
    text: '你经历了中年危机',
    icon: '🔄',
    probability: 0.01,
    conditions: { minAge: 40, maxAge: 55 },
    choices: [
      { text: '积极应对', effect: { wisdom: 15, happiness: 5 }, followUp: '你找到了新的人生意义' },
      { text: '逃避一时', effect: { happiness: -10, health: -5 }, followUp: '你花了一些时间调整' }
    ]
  },
  {
    id: 'religious_awakening',
    text: '你对信仰产生了深刻的感悟',
    icon: '🙏',
    probability: 0.004,
    conditions: { minAge: 25 },
    effect: { wisdom: 15, happiness: 10 },
    followUp: '心灵找到了寄托'
  },
  {
    id: 'career_epiphany',
    text: '你找到了真正的职业方向',
    icon: '🎯',
    probability: 0.006,
    conditions: { minAge: 25, maxAge: 45 },
    effect: { happiness: 15, wisdom: 10 },
    followUp: '做自己热爱的事真好'
  },
  
  // ════════════════════════════════════════════════════════════
  // 人际关系事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'enemy_reconcile',
    text: '你和曾经的敌人和解了',
    icon: '🤝',
    probability: 0.003,
    conditions: { minAge: 20 },
    effect: { social: 10, happiness: 10, wisdom: 5 },
    followUp: '宽恕是最好的礼物'
  },
  {
    id: 'lost_friend',
    text: '你和多年的好友失去了联系',
    icon: '👋',
    probability: 0.008,
    conditions: { minAge: 25 },
    effect: { happiness: -10, social: -5 },
    followUp: '人生路上，聚散是常态'
  },
  {
    id: 'mentor_appears',
    text: '你遇到了一位人生导师',
    icon: '👨‍🏫',
    probability: 0.005,
    conditions: { minAge: 18, maxAge: 40 },
    choices: [
      { text: '虚心学习', effect: { intelligence: 10, wisdom: 15, social: 10 }, followUp: '导师的教诲让你受益终身', tag: 'has_mentor' },
      { text: '礼貌感谢', effect: { social: 5 }, followUp: '你们保持着良好的关系' }
    ]
  },
  {
    id: 'rivalry',
    text: '你在工作中遇到了强劲的对手',
    icon: '⚔️',
    probability: 0.007,
    conditions: { minAge: 22, flag: 'employed' },
    choices: [
      { text: '良性竞争', effect: { intelligence: 10, wisdom: 5 }, followUp: '你们互相促进成长' },
      { text: '暗中较量', effect: { social: -5, happiness: -5 }, followUp: '竞争让你有些疲惫' }
    ]
  },
  
  // ════════════════════════════════════════════════════════════
  // 隐藏彩蛋事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'time_capsule',
    text: '你挖出了一个时间胶囊',
    icon: '📦',
    probability: 0.001,
    conditions: { minAge: 10 },
    effect: { happiness: 10 },
    followUp: '里面装着20年前的记忆',
    hidden: true
  },
  {
    id: 'secret_talent',
    text: '你发现自己有一个隐藏的天赋',
    icon: '🎁',
    probability: 0.002,
    conditions: { minAge: 15 },
    effect: { creativity: 15, happiness: 10 },
    followUp: '原来你可以做得这么好！',
    hidden: true
  },
  {
    id: 'forgotten_dream',
    text: '你想起了一个儿时的梦想',
    icon: '🌈',
    probability: 0.003,
    conditions: { minAge: 35 },
    choices: [
      { text: '重拾梦想', effect: { happiness: 15, creativity: 10 }, followUp: '永远不晚开始' },
      { text: '珍藏回忆', effect: { wisdom: 5 }, followUp: '有些美好只属于过去' }
    ],
    hidden: true
  },
  {
    id: 'lucky_escape',
    text: '你躲过了一场大灾难',
    icon: '🍀',
    probability: 0.002,
    conditions: { minAge: 18 },
    effect: { happiness: 10, wisdom: 5 },
    followUp: '真是福大命大',
    hidden: true
  },
  {
    id: 'double_rainbow',
    text: '你看到了绝美的双彩虹',
    icon: '🌈',
    probability: 0.001,
    conditions: {},
    effect: { happiness: 5 },
    followUp: '生活中的小确幸',
    hidden: true
  },
  {
    id: 'ufo_sighting',
    text: '你看到了不明飞行物！',
    icon: '🛸',
    probability: 0.0005,
    conditions: { minAge: 10 },
    choices: [
      { text: '相信是外星人', effect: { creativity: 10, happiness: 5 }, followUp: '这成了你一生难忘的经历' },
      { text: '理性分析', effect: { intelligence: 5, wisdom: 5 }, followUp: '也许是某种自然现象' }
    ],
    hidden: true
  },
  {
    id: 'dream_premonition',
    text: '你做了一个预知梦，第二天居然应验了',
    icon: '🔮',
    probability: 0.0008,
    conditions: { minAge: 15 },
    effect: { wisdom: 10, happiness: 5 },
    followUp: '你开始相信命运了',
    hidden: true
  },
  {
    id: 'mystery_box',
    text: '你在阁楼发现了一个神秘的旧盒子',
    icon: '📦',
    probability: 0.002,
    conditions: { minAge: 8 },
    choices: [
      { text: '打开看看', effect: { happiness: 10, creativity: 5 }, followUp: '里面是祖辈的珍贵遗物' },
      { text: '不去碰它', effect: { wisdom: 5 }, followUp: '也许有些秘密不需要揭开' }
    ],
    hidden: true
  },
  {
    id: 'parallel_feeling',
    text: '某天你突然有强烈的既视感，仿佛活在另一个时空',
    icon: '🌀',
    probability: 0.001,
    conditions: { minAge: 20 },
    effect: { wisdom: 10, creativity: 5 },
    followUp: '也许平行宇宙真的存在...',
    hidden: true
  },
  
  // ════════════════════════════════════════════════════════════
  // 家庭特殊事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'family_reunion',
    text: '你参加了盛大的家族聚会',
    icon: '👨‍👩‍👧‍👦',
    probability: 0.008,
    conditions: { minAge: 20 },
    effect: { happiness: 15, social: 10 },
    followUp: '血浓于水'
  },
  {
    id: 'sibling_conflict',
    text: '你和兄弟姐妹发生了矛盾',
    icon: '💢',
    probability: 0.005,
    conditions: { minAge: 15 },
    choices: [
      { text: '主动和解', effect: { social: 5, wisdom: 5 }, followUp: '家人之间没有过不去的坎' },
      { text: '保持距离', effect: { happiness: -5 }, followUp: '你心里有些不是滋味' }
    ]
  },
  {
    id: 'family_secret',
    text: '你发现了家族的一个秘密',
    icon: '🔐',
    probability: 0.002,
    conditions: { minAge: 18 },
    choices: [
      { text: '坦然接受', effect: { wisdom: 15 }, followUp: '每个家庭都有自己的故事' },
      { text: '深受打击', effect: { happiness: -10 }, followUp: '你花了一段时间消化' }
    ],
    hidden: true
  },
  
  // ════════════════════════════════════════════════════════════
  // 成长契机事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'public_speaking',
    text: '你第一次在公众面前演讲',
    icon: '🎤',
    probability: 0.006,
    conditions: { minAge: 15 },
    choices: [
      { text: '表现优秀', effect: { charm: 10, social: 10, happiness: 5 }, followUp: '你克服了恐惧' },
      { text: '有些紧张', effect: { charm: 3, wisdom: 3 }, followUp: '积累了经验' }
    ]
  },
  {
    id: 'travel_solo',
    text: '你第一次独自旅行',
    icon: '🧳',
    probability: 0.005,
    conditions: { minAge: 18, maxAge: 35 },
    effect: { wisdom: 10, happiness: 10, creativity: 5 },
    followUp: '世界那么大，你想去看看'
  },
  {
    id: 'learn_skill',
    text: '你学会了一项新技能',
    icon: '🔧',
    probability: 0.008,
    conditions: { minAge: 10 },
    effect: { intelligence: 8, happiness: 5 },
    followUp: '技多不压身'
  },
  
  // ════════════════════════════════════════════════════════════
  // 健康危机事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'major_illness',
    text: '你被诊断出患有严重疾病',
    icon: '🏥',
    probability: 0.004,
    conditions: { minAge: 30 },
    choices: [
      { text: '积极治疗', effect: { health: -20, wealth: -25, wisdom: 15 }, followUp: '你坚强地面对病魔,最终康复了' },
      { text: '保守治疗', effect: { health: -10, wealth: -15, happiness: -5 }, followUp: '你选择了与病魔和平共处' }
    ]
  },
  {
    id: 'accident_recovery',
    text: '你从严重的事故中奇迹康复',
    icon: '🌟',
    probability: 0.002,
    conditions: { minAge: 18 },
    effect: { health: -15, wisdom: 15, happiness: 10 },
    followUp: '大难不死,必有后福'
  },
  {
    id: 'mental_health_crisis',
    text: '你经历了严重的心理健康危机',
    icon: '🧠',
    probability: 0.003,
    conditions: { minAge: 15, maxAge: 45 },
    choices: [
      { text: '寻求专业帮助', effect: { happiness: 10, wisdom: 10, wealth: -5 }, followUp: '你学会了与自己和解' },
      { text: '告诉家人朋友', effect: { happiness: 5, social: 8, wisdom: 5 }, followUp: '身边的人给了你支持' },
      { text: '独自承受', effect: { happiness: -15, wisdom: -5 }, followUp: '你独自度过了难关' }
    ]
  },
  
  // ════════════════════════════════════════════════════════════
  // 人生里程碑
  // ════════════════════════════════════════════════════════════
  {
    id: 'first_home',
    text: '你买下了属于自己的第一套房子',
    icon: '🔑',
    probability: 0.01,
    conditions: { minAge: 22, minWealth: 30 },
    effect: { happiness: 20, wealth: -30, social: 5 },
    followUp: '有了自己的家,生活有了新的意义'
  },
  {
    id: 'first_car',
    text: '你买下了人生第一辆车',
    icon: '🚗',
    probability: 0.015,
    conditions: { minAge: 20, minWealth: 15 },
    effect: { happiness: 15, wealth: -10, social: 5 },
    followUp: '出行更加便利了'
  },
  {
    id: 'overseas_adventure',
    text: '你独自踏上了海外冒险之旅',
    icon: '🌍',
    probability: 0.005,
    conditions: { minAge: 20, minWealth: 20, creativity: 15 },
    effect: { happiness: 20, wisdom: 15, creativity: 10, health: 5 },
    followUp: '这次旅行改变了你的世界观'
  },
  {
    id: 'writing_book',
    text: '你决定写一本书记录自己的人生',
    icon: '📖',
    probability: 0.003,
    conditions: { minAge: 25, wisdom: 30 },
    choices: [
      { text: '认真写作出版', effect: { wisdom: 10, reputation: 15, wealth: 5 }, followUp: '你的书出版了,获得了好评' },
      { text: '只在网络发表', effect: { wisdom: 5, happiness: 10, social: 5 }, followUp: '你的文章获得了网友喜爱' }
    ]
  },
  {
    id: 'learning_instrument',
    text: '你决定学习一种乐器',
    icon: '🎵',
    probability: 0.008,
    conditions: { minAge: 15, happiness: 20 },
    effect: { happiness: 10, creativity: 8, wisdom: 3 },
    followUp: '音乐丰富了你的生活'
  },
  {
    id: 'marathon_finisher',
    text: '你完成了人生第一个马拉松',
    icon: '🏃',
    probability: 0.004,
    conditions: { minAge: 20, health: 40 },
    effect: { health: 10, happiness: 20, wisdom: 5 },
    followUp: '你超越了自我的极限!'
  },
  {
    id: 'volunteer_work',
    text: '你开始长期做志愿者',
    icon: '❤️',
    probability: 0.006,
    conditions: { minAge: 18 },
    effect: { happiness: 15, social: 10, wisdom: 5, reputation: 8 },
    followUp: '帮助他人让自己的生活更有意义'
  },
  {
    id: 'adopt_pet',
    text: '你领养了一只宠物',
    icon: '🐕',
    probability: 0.008,
    conditions: { minAge: 18, happiness: 20 },
    effect: { happiness: 12, health: 3, wealth: -3 },
    followUp: '这个小生命改变了你的生活'
  },
  
  // ════════════════════════════════════════════════════════════
  // 职业特殊事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'get_fired',
    text: '你被公司裁员了',
    icon: '📄',
    probability: 0.006,
    conditions: { minAge: 25, maxAge: 50 },
    effect: { happiness: -15, career: -10 },
    followUp: '这是职业生崖的一个转折点',
    tag: 'unemployed'
  },
  {
    id: 'start_company',
    text: '你决定创业开启新篇章',
    icon: '🚀',
    probability: 0.004,
    conditions: { minAge: 25, minWealth: 40, minCareer: 30, creativity: 25 },
    choices: [
      { text: '全情投入', effect: { career: 15, wealth: -25, happiness: 15 }, followUp: '你全身心投入到创业中', tag: 'entrepreneur' },
      { text: '边工作边创业', effect: { career: 8, wealth: -10, happiness: 8 }, followUp: '你小心翼翼地平衡两边' }
    ]
  },
  {
    id: 'major_promotion',
    text: '你获得了梦寐以求的晋升',
    icon: '📈',
    probability: 0.005,
    conditions: { minAge: 30, minCareer: 40 },
    effect: { career: 15, wealth: 15, reputation: 10, happiness: 15 },
    followUp: '多年的努力终于得到了认可!'
  },
  {
    id: 'career_change',
    text: '你决定转行重新开始',
    icon: '🔄',
    probability: 0.004,
    conditions: { minAge: 28, minCareer: 20, wisdom: 25 },
    effect: { career: -5, happiness: 10, wisdom: 10 },
    followUp: '新的职业道路让你重获热情'
  },
  {
    id: 'work_abroad',
    text: '你获得了海外工作机会',
    icon: '✈️',
    probability: 0.003,
    conditions: { minAge: 25, minCareer: 30 },
    effect: { career: 12, wealth: 15, social: 8, wisdom: 8 },
    followUp: '这是一次难得的人生经历'
  },
  {
    id: 'workplace_conflict',
    text: '你在工作中遭遇了严重的人际冲突',
    icon: '⚔️',
    probability: 0.006,
    conditions: { minAge: 25, career: 20 },
    choices: [
      { text: '正面应对', effect: { wisdom: 10, social: 5, reputation: 3 }, followUp: '你巧妙地化解了冲突' },
      { text: '暂时回避', effect: { happiness: -5, wisdom: 3 }, followUp: '你选择了暂时退让' },
      { text: '离职走人', effect: { career: -8, happiness: 5 }, followUp: '你选择了新的工作环境' }
    ]
  },
  {
    id: 'mentor_change',
    text: '你遇到了人生中的贵人会改变你的命运',
    icon: '🌟',
    probability: 0.002,
    conditions: { minAge: 20, minCareer: 15 },
    effect: { career: 15, wisdom: 10, social: 8 },
    followUp: '在贵人的指引下,你少走了很多弯路'
  },
  {
    id: 'award_recognition',
    text: '你获得了行业重要的奖项',
    icon: '🏆',
    probability: 0.002,
    conditions: { minAge: 30, minCareer: 40, minReputation: 50 },
    effect: { reputation: 20, career: 10, happiness: 20 },
    followUp: '这是对你职业生涯的高度认可!'
  },
  
  // ════════════════════════════════════════════════════════════
  // 教育特殊事件
  // ══════════════════════════════════════════════════════════════
  {
    id: 'phd_completion',
    text: '你完成了博士学位!',
    icon: '🎓',
    probability: 0.002,
    conditions: { minAge: 25, minEducation: 50 },
    effect: { education: 20, reputation: 10, career: 10, wisdom: 10 },
    followUp: '学术之路让你的人生达到了新的高度!'
  },
  {
    id: 'study_abroad',
    text: '你获得了留学机会',
    icon: '📚',
    probability: 0.004,
    conditions: { minAge: 18, minEducation: 30 },
    effect: { education: 10, wisdom: 10, social: 8, happiness: 10 },
    followUp: '这段留学经历让你获益匪浅'
  },
  {
    id: 'academic_paper',
    text: '你发表的论文获得了业界关注',
    icon: '📄',
    probability: 0.003,
    conditions: { minAge: 25, intelligence: 30 },
    effect: { reputation: 8, intelligence: 5, education: 5 },
    followUp: '你的研究成果得到了认可'
  },
  {
    id: 'teacher_influence',
    text: '你遇到了一位影响你人生的老师',
    icon: '👨‍🏫',
    probability: 0.005,
    conditions: { minAge: 15, maxAge: 25 },
    effect: { wisdom: 12, education: 8, happiness: 8 },
    followUp: '这位老师启发你找到了人生方向'
  },
  {
    id: 'scholarship',
    text: '你获得了奖学金',
    icon: '💰',
    probability: 0.01,
    conditions: { minAge: 15, education: 25 },
    effect: { wealth: 8, reputation: 5, happiness: 8 },
    followUp: '这是对你努力的肯定'
  },
  
  // ════════════════════════════════════════════════════════════
  // 财务特殊事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'debt_crisis',
    text: '你陷入了严重的债务危机',
    icon: '💳',
    probability: 0.004,
    conditions: { minAge: 22, maxAge: 45 },
    choices: [
      { text: '努力还债', effect: { wealth: -20, wisdom: 10, happiness: -5 }, followUp: '你咬牙还清了所有债务' },
      { text: '申请破产', effect: { wealth: -25, reputation: -10 }, followUp: '你选择了破产保护' }
    ]
  },
  {
    id: 'sudden_wealth',
    text: '你意外获得了大笔财富',
    icon: '💎',
    probability: 0.001,
    conditions: { minAge: 25 },
    effect: { wealth: 40, happiness: 15, reputation: 5 },
    followUp: '这笔财富改变了你的生活轨迹'
  },
  {
    id: 'financial_advice',
    text: '你得到了专业的理财建议',
    icon: '💡',
    probability: 0.008,
    conditions: { minAge: 25, minWealth: 30 },
    effect: { wisdom: 8, wealth: 10 },
    followUp: '你的财富开始稳步增长'
  },
  {
    id: 'property_investment',
    text: '你决定投资房产',
    icon: '🏠',
    probability: 0.01,
    conditions: { minAge: 25, minWealth: 40 },
    choices: [
      { text: '购买出租', effect: { wealth: 15, happiness: 5 }, followUp: '你成了房东,定期有租金收入' },
      { text: '等待升值', effect: { wealth: 20 }, followUp: '你等待合适的出手时机' }
    ]
  },
  
  // ════════════════════════════════════════════════════════════
  // 创作/艺术事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'art_exhibition',
    text: '你的作品办展览了!',
    icon: '🎨',
    probability: 0.002,
    conditions: { minAge: 22, creativity: 40 },
    effect: { reputation: 15, creativity: 8, happiness: 15 },
    followUp: '艺术得到了人们的认可!'
  },
  {
    id: 'music_composition',
    text: '你创作了一首满意的音乐',
    icon: '🎵',
    probability: 0.003,
    conditions: { minAge: 18, creativity: 30 },
    effect: { happiness: 12, creativity: 8, reputation: 5 },
    followUp: '音乐让你找到了表达自我的方式'
  },
  {
    id: 'film_festival',
    text: '你的作品入围了电影节!',
    icon: '🎬',
    probability: 0.001,
    conditions: { minAge: 25, creativity: 45 },
    effect: { reputation: 20, happiness: 20, wealth: 10 },
    followUp: '你的才华得到了业界的认可!'
  },
  
  // ════════════════════════════════════════════════════════════
  // 冒险/挑战事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'extreme_sports',
    text: '你尝试了极限运动',
    icon: '🎢',
    probability: 0.005,
    conditions: { minAge: 20, health: 35, happiness: 25 },
    effect: { happiness: 15, health: 5, courage: 8 },
    followUp: '这种刺激让你感受到了生命的狂热!'
  },
  {
    id: 'survival_adventure',
    text: '你参加了一次野外生存挑战',
    icon: '🏕️',
    probability: 0.003,
    conditions: { minAge: 20, health: 30 },
    effect: { health: 8, wisdom: 10, happiness: 12, courage: 8 },
    followUp: '这次经历让你的意志更加坚强!'
  },
  {
    id: 'mountain_climbing',
    text: '你成功登顶了一座高山',
    icon: '🏔️',
    probability: 0.002,
    conditions: { minAge: 22, health: 40 },
    effect: { health: 5, happiness: 20, wisdom: 8, courage: 10 },
    followUp: '站在山顶,你感受到了征服的喜悦!'
  },
  {
    id: 'adrenaline_rush',
    text: '你第一次尝试了跳伞',
    icon: '🪂',
    probability: 0.003,
    conditions: { minAge: 20, health: 35, courage: 20 },
    effect: { happiness: 25, courage: 10, health: 3 },
    followUp: '这种自由飞翔的感觉让你一生难忘!'
  },
  
  // ════════════════════════════════════════════════════════════
  // 人生晚年事件
  // ════════════════════════════════════════════════════════════
  {
    id: 'retirement_reflection',
    text: '退休后,你开始回顾自己的人生',
    icon: '📖',
    probability: 0.01,
    conditions: { minAge: 55 },
    effect: { happiness: 8, wisdom: 12 },
    followUp: '这一生,你经历了太多太多...'
  },
  {
    id: 'legacy_creation',
    text: '你决定留下自己的故事',
    icon: '📝',
    probability: 0.005,
    conditions: { minAge: 50 },
    effect: { happiness: 12, wisdom: 8, reputation: 8 },
    followUp: '你希望自己的故事能启发后人'
  },
  {
    id: 'mentor_others',
    text: '你开始指导年轻人',
    icon: '🌱',
    probability: 0.008,
    conditions: { minAge: 45, minCareer: 40 },
    effect: { happiness: 15, wisdom: 8, reputation: 5 },
    followUp: '看到年轻人成长,你感到无比欣慰'
  },
  {
    id: 'health_warning',
    text: '医生给了你健康的警告',
    icon: '⚠️',
    probability: 0.01,
    conditions: { minAge: 45 },
    choices: [
      { text: '彻底改变生活方式', effect: { health: 15, happiness: 8, wisdom: 10 }, followUp: '你开始注重健康,生活方式焕然一新' },
      { text: '只是注意一些', effect: { health: 5, happiness: -3 }, followUp: '你开始慢慢改变一些习惯' }
    ]
  },
  {
    id: 'lifetime_achievement',
    text: '你获得了人生终极大奖',
    icon: '🏅',
    probability: 0.001,
    conditions: { minAge: 50, minReputation: 60, minCareer: 50 },
    effect: { reputation: 25, happiness: 25, wisdom: 15 },
    followUp: '这是对你一生的最高认可!'
  },
  {
    id: 'passing_wisdom',
    text: '在生命的最后,你留下了宝贵的人生智慧',
    icon: '🕊️',
    probability: 0.001,
    conditions: { minAge: 60, wisdom: 60 },
    effect: { reputation: 20, happiness: 15, wisdom: 10 },
    followUp: '你的智慧将永远流传...'
  }
]

// ─── 根据条件筛选特殊事件 ────────────────────────────────────────────
export function getAvailableSpecialEvents(age, character, storyState) {
  const flags = (storyState && storyState.flags) || []
  
  return specialEvents.filter(function(event) {
    if (!event.conditions) return true
    
    const cond = event.conditions
    
    // 年龄条件
    if (cond.minAge !== undefined && age < cond.minAge) return false
    if (cond.maxAge !== undefined && age > cond.maxAge) return false
    
    // 属性条件
    if (cond.minWealth !== undefined && (character.wealth || 0) < cond.minWealth) return false
    if (cond.minIntelligence !== undefined && (character.intelligence || 0) < cond.minIntelligence) return false
    if (cond.minHappiness !== undefined && (character.happiness || 0) < cond.minHappiness) return false
    if (cond.minHealth !== undefined && (character.health || 0) < cond.minHealth) return false
    
    // 标记条件
    if (cond.flag && !flags.includes(cond.flag)) return false
    if (cond.notFlag && flags.includes(cond.notFlag)) return false
    
    return true
  })
}

// ─── 尝试触发特殊事件 ────────────────────────────────────────────
export function tryTriggerSpecialEvent(age, character, storyState) {
  const available = getAvailableSpecialEvents(age, character, storyState)
  
  for (const event of available) {
    const prob = event.probability || 0.01
    if (Math.random() < prob) {
      return event
    }
  }
  
  return null
}
