// ============================================================
// 人生模拟器 - 社交圈扩展系统
// 含：社交组织、人脉网络、社交声誉、圈层升级
// ============================================================

// ─── 社交组织类型 ────────────────────────────────────────────
export const socialOrganizations = {
  // ═══ 职业类 ═══
  professional_association: {
    name: '行业协会',
    icon: '🎩',
    description: '专业人士聚集的组织',
    members: ['企业家', '投资人', '律师', '会计师'],
    benefits: { career: 5, reputation: 3, wealth: 2 },
    monthlyCost: 3, // 每月会费
    joinRequirement: { career: 20, wealth: 30 },
    prestige: 3 // 声望等级 1-5
  },
  alumni_association: {
    name: '校友会',
    icon: '🎓',
    description: '同校毕业生的社交网络',
    members: ['学长学姐', '学弟学妹', '老师'],
    benefits: { social: 5, career: 3, reputation: 2 },
    monthlyCost: 1,
    joinRequirement: { education: 30 },
    prestige: 2
  },
  entrepreneur_club: {
    name: '创业者俱乐部',
    icon: '🚀',
    description: '创业者互相交流合作的平台',
    members: ['创业者', '投资人', '孵化器顾问'],
    benefits: { career: 5, wealth: 5, creativity: 3 },
    monthlyCost: 5,
    joinRequirement: { career: 30, wealth: 40, creativity: 20 },
    prestige: 4
  },
  
  // ═══ 兴趣类 ═══
  sports_club: {
    name: '运动俱乐部',
    icon: '⚽',
    description: '体育运动爱好者聚集地',
    members: ['球友', '跑友', '健身伙伴'],
    benefits: { health: 8, happiness: 5, social: 3 },
    monthlyCost: 2,
    joinRequirement: { health: 30 },
    prestige: 1
  },
  book_club: {
    name: '读书会',
    icon: '📚',
    description: '阅读爱好者交流平台',
    members: ['书友', '作家', '编辑'],
    benefits: { wisdom: 5, intelligence: 3, social: 3 },
    monthlyCost: 0.5,
    joinRequirement: { education: 20, wisdom: 15 },
    prestige: 1
  },
  art_circle: {
    name: '艺术圈',
    icon: '🎨',
    description: '艺术家和艺术爱好者聚集地',
    members: ['画家', '音乐家', '收藏家'],
    benefits: { creativity: 8, reputation: 3, social: 2 },
    monthlyCost: 3,
    joinRequirement: { creativity: 25, education: 20 },
    prestige: 3
  },
  gaming_guild: {
    name: '电竞协会',
    icon: '🎮',
    description: '游戏玩家组织',
    members: ['职业选手', '主播', '资深玩家'],
    benefits: { happiness: 8, creativity: 3, social: 3 },
    monthlyCost: 1,
    joinRequirement: { creativity: 15 },
    prestige: 1
  },
  travel_club: {
    name: '旅行家联盟',
    icon: '🌍',
    description: '旅行爱好者交流平台',
    members: ['背包客', '旅行作家', '导游'],
    benefits: { happiness: 6, wisdom: 4, health: 2 },
    monthlyCost: 2,
    joinRequirement: { health: 25, wealth: 20 },
    prestige: 2
  },
  
  // ═══ 社交类 ═══
  charity_association: {
    name: '慈善协会',
    icon: '❤️',
    description: '公益慈善活动组织',
    members: ['企业家', '志愿者', '明星'],
    benefits: { reputation: 8, social: 5, happiness: 3 },
    monthlyCost: 2,
    joinRequirement: { wealth: 35, reputation: 15 },
    prestige: 4
  },
  parent_association: {
    name: '家长会',
    icon: '👨‍👩‍👧',
    description: '家长交流育儿经验',
    members: ['家长', '老师', '教育专家'],
    benefits: { social: 5, wisdom: 3, happiness: 2 },
    monthlyCost: 0,
    joinRequirement: { social: 15 },
    prestige: 1
  },
  business_network: {
    name: '商业人脉圈',
    icon: '💼',
    description: '高端商务社交圈',
    members: ['企业家', '高管', '投资人'],
    benefits: { career: 8, wealth: 5, reputation: 3 },
    monthlyCost: 8,
    joinRequirement: { career: 40, wealth: 50 },
    prestige: 5
  },
  religious_group: {
    name: '宗教社群',
    icon: '🙏',
    description: '宗教信仰者互助组织',
    members: ['信徒', '牧师', '志愿者'],
    benefits: { happiness: 5, wisdom: 3, social: 3 },
    monthlyCost: 0.5,
    joinRequirement: {},
    prestige: 1
  },
  
  // ═══ 特殊类 ═══
  political_circle: {
    name: '政界社交圈',
    icon: '🏛️',
    description: '政治人物和官员交流平台',
    members: ['官员', '议员', '政治顾问'],
    benefits: { career: 10, reputation: 8, social: 3 },
    monthlyCost: 10,
    joinRequirement: { career: 50, reputation: 40, wisdom: 30 },
    prestige: 5
  },
  academic_circle: {
    name: '学术界圈子',
    icon: '🔬',
    description: '学者和研究人员交流网络',
    members: ['教授', '研究员', '学者'],
    benefits: { intelligence: 8, wisdom: 5, education: 3 },
    monthlyCost: 2,
    joinRequirement: { education: 60, intelligence: 30 },
    prestige: 4
  },
  media_circle: {
    name: '媒体圈',
    icon: '📺',
    description: '媒体从业者社交网络',
    members: ['记者', '主持人', '网红'],
    benefits: { reputation: 6, social: 5, career: 3 },
    monthlyCost: 3,
    joinRequirement: { reputation: 15, social: 25 },
    prestige: 3
  }
}

// ─── 社交圈层等级 ────────────────────────────────────────────
export const socialTiers = [
  { tier: 1, name: '普通社交', icon: '👥', requirement: { social: 0 }, color: '#94a3b8' },
  { tier: 2, name: '活跃社交', icon: '🤝', requirement: { social: 30 }, color: '#22c55e' },
  { tier: 3, name: '社交达人', icon: '⭐', requirement: { social: 50 }, color: '#3b82f6' },
  { tier: 4, name: '社交名流', icon: '🌟', requirement: { social: 70 }, color: '#a855f7' },
  { tier: 5, name: '社交传奇', icon: '👑', requirement: { social: 90 }, color: '#ffd700' }
]

// ─── 社交声誉等级 ────────────────────────────────────────────
export const reputationLevels = [
  { level: 1, name: '默默无闻', icon: '🔕', requirement: { reputation: 0 }, effect: {} },
  { level: 2, name: '小有名气', icon: '📢', requirement: { reputation: 20 }, effect: { career: 2 } },
  { level: 3, name: '圈内知名', icon: '🎤', requirement: { reputation: 40 }, effect: { career: 5, social: 3 } },
  { level: 4, name: '小有名望', icon: '🏅', requirement: { reputation: 60 }, effect: { career: 8, social: 5 } },
  { level: 5, name: '德高望重', icon: '🎖️', requirement: { reputation: 80 }, effect: { career: 12, social: 8, happiness: 3 } },
  { level: 6, name: '名垂青史', icon: '📜', requirement: { reputation: 95 }, effect: { career: 15, social: 10, happiness: 5, wisdom: 5 } }
]

// ─── 社交事件 ────────────────────────────────────────────────
export const socialEvents = {
  // ═══ 加入组织事件 ═══
  join_organization: [
    {
      text: '你收到了一张高端社交俱乐部的入会邀请',
      icon: '💌',
      type: 'join_invite',
      choices: [
        { text: '欣然接受', effect: { happiness: 5, reputation: 3 }, result: 'join_success' },
        { text: '婉拒邀请', effect: { wisdom: 2 } }
      ],
      condition: (character) => character.wealth > 40 && character.social > 20
    },
    {
      text: '朋友邀请你加入他的创业俱乐部',
      icon: '🤝',
      type: 'join_recommend',
      choices: [
        { text: '一起去看看', effect: { social: 5, career: 3 } },
        { text: '我对创业不感兴趣', effect: {} }
      ],
      condition: (character) => character.career > 20
    }
  ],
  
  // ═══ 组织活动事件 ═══
  organization_activity: [
    {
      text: '{org}举办了一场高端商务晚宴',
      icon: '🍷',
      type: 'business_dinner',
      effect: { social: 5, reputation: 3, wealth: -2 },
      choices: [
        { text: '参加晚宴', effect: { social: 8, reputation: 5, happiness: 3 } },
        { text: '太忙了，下次吧', effect: {} }
      ]
    },
    {
      text: '{org}组织了一次公益活动',
      icon: '❤️',
      type: 'charity_event',
      effect: { reputation: 5, happiness: 3 },
      choices: [
        { text: '积极参与', effect: { reputation: 8, social: 5 } },
        { text: '捐款支持', effect: { wealth: -5, reputation: 5 } },
        { text: '不感兴趣', effect: {} }
      ]
    },
    {
      text: '{org}邀请你参加会员专属交流会',
      icon: '💬',
      type: 'member_meeting',
      effect: { social: 3, career: 3 },
      choices: [
        { text: '分享你的经验', effect: { reputation: 5, wisdom: 3 } },
        { text: '倾听他人分享', effect: { wisdom: 5, social: 3 } }
      ]
    },
    {
      text: '{org}组织了一次户外团建活动',
      icon: '🏕️',
      type: 'outdoor_activity',
      effect: { health: 5, social: 8, happiness: 5 },
      choices: [
        { text: '积极参加', effect: { health: 8, social: 5, happiness: 3 } },
        { text: '找个借口缺席', effect: {} }
      ]
    },
    {
      text: '{org}邀请你参加年度颁奖典礼',
      icon: '🏆',
      type: 'award_ceremony',
      effect: { reputation: 10, happiness: 5 },
      condition: (character) => character.reputation > 40
    }
  ],
  
  // ═══ 社交机会事件 ═══
  social_opportunity: [
    {
      text: '在一个聚会上，你注意到有人在讨论一个很有前景的项目',
      icon: '💡',
      type: 'investment_opportunity',
      effect: { wealth: 10, career: 5 },
      condition: (character) => character.wealth > 50 && character.career > 30,
      choices: [
        { text: '主动搭话了解详情', effect: { wealth: 15, career: 5, social: 3 } },
        { text: '观望一下再说', effect: {} },
        { text: '算了，风险太大', effect: { wisdom: 3 } }
      ]
    },
    {
      text: '一位业界大佬注意到你，想和你交换联系方式',
      icon: '🤝',
      type: 'mentor_encounter',
      effect: { social: 10, career: 8 },
      condition: (character) => character.social > 40,
      choices: [
        { text: '荣幸之至', effect: { career: 10, social: 5, happiness: 5 } },
        { text: '婉拒并保持距离', effect: { wisdom: 3 } }
      ]
    },
    {
      text: '你收到了一封神秘社交派对的邀请函',
      icon: '🎭',
      type: 'exclusive_party',
      effect: { social: 5, reputation: 3 },
      condition: (character) => character.reputation > 30,
      choices: [
        { text: '欣然前往', effect: { social: 10, reputation: 8, happiness: 5 } },
        { text: '这个派对可能不适合我', effect: { wisdom: 3 } }
      ]
    }
  ],
  
  // ═══ 人脉扩展事件 ═══
  network_expansion: [
    {
      text: '你的朋友给你介绍了一位新朋友',
      icon: '👋',
      type: 'friend_intro',
      effect: { social: 8, happiness: 3 },
      choices: [
        { text: '热情交流', effect: { social: 5, happiness: 5 } },
        { text: '礼貌应付', effect: { social: 3 } }
      ]
    },
    {
      text: '在一个偶然的场合，你认识了一位志同道合的伙伴',
      icon: '🌟',
      type: 'meaningful_connection',
      effect: { social: 10, happiness: 8, career: 3 },
      condition: (character) => character.social > 30
    },
    {
      text: '你组织了一场聚会，邀请了各行各业的朋友',
      icon: '🎉',
      type: 'host_party',
      effect: { social: 15, happiness: 8, wealth: -5 },
      condition: (character) => character.wealth > 30,
      choices: [
        { text: '精心准备', effect: { social: 10, reputation: 5, happiness: 5 } },
        { text: '简单办一下', effect: { social: 5 } }
      ]
    }
  ],
  
  // ═══ 社交冲突事件 ═══
  social_conflict: [
    {
      text: '在社交场合，有人公开质疑你的能力和成就',
      icon: '😤',
      type: 'public_challenge',
      effect: { happiness: -10, reputation: -5 },
      choices: [
        { text: '冷静反驳，用实力说话', effect: { reputation: 5, wisdom: 3, social: 3 } },
        { text: '不予理会，转身离开', effect: { wisdom: 5, social: -3 } },
        { text: '激烈争吵', effect: { reputation: -10, happiness: -5, social: -5 } }
      ]
    },
    {
      text: '你无意中得罪了社交圈里的重要人物',
      icon: '😰',
      type: 'social_mistake',
      effect: { social: -10, reputation: -5 },
      choices: [
        { text: '主动道歉化解矛盾', effect: { social: 3, wisdom: 3 } },
        { text: '找人说情', effect: { wealth: -5, social: 5 } },
        { text: '不管了', effect: { social: -8, reputation: -3 } }
      ]
    },
    {
      text: '社交圈里开始流传关于你的负面传言',
      icon: '🗣️',
      type: 'rumor_spread',
      effect: { reputation: -8, happiness: -5 },
      condition: (character) => character.reputation > 30,
      choices: [
        { text: '澄清事实', effect: { reputation: 3, wisdom: 3 } },
        { text: '用行动证明自己', effect: { reputation: 5, career: 3 } },
        { text: '追查谣言源头', effect: { social: -5, happiness: -3 } }
      ]
    }
  ],
  
  // ═══ 社交收获事件 ═══
  social_gains: [
    {
      text: '社交圈的朋友在你困难时伸出了援手',
      icon: '🤝',
      type: 'friend_support',
      effect: { happiness: 10, wealth: 10, social: 5 },
      condition: (character) => character.wealth < 30
    },
    {
      text: '你的社交能力得到了大家的认可，被推荐为一个重要职位',
      icon: '🎖️',
      type: 'social_recommendation',
      effect: { career: 15, reputation: 10, happiness: 8 },
      condition: (character) => character.social > 60 && character.reputation > 50
    },
    {
      text: '一位大佬私下告诉你一个绝佳的投资机会',
      icon: '💰',
      type: 'insider_tip',
      effect: { wealth: 20, happiness: 5 },
      condition: (character) => character.social > 70 && character.reputation > 60
    }
  ]
}

// ─── 社交行动 ────────────────────────────────────────────────
export const socialActions = {
  networking: {
    name: '拓展人脉',
    icon: '🌐',
    description: '主动认识新朋友',
    cost: { time: 1 },
    effect: { social: 3 },
    minAge: 18
  },
  attending_party: {
    name: '参加聚会',
    icon: '🎊',
    description: '出席社交活动',
    cost: { wealth: 2, time: 1 },
    effect: { social: 5, reputation: 2, happiness: 3 },
    minAge: 18
  },
  hosting_gathering: {
    name: '组织聚会',
    icon: '🎉',
    description: '自己举办社交活动',
    cost: { wealth: 5, time: 2 },
    effect: { social: 10, reputation: 5, happiness: 5 },
    minAge: 22,
    requirement: { social: 30 }
  },
  mentoring: {
    name: '指导新人',
    icon: '🌱',
    description: '在社交圈中帮助新人',
    cost: { time: 1 },
    effect: { reputation: 5, wisdom: 3, happiness: 3 },
    minAge: 25,
    requirement: { social: 40 }
  },
  public_speaking: {
    name: '公开演讲',
    icon: '🎤',
    description: '在社交场合发表演讲',
    cost: { time: 1 },
    effect: { reputation: 10, career: 5, social: 5 },
    minAge: 25,
    requirement: { social: 50, reputation: 30 }
  },
  charity_donation: {
    name: '慈善捐赠',
    icon: '💝',
    description: '向慈善机构捐款',
    cost: { wealth: 10 },
    effect: { reputation: 8, happiness: 5 },
    minAge: 20,
    requirement: { wealth: 40 }
  }
}

// ─── 工具函数 ────────────────────────────────────────────────

/**
 * 获取可加入的组织
 */
export function getAvailableOrganizations(character) {
  const available = []
  
  for (const [id, org] of Object.entries(socialOrganizations)) {
    // 检查加入条件
    let meetsRequirement = true
    for (const [attr, value] of Object.entries(org.joinRequirement)) {
      if ((character[attr] || 0) < value) {
        meetsRequirement = false
        break
      }
    }
    
    if (meetsRequirement) {
      available.push({
        id,
        ...org,
        annualCost: org.monthlyCost * 12
      })
    }
  }
  
  return available.sort((a, b) => b.prestige - a.prestige)
}

/**
 * 加入组织
 */
export function joinOrganization(character, orgId) {
  const org = socialOrganizations[orgId]
  if (!org) return { success: false, message: '组织不存在' }
  
  // 扣除会费
  const annualCost = org.monthlyCost * 12
  if ((character.wealth || 50) < annualCost) {
    return { success: false, message: '财富不足，无法加入' }
  }
  
  return {
    success: true,
    organization: {
      id: orgId,
      name: org.name,
      icon: org.icon,
      joinYear: character.age,
      benefits: org.benefits
    },
    effect: {
      wealth: -annualCost,
      ...org.benefits
    }
  }
}

/**
 * 退出组织
 */
export function leaveOrganization(joinedOrgs, orgId) {
  const idx = joinedOrgs.findIndex(o => o.id === orgId)
  if (idx >= 0) {
    joinedOrgs.splice(idx, 1)
    return { success: true }
  }
  return { success: false, message: '未加入该组织' }
}

/**
 * 处理社交圈年度更新
 */
export function processSocialYear(character, joinedOrgs, socialTier) {
  const updates = []
  let totalBenefits = {}
  
  // 计算组织收益
  for (const org of joinedOrgs) {
    const orgData = socialOrganizations[org.id]
    if (orgData) {
      // 年度会费
      const annualCost = orgData.monthlyCost * 12
      updates.push({
        type: 'fee',
        org: orgData.name,
        cost: annualCost
      })
      
      // 年度收益（声望提升）
      if (orgData.benefits) {
        for (const [attr, value] of Object.entries(orgData.benefits)) {
          totalBenefits[attr] = (totalBenefits[attr] || 0) + value
        }
      }
    }
  }
  
  return { updates, benefits: totalBenefits }
}

/**
 * 获取社交圈层
 */
export function getSocialTier(social) {
  for (let i = socialTiers.length - 1; i >= 0; i--) {
    if (social >= socialTiers[i].requirement.social) {
      return socialTiers[i]
    }
  }
  return socialTiers[0]
}

/**
 * 获取声誉等级
 */
export function getReputationLevel(reputation) {
  for (let i = reputationLevels.length - 1; i >= 0; i--) {
    if (reputation >= reputationLevels[i].requirement.reputation) {
      return reputationLevels[i]
    }
  }
  return reputationLevels[0]
}

/**
 * 获取随机社交事件
 */
export function getSocialEvent(character, joinedOrgs) {
  const stage = getCharacterStage(character.age)
  const eventPool = []
  
  // 根据条件筛选事件
  for (const [category, events] of Object.entries(socialEvents)) {
    for (const event of events) {
      if (!event.condition || event.condition(character)) {
        eventPool.push({ ...event, category })
      }
    }
  }
  
  if (eventPool.length === 0) return null
  
  return eventPool[Math.floor(Math.random() * eventPool.length)]
}

function getCharacterStage(age) {
  if (age < 6) return 'toddler'
  if (age < 12) return 'child'
  if (age < 18) return 'teen'
  if (age < 30) return 'youth'
  if (age < 50) return 'middle'
  return 'elder'
}

export default {
  socialOrganizations,
  socialTiers,
  reputationLevels,
  socialEvents,
  socialActions,
  getAvailableOrganizations,
  joinOrganization,
  leaveOrganization,
  processSocialYear,
  getSocialTier,
  getReputationLevel,
  getSocialEvent
}
