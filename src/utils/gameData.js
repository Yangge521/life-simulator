// ============================================================
// 人生模拟器 - 游戏数据（丰富版）
// ============================================================

// ─── 家庭类型（12种，翻倍扩充）───────────────────────────────
export const familyTypes = [
  // ── 原有6种 ──
  {
    id: 'wealthy',
    name: '富裕家庭',
    icon: '🏰',
    description: '出身富裕，父母是知名企业家',
    wealth: 90, education: 80, happiness: 60, health: 70,
    intelligence: 60, social: 50, charm: 55,
    traits: ['优质教育', '人脉广泛', '压力较大', '期望很高']
  },
  {
    id: 'middle',
    name: '中产家庭',
    icon: '🏠',
    description: '普通中产家庭，父母是白领',
    wealth: 50, education: 60, happiness: 70, health: 70,
    intelligence: 55, social: 60, charm: 50,
    traits: ['稳定生活', '适度压力', '发展空间']
  },
  {
    id: 'poor',
    name: '贫困家庭',
    icon: '🏚️',
    description: '家境贫寒，但父母勤劳善良',
    wealth: 20, education: 40, happiness: 50, health: 60,
    intelligence: 45, social: 40, charm: 45,
    traits: ['吃苦耐劳', '珍惜机会', '逆境成长', '早当家']
  },
  {
    id: 'single',
    name: '单亲家庭',
    icon: '👨‍👧',
    description: '单亲家庭，与父/母相依为命',
    wealth: 35, education: 50, happiness: 45, health: 65,
    intelligence: 55, social: 45, charm: 50,
    traits: ['独立坚强', '早熟懂事', '渴望关爱']
  },
  {
    id: 'artist',
    name: '艺术家庭',
    icon: '🎨',
    description: '父母是艺术家，充满创意氛围',
    wealth: 40, education: 70, happiness: 80, health: 65,
    intelligence: 65, social: 55, charm: 70,
    traits: ['创造力强', '思维独特', '经济不稳', '感性丰富']
  },
  {
    id: 'academic',
    name: '书香门第',
    icon: '📚',
    description: '父母是教授，学术氛围浓厚',
    wealth: 55, education: 95, happiness: 65, health: 60,
    intelligence: 85, social: 40, charm: 45,
    traits: ['学识渊博', '逻辑严谨', '社交较少', '追求真理']
  },
  // ── 新增6种 ──
  {
    id: 'military',
    name: '军人家庭',
    icon: '🎖️',
    description: '父母是军人，纪律严明，家国情怀深厚',
    wealth: 45, education: 65, happiness: 55, health: 80,
    intelligence: 60, social: 50, charm: 45,
    traits: ['纪律严明', '身体素质好', '责任感强', '感情内敛']
  },
  {
    id: 'farmer',
    name: '农家子弟',
    icon: '🌾',
    description: '父母是农民，勤劳朴实，与土地为伴',
    wealth: 15, education: 35, happiness: 65, health: 85,
    intelligence: 50, social: 55, charm: 50,
    traits: ['勤劳朴实', '体魄强健', '知足常乐', '人脉在乡里']
  },
  {
    id: 'immigrant',
    name: '移民家庭',
    icon: '✈️',
    description: '父母是留学生或移民，跨文化背景',
    wealth: 40, education: 75, happiness: 60, health: 65,
    intelligence: 70, social: 45, charm: 60,
    traits: ['双语优势', '文化包容', '适应力强', '身份认同困惑']
  },
  {
    id: 'foster',
    name: '福利院长大',
    icon: '🏛️',
    description: '在福利院长大，身世成谜，靠自己打拼',
    wealth: 10, education: 30, happiness: 40, health: 60,
    intelligence: 55, social: 35, charm: 50,
    traits: ['独立自主', '内心强大', '渴望归属感', '不轻易信人']
  },
  {
    id: 'celebrity',
    name: '明星家庭',
    icon: '🌟',
    description: '父母是演艺界名人，光环与压力并存',
    wealth: 85, education: 55, happiness: 50, health: 65,
    intelligence: 50, social: 70, charm: 85,
    traits: ['曝光度高', '人脉广阔', '隐私缺乏', '容易被人嫉妒']
  },
  {
    id: 'official',
    name: '干部家庭',
    icon: '🏛️',
    description: '父母是公务员/干部，规矩多，关系网复杂',
    wealth: 60, education: 75, happiness: 55, health: 65,
    intelligence: 70, social: 65, charm: 55,
    traits: ['处事圆滑', '人脉资源好', '规矩束缚多', '压力大']
  },
  {
    id: 'divorced_parents',
    name: '离异家庭',
    icon: '💔',
    description: '父母离异，你在两个家庭之间来回',
    wealth: 45, education: 50, happiness: 40, health: 60,
    intelligence: 55, social: 45, charm: 50,
    traits: ['情感敏感', '适应力强', '渴望完整家庭', '早熟']
  },
  {
    id: 'mixed_heritage',
    name: '混血家庭',
    icon: '🌍',
    description: '父母来自不同文化背景，融合两种世界观',
    wealth: 55, education: 70, happiness: 60, health: 70,
    intelligence: 65, social: 55, charm: 75,
    traits: ['双语优势', '文化包容', '身份认同困惑', '视野开阔']
  },
  {
    id: 'large_family',
    name: '大家庭',
    icon: '👨‍👩‍👧‍👦',
    description: '家里有很多兄弟姐妹，热闹但资源紧张',
    wealth: 35, education: 45, happiness: 65, health: 65,
    intelligence: 50, social: 70, charm: 55,
    traits: ['分享精神', '团队协作', '亲情深厚', '个人空间少']
  },
  {
    id: 'orphan',
    name: '孤儿',
    icon: '🦋',
    description: '你从小失去双亲，靠自己打拼',
    wealth: 5, education: 25, happiness: 30, health: 55,
    intelligence: 60, social: 30, charm: 45,
    traits: ['独立坚强', '内心强大', '渴望归属', '不轻信他人']
  },
  {
    id: 'religious',
    name: '信仰家庭',
    icon: '🕊️',
    description: '家庭信仰深厚，从小接受宗教熏陶',
    wealth: 40, education: 60, happiness: 70, health: 70,
    intelligence: 55, social: 55, charm: 50,
    traits: ['精神富足', '善良正直', '思想保守', '可能过于单纯']
  },
  {
    id: 'tech_elite',
    name: '科技精英',
    icon: '💻',
    description: '父母是前沿科技精英，从小耳濡目染极客文化与极简美学',
    wealth: 75, education: 85, happiness: 65, health: 70,
    intelligence: 80, social: 55, charm: 60,
    traits: ['数字原生', '极客精神', '视野开阔', '追求极致']
  }
]

// ─── 人生阶段 ────────────────────────────────────────────────
export const lifeStages = [
  { id: 'baby',    name: '婴儿期', ageRange: [0, 2],   icon: '👶' },
  { id: 'toddler', name: '幼儿期', ageRange: [3, 5],   icon: '💒' },
  { id: 'child',   name: '童年',   ageRange: [6, 11],  icon: '🧒' },
  { id: 'teen',    name: '青春期', ageRange: [12, 17], icon: '🧑' },
  { id: 'youth',   name: '青年',   ageRange: [18, 34], icon: '👨' },
  { id: 'middle',  name: '中年',   ageRange: [35, 59], icon: '👨‍💼' },
  { id: 'elder',   name: '老年',   ageRange: [60, 100],icon: '👴' }
]

// ─── 教育路径 ────────────────────────────────────────────────
export const educationPaths = [
  { id: 'none',        name: '未接受正规教育',  next: ['primary'] },
  { id: 'primary',     name: '小学',           next: ['middle', 'dropout'] },
  { id: 'middle',      name: '初中',           next: ['high', 'vocational', 'dropout'] },
  { id: 'high',        name: '高中',           next: ['university', 'vocational', 'work'] },
  { id: 'vocational',  name: '职业院校',       next: ['work', 'university'] },
  { id: 'university',  name: '大学本科',       next: ['graduate', 'work'] },
  { id: 'graduate',    name: '研究生及以上',   next: ['work'] },
  { id: 'dropout',     name: '辍学',           next: ['work'] },
  { id: 'work',        name: '步入社会',       next: [] }
]

// ─── 职业路径 ────────────────────────────────────────────────
export const careerPaths = [
  // 文科类
  { id: 'teacher',     name: '教师',       category: 'liberal',   wealthGrow: 3,  happinessGrow: 5,  healthGrow: 2,  requireEdu: 'university' },
  { id: 'doctor',      name: '医生',       category: 'liberal',   wealthGrow: 8,  happinessGrow: 4,  healthGrow: -3, requireEdu: 'graduate' },
  { id: 'lawyer',     name: '律师',       category: 'liberal',   wealthGrow: 9,  happinessGrow: 3,  healthGrow: -2, requireEdu: 'graduate' },
  { id: 'journalist', name: '记者/媒体',  category: 'liberal',   wealthGrow: 4,  happinessGrow: 6,  healthGrow: 0,  requireEdu: 'university' },
  { id: 'artist_pro', name: '职业艺术家', category: 'liberal',   wealthGrow: 5,  happinessGrow: 8,  healthGrow: 0,  requireEdu: 'university' },
  { id: 'writer',     name: '作家/编辑',  category: 'liberal',   wealthGrow: 4,  happinessGrow: 7,  healthGrow: 1,  requireEdu: 'university' },
  { id: 'translator', name: '翻译',       category: 'liberal',   wealthGrow: 5,  happinessGrow: 5,  healthGrow: 1,  requireEdu: 'university' },
  { id: 'psychologist', name: '心理咨询师', category: 'liberal', wealthGrow: 6, happinessGrow: 6, healthGrow: 0, requireEdu: 'graduate' },
  // 理科/技术类
  { id: 'engineer',   name: '工程师',     category: 'science',  wealthGrow: 7,  happinessGrow: 4,  healthGrow: -2, requireEdu: 'university' },
  { id: 'programmer', name: '程序员',     category: 'science',  wealthGrow: 8,  happinessGrow: 3,  healthGrow: -4, requireEdu: 'university' },
  { id: 'scientist',  name: '科研人员',   category: 'science',  wealthGrow: 5,  happinessGrow: 5,  healthGrow: -2, requireEdu: 'graduate' },
  { id: 'doctor_med', name: '医生(临床)', category: 'science',  wealthGrow: 9,  happinessGrow: 4,  healthGrow: -5, requireEdu: 'graduate' },
  { id: 'data_analyst', name: '数据分析师', category: 'science', wealthGrow: 7, happinessGrow: 4, healthGrow: -2, requireEdu: 'university' },
  { id: 'architect',  name: '建筑师',     category: 'science',  wealthGrow: 8,  happinessGrow: 5,  healthGrow: -2, requireEdu: 'university' },
  // 商业/管理类
  { id: 'entrepreneur', name: '创业者',   category: 'business', wealthGrow: 12, happinessGrow: 2,  healthGrow: -5, requireEdu: 'university' },
  { id: 'manager',      name: '企业管理者', category: 'business', wealthGrow: 8,  happinessGrow: 3,  healthGrow: -3, requireEdu: 'university' },
  { id: 'sales',        name: '销售/市场',  category: 'business', wealthGrow: 6,  happinessGrow: 5,  healthGrow: 0,  requireEdu: 'middle' },
  { id: 'finance',      name: '金融/银行',  category: 'business', wealthGrow: 10, happinessGrow: 3,  healthGrow: -3, requireEdu: 'university' },
  { id: 'hr',           name: '人力资源',   category: 'business', wealthGrow: 5,  happinessGrow: 5,  healthGrow: 0,  requireEdu: 'university' },
  { id: 'accountant',   name: '会计/审计',  category: 'business', wealthGrow: 6,  happinessGrow: 4,  healthGrow: 0,  requireEdu: 'university' },
  { id: 'consultant',   name: '咨询顾问',   category: 'business', wealthGrow: 9,  happinessGrow: 3,  healthGrow: -3, requireEdu: 'graduate' },
  // 服务/体力类
  { id: 'service',    name: '服务业人员', category: 'service',  wealthGrow: 2,  happinessGrow: 4,  healthGrow: 1,  requireEdu: 'middle' },
  { id: 'worker',     name: '工厂/建筑工', category: 'service',  wealthGrow: 3,  happinessGrow: 2,  healthGrow: -2, requireEdu: 'middle' },
  { id: 'driver',     name: '司机/物流',   category: 'service',  wealthGrow: 3,  happinessGrow: 3,  healthGrow: -1, requireEdu: 'middle' },
  { id: 'chef',       name: '厨师/餐饮',   category: 'service',  wealthGrow: 4,  happinessGrow: 5,  healthGrow: 0,  requireEdu: 'vocational' },
  { id: 'beautician', name: '美容/美发',   category: 'service',  wealthGrow: 4,  happinessGrow: 5,  healthGrow: 0,  requireEdu: 'vocational' },
  { id: 'fitness',    name: '健身教练',   category: 'service',  wealthGrow: 4,  happinessGrow: 6,  healthGrow: 5,  requireEdu: 'vocational' },
  { id: 'photographer', name: '摄影师',    category: 'service',  wealthGrow: 5,  happinessGrow: 6,  healthGrow: 0,  requireEdu: 'vocational' },
  // 公务员/军队
  { id: 'civil_servant', name: '公务员',   category: 'gov',     wealthGrow: 4,  happinessGrow: 6,  healthGrow: 2,  requireEdu: 'university' },
  { id: 'soldier',        name: '军人',     category: 'gov',     wealthGrow: 3,  happinessGrow: 5,  healthGrow: 5,  requireEdu: 'middle' },
  { id: 'police',         name: '警察/消防', category: 'gov',     wealthGrow: 4,  happinessGrow: 5,  healthGrow: 3,  requireEdu: 'middle' },
  { id: 'diplomat',       name: '外交官',   category: 'gov',     wealthGrow: 5,  happinessGrow: 5,  healthGrow: 1,  requireEdu: 'graduate' },
  // 自由职业
  { id: 'freelancer',   name: '自由职业',   category: 'free',    wealthGrow: 5,  happinessGrow: 7,  healthGrow: 1,  requireEdu: 'high' },
  { id: 'streamer',     name: '直播/网红',  category: 'free',    wealthGrow: 6,  happinessGrow: 5,  healthGrow: -2, requireEdu: 'high' },
  { id: 'gamer',        name: '电竞选手',   category: 'free',    wealthGrow: 7,  happinessGrow: 6,  healthGrow: -3, requireEdu: 'high' },
  { id: 'musician',     name: '音乐人',     category: 'free',    wealthGrow: 5,  happinessGrow: 8,  healthGrow: 0,  requireEdu: 'vocational' },
  // 农业/自然
  { id: 'farmer_career', name: '农民/农业',  category: 'nature',  wealthGrow: 2,  happinessGrow: 5,  healthGrow: 3,  requireEdu: 'none' },
  { id: 'veterinarian', name: '兽医',      category: 'nature',  wealthGrow: 5,  happinessGrow: 6,  healthGrow: 2,  requireEdu: 'graduate' },
  { id: 'environmental', name: '环保工作者', category: 'nature', wealthGrow: 3,  happinessGrow: 6, healthGrow: 3, requireEdu: 'university' }
]

// ─── 随机事件库（含选择分支）────────────────────────────────
// 每个事件可选字段：
//   text: 描述
//   choices: [{ text, effect, wisdomGain? }]  ← 有选择分支
//   effect: { ... }                           ← 无选择，直接生效
//   conditions: { ... }                       ← 条件触发
//   weight: 出现权重（默认1）

export const lifeEvents = {

  // ── 婴儿期（0-2岁）───────────────────────────────────────
  baby: [
    { text: '你学会了走路，迈出人生第一步！全家人为你鼓掌', effect: { health: 5, happiness: 5 } },
    { text: '你第一次叫出"爸爸/妈妈"，父母感动得热泪盈眶', effect: { happiness: 10, social: 3 } },
    { text: '你发了一场高烧，全家人焦急万分', effect: { health: -8, happiness: -5 } },
    { text: '你学会了用勺子自己吃饭，妈妈给你竖大拇指', effect: { health: 3, happiness: 5, wisdom: 3 } },
    { text: '你家迎来了一只可爱的小狗/小猫，你开心极了', effect: { happiness: 12, charm: 3 } },
    {
      text: '你到了该上幼儿园的年纪，父母在纠结选哪一家...',
      choices: [
        { text: '选贵的私立幼儿园（家境好才行）', effect: { wealth: -10, education: 8, happiness: 5 }, condition: { minWealth: 50 } },
        { text: '选普通公立幼儿园', effect: { education: 3, happiness: 3 } },
        { text: '再等一年，在家自己带', effect: { happiness: -3, wealth: 5 } }
      ]
    }
  ],

  // ── 幼儿期（3-5岁）───────────────────────────────────────
  toddlder: [
    { text: '你在幼儿园交到了第一个好朋友', effect: { happiness: 10, social: 8 } },
    { text: '你因为抢玩具和小朋友打了一架', effect: { happiness: -5, social: -5, wisdom: 3 } },
    { text: '你展现出了在某个方面的天赋，老师建议重点培养', effect: { intelligence: 8, happiness: 8 } },
    {
      text: '父母问你：想学什么兴趣班？',
      choices: [
        { text: '学钢琴/乐器', effect: { charm: 10, intelligence: 5, wealth: -8 } },
        { text: '学画画', effect: { creativity: 10, charm: 5, happiness: 5 } },
        { text: '学跆拳道/武术', effect: { health: 10, social: 3 } },
        { text: '不学了，玩就好了', effect: { happiness: 8, intelligence: -3 } }
      ]
    },
    { text: '你第一次在舞台上表演节目，紧张但兴奋', effect: { charm: 8, happiness: 10, social: 5 } },
    { text: '你养的小宠物走丢了，你哭了好几天', effect: { happiness: -12, wisdom: 5 } }
  ],

  // ── 童年（6-11岁）────────────────────────────────────────
  child: [
    { text: '你入学了，背着新书包走进校门', effect: { education: 5, happiness: 5 } },
    { text: '你在班上考了第一名，老师当众表扬了你', effect: { intelligence: 8, happiness: 10, social: 3 } },
    { text: '你被高年级的同学欺负了，不敢告诉家人', effect: { happiness: -12, health: -5, wisdom: 5 } },
    { text: '你参加了学校的绘画/作文/数学竞赛并获奖', effect: { intelligence: 10, happiness: 12, charm: 5 } },
    { text: '你学会了骑自行车/游泳，觉得自己长大了', effect: { health: 8, happiness: 10, wisdom: 3 } },
    { text: '你的爷爷/奶奶给你讲了很多过去的故事', effect: { wisdom: 10, happiness: 5 } },
    { text: '你家迎来了新成员——弟弟或妹妹出生了', effect: { happiness: 8, social: 5 } },
    {
      text: '你发现父母偷偷看你的日记，你感到被侵犯了隐私',
      choices: [
        { text: '当面质问他们', effect: { happiness: -8, social: -5 }, wisdomGain: 3 },
        { text: '默默开始写加密日记', effect: { wisdom: 8, intelligence: 3 } },
        { text: '假装不知道，但开始疏远父母', effect: { happiness: -10, social: -8 } }
      ]
    },
    { text: '你在院子里和小伙伴搭了一个秘密基地', effect: { happiness: 12, creativity: 8, social: 8 } },
    { text: '你的宠物去世了，你第一次体会到失去的痛苦', effect: { happiness: -15, wisdom: 8 } }
  ],

  // ── 青春期（12-17岁）─────────────────────────────────────
  teen: [
    { text: '你进入了初中/高中，课程突然变难了', effect: { intelligence: 5, happiness: -3 } },
    { text: '你暗恋上了班上的一个同学，心跳加速', effect: { happiness: 12, charm: 5, social: 3 } },
    { text: '你的暗恋对象和你说话了！你一整天都飘飘然的', effect: { happiness: 18, charm: 8 } },
    { text: '你收到了人生第一封情书，手抖得厉害', effect: { happiness: 15, charm: 5, social: 5 } },
    { text: '你和父母因为成绩/择友问题大吵了一架', effect: { happiness: -12, wisdom: 5 } },
    {
      text: '你的好朋友突然不理你了，传言说你在背后说坏话',
      choices: [
        { text: '主动找他对质，把话说清楚', effect: { social: 8, wisdom: 5 }, wisdomGain: 5 },
        { text: '假装不在意，慢慢找新朋友', effect: { happiness: -5, social: -3 }, wisdomGain: 8 },
        { text: '在班里哭了一场，大家都来安慰你', effect: { happiness: -3, social: 10 }, wisdomGain: 3 }
      ]
    },
    { text: '你沉迷于一款网络游戏，成绩开始下滑', effect: { intelligence: -10, happiness: 5, health: -5 } },
    { text: '你在中考/高考中超常发挥，考上了理想学校', effect: { education: 15, intelligence: 8, happiness: 20 } },
    { text: '你考试失利，与理想学校失之交臂', effect: { education: -5, happiness: -18, wisdom: 10 } },
    {
      text: '有人向你表白了，你其实也喜欢对方——要答应吗？',
      choices: [
        { text: '答应，偷偷在一起', effect: { happiness: 20, charm: 8, social: 5 } },
        { text: '拒绝，现在要以学业为重', effect: { happiness: -8, intelligence: 5 }, wisdomGain: 8 },
        { text: '说自己需要考虑一下', effect: { happiness: 5, wisdom: 5 } }
      ]
    },
    { text: '你开始思考：我到底想成为什么样的人？', effect: { wisdom: 12, intelligence: 5 } },
    { text: '你和初恋在放学路上牵了手，觉得整个世界都亮了', effect: { happiness: 22, charm: 10 } },
    { text: '初恋因为升学/异地和你分手了，你伤心了好久', effect: { happiness: -20, wisdom: 10, social: -5 } },
    { text: '你参加了学校的辩论队/文学社/篮球队，找到了归属', effect: { social: 12, happiness: 10, health: 5 } },
    { text: '你第一次偷偷喝酒/抽烟，觉得大人也不过如此', effect: { health: -8, wisdom: -3, happiness: 3 } },
    { text: '爷爷/奶奶生病住院了，你第一次直面衰老和疾病', effect: { happiness: -12, wisdom: 10, social: 3 } }
  ],

  // ── 青年（18-34岁）────────────────────────────────────────
  youth: [
    { text: '你考上了大学，离开家乡，开始了独立生活', effect: { education: 15, happiness: 15, social: 10 } },
    { text: '你在大学里加入了社团，认识了一群志同道合的朋友', effect: { social: 15, happiness: 12, charm: 8 } },
    { text: '你在大学里谈了一场轰轰烈烈的恋爱', effect: { happiness: 20, charm: 10, social: 8 } },
    { text: '你毕业了，开始找工作，屡屡碰壁', effect: { wealth: -5, happiness: -10, wisdom: 5 } },
    {
      text: '你拿到了两个工作offer，需要做出选择：',
      choices: [
        { text: '选高薪但加班多的大厂', effect: { wealth: 15, health: -8, happiness: 3 } },
        { text: '选稳定但工资一般的国企/公务员', effect: { wealth: 8, health: 5, happiness: 8 } },
        { text: '选有前景但工资低的创业公司', effect: { wealth: 5, happiness: 5, wisdom: 10 } }
      ]
    },
    { text: '你遇到了那个让你想共度一生的人', effect: { happiness: 25, charm: 10, social: 5 } },
    { text: '你创业了！但前半年没有任何收入', effect: { wealth: -20, happiness: -8, wisdom: 12 } },
    { text: '你的创业项目拿到了天使投资！', effect: { wealth: 25, happiness: 20, social: 10 } },
    { text: '你创业失败了，欠了一笔债，但收获了经验', effect: { wealth: -25, happiness: -15, wisdom: 18, intelligence: 5 } },
    { text: '你在工作中被领导当众批评，觉得很丢脸', effect: { happiness: -10, wisdom: 5, intelligence: 3 } },
    { text: '你升职了！工资涨了一大截', effect: { wealth: 18, happiness: 15, social: 5 } },
    { text: '你被公司裁员了，突然失去了经济来源', effect: { wealth: -15, happiness: -18, health: -5, wisdom: 8 } },
    { text: '你和大学时的恋人步入婚姻殿堂，所有人都来祝福', effect: { happiness: 28, wealth: -15, social: 15 } },
    { text: '你买房了！虽然背上了几十年的贷款', effect: { wealth: -20, happiness: 12, wisdom: 5 } },
    { text: '你经历了一次刻骨铭心的分手/离婚', effect: { happiness: -25, wisdom: 15, social: -8 } },
    {
      text: '你的配偶/恋人向你求婚了，你...',
      choices: [
        { text: '激动地答应了！', effect: { happiness: 28, social: 10 } },
        { text: '犹豫了，说需要再想想', effect: { happiness: -5, wisdom: 10 } },
        { text: '拒绝了，觉得自己还没准备好', effect: { happiness: -15, wisdom: 12, social: -10 } }
      ]
    },
    { text: '你的第一个孩子出生了，你抱着小小的人儿泪流满面', effect: { happiness: 25, wealth: -12, wisdom: 10 } },
    { text: '父亲/母亲生病了，你需要在工作和家庭之间奔波', effect: { wealth: -10, happiness: -10, health: -5, wisdom: 12 } },
    { text: '你在一次行业会议上遇到了改变你职业轨迹的贵人', effect: { wealth: 15, social: 10, wisdom: 8 } },
    { text: '你最好的朋友因为误会和你决裂了', effect: { happiness: -18, social: -15, wisdom: 10 } },
    { text: '你开始脱发/发福，突然意识到自己不再年轻', effect: { health: -8, happiness: -8, wisdom: 8 } }
  ],

  // ── 中年（35-59岁）────────────────────────────────────────
  middle: [
    { text: '你的孩子上学了，你开始操心他们的教育问题', effect: { wealth: -8, happiness: 5, wisdom: 5 } },
    { text: '你在事业上遇到了瓶颈，开始怀疑自己的选择', effect: { happiness: -12, wisdom: 10, intelligence: 5 } },
    { text: '你升到了公司高管，但工作压力让你喘不过气', effect: { wealth: 20, happiness: -8, health: -10 } },
    { text: '你的孩子在学校被欺负/成绩下滑，你很焦虑', effect: { happiness: -10, wealth: -5, wisdom: 5 } },
    { text: '你开始注重养生，每天晨跑/瑜伽/泡脚', effect: { health: 15, happiness: 8, wisdom: 5 } },
    { text: '你的婚姻进入了平淡期，和配偶越来越少交流', effect: { happiness: -12, social: -5, wisdom: 8 } },
    {
      text: '你遇到了婚外情的诱惑，对方对你很有好感...',
      choices: [
        { text: '克制住，选择忠于家庭', effect: { happiness: 5, wisdom: 15, social: 3 } },
        { text: '陷入婚外情，享受禁忌的刺激', effect: { happiness: 10, social: -15, wisdom: -5 } },
        { text: '向配偶坦白，尝试挽救婚姻', effect: { happiness: -10, social: -10, wisdom: 12 } }
      ]
    },
    { text: '你的父亲/母亲去世了，你第一次直面至亲的离去', effect: { happiness: -30, wisdom: 20, social: 5 } },
    { text: '你和配偶决定一起去婚姻咨询，关系开始修复', effect: { happiness: 15, social: 8, wisdom: 10 } },
    { text: '你的孩子考上了好大学，你比自己考上还激动', effect: { happiness: 22, wealth: -10, wisdom: 5 } },
    { text: '你被诊断出有慢性病，需要长期服药和调理', effect: { health: -20, happiness: -15, wealth: -10, wisdom: 12 } },
    { text: '你终于把房贷还清了，房子真正属于你了', effect: { wealth: 10, happiness: 20, wisdom: 8 } },
    { text: '你的老同学聚会，发现有人已经离世了', effect: { happiness: -15, wisdom: 15 } },
    { text: '你的孩子离家上大学/工作，家里突然空了', effect: { happiness: -10, wisdom: 8, social: -3 } },
    { text: '你开始规划退休后的生活，有很多想做的事', effect: { happiness: 10, wisdom: 10 } },
    { text: '你和配偶选择了和平离婚，好聚好散', effect: { happiness: -10, wealth: -15, social: -5, wisdom: 15 } },
    { text: '你决定提前退休/辞职，去追求年轻时未完成的梦想', effect: { wealth: -15, happiness: 15, wisdom: 12 } },
    { text: '你的老朋友突然拜访，你们聊到深夜', effect: { happiness: 15, social: 10, wisdom: 5 } },
    { text: '你在工作中遇到了一个欣赏你的贵人', effect: { wealth: 10, social: 10, wisdom: 5 } },
    { text: '你的孩子给你带来了一件让你哭笑不得的麻烦', effect: { happiness: -5, wealth: -5, wisdom: 8 } },
    { text: '你和配偶来了一次久违的旅行，找回了年轻时的感觉', effect: { happiness: 18, health: 5, wealth: -10, social: 8 } },
    { text: '你在工作中遇到了强劲的竞争对手', effect: { intelligence: 8, happiness: -5, wisdom: 5 } },
    { text: '你开始学习一门新技能，发现人生永远不晚', effect: { intelligence: 10, happiness: 10, wisdom: 8 } },
    { text: '你的一位朋友经历了重大变故，你一直在陪伴', effect: { social: 15, happiness: -5, wisdom: 10 } },
    { text: '你的身体开始出现各种小毛病，你更关注健康了', effect: { health: -5, wisdom: 10, happiness: -3 } },
    { text: '你在社区里认识了一群新朋友，开始参加各种活动', effect: { social: 15, happiness: 12, health: 5 } },
    { text: '你的孩子结婚/订婚了，你感慨自己真的老了', effect: { happiness: 20, wealth: -15, wisdom: 10 } },
    { text: '你尝试了新发型/新衣服，感觉重新年轻了', effect: { happiness: 10, charm: 5 } },
    { text: '你决定放下过去的恩怨，原谅了一个曾经伤害过你的人', effect: { happiness: 15, wisdom: 20, social: 5 } },
    { text: '你在工作中遇到了一次严重的挫折，但你没有放弃', effect: { happiness: -10, wisdom: 15, intelligence: 5 } },
    { text: '你发现自己对某件事的热爱从未减退', effect: { happiness: 15, creativity: 10, wisdom: 5 } }
  ],

  // ── 老年（60岁+）──────────────────────────────────────────
  elder: [
    { text: '你正式退休了，告别了几十年的工作岗位', effect: { happiness: 10, health: -5, wealth: -5 } },
    { text: '你的孙子/孙女出生了，你高兴得合不拢嘴', effect: { happiness: 22, social: 8, wisdom: 5 } },
    { text: '你开始写回忆录，梳理自己的一生', effect: { wisdom: 15, happiness: 10, intelligence: 8 } },
    { text: '你的老伴去世了，你一个人坐在空荡荡的房子里', effect: { happiness: -35, health: -15, social: -10, wisdom: 20 } },
    { text: '你被诊断出患有阿尔茨海默症/帕金森，记忆开始模糊', effect: { health: -25, happiness: -20, wisdom: -10 } },
    { text: '你的子女轮流来照顾你，你感到很欣慰', effect: { happiness: 18, social: 10, health: 5 } },
    { text: '你参加了一位老朋友的葬礼，开始思考自己的终点', effect: { happiness: -18, wisdom: 18, health: -5 } },
    { text: '你在养老院里认识了新的朋友，一起下棋/跳舞/聊天', effect: { happiness: 15, social: 12, health: 5 } },
    { text: '你整理了一生的照片和信件，往事一幕幕涌上心头', effect: { happiness: 12, wisdom: 15 } },
    { text: '你重访了年轻时去过的地方，物是人非，感慨万千', effect: { happiness: 8, wisdom: 18, social: 3 } },
    { text: '你的一个子女离婚了，带着孩子回到你身边', effect: { happiness: -10, social: 5, wisdom: 8 } },
    {
      text: '医生告诉你，你的时间可能不多了。你最后想...',
      choices: [
        { text: '把所有人聚在一起，好好告别', effect: { happiness: 10, social: 15, wisdom: 20 } },
        { text: '一个人静静地回顾一生，写最后一封信', effect: { wisdom: 25, intelligence: 10, happiness: 5 } },
        { text: '完成一个年轻时的未完成的心愿', effect: { happiness: 15, wisdom: 15, charm: 5 } }
      ]
    },
    { text: '你终于和年轻时闹翻的亲友和解了，放下了心头大石', effect: { happiness: 20, social: 15, wisdom: 15 } },
    { text: '你在睡梦中平静地离开了这个世界，嘴角带着微笑', effect: { health: -100 } },
    { text: '你学会了用智能手机，和孙子孙女视频聊天', effect: { happiness: 15, social: 10, intelligence: 5 } },
    { text: '你在老年大学学习了书法/绘画/音乐', effect: { creativity: 10, happiness: 12, social: 8 } },
    { text: '你和老伴一起环游了全国，完成了年轻时的约定', effect: { happiness: 20, health: -5, wealth: -10, wisdom: 10 } },
    { text: '你把一生的经验传授给了年轻人，成了他们的导师', effect: { wisdom: 15, social: 10, happiness: 10 } },
    { text: '你的一次体检发现了早期癌症，及时治疗成功', effect: { health: -10, happiness: 5, wealth: -15, wisdom: 10 } },
    { text: '你在社区里当起了志愿者，帮助其他老人', effect: { social: 15, happiness: 15, health: 5 } },
    { text: '你的配偶身体不好，你开始照顾他/她', effect: { happiness: -5, health: -5, social: 5, wisdom: 10 } },
    { text: '你整理了遗嘱，把一切都安排妥当', effect: { wisdom: 15, happiness: 5 } },
    { text: '你收到了一封多年前的信，是一位故人留下的', effect: { happiness: 10, wisdom: 10 } },
    { text: '你在公园里遇到了一位老友，聊了一下午', effect: { happiness: 18, social: 15, health: 3 } },
    { text: '你的孩子带你去看了你的曾孙，四世同堂', effect: { happiness: 25, social: 15, wisdom: 8 } },
    { text: '你坚持每天锻炼，身体比同龄人好很多', effect: { health: 15, happiness: 10 } },
    { text: '你开始练习冥想，内心越来越平静', effect: { wisdom: 15, happiness: 10, health: 5 } },
    { text: '你把自己收藏了一辈子的东西捐给了博物馆', effect: { happiness: 15, social: 20, wisdom: 10 } },
    { text: '你重温了年轻时写的日记，笑着笑着就哭了', effect: { happiness: 8, wisdom: 12, creativity: 5 } },
    { text: '你在这个年纪学会了游泳，感受到了久违的自由', effect: { health: 10, happiness: 15, wisdom: 5 } }
  ]
}

// ─── 特殊/稀有事件（1-3%概率触发）────────────────────────
// 这些事件会在 generateEvent 中有概率插入
export const specialEvents = [
  {
    id: 'lottery_win',
    name: '中大奖',
    text: '你买了一张彩票，竟然中了大奖！一夜之间，人生轨迹改变了',
    effect: { wealth: 50, happiness: 20, social: 10 },
    probability: 0.01,  // 1% 概率
    conditions: { maxAge: 70 }
  },
  {
    id: 'accident',
    name: '意外事故',
    text: '你遭遇了一场严重意外/车祸，在鬼门关走了一遭',
    effect: { health: -30, wealth: -15, happiness: -15, wisdom: 15 },
    probability: 0.02,
    conditions: { minAge: 18, maxAge: 80 }
  },
  {
    id: 'inheritance',
    name: '意外遗产',
    text: '一位你从未谋面的远房亲戚留下了遗产给你',
    effect: { wealth: 30, happiness: 10 },
    probability: 0.015,
    conditions: { minAge: 25 }
  },
  {
    id: 'fame',
    name: '一夜成名',
    text: '你因为一件事在网络上走红，突然被很多人知道',
    effect: { charm: 20, social: 20, happiness: 15, wealth: 10 },
    probability: 0.01,
    conditions: { minAge: 16, maxAge: 60 }
  },
  {
    id: 'betrayal',
    name: '好友背叛',
    text: '你最信任的朋友背叛了你，卷走了你的钱财/感情',
    effect: { wealth: -20, happiness: -25, social: -20, wisdom: 18 },
    probability: 0.02,
    conditions: { minAge: 20, maxAge: 70 }
  },
  {
    id: 'miracle_health',
    name: '奇迹康复',
    text: '医生断言你无法康复，但你凭借意志力奇迹般好转了',
    effect: { health: 30, happiness: 25, wisdom: 15 },
    probability: 0.01,
    conditions: { minAge: 30, minHealth: 20 }
  },
  {
    id: 'reunion',
    name: '失散亲人重逢',
    text: '你找到了失散多年的亲人/童年好友，相拥而泣',
    effect: { happiness: 28, social: 15, wisdom: 12 },
    probability: 0.015,
    conditions: { minAge: 25 }
  }
]

// ─── 成就系统 ────────────────────────────────────────────────
export const achievementsList = [
  // 财富类
  { id: 'rich1', name: '小有积蓄',   description: '财富达到 60',   condition: { wealth: 60 } },
  { id: 'rich2', name: '财务自由',   description: '财富达到 85',   condition: { wealth: 85 } },
  { id: 'rich3', name: '亿万富翁',   description: '财富达到 100',  condition: { wealth: 100 } },
  // 幸福类
  { id: 'happy1', name: '知足常乐', description: '幸福达到 70',   condition: { happiness: 70 } },
  { id: 'happy2', name: '幸福美满', description: '幸福达到 90',   condition: { happiness: 90 } },
  // 健康类
  { id: 'health1', name: '身体倍棒', description: '健康达到 80',   condition: { health: 80 } },
  { id: 'health2', name: '长命百岁', description: '活到 100 岁',  condition: { age: 100 } },
  // 智慧类
  { id: 'wise1', name: '小有智慧',   description: '智慧达到 60',   condition: { wisdom: 60 } },
  { id: 'wise2', name: '智慧通达',   description: '智慧达到 85',   condition: { wisdom: 85 } },
  // 社交类
  { id: 'social1', name: '人缘不错', description: '社交达到 60',   condition: { social: 60 } },
  { id: 'social2', name: '社交达人', description: '社交达到 85',   condition: { social: 85 } },
  // 魅力类
  { id: 'charm1', name: '小有魅力', description: '魅力达到 60',   condition: { charm: 60 } },
  { id: 'charm2', name: '魅力四射', description: '魅力达到 85',   condition: { charm: 85 } },
  // 特殊经历
  { id: 'married1',  name: '执子之手',     description: '结婚',         condition: { flag: 'married' } },
  { id: 'child1',    name: '为人父母',     description: '有孩子',         condition: { flag: 'has_child' } },
  { id: 'entrepreneur1', name: '创业先锋', description: '创业过',       condition: { flag: 'is_entrepreneur' } },
  { id: 'graduate1',    name: '学识渊博', description: '研究生学历',   condition: { eduLevel: 'graduate' } },
  { id: 'trauma1',  name: '历经沧桑',     description: '智慧≥80且经历过重大挫折', condition: { wisdom: 80 } },
  { id: 'lottery',  name: '天选之子',     description: '中过大奖',       condition: { flag: 'won_lottery' } },
  { id: 'fame',    name: '一夜成名',     description: '经历过 fame 事件', condition: { flag: 'became_famous' } }
]
