// ============================================================
// 人生模拟器 - 命运之轮系统
// 关键年龄节点的高风险高回报命运抉择，可以彻底改变人生走向
// ============================================================

// ─── 命运节点定义 ────────────────────────────────────────────
export const fateNodes = [
  // ── 6岁：天赋觉醒 ──
  {
    id: 'fate_6',
    age: 6,
    title: '天赋觉醒',
    icon: '✨',
    description: '入学之际，你隐约感到自己与别人不一样...',
    onceOnly: true,
    options: [
      {
        text: '你发现自己有过目不忘的能力',
        effect: { intelligence: 15, wisdom: 5 },
        flag: 'photographic_memory',
        consequence: '这个能力让你在学习上如鱼得水，但也让你看到了太多别人看不到的细节。',
        rarity: 'epic'
      },
      {
        text: '你对音乐有着超越常人的感受力',
        effect: { creativity: 12, charm: 8, happiness: 5 },
        flag: 'musical_awakening',
        consequence: '旋律在你脑海中流淌，你的人生从此有了背景音乐。',
        rarity: 'epic'
      },
      {
        text: '你没有什么特别的天赋，但你特别努力',
        effect: { intelligence: 5, health: 5, wisdom: 8 },
        flag: 'hardworking_child',
        consequence: '没有天赋又怎样？你用努力弥补了一切。',
        rarity: 'common'
      },
      {
        text: '你发现自己能看到别人看不到的东西...',
        effect: { wisdom: 20, happiness: -5, intelligence: 5 },
        flag: 'sixth_sense',
        consequence: '这种感觉时有时无，但它让你对这个世界有了不同的理解。',
        rarity: 'legendary'
      }
    ]
  },

  // ── 12岁：第一次选择 ──
  {
    id: 'fate_12',
    age: 12,
    title: '人生第一个十字路口',
    icon: '🔀',
    description: '小学毕业了，你站在人生的第一个分岔路口...',
    onceOnly: true,
    options: [
      {
        text: '选择重点中学，刻苦学习',
        effect: { education: 15, intelligence: 8, happiness: -5, health: -3 },
        flag: 'elite_school',
        consequence: '学习压力让你喘不过气，但也为未来打下了坚实基础。',
        rarity: 'common'
      },
      {
        text: '选择普通中学，发展兴趣爱好',
        effect: { creativity: 10, happiness: 10, social: 8 },
        flag: 'hobby_first',
        consequence: '你度过了一个快乐的初中，结交了一生的挚友。',
        rarity: 'common'
      },
      {
        text: '选择体校/艺校，走特长生路线',
        effect: { health: 10, creativity: 8, charm: 5, education: -5 },
        flag: 'specialty_school',
        consequence: '你走上了与众不同的道路，未来的你将感谢这个决定。',
        rarity: 'rare'
      }
    ]
  },

  // ── 18岁：命运转折 ──
  {
    id: 'fate_18',
    age: 18,
    title: '成年抉择',
    icon: '🎭',
    description: '成年了！你面前摆着几条完全不同的人生道路...',
    onceOnly: true,
    options: [
      {
        text: '高考冲刺，目标清北',
        effect: { education: 20, intelligence: 10, happiness: -10, health: -8 },
        flag: 'top_university',
        consequence: '你拼了命地学习，最终的结果将决定你的命运。',
        rarity: 'epic'
      },
      {
        text: '出国留学，去看看外面的世界',
        effect: { education: 12, wisdom: 12, social: 8, wealth: -15 },
        flag: 'study_abroad',
        consequence: '异国他乡的生活让你迅速成长，也让你重新审视了自己。',
        rarity: 'rare'
      },
      {
        text: '不上大学，直接进入社会打拼',
        effect: { wealth: 10, social: 10, wisdom: 10, education: -15 },
        flag: 'early_worker',
        consequence: '社会是最好的大学，你将在实践中学习一切。',
        rarity: 'common'
      },
      {
        text: '追寻一个疯狂的梦想',
        effect: { creativity: 15, happiness: 10, wealth: -10, wisdom: 5 },
        flag: 'chase_dream',
        consequence: '别人说你不切实际，但只有你知道，那有多重要。',
        rarity: 'rare'
      }
    ]
  },

  // ── 25岁：事业抉择 ──
  {
    id: 'fate_25',
    age: 25,
    title: '事业十字路口',
    icon: '💼',
    description: '工作了几年，你开始思考自己真正想要的生活...',
    onceOnly: true,
    options: [
      {
        text: '辞职创业，放手一搏',
        effect: { wealth: -20, happiness: 10, wisdom: 8 },
        flag: 'startup_attempt',
        consequence: '创业的风险和回报一样巨大，你的勇气令人敬佩。',
        rarity: 'rare'
      },
      {
        text: '继续打工，稳步前进',
        effect: { wealth: 8, happiness: 3, health: 3 },
        flag: 'steady_job',
        consequence: '稳定的工作虽然平淡，但也给了你安心的生活。',
        rarity: 'common'
      },
      {
        text: '考公务员/考编，追求稳定',
        effect: { wealth: 5, happiness: 8, health: 5, social: 5 },
        flag: 'civil_service',
        consequence: '铁饭碗虽小，但足以盛放一生的安稳。',
        rarity: 'common'
      },
      {
        text: '背包旅行一年，寻找自我',
        effect: { happiness: 15, wisdom: 15, wealth: -15, health: 5 },
        flag: 'gap_year',
        consequence: '你用一年时间找到了很多问题的答案，也制造了更多的问题。',
        rarity: 'rare'
      }
    ]
  },

  // ── 30岁：情感抉择 ──
  {
    id: 'fate_30',
    age: 30,
    title: '三十而立',
    icon: '💕',
    description: '三十岁了，感情问题再也躲不过去...',
    onceOnly: true,
    options: [
      {
        text: '和相恋多年的人步入婚姻',
        effect: { happiness: 15, social: 10, wealth: -15 },
        flag: 'married',
        consequence: '婚礼上你哭了，不是因为悲伤，而是因为幸福。',
        rarity: 'common'
      },
      {
        text: '选择单身，享受自由的时光',
        effect: { happiness: 8, wealth: 5, wisdom: 5 },
        flag: 'choose_single',
        consequence: '你享受着一个人的自由，但也有夜深人静时的孤独。',
        rarity: 'common'
      },
      {
        text: '接受相亲，试着和一个不熟悉的人开始',
        effect: { happiness: 3, social: 8, wisdom: 5 },
        flag: 'arranged_meeting',
        consequence: '相亲的结果取决于缘分，你选择了去碰碰运气。',
        rarity: 'common'
      },
      {
        text: '鼓起勇气向暗恋已久的人表白',
        effect: { charm: 8, happiness: 5, wisdom: 3 },
        flag: 'confession_30',
        consequence: '无论结果如何，你终于不再让遗憾积累。',
        rarity: 'rare'
      }
    ]
  },

  // ── 40岁：中年觉醒 ──
  {
    id: 'fate_40',
    age: 40,
    title: '不惑之年',
    icon: '🔥',
    description: '人到中年，你开始重新审视人生的 priorities...',
    onceOnly: true,
    options: [
      {
        text: '中年创业，最后一次疯狂',
        effect: { wealth: -25, happiness: 15, wisdom: 10 },
        flag: 'midlife_startup',
        consequence: '有人说40岁创业太晚，但麦当劳的创始人65岁才开始。',
        rarity: 'epic'
      },
      {
        text: '回归家庭，把时间给最爱的人',
        effect: { happiness: 15, social: 10, wealth: -5 },
        flag: 'family_first',
        consequence: '你终于明白，最珍贵的不是银行余额，而是餐桌上的笑声。',
        rarity: 'common'
      },
      {
        text: '追求精神生活，学习哲学/冥想',
        effect: { wisdom: 20, happiness: 10, intelligence: 5 },
        flag: 'spiritual_journey',
        consequence: '你开始理解那些年轻时读不懂的文字。',
        rarity: 'rare'
      },
      {
        text: '放下一切，去做一直想做但没做的事',
        effect: { happiness: 20, wisdom: 15, wealth: -20, social: -5 },
        flag: 'midlife_crisis_rebellion',
        consequence: '人生只有一次，你不愿再活在"如果"中。',
        rarity: 'epic'
      }
    ]
  },

  // ── 55岁：晚年规划 ──
  {
    id: 'fate_55',
    age: 55,
    title: '岁月沉淀',
    icon: '🌅',
    description: '站在人生的后半场，你想怎么度过？',
    onceOnly: true,
    options: [
      {
        text: '提前退休，享受人生',
        effect: { happiness: 15, health: 10, wealth: -10 },
        flag: 'early_retirement',
        consequence: '你终于可以不再为闹钟焦虑了。',
        rarity: 'common'
      },
      {
        text: '开始写回忆录，记录一生',
        effect: { wisdom: 15, happiness: 10, creativity: 8 },
        flag: 'write_memoir',
        consequence: '每一个字都是一段人生，你把它们都珍藏起来。',
        rarity: 'rare'
      },
      {
        text: '做慈善，回馈社会',
        effect: { happiness: 15, social: 15, wisdom: 10, wealth: -15 },
        flag: 'start_charity',
        consequence: '帮助别人的快乐，远比赚钱更让人满足。',
        rarity: 'rare'
      },
      {
        text: '去一个从未去过的地方，重新开始',
        effect: { happiness: 18, wisdom: 12, social: 5, wealth: -12 },
        flag: 'late_adventure',
        consequence: '谁说老了就不能出发？最好的旅行永远是下一次。',
        rarity: 'epic'
      }
    ]
  },

  // ── 70岁：人生盘点 ──
  {
    id: 'fate_70',
    age: 70,
    title: '人生总结',
    icon: '📜',
    description: '七十年了，如果重来一次，你会...',
    onceOnly: true,
    options: [
      {
        text: '什么都不改，这就是最好的人生',
        effect: { happiness: 20, wisdom: 20 },
        flag: 'no_regrets',
        consequence: '你微笑着说：如果有来生，我还要过这样的人生。',
        rarity: 'legendary'
      },
      {
        text: '想多花些时间陪伴家人',
        effect: { happiness: 10, wisdom: 15 },
        flag: 'regret_family',
        consequence: '你最遗憾的是错过了孩子成长的那些瞬间。',
        rarity: 'common'
      },
      {
        text: '想更大胆一些，少一些顾虑',
        effect: { wisdom: 18, happiness: 5 },
        flag: 'regret_cowardice',
        consequence: '你意识到，让你后悔的不是做过的事，而是没做的事。',
        rarity: 'common'
      },
      {
        text: '想告诉年轻的自己：别急，一切都会好的',
        effect: { wisdom: 25, happiness: 10 },
        flag: 'wisdom_final',
        consequence: '如果能穿越时间，你只想给年轻的自己一个拥抱。',
        rarity: 'rare'
      }
    ]
  }
]

// ─── 命运节点选项稀有度颜色 ──────────────────────────────────
export const fateRarity = {
  common:    { name: '稳妥', color: '#9e9e9e', bg: 'rgba(158,158,158,0.15)' },
  rare:      { name: '大胆', color: '#4facfe', bg: 'rgba(79,172,254,0.15)' },
  epic:      { name: '疯狂', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  legendary: { name: '逆天', color: '#ffd700', bg: 'rgba(255,215,0,0.15)' }
}

// ─── 检查当前年龄是否有命运节点 ──────────────────────────────
export function getFateNode(age, usedFates) {
  if (!usedFates) usedFates = []
  for (var i = 0; i < fateNodes.length; i++) {
    var node = fateNodes[i]
    if (node.age === age && node.onceOnly && usedFates.indexOf(node.id) === -1) {
      return node
    }
  }
  return null
}

// ─── 获取所有命运节点（用于UI展示）────────────────────────────
export function getAllFateNodes() {
  return fateNodes
}
