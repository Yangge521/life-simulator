// ============================================================
// 人生模拟器 - 剧情线系统
// 定义连贯的故事分支，让玩家体验不同人生路线
// ============================================================

// ─── 故事线类型 ────────────────────────────────────────────────
// 每条故事线包含：触发条件、关键事件、结局
export const storyLines = {
  
  // ════════════════════════════════════════════════════════════
  // 事业线
  // ════════════════════════════════════════════════════════════
  
  career: {
    entrepreneur: {
      name: '创业之路',
      icon: '🚀',
      description: '从零开始，打造自己的商业帝国',
      stages: [
        { age: 18, event: '你在大学萌生了创业想法', trigger: { minIntelligence: 60 } },
        { age: 22, event: '毕业后你决定不走寻常路', choices: ['找稳定工作', '先打工积累经验', '直接创业'] },
        { age: 26, event: '你的第一个项目起步了', trigger: { flag: 'entrepreneur_first' } },
        { age: 30, event: '公司获得了A轮融资', trigger: { flag: 'has_company', minWealth: 60 } },
        { age: 35, event: '公司上市或被收购', trigger: { flag: 'has_company', minWealth: 80 }, endings: ['成功上市', '被巨头收购', '失败清算'] }
      ],
      rewards: { wealth: 40, wisdom: 20, happiness: 15 },
      risk: { wealth: -30, happiness: -20 }
    },
    
    scholar: {
      name: '学术之路',
      icon: '🎓',
      description: '追求真理，成为学术大师',
      stages: [
        { age: 18, event: '你对学术研究产生了浓厚兴趣', trigger: { minIntelligence: 70 } },
        { age: 22, event: '你考上了研究生', trigger: { education: 'university' } },
        { age: 25, event: '你发表了第一篇重要论文', trigger: { flag: 'graduate_student' } },
        { age: 28, event: '你获得了博士学位', trigger: { flag: 'phd' } },
        { age: 35, event: '你成为了教授或研究员', trigger: { flag: 'academic_career' } },
        { age: 50, event: '你在领域内获得了国际声誉', trigger: { flag: 'academic_career', minIntelligence: 85 } }
      ],
      rewards: { intelligence: 30, wisdom: 25, social: 10 },
      risk: { wealth: -10, happiness: -5 }
    },
    
    artist: {
      name: '艺术人生',
      icon: '🎨',
      description: '用艺术表达灵魂，追求美学极致',
      stages: [
        { age: 10, event: '你展现出了艺术天赋', trigger: { minCreativity: 60 } },
        { age: 18, event: '你选择了艺术专业', trigger: { flag: 'art_talent' } },
        { age: 25, event: '你的作品首次公开展出', trigger: { flag: 'art_major' } },
        { age: 35, event: '你在艺术圈小有名气', trigger: { flag: 'exhibited', minCreativity: 75 } },
        { age: 50, event: '你成为了知名艺术家', trigger: { flag: 'recognized_artist', minCreativity: 85 } }
      ],
      rewards: { creativity: 40, happiness: 25, charm: 20 },
      risk: { wealth: -20, health: -5 }
    },
    
    official: {
      name: '仕途之路',
      icon: '🏛️',
      description: '步入政坛，实现政治理想',
      stages: [
        { age: 22, event: '你考上了公务员', trigger: { minIntelligence: 60, minSocial: 50 } },
        { age: 28, event: '你获得了一次晋升机会', trigger: { flag: 'civil_servant' } },
        { age: 35, event: '你成为了中层干部', trigger: { flag: 'promoted', minSocial: 65 } },
        { age: 45, event: '你进入了决策层', trigger: { flag: 'senior_official', minWisdom: 70 } },
        { age: 55, event: '你成为了地方领导', trigger: { flag: 'decision_maker', minSocial: 80 } }
      ],
      rewards: { wealth: 25, social: 35, wisdom: 20 },
      risk: { happiness: -15, health: -10 }
    }
  },
  
  // ════════════════════════════════════════════════════════════
  // 感情线
  // ════════════════════════════════════════════════════════════
  
  romance: {
    childhood_sweetheart: {
      name: '青梅竹马',
      icon: '💕',
      description: '从相识到相守，一段跨越时光的爱情',
      stages: [
        { age: 8, event: '你在学校认识了一个特别的朋友', trigger: { random: 0.3 } },
        { age: 15, event: '你们开始有了朦胧的情感', trigger: { flag: 'childhood_friend' } },
        { age: 18, event: '高考后你们表白了心意', trigger: { flag: 'has_crush' } },
        { age: 25, event: '你们结婚了', trigger: { flag: 'in_relationship' } },
        { age: 30, event: '你们有了孩子', trigger: { flag: 'married' } },
        { age: 60, event: '你们一起庆祝金婚', trigger: { flag: 'has_child' } }
      ],
      rewards: { happiness: 50, social: 20, health: 10 },
      risk: {}
    },
    
    late_bloomer: {
      name: '晚来的爱情',
      icon: '🌹',
      description: '历经波折，终遇真爱',
      stages: [
        { age: 25, event: '你还是单身，但并不着急', trigger: { relationshipStatus: 'single' } },
        { age: 35, event: '你经历了一段失败的感情', trigger: { relationshipStatus: 'single' } },
        { age: 40, event: '你遇到了命中注定的人', trigger: { random: 0.4, flag: 'divorced' } },
        { age: 42, event: '你们组建了新家庭', trigger: { flag: 'found_love_late' } },
        { age: 50, event: '你庆幸自己没有放弃', trigger: { flag: 'remarried' } }
      ],
      rewards: { happiness: 35, wisdom: 20 },
      risk: { happiness: -15 }
    },
    
    workaholic: {
      name: '事业为先',
      icon: '💼',
      description: '将青春献给事业，感情放在其次',
      stages: [
        { age: 25, event: '你决定先立业后成家', trigger: { minIntelligence: 60 } },
        { age: 35, event: '事业有成，但依然单身', trigger: { flag: 'career_focused', relationshipStatus: 'single' } },
        { age: 45, event: '你开始反思人生的选择', trigger: { flag: 'career_success', relationshipStatus: 'single' } },
        { age: 50, event: '你决定放慢脚步', trigger: { flag: 'reflection' } }
      ],
      rewards: { wealth: 40, intelligence: 20 },
      risk: { happiness: -10, social: -10 }
    }
  },
  
  // ════════════════════════════════════════════════════════════
  // 家庭线
  // ════════════════════════════════════════════════════════════
  
  family: {
    filial: {
      name: '孝子贤孙',
      icon: '👨‍👩‍👧',
      description: '尽心尽力照顾父母，传承孝道',
      stages: [
        { age: 20, event: '你开始体谅父母的辛苦', trigger: { random: 0.5 } },
        { age: 35, event: '父母身体开始不好，你决定多陪伴', trigger: { flag: 'appreciate_parents' } },
        { age: 45, event: '你照顾生病的父母', trigger: { flag: 'parents_health_declining' } },
        { age: 55, event: '父母安详离世，你无怨无悔', trigger: { flag: 'cared_for_parents' } }
      ],
      rewards: { wisdom: 25, happiness: 15, social: 10 },
      risk: { wealth: -10, health: -5 }
    },
    
    big_family: {
      name: '儿孙满堂',
      icon: '👨‍👩‍👧‍👦',
      description: '追求大家庭的幸福与热闹',
      stages: [
        { age: 28, event: '你有了第一个孩子', trigger: { flag: 'married' } },
        { age: 32, event: '你们决定要二胎', trigger: { flag: 'has_child' } },
        { age: 55, event: '孩子们都长大了', trigger: { flag: 'has_second_child' } },
        { age: 65, event: '你当上了爷爷/奶奶', trigger: { flag: 'children_grown' } },
        { age: 75, event: '四世同堂，其乐融融', trigger: { flag: 'has_grandchild' } }
      ],
      rewards: { happiness: 40, social: 30, wisdom: 15 },
      risk: { wealth: -25, health: -10 }
    }
  },
  
  // ════════════════════════════════════════════════════════════
  // 特殊线（隐藏剧情）
  // ════════════════════════════════════════════════════════════
  
  special: {
    rebirth: {
      name: '涅槃重生',
      icon: '🔥',
      description: '经历人生低谷后的逆袭',
      hidden: true,
      stages: [
        { age: 30, event: '你的人生跌入谷底', trigger: { maxHappiness: 20, maxWealth: 20 } },
        { age: 35, event: '你决定重新开始', trigger: { flag: 'hit_bottom' } },
        { age: 45, event: '你东山再起', trigger: { flag: 'restarted', minWisdom: 60 } },
        { age: 55, event: '你比以前更成功了', trigger: { flag: 'comeback', minWealth: 50 } }
      ],
      rewards: { wisdom: 35, wealth: 20, happiness: 20 },
      risk: {}
    },
    
    genius: {
      name: '天才之路',
      icon: '🌟',
      description: '天赋异禀，注定不凡',
      hidden: true,
      stages: [
        { age: 5, event: '你展现出了非凡的天赋', trigger: { minIntelligence: 85 } },
        { age: 12, event: '你跳级了', trigger: { flag: 'prodigy' } },
        { age: 18, event: '你被顶尖大学录取', trigger: { flag: 'skipped_grade' } },
        { age: 25, event: '你在领域内崭露头角', trigger: { flag: 'elite_university' } },
        { age: 35, event: '你成为了行业领军人物', trigger: { flag: 'rising_star' } }
      ],
      rewards: { intelligence: 20, wealth: 30, charm: 15 },
      risk: { happiness: -10, social: -5 }
    },
    
    wanderer: {
      name: '浪迹天涯',
      icon: '🌍',
      description: '走遍世界，追寻自由',
      hidden: true,
      stages: [
        { age: 20, event: '你对远方充满向往', trigger: { minCreativity: 60, random: 0.3 } },
        { age: 25, event: '你开始了第一次长途旅行', trigger: { flag: 'wanderlust' } },
        { age: 30, event: '你决定过一种不同寻常的生活', trigger: { flag: 'traveled' } },
        { age: 40, event: '你走遍了世界各个角落', trigger: { flag: 'alternative_life' } },
        { age: 60, event: '你写下了一本旅行回忆录', trigger: { flag: 'world_traveler' } }
      ],
      rewards: { wisdom: 30, creativity: 25, happiness: 20 },
      risk: { wealth: -20, social: -15 }
    },
    
    philanthropist: {
      name: '慈善家',
      icon: '💝',
      description: '财富用于更大的善',
      hidden: true,
      stages: [
        { age: 35, event: '你开始思考财富的意义', trigger: { minWealth: 70, minWisdom: 60 } },
        { age: 45, event: '你成立了慈善基金会', trigger: { flag: 'wealth_reflection' } },
        { age: 55, event: '你帮助了成千上万的人', trigger: { flag: 'has_foundation' } },
        { age: 70, event: '你被评为年度慈善人物', trigger: { flag: 'major_donor' } }
      ],
      rewards: { happiness: 30, social: 25, wisdom: 15 },
      risk: { wealth: -30 }
    }
  }
}

// ─── 故事线进度追踪 ────────────────────────────────────────────
export function getStoryLineProgress(storyState, lineType, lineId) {
  const line = (storyLines[lineType] && storyLines[lineType][lineId])
  if (!line) return null
  
  const completedStages = []
  const currentStage = null
  
  for (const stage of line.stages) {
    // 检查是否完成
    // 这里需要根据 storyState 判断
  }
  
  return {
    line,
    completedStages,
    currentStage,
    progress: completedStages.length / line.stages.length
  }
}

// ─── 检查故事线触发条件 ────────────────────────────────────────────
export function checkStoryLineTrigger(character, storyState, lineType, lineId) {
  const line = (storyLines[lineType] && storyLines[lineType][lineId])
  if (!line) return false
  
  // 隐藏线需要特殊条件
  if (line.hidden) {
    // 根据类型检查
    if (lineId === 'rebirth') {
      return (character.happiness < 20 && character.wealth < 20)
    }
    if (lineId === 'genius') {
      return character.intelligence >= 85
    }
    // 其他隐藏线...
  }
  
  // 普通线检查初始触发条件
  const firstStage = line.stages[0]
  if (!firstStage.trigger) return true
  
  return checkTriggerCondition(firstStage.trigger, character, storyState)
}

// ─── 检查触发条件 ────────────────────────────────────────────
function checkTriggerCondition(trigger, character, storyState) {
  if (!trigger) return true
  
  // 属性条件
  if (trigger.minIntelligence && character.intelligence < trigger.minIntelligence) return false
  if (trigger.minWealth && character.wealth < trigger.minWealth) return false
  if (trigger.minHappiness && character.happiness < trigger.minHappiness) return false
  if (trigger.minHealth && character.health < trigger.minHealth) return false
  if (trigger.minSocial && character.social < trigger.minSocial) return false
  if (trigger.minCreativity && (character.creativity || 30) < trigger.minCreativity) return false
  if (trigger.maxHappiness && character.happiness > trigger.maxHappiness) return false
  if (trigger.maxWealth && character.wealth > trigger.maxWealth) return false
  
  // 随机概率
  if (trigger.random && Math.random() > trigger.random) return false
  
  // 标记条件
  if (trigger.flag) {
    const flags = (storyState && storyState.flags) || []
    if (!flags.includes(trigger.flag)) return false
  }
  
  // 关系状态
  if (trigger.relationshipStatus) {
    const status = (storyState && storyState.relationship && storyState.relationship.status)
    if (status !== trigger.relationshipStatus) return false
  }
  
  return true
}

// ─── 获取当前可用故事线事件 ────────────────────────────────────────────
export function getAvailableStoryLineEvent(character, storyState, activeStoryLines) {
  const availableEvents = []
  
  // 检查所有故事线
  for (const lineType of Object.keys(storyLines)) {
    for (const lineId of Object.keys(storyLines[lineType])) {
      const line = storyLines[lineType][lineId]
      
      // 检查是否已激活此故事线
      const isActive = (activeStoryLines && activeStoryLines.some)(s => s.type === lineType && s.id === lineId)
      
      // 检查每个阶段
      for (let i = 0; i < line.stages.length; i++) {
        const stage = line.stages[i]
        
        // 年龄匹配
        if (character.age !== stage.age) continue
        
        // 触发条件
        if (!checkTriggerCondition(stage.trigger, character, storyState)) continue
        
        // 这个事件可用
        availableEvents.push({
          lineType,
          lineId,
          lineName: line.name,
          lineIcon: line.icon,
          stageIndex: i,
          stage
        })
      }
    }
  }
  
  return availableEvents
}
