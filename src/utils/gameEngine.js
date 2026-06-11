// ============================================================
// 人生模拟器 - 游戏引擎（丰富版）
// 新增：分支选择、稀有特殊事件、故事线、成就、天赋、技能、命运轮、多结局
// ============================================================

import { lifeEvents, lifeStages, specialEvents as gameDataSpecialEvents } from './gameData.js'
import { filterEventsByCondition, updateStoryState, initStoryState } from './storyEngine.js'
import { tryTriggerSpecialEvent } from './specialEvents.js'
import { checkNewAchievements, calculateAchievementPoints, getAllAchievements as allAchievementsList } from './achievements.js'
import { getAvailableStoryLineEvent, checkStoryLineTrigger } from './storyLines.js'
import { applyTalentPassives, getTalentUnlockedEventIds } from './talents.js'
import { getSkillBonuses, upgradeSkill, getUnlockedSkillEvents } from './skillTree.js'
import { getFateNode } from './fateWheel.js'
import { calculateEnding, generateEndingStory } from './endings.js'
import { initRelationships, updateRelationships, getActiveRelationships, getRelationLevel } from './relationships.js'
import { getCareerEvent, calculateSalary, canPromote, getTransitionCareers } from './careerData.js'
import { checkDisease, checkAddiction, tryQuitAddiction, calculateAddictionDamage, getMentalState, performCheckup } from './healthData.js'
import { checkSocialEvent, rollEconomyCycle, applyEconomyToIncome, getEraCareerModifier, generateYearNews, getCurrentEra } from './economySystem.js'
import { calculateExamSuccessRate, getAvailableExams, takeExam, startExamPrep, applyBianzhiEffects, examPrepEvents, examResultEvents, examTypes, bianzhiTypes, getEducationBonus, calculateExamSuccessRateWithBonus, checkPromotion, applyPromotion, getCareerTitle, processCareerYear, promotionTitles } from './examSystem.js'

// ─── 获取季节上下文 ────────────────────────────────────────
export function getSeasonContext(age) {
  const seasons = [
    { name: '春天', icon: '🌸', mood: '万物复苏，生机勃勃', color: '#f472b6' },
    { name: '夏天', icon: '☀️', mood: '烈日炎炎，热情似火', color: '#fbbf24' },
    { name: '秋天', icon: '🍂', mood: '秋风萧瑟，收获的季节', color: '#f97316' },
    { name: '冬天', icon: '❄️', mood: '寒风凛冽，万物蛰伏', color: '#60a5fa' }
  ]
  return seasons[age % 4]
}

// ─── 丰富事件描述（附加类别、氛围等字段）──────────────────────
export function enrichEventDescription(event, character, storyState) {
  if (!event) return event

  const season = getSeasonContext(character.age || 0)
  const stage = getCurrentStage(character.age || 0)

  // 类别推断
  if (event.isStoryLine) {
    event.category = 'fate'
    event.categoryIcon = '📖'
    event.categoryText = '故事线'
  } else if (event.isSpecial) {
    event.category = 'special'
    event.categoryIcon = '🌟'
    event.categoryText = '特殊事件'
  } else {
    // 根据 effect 推断类别
    const effect = event.effect || {}
    if (effect.wealth || effect.intelligence || effect.education) {
      event.category = 'career'
      event.categoryIcon = '💼'
      event.categoryText = '职业'
    } else if (effect.happiness || effect.charm || effect.social) {
      event.category = 'romance'
      event.categoryIcon = '❤️'
      event.categoryText = '感情'
    } else if (effect.health) {
      event.category = 'life'
      event.categoryIcon = '🏥'
      event.categoryText = '生活'
    } else {
      event.category = 'random'
      event.categoryIcon = '🎲'
      event.categoryText = '随机'
    }
  }

  // 季节上下文
  event.seasonContext = season

  // 根据角色职业/年龄/阶段生成氛围文字
  const atmospheres = []
  const career = character._career
  const careerTitle = character._careerTitle || ''
  const ageVal = character.age || 0

  if (career) {
    const careerAtmospheres = {
      programmer: '键盘敲击声回荡在深夜的办公室里',
      doctor: '消毒水的气味弥漫在走廊上',
      teacher: '教室里的朗朗书声是最美的乐章',
      writer: '笔尖在纸上沙沙作响，灵感涌动',
      artist: '画室里洒满了温暖的光线',
      chef: '厨房里飘出诱人的食物香气',
      civil_servant: '办公室的灯光依然明亮',
      entrepreneur: '会议室里充满了创业的激情',
      police: '警灯在夜色中闪烁着光芒',
      soldier: '训练场上回荡着嘹亮的口号',
      freelancer: '咖啡厅里，自由的气息弥漫',
      lawyer: '法槌落下，正义的声音回荡',
      driver: '车轮滚滚，城市在窗外流动',
      cashier: '收银台前排起了长队',
      university_professor: '实验室的仪器发出轻微的嗡鸣',
      researcher: '实验室里，数据的魅力令人沉醉',
      ios_indie_dev: 'Mac屏幕前的Swift代码如诗般优雅',
      apple_designer: '设计稿上的每一个像素都精心雕琢',
      swift_architect: '代码架构在脑海中清晰成型',
      tech_tycoon_ceo: '落地窗外，硅谷的灯火璀璨'
    }
    if (careerAtmospheres[career]) {
      atmospheres.push(careerAtmospheres[career])
    } else if (careerTitle) {
      atmospheres.push(careerTitle + '的工作日常，充实而忙碌')
    }
  }

  if (stage) {
    const stageAtmospheres = {
      infant: '婴儿房里传来奶声奶气的咿呀声',
      child: '童年时光，阳光洒满了操场',
      teen: '青春期的悸动在心间悄然萌芽',
      young: '年轻的血液在血管中奔涌',
      adult: '成熟稳重，岁月的沉淀让人安心',
      middle: '中年的从容是最宝贵的财富',
      elder: '夕阳西下，回忆如潮水般涌来'
    }
    if (stageAtmospheres[stage.id] && atmospheres.length === 0) {
      atmospheres.push(stageAtmospheres[stage.id])
    }
  }

  if (season && atmospheres.length === 0) {
    atmospheres.push('这是' + season.name + '，' + season.mood)
  }

  // 组合氛围文字，限制20字以内
  if (atmospheres.length > 0) {
    let combined = atmospheres.join('。')
    if (combined.length > 20) {
      combined = combined.substring(0, 20)
    }
    event.atmosphere = combined
  }

  return event
}

// ─── 获取当前人生阶段 ────────────────────────────────────────
export function getCurrentStage(age) {
  for (const stage of lifeStages) {
    if (age >= stage.ageRange[0] && age <= stage.ageRange[1]) {
      return stage
    }
  }
  return lifeStages[lifeStages.length - 1]
}

// ─── 生成随机事件（含特殊稀有事件 + 条件过滤 + 故事线事件）────────────────
export function generateEvent(age, character, storyState) {
  // 0. 尝试触发故事线事件（最高优先级）
  if (storyState && storyState.activeStoryLines) {
    const storyLineEvent = getAvailableStoryLineEvent(character, storyState, storyState.activeStoryLines)
    if (storyLineEvent) {
      return enrichEventDescription({
        text: storyLineEvent.stage.event,
        effect: {},
        isStoryLine: true,
        storyLineData: storyLineEvent,
        choices: storyLineEvent.stage.choices || null
      }, character, storyState)
    }
  }
  
  // 1. 尝试触发新特殊事件系统（独立文件）
  const specialEvent = tryTriggerSpecialEvent(age, character, storyState)
  if (specialEvent) {
    return enrichEventDescription({
      text: specialEvent.text,
      effect: specialEvent.effect || {},
      isSpecial: true,
      specialId: specialEvent.id,
      icon: specialEvent.icon,
      choices: specialEvent.choices || null,
      followUp: specialEvent.followUp,
      hidden: specialEvent.hidden
    }, character, storyState)
  }

  // 2. 兼容旧的 specialEvents（从 gameData.js）
  if (gameDataSpecialEvents && gameDataSpecialEvents.length > 0) {
    for (const se of gameDataSpecialEvents) {
      if (se.conditions) {
        if (se.conditions.minAge && age < se.conditions.minAge) continue
        if (se.conditions.maxAge && age > se.conditions.maxAge) continue
      }
      if (Math.random() < (se.probability || 0.01)) {
        return enrichEventDescription({
          text: se.text,
          effect: se.effect || {},
          isSpecial: true,
          specialId: se.id,
          choices: se.choices || null
        }, character, storyState)
      }
    }
  }

  // 3. 普通事件
  const stage = getCurrentStage(age)
  if (!stage) return null

  let events = lifeEvents[stage.id] || []

  // 根据 storyState 过滤条件事件
  if (storyState && filterEventsByCondition) {
    events = filterEventsByCondition(events, character, storyState)
  }

  if (events.length === 0) return null

  // 4. 根据角色属性调整权重
  const weightedEvents = events.map(function (event) {
    let weight = event.weight || 1

    // 有 choices 的事件权重略高（更有趣）
    if (event.choices && event.choices.length > 0) {
      weight *= 1.3
    }

    const effect = event.effect || {}
    const charWealth      = character ? (character.wealth      || 50) : 50
    const charIntelligence = character ? (character.intelligence || 50) : 50
    const charHappiness   = character ? (character.happiness   || 50) : 50
    const charHealth      = character ? (character.health      || 50) : 50

    if (effect.wealth      && charWealth      > 70) weight *= 1.15
    if (effect.intelligence && charIntelligence > 70) weight *= 1.15
    if (effect.happiness   && charHappiness   > 70) weight *= 1.1
    if (effect.health      && charHealth      > 70) weight *= 1.1
    // 负面事件：低属性时更容易触发
    if (effect.health && effect.health < 0 && charHealth < 30) weight *= 1.5

    return { event, weight }
  })

  // 轮盘赌选择
  let totalWeight = 0
  for (let i = 0; i < weightedEvents.length; i++) {
    totalWeight += (weightedEvents[i].weight || 1)
  }
  let random = Math.random() * totalWeight
  for (let i = 0; i < weightedEvents.length; i++) {
    random -= (weightedEvents[i].weight || 1)
    if (random <= 0) {
      const ev = weightedEvents[i].event
      return enrichEventDescription({
        text: ev.text,
        effect: ev.effect || null,
        choices: ev.choices || null,
        isSpecial: false
      }, character, storyState)
    }
  }

  // fallback
  const fallback = events[Math.floor(Math.random() * events.length)]
  return enrichEventDescription({
    text: fallback.text,
    effect: fallback.effect || null,
    choices: fallback.choices || null,
    isSpecial: false
  }, character, storyState)
}

// ─── 应用事件效果（支持选择分支）─────────────────────────────
// chosenChoiceIndex：当事件有 choices 时，用户选择的索引（可选）
export function applyEventEffect(character, eventOrEffect, chosenChoiceIndex) {
  if (!character) return character
  if (!eventOrEffect) return character

  const newCharacter = JSON.parse(JSON.stringify(character))

  // 兼容两种调用方式：
  // 1. applyEventEffect(char, eventObj) — eventObj 包含 .effect/.choices
  // 2. applyEventEffect(char, effectObj) — effectObj 直接是 { wealth: 5, happiness: -3 }
  const isEventObj = eventOrEffect.effect !== undefined || eventOrEffect.choices !== undefined || eventOrEffect.isSpecial !== undefined || eventOrEffect.text !== undefined
  const event = isEventObj ? eventOrEffect : { effect: eventOrEffect }

  // 确定要应用的效果
  let effectToApply = null

  if (event.choices && chosenChoiceIndex !== undefined && event.choices[chosenChoiceIndex]) {
    // 用户做了一个选择 → 应用该选择的效果
    effectToApply = event.choices[chosenChoiceIndex].effect || {}
    // 选择的智慧增益
    const wisdomGain = event.choices[chosenChoiceIndex].wisdomGain || 0
    if (wisdomGain > 0) {
      newCharacter.wisdom = Math.max(0, Math.min(100, (newCharacter.wisdom || 0) + wisdomGain))
    }
  } else if (event.effect) {
    // 无选择，直接应用事件效果
    effectToApply = event.effect
  }

  if (effectToApply) {
    const keys = Object.keys(effectToApply)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = effectToApply[key]
      if (typeof value === 'number') {
        newCharacter[key] = Math.max(0, Math.min(100, (newCharacter[key] || 0) + value))
      }
    }
  }

  // 特殊事件的 flag 处理
  if (event.isSpecial && event.specialId) {
    if (!newCharacter._flags) newCharacter._flags = []
    if (newCharacter._flags.indexOf(event.specialId) === -1) {
      newCharacter._flags.push(event.specialId)
    }
  }

  return newCharacter
}

// ─── 计算死亡概率 ────────────────────────────────────────────
export function calculateDeathChance(age, health) {
  const safeHealth = health || 50
  const safeAge = age || 0

  if (safeAge < 30) return safeHealth < 20 ? 0.01 : 0
  if (safeAge < 50) return safeHealth < 30 ? 0.02 : 0.001
  if (safeAge < 70) return (100 - safeHealth) / 1000
  if (safeAge < 85) return (100 - safeHealth) / 500 + 0.02
  return (100 - safeHealth) / 200 + 0.05
}

// ─── 生成人生总结 + 成就 ────────────────────────────────────
export function generateLifeSummary(character, history, achievementsUnlocked) {
  const c = character || {}
  const wealth     = c.wealth      || 0
  const intelligence = c.intelligence || 0
  const happiness  = c.happiness  || 0
  const health     = c.health     || 0
  const social     = c.social     || 0
  const wisdom     = c.wisdom     || 0
  const age        = c.age        || 0

  // 从 gameData 动态导入成就列表（同步版本，直接用传入的列表）
  const achievements = achievementsUnlocked || []

  const score = Math.round((wealth + happiness + health + intelligence + social + wisdom) / 6)

  let rating = '平凡'
  if (score >= 90)      rating = '传奇'
  else if (score >= 75) rating = '精彩'
  else if (score >= 60) rating = '充实'
  else if (score >= 40) rating = '坎坷'
  else                   rating = '艰难'

  // 生成评语
  let comment = ''
  if (age < 18) {
    comment = '你的人生才刚刚开始，未来有无限可能...'
  } else if (wisdom >= 80) {
    comment = '你经历了许多，变得睿智而从容，这是人生最宝贵的财富。'
  } else if (happiness >= 80 && wealth >= 60) {
    comment = '你拥有了许多人梦寐以求的生活，珍惜当下吧。'
  } else if (health < 30) {
    comment = '身体是革命的本钱，好好照顾自己...'
  } else if (score >= 70) {
    comment = '你的人生充实而精彩，没有太多遗憾。'
  } else {
    comment = '人生不如意事十之八九，但正是这些坎坷让你成长。'
  }

  return { achievements, score, rating, comment }
}

// ─── 生成随机名字 ────────────────────────────────────────────
export function generateRandomName(gender) {
  const surnames = ['李','王','张','刘','陈','杨','赵','黄','周','吴',
                    '徐','孙','马','朱','胡','郭','何','高','林','罗']
  const maleNames   = ['伟','强','磊','军','勇','杰','涛','明','超','华',
                       '鹏','飞','龙','宇','浩','轩','睿','辰','泽','霖']
  const femaleNames = ['芳','娜','敏','静','丽','艳','霞','秀','玲','婷',
                       '萱','琪','涵','怡','雅','琴','思','婉','梦','欣']
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const namePool = gender === 'male' ? maleNames : femaleNames
  const given   = namePool[Math.floor(Math.random() * namePool.length)]
  return surname + given
}

// ─── 初始化角色属性 ─────────────────────────────────────────
export function initCharacter(familyType) {
  // familyType: object from familyTypes
  const base = {
    age: 0,
    wealth: familyType.wealth || 50,
    education: familyType.education || 50,
    happiness: familyType.happiness || 50,
    health: familyType.health || 60,
    intelligence: familyType.intelligence || 50,
    social: familyType.social || 50,
    charm: familyType.charm || 50,
    wisdom: 10,         // 初始智慧较低
    creativity: 30,     // 初始创造力
    name: '',
    gender: Math.random() > 0.5 ? 'male' : 'female',
    familyTypeId: familyType.id,
    traits: familyType.traits || [],
    _flags: [],
    _achievements: [],    // 已解锁成就
    _storyLines: []       // 激活的故事线
  }
  return base
}

// ─── 检查并解锁新成就 ─────────────────────────────────────────
export function checkAndUnlockAchievements(character, storyState) {
  const unlockedIds = character._achievements || []
  const newAchievements = checkNewAchievements(character, storyState, unlockedIds)
  
  if (newAchievements.length > 0) {
    // 添加到已解锁列表
    const newIds = newAchievements.map(a => a.id)
    character._achievements = [...unlockedIds, ...newIds]
  }
  
  return newAchievements
}

// ─── 激活故事线 ────────────────────────────────────────────
export function activateStoryLine(character, storyState, lineType, lineId) {
  if (!character._storyLines) {
    character._storyLines = []
  }
  
  // 检查是否已激活
  const exists = character._storyLines.some(s => s.type === lineType && s.id === lineId)
  if (exists) return false
  
  // 检查触发条件
  if (!checkStoryLineTrigger(character, storyState, lineType, lineId)) return false
  
  // 激活
  character._storyLines.push({
    type: lineType,
    id: lineId,
    activatedAge: character.age,
    completedStages: []
  })
  
  return true
}

// ─── 计算总成就点数 ────────────────────────────────────────────
export function getTotalAchievementPoints(character) {
  // 直接 import 已在文件顶部完成
  const unlockedIds = character._achievements || []
  const unlocked = allAchievementsList.filter(a => unlockedIds.includes(a.id))
  return calculateAchievementPoints(unlocked)
}

// ─── 经济周期相关 ────────────────────────────────────────────
export { rollEconomyCycle, checkSocialEvent, applyEconomyToIncome, getEraCareerModifier, generateYearNews, getCurrentEra }

// ─── 职业系统相关 ────────────────────────────────────────────
export { getCareerEvent, calculateSalary as calculateCareerSalary, canPromote, getTransitionCareers }

// ─── 健康系统相关 ────────────────────────────────────────────
export { checkDisease, checkAddiction, tryQuitAddiction, calculateAddictionDamage, getMentalState, performCheckup }

// ─── 考试系统相关 ────────────────────────────────────────────
export { calculateExamSuccessRate, getAvailableExams, takeExam, startExamPrep, applyBianzhiEffects, examPrepEvents, examResultEvents, examTypes, bianzhiTypes, getEducationBonus, calculateExamSuccessRateWithBonus, checkPromotion, applyPromotion, getCareerTitle, processCareerYear, promotionTitles }

// ─── 年度综合处理 ────────────────────────────────────────────
export function processYearlyUpdates(character, storyState) {
  const updates = { events: [], news: [] }
  
  // 1. 经济周期
  const currentYear = 2026 - (character.age || 0) + (character.age || 0)
  const economy = character._economy || rollEconomyCycle()
  const era = getCurrentEra(currentYear)
  
  // 2. 社会事件
  const socialEvent = checkSocialEvent(character.age, currentYear, character)
  if (socialEvent) updates.events.push({ type: 'social', data: socialEvent })
  
  // 3. 年度新闻
  updates.news = generateYearNews(currentYear, economy)
  
  // 4. 职业事件
  if (character._career) {
    const careerEvent = getCareerEvent(character._career, character)
    if (careerEvent) updates.events.push({ type: 'career', data: careerEvent })
    
    // 晋升检查
    if (canPromote(character._career, character._careerYears || 0, character._careerRank || 0)) {
      updates.events.push({ type: 'promotion', data: { career: character._career } })
    }
  }
  
  // 5. 疾病检查
  const disease = checkDisease(character)
  if (disease) updates.events.push({ type: 'disease', data: disease })
  
  // 6. 成瘾检查
  const addiction = checkAddiction(character)
  if (addiction) updates.events.push({ type: 'addiction', data: addiction })
  
  // 7. 成瘾年度伤害
  const addicDamage = calculateAddictionDamage(character)
  if (Object.keys(addicDamage).length > 0) {
    for (const key of Object.keys(addicDamage)) {
      character[key] = Math.max(0, (character[key] || 50) + addicDamage[key])
    }
  }
  
  // 8. 经济影响
  if (character._career && economy) {
    const baseIncome = calculateSalary(character._career, character._careerYears || 0, character._careerRank || 0)
    const adjustedIncome = applyEconomyToIncome(baseIncome, economy)
    character.wealth = Math.min(100, Math.max(0, (character.wealth || 50) + (adjustedIncome - baseIncome) * 0.1))
  }
  
  // 9. 心理状态
  const mentalState = getMentalState(character.happiness || 50)
  if (mentalState.effect) {
    for (const key of Object.keys(mentalState.effect)) {
      character[key] = Math.max(0, Math.min(100, (character[key] || 50) + mentalState.effect[key]))
    }
  }
  
  // 保存经济状态
  character._economy = economy
  
  // 10. 考试系统 - 备考进度和考试检查
  if (character._examStage === 'prep') {
    character._examPrepYears = (character._examPrepYears || 0) + 1
    // 备考满1年自动参加考试
    if (character._examPrepYears >= 1) {
      const examResult = takeExam(character._examType, character)
      if (examResult.passed && examResult.stage === 'final') {
        // 上岸了
        updates.events.push({ type: 'exam_success', data: examResult })
        character._examStage = 'passed'
        if (examResult.bianzhi) {
          const updated = applyBianzhiEffects(character, examResult.bianzhi)
          for (const key in updated) character[key] = updated[key]
        }
      } else if (examResult.passed) {
        updates.events.push({ type: 'exam_stage_pass', data: examResult })
      } else {
        updates.events.push({ type: 'exam_fail', data: examResult })
        if (examResult.canRetry) {
          character._examStage = 'prep'
          character._examPrepYears = 0
        } else {
          character._examStage = 'given_up'
        }
      }
    } else {
      // 备考中，可能触发备考事件
      const preps = examPrepEvents.filter(function(e) {
        return e.examType === character._examType || !e.examType
      })
      if (preps.length > 0 && Math.random() < 0.15) {
        const prep = preps[Math.floor(Math.random() * preps.length)]
        updates.events.push({ type: 'exam_prep', data: prep })
      }
    }
  }
  
  // 检查是否到了适合考公的年龄且未开始
  if (!character._examStage && character.age >= 22 && character.age <= 35 && (character.education || 0) >= 55 && !character._career) {
    const available = getAvailableExams(character)
    if (available.length > 0 && Math.random() < 0.08) {
      updates.events.push({ type: 'exam_available', data: { exams: available } })
    }
  }
  
  return updates
}
