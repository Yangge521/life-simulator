// ============================================================
// 人生模拟器 - 房产投资系统
// 含：房产类型、购买/出售、租金收入、房贷、升值贬值
// ============================================================

// ─── 房产类型 ──────────────────────────────────────────────
export const propertyTypes = {
  // ═══ 住宅类 ═══
  apartment: {
    name: '普通住宅',
    icon: '🏠',
    category: 'residential',
    basePrice: { min: 50, max: 200 },  // 万
    priceRange: [50, 2000],  // 根据城市等级
    downPayment: 0.3,  // 首付比例
    mortgageRate: 0.049,  // 贷款利率
    mortgageYears: 30,
    rentalYield: 0.02,  // 年租金收益率
    appreciationFactor: 1.0,
    maintenanceCost: 0.005,  // 年维护成本
    happiness: 10,
    description: '温馨的小窝，家的起点'
  },
  villa: {
    name: '别墅',
    icon: '🏰',
    category: 'residential',
    basePrice: { min: 300, max: 1000 },
    priceRange: [300, 5000],
    downPayment: 0.5,
    mortgageRate: 0.049,
    mortgageYears: 20,
    rentalYield: 0.015,
    appreciationFactor: 1.2,
    maintenanceCost: 0.01,
    happiness: 25,
    description: '宽敞的别墅，身份的象征'
  },
  townhouse: {
    name: '联排别墅',
    icon: '🏡',
    category: 'residential',
    basePrice: { min: 150, max: 500 },
    priceRange: [150, 3000],
    downPayment: 0.4,
    mortgageRate: 0.049,
    mortgageYears: 25,
    rentalYield: 0.018,
    appreciationFactor: 1.1,
    maintenanceCost: 0.008,
    happiness: 18,
    description: '介于公寓和别墅之间的选择'
  },

  // ═══ 商业类 ═══
  shop: {
    name: '商铺',
    icon: '🏪',
    category: 'commercial',
    basePrice: { min: 80, max: 500 },
    priceRange: [80, 3000],
    downPayment: 0.5,
    mortgageRate: 0.055,
    mortgageYears: 10,
    rentalYield: 0.04,
    appreciationFactor: 0.9,
    maintenanceCost: 0.008,
    happiness: 5,
    risk: 0.15,
    description: '临街商铺，租金收益较高'
  },
  office: {
    name: '写字楼',
    icon: '🏢',
    category: 'commercial',
    basePrice: { min: 200, max: 1000 },
    priceRange: [200, 5000],
    downPayment: 0.5,
    mortgageRate: 0.055,
    mortgageYears: 10,
    rentalYield: 0.035,
    appreciationFactor: 0.8,
    maintenanceCost: 0.01,
    happiness: 3,
    risk: 0.2,
    description: '商业办公用房，投资门槛高'
  },

  // ═══ 其他 ═══
  parking: {
    name: '车位',
    icon: '🅿️',
    category: 'other',
    basePrice: { min: 5, max: 30 },
    priceRange: [5, 100],
    downPayment: 1.0,  // 全款
    mortgageYears: 0,
    rentalYield: 0.03,
    appreciationFactor: 0.6,
    maintenanceCost: 0.002,
    happiness: 2,
    description: '配套车位，刚需投资'
  },
  warehouse: {
    name: '仓库',
    icon: '🏭',
    category: 'commercial',
    basePrice: { min: 30, max: 200 },
    priceRange: [30, 1000],
    downPayment: 0.5,
    mortgageRate: 0.06,
    mortgageYears: 10,
    rentalYield: 0.05,
    appreciationFactor: 0.7,
    maintenanceCost: 0.005,
    happiness: 1,
    risk: 0.1,
    description: '仓储物流用房'
  }
}

// ─── 城市等级 ──────────────────────────────────────────────
export const cityLevels = {
  tier1: {
    name: '一线城市',
    priceMultiplier: 3.0,
    rentalMultiplier: 1.5,
    appreciationTrend: 0.08,  // 年增值率
    cities: ['北京', '上海', '广州', '深圳']
  },
  tier15: {
    name: '新一线城市',
    priceMultiplier: 2.0,
    rentalMultiplier: 1.2,
    appreciationTrend: 0.05,
    cities: ['杭州', '南京', '成都', '武汉', '重庆', '苏州']
  },
  tier2: {
    name: '二线城市',
    priceMultiplier: 1.5,
    rentalMultiplier: 1.0,
    appreciationTrend: 0.03,
    cities: ['天津', '西安', '长沙', '郑州', '青岛']
  },
  tier3: {
    name: '三线城市',
    priceMultiplier: 1.0,
    rentalMultiplier: 0.8,
    appreciationTrend: 0.01,
    cities: ['大部分地级市']
  },
  tier4: {
    name: '四线城市',
    priceMultiplier: 0.6,
    rentalMultiplier: 0.6,
    appreciationTrend: -0.02,
    cities: ['县城及以下']
  }
}

// ─── 房产购买事件 ────────────────────────────────────────
export const propertyEvents = {
  // ═══ 购买相关 ═══
  purchase: [
    {
      text: '你看中了一套房子，正在犹豫是否购买',
      type: 'consider_buy',
      icon: '🤔',
      condition: { minWealth: 30, minAge: 22 },
      choices: [
        { text: '首付三成，贷款买房', effect: { wealth: -50 }, action: 'buy_mortgage' },
        { text: '全款购买', effect: { wealth: -100 }, action: 'buy_cash', condition: { minWealth: 80 } },
        { text: '再看看', effect: {} }
      ]
    },
    {
      text: '朋友推荐了一个不错的楼盘',
      type: 'friend_recommend',
      icon: '👨‍👩‍👧',
      effect: { social: 3 },
      condition: { minAge: 25 }
    },
    {
      text: '开发商搞促销活动，首付优惠',
      type: 'promotion',
      icon: '🏷️',
      effect: {},
      condition: { minAge: 25 }
    }
  ],

  // ═══ 房贷相关 ═══
  mortgage: [
    {
      text: '银行批准了你的房贷申请',
      type: 'mortgage_approved',
      icon: '✅',
      effect: { happiness: 10 }
    },
    {
      text: '这个月房贷扣款成功',
      type: 'mortgage_payment',
      icon: '💸',
      effect: { wealth: -2 },
      repeat: true
    },
    {
      text: '利率下调，房贷压力减轻',
      type: 'rate_drop',
      icon: '📉',
      effect: { happiness: 5, wealth: 1 },
      chance: 0.05
    },
    {
      text: '你的房贷还清了！',
      type: 'mortgage_paid',
      icon: '🎉',
      effect: { happiness: 30, wealth: 5 },
      action: 'complete_mortgage'
    }
  ],

  // ═══ 出租相关 ═══
  rental: [
    {
      text: '你的房子租出去了，收到租金',
      type: 'rent_received',
      icon: '💰',
      effect: { wealth: 3 },
      repeat: true
    },
    {
      text: '租客提前退租了',
      type: 'tenant_leave',
      icon: '🚪',
      effect: { happiness: -3, wealth: -1 },
      chance: 0.08
    },
    {
      text: '租客拖欠房租',
      type: 'rent_arrears',
      icon: '😤',
      effect: { happiness: -5 },
      choices: [
        { text: '催促租客', effect: { social: -3, wealth: 2 } },
        { text: '给租客一些时间', effect: { happiness: -2, wisdom: 3 } },
        { text: '寻求法律途径', effect: { wealth: -2, social: -5 } }
      ],
      chance: 0.03
    }
  ],

  // ═══ 维护相关 ═══
  maintenance: [
    {
      text: '房子需要维修',
      type: 'repair_needed',
      icon: '🔧',
      effect: { wealth: -3, happiness: -2 },
      chance: 0.1
    },
    {
      text: '你决定装修房子',
      type: 'renovate',
      icon: '🎨',
      effect: { wealth: -10, happiness: 10 },
      choices: [
        { text: '简单装修', effect: { wealth: -5, happiness: 5 } },
        { text: '精装修', effect: { wealth: -15, happiness: 15 } },
        { text: '不装修', effect: {} }
      ]
    }
  ],

  // ═══ 市场波动 ═══
  market: [
    {
      text: '房价上涨，你的房产增值了',
      type: 'appreciation',
      icon: '📈',
      effect: { happiness: 10 },
      action: 'update_value'
    },
    {
      text: '房价下跌，你的房产贬值了',
      type: 'depreciation',
      icon: '📉',
      effect: { happiness: -10 },
      chance: 0.15,
      action: 'update_value'
    },
    {
      text: '政府出台楼市新政策',
      type: 'policy_change',
      icon: '📜',
      effect: {},
      chance: 0.1
    }
  ]
}

// ─── 辅助函数 ──────────────────────────────────────────────

/**
 * 计算房产价格（基于城市等级和房产类型）
 */
export function calculatePropertyPrice(propertyType, cityLevel, size) {
  const pType = propertyTypes[propertyType]
  const city = cityLevels[cityLevel]
  if (!pType || !city) return 0

  const basePrice = pType.basePrice.min + Math.random() * (pType.basePrice.max - pType.basePrice.min)
  return Math.round(basePrice * city.priceMultiplier * (size || 100) / 100)
}

/**
 * 计算月供
 */
export function calculateMonthlyPayment(totalLoan, annualRate, years) {
  if (years <= 0) return 0
  const monthlyRate = annualRate / 12
  const months = years * 12
  return Math.round(totalLoan * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1))
}

/**
 * 计算年租金收入
 */
export function calculateAnnualRent(propertyValue, rentalYield) {
  return Math.round(propertyValue * rentalYield)
}

/**
 * 计算房产当前价值（含增值）
 */
export function calculateCurrentValue(originalValue, yearsOwned, cityLevel) {
  const city = cityLevels[cityLevel]
  const appreciation = Math.pow(1 + city.appreciationTrend, yearsOwned)
  return Math.round(originalValue * appreciation)
}

/**
 * 获取可购买的房产列表
 */
export function getAvailableProperties(character) {
  const result = []
  for (const [id, type] of Object.entries(propertyTypes)) {
    const minPrice = type.basePrice.min * 10000  // 转为元
    const downPayment = minPrice * type.downPayment
    if (character.wealth * 100 >= downPayment / 1000) {
      result.push({
        type: id,
        name: type.name,
        icon: type.icon,
        minDownPayment: Math.round(downPayment / 10000)  // 万
      })
    }
  }
  return result
}

/**
 * 创建房产实例
 */
export function createProperty(propertyType, cityLevel, character) {
  const pType = propertyTypes[propertyType]
  const price = calculatePropertyPrice(propertyType, cityLevel, 100)
  
  return {
    id: 'prop_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    type: propertyType,
    name: pType.name,
    icon: pType.icon,
    cityLevel: cityLevel,
    purchasePrice: price,
    currentValue: price,
    purchaseYear: character.age,
    mortgage: {
      total: 0,
      remaining: 0,
      monthlyPayment: 0,
      years: 0
    },
    isRented: false,
    rentIncome: 0
  }
}

/**
 * 购买房产（贷款）
 */
export function buyPropertyMortgage(character, propertyType, cityLevel) {
  const pType = propertyTypes[propertyType]
  const price = calculatePropertyPrice(propertyType, cityLevel, 100)
  const downPayment = price * pType.downPayment
  const loanAmount = price - downPayment

  const property = createProperty(propertyType, cityLevel, character)
  property.mortgage = {
    total: loanAmount,
    remaining: loanAmount,
    monthlyPayment: calculateMonthlyPayment(loanAmount, pType.mortgageRate, pType.mortgageYears),
    years: pType.mortgageYears,
    rate: pType.mortgageRate
  }

  return {
    property,
    downPayment: Math.round(downPayment),
    effect: {
      wealth: -Math.round(downPayment / 10000),  // 扣除财富点
      happiness: pType.happiness
    }
  }
}

/**
 * 购买房产（全款）
 */
export function buyPropertyCash(character, propertyType, cityLevel) {
  const price = calculatePropertyPrice(propertyType, cityLevel, 100)
  const pType = propertyTypes[propertyType]

  const property = createProperty(propertyType, cityLevel, character)

  return {
    property,
    effect: {
      wealth: -Math.round(price / 10000),
      happiness: pType.happiness
    }
  }
}

/**
 * 出售房产
 */
export function sellProperty(property, yearsOwned) {
  const currentValue = calculateCurrentValue(property.purchasePrice, yearsOwned, property.cityLevel)
  const outstandingMortgage = property.mortgage ? property.mortgage.remaining : 0
  const netProceeds = currentValue - outstandingMortgage

  return {
    salePrice: currentValue,
    mortgagePayoff: outstandingMortgage,
    netProceeds: Math.max(0, Math.round(netProceeds)),
    effect: {
      wealth: Math.round(netProceeds / 10000),
      happiness: -5
    }
  }
}

/**
 * 年度房产更新（增值/贬值、还贷）
 */
export function processPropertyYear(property, economyTrend) {
  const updates = { events: [] }
  const pType = propertyTypes[property.type]

  // 房产价值变动
  const city = cityLevels[property.cityLevel]
  const appreciation = city.appreciationTrend + (economyTrend || 0)
  property.currentValue = Math.round(property.currentValue * (1 + appreciation))

  if (appreciation > 0) {
    updates.events.push({
      type: 'appreciation',
      text: `你的${property.name}增值了${Math.round(appreciation * 100)}%`,
      value: property.currentValue
    })
  } else if (appreciation < 0) {
    updates.events.push({
      type: 'depreciation',
      text: `你的${property.name}贬值了${Math.round(Math.abs(appreciation) * 100)}%`,
      value: property.currentValue
    })
  }

  // 房贷还款
  if (property.mortgage && property.mortgage.remaining > 0) {
    const annualPayment = property.mortgage.monthlyPayment * 12
    property.mortgage.remaining = Math.max(0, property.mortgage.remaining - annualPayment)
    updates.mortgagePayment = Math.round(annualPayment / 10000)

    if (property.mortgage.remaining <= 0) {
      updates.events.push({
        type: 'mortgage_complete',
        text: `你的${property.name}房贷还清了！`
      })
    }
  }

  // 租金收入
  if (property.isRented) {
    const rent = calculateAnnualRent(property.currentValue, pType.rentalYield)
    updates.rentIncome = Math.round(rent / 10000)
  }

  // 维护成本
  updates.maintenanceCost = Math.round(property.currentValue * pType.maintenanceCost / 10000)

  return updates
}
