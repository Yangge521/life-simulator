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

// 更新故事状态
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
