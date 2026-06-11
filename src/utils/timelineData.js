// ============================================================
// 人生模拟器 - 时间线数据（丰富版）
// 新增：更多里程碑类型、更细粒度的事件识别
// ============================================================

// ─── 里程碑类型（扩充到 20 种）────────────────────────────
export const milestoneTypes = {
  // ── 原有 12 种 ──
  birth:        { name: '出生',     icon: '👶', color: '#ffd700' },
  family_death: { name: '亲人离世', icon: '🕯️', color: '#666' },
  love_start:   { name: '恋爱开始', icon: '💕', color: '#ff69b4' },
  love_end:     { name: '恋爱结束', icon: '💔', color: '#dc143c' },
  marriage:     { name: '结婚',     icon: '💍', color: '#ffd700' },
  divorce:      { name: '离婚',     icon: '📜', color: '#808080' },
  child_born:   { name: '孩子出生', icon: '🍼', color: '#87ceeb' },
  education:    { name: '升学',     icon: '🎓', color: '#4169e1' },
  career:       { name: '职业变动', icon: '💼', color: '#32cd32' },
  illness:      { name: '重大疾病', icon: '🏥', color: '#ff4500' },
  achievement:   { name: '重大成就', icon: '🏆', color: '#ffd700' },
  accident:     { name: '意外事件', icon: '⚡', color: '#ff6347' },
  choice:       { name: '重要抉择', icon: '🔀', color: '#9370db' },

  // ── 新增 8 种 ──
  friendship:   { name: '友情里程碑', icon: '🤝', color: '#20b2aa' },
  move:         { name: '搬家/迁徙', icon: '📦', color: '#daa520' },
  immigrate:    { name: '出国/移民', icon: '✈️', color: '#1e90ff' },
  retirement:   { name: '退休',     icon: '🧓', color: '#a9a9a9' },
  awakening:    { name: '顿悟时刻', icon: '💡', color: '#ffd700' },
  trauma:       { name: '重大创伤', icon: '🌧️', color: '#483d8b' },
  windfall:     { name: '意外之财', icon: '🎰', color: '#ff8c00' },
  reconciliation:{ name: '和解',     icon: '🕊️', color: '#98fb98' }
}

// ─── 创建时间节点 ──────────────────────────────────────────
export function createMilestone(type, age, description, snapshot, extra) {
  return {
    id: `${type}_${age}_${Date.now()}`,
    type,
    age,
    description,
    timestamp: Date.now(),
    snapshot: JSON.parse(JSON.stringify(snapshot)),
    typeInfo: milestoneTypes[type] || milestoneTypes.choice,
    // 额外字段（可选）
    choiceInfo: extra && extra.choiceInfo ? extra.choiceInfo : null, // 如果是选择节点，记录选择了什么
    emotion:   extra && extra.emotion   ? extra.emotion   : null, // 当时的情绪标签
    location:  extra && extra.location  ? extra.location  : null  // 当时所在城市/国家
  }
}

// ─── 检测是否应该创建时间节点（丰富版）────────────────────
// 返回 { type, description } 或 null
export function shouldCreateMilestone(event, character, prevCharacter) {
  if (!event || !event.text) return null

  const text = event.text || ''
  if (typeof text !== 'string') return null

  // ── 出生（通常在 birth 页面创建，这里做兜底） ──
  if (text.indexOf('出生') !== -1 || text.indexOf('来到这个世界') !== -1) {
    return { type: 'birth', description: text }
  }

  // ── 亲人离世 ──
  if (text.indexOf('离世') !== -1 || text.indexOf('去世') !== -1 ||
      text.indexOf('走了') !== -1 || text.indexOf('葬礼') !== -1) {
    return { type: 'family_death', description: text }
  }

  // ── 恋爱开始 ──
  if (text.indexOf('初恋') !== -1 || text.indexOf('一见钟情') !== -1 ||
      text.indexOf('表白') !== -1 && text.indexOf('答应') !== -1 ||
      text.indexOf('遇到了生命中重要的人') !== -1 ||
      text.indexOf('相亲中遇到') !== -1 ||
      text.indexOf('谈了一场') !== -1 && text.indexOf('恋爱') !== -1 ||
      text.indexOf('牵了手') !== -1) {
    return { type: 'love_start', description: text }
  }

  // ── 恋爱结束 ──
  if (text.indexOf('分手') !== -1 || text.indexOf('分开') !== -1 ||
      text.indexOf('恋爱结束') !== -1 ||
      text.indexOf('异地分手') !== -1 ||
      text.indexOf('被甩了') !== -1) {
    return { type: 'love_end', description: text }
  }

  // ── 结婚 ──
  if (text.indexOf('婚姻殿堂') !== -1 || text.indexOf('结婚') !== -1 ||
      text.indexOf('求婚') !== -1 && text.indexOf('答应') !== -1 ||
      text.indexOf('领证') !== -1) {
    return { type: 'marriage', description: text }
  }

  // ── 离婚 ──
  if (text.indexOf('离婚') !== -1 || text.indexOf('和平分手') !== -1 && text.indexOf('婚姻') !== -1) {
    return { type: 'divorce', description: text }
  }

  // ── 孩子出生 ──
  if (text.indexOf('孩子出生') !== -1 || text.indexOf('孙子出生') !== -1 ||
      text.indexOf('有了自己的孩子') !== -1 ||
      text.indexOf('孙子/孙女出生') !== -1 ||
      text.indexOf('小宝') !== -1 && text.indexOf('出生') !== -1) {
    return { type: 'child_born', description: text }
  }

  // ── 升学 ──
  if (text.indexOf('考上') !== -1 || text.indexOf('毕业') !== -1 ||
      text.indexOf('保送') !== -1 || text.indexOf('录取通知书') !== -1 ||
      text.indexOf('上小学') !== -1 || text.indexOf('升入') !== -1 ||
      text.indexOf('入学') !== -1 || text.indexOf('拿到文凭') !== -1) {
    return { type: 'education', description: text }
  }

  // ── 职业变动 ──
  if (text.indexOf('第一份工作') !== -1 || text.indexOf('创业') !== -1 ||
      text.indexOf('升职') !== -1 || text.indexOf('公司上市') !== -1 ||
      text.indexOf('退休') !== -1 ||
      text.indexOf('找到了') !== -1 && text.indexOf('工作') !== -1 ||
      text.indexOf('被裁员') !== -1 || text.indexOf('辞职') !== -1 ||
      text.indexOf('跳槽') !== -1) {
    return { type: 'career', description: text }
  }

  // ── 重大疾病 ──
  if (text.indexOf('住院') !== -1 || text.indexOf('重病') !== -1 ||
      text.indexOf('癌症') !== -1 || text.indexOf('诊断') !== -1 && text.indexOf('病') !== -1 ||
      text.indexOf('手术') !== -1) {
    return { type: 'illness', description: text }
  }

  // ── 重大成就 ──
  if (text.indexOf('获奖') !== -1 || text.indexOf('成功') !== -1 ||
      text.indexOf('突破') !== -1 || text.indexOf('冠军') !== -1 ||
      text.indexOf('著作') !== -1 || text.indexOf('成名') !== -1) {
    return { type: 'achievement', description: text }
  }

  // ── 意外事件 ──
  if (text.indexOf('意外') !== -1 || text.indexOf('事故') !== -1 ||
      text.indexOf('车祸') !== -1 || text.indexOf('受伤') !== -1) {
    return { type: 'accident', description: text }
  }

  // ── 友情里程碑（新增） ──
  if (text.indexOf('最好的朋友') !== -1 || text.indexOf('闺蜜') !== -1 ||
      text.indexOf('兄弟') !== -1 && text.indexOf('决裂') !== -1 ||
      text.indexOf('朋友聚会') !== -1 && text.indexOf('十年') !== -1) {
    return { type: 'friendship', description: text }
  }

  // ── 搬家/迁徙（新增） ──
  if (text.indexOf('搬家') !== -1 || text.indexOf('迁居') !== -1 ||
      text.indexOf('去了另一个城市') !== -1 || text.indexOf('移民') !== -1) {
    return { type: 'move', description: text }
  }

  // ── 出国/移民（新增） ──
  if (text.indexOf('出国留学') !== -1 || text.indexOf('移民') !== -1 ||
      text.indexOf('拿到绿卡') !== -1 || text.indexOf('海外工作') !== -1) {
    return { type: 'immigrate', description: text }
  }

  // ── 退休（新增） ──
  if (text.indexOf('退休') !== -1 || text.indexOf('老了') !== -1 && text.indexOf('不工作了') !== -1) {
    return { type: 'retirement', description: text }
  }

  // ── 顿悟时刻（新增） ──
  if (text.indexOf('突然明白了') !== -1 || text.indexOf('顿悟') !== -1 ||
      text.indexOf('想通了') !== -1 || text.indexOf('释然') !== -1) {
    return { type: 'awakening', description: text }
  }

  // ── 重大创伤（新增） ──
  if (text.indexOf('背叛') !== -1 || text.indexOf('失去') !== -1 && text.indexOf('再也') !== -1 ||
      text.indexOf('绝望') !== -1 || text.indexOf('想放弃') !== -1) {
    return { type: 'trauma', description: text }
  }

  // ── 意外之财（新增） ──
  if (text.indexOf('中奖') !== -1 || text.indexOf('遗产') !== -1 ||
      text.indexOf('意外之财') !== -1 || text.indexOf('投资赚') !== -1 && text.indexOf('一大笔') !== -1) {
    return { type: 'windfall', description: text }
  }

  // ── 和解（新增） ──
  if (text.indexOf('和解') !== -1 || text.indexOf('原谅') !== -1 ||
      text.indexOf('重逢') !== -1 && text.indexOf('泪流满面') !== -1) {
    return { type: 'reconciliation', description: text }
  }

  // ── 属性剧烈变化 → 重要抉择 ──
  if (prevCharacter && character) {
    const wealthDelta   = Math.abs((character.wealth      || 0) - (prevCharacter.wealth      || 0))
    const happinessDelta = Math.abs((character.happiness  || 0) - (prevCharacter.happiness  || 0))
    const healthDelta   = Math.abs((character.health      || 0) - (prevCharacter.health      || 0))
    if (wealthDelta >= 30 || happinessDelta >= 30 || healthDelta >= 30) {
      return { type: 'choice', description: text }
    }
  }

  return null
}

// ─── 回溯模式配置（新增）─────────────────────────────────
// 在 timeline.vue 中让用户选择回溯模式
export const rewindModes = [
  {
    id: 'normal',
    name: '简单回溯',
    icon: '↩️',
    description: '回到那一刻，之后的经历全部抹去',
    effect: null
  },
  {
    id: 'with_memory',
    name: '带着记忆回溯',
    icon: '🧠',
    description: '回到过去，但保留未来的记忆（某些属性+5）',
    effect: { wisdom: 5, intelligence: 3 }
  },
  {
    id: 'change_choice',
    name: '改变那个选择',
    icon: '🔀',
    description: '回到那个节点，强制走另一条路（需要是选择节点）',
    effect: null,
    requiresChoiceNode: true
  },
  {
    id: 'blessed',
    name: '上天眷顾',
    icon: '🍀',
    description: '回溯并重生，初始幸运值大幅提升',
    effect: { happiness: 10, health: 10, charm: 10 }
  }
]
