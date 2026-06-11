// ============================================================
// 人生模拟器 - 职业系统（深度版）
// 含：职业发展路径、晋升阶梯、职业事件链、行业景气度
// ============================================================

// ─── 行业景气度（影响收入和事件概率）─────────────────────────
export const industryTrends = {
  tech: { name: '科技', baseSalary: 1.3, volatility: 0.4, growthRate: 0.08 },
  finance: { name: '金融', baseSalary: 1.4, volatility: 0.5, growthRate: 0.05 },
  education: { name: '教育', baseSalary: 0.9, volatility: 0.1, growthRate: 0.03 },
  medical: { name: '医疗', baseSalary: 1.2, volatility: 0.15, growthRate: 0.06 },
  creative: { name: '文创', baseSalary: 0.8, volatility: 0.5, growthRate: 0.04 },
  service: { name: '服务', baseSalary: 0.7, volatility: 0.2, growthRate: 0.02 },
  government: { name: '政府', baseSalary: 1.0, volatility: 0.05, growthRate: 0.03 },
  manufacturing: { name: '制造', baseSalary: 0.85, volatility: 0.3, growthRate: 0.02 },
  agriculture: { name: '农业', baseSalary: 0.6, volatility: 0.4, growthRate: 0.01 }
}

// ─── 职业列表 ──────────────────────────────────────────────
export const careers = [
  // ═══ 医疗 ═══
  {
    id: 'doctor',
    name: '医生',
    icon: '👨‍⚕️',
    industry: 'medical',
    requirements: { education: 80, intelligence: 70 },
    salary: { base: 15, growth: 2 },
    happiness: 60,
    stress: 80,
    promotionPath: ['住院医师', '主治医师', '副主任医师', '主任医师'],
    retirementAge: 65,
    events: [
      { text: '你成功完成了一台复杂手术', effect: { happiness: 15, wisdom: 5 }, minYears: 3 },
      { text: '你因为医疗事故被投诉', effect: { happiness: -20, wealth: -10 }, chance: 0.05 },
      { text: '你晋升为主任医师', effect: { wealth: 20, happiness: 15 }, minYears: 15, requireRank: 2 },
      { text: '你参与了一项医学研究，取得了突破', effect: { intelligence: 10, wisdom: 10, wealth: 15 }, minYears: 5 },
      { text: '你值夜班累倒了', effect: { health: -10, happiness: -10 }, chance: 0.1 },
      { text: '患者家属送来锦旗，你深受感动', effect: { happiness: 20, charm: 5 }, chance: 0.08 },
      { text: '你被派往偏远山区义诊', effect: { wisdom: 15, happiness: 10, social: 10 }, minYears: 2, chance: 0.06 }
    ]
  },
  {
    id: 'nurse',
    name: '护士',
    icon: '👩‍⚕️',
    industry: 'medical',
    requirements: { education: 50, intelligence: 40 },
    salary: { base: 8, growth: 1 },
    happiness: 55,
    stress: 75,
    promotionPath: ['护士', '护师', '主管护师', '副主任护师'],
    retirementAge: 55,
    events: [
      { text: '你悉心照料的患者康复出院', effect: { happiness: 15, wisdom: 5 } },
      { text: '你被患者家属误解，受了委屈', effect: { happiness: -15, stress: 10 }, chance: 0.1 },
      { text: '你获得了优秀护士称号', effect: { happiness: 15, social: 5, wealth: 5 }, minYears: 5 },
      { text: '你因为连轴转累倒了', effect: { health: -15, happiness: -10 }, chance: 0.12 }
    ]
  },
  {
    id: 'pharmacist',
    name: '药剂师',
    icon: '💊',
    industry: 'medical',
    requirements: { education: 65, intelligence: 55 },
    salary: { base: 12, growth: 1.5 },
    happiness: 65,
    stress: 45,
    promotionPath: ['药剂师', '主管药剂师', '药剂科主任'],
    retirementAge: 60,
    events: [
      { text: '你发现了一个药物配伍禁忌，避免了一场事故', effect: { wisdom: 15, happiness: 10, intelligence: 5 } },
      { text: '你开了一家自己的药店', effect: { wealth: 25, happiness: 10 }, minYears: 8, requireRank: 1 }
    ]
  },

  // ═══ 教育 ═══
  {
    id: 'teacher',
    name: '教师',
    icon: '👨‍🏫',
    industry: 'education',
    requirements: { education: 60, intelligence: 50 },
    salary: { base: 8, growth: 1 },
    happiness: 70,
    stress: 50,
    promotionPath: ['教师', '骨干教师', '学科带头人', '特级教师'],
    retirementAge: 60,
    events: [
      { text: '你的学生考上了名校，特意来感谢你', effect: { happiness: 20, wisdom: 10 } },
      { text: '你被评为优秀教师', effect: { happiness: 15, social: 10 } },
      { text: '你和学生家长发生冲突', effect: { happiness: -10 } },
      { text: '你编写了一本教辅，大受欢迎', effect: { wealth: 20, intelligence: 5 }, minYears: 5 },
      { text: '你带的班级获得了全市第一名', effect: { happiness: 25, social: 15 }, minYears: 3 },
      { text: '你在课堂上被学生气哭了', effect: { happiness: -15, health: -5 }, chance: 0.08 }
    ]
  },
  {
    id: 'professor',
    name: '大学教授',
    icon: '🎓',
    industry: 'education',
    requirements: { education: 90, intelligence: 80 },
    salary: { base: 18, growth: 2 },
    happiness: 75,
    stress: 55,
    promotionPath: ['讲师', '副教授', '教授', '院士'],
    retirementAge: 65,
    events: [
      { text: '你的论文发表在顶级期刊', effect: { intelligence: 15, happiness: 15, social: 10 }, minYears: 3 },
      { text: '你获得了国家科研基金', effect: { wealth: 20, intelligence: 5 }, minYears: 5 },
      { text: '你的学生抄袭被发现，你受到牵连', effect: { happiness: -15, social: -10 }, chance: 0.03 },
      { text: '你当选为院士', effect: { happiness: 30, social: 20, wealth: 15 }, minYears: 20, requireRank: 2, chance: 0.05 }
    ]
  },

  // ═══ 科技 ═══
  {
    id: 'programmer',
    name: '程序员',
    icon: '👨‍💻',
    industry: 'tech',
    requirements: { education: 60, intelligence: 70 },
    salary: { base: 20, growth: 3 },
    happiness: 50,
    stress: 70,
    promotionPath: ['初级开发', '高级开发', '技术经理', '技术总监', 'CTO'],
    retirementAge: 45,
    events: [
      { text: '你开发的产品大获成功', effect: { wealth: 30, happiness: 20 } },
      { text: '你因为996加班身体出了问题', effect: { health: -15, wealth: 10 } },
      { text: '你跳槽到大厂，薪资翻倍', effect: { wealth: 25, happiness: 10 }, minYears: 2 },
      { text: '你的代码造成了一次线上事故', effect: { happiness: -15, stress: 10 }, chance: 0.08 },
      { text: '你开源的项目获得了数千Star', effect: { social: 15, happiness: 10, intelligence: 5 }, minYears: 3, chance: 0.05 },
      { text: '公司裁员，你被优化了', effect: { happiness: -25, wealth: -15 }, chance: 0.06 },
      { text: '你带团队攻克了技术难题', effect: { intelligence: 10, wisdom: 5, social: 10 }, minYears: 4 },
      { text: '你35岁遭遇职场危机', effect: { happiness: -20, stress: 15 }, minYears: 10, chance: 0.15 }
    ]
  },
  {
    id: 'product_manager',
    name: '产品经理',
    icon: '📊',
    industry: 'tech',
    requirements: { education: 55, intelligence: 55, charm: 60 },
    salary: { base: 18, growth: 2.5 },
    happiness: 55,
    stress: 65,
    promotionPath: ['产品助理', '产品经理', '高级产品经理', '产品总监'],
    retirementAge: 45,
    events: [
      { text: '你策划的产品用户突破百万', effect: { wealth: 25, happiness: 20 } },
      { text: '你和开发团队吵了一架', effect: { happiness: -10, social: -5 }, chance: 0.15 },
      { text: '老板否定了你的产品方案', effect: { happiness: -15, stress: 10 }, chance: 0.12 }
    ]
  },
  {
    id: 'ai_engineer',
    name: 'AI工程师',
    icon: '🤖',
    industry: 'tech',
    requirements: { education: 75, intelligence: 80 },
    salary: { base: 25, growth: 4 },
    happiness: 60,
    stress: 65,
    promotionPath: ['AI工程师', '高级AI工程师', 'AI架构师', '首席科学家'],
    retirementAge: 50,
    events: [
      { text: '你训练的模型在比赛中夺冠', effect: { intelligence: 15, happiness: 20, social: 10 } },
      { text: '你的AI项目获得了巨额融资', effect: { wealth: 40, happiness: 15 }, minYears: 3, chance: 0.08 },
      { text: '你被猎头高薪挖走', effect: { wealth: 30, happiness: 10 }, minYears: 2 }
    ]
  },
  {
    id: 'cybersecurity',
    name: '网络安全专家',
    icon: '🔒',
    industry: 'tech',
    requirements: { education: 65, intelligence: 75 },
    salary: { base: 22, growth: 3 },
    happiness: 55,
    stress: 60,
    promotionPath: ['安全工程师', '高级安全工程师', '安全总监', 'CSO'],
    retirementAge: 50,
    events: [
      { text: '你成功阻止了一次重大网络攻击', effect: { happiness: 20, wealth: 15, social: 10 }, minYears: 3 },
      { text: '你发现了某大厂的零日漏洞', effect: { intelligence: 15, wealth: 20 }, chance: 0.05 }
    ]
  },

  // ═══ 金融 ═══
  {
    id: 'banker',
    name: '银行职员',
    icon: '🏦',
    industry: 'finance',
    requirements: { education: 55, intelligence: 50 },
    salary: { base: 12, growth: 1.5 },
    happiness: 55,
    stress: 55,
    promotionPath: ['柜员', '客户经理', '支行副行长', '支行行长'],
    retirementAge: 55,
    events: [
      { text: '你成功拉来了一个大客户', effect: { wealth: 15, social: 10 }, minYears: 2 },
      { text: '你被客户投诉了', effect: { happiness: -10, stress: 5 }, chance: 0.1 },
      { text: '你晋升为支行行长', effect: { wealth: 25, happiness: 15, social: 10 }, minYears: 10, requireRank: 2 }
    ]
  },
  {
    id: 'investment_analyst',
    name: '投资分析师',
    icon: '📈',
    industry: 'finance',
    requirements: { education: 75, intelligence: 70 },
    salary: { base: 25, growth: 5 },
    happiness: 50,
    stress: 80,
    promotionPath: ['分析师', '高级分析师', '投资经理', '合伙人'],
    retirementAge: 50,
    events: [
      { text: '你的投资建议让客户大赚', effect: { wealth: 30, happiness: 15, social: 10 } },
      { text: '你的判断失误，客户亏了一大笔', effect: { happiness: -25, social: -15, stress: 15 }, chance: 0.1 },
      { text: '你被提拔为基金经理', effect: { wealth: 35, happiness: 10 }, minYears: 5 }
    ]
  },
  {
    id: 'accountant',
    name: '会计',
    icon: '🧮',
    industry: 'finance',
    requirements: { education: 55, intelligence: 50 },
    salary: { base: 10, growth: 1 },
    happiness: 55,
    stress: 50,
    promotionPath: ['会计', '主管会计', '财务经理', 'CFO'],
    retirementAge: 55,
    events: [
      { text: '你考过了CPA', effect: { intelligence: 10, wealth: 10, happiness: 10 }, minYears: 2, chance: 0.15 },
      { text: '你发现了公司的财务漏洞', effect: { wisdom: 15, happiness: 5 }, minYears: 3, chance: 0.08 }
    ]
  },

  // ═══ 创业/商业 ═══
  {
    id: 'entrepreneur',
    name: '创业者',
    icon: '💼',
    industry: 'tech',
    requirements: { education: 50, intelligence: 60, charm: 60 },
    salary: { base: 5, growth: 10 },
    happiness: 40,
    stress: 90,
    promotionPath: ['个体户', '小公司老板', '企业主', '集团董事长'],
    retirementAge: 70,
    events: [
      { text: '你的公司获得了融资', effect: { wealth: 50, happiness: 30 } },
      { text: '你的公司倒闭了', effect: { wealth: -40, happiness: -30, wisdom: 20 }, chance: 0.15 },
      { text: '你的公司成功上市', effect: { wealth: 80, happiness: 40 }, minYears: 5, chance: 0.03 },
      { text: '合伙人卷款跑路了', effect: { wealth: -30, happiness: -25, social: -20 }, chance: 0.04 },
      { text: '你的公司被巨头收购', effect: { wealth: 60, happiness: 20 }, minYears: 3, chance: 0.05 },
      { text: '你在行业峰会上发表演讲', effect: { social: 15, charm: 10, happiness: 10 }, minYears: 4 }
    ]
  },
  {
    id: 'shop_owner',
    name: '小店老板',
    icon: '🏪',
    industry: 'service',
    requirements: { education: 30, charm: 40 },
    salary: { base: 7, growth: 1 },
    happiness: 65,
    stress: 50,
    promotionPath: ['摊贩', '小店主', '连锁店主'],
    retirementAge: 65,
    events: [
      { text: '你的店生意兴隆', effect: { wealth: 15, happiness: 10 } },
      { text: '隔壁开了家竞争对手', effect: { happiness: -10, wealth: -5 }, chance: 0.1 },
      { text: '你开了第二家分店', effect: { wealth: 20, happiness: 10, social: 5 }, minYears: 5 },
      { text: '城管来检查，你被罚了款', effect: { wealth: -10, happiness: -10 }, chance: 0.08 }
    ]
  },

  // ═══ 文创 ═══
  {
    id: 'artist',
    name: '艺术家',
    icon: '🎨',
    industry: 'creative',
    requirements: { creativity: 70 },
    salary: { base: 5, growth: 5 },
    happiness: 80,
    stress: 40,
    promotionPath: ['业余画家', '签约艺术家', '知名艺术家', '艺术大师'],
    retirementAge: 70,
    events: [
      { text: '你的作品在展览中获奖', effect: { happiness: 25, wealth: 15, charm: 10 } },
      { text: '你经历了创作瓶颈期', effect: { happiness: -15, creativity: 5 } },
      { text: '你的作品被收藏家高价收购', effect: { wealth: 40, happiness: 20 }, chance: 0.05 },
      { text: '你获得了国际艺术大奖', effect: { happiness: 35, social: 20, wealth: 30 }, minYears: 10, chance: 0.02 }
    ]
  },
  {
    id: 'writer',
    name: '作家',
    icon: '✍️',
    industry: 'creative',
    requirements: { creativity: 60, intelligence: 55 },
    salary: { base: 6, growth: 3 },
    happiness: 70,
    stress: 45,
    promotionPath: ['网络写手', '签约作者', '畅销书作家', '文学大师'],
    retirementAge: 70,
    events: [
      { text: '你的小说获得了文学奖', effect: { happiness: 25, wealth: 20, social: 10 }, minYears: 3 },
      { text: '你的书被改编成电视剧', effect: { wealth: 35, happiness: 15, social: 15 }, minYears: 5, chance: 0.05 },
      { text: '你遭遇了严重的写作瓶颈', effect: { happiness: -20, creativity: -5 }, chance: 0.1 },
      { text: '你的作品被指控抄袭', effect: { happiness: -25, social: -15 }, chance: 0.03 }
    ]
  },
  {
    id: 'musician',
    name: '音乐人',
    icon: '🎵',
    industry: 'creative',
    requirements: { creativity: 65 },
    salary: { base: 4, growth: 4 },
    happiness: 75,
    stress: 50,
    promotionPath: ['街头艺人', '酒吧驻唱', '独立音乐人', '明星歌手'],
    retirementAge: 50,
    events: [
      { text: '你的歌曲在网络上爆红', effect: { wealth: 30, happiness: 25, social: 20 }, chance: 0.04 },
      { text: '你在音乐节上演出成功', effect: { happiness: 20, social: 10, charm: 5 } },
      { text: '你和乐队成员闹翻了', effect: { happiness: -15, social: -10 }, chance: 0.08 }
    ]
  },
  {
    id: 'director',
    name: '导演',
    icon: '🎬',
    industry: 'creative',
    requirements: { creativity: 75, intelligence: 60, charm: 55 },
    salary: { base: 8, growth: 8 },
    happiness: 65,
    stress: 75,
    promotionPath: ['场记', '副导演', '导演', '知名导演'],
    retirementAge: 65,
    events: [
      { text: '你的电影获得了金鸡奖', effect: { happiness: 30, social: 20, wealth: 25 }, minYears: 8, chance: 0.03 },
      { text: '你的新片票房惨败', effect: { happiness: -20, wealth: -15 }, chance: 0.12 },
      { text: '你和主演发生了矛盾', effect: { happiness: -10, social: -5 }, chance: 0.1 }
    ]
  },

  // ═══ 政府/军队 ═══
  {
    id: 'civil_servant',
    name: '公务员',
    icon: '🏛️',
    industry: 'government',
    requirements: { education: 60, intelligence: 50 },
    salary: { base: 10, growth: 1.2 },
    happiness: 65,
    stress: 40,
    promotionPath: ['科员', '副科', '正科', '副处', '正处', '副厅', '正厅'],
    rankDetails: [
      { rank: 0, title: '科员', minYears: 0, effect: { wealth: 0 } },
      { rank: 1, title: '副科长', minYears: 3, effect: { wealth: 5, social: 5, happiness: 5 }, require: { education: 50, intelligence: 40 } },
      { rank: 2, title: '科长', minYears: 5, effect: { wealth: 8, social: 8, happiness: 8 }, require: { education: 55, intelligence: 45 } },
      { rank: 3, title: '副处长', minYears: 8, effect: { wealth: 12, social: 10, happiness: 10 }, require: { education: 60, intelligence: 50 } },
      { rank: 4, title: '处长', minYears: 12, effect: { wealth: 15, social: 12, happiness: 12 }, require: { education: 65, intelligence: 55 } },
      { rank: 5, title: '副厅长', minYears: 18, effect: { wealth: 20, social: 15, happiness: 15 }, require: { education: 70, intelligence: 60 } },
      { rank: 6, title: '厅长', minYears: 25, effect: { wealth: 25, social: 20, happiness: 18 }, require: { education: 75, intelligence: 65 } }
    ],
    retirementAge: 60,
    hasBianzhi: 'administrative',
    events: [
      // ── 晋升事件 ──
      { text: '你迎来了第一次晋升，成为副科级干部', effect: { wealth: 5, happiness: 15, social: 10 }, minYears: 3, requireRank: 0, once: true },
      { text: '你被提拔为科长，开始独当一面', effect: { wealth: 8, happiness: 15, social: 8, wisdom: 5 }, minYears: 5, requireRank: 1, once: true },
      { text: '你成功晋升副处长，进入了中层干部序列', effect: { wealth: 12, happiness: 20, social: 10 }, minYears: 8, requireRank: 2, once: true },
      { text: '你升任处长，手下的科室都有你负责', effect: { wealth: 15, happiness: 25, social: 12 }, minYears: 12, requireRank: 3, once: true },
      { text: '你被提拔为副厅长，成为了高级干部', effect: { wealth: 20, happiness: 30, social: 15 }, minYears: 18, requireRank: 4, once: true, chance: 0.3 },
      { text: '你升任厅长，成为了厅局级干部', effect: { wealth: 25, happiness: 35, social: 20 }, minYears: 25, requireRank: 5, once: true, chance: 0.1 },
      // ── 遴选考试 ──
      { text: '你报名参加了上级机关遴选考试', effect: { education: 5, happiness: -3 }, minYears: 2, chance: 0.1, choices: [
        { text: '认真备考', effect: { education: 8, wisdom: 5, happiness: -5 }, successRate: 0.35 },
        { text: '随便考考', effect: { education: 3, wisdom: 2 } }
      ]},
      { text: '你通过了遴选考试，成功调到上级机关', effect: { happiness: 25, social: 15, wealth: 5 }, minYears: 3, chance: 0.05 },
      // ── 借调 ──
      { text: '你被临时借调到上级部门帮忙', effect: { social: 10, happiness: 5, wisdom: 5 }, minYears: 2, chance: 0.08, choices: [
        { text: '努力表现争取留下', effect: { social: 15, happiness: 10, wealth: 5, wisdom: 5 }, successRate: 0.2 },
        { text: '完成任务就回去', effect: { social: 5, wisdom: 8, happiness: 3 } }
      ]},
      { text: '你被借调到中央部委工作了一年', effect: { social: 20, happiness: 15, wisdom: 10 }, minYears: 5, chance: 0.02 },
      // ── 日常工作 ──
      { text: '你帮助群众解决了一个多年的难题，收到锦旗和感谢信', effect: { happiness: 20, wisdom: 5, social: 5 }, chance: 0.06 },
      { text: '你因为材料写得漂亮，被领导点名表扬', effect: { happiness: 10, social: 5, intelligence: 3 }, chance: 0.08 },
      { text: '你因为工作失误被通报批评', effect: { happiness: -20, wealth: -3, social: -5 }, chance: 0.05 },
      { text: '你加班到深夜赶材料，身体发出了警告', effect: { health: -10, happiness: -8, wealth: 3 }, chance: 0.1 },
      { text: '你参加了党校培训，认识了很多同僚', effect: { social: 15, wisdom: 10, happiness: 5 }, minYears: 5, chance: 0.1 },
      { text: '你被安排下乡扶贫', effect: { wisdom: 15, happiness: -5, health: -5, social: 10 }, minYears: 3, chance: 0.08, choices: [
        { text: '用心工作，帮助村民', effect: { wisdom: 20, happiness: 10, social: 15, health: -3 } },
        { text: '走过场应付了事', effect: { happiness: 5, wisdom: -5 } }
      ]},
      // ── 腐败诱惑 ──
      { text: '有人给你送红包，暗示帮忙办事', effect: {}, chance: 0.04, choices: [
        { text: '坚决拒绝', effect: { wisdom: 15, happiness: -3, social: 3 } },
        { text: '收下了', effect: { wealth: 20, happiness: -10 }, risk: { wealth: -30, happiness: -30, social: -20 }, riskChance: 0.15 },
        { text: '收下但上报组织', effect: { wisdom: 20, social: 10, happiness: 5 } }
      ]},
      { text: '你因为正直拒绝了领导的违规要求', effect: { wisdom: 20, happiness: -5, social: -5 }, chance: 0.03 },
      // ── 考核/绩效 ──
      { text: '年终考核你被评为优秀', effect: { wealth: 5, happiness: 10, social: 5 }, chance: 0.08 },
      { text: '你撰写的工作方案被全省推广', effect: { happiness: 20, social: 15, wisdom: 10 }, minYears: 5, chance: 0.03 },
      // ── 人事变动 ──
      { text: '新领导上任，你的人事关系面临调整', effect: { happiness: -5, stress: 10 }, chance: 0.06, choices: [
        { text: '主动靠拢新领导', effect: { social: 10, wisdom: -3 } },
        { text: '做好本职工作不站队', effect: { wisdom: 10, happiness: 3 } },
        { text: '寻找调动的机会', effect: { social: -3, wisdom: 5 } }
      ]},
      { text: '单位机构改革，你所在的部门面临裁撤', effect: { happiness: -15, stress: 15 }, chance: 0.03, choices: [
        { text: '服从组织安排', effect: { wisdom: 10, happiness: -5 } },
        { text: '主动申请调动', effect: { social: 5, wisdom: 5, happiness: -3 } },
        { text: '趁机跳槽到企业', effect: { wealth: 10, happiness: 5, social: -5 } }
      ]},
      // ── 特殊机遇 ──
      { text: '你被选为年轻干部重点培养对象', effect: { happiness: 20, social: 15, wisdom: 5 }, minYears: 3, ageMax: 35, chance: 0.04 },
      { text: '你参与了一个重大政策文件的起草', effect: { wisdom: 15, education: 8, social: 10 }, minYears: 5, chance: 0.04 },
      { text: '你被选派到沿海发达地区挂职锻炼', effect: { wisdom: 15, social: 15, happiness: 5, wealth: 5 }, minYears: 5, chance: 0.03 },
      // ─── 体制内深度策略博弈扩展 ───
      {
        text: '【体制抉择】组织部下发通知，选派优秀年轻干部深入偏远山区开展为期两年的驻村扶贫工作。这对你而言是一个巨大的挑战，也是一个破格提拔的捷径。',
        minYears: 3,
        requireRank: 0,
        chance: 0.12,
        choices: [
          {
            text: '主动请缨前往最艰苦的驻村一线（折抵3年工龄，健康-15）',
            effect: { _careerYears: 3, health: -15, happiness: -10, wisdom: 20, social: 15 }
          },
          {
            text: '申请留在机关做稳妥的公文文秘工作',
            effect: { happiness: 5 }
          }
        ]
      },
      {
        text: '【立场抉择】省里要求由你牵头起草一份关于本市核心产业转型升级的政策报告，目前科室内部面临“求稳”与“破局”的激烈争论。',
        minYears: 5,
        requireRank: 1,
        chance: 0.1,
        choices: [
          {
            text: '撰写传统安全报告（平稳，无政治风险）',
            effect: { happiness: 5 }
          },
          {
            text: '大胆改革，结合AI技术写出有争议的突破性改革方案（需要高智力/智慧）',
            effect: { _careerYears: 2, wisdom: 15, intelligence: 5 },
            require: { intelligence: 75, wisdom: 70 }
          }
        ]
      },
      {
        text: '【政商抉择】本市跨部门联合政务系统推进困难，各方利益冲突严重，作为项目督办人，你必须推进项目进度。',
        minYears: 3,
        chance: 0.08,
        choices: [
          {
            text: '当和事佬，以茶会友，协调人情世故（增加人脉声望）',
            effect: { social: 15, charm: 5 }
          },
          {
            text: '强硬施压，严格依据市长办公会议纪要督办（折抵1年工龄，得罪同僚）',
            effect: { _careerYears: 1, social: -15, wisdom: 10 }
          }
        ]
      },
      {
        text: '【红线抉择】你受邀参加了党校中青班培训。晚上，几名背景深厚的同僚私下组织聚会，并邀请你一起参加高规格酒局。',
        minYears: 4,
        chance: 0.08,
        choices: [
          {
            text: '欣然前往，扩展体制内人脉（社交+20，存在15%爆雷遭纪检通报风险）',
            effect: { social: 20, charm: 5 },
            risk: { social: -30, happiness: -30, wealth: -10 },
            riskChance: 0.15
          },
          {
            text: '委婉谢绝，坚守廉洁原则留在宿舍研读政策文献',
            effect: { wisdom: 15, intelligence: 5 }
          }
        ]
      },
      {
        text: '【危机抉择】本市突发重大社会安全与网络舆情危机，舆论迅速发酵，领导指派你负责直面媒体进行回应。',
        minYears: 6,
        requireRank: 2,
        chance: 0.06,
        choices: [
          {
            text: '推诿塞责，发照本宣科的官方通稿（声望大跌）',
            effect: { social: -15, happiness: -5 }
          },
          {
            text: '深夜带队直奔发布会现场，通宵面对质疑真诚化解（折抵2年工龄，健康-10）',
            effect: { _careerYears: 2, social: 20, charm: 10, health: -10, wisdom: 15 },
            require: { health: 60, social: 60 }
          }
        ]
      }
    ]
  },
  // ═══ 事业单位 ═══
  {
    id: 'public_institution_worker',
    name: '事业单位人员',
    icon: '🏢',
    industry: 'government',
    requirements: { education: 55, intelligence: 45 },
    salary: { base: 9, growth: 0.8 },
    happiness: 62,
    stress: 35,
    promotionPath: ['科员', '中级', '副高', '正高'],
    rankDetails: [
      { rank: 0, title: '初级', minYears: 0, effect: { wealth: 0 } },
      { rank: 1, title: '中级', minYears: 5, effect: { wealth: 5, happiness: 5 }, require: { education: 55 } },
      { rank: 2, title: '副高级', minYears: 10, effect: { wealth: 10, happiness: 8, social: 5 }, require: { education: 65, intelligence: 55 } },
      { rank: 3, title: '正高级', minYears: 18, effect: { wealth: 15, happiness: 12, social: 10 }, require: { education: 75, intelligence: 65 } }
    ],
    retirementAge: 60,
    hasBianzhi: 'public_institution',
    events: [
      { text: '你通过了职称考试，获得了中级职称', effect: { education: 10, wealth: 5, happiness: 10 }, minYears: 5, requireRank: 0, once: true },
      { text: '你评上了副高级职称', effect: { education: 15, wealth: 10, happiness: 15, social: 5 }, minYears: 10, requireRank: 1, once: true, chance: 0.4 },
      { text: '你评上了正高级职称，职业生涯达到了新高度', effect: { education: 20, wealth: 15, happiness: 20, social: 10 }, minYears: 18, requireRank: 2, once: true, chance: 0.15 },
      { text: '单位绩效改革，你的收入有了变化', effect: { wealth: 5, happiness: -3 }, chance: 0.08, choices: [
        { text: '积极适应新制度', effect: { wealth: 8, wisdom: 5 } },
        { text: '心里不痛快但没办法', effect: { happiness: -5 } }
      ]},
      { text: '事业单位改革，你的编制面临调整', effect: { happiness: -10, stress: 10 }, chance: 0.04, choices: [
        { text: '支持改革，服从安排', effect: { wisdom: 10 } },
        { text: '担心前途，考虑跳槽', effect: { happiness: -5, wisdom: 3 } }
      ]},
      { text: '你的工作成果在系统内受到表彰', effect: { happiness: 15, social: 10 }, minYears: 5, chance: 0.06 },
      { text: '你被派去基层锻炼两年', effect: { wisdom: 15, happiness: -5, social: 10 }, chance: 0.05 },
      { text: '单位有人辞职了，你要分担更多工作', effect: { stress: 10, happiness: -5, wealth: 3 }, chance: 0.08 },
      { text: '你考虑要不要考公务员转行政编', effect: { happiness: -3 }, minYears: 3, chance: 0.06, choices: [
        { text: '报名考公务员', effect: { education: 5, happiness: -5 }, successRate: 0.2 },
        { text: '觉得现在挺好不折腾', effect: { happiness: 5, wisdom: 5 } }
      ]},
      // ─── 事业单位深度策略博弈扩展 ───
      {
        text: '【驻村扶贫】市里选派事业单位人员下乡挂职扶贫，挂职期满后评定高级职称可直接获得破格指标加成。',
        minYears: 4,
        requireRank: 1,
        chance: 0.1,
        choices: [
          {
            text: '主动报名前往（折抵3年工龄，健康-12，智慧+15）',
            effect: { _careerYears: 3, health: -12, happiness: -10, wisdom: 15, social: 10 }
          },
          {
            text: '坚守岗位做本职工作',
            effect: { happiness: 5 }
          }
        ]
      },
      {
        text: '【红线博弈】单位进行财务专项大审计，领导示意你把去年一笔不合规的招待经费做账冲掉。',
        minYears: 2,
        chance: 0.08,
        choices: [
          {
            text: '坚决拒绝违规报销',
            effect: { wisdom: 15, social: -10, happiness: -5 }
          },
          {
            text: '顺从领导意图做假账（财富+5，有20%概率面临纪委查处爆雷降级）',
            effect: { wealth: 5, happiness: 5, social: 10 },
            risk: { wealth: -15, happiness: -30, social: -15 },
            riskChance: 0.2
          }
        ]
      },
      {
        text: '【科研攻坚】单位承接了省级核心科研实验课题，急需骨干人员加入，但由于进度紧张面临连轴转的加班地狱。',
        minYears: 3,
        chance: 0.1,
        choices: [
          {
            text: '担任第一主导人连夜攻坚（折抵2年工龄，健康-15，智力+10）',
            effect: { _careerYears: 2, health: -15, intelligence: 10, wisdom: 15, social: 10 },
            require: { intelligence: 70, health: 60 }
          },
          {
            text: '作为一般组员协助，按时上下班',
            effect: { happiness: 10 }
          }
        ]
      }
    ]
  },
  {
    id: 'soldier',
    name: '军人',
    icon: '🎖️',
    industry: 'government',
    requirements: { health: 60 },
    salary: { base: 10, growth: 1.5 },
    happiness: 60,
    stress: 55,
    promotionPath: ['列兵', '士官', '军官', '高级军官'],
    retirementAge: 55,
    events: [
      { text: '你在演习中表现优异', effect: { health: 5, happiness: 10, social: 5 } },
      { text: '你参与了抗洪救灾', effect: { wisdom: 15, happiness: 10, social: 15 }, chance: 0.05 },
      { text: '你在训练中受伤了', effect: { health: -15, happiness: -10 }, chance: 0.08 }
    ]
  },
  {
    id: 'police',
    name: '警察',
    icon: '👮',
    industry: 'government',
    requirements: { education: 50, health: 60 },
    salary: { base: 12, growth: 1.5 },
    happiness: 55,
    stress: 70,
    promotionPath: ['警员', '警长', '所长', '局长'],
    retirementAge: 55,
    events: [
      { text: '你破获了一起重大案件', effect: { happiness: 20, social: 15, wisdom: 10 }, minYears: 3 },
      { text: '你在执法过程中受伤', effect: { health: -20, happiness: -10 }, chance: 0.06 },
      { text: '你获得了三等功', effect: { happiness: 15, social: 10, wealth: 5 }, minYears: 5 }
    ]
  },

  // ═══ 服务 ═══
  {
    id: 'chef',
    name: '厨师',
    icon: '👨‍🍳',
    industry: 'service',
    requirements: { creativity: 40 },
    salary: { base: 8, growth: 1.5 },
    happiness: 60,
    stress: 60,
    promotionPath: ['帮厨', '厨师', '主厨', '行政总厨'],
    retirementAge: 60,
    events: [
      { text: '你的招牌菜大受好评', effect: { happiness: 15, wealth: 10, charm: 5 } },
      { text: '你开了自己的餐厅', effect: { wealth: 20, happiness: 15 }, minYears: 8, requireRank: 1 },
      { text: '你参加美食比赛获得了冠军', effect: { happiness: 20, social: 10, wealth: 10 }, minYears: 5, chance: 0.05 }
    ]
  },
  {
    id: 'lawyer',
    name: '律师',
    icon: '⚖️',
    industry: 'service',
    requirements: { education: 75, intelligence: 65 },
    salary: { base: 18, growth: 3 },
    happiness: 55,
    stress: 70,
    promotionPath: ['实习律师', '律师', '合伙人', '律所主任'],
    retirementAge: 65,
    events: [
      { text: '你赢了一场重大官司', effect: { wealth: 25, happiness: 15, social: 10 } },
      { text: '你输了一个重要的案子', effect: { happiness: -15, social: -5 }, chance: 0.1 },
      { text: '你成为了律所合伙人', effect: { wealth: 40, happiness: 10 }, minYears: 8, requireRank: 1 }
    ]
  },
  {
    id: 'real_estate',
    name: '房产经纪人',
    icon: '🏠',
    industry: 'service',
    requirements: { education: 40, charm: 55 },
    salary: { base: 6, growth: 2 },
    happiness: 50,
    stress: 65,
    promotionPath: ['经纪人', '资深经纪人', '门店经理', '区域总监'],
    retirementAge: 55,
    events: [
      { text: '你做成了一笔大单', effect: { wealth: 25, happiness: 15 } },
      { text: '房地产市场低迷，你连续几个月零成交', effect: { wealth: -10, happiness: -15 }, chance: 0.1 },
      { text: '客户跳单了', effect: { happiness: -10, wealth: -5 }, chance: 0.08 }
    ]
  },

  // ═══ 制造/劳动 ═══
  {
    id: 'worker',
    name: '工人',
    icon: '👷',
    industry: 'manufacturing',
    requirements: {},
    salary: { base: 6, growth: 0.5 },
    happiness: 50,
    stress: 60,
    promotionPath: ['普工', '技工', '班组长', '车间主任'],
    retirementAge: 60,
    events: [
      { text: '你因为工作出色获得了奖金', effect: { wealth: 10, happiness: 10 } },
      { text: '你在工作中受伤了', effect: { health: -20, wealth: 5 }, chance: 0.1 },
      { text: '你被提拔为班组长', effect: { wealth: 5, happiness: 10, social: 5 }, minYears: 3 },
      { text: '工厂效益不好，你被裁员了', effect: { happiness: -20, wealth: -10 }, chance: 0.08 },
      { text: '你考到了高级技工证', effect: { wealth: 10, intelligence: 5 }, minYears: 5, chance: 0.1 }
    ]
  },
  {
    id: 'delivery',
    name: '快递员',
    icon: '📦',
    industry: 'service',
    requirements: { health: 50 },
    salary: { base: 8, growth: 0.5 },
    happiness: 45,
    stress: 65,
    promotionPath: ['快递员', '站长', '区域经理'],
    retirementAge: 50,
    events: [
      { text: '你月入过万了', effect: { wealth: 15, happiness: 10 }, chance: 0.15 },
      { text: '你送快递时出了交通事故', effect: { health: -15, wealth: -5 }, chance: 0.08 },
      { text: '客户投诉你送晚了', effect: { happiness: -5 }, chance: 0.12 }
    ]
  },
  {
    id: 'driver',
    name: '司机',
    icon: '🚗',
    industry: 'service',
    requirements: { health: 50 },
    salary: { base: 8, growth: 0.5 },
    happiness: 55,
    stress: 55,
    promotionPath: ['出租车司机', '专车司机', '车队队长'],
    retirementAge: 60,
    events: [
      { text: '你拉到了一位大客户', effect: { wealth: 10, social: 5 } },
      { text: '你遇到了交通事故', effect: { health: -15, wealth: -10 }, chance: 0.06 }
    ]
  },

  // ═══ 自由职业 ═══
  {
    id: 'freelancer',
    name: '自由职业',
    icon: '🏠',
    industry: 'creative',
    requirements: {},
    salary: { base: 8, growth: 2 },
    happiness: 75,
    stress: 50,
    promotionPath: ['自由职业者', '资深自由职业者', '个人品牌'],
    retirementAge: 65,
    events: [
      { text: '你接到了一个大项目', effect: { wealth: 20, happiness: 10 } },
      { text: '你连续几个月没有收入', effect: { wealth: -15, happiness: -15 }, chance: 0.12 },
      { text: '你建立了稳定的客户群', effect: { wealth: 15, happiness: 15 }, minYears: 3 },
      { text: '你开始做自媒体，粉丝突破十万', effect: { wealth: 20, social: 15, happiness: 10 }, minYears: 2, chance: 0.04 }
    ]
  },
  {
    id: 'streamer',
    name: '主播',
    icon: '🎙️',
    industry: 'creative',
    requirements: { charm: 55 },
    salary: { base: 5, growth: 5 },
    happiness: 60,
    stress: 60,
    promotionPath: ['小主播', '中腰部主播', '头部主播', '超级网红'],
    retirementAge: 40,
    events: [
      { text: '你的一场直播收入破万', effect: { wealth: 25, happiness: 15 }, chance: 0.08 },
      { text: '你因为言论翻车了', effect: { happiness: -20, social: -15 }, chance: 0.06 },
      { text: '你签约了MCN机构', effect: { wealth: 15, social: 10 }, minYears: 1 },
      { text: '你的粉丝突破了百万', effect: { wealth: 30, social: 20, happiness: 15 }, minYears: 2, chance: 0.03 }
    ]
  },

  // ═══ 农业 ═══
  {
    id: 'farmer',
    name: '农民',
    icon: '🌾',
    industry: 'agriculture',
    requirements: {},
    salary: { base: 4, growth: 0.3 },
    happiness: 60,
    stress: 40,
    promotionPath: ['农民', '种植大户', '农业合作社社长'],
    retirementAge: 70,
    events: [
      { text: '今年收成不错', effect: { wealth: 10, happiness: 10 } },
      { text: '遭遇了旱灾，庄稼减产', effect: { wealth: -15, happiness: -15 }, chance: 0.1 },
      { text: '你引进了新品种，收入翻番', effect: { wealth: 20, happiness: 10, intelligence: 5 }, minYears: 5 },
      { text: '你开办了农家乐', effect: { wealth: 15, happiness: 10, social: 10 }, minYears: 8 }
    ]
  },
  // ═══ 苹果科技生态与独立开发（Apple & Tech Careers） ═══
  {
    id: 'ios_indie_dev',
    name: 'iOS独立开发者',
    icon: '💻',
    industry: 'tech',
    requirements: { creativity: 65, intelligence: 60 },
    salary: { base: 18, growth: 3.5 },
    happiness: 65,
    stress: 60,
    promotionPath: ['新手独立开发', 'App Store 精品作者', '百万套现大佬', 'Apple 设计大奖得主'],
    retirementAge: 55,
    events: [
      { text: '你开发的高颜值天气 App 获得了 App Store 首页推荐，下载量暴涨', effect: { wealth: 20, happiness: 20, charm: 5, flag: 'app_store_featured' }, chance: 0.15 },
      { text: '因为云服务器配置错误，你的 App 崩溃了整整一天，用户疯狂打差评', effect: { happiness: -15, stress: 15, wealth: -5 }, chance: 0.1 },
      { text: '你携带打磨多年的独立作品角逐苹果设计奖，最终斩获了 WWDC 年度设计金奖！', effect: { wealth: 40, happiness: 35, social: 25, charm: 20, flag: 'wwdc_winner' }, minYears: 3, chance: 0.08 },
      { text: '你开发的一款独立解谜游戏突然在海外爆火，引来大厂收购邀约', effect: { wealth: 50, happiness: 25 }, minYears: 2, chance: 0.08 }
    ]
  },
  {
    id: 'apple_designer',
    name: 'Apple体验设计师',
    icon: '🎨',
    industry: 'tech',
    requirements: { creativity: 70, charm: 60 },
    salary: { base: 22, growth: 4 },
    happiness: 70,
    stress: 65,
    promotionPath: ['助理UI设计师', '人机交互设计师', '设计主管', 'Apple设计副总裁'],
    retirementAge: 60,
    events: [
      { text: '在全新 iOS 毛玻璃磨砂效果方案上，你据理力争，终于说服了资深高管并完美落地', effect: { wisdom: 10, intelligence: 5, happiness: 15, social: 10 }, minYears: 2 },
      { text: '因为设计稿中的一个像素没有对齐，被设计总监当场严厉批评重做', effect: { happiness: -10, stress: 10 }, chance: 0.1 },
      { text: '你主导设计的 Vision Pro 空间交互界面备受赞誉，荣获了苹果公司年度杰出员工勋章', effect: { wealth: 25, happiness: 25, social: 15, charm: 10 }, minYears: 3 },
      { text: '你受邀在苹果设计沙龙发表演讲，向全球开发者分享极简交互美学', effect: { social: 20, charm: 15, wisdom: 5 }, minYears: 4, chance: 0.08 }
    ]
  },
  {
    id: 'swift_architect',
    name: 'Swift架构师',
    icon: '🚀',
    industry: 'tech',
    requirements: { education: 70, intelligence: 75 },
    salary: { base: 25, growth: 4.5 },
    happiness: 60,
    stress: 70,
    promotionPath: ['初级Swift开发', '核心框架专家', '主任开发工程师', 'Swift进化委员会成员'],
    retirementAge: 55,
    events: [
      { text: '你向 Swift 进化委员会提交的新语法特性提案被批准合并，改变了全球数百万开发者的编码方式！', effect: { intelligence: 20, wisdom: 15, social: 20, flag: 'swift_council' }, minYears: 3, chance: 0.08 },
      { text: '编译器出现突发内存泄露，你通宵排查终于在数百万行代码中修补了底层 RunTime 严重 Bug', effect: { health: -8, wisdom: 10, intelligence: 5, wealth: 15 } },
      { text: '你作为主讲嘉宾登上 WWDC 舞台向全球演示最新的 Swift 并发框架，声望大振', effect: { social: 25, charm: 15, happiness: 20 }, minYears: 4, chance: 0.08 }
    ]
  },
  {
    id: 'tech_tycoon_ceo',
    name: '硅谷科技大亨',
    icon: '👑',
    industry: 'tech',
    requirements: { wealth: 80, wisdom: 75 },
    salary: { base: 60, growth: 10 },
    happiness: 75,
    stress: 85,
    promotionPath: ['科技创业先锋', '独角兽企业掌舵人', '万亿市值科技大亨'],
    retirementAge: 70,
    events: [
      { text: '你主持发布了万众瞩目的苹果空间计算头显，正式拉开了三维空间交互时代的序幕', effect: { wealth: 60, happiness: 30, social: 20 }, minYears: 2 },
      { text: '你重磅推出端侧大模型 Apple Intelligence，以卓越的端侧隐私处理能力击败竞争对手，公司股价暴涨', effect: { wealth: 80, intelligence: 15, wisdom: 10 }, minYears: 3 },
      { text: '你的科技公司完成纳斯达克敲钟上市，成为硅谷最耀眼的万亿级科技新星，你缔造了属于你的万亿传奇！', effect: { wealth: 150, happiness: 50, social: 40, flag: 'silicon_valley_legend' }, minYears: 4, once: true }
    ]
  }
]

// ─── 职业转换（哪些职业可以互相跳转）─────────────────────────
export const careerTransitions = {
  doctor: ['pharmacist', 'professor'],
  nurse: ['doctor', 'pharmacist'],
  programmer: ['ai_engineer', 'cybersecurity', 'product_manager', 'entrepreneur', 'ios_indie_dev', 'swift_architect'],
  product_manager: ['entrepreneur', 'investment_analyst'],
  ai_engineer: ['programmer', 'professor', 'entrepreneur', 'swift_architect'],
  banker: ['investment_analyst', 'accountant', 'real_estate'],
  teacher: ['professor', 'civil_servant', 'writer'],
  artist: ['writer', 'director', 'musician', 'freelancer'],
  writer: ['director', 'freelancer', 'streamer'],
  worker: ['delivery', 'driver', 'chef', 'shop_owner'],
  freelancer: ['streamer', 'writer', 'artist', 'ios_indie_dev'],
  civil_servant: ['lawyer', 'police'],
  soldier: ['police', 'civil_servant'],
  farmer: ['shop_owner', 'chef'],
  ios_indie_dev: ['swift_architect', 'tech_tycoon_ceo', 'freelancer'],
  apple_designer: ['tech_tycoon_ceo', 'director'],
  swift_architect: ['tech_tycoon_ceo', 'professor', 'ai_engineer']
}

// ─── 辅助函数 ──────────────────────────────────────────────

/**
 * 根据角色属性获取可选职业
 */
export function getAvailableCareers(character) {
  return careers.filter(function(career) {
    var keys = Object.keys(career.requirements)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var value = career.requirements[key]
      if ((character[key] || 0) < value) return false
    }
    return true
  })
}

/**
 * 计算职业收入（含行业景气度和晋升加成）
 */
export function calculateSalary(career, yearsWorked, currentRank) {
  if (!career) return 0
  const base = career.salary.base
  const growth = career.salary.growth
  const industry = industryTrends[career.industry]
  const industryMultiplier = industry ? industry.baseSalary : 1.0
  const rankBonus = 1 + (currentRank || 0) * 0.25
  
  return Math.round((base + growth * yearsWorked) * industryMultiplier * rankBonus)
}

/**
 * 检查是否可以晋升
 */
export function canPromote(career, yearsWorked, currentRank) {
  if (!career || !career.promotionPath) return false
  if (currentRank >= career.promotionPath.length - 1) return false
  
  // 每3-5年有机会晋升
  const minYears = 3 + currentRank * 2
  if (yearsWorked < minYears) return false
  
  // 晋升概率随等级递减
  const baseChance = 0.3 - currentRank * 0.08
  return Math.random() < Math.max(0.05, baseChance)
}

/**
 * 获取职业特定事件
 */
export function getCareerEvent(career, character) {
  if (!career || !career.events || career.events.length === 0) return null
  
  const yearsWorked = character._careerYears || 0
  const currentRank = character._careerRank || 0
  
  // 过滤符合条件的事件
  const eligible = career.events.filter(function(e) {
    if (e.minYears && yearsWorked < e.minYears) return false
    if (e.requireRank && currentRank < e.requireRank) return false
    if (e.chance && Math.random() > e.chance) return false
    return true
  })
  
  if (eligible.length === 0) return null
  return eligible[Math.floor(Math.random() * eligible.length)]
}

/**
 * 获取可转换的职业列表
 */
export function getTransitionCareers(currentCareerId, character) {
  const transitionIds = careerTransitions[currentCareerId] || []
  return careers.filter(function(c) {
    if (transitionIds.indexOf(c.id) === -1) return false
    // 检查目标职业的属性要求
    var keys = Object.keys(c.requirements)
    for (var i = 0; i < keys.length; i++) {
      if ((character[keys[i]] || 0) < c.requirements[keys[i]]) return false
    }
    return true
  })
}
