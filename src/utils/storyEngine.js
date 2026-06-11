// 故事引擎 - 管理前后连贯的情节线

// 角色状态追踪
export const storyState = {
  // 感情状态
  relationship: {
    status: 'single', // single, dating, married, divorced, widowed
    partnerName: '',
    partnerMeetAge: 0,
    marriageAge: 0,
    children: [],
    loveHistory: []
  },
  // 教育状态
  education: {
    currentLevel: 'none', // none, primary, middle, high, university, graduate
    schoolType: 'normal', // elite, normal, vocational, art
    major: ''
  },
  // 职业状态
  career: {
    status: 'none', // none, student, employed, entrepreneur, retired
    job: '',
    company: '',
    yearsWorked: 0
  },
  // 家庭状态
  family: {
    fatherAlive: true,
    motherAlive: true,
    grandparentsAlive: true,
    siblings: []
  },
  // 重要标记
  flags: []
}

// 根据条件筛选可用事件
export function filterEventsByCondition(events, character, state) {
  return events.filter(function(event) {
    if (!event.conditions) return true
    
    var conditions = event.conditions
    var keys = Object.keys(conditions)
    
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var condition = conditions[key]
      
      // 检查标记条件
      if (key === 'hasFlag') {
        if (!state.flags || state.flags.indexOf(condition) === -1) return false
      }
      if (key === 'notFlag') {
        if (state.flags && state.flags.indexOf(condition) !== -1) return false
      }
      // 检查感情状态
      if (key === 'relationshipStatus') {
        if (!state.relationship || state.relationship.status !== condition) return false
      }
      // 检查属性条件
      if (key === 'minWealth' && (character.wealth || 0) < condition) return false
      if (key === 'minIntelligence' && (character.intelligence || 0) < condition) return false
      if (key === 'minHealth' && (character.health || 0) < condition) return false
      if (key === 'maxHealth' && (character.health || 0) > condition) return false
      // 检查教育状态
      if (key === 'educationLevel' && (!state.education || state.education.currentLevel !== condition)) return false
      // 检查职业状态
      if (key === 'careerStatus' && (!state.career || state.career.status !== condition)) return false
    }
    return true
  })
}

// 生成随机伴侣名字
export function generatePartnerName(gender) {
  const maleNames = ['子轩', '浩然', '宇航', '俊杰', '天佑', '晨曦', '志远', '明辉']
  const femaleNames = ['诗涵', '雨萱', '梦琪', '欣怡', '雅琴', '思琪', '婉婷', '静怡']
  const names = gender === 'male' ? femaleNames : maleNames
  return names[Math.floor(Math.random() * names.length)]
}

// 初始化故事状态
export function initStoryState(character) {
  const familyEducation = (character && character.family && character.family.education) || 50
  return {
    relationship: {
      status: 'single',
      partnerName: '',
      partnerMeetAge: 0,
      marriageAge: 0,
      children: [],
      loveHistory: []
    },
    education: {
      currentLevel: 'none',
      schoolType: familyEducation >= 70 ? 'elite' : 'normal',
      major: ''
    },
    career: {
      status: 'none',
      job: '',
      company: '',
      yearsWorked: 0
    },
    family: {
      fatherAlive: true,
      motherAlive: true,
      grandparentsAlive: true,
      siblings: Math.random() > 0.5 ? ['哥哥/姐姐'] : []
    },
    // 初始化默认flags
    flags: ['father_alive', 'mother_alive', 'grandparents_alive']
  }
}

// ─── 事件文本渲染 ────────────────────────────────────────────
// 将事件模板中的占位符替换为实际值
export function renderEventText(template, character, storyState) {
  if (!template) return ''
  var text = template
  
  // 伴侣名字
  var partnerName = (storyState && storyState.relationship && storyState.relationship.partnerName) || '某人'
  text = text.replace(/\{partnerName\}/g, partnerName)
  
  // 城市名称
  var cityPool = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '西安', '重庆', '苏州', '天津', '长沙', '青岛', '厦门']
  text = text.replace(/\{city\}/g, function() { return cityPool[Math.floor(Math.random() * cityPool.length)] })
  
  // 学校名称
  var schoolPool = ['第一中学', '实验中学', '外国语学校', '师大附中', '育才中学', '光华中学', '振华中学', '明德中学']
  text = text.replace(/\{schoolName\}/g, function() { return schoolPool[Math.floor(Math.random() * schoolPool.length)] })
  
  // 金额
  text = text.replace(/\{amount\}/g, function() { return (Math.floor(Math.random() * 900) + 100) * 100 + '元' })
  text = text.replace(/\{largeAmount\}/g, function() { return (Math.floor(Math.random() * 90) + 10) + '万元' })
  
  // 年龄
  var age = (character && character.age) || 0
  text = text.replace(/\{age\}/g, String(age))
  
  // 职业
  var job = (storyState && storyState.career && storyState.career.job) || ''
  if (job) {
    text = text.replace(/\{job\}/g, job)
  } else {
    text = text.replace(/\{job\}/g, '职场')
  }
  
  // 子女性别称呼
  var hasChild = (storyState && storyState.relationship && storyState.relationship.children && storyState.relationship.children.length > 0)
  if (hasChild) {
    var lastChild = storyState.relationship.children[storyState.relationship.children.length - 1]
    var childCall = (lastChild && lastChild.gender === 'female') ? '女儿' : '儿子'
  } else {
    var childCall = '孩子'
  }
  text = text.replace(/\{childCall\}/g, childCall)
  
  // 教育阶段
  var eduLevel = (storyState && storyState.education && storyState.education.currentLevel) || 'none'
  var eduMap = {
    'none': '家里', 'primary': '小学', 'middle': '初中', 'high': '高中',
    'vocational': '职业院校', 'university': '大学', 'graduate': '研究生院'
  }
  text = text.replace(/\{school\}/g, eduMap[eduLevel] || '学校')
  
  return text
}

// ─── 生成人生总结 ────────────────────────────────────────────
export function generateStorySummary(character, storyState, lifeHistory) {
  if (!character) return '人生如梦，岁月如歌。'
  
  var name = character.name || '你'
  var age = character.age || 0
  var lines = []
  
  // 开篇
  if (character.family) {
    lines.push(name + '出生在一个' + (character.family.name || '普通') + '。')
  }
  
  // 教育
  if (storyState && storyState.education) {
    var edu = storyState.education
    var eduStrs = { 'primary': '小学毕业', 'middle': '初中毕业', 'high': '高中毕业', 'vocational': '职业学校毕业', 'university': '大学毕业', 'graduate': '研究生毕业' }
    if (edu.currentLevel && eduStrs[edu.currentLevel]) {
      lines.push(eduStrs[edu.currentLevel] + '后，' + name + '走上了属于自己的人生路。')
    }
  }
  
  // 感情
  if (storyState && storyState.relationship) {
    var rel = storyState.relationship
    if (rel.status === 'married') {
      lines.push(name + '在' + (rel.marriageAge || '某') + '岁那年，与' + (rel.partnerName || '心爱之人') + '喜结连理。')
    } else if (rel.status === 'divorced') {
      lines.push(name + '曾步入婚姻殿堂，后选择了各自安好。')
    } else if (rel.status === 'widowed') {
      lines.push('命运弄人，' + name + '曾与挚爱相守，却未能走到最后。')
    }
    if (rel.children && rel.children.length > 0) {
      lines.push(name + '养育了' + rel.children.length + '个孩子，家庭的温暖是人生最宝贵的财富。')
    }
  }
  
  // 事业
  if (storyState && storyState.career && storyState.career.job) {
    lines.push('在事业上，' + name + '曾是一名' + storyState.career.job + '，付出过汗水与热情。')
  }
  
  // 属性评价
  var bestAttr = ''
  var bestVal = 0
  var attrs = [
    { key: 'wealth', name: '财富', val: character.wealth || 0 },
    { key: 'intelligence', name: '智慧', val: character.intelligence || 0 },
    { key: 'happiness', name: '幸福', val: character.happiness || 0 },
    { key: 'creativity', name: '创造力', val: character.creativity || 0 },
    { key: 'wisdom', name: '人生智慧', val: character.wisdom || 0 },
    { key: 'social', name: '社交能力', val: character.social || 0 }
  ]
  for (var i = 0; i < attrs.length; i++) {
    if (attrs[i].val > bestVal) { bestVal = attrs[i].val; bestAttr = attrs[i].name }
  }
  if (bestAttr) {
    lines.push(name + '一生最突出的品质是' + bestAttr + '，这是留给世界最珍贵的印记。')
  }
  
  // 结局
  lines.push('在' + age + '岁这一年，' + name + '走完了这趟名为人生的旅程。')
  
  return lines.join('')
}

// ─── 生成年度小节 ────────────────────────────────────────────
export function generateYearSummary(character, storyState, age, events) {
  if (!character || !events || events.length === 0) {
    return age + '岁：平静的一年。'
  }
  
  var summary = age + '岁：'
  var highlights = []
  
  for (var i = 0; i < events.length; i++) {
    var ev = events[i]
    if (ev && ev.text) {
      var shortText = ev.text.length > 20 ? ev.text.substring(0, 20) + '...' : ev.text
      highlights.push(shortText)
    }
  }
  
  if (highlights.length === 0) {
    summary += '生活平稳前行。'
  } else if (highlights.length === 1) {
    summary += highlights[0] + '。'
  } else {
    summary += highlights.join('；') + '。'
  }
  
  // 添加属性变化
  var changes = []
  var attrs = ['wealth', 'happiness', 'health', 'intelligence', 'social', 'charm', 'wisdom', 'creativity']
  var attrNames = { wealth: '财富', happiness: '幸福', health: '健康', intelligence: '智力', social: '社交', charm: '魅力', wisdom: '智慧', creativity: '创造' }
  
  return summary
}

// ─── 更新故事状态 ────────────────────────────────────────────
export function updateStoryState(state, action, data) {
  if (!state) {
    state = initStoryState({})
  }
  if (!data) data = {}
  
  const newState = JSON.parse(JSON.stringify(state))
  
  // 确保各个子对象存在
  if (!newState.relationship) {
    newState.relationship = { status: 'single', partnerName: '', children: [], loveHistory: [] }
  }
  if (!newState.relationship.loveHistory) newState.relationship.loveHistory = []
  if (!newState.relationship.children) newState.relationship.children = []
  if (!newState.education) newState.education = { currentLevel: 'none' }
  if (!newState.career) newState.career = { status: 'none' }
  if (!newState.family) newState.family = { fatherAlive: true, motherAlive: true, grandparentsAlive: true }
  if (!newState.flags) newState.flags = []
  
  switch (action) {
    case 'START_DATING':
      newState.relationship.status = 'dating'
      newState.relationship.partnerName = data.partnerName || '某人'
      newState.relationship.partnerMeetAge = data.age || 0
      newState.relationship.loveHistory.push({
        name: data.partnerName || '某人',
        startAge: data.age || 0,
        type: 'dating'
      })
      break
    case 'BREAK_UP':
      if (newState.relationship.loveHistory.length > 0) {
        const lastLove = newState.relationship.loveHistory[newState.relationship.loveHistory.length - 1]
        if (lastLove) lastLove.endAge = data.age || 0
      }
      newState.relationship.status = 'single'
      newState.relationship.partnerName = ''
      break
    case 'GET_MARRIED':
      newState.relationship.status = 'married'
      newState.relationship.marriageAge = data.age || 0
      if (newState.flags.indexOf('married') === -1) {
        newState.flags.push('married')
      }
      break
    case 'DIVORCE':
      newState.relationship.status = 'divorced'
      newState.relationship.partnerName = ''
      newState.flags = newState.flags.filter(function(f) { return f !== 'married' })
      break
    case 'PARTNER_DEATH':
    case 'SPOUSE_DEATH':
      newState.relationship.status = 'widowed'
      newState.flags = newState.flags.filter(function(f) { return f !== 'married' })
      break
    case 'HAVE_CHILD':
      newState.relationship.children.push({
        name: data.childName || '小宝',
        birthAge: data.age || 0,
        gender: data.gender || 'unknown'
      })
      if (newState.flags.indexOf('has_child') === -1) {
        newState.flags.push('has_child')
      }
      break
    case 'EDUCATION_ADVANCE':
      newState.education.currentLevel = data.level || 'none'
      if (data.schoolType) newState.education.schoolType = data.schoolType
      if (data.major) newState.education.major = data.major
      break
    case 'START_CAREER':
    case 'CAREER_START':
      newState.career.status = 'employed'
      newState.career.job = data.job || '职员'
      newState.career.company = data.company || ''
      if (data.type === 'entrepreneur' && newState.flags.indexOf('is_entrepreneur') === -1) {
        newState.flags.push('is_entrepreneur')
      }
      break
    case 'CAREER_ADVANCE':
      if (data.level) newState.career.level = data.level
      break
    case 'RETIRE':
      newState.career.status = 'retired'
      break
    case 'GRANDPARENT_DEATH':
      newState.family.grandparentsAlive = false
      newState.flags = newState.flags.filter(function(f) { return f !== 'grandparents_alive' && f !== 'grandparent_sick' })
      break
    case 'PARENT_DEATH':
    case 'FAMILY_DEATH':
      if (data.parent === 'father' || data.member === 'father') {
        newState.family.fatherAlive = false
        newState.flags = newState.flags.filter(function(f) { return f !== 'father_alive' && f !== 'father_sick' })
      }
      if (data.parent === 'mother' || data.member === 'mother') {
        newState.family.motherAlive = false
        newState.flags = newState.flags.filter(function(f) { return f !== 'mother_alive' && f !== 'mother_sick' })
      }
      break
    case 'ADD_FLAG':
      if (data.flag && newState.flags.indexOf(data.flag) === -1) {
        newState.flags.push(data.flag)
      }
      break
    case 'REMOVE_FLAG':
      if (data.flag) {
        newState.flags = newState.flags.filter(function(f) { return f !== data.flag })
      }
      break
    case 'MARRY':
      newState.relationship.status = 'married'
      newState.relationship.marriageAge = data.age || 0
      if (newState.flags.indexOf('married') === -1) {
        newState.flags.push('married')
      }
      break
  }
  
  return newState
}
