// ============================================================
// 人生模拟器 - 关系系统（深度版）
// 含：NPC性格系统、关系发展事件、家庭动态、社交网络
// ============================================================

// ─── 关系类型 ──────────────────────────────────────────────
export const relationshipTypes = {
  family: { name: '家人', icon: '👨‍👩‍👧‍👦', baseIntimacy: 60, decayRate: 0.5 },
  friend: { name: '朋友', icon: '🤝', baseIntimacy: 30, decayRate: 2 },
  crush: { name: '暗恋', icon: '💗', baseIntimacy: 20, decayRate: 3 },
  lover: { name: '恋人', icon: '💕', baseIntimacy: 50, decayRate: 1 },
  spouse: { name: '配偶', icon: '💍', baseIntimacy: 70, decayRate: 0.5 },
  colleague: { name: '同事', icon: '👔', baseIntimacy: 25, decayRate: 2 },
  rival: { name: '对手', icon: '⚔️', baseIntimacy: 10, decayRate: 1 },
  mentor: { name: '导师', icon: '🎓', baseIntimacy: 40, decayRate: 1 },
  student: { name: '学生', icon: '📝', baseIntimacy: 35, decayRate: 2 },
  neighbor: { name: '邻居', icon: '🏡', baseIntimacy: 20, decayRate: 3 }
}

// ─── NPC性格特质 ───────────────────────────────────────────
export const personalityTraits = [
  { id: 'warm', name: '温柔', icon: '🌸', effect: { happiness: 3, charm: 2 }, compatibleWith: ['brave', 'cheerful'] },
  { id: 'cheerful', name: '开朗', icon: '☀️', effect: { happiness: 5, social: 2 }, compatibleWith: ['warm', 'humorous'] },
  { id: 'introvert', name: '内向', icon: '🌙', effect: { wisdom: 2, intelligence: 2 }, compatibleWith: ['warm', 'serious'] },
  { id: 'humorous', name: '幽默', icon: '😄', effect: { happiness: 5, charm: 3 }, compatibleWith: ['cheerful', 'adventurous'] },
  { id: 'serious', name: '认真', icon: '📐', effect: { intelligence: 2, wisdom: 2 }, compatibleWith: ['introvert', 'practical'] },
  { id: 'romantic', name: '浪漫', icon: '🌹', effect: { happiness: 3, charm: 2 }, compatibleWith: ['warm', 'adventurous'] },
  { id: 'practical', name: '务实', icon: '🔨', effect: { wealth: 2, wisdom: 2 }, compatibleWith: ['serious', 'brave'] },
  { id: 'adventurous', name: '冒险', icon: '🏔️', effect: { creativity: 3, health: 2 }, compatibleWith: ['humorous', 'romantic'] },
  { id: 'brave', name: '勇敢', icon: '🦁', effect: { health: 2, wisdom: 2 }, compatibleWith: ['warm', 'practical'] },
  { id: 'cunning', name: '狡猾', icon: '🦊', effect: { intelligence: 3, wealth: 2 }, compatibleWith: ['practical', 'serious'] },
  { id: 'loyal', name: '忠诚', icon: '🐕', effect: { social: 3, happiness: 2 }, compatibleWith: ['warm', 'brave'] },
  { id: 'artistic', name: '文艺', icon: '🎭', effect: { creativity: 4, happiness: 1 }, compatibleWith: ['romantic', 'introvert'] }
]

// ─── 随机名字库（扩充版）──────────────────────────────────
export const randomNames = {
  male: [
    '小明', '志强', '建国', '伟华', '俊杰', '浩然', '子轩', '宇航', '天佑', '晨曦',
    '一鸣', '思远', '博文', '子墨', '凯文', '泽宇', '浩天', '文博', '嘉豪', '瑞霖',
    '明轩', '梓涵', '昊天', '逸飞', '文昊', '致远', '子安', '鹏程', '瑞阳', '铭泽',
    '德华', '国栋', '振宇', '启明', '承志', '世杰', '家明', '永康', '庆丰', '福来'
  ],
  female: [
    '小红', '美丽', '婷婷', '晓燕', '雨萱', '诗涵', '梦琪', '欣怡', '雅琴', '思琪',
    '可欣', '紫萱', '语嫣', '若曦', '梓萱', '芷若', '清雅', '妙可', '心怡', '嘉怡',
    '雨桐', '一诺', '梓晴', '悦然', '思颖', '灵犀', '语桐', '若兮', '安然', '锦书',
    '秀英', '春花', '淑芬', '玉兰', '桂花', '翠花', '凤英', '秀珍', '丽华', '美玲'
  ]
}

// ─── 关系发展事件 ──────────────────────────────────────────
export const relationshipEvents = {
  // ═══ 青春期 ═══
  teen: [
    {
      text: '你暗恋上了班里的同学{name}',
      type: 'crush', icon: '💗',
      effect: { happiness: 10, charm: 5 },
      createRelation: { type: 'crush', intimacy: 30 }
    },
    {
      text: '{name}向你表白了',
      type: 'confession', icon: '💌',
      choices: [
        { text: '接受', effect: { happiness: 20 }, relationChange: { type: 'lover', intimacy: 50 } },
        { text: '拒绝', effect: { happiness: -5, wisdom: 5 }, relationChange: null }
      ]
    },
    {
      text: '你和{name}因为误会吵架了',
      type: 'conflict', icon: '😤',
      effect: { happiness: -10 },
      relationChange: { intimacy: -20 },
      choices: [
        { text: '主动道歉', effect: { wisdom: 5, social: 5 }, relationChange: { intimacy: 10 } },
        { text: '等对方道歉', effect: { happiness: -5 }, relationChange: { intimacy: -5 } },
        { text: '拉黑对方', effect: { happiness: -3 }, removeRelation: true }
      ]
    },
    {
      text: '你和{name}成为了无话不谈的好朋友',
      type: 'best_friend', icon: '👯',
      effect: { happiness: 15, social: 10 },
      relationChange: { intimacy: 30 }
    },
    {
      text: '你被同学{name}欺负了',
      type: 'bullying', icon: '👊',
      effect: { happiness: -15, social: -5 },
      choices: [
        { text: '告诉老师', effect: { wisdom: 5, social: -3 } },
        { text: '打回去', effect: { health: -5, charm: 5 } },
        { text: '默默忍受', effect: { happiness: -10, wisdom: 3 } }
      ]
    },
    {
      text: '你和{name}一起偷偷溜出去看电影',
      type: 'adventure', icon: '🎬',
      effect: { happiness: 10, social: 5 },
      relationChange: { intimacy: 15 }
    }
  ],

  // ═══ 青年 ═══
  youth: [
    {
      text: '你在工作中遇到了{name}，一见钟情',
      type: 'meetLove', icon: '💘',
      effect: { happiness: 15, charm: 5 },
      createRelation: { type: 'lover', intimacy: 40 }
    },
    {
      text: '{name}向你求婚了',
      type: 'proposal', icon: '💍',
      choices: [
        { text: '答应', effect: { happiness: 30 }, relationChange: { type: 'spouse', intimacy: 80 } },
        { text: '拒绝', effect: { happiness: -10, wisdom: 5 }, relationChange: { intimacy: -30 } },
        { text: '需要时间考虑', effect: { wisdom: 5 }, relationChange: { intimacy: -10 } }
      ]
    },
    {
      text: '你和{name}举办了婚礼',
      type: 'wedding', icon: '💒',
      effect: { happiness: 25, wealth: -15 },
      relationChange: { type: 'spouse', intimacy: 90 }
    },
    {
      text: '你发现{name}对你不忠',
      type: 'betrayal', icon: '💔',
      choices: [
        { text: '原谅', effect: { happiness: -15, wisdom: 10 }, relationChange: { intimacy: -30 } },
        { text: '分手', effect: { happiness: -20 }, removeRelation: true },
        { text: '以牙还牙', effect: { happiness: -10, wisdom: -5, charm: -5 }, relationChange: { intimacy: -40 } }
      ]
    },
    {
      text: '你在聚会上认识了新朋友{name}',
      type: 'new_friend', icon: '🥂',
      effect: { happiness: 5, social: 5 },
      createRelation: { type: 'friend', intimacy: 25 }
    },
    {
      text: '你的同事{name}成为了你的贵人',
      type: 'mentor_meet', icon: '🌟',
      effect: { wealth: 10, wisdom: 5 },
      createRelation: { type: 'mentor', intimacy: 40 }
    },
    {
      text: '{name}向你借了一大笔钱',
      type: 'borrow', icon: '💰',
      choices: [
        { text: '借给对方', effect: { wealth: -15, social: 5 }, relationChange: { intimacy: 10 } },
        { text: '委婉拒绝', effect: { relationChange: { intimacy: -10 } } },
        { text: '借一小部分', effect: { wealth: -5, social: 3 }, relationChange: { intimacy: 5 } }
      ]
    },
    {
      text: '你和{name}合伙创业',
      type: 'partnership', icon: '🤝',
      effect: { wealth: 10, social: 5 },
      relationChange: { type: 'colleague', intimacy: 30 },
      choices: [
        { text: '全力以赴', effect: { wealth: 15, happiness: 5, health: -5 } },
        { text: '谨慎参与', effect: { wealth: 5, wisdom: 5 } }
      ]
    }
  ],

  // ═══ 中年 ═══
  middle: [
    {
      text: '你和{name}的感情越来越深',
      type: 'deepen', icon: '❤️',
      effect: { happiness: 10 },
      relationChange: { intimacy: 15 }
    },
    {
      text: '你和{name}因为孩子教育问题产生分歧',
      type: 'parenting', icon: '📚',
      effect: { happiness: -5 },
      relationChange: { intimacy: -10 },
      choices: [
        { text: '坚持己见', effect: { happiness: -3 }, relationChange: { intimacy: -5 } },
        { text: '妥协让步', effect: { wisdom: 5 }, relationChange: { intimacy: 5 } },
        { text: '一起商量', effect: { wisdom: 8, happiness: 3 }, relationChange: { intimacy: 8 } }
      ]
    },
    {
      text: '你和{name}一起度过了难忘的旅行',
      type: 'travel', icon: '✈️',
      effect: { happiness: 15, wealth: -10 },
      relationChange: { intimacy: 20 }
    },
    {
      text: '你发现老朋友{name}过得不太好',
      type: 'old_friend_trouble', icon: '😟',
      choices: [
        { text: '伸出援手', effect: { wealth: -5, happiness: 5, wisdom: 5, social: 10 }, relationChange: { intimacy: 15 } },
        { text: '默默关注', effect: { happiness: -3 } }
      ]
    },
    {
      text: '你的孩子长大了，关系变得疏远',
      type: 'child_distancing', icon: '🚪',
      effect: { happiness: -10, wisdom: 5 },
      choices: [
        { text: '尊重孩子的空间', effect: { wisdom: 10, happiness: -3 } },
        { text: '努力拉近距离', effect: { happiness: 3, social: 5 } }
      ]
    },
    {
      text: '你遇到了中年危机，和{name}倾诉',
      type: 'midlife_confide', icon: '🆘',
      effect: { happiness: -5 },
      relationChange: { intimacy: 10 },
      choices: [
        { text: '寻求专业帮助', effect: { wisdom: 10, happiness: 5, wealth: -5 } },
        { text: '自我消化', effect: { wisdom: 5, happiness: -5 } }
      ]
    },
    {
      text: '你和邻居{name}因为琐事发生了争执',
      type: 'neighbor_dispute', icon: '😡',
      effect: { happiness: -8 },
      choices: [
        { text: '主动和解', effect: { wisdom: 5, social: 5 } },
        { text: '老死不相往来', effect: { happiness: -3, social: -5 } }
      ]
    }
  ],

  // ═══ 老年 ═══
  elder: [
    {
      text: '你和{name}相伴走过了大半辈子',
      type: 'companion', icon: '💑',
      effect: { happiness: 20, wisdom: 10 },
      relationChange: { intimacy: 10 }
    },
    {
      text: '{name}先你一步离开了人世',
      type: 'loss', icon: '🕯️',
      effect: { happiness: -30, health: -10, wisdom: 15 },
      removeRelation: true
    },
    {
      text: '你的孙子/孙女出生了',
      type: 'grandchild', icon: '👶',
      effect: { happiness: 20, wisdom: 5 },
      choices: [
        { text: '帮忙带孙子', effect: { happiness: 10, health: -5, social: 5 } },
        { text: '让孩子自己带', effect: { wisdom: 5 } }
      ]
    },
    {
      text: '你和老朋友{name}久别重逢',
      type: 'reunion', icon: '🥳',
      effect: { happiness: 15, wisdom: 5 },
      relationChange: { intimacy: 20 }
    },
    {
      text: '你感到越来越孤独',
      type: 'loneliness', icon: '🥺',
      effect: { happiness: -10, health: -5 },
      choices: [
        { text: '主动联系老朋友', effect: { happiness: 10, social: 5 } },
        { text: '参加社区活动', effect: { happiness: 8, social: 8, health: 3 } },
        { text: '养一只宠物', effect: { happiness: 12, health: 3 } }
      ]
    }
  ]
}

// ─── 家庭动态事件 ──────────────────────────────────────────
export const familyEvents = [
  // 父母
  { text: '你的父亲/母亲生病住院了', type: 'parent_ill', icon: '🏥', effect: { happiness: -15, wealth: -10 }, ageRange: [30, 60], choices: [
    { text: '请假照顾', effect: { happiness: -5, wisdom: 10, social: 5, wealth: -5 } },
    { text: '请护工照顾', effect: { wealth: -15, happiness: -3 } },
    { text: '兄弟姐妹轮流照顾', effect: { social: 5, happiness: -3 } }
  ]},
  { text: '你的父亲/母亲去世了', type: 'parent_death', icon: '🕊️', effect: { happiness: -30, wisdom: 15 }, ageRange: [35, 70] },
  { text: '你和父母因为观念不同发生了争执', type: 'generation_gap', icon: '😤', effect: { happiness: -8 }, ageRange: [15, 30], choices: [
    { text: '坚持自己的想法', effect: { happiness: -5, wisdom: 5 } },
    { text: '听父母的话', effect: { happiness: -3, social: 5 } },
    { text: '尝试沟通理解', effect: { wisdom: 10, happiness: 3 } }
  ]},

  // ═══ 婚姻系统（增强版）═════════════════════════════════════
  // 求婚与婚礼
  { text: '你的恋人含情脉脉地看着你，似乎在等待什么...', type: 'proposal_waiting', icon: '💍', ageRange: [22, 45], choices: [
    { text: '单膝跪地求婚', effect: { happiness: 30, wisdom: 5, wealth: -20 }, relationChange: { type: 'spouse', intimacy: 50 }, trigger: 'proposal' },
    { text: '还没准备好，再等等', effect: { happiness: -5, wisdom: 3 } }
  ]},
  { text: '你们订婚了！开始筹备婚礼吧', type: 'engagement', icon: '💎', effect: { happiness: 25, social: 10, wealth: -15 }, relationChange: { type: 'spouse', intimacy: 30 } },
  { text: '婚礼当天，你穿着婚纱/西装，看着心爱的人向你走来', type: 'wedding_day', icon: '💒', effect: { happiness: 35, social: 15, wealth: -30 }, ageRange: [24, 45] },
  { text: '你们决定旅行结婚，去向往已久的地方度蜜月', type: 'honeymoon', icon: '✈️', effect: { happiness: 25, health: 5, wealth: -15 }, ageRange: [24, 45] },
  
  // 婚后生活
  { text: '配偶提醒你今天是结婚纪念日', type: 'anniversary_reminder', icon: '💕', effect: {}, ageRange: [25, 65], choices: [
    { text: '精心准备礼物', effect: { happiness: 15, wealth: -8 } },
    { text: '简单吃顿饭', effect: { happiness: 5 } },
    { text: '太忙了忘了', effect: { happiness: -10, wisdom: -3 } }
  ]},
  { text: '你和配偶因为家务分工问题发生了争执', type: 'marriage_conflict_housework', icon: '😤', effect: { happiness: -10 }, ageRange: [25, 50], choices: [
    { text: '主动道歉，商量分担', effect: { wisdom: 5, happiness: 5 } },
    { text: '坚持自己的立场', effect: { happiness: -5 } },
    { text: '冷战几天再说', effect: { happiness: -8 } }
  ]},
  { text: '你和配偶因为财务问题产生了分歧', type: 'marriage_conflict_money', icon: '💰', effect: { happiness: -15, wisdom: 3 }, ageRange: [25, 55], choices: [
    { text: '制定家庭财务计划', effect: { wisdom: 10, wealth: 5, happiness: 3 } },
    { text: '各管各的钱', effect: { happiness: -5 } },
    { text: '一方做出让步', effect: { happiness: 3, wisdom: 3 } }
  ]},
  { text: '配偶最近工作压力很大，需要你的支持', type: 'spouse_work_stress', icon: '😔', effect: { happiness: -5 }, ageRange: [25, 55], choices: [
    { text: '耐心倾听并安慰', effect: { happiness: 8, wisdom: 3, social: 3 } },
    { text: '帮他/她分析问题', effect: { wisdom: 8, happiness: 3 } },
    { text: '建议出去放松一下', effect: { wealth: -5, happiness: 5, health: 3 } }
  ]},
  { text: '配偶升职了！你们决定庆祝一下', type: 'spouse_promotion', icon: '🎉', effect: { happiness: 20, wealth: 15, social: 5 }, ageRange: [25, 55] },
  { text: '配偶生病了，需要你悉心照顾', type: 'spouse_illness', icon: '🤒', effect: { happiness: -10, wealth: -5 }, ageRange: [25, 65], choices: [
    { text: '放下工作专心照顾', effect: { happiness: 8, wisdom: 3, career: -5 } },
    { text: '请护工帮忙', effect: { wealth: -15, happiness: -3 } },
    { text: '平衡工作和照顾', effect: { happiness: -5, career: -3 } }
  ]},
  { text: '配偶生日到了，你想怎么庆祝？', type: 'spouse_birthday', icon: '🎂', effect: { happiness: 5 }, ageRange: [25, 65], choices: [
    { text: '举办惊喜派对', effect: { happiness: 15, social: 8, wealth: -10 } },
    { text: '送份大礼', effect: { happiness: 10, wealth: -8 } },
    { text: '温馨的二人世界', effect: { happiness: 8 } }
  ]},
  { text: '你们的孩子出生了！', type: 'child_born', icon: '👶', effect: { happiness: 30, wealth: -15, social: 8 }, ageRange: [24, 42] },
  { text: '配偶怀孕了！这是你们爱情的结晶', type: 'pregnancy_announcement', icon: '🤰', effect: { happiness: 25, wealth: -5, wisdom: 3 }, ageRange: [22, 40], condition: (c) => !c._hasChild },
  { text: '配偶提议再生一个孩子', type: 'second_child_discussion', icon: '👨‍👩‍👧‍👦', effect: {}, ageRange: [28, 42], choices: [
    { text: '好呀，孩子们有个伴', effect: { happiness: 20, wealth: -15 } },
    { text: '养一个就够了', effect: { happiness: -3, wisdom: 3 } },
    { text: '经济压力大，再等等', effect: { wealth: 5, happiness: -3 } }
  ]},
  { text: '配偶提出想要领养一个孩子', type: 'adoption_discussion', icon: '🏠', effect: {}, ageRange: [28, 45], choices: [
    { text: '同意领养', effect: { happiness: 20, social: 10, wealth: -10 } },
    { text: '还是想要亲生的', effect: { happiness: -5 } },
    { text: '需要时间考虑', effect: {} }
  ]},
  { text: '你们的婚姻走到了尽头...', type: 'divorce', icon: '📜', effect: { happiness: -25, wealth: -20, social: -10 }, ageRange: [28, 55], condition: (c) => c._hasSpouse },
  { text: '你的配偶去世了，你感到无比悲痛', type: 'spouse_death', icon: '🕯️', effect: { happiness: -40, wisdom: 10 }, ageRange: [35, 75] },
  
  // ═══ 子女成长系统（增强版）═════════════════════════════════
  { text: '孩子第一次叫了"爸爸/妈妈"，你激动得热泪盈眶', type: 'child_first_word', icon: '🗣️', effect: { happiness: 20, wisdom: 3 }, ageRange: [24, 32] },
  { text: '孩子迈出了人生第一步！', type: 'child_first_steps', icon: '👶', effect: { happiness: 18, health: 3 }, ageRange: [24, 30] },
  { text: '孩子开始上幼儿园了，你既欣慰又不舍', type: 'child_kindergarten', icon: '🏫', effect: { happiness: 10, social: 5, wealth: -3 }, ageRange: [25, 33] },
  { text: '孩子的家长会，老师表扬了孩子的表现', type: 'child_praised', icon: '🌟', effect: { happiness: 15, wisdom: 3 }, ageRange: [26, 40] },
  { text: '孩子考试得了满分，你为孩子感到骄傲', type: 'child_excellent_grades', icon: '💯', effect: { happiness: 15, education: 3, wealth: -5 }, ageRange: [27, 38], choices: [
    { text: '带孩子吃大餐庆祝', effect: { happiness: 10, wealth: -5 } },
    { text: '买礼物作为奖励', effect: { happiness: 8, wealth: -8 } },
    { text: '告诫不要骄傲', effect: { wisdom: 5, happiness: 3 } }
  ]},
  { text: '孩子沉迷于电子游戏，你很担心', type: 'child_game_addiction', icon: '🎮', effect: { happiness: -8, health: -5 }, ageRange: [28, 40], choices: [
    { text: '严格限制游戏时间', effect: { wisdom: 5, happiness: -3 } },
    { text: '陪伴孩子一起玩', effect: { happiness: 5, social: 5, health: -3 } },
    { text: '报更多兴趣班转移注意力', effect: { wealth: -8, happiness: -5 } }
  ]},
  { text: '孩子在学校被欺负了，你心如刀绞', type: 'child_bullied', icon: '😢', effect: { happiness: -15 }, ageRange: [27, 42], choices: [
    { text: '找学校和对方家长理论', effect: { social: 8, happiness: 5 } },
    { text: '教孩子如何自我保护', effect: { wisdom: 10, happiness: 3 } },
    { text: '考虑给孩子转学', effect: { wealth: -10, happiness: 5 } }
  ]},
  { text: '孩子参加了学校的文艺演出，表演得很精彩', type: 'child_performance', icon: '🎭', effect: { happiness: 15, creativity: 3, social: 5 }, ageRange: [27, 38] },
  { text: '孩子的生日快到了，你想怎么安排？', type: 'child_birthday', icon: '🎈', effect: { happiness: 5, wealth: -3 }, ageRange: [24, 42], choices: [
    { text: '举办生日派对', effect: { happiness: 15, social: 8, wealth: -10 } },
    { text: '邀请小朋友来家玩', effect: { happiness: 10, social: 5, wealth: -5 } },
    { text: '买礼物+吃蛋糕', effect: { happiness: 8, wealth: -3 } }
  ]},
  { text: '孩子面临升学考试，压力很大', type: 'child_exam_stress', icon: '📚', effect: { happiness: -8 }, ageRange: [32, 45], choices: [
    { text: '请家教辅导', effect: { wealth: -15, happiness: 5 } },
    { text: '自己陪伴学习', effect: { career: -5, happiness: 8, wisdom: 5 } },
    { text: '让孩子自己努力', effect: { wisdom: 3, happiness: -3 } }
  ]},
  { text: '孩子考上了重点高中！', type: 'child_highschool', icon: '🎓', effect: { happiness: 20, education: 5, wealth: -8 }, ageRange: [35, 48] },
  { text: '孩子考上了理想的大学！', type: 'child_college', icon: '🎓', effect: { happiness: 25, education: 8, wealth: -20 }, ageRange: [38, 52] },
  { text: '孩子大学毕业了，即将踏入社会', type: 'child_graduation', icon: '🎓', effect: { happiness: 20, wisdom: 5, social: 5 }, ageRange: [40, 55] },
  { text: '孩子找到了第一份工作！', type: 'child_first_job', icon: '💼', effect: { happiness: 18, career: 5, social: 3 }, ageRange: [40, 55] },
  { text: '孩子谈恋爱了，带回来见家长', type: 'child_dating', icon: '💑', effect: { happiness: 10, social: 8 }, ageRange: [40, 55], choices: [
    { text: '热情欢迎', effect: { happiness: 10, social: 5 } },
    { text: '仔细考察对方', effect: { wisdom: 5, happiness: -3 } },
    { text: '表达担忧', effect: { happiness: -5, wisdom: 3 } }
  ]},
  { text: '孩子结婚了！看着孩子穿上婚纱/西装，你感慨万千', type: 'child_wedding', icon: '💒', effect: { happiness: 20, wisdom: 10, wealth: -25, social: 10 }, ageRange: [42, 60] },
  { text: '你升级当爷爷奶奶/外公外婆了！', type: 'grandchild_born', icon: '👶', effect: { happiness: 25, wisdom: 8, social: 5 }, ageRange: [42, 62] },
  { text: '孙辈来到家里做客，屋里充满了欢声笑语', type: 'grandchildren_visit', icon: '👨‍👩‍👧', effect: { happiness: 18, wisdom: 5, health: 3 }, ageRange: [45, 70] },
  { text: '子女之间因为照顾父母的问题产生了矛盾', type: 'sibling_care_conflict', icon: '⚔️', effect: { happiness: -15, wisdom: 3 }, ageRange: [50, 70], choices: [
    { text: '公正调解', effect: { wisdom: 10, happiness: 5 } },
    { text: '住进养老院减轻子女负担', effect: { wealth: -15, happiness: -5, social: -5 } },
    { text: '不干涉，让他们自己解决', effect: { happiness: -8 } }
  ]},
  { text: '你生病住院，子女们轮流来照顾你', type: 'children_care_elderly', icon: '🏥', effect: { happiness: 15, health: 5, wealth: -10 }, ageRange: [55, 75] },
  
  // 兄弟姐妹
  { text: '兄弟姐妹组织了一次家庭聚会', type: 'family_reunion', icon: '👨‍👩‍👧‍👦', effect: { happiness: 15, social: 10, wealth: -3 }, ageRange: [25, 65] },
  { text: '兄弟姐妹需要你帮忙', type: 'sibling_help', icon: '🤝', effect: {}, ageRange: [22, 60], choices: [
    { text: '全力以赴帮忙', effect: { wealth: -12, social: 12, happiness: 8 } },
    { text: '量力而行', effect: { wealth: -3, social: 5, wisdom: 3 } },
    { text: '婉拒', effect: { social: -8, happiness: -5 } }
  ]},
  { text: '你和兄弟姐妹因为家产问题发生纠纷', type: 'inheritance_dispute', icon: '⚖️', effect: { happiness: -18, social: -12 }, ageRange: [35, 70], choices: [
    { text: '据理力争', effect: { wealth: 10, social: -15, happiness: -8 } },
    { text: '主动退让', effect: { wealth: -8, wisdom: 12, social: 5 } },
    { text: '走法律途径', effect: { wealth: -12, social: -8, wisdom: 3 } }
  ]},
  { text: '你最亲密的兄弟姐妹去世了', type: 'sibling_death', icon: '🕯️', effect: { happiness: -25, wisdom: 8 }, ageRange: [40, 75] },

  // 兄弟姐妹
  { text: '你的兄弟姐妹需要你帮忙', type: 'sibling_help', icon: '🤲', effect: {}, ageRange: [20, 60], choices: [
    { text: '全力以赴帮忙', effect: { wealth: -10, social: 10, happiness: 5 } },
    { text: '量力而行', effect: { wealth: -3, social: 5, wisdom: 3 } },
    { text: '婉拒', effect: { social: -5, happiness: -3 } }
  ]},
  { text: '你和兄弟姐妹因为家产问题发生纠纷', type: 'inheritance_dispute', icon: '⚖️', effect: { happiness: -15, social: -10 }, ageRange: [35, 70], choices: [
    { text: '据理力争', effect: { wealth: 10, social: -15, happiness: -5 } },
    { text: '主动退让', effect: { wealth: -5, wisdom: 10, social: 5 } },
    { text: '走法律途径', effect: { wealth: -10, social: -5 } }
  ]}
]

// ─── NPC生成器（深度版）─────────────────────────────────────

/**
 * 生成随机NPC
 */
export function generateNPC(gender, ageRange, relationshipType) {
  const names = randomNames[gender || (Math.random() > 0.5 ? 'male' : 'female')]
  const name = names[Math.floor(Math.random() * names.length)]
  const age = ageRange[0] + Math.floor(Math.random() * (ageRange[1] - ageRange[0]))
  const personality = generatePersonality()
  const relType = relationshipTypes[relationshipType] || relationshipTypes.friend
  
  return {
    id: 'npc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    name,
    gender: gender || (Math.random() > 0.5 ? 'male' : 'female'),
    age,
    personality,
    appearance: Math.floor(Math.random() * 100),
    type: relationshipType || 'friend',
    intimacy: relType.baseIntimacy,
    traits: personality.map(p => p.id),
    memory: [], // 与该NPC的互动记忆
    metAge: age
  }
}

/**
 * 生成NPC性格
 */
function generatePersonality() {
  const shuffled = personalityTraits.slice().sort(function() { return Math.random() - 0.5 })
  const count = 2 + Math.floor(Math.random() * 2) // 2-3个性格特质
  return shuffled.slice(0, count)
}

/**
 * 检查性格兼容性
 */
export function checkCompatibility(npc1Personality, npc2Personality) {
  let score = 50
  const ids1 = npc1Personality.map(p => p.id)
  const ids2 = npc2Personality.map(p => p.id)
  
  for (const trait of npc1Personality) {
    for (const compatible of (trait.compatibleWith || [])) {
      if (ids2.indexOf(compatible) !== -1) score += 15
    }
  }
  
  return Math.min(100, Math.max(0, score))
}

/**
 * 获取关系等级名称
 */
export function getRelationLevelName(intimacy) {
  if (intimacy >= 90) return '至亲至爱'
  if (intimacy >= 75) return '亲密无间'
  if (intimacy >= 60) return '关系很好'
  if (intimacy >= 40) return '友好相处'
  if (intimacy >= 20) return '泛泛之交'
  if (intimacy >= 0) return '点头之交'
  return '形同陌路'
}

/**
 * 获取关系等级图标
 */
export function getRelationLevelIcon(intimacy) {
  if (intimacy >= 90) return '❤️‍🔥'
  if (intimacy >= 75) return '❤️'
  if (intimacy >= 60) return '💛'
  if (intimacy >= 40) return '💚'
  if (intimacy >= 20) return '💙'
  return '🩶'
}

/**
 * 更新关系亲密度
 */
export function updateIntimacy(relationship, change) {
  if (!relationship) return relationship
  const updated = Object.assign({}, relationship)
  updated.intimacy = Math.max(0, Math.min(100, (updated.intimacy || 50) + change))
  return updated
}

/**
 * 关系自然衰减
 */
export function decayRelationships(relationships) {
  if (!relationships || relationships.length === 0) return relationships
  
  return relationships.map(function(rel) {
    const relType = relationshipTypes[rel.type]
    if (!relType) return rel
    
    const updated = Object.assign({}, rel)
    // 配偶和家人不衰减
    if (rel.type === 'spouse' || rel.type === 'family') return updated
    
    updated.intimacy = Math.max(0, (updated.intimacy || 50) - relType.decayRate)
    // 亲密度低于5则自然断联
    if (updated.intimacy < 5) return null
    
    return updated
  }).filter(Boolean)
}
