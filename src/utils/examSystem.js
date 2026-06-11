// ============================================================
// 人生模拟器 - 考试系统（考公/考编/考研/竞赛）
// 含：公务员考试、事业单位考试、教师招聘、医生招聘、考研
// ============================================================

// ─── 考试类型 ──────────────────────────────────────────────
export const examTypes = {
  civil_service: {
    id: 'civil_service',
    name: '公务员考试',
    icon: '🏛️',
    type: '考公',
    fullName: '国家/地方公务员录用考试',
    description: '千军万马过独木桥',
    difficulty: 85, // 难度 0-100
    competitionRate: 50, // 录取比例（数值越小越难）
    minEducation: 60,
    ageLimit: 35,
    attemptsPerYear: 1,
    hasInterview: true,
    hasPhysical: false,
    stages: ['笔试', '面试', '体检', '政审', '公示', '录用'],
    successEffect: { wealth: -5, education: 10, happiness: 20, social: 5 },
    failEffect: { wealth: -3, happiness: -10, wisdom: 5 },
    careerPath: 'civil_servant',
    hasBianzhi: true,
    bianzhiType: 'administrative'
  },
  public_institution: {
    id: 'public_institution',
    name: '事业单位考试',
    icon: '🏢',
    type: '考编',
    fullName: '事业单位公开招聘考试',
    description: '稳定的事业编制岗位',
    difficulty: 65,
    competitionRate: 20,
    minEducation: 50,
    ageLimit: 40,
    attemptsPerYear: 2,
    hasInterview: true,
    hasPhysical: false,
    stages: ['笔试', '面试', '体检', '公示', '录用'],
    successEffect: { wealth: -3, education: 5, happiness: 15, social: 3 },
    failEffect: { wealth: -2, happiness: -5, wisdom: 3 },
    careerPath: null, // 取决于具体单位
    hasBianzhi: true,
    bianzhiType: 'public_institution'
  },
  teacher_recruitment: {
    id: 'teacher_recruitment',
    name: '教师招聘考试',
    icon: '👨‍🏫',
    type: '考编',
    fullName: '中小学教师公开招聘考试',
    description: '成为一名光荣的人民教师',
    difficulty: 60,
    competitionRate: 15,
    minEducation: 65,
    ageLimit: 40,
    attemptsPerYear: 2,
    hasInterview: true,
    hasPhysical: false,
    hasTrialLecture: true, // 试讲
    stages: ['笔试', '面试', '试讲', '体检', '公示', '录用'],
    successEffect: { wealth: -3, education: 8, happiness: 18, social: 5 },
    failEffect: { wealth: -2, happiness: -8, wisdom: 3 },
    careerPath: 'teacher',
    hasBianzhi: true,
    bianzhiType: 'teacher'
  },
  medical_recruitment: {
    id: 'medical_recruitment',
    name: '医疗卫生招聘',
    icon: '👨‍⚕️',
    type: '考编',
    fullName: '医疗卫生机构公开招聘考试',
    description: '加入医疗系统，救死扶伤',
    difficulty: 70,
    competitionRate: 18,
    minEducation: 75,
    ageLimit: 40,
    attemptsPerYear: 2,
    hasInterview: true,
    hasPhysical: true,
    stages: ['笔试', '面试', '体检', '公示', '录用'],
    successEffect: { wealth: -3, education: 8, happiness: 15, health: 5 },
    failEffect: { wealth: -2, happiness: -8, wisdom: 3 },
    careerPath: 'doctor',
    hasBianzhi: true,
    bianzhiType: 'medical'
  },
  graduate_entrance: {
    id: 'graduate_entrance',
    name: '考研',
    icon: '🎓',
    type: '考研',
    fullName: '全国硕士研究生统一招生考试',
    description: '提升学历，增强竞争力',
    difficulty: 70,
    competitionRate: 25,
    minEducation: 60,
    ageLimit: 45,
    attemptsPerYear: 1,
    hasInterview: false,
    hasPhysical: false,
    stages: ['初试', '复试', '录取'],
    successEffect: { education: 20, intelligence: 5, happiness: 15, wealth: -5 },
    failEffect: { wealth: -2, happiness: -8, wisdom: 5 },
    careerPath: null, // 继续深造
    hasBianzhi: false,
    bianzhiType: null
  },
  doctoral_entrance: {
    id: 'doctoral_entrance',
    name: '考博',
    icon: '🔬',
    type: '考博',
    fullName: '博士研究生入学考试',
    description: '攀登学术高峰',
    difficulty: 75,
    competitionRate: 15,
    minEducation: 85,
    ageLimit: 45,
    attemptsPerYear: 1,
    hasInterview: true,
    hasPhysical: false,
    stages: ['申请', '初审', '笔试', '面试', '录取'],
    successEffect: { education: 25, intelligence: 10, happiness: 15, wealth: -3 },
    failEffect: { wealth: -2, happiness: -5, wisdom: 5 },
    careerPath: null,
    hasBianzhi: false,
    bianzhiType: null
  },
  police_recruitment: {
    id: 'police_recruitment',
    name: '招警考试',
    icon: '👮',
    type: '考公',
    fullName: '公安机关人民警察录用考试',
    description: '成为一名人民警察',
    difficulty: 75,
    competitionRate: 20,
    minEducation: 55,
    ageLimit: 30,
    attemptsPerYear: 1,
    hasInterview: true,
    hasPhysical: true, // 体能测试
    stages: ['笔试', '体能测试', '面试', '体检', '政审', '公示', '录用'],
    successEffect: { wealth: -3, education: 8, happiness: 18, health: 5, social: 5 },
    failEffect: { wealth: -2, happiness: -8, wisdom: 3 },
    careerPath: 'police',
    hasBianzhi: true,
    bianzhiType: 'administrative'
  },
  military_exam: {
    id: 'military_exam',
    name: '军考',
    icon: '🎖️',
    type: '考编',
    fullName: '军队文职人员招聘考试',
    description: '投身国防事业',
    difficulty: 70,
    competitionRate: 18,
    minEducation: 60,
    ageLimit: 35,
    attemptsPerYear: 1,
    hasInterview: true,
    hasPhysical: true,
    stages: ['笔试', '面试', '体检', '政审', '公示', '录用'],
    successEffect: { wealth: -3, education: 8, happiness: 15, health: 8 },
    failEffect: { wealth: -2, happiness: -8, wisdom: 3 },
    careerPath: 'soldier',
    hasBianzhi: true,
    bianzhiType: 'military'
  }
}

// ─── 备考阶段事件 ─────────────────────────────────────────
export const examPrepEvents = [
  {
    text: '你决定参加公务员考试，开始备考',
    examType: 'civil_service',
    effect: { education: 5, happiness: -5, wealth: -3 },
    choices: [
      { text: '报线下培训班', effect: { education: 10, wealth: -8, happiness: -3 } },
      { text: '自学刷题', effect: { education: 5, wealth: -1, intelligence: 3 } },
      { text: '买网课学习', effect: { education: 8, wealth: -5, happiness: 3 } }
    ]
  },
  {
    text: '你决定参加事业单位考试，准备考编',
    examType: 'public_institution',
    effect: { education: 3, happiness: -3, wealth: -2 },
    choices: [
      { text: '报班系统学习', effect: { education: 8, wealth: -6, happiness: -2 } },
      { text: '自己复习', effect: { education: 4, wealth: -1, wisdom: 3 } }
    ]
  },
  {
    text: '你决定考研，提升学历',
    examType: 'graduate_entrance',
    effect: { education: 8, happiness: -5, wealth: -2 },
    choices: [
      { text: '报考研班', effect: { education: 12, wealth: -8, intelligence: 3 } },
      { text: '自学备考', effect: { education: 6, wealth: -1, wisdom: 5 } },
      { text: '保研', effect: { education: 15, happiness: 10 }, require: { education: 80 } }
    ]
  },
  {
    text: '你备考压力太大，身体垮了',
    effect: { health: -15, happiness: -10, education: -3 },
    choices: [
      { text: '暂停备考，养好身体', effect: { health: 10, happiness: 5, wisdom: 5 } },
      { text: '带病坚持备考', effect: { health: -10, education: 5, happiness: -5 }, risk: { health: -20 } }
    ]
  },
  {
    text: '你刷题刷到半夜，效率低下',
    effect: { education: 2, health: -8, happiness: -5 },
    choices: [
      { text: '调整作息，提高效率', effect: { education: 8, health: 5, wisdom: 5 } },
      { text: '继续熬夜刷题', effect: { education: 3, health: -10 } }
    ]
  },
  {
    text: '你报的培训班老师押中了很多题',
    effect: { education: 15, happiness: 10, wealth: -5 },
    chance: 0.15
  },
  {
    text: '你因为备考和对象分手了',
    effect: { happiness: -20, social: -10 },
    chance: 0.1,
    choices: [
      { text: '专心备考', effect: { education: 5, wisdom: 5 } },
      { text: '尝试挽回', effect: { happiness: -5, social: -5 } }
    ]
  },
  {
    text: '你的家人非常支持你考公',
    effect: { happiness: 10, social: 5 },
    chance: 0.3
  },
  {
    text: '你参加了多次考试，都没考上',
    effect: { happiness: -15, wisdom: 8, wealth: -8 },
    require: { _examAttempts: { min: 2 } },
    choices: [
      { text: '继续考，不考上不罢休', effect: { education: 3, happiness: -5 }, risk: { happiness: -20, wealth: -10 } },
      { text: '放弃，找其他出路', effect: { wisdom: 10, happiness: 5 }, flag: 'give_up_exam' }
    ]
  },
  {
    text: '【保研绿道】你的大学辅导员通知你，由于你综合测评在学院名列前茅，学校决定授予你免试保送研究生的资格！',
    examType: 'graduate_entrance',
    chance: 0.35,
    require: { education: 80, intelligence: 75 },
    choices: [
      { text: '接受保研，免试深造', effect: { education: 15, happiness: 20, intelligence: 5 }, action: 'auto_pass_exam' },
      { text: '放弃名额，坚持自考更好的顶级名校', effect: { wisdom: 15, intelligence: 5, happiness: -5 } }
    ]
  },
  {
    text: '【学术论文发表博弈】在备考博士生期间，你正处于一项前沿科研攻坚的收尾阶段，面临论文投稿的平台抉择。',
    examType: 'doctoral_entrance',
    chance: 0.4,
    require: { education: 80, intelligence: 75 },
    choices: [
      { text: '花钱走捷径，在普通水刊发表（财富-15，发表快但无声望）', effect: { wealth: -15, education: 5 } },
      { text: '闭关攻坚，向顶级学术期刊（Nature/Science子刊）投稿', effect: { wisdom: 15, intelligence: 5 }, tag: 'nature_science_author' }
    ]
  },
  {
    text: '【权威导师引荐信】你在备考期间参加了一场高水平的国际学术研讨会，意外结识了本领域的行业泰斗级权威导师。',
    examType: 'graduate_entrance',
    chance: 0.45,
    require: { social: 65 },
    choices: [
      { text: '端茶倒水、积极展示自己的科研想法，争取引荐信', effect: { social: 15, charm: 5 }, tag: 'recommendation_letter' },
      { text: '默默旁听，不强行社交，按部就班地复习', effect: { wisdom: 10, happiness: 5 } }
    ]
  },
  {
    text: '【泰斗级推荐信】你在备考博士期间，撰写的开题报告引起了一位国际资深院士的极大兴趣。',
    examType: 'doctoral_entrance',
    chance: 0.45,
    require: { social: 60, intelligence: 70 },
    choices: [
      { text: '深夜拜访，深造交流学术理想，争取引荐信', effect: { social: 15, charm: 5 }, tag: 'recommendation_letter' },
      { text: '写邮件感谢，按时参加考试', effect: { wisdom: 10, happiness: 5 } }
    ]
  }
]

// ─── 考试结果事件 ─────────────────────────────────────────
export const examResultEvents = [
  {
    text: '你笔试通过了！进入面试环节',
    effect: { happiness: 25, social: 5, education: 5 },
    require: { _examStage: 'written' },
    choices: [
      { text: '报面试培训班', effect: { happiness: 10, social: 8, wealth: -5 } },
      { text: '自己准备面试', effect: { happiness: 5, wisdom: 5 } }
    ]
  },
  {
    text: '你面试表现优异，综合成绩第一名！',
    effect: { happiness: 30, social: 10, charm: 5 },
    require: { _examStage: 'interview' },
    chance: 0.3
  },
  {
    text: '你面试表现一般，等待最终结果',
    effect: { happiness: 5, stress: 10 },
    require: { _examStage: 'interview' },
    chance: 0.5
  },
  {
    text: '很遗憾，你这次考试没有通过',
    effect: { happiness: -20, wisdom: 5, wealth: -3 },
    choices: [
      { text: '总结经验，明年再战', effect: { education: 5, wisdom: 8 } },
      { text: '放弃，找其他工作', effect: { wisdom: 5, happiness: -5 } },
      { text: '先找份工作边工作边备考', effect: { wealth: 5, education: 3, happiness: -3 } }
    ]
  },
  {
    text: '你通过了所有环节，成功上岸！',
    effect: { happiness: 35, wealth: -5, social: 10, education: 10 },
    require: { _examStage: 'final' },
    icon: '🎉'
  },
  {
    text: '你政审没通过，与编制失之交臂',
    effect: { happiness: -30, wisdom: 10 },
    require: { _examStage: 'politics' },
    chance: 0.05,
    choices: [
      { text: '询问原因，争取补救', effect: { wisdom: 5 } },
      { text: '接受现实，另寻出路', effect: { wisdom: 10, happiness: -10 } }
    ]
  },
  {
    text: '你体检不合格，需要复检',
    effect: { health: -5, happiness: -10 },
    require: { _examStage: 'medical' },
    chance: 0.08,
    choices: [
      { text: '调整作息饮食，复检前突击', effect: { health: 10, wisdom: 3 } },
      { text: '听天由命', effect: { happiness: -5 } }
    ]
  }
]

// ─── 编制类型 ──────────────────────────────────────────────
export const bianzhiTypes = {
  administrative: {
    id: 'administrative',
    name: '行政编制',
    icon: '🏛️',
    description: '公务员使用的编制，财政全额拨款',
    perks: { wealth: 5, happiness: 10, social: 5 },
    stability: 100, // 稳定性 0-100
    promotionSystem: 'civil_service'
  },
  public_institution: {
    id: 'public_institution',
    name: '事业编制',
    icon: '🏢',
    description: '事业单位工作人员编制，财政全额/差额拨款',
    perks: { wealth: 3, happiness: 8, social: 3 },
    stability: 90,
    promotionSystem: 'public_institution'
  },
  teacher: {
    id: 'teacher',
    name: '教师编制',
    icon: '👨‍🏫',
    description: '中小学教师专用编制，有寒暑假',
    perks: { wealth: 3, happiness: 12, social: 5 },
    stability: 95,
    promotionSystem: 'teacher'
  },
  medical: {
    id: 'medical',
    name: '医疗卫生编制',
    icon: '👨‍⚕️',
    description: '医院/卫生院工作人员编制',
    perks: { wealth: 4, happiness: 8, health: 3 },
    stability: 92,
    promotionSystem: 'medical'
  },
  military: {
    id: 'military',
    name: '军队文职编制',
    icon: '🎖️',
    description: '军队文职人员编制，待遇优厚',
    perks: { wealth: 8, happiness: 10, health: 5 },
    stability: 98,
    promotionSystem: 'military'
  },
  no_bianzhi: {
    id: 'no_bianzhi',
    name: '无编制（编外/合同制）',
    icon: '📝',
    description: '临时聘用，稳定性差',
    perks: {},
    stability: 30,
    promotionSystem: null
  }
}

// ─── 辅助函数 ──────────────────────────────────────────────

/**
 * 计算考试成功率
 */
export function calculateExamSuccessRate(examType, character) {
  const exam = examTypes[examType]
  if (!exam) return 0
  
  // 基础成功率 = 1 / competitionRate
  let baseRate = 1 / exam.competitionRate
  
  // 教育加成
  const educationBonus = Math.max(0, (character.education || 0) - exam.minEducation) * 0.01
  
  // 智力加成
  const intelligenceBonus = ((character.intelligence || 50) - 50) * 0.005
  
  // 备考时间加成
  const prepTime = character._examPrepYears || 0
  const prepBonus = Math.min(prepTime * 0.05, 0.2)
  
  // 培训班加成
  const classBonus = character._examClass ? 0.1 : 0
  
  // 年龄惩罚（越接近年龄限制越急）
  let agePenalty = 0
  if (character.age > exam.ageLimit - 5) {
    agePenalty = -0.05
  }
  
  const totalRate = baseRate + educationBonus + intelligenceBonus + prepBonus + classBonus + agePenalty
  
  return Math.max(0.01, Math.min(0.95, totalRate))
}

/**
 * 开始备考
 */
export function startExamPrep(examType, character) {
  const exam = examTypes[examType]
  if (!exam) return { success: false, message: '未知考试类型' }
  
  // 检查条件
  if ((character.education || 0) < exam.minEducation) {
    return { success: false, message: `学历不足，需要教育值达到${exam.minEducation}` }
  }
  
  if (character.age > exam.ageLimit) {
    return { success: false, message: `年龄超过限制（${exam.ageLimit}岁）` }
  }
  
  // 初始化考试状态
  character._examType = examType
  character._examStage = 'prep'
  character._examPrepYears = 0
  character._examAttempts = 0
  
  return {
    success: true,
    message: `你开始备考${exam.name}！`,
    exam
  }
}

/**
 * 模拟一次考试
 */
export function takeExam(examType, character) {
  const exam = examTypes[examType]
  if (!exam) return { success: false, stage: null, message: '未知考试类型' }
  
  const successRate = calculateExamSuccessRate(examType, character)
  const rolled = Math.random()
  
  character._examAttempts = (character._examAttempts || 0) + 1
  
  if (rolled < successRate) {
    // 通过当前阶段
    const currentStageIndex = exam.stages.indexOf(character._examStage)
    const nextStage = exam.stages[currentStageIndex + 1] || 'final'
    
    character._examStage = nextStage
    
    if (nextStage === 'final' || nextStage === '录用') {
      // 考试全部通过
      return {
        success: true,
        passed: true,
        stage: nextStage,
        message: `恭喜！你通过了${exam.name}！`,
        bianzhi: exam.hasBianzhi ? exam.bianzhiType : null
      }
    }
    
    return {
      success: true,
      passed: true,
      stage: nextStage,
      message: `你通过了${exam.stages[currentStageIndex]}！即将进入${nextStage}环节。`
    }
  } else {
    // 未通过
    return {
      success: true,
      passed: false,
      stage: character._examStage,
      message: `很遗憾，你未能通过${character._examStage}环节。`,
      canRetry: character._examAttempts < 3
    }
  }
}

/**
 * 获取可用的考试列表
 */
export function getAvailableExams(character) {
  return Object.values(examTypes).filter(function(exam) {
    if ((character.education || 0) < exam.minEducation) return false
    if (character.age > exam.ageLimit) return false
    return true
  })
}

/**
 * 获取编制信息
 */
export function getBianzhiInfo(bianzhiId) {
  return bianzhiTypes[bianzhiId] || bianzhiTypes.no_bianzhi
}

/**
 * 应用编制效果
 */
export function applyBianzhiEffects(character, bianzhiId) {
  const bianzhi = getBianzhiInfo(bianzhiId)
  if (!bianzhi || !bianzhi.perks) return character
  
  const updated = Object.assign({}, character)
  for (const key in bianzhi.perks) {
    updated[key] = Math.min(100, (updated[key] || 50) + bianzhi.perks[key])
  }
  
  updated._bianzhi = bianzhiId
  updated._bianzhiName = bianzhi.name
  
  return updated
}

// ─── 教育-考试联动 ────────────────────────────────────────

/**
 * 获取学历加成（考研/考博成功后对考公的加成）
 */
export function getEducationBonus(character, targetExamType) {
  var bonus = { rate: 0, description: '' }
  
  // 泰斗引荐信加成（对考博/考研）
  if (character.tags && character.tags.indexOf('recommendation_letter') !== -1 && (targetExamType === 'doctoral_entrance' || targetExamType === 'graduate_entrance')) {
    bonus.rate += 0.30
    bonus.description += '泰斗引荐信加成+30% '
  }
  
  // 顶刊论文一作加成（对考博/考研）
  if (character.tags && character.tags.indexOf('nature_science_author') !== -1 && (targetExamType === 'doctoral_entrance' || targetExamType === 'graduate_entrance')) {
    bonus.rate += 0.25
    bonus.description += '顶刊一作加成+25% '
  }
  
  // 研究生学历考公加成
  if ((character.education || 0) >= 75 && (targetExamType === 'civil_service' || targetExamType === 'public_institution')) {
    bonus.rate += 0.05
    bonus.description += '研究生学历加成+5% '
  }
  
  // 博士学历额外加成
  if ((character.education || 0) >= 90) {
    bonus.rate += 0.08
    bonus.description += '博士学历加成+8% '
  }
  
  // 985/211名校加成（如果有标签）
  if (character._eliteUniversity) {
    bonus.rate += 0.03
    bonus.description += '名校加成+3% '
  }
  
  // 党员加成（考公）
  if (character._partyMember && targetExamType === 'civil_service') {
    bonus.rate += 0.04
    bonus.description += '党员身份加成+4% '
  }
  
  // 有基层工作经验（三支一扶/西部计划）
  if (character._grassrootsExperience && targetExamType === 'civil_service') {
    bonus.rate += 0.05
    bonus.description += '基层经验加成+5% '
  }
  
  // 在职备考惩罚（已有工作）
  if (character._career) {
    bonus.rate -= 0.08
    bonus.description += '在职备考惩罚-8% '
  }
  
  return bonus
}

/**
 * 带联动加成的考试成功率
 */
export function calculateExamSuccessRateWithBonus(examType, character) {
  var baseRate = calculateExamSuccessRate(examType, character)
  var bonus = getEducationBonus(character, examType)
  return Math.max(0.01, Math.min(0.95, baseRate + bonus.rate))
}

// ─── 考公晋升系统 ─────────────────────────────────────────

/**
 * 晋升标题映射（职业ID -> 职称列表）
 */
export const promotionTitles = {
  civil_servant: ['科员', '副科级', '正科级', '副处级', '正处级', '副厅级', '正厅级'],
  public_institution: ['科员', '初级', '中级', '副高', '正高'],
  teacher: ['见习教师', '三级教师', '二级教师', '一级教师', '高级教师', '正高级教师'],
  doctor: ['住院医师', '主治医师', '副主任医师', '主任医师'],
  police: ['警员', '警司', '警督', '警监'],
  soldier: ['文员', '助理工程师', '工程师', '高级工程师'],
  university_professor: ['助教', '讲师', '副教授', '教授'],
  researcher: ['研究实习员', '助理研究员', '副研究员', '研究员']
}

/**
 * 各级别晋升所需条件
 */
export var promotionRequirements = {
  civil_servant: [
    { minYears: 0, requireEducation: 55, requireIntelligence: 40, chance: 1.0 },
    { minYears: 3, requireEducation: 58, requireIntelligence: 45, chance: 0.5 },
    { minYears: 5, requireEducation: 62, requireIntelligence: 48, chance: 0.35 },
    { minYears: 8, requireEducation: 66, requireIntelligence: 52, chance: 0.2 },
    { minYears: 12, requireEducation: 70, requireIntelligence: 56, chance: 0.1 },
    { minYears: 18, requireEducation: 75, requireIntelligence: 60, chance: 0.05 },
    { minYears: 25, requireEducation: 80, requireIntelligence: 65, chance: 0.02 }
  ],
  public_institution: [
    { minYears: 0, requireEducation: 50, chance: 1.0 },
    { minYears: 3, requireEducation: 55, chance: 0.6 },
    { minYears: 5, requireEducation: 62, chance: 0.35 },
    { minYears: 10, requireEducation: 70, chance: 0.15 },
    { minYears: 15, requireEducation: 78, chance: 0.05 }
  ],
  teacher: [
    { minYears: 0, requireEducation: 60, chance: 1.0 },
    { minYears: 1, requireEducation: 62, chance: 0.9 },
    { minYears: 3, requireEducation: 65, chance: 0.5 },
    { minYears: 5, requireEducation: 70, chance: 0.25 },
    { minYears: 10, requireEducation: 78, chance: 0.1 },
    { minYears: 18, requireEducation: 88, chance: 0.03 }
  ],
  doctor: [
    { minYears: 0, requireEducation: 70, chance: 1.0 },
    { minYears: 3, requireEducation: 75, chance: 0.6 },
    { minYears: 8, requireEducation: 80, chance: 0.2 },
    { minYears: 15, requireEducation: 85, chance: 0.05 }
  ],
  police: [
    { minYears: 0, requireEducation: 50, chance: 1.0 },
    { minYears: 3, requireEducation: 55, chance: 0.55 },
    { minYears: 6, requireEducation: 60, chance: 0.25 },
    { minYears: 12, requireEducation: 68, chance: 0.08 }
  ],
  soldier: [
    { minYears: 0, requireEducation: 55, chance: 1.0 },
    { minYears: 3, requireEducation: 60, chance: 0.6 },
    { minYears: 8, requireEducation: 68, chance: 0.2 },
    { minYears: 15, requireEducation: 76, chance: 0.05 }
  ]
}

/**
 * 检查是否满足晋升条件
 */
export function checkPromotion(careerId, character) {
  var titles = promotionTitles[careerId]
  var reqs = promotionRequirements[careerId]
  if (!titles || !reqs) return null
  
  var currentRank = character._careerRank || 0
  if (currentRank >= titles.length - 1) return null // 已到顶
  
  var careerYears = character._careerYears || 0
  var req = reqs[currentRank + 1] || reqs[reqs.length - 1]
  
  // 年限不够
  if (careerYears < req.minYears) return null
  
  // 学历不够
  if ((character.education || 0) < (req.requireEducation || 0)) return null
  
  // 智力不够
  if ((character.intelligence || 50) < (req.requireIntelligence || 0)) return null
  
  // 概率检定
  if (Math.random() > req.chance) return null
  
  // 社会关系加成
  var socialBonus = (character.social || 50) > 70 ? 0.05 : 0
  if (Math.random() < socialBonus) { /* 额外机会 */ }
  
  return {
    fromRank: currentRank,
    toRank: currentRank + 1,
    fromTitle: titles[currentRank],
    toTitle: titles[currentRank + 1],
    effect: {
      wealth: 5 + currentRank * 3,
      happiness: 8 + currentRank * 3,
      social: 3 + currentRank * 2,
      wisdom: 2
    }
  }
}

/**
 * 处理晋升
 */
export function applyPromotion(character, promotion) {
  if (!promotion) return character
  
  character._careerRank = promotion.toRank
  character._careerTitle = promotion.toTitle
  
  if (promotion.effect) {
    for (var key in promotion.effect) {
      character[key] = Math.min(100, (character[key] || 50) + promotion.effect[key])
    }
  }
  
  return character
}

/**
 * 获取当前职级名称
 */
export function getCareerTitle(careerId, rank) {
  var titles = promotionTitles[careerId]
  if (!titles) return ''
  return titles[Math.min(rank || 0, titles.length - 1)]
}

/**
 * 年度职业处理（在 nextYear 中调用）
 * 处理：职业年份累计、晋升检查、年度职业事件
 */
export function processCareerYear(character, careerData) {
  if (!character._career) return null
  
  character._careerYears = (character._careerYears || 0) + 1
  var results = []
  
  // 查找职业对象（提前查找，晋升和退休都需要）
  var careerObj = (careerData && careerData.careers) ? careerData.careers.find(function(c) { return c.id === character._career }) : null
  
  // 1. 晋升检查
  var promotion = checkPromotion(character._career, character)
  if (promotion) {
    applyPromotion(character, promotion)
    results.push({
      type: 'promotion',
      text: '🎊 恭喜晋升！你从「' + promotion.fromTitle + '」晋升为「' + promotion.toTitle + '」！',
      effect: promotion.effect
    })
  }
  
  // 2. 职业事件
  if (careerData && careerData.getCareerEvent) {
    var careerEvent = careerData.getCareerEvent(careerObj, character)
    if (careerEvent) {
      results.push({
        type: 'career_event',
        text: careerEvent.text,
        effect: careerEvent.effect,
        choices: careerEvent.choices
      })
    }
  }
  
  // 3. 退休检查
  if (careerObj && careerObj.retirementAge && character.age >= careerObj.retirementAge) {
    character._retired = true
    character._career = null
    results.push({
      type: 'retirement',
      text: '🌅 你正式退休了，开始享受退休生活。',
      effect: { happiness: 10, stress: -20, health: 5 }
    })
  }
  
  return results.length > 0 ? results : null
}
