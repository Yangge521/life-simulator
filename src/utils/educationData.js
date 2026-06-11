// ============================================================
// 人生模拟器 - 教育系统（深度版）
// 含：专业选择、课外活动、留学、竞赛、学校质量影响
// ============================================================

// ─── 教育阶段 ──────────────────────────────────────────────
export const educationStages = [
  {
    id: 'kindergarten',
    name: '幼儿园',
    ageRange: [3, 6],
    icon: '🎒',
    weight: 1,
    events: [
      { text: '你在幼儿园学会了唱歌跳舞', effect: { creativity: 5, happiness: 5 } },
      { text: '你交到了人生第一个朋友', effect: { social: 10, happiness: 10 } },
      { text: '你不想去幼儿园，哭闹不止', effect: { happiness: -5 } },
      { text: '你在幼儿园表演节目，获得掌声', effect: { charm: 5, happiness: 8 } },
      { text: '你和小朋友抢玩具打架了', effect: { social: -5, wisdom: 2 } },
      { text: '老师表扬你画画很有天赋', effect: { creativity: 8, happiness: 5 } },
      { text: '你在午睡时尿床了，被同学嘲笑', effect: { happiness: -8, social: -3 } },
      { text: '你学会了骑自行车', effect: { health: 5, happiness: 5 } }
    ]
  },
  {
    id: 'primary',
    name: '小学',
    ageRange: [7, 12],
    icon: '📚',
    weight: 1,
    events: [
      { text: '你在期末考试中名列前茅', effect: { intelligence: 10, happiness: 10 } },
      { text: '你当选了班长', effect: { social: 10, charm: 5 } },
      { text: '你被老师批评了', effect: { happiness: -10 } },
      { text: '你参加了奥数竞赛并获奖', effect: { intelligence: 15, happiness: 10 } },
      { text: '你在运动会上获得了第一名', effect: { health: 10, happiness: 10 } },
      { text: '你被同学欺负了', effect: { happiness: -15, social: -5 }, choices: [
        { text: '告诉老师', effect: { wisdom: 5, social: 5 } },
        { text: '打回去', effect: { health: -5, charm: 5 } },
        { text: '默默忍受', effect: { happiness: -10, wisdom: 3 } }
      ]},
      { text: '你加入了学校合唱团', effect: { creativity: 5, social: 5, happiness: 5 } },
      { text: '你发现了自己对科学的兴趣', effect: { intelligence: 8, creativity: 5 } },
      { text: '你偷偷养了一只小动物', effect: { happiness: 8, wisdom: 3 } },
      { text: '你和最好的朋友闹翻了', effect: { happiness: -12, social: -5 }, choices: [
        { text: '主动道歉和好', effect: { social: 8, wisdom: 5 } },
        { text: '就此疏远', effect: { happiness: -5 } }
      ]},
      { text: '你在作文比赛中获得一等奖', effect: { creativity: 10, intelligence: 5, happiness: 10 } },
      { text: '你开始沉迷手机游戏', effect: { intelligence: -8, health: -5, happiness: 5 }, choices: [
        { text: '继续玩', effect: { happiness: 5, intelligence: -5, health: -3 } },
        { text: '控制时间', effect: { wisdom: 8 } }
      ]}
    ]
  },
  {
    id: 'middle',
    name: '初中',
    ageRange: [13, 15],
    icon: '📖',
    weight: 1,
    events: [
      { text: '你进入了重点班', effect: { intelligence: 10, education: 10 } },
      { text: '你开始叛逆，和父母关系紧张', effect: { happiness: -10, wisdom: 5 } },
      { text: '你在中考中发挥出色', effect: { intelligence: 10, education: 15 } },
      { text: '你沉迷网络游戏，成绩下滑', effect: { intelligence: -10, health: -5 } },
      { text: '你暗恋了同班的同学', effect: { happiness: 5, charm: 3 }, choices: [
        { text: '写情书表白', effect: { charm: 5 }, chanceRisk: { happiness: { fail: -10, success: 15 } } },
        { text: '藏在心里', effect: { wisdom: 3, happiness: -3 } }
      ]},
      { text: '你参加了科技创新大赛', effect: { intelligence: 10, creativity: 8 } },
      { text: '你被选为校篮球队成员', effect: { health: 10, social: 8, happiness: 5 } },
      { text: '你和死党一起逃课被抓了', effect: { happiness: -5, education: -5, wisdom: 3 } },
      { text: '你的成绩突然大幅进步', effect: { intelligence: 12, happiness: 10, education: 8 } },
      { text: '你开始学习一门乐器', effect: { creativity: 8, happiness: 5, charm: 3 } }
    ]
  },
  {
    id: 'high',
    name: '高中',
    ageRange: [16, 18],
    icon: '🎓',
    weight: 1.5,
    events: [
      { text: '你考入了省重点高中', effect: { education: 15, happiness: 10 } },
      { text: '你在高考中超常发挥', effect: { intelligence: 10, education: 20, happiness: 20 } },
      { text: '你高考失利，选择复读', effect: { happiness: -15, wisdom: 10 }, choices: [
        { text: '复读一年', effect: { education: 10, intelligence: 5, happiness: -10 } },
        { text: '接受现实去普通大学', effect: { wisdom: 5 } },
        { text: '直接工作', effect: { wealth: 5, education: -5 } }
      ]},
      { text: '你参加了学科竞赛获得保送资格', effect: { education: 25, happiness: 15 } },
      { text: '你高考压力太大，失眠了好一阵', effect: { health: -8, happiness: -10 } },
      { text: '你和同学组队参加了创业大赛', effect: { creativity: 8, social: 8, intelligence: 5 } },
      { text: '你开始思考人生方向', effect: { wisdom: 10 } },
      { text: '你谈了一场懵懂的恋爱', effect: { happiness: 15, charm: 5 }, choices: [
        { text: '努力学习同时维持感情', effect: { wisdom: 5, happiness: 5 } },
        { text: '全身心投入恋爱', effect: { happiness: 10, intelligence: -8 } },
        { text: '为了学习分手', effect: { education: 5, happiness: -8, wisdom: 5 } }
      ]},
      { text: '你被评为三好学生', effect: { education: 8, social: 5, happiness: 5 } },
      { text: '你第一次参加社会实践', effect: { wisdom: 8, social: 5, wealth: 3 } }
    ]
  },
  {
    id: 'university',
    name: '大学',
    ageRange: [19, 22],
    icon: '🏛️',
    weight: 2,
    events: [
      { text: '你考入了985名校', effect: { education: 20, happiness: 15, social: 10 } },
      { text: '你考入了普通本科', effect: { education: 10, happiness: 5 } },
      { text: '你选择了专科学校', effect: { education: 5 } },
      { text: '你获得了奖学金', effect: { wealth: 10, happiness: 10 } },
      { text: '你参加了社团活动，认识了很多朋友', effect: { social: 15, happiness: 10 } },
      { text: '你开始创业，虽然失败但收获经验', effect: { wisdom: 15, wealth: -10 } },
      { text: '你谈了一场认真的恋爱', effect: { happiness: 15, charm: 5, social: 5 } },
      { text: '你在学生会当上了主席', effect: { social: 15, charm: 8, leadership: 10 } },
      { text: '你挂科了，需要补考', effect: { education: -5, happiness: -10, intelligence: -3 }, chance: 0.1 },
      { text: '你参加了全国大学生数学建模竞赛', effect: { intelligence: 12, creativity: 5 } },
      { text: '你开始做兼职赚生活费', effect: { wealth: 8, wisdom: 5, social: 3 } },
      { text: '你决定考研', effect: { education: 8, intelligence: 5 }, choices: [
        { text: '全力备考', effect: { education: 10, intelligence: 8, happiness: -5 } },
        { text: '边玩边考', effect: { education: 3, happiness: 5 } },
        { text: '放弃考研直接找工作', effect: { wealth: 5 } }
      ]},
      { text: '大四了，你面临人生的选择：考公、考编还是找工作？', icon: '🏛️', choices: [
        { text: '全力以赴考公务员', effect: { education: 8, intelligence: 5, happiness: -8, wealth: -5 }, flag: 'kaogong_prep' },
        { text: '考事业单位编制', effect: { education: 5, intelligence: 3, happiness: -5, wealth: -3 }, flag: 'kaobian_prep' },
        { text: '考教师编', effect: { education: 6, happiness: -5, wealth: -3 }, flag: 'kaoteacher_prep' },
        { text: '直接去企业上班', effect: { wealth: 10, happiness: 5 } },
        { text: '考研继续深造', effect: { education: 10, intelligence: 5, happiness: -5 } },
        { text: '创业闯一闯', effect: { wealth: -10, creativity: 10, happiness: 5 }, flag: 'entrepreneur_first' }
      ]},
      { text: '你报名了公务员考试，开始刷题备考', effect: { education: 5, happiness: -5, wealth: -2 }, require: { flag: 'kaogong_prep' }, choices: [
        { text: '报了个公考培训班', effect: { education: 10, wealth: -8, intelligence: 3 }, flag: 'kaogong_class' },
        { text: '自己买书刷题', effect: { education: 6, wealth: -2, wisdom: 3 } },
        { text: '和同学组队备考', effect: { education: 7, social: 5, wealth: -1 } }
      ]},
      { text: '你参加了公务员考试', effect: { happiness: -3, wealth: -1 }, require: { flag: 'kaogong_prep' }, choices: [
        { text: '行测发挥很好，期待面试', effect: { education: 5, happiness: 10 }, successRate: 0.25, flag: 'kaogong_written_pass' },
        { text: '发挥一般，可能没戏', effect: { happiness: -5, wisdom: 5 }, flag: 'kaogong_written_fail' },
        { text: '题太难了，几乎没做几道', effect: { happiness: -10, wisdom: 3 }, flag: 'kaogong_written_fail' }
      ]},
      { text: '你参加了事业单位考试', effect: { happiness: -2 }, require: { flag: 'kaobian_prep' }, choices: [
        { text: '笔试成绩不错', effect: { education: 5, happiness: 10 }, successRate: 0.35, flag: 'kaobian_written_pass' },
        { text: '差了一点点', effect: { happiness: -8, wisdom: 5 }, flag: 'kaobian_written_fail' }
      ]},
      { text: '你找到了一份不错的实习', effect: { wealth: 8, education: 5, social: 5 } },
      { text: '你参加了国际交流项目', effect: { social: 10, intelligence: 8, creativity: 5 }, chance: 0.05 },
      { text: '你和室友大吵了一架', effect: { happiness: -10, social: -5 } },
      { text: '你的论文被导师表扬了', effect: { intelligence: 8, education: 8, happiness: 5 }, minYear: 3 }
    ]
  },
  {
    id: 'graduate',
    name: '研究生',
    ageRange: [23, 25],
    icon: '🔬',
    weight: 2,
    events: [
      { text: '你考上了研究生', effect: { education: 15, intelligence: 10 } },
      { text: '你的论文发表在核心期刊', effect: { intelligence: 15, happiness: 10 } },
      { text: '你选择直接工作', effect: { wealth: 10 } },
      { text: '你获得了一次国际学术会议的演讲机会', effect: { social: 10, intelligence: 10, charm: 5 }, chance: 0.05 },
      { text: '你读博了', effect: { education: 15, intelligence: 10, happiness: -5 }, choices: [
        { text: '坚定走学术路线', effect: { education: 10, intelligence: 8, wealth: -5 } },
        { text: '犹豫不决', effect: { happiness: -8, wisdom: 5 } }
      ]},
      { text: '你和导师关系很紧张', effect: { happiness: -15, education: -5 }, chance: 0.08 },
      { text: '你的研究成果被媒体广泛报道', effect: { social: 15, happiness: 15, intelligence: 5 }, chance: 0.03 },
      { text: '读研期间你也参加了公务员考试', effect: { education: 3, happiness: -3, wealth: -2 }, choices: [
        { text: '以应届生身份报考，更有优势', effect: { education: 5, happiness: 5 }, successRate: 0.35, flag: 'kaogong_written_pass' },
        { text: '没有合适岗位，放弃', effect: { wisdom: 3 } }
      ]},
      { text: '导师建议你考公务员或进事业单位', effect: { wisdom: 5 }, choices: [
        { text: '听从建议开始备考', effect: { education: 8, happiness: -5 }, flag: 'kaogong_prep' },
        { text: '坚持走学术路线', effect: { education: 5, intelligence: 5 } },
        { text: '想去企业试试', effect: { wealth: 8, happiness: 5 } }
      ]}
    ]
  },
  {
    id: 'study_abroad',
    name: '留学',
    ageRange: [19, 28],
    icon: '🌍',
    weight: 0.5,
    events: [
      { text: '你获得了出国留学的机会', effect: { education: 15, social: 10, creativity: 5 } },
      { text: '你在异国他乡感到孤独', effect: { happiness: -15, wisdom: 10 }, chance: 0.15 },
      { text: '你适应了国外的生活', effect: { social: 10, happiness: 10, wisdom: 5 } },
      { text: '你获得了国外大学的奖学金', effect: { wealth: 20, education: 10, happiness: 10 }, chance: 0.1 },
      { text: '你参加了国际志愿者活动', effect: { wisdom: 15, social: 10, happiness: 10 }, chance: 0.05 },
      { text: '你在国外遇到了歧视', effect: { happiness: -15, wisdom: 5 }, chance: 0.08 },
      { text: '你学成归国', effect: { education: 15, intelligence: 10, happiness: 5 } },
      { text: '你选择留在国外发展', effect: { wealth: 15, social: -10, happiness: 5 }, choices: [
        { text: '努力融入当地', effect: { social: 10, happiness: 5, wisdom: 5 } },
        { text: '保持华人圈子', effect: { social: 5, happiness: 3 } }
      ]}
    ]
  }
]

// ─── 大学专业 ──────────────────────────────────────────────
export const majors = [
  // 理科
  { id: 'cs', name: '计算机科学', category: 'science', bonus: { intelligence: 10 }, careerBonus: ['programmer', 'ai_engineer', 'cybersecurity'] },
  { id: 'math', name: '数学', category: 'science', bonus: { intelligence: 12 }, careerBonus: ['investment_analyst', 'professor'] },
  { id: 'physics', name: '物理学', category: 'science', bonus: { intelligence: 12, creativity: 5 }, careerBonus: ['professor', 'ai_engineer'] },
  { id: 'chemistry', name: '化学', category: 'science', bonus: { intelligence: 10 }, careerBonus: ['pharmacist', 'professor'] },
  { id: 'biology', name: '生物', category: 'science', bonus: { intelligence: 10 }, careerBonus: ['doctor', 'professor'] },
  { id: 'ee', name: '电子工程', category: 'science', bonus: { intelligence: 10, creativity: 3 }, careerBonus: ['programmer', 'ai_engineer'] },
  // 文科
  { id: 'law', name: '法学', category: 'liberal', bonus: { intelligence: 8, wisdom: 5 }, careerBonus: ['lawyer', 'civil_servant'] },
  { id: 'economics', name: '经济学', category: 'liberal', bonus: { intelligence: 8, wisdom: 3 }, careerBonus: ['investment_analyst', 'banker', 'accountant'] },
  { id: 'literature', name: '中文', category: 'liberal', bonus: { creativity: 10, intelligence: 5 }, careerBonus: ['writer', 'teacher', 'freelancer'] },
  { id: 'history', name: '历史', category: 'liberal', bonus: { wisdom: 10, intelligence: 5 }, careerBonus: ['professor', 'civil_servant'] },
  { id: 'philosophy', name: '哲学', category: 'liberal', bonus: { wisdom: 12 }, careerBonus: ['professor', 'writer'] },
  { id: 'foreign_lang', name: '外语', category: 'liberal', bonus: { intelligence: 5, charm: 8 }, careerBonus: ['freelancer', 'civil_servant'] },
  // 商科
  { id: 'business', name: '工商管理', category: 'business', bonus: { charm: 8, intelligence: 5 }, careerBonus: ['entrepreneur', 'product_manager', 'banker'] },
  { id: 'finance', name: '金融学', category: 'business', bonus: { intelligence: 8 }, careerBonus: ['investment_analyst', 'banker', 'accountant'] },
  { id: 'marketing', name: '市场营销', category: 'business', bonus: { charm: 10, creativity: 5 }, careerBonus: ['product_manager', 'real_estate', 'streamer'] },
  { id: 'accounting', name: '会计', category: 'business', bonus: { intelligence: 8 }, careerBonus: ['accountant', 'banker'] },
  // 医学
  { id: 'clinical_med', name: '临床医学', category: 'medical', bonus: { intelligence: 12, wisdom: 3 }, careerBonus: ['doctor'] },
  { id: 'nursing', name: '护理学', category: 'medical', bonus: { wisdom: 5, health: 3 }, careerBonus: ['nurse'] },
  { id: 'pharmacy', name: '药学', category: 'medical', bonus: { intelligence: 10 }, careerBonus: ['pharmacist'] },
  // 艺术
  { id: 'fine_art', name: '美术', category: 'art', bonus: { creativity: 15 }, careerBonus: ['artist', 'director', 'freelancer'] },
  { id: 'music', name: '音乐', category: 'art', bonus: { creativity: 12, charm: 5 }, careerBonus: ['musician', 'teacher'] },
  { id: 'film', name: '影视', category: 'art', bonus: { creativity: 12, charm: 3 }, careerBonus: ['director', 'streamer'] },
  { id: 'design', name: '设计', category: 'art', bonus: { creativity: 12, intelligence: 3 }, careerBonus: ['artist', 'freelancer', 'programmer'] },
  // 教育
  { id: 'education', name: '教育学', category: 'education', bonus: { wisdom: 8, charm: 5 }, careerBonus: ['teacher', 'professor'] },
  { id: 'pe', name: '体育', category: 'education', bonus: { health: 10, charm: 3 }, careerBonus: ['teacher', 'soldier'] },
  // 军警
  { id: 'military', name: '军事学', category: 'military', bonus: { health: 8, wisdom: 3 }, careerBonus: ['soldier', 'police'] },
  { id: 'police_study', name: '公安学', category: 'military', bonus: { health: 5, intelligence: 5 }, careerBonus: ['police'] }
]

// ─── 课外活动 ──────────────────────────────────────────────
export const extracurriculars = [
  { id: 'sports_team', name: '体育社团', icon: '⚽', effect: { health: 10, social: 8, happiness: 5 }, ageRange: [10, 22] },
  { id: 'art_club', name: '美术社', icon: '🎨', effect: { creativity: 10, happiness: 5 }, ageRange: [10, 22] },
  { id: 'music_club', name: '音乐社', icon: '🎵', effect: { creativity: 8, charm: 5, happiness: 5 }, ageRange: [10, 22] },
  { id: 'debate_team', name: '辩论队', icon: '🎤', effect: { intelligence: 8, charm: 8, social: 5 }, ageRange: [14, 22] },
  { id: 'science_club', name: '科学社', icon: '🔬', effect: { intelligence: 10, creativity: 5 }, ageRange: [12, 22] },
  { id: 'volunteer', name: '志愿者', icon: '🤝', effect: { wisdom: 8, social: 8, happiness: 5 }, ageRange: [14, 100] },
  { id: 'student_union', name: '学生会', icon: '🏛️', effect: { social: 12, charm: 8, wisdom: 3 }, ageRange: [15, 22] },
  { id: 'reading_club', name: '读书会', icon: '📖', effect: { intelligence: 8, wisdom: 5 }, ageRange: [10, 100] },
  { id: 'coding_club', name: '编程社', icon: '💻', effect: { intelligence: 10, creativity: 3 }, ageRange: [12, 22] },
  { id: 'drama_club', name: '话剧社', icon: '🎭', effect: { creativity: 8, charm: 8, happiness: 5 }, ageRange: [14, 22] },
  { id: 'chess_club', name: '棋社', icon: '♟️', effect: { intelligence: 8, wisdom: 5 }, ageRange: [8, 100] },
  { id: 'photography', name: '摄影社', icon: '📷', effect: { creativity: 8, happiness: 5 }, ageRange: [12, 100] }
]

// ─── 竞赛体系 ──────────────────────────────────────────────
export const competitions = [
  { id: 'math_olympiad', name: '数学奥赛', icon: '🔢', effect: { intelligence: 15, education: 10, happiness: 10 }, requirement: { intelligence: 70 }, ageRange: [13, 18], rarity: 'rare' },
  { id: 'physics_olympiad', name: '物理奥赛', icon: '⚛️', effect: { intelligence: 15, education: 10 }, requirement: { intelligence: 70 }, ageRange: [13, 18], rarity: 'rare' },
  { id: 'info_olympiad', name: '信息学奥赛', icon: '💻', effect: { intelligence: 15, education: 10, creativity: 5 }, requirement: { intelligence: 65, creativity: 50 }, ageRange: [13, 18], rarity: 'rare' },
  { id: 'essay_contest', name: '作文大赛', icon: '✍️', effect: { creativity: 10, education: 5, happiness: 5 }, requirement: { creativity: 55 }, ageRange: [10, 18], rarity: 'uncommon' },
  { id: 'sports_meet', name: '运动会', icon: '🏃', effect: { health: 10, happiness: 8, social: 5 }, requirement: { health: 55 }, ageRange: [7, 22], rarity: 'common' },
  { id: 'speech_contest', name: '演讲比赛', icon: '🎤', effect: { charm: 10, social: 8, happiness: 5 }, requirement: { charm: 50 }, ageRange: [10, 22], rarity: 'uncommon' },
  { id: 'innovation_contest', name: '创新创业大赛', icon: '💡', effect: { creativity: 10, intelligence: 8, social: 5 }, requirement: { creativity: 55, intelligence: 55 }, ageRange: [16, 25], rarity: 'uncommon' },
  { id: 'robot_contest', name: '机器人竞赛', icon: '🤖', effect: { intelligence: 12, creativity: 8 }, requirement: { intelligence: 60 }, ageRange: [12, 22], rarity: 'rare' },
  { id: 'hackathon', name: '黑客松', icon: '💻', effect: { intelligence: 10, creativity: 8, social: 5 }, requirement: { intelligence: 60, creativity: 50 }, ageRange: [16, 30], rarity: 'uncommon' },
  { id: 'art_exhibition', name: '美术展', icon: '🎨', effect: { creativity: 12, happiness: 8 }, requirement: { creativity: 60 }, ageRange: [10, 25], rarity: 'uncommon' }
]

// ─── 学校类型 ──────────────────────────────────────────────
export const schoolTypes = {
  elite: {
    name: '重点学校',
    educationBonus: 1.5,
    pressureBonus: 1.3,
    socialBonus: 1.2,
    description: '学习氛围浓厚，竞争激烈'
  },
  normal: {
    name: '普通学校',
    educationBonus: 1.0,
    pressureBonus: 1.0,
    socialBonus: 1.0,
    description: '学习生活平衡'
  },
  poor: {
    name: '薄弱学校',
    educationBonus: 0.7,
    pressureBonus: 0.8,
    socialBonus: 0.9,
    description: '资源有限但更自由'
  },
  international: {
    name: '国际学校',
    educationBonus: 1.3,
    pressureBonus: 0.9,
    socialBonus: 1.4,
    description: '国际化视野，费用较高',
    wealthRequirement: 70
  }
}

// ─── 辅助函数 ──────────────────────────────────────────────

/**
 * 根据家庭条件决定学校类型
 */
export function determineSchoolType(familyWealth, familyEducation) {
  const score = (familyWealth + familyEducation) / 2
  if (familyWealth >= 70 && Math.random() < 0.4) return schoolTypes.international
  if (score >= 70) return schoolTypes.elite
  if (score >= 40) return schoolTypes.normal
  return schoolTypes.poor
}

/**
 * 根据属性推荐专业
 */
export function recommendMajors(character) {
  const int = character.intelligence || 50
  const cre = character.creativity || 50
  const cha = character.charm || 50
  const wis = character.wisdom || 50
  const hea = character.health || 50

  return majors.filter(function(m) {
    // 按属性匹配度排序
    const bonus = m.bonus
    let score = 0
    if (bonus.intelligence && int >= 60) score += bonus.intelligence
    if (bonus.creativity && cre >= 60) score += bonus.creativity
    if (bonus.charm && cha >= 55) score += bonus.charm
    if (bonus.wisdom && wis >= 50) score += bonus.wisdom
    if (bonus.health && hea >= 55) score += bonus.health
    return score > 0
  }).sort(function(a, b) {
    const scoreA = Object.values(a.bonus).reduce(function(s, v) { return s + v }, 0)
    const scoreB = Object.values(b.bonus).reduce(function(s, v) { return s + v }, 0)
    return scoreB - scoreA
  })
}

/**
 * 获取适合年龄的课外活动
 */
export function getAvailableExtracurriculars(age) {
  return extracurriculars.filter(function(e) {
    return age >= e.ageRange[0] && age <= e.ageRange[1]
  })
}

/**
 * 检查是否可以参加竞赛
 */
export function canEnterCompetition(competition, character, age) {
  if (age < competition.ageRange[0] || age > competition.ageRange[1]) return false
  const req = competition.requirement || {}
  for (const key of Object.keys(req)) {
    if ((character[key] || 0) < req[key]) return false
  }
  return true
}

/**
 * 计算竞赛结果
 */
export function competeResult(competition, character) {
  const req = competition.requirement || {}
  let totalScore = 0
  let maxScore = 0
  for (const key of Object.keys(req)) {
    totalScore += (character[key] || 50) - req[key]
    maxScore += 50
  }
  
  const performance = totalScore / maxScore + Math.random() * 0.3
  if (performance > 0.7) return { rank: 'gold', multiplier: 1.0 }
  if (performance > 0.5) return { rank: 'silver', multiplier: 0.6 }
  if (performance > 0.3) return { rank: 'bronze', multiplier: 0.3 }
  return { rank: 'participated', multiplier: 0.1 }
}
