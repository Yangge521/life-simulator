// ============================================================
// 人生模拟器 - 动态朋友圈与相亲市场数据中心
// ============================================================

import { personalityTraits } from './relationshipData.js'

// ─── 1. 相亲市场嘉宾生成逻辑 ─────────────────────────

const guestTemplates = [
  {
    role: 'finance_elite',
    namePool: ['宋天骄', '陆沉雪', '顾景年', '叶澜溪'],
    genderMap: { male: ['顾景年', '宋天骄'], female: ['陆沉雪', '叶澜溪'] },
    job: '金融高管',
    avatar: '💎',
    desc: '身处金融前沿，成熟睿智，对伴侣的财商与格局有极高要求。',
    minRequirements: { wealth: 65, intelligence: 60 },
    traitIds: ['practical', 'serious', 'loyal']
  },
  {
    role: 'academic_elite',
    namePool: ['沈怀安', '林清微', '谢知白', '苏婉怡'],
    genderMap: { male: ['沈怀安', '谢知白'], female: ['林清微', '苏婉怡'] },
    job: '高校研究员',
    avatar: '🎓',
    desc: '出身学术世家，知书达礼，青睐高学历、有深度思想的灵魂伴侣。',
    minRequirements: { education: 70, intelligence: 65 },
    traitIds: ['introvert', 'serious', 'artistic']
  },
  {
    role: 'civil_servant',
    namePool: ['张少游', '齐素雅', '任天野', '乔婉莹'],
    genderMap: { male: ['张少游', '任天野'], female: ['齐素雅', '乔婉莹'] },
    job: '机关科长',
    avatar: '🏛️',
    desc: '作风稳健，端庄大气，青睐体制内稳定人员或家世清白的伴侣。',
    minRequirements: { wisdom: 60, social: 55 },
    traitIds: ['serious', 'practical', 'loyal']
  },
  {
    role: 'artist',
    namePool: ['江左盟', '楚轻柔', '唐奕凡', '安夏'],
    genderMap: { male: ['江左盟', '唐奕凡'], female: ['楚轻柔', '安夏'] },
    job: '独立策展人',
    avatar: '🎨',
    desc: '情感细腻，极富创意，青睐有着独特艺术品位和浪漫情怀的异性。',
    minRequirements: { creativity: 65, charm: 60 },
    traitIds: ['romantic', 'artistic', 'adventurous']
  },
  {
    role: 'normal_worker',
    namePool: ['张伟', '王芳', '李强', '李静'],
    genderMap: { male: ['张伟', '李强'], female: ['王芳', '李静'] },
    job: '普通白领',
    avatar: '💼',
    desc: '温柔体贴，热爱生活，向往安稳的二人世界和踏实的陪伴。',
    minRequirements: {},
    traitIds: ['warm', 'cheerful', 'loyal']
  }
]

/**
 * 依据玩家属性和性别偏好，生成 3 位相亲嘉宾
 */
export function generateMatchmakingGuests(character) {
  const genderPref = character.gender === 'male' ? 'female' : 'male'
  const guests = []
  
  // 洗牌
  const shuffled = guestTemplates.slice().sort(() => Math.random() - 0.5)
  const selectedTemplates = shuffled.slice(0, 3)
  
  selectedTemplates.forEach((tpl, idx) => {
    const names = tpl.genderMap[genderPref] || tpl.namePool
    const name = names[Math.floor(Math.random() * names.length)]
    
    // 计算匹配度 Score (基于玩家属性与嘉宾要求的契合度)
    let score = 60
    if (tpl.role === 'finance_elite') {
      score += Math.round(((character.wealth || 50) - 50) * 0.4 + ((character.intelligence || 50) - 50) * 0.2)
    } else if (tpl.role === 'academic_elite') {
      score += Math.round(((character.education || 50) - 50) * 0.4 + ((character.intelligence || 50) - 50) * 0.2)
    } else if (tpl.role === 'civil_servant') {
      score += Math.round(((character.wisdom || 50) - 50) * 0.4 + ((character.social || 50) - 50) * 0.2)
    } else if (tpl.role === 'artist') {
      score += Math.round(((character.creativity || 50) - 50) * 0.4 + ((character.charm || 50) - 50) * 0.2)
    } else {
      score += Math.round(((character.charm || 50) - 50) * 0.3)
    }
    
    // 限制匹配度在 15-99%
    score = Math.max(15, Math.min(99, score))
    
    // 挑选性格特质
    const traits = personalityTraits.filter(t => tpl.traitIds.includes(t.id))
    
    // 计算花费 (富人收费高，普通人低)
    const cost = tpl.role === 'finance_elite' ? 8 : (tpl.role === 'academic_elite' ? 5 : 2)
    
    guests.push({
      id: `match_guest_${idx}_${Date.now()}`,
      name,
      gender: genderPref === 'male' ? '男' : '女',
      job: tpl.job,
      avatar: tpl.avatar,
      desc: tpl.desc,
      score,
      cost,
      traits,
      role: tpl.role
    })
  })
  
  return guests
}

// ─── 2. 相亲约会场景及博弈逻辑 ─────────────────────────

export const matchmakingDates = {
  finance_elite: {
    text: '你约了金融高管约会，对方将地点选在了一家米其林二星的法式旋转餐厅，席间举手投足尽显高雅，正微笑着询问你的资产理财观。',
    choices: [
      {
        text: '大谈自己未来的资产合理配置及长期主义投资布局',
        effect: { intelligence: 5, wisdom: 5, wealth: -8 }, // 扣除约会钱 (万元为单位，扣除8万元)
        affectionDelta: 25,
        followUp: '对方听后频频点头，赞赏你远超同龄人的高超格局与深厚远见！'
      },
      {
        text: '直白坦言自己是个理财小白，把钱存银行最安心',
        effect: { wisdom: 5, wealth: -8 },
        affectionDelta: -10,
        followUp: '对方微笑但眼神中掩饰不住一闪而过的失望，气氛开始流于客套。'
      }
    ]
  },
  academic_elite: {
    text: '你和高校研究员在一家幽静芬芳的书香茶舍见面，对方递给你一杯龙井茶，并含蓄地和你探讨最近社会热议的一个文化哲学议题。',
    choices: [
      {
        text: '引经据典，发表自己深刻而富有哲学思辨的洞见',
        effect: { wisdom: 10, wealth: -5 },
        affectionDelta: 28,
        followUp: '对方眼中星光闪烁，与你畅聊数小时，直呼找到了灵魂契合之人！'
      },
      {
        text: '插科打诨，把话题转移到最近大火的八卦脱口秀上',
        effect: { happiness: 10, wealth: -5 },
        affectionDelta: -5,
        followUp: '虽然聊得很开心，但对方微笑着表示你的性格更适合当欢喜冤家。'
      }
    ]
  },
  civil_servant: {
    text: '你和机关科长约在一间高雅清幽的茶馆。对方穿着得体，言语低调，温和地和你聊起对未来家庭与事业双重平衡的期望。',
    choices: [
      {
        text: '表达对平稳生活的渴望，支持家庭分工与踏实工作',
        effect: { wisdom: 5, wealth: -3 },
        affectionDelta: 25,
        followUp: '对方对你踏实、顾家的态度大加赞赏，认为你非常适合踏实相守过日子。'
      },
      {
        text: '大谈世界那么大想去环球流浪，讨厌一成不变的平庸',
        effect: { happiness: 10, wealth: -3 },
        affectionDelta: -15,
        followUp: '对方露出礼貌但抗拒的微笑，默默觉得两人根本不是一路人。'
      }
    ]
  },
  artist: {
    text: '独立策展人约你在美术馆的新先锋派艺术展相见，指着一幅巨大的抽象留白画，询问你对这幅极简主义画作的艺术通感。',
    choices: [
      {
        text: '用天马行空的想象力解读光影、孤独与解构主义的自由',
        effect: { creativity: 10, wealth: -2 },
        affectionDelta: 30,
        followUp: '对方听得如痴如醉，紧紧握住你的手，感叹你简直就是她苦寻不得的艺术缪斯！'
      },
      {
        text: '老实承认说看不懂，觉得这不过是泼洒了白色颜料的白纸',
        effect: { wisdom: 5, wealth: -2 },
        affectionDelta: -10,
        followUp: '对方叹了口气，微笑着说艺术可能确实需要一些先天的感知门槛。'
      }
    ]
  },
  normal_worker: {
    text: '你和温柔的普通白领约在市中心的一家网红猫咖，周围满是打呼噜的猫咪。对方温柔地递给猫条，并聊起日常加班的辛酸。',
    choices: [
      {
        text: '感同身受地倾听，分享自己排解压力的逗趣小招式',
        effect: { social: 10, wealth: -1 },
        affectionDelta: 25,
        followUp: '对方被你幽默温情的互动逗得开心大笑，倍感被治愈，好感倍增！'
      },
      {
        text: '长篇大论教导对方如何自我奋斗，或者冷淡表示打工人就是惨',
        effect: { wisdom: 5, wealth: -1 },
        affectionDelta: -10,
        followUp: '对方有些尴尬地收回猫条，觉得你性格有些强势，让人喘不过气。'
      }
    ]
  }
}

// ─── 3. 朋友圈动态生成与神评库 ───────────────────────

const roleMomentsTemplates = {
  father: [
    {
      text: '茶香怡人，养生秘诀在此。附：《高血压人群每日宜忌，转给关心的人》[链接]',
      comments: [
        { text: '爸爸，我已经仔细研读了，这就转发给全家！', affectionDelta: 10, happiness: 5 },
        { text: '少喝点隔夜茶，少转发这些虚假养生伪科学！', affectionDelta: -8, happiness: 5 }
      ]
    }
  ],
  mother: [
    {
      text: '儿行千里母担忧，最近气温变化莫测，出门在外一定要记得穿秋裤！[爱心]',
      comments: [
        { text: '妈，我已经穿上了，特别保暖，您也多注意身体！', affectionDelta: 10, happiness: 5 },
        { text: '知道了知道了，天天唠叨这个烦不烦啊。', affectionDelta: -10, happiness: -5 }
      ]
    }
  ],
  boss: [
    {
      text: '奋斗是青春最亮丽的底色！今晚公司依然灯火通明，看见大家拼搏的身影，深感欣慰！[奋斗][大拇指]',
      comments: [
        { text: '老板带头敬业奋斗，公司必将腾飞！我也在工位冲锋！', affectionDelta: 12, stress: 15 },
        { text: '老板，物业问我们深夜长明灯浪费电，请问加班费能调高一点吗？', affectionDelta: -18, happiness: 15 }
      ]
    }
  ],
  rival: [
    {
      text: '又成功谈下了一个大客户，辛苦奋斗没有白费，看来有些人距离我的业绩差距是越来越大咯~[得意][大杯可乐]',
      comments: [
        { text: '行行行，你最棒，恭喜升官发财，祝早日加班进医院。', affectionDelta: -15, happiness: 10 },
        { text: '确实厉害，看来我要虚心向你多多取经学习了！', affectionDelta: 10, wisdom: 5 }
      ]
    }
  ],
  partner: [
    {
      text: '今天傍晚的天空是浪漫的粉紫色，真想和某人手牵手一起去江边散步看日落呀~[玫瑰][爱心]',
      comments: [
        { text: '已经在去接你的路上了，等我，我们今晚去江边！❤️', affectionDelta: 15, happiness: 10 },
        { text: '今天确实挺热的，建议你多喝热水少吹冷风。', affectionDelta: -8, wisdom: 5 }
      ]
    }
  ],
  ex: [
    {
      text: '终究是一别两宽，各自安好。回忆随风而去，未来不再回头。💔',
      comments: [
        { text: '祝你幸福，希望我们都能在各自的未来闪闪发光。', affectionDelta: 5, wisdom: 8 },
        { text: '哟，这么快就无病呻吟装文青了？真好笑。', affectionDelta: -20, happiness: 8 }
      ]
    }
  ],
  default_friend: [
    {
      text: '今天周末和三五好友一起聚餐撸串，喝点冰啤酒，生活不过如此，惬意！🍻[烧烤]',
      comments: [
        { text: '哇！这小烧烤看起来太香了，下次聚餐带我一个！', affectionDelta: 8, social: 5 },
        { text: '少吃大排档，重油重盐不卫生，别年纪轻轻把胃作废了。', affectionDelta: -5, wisdom: 5 }
      ]
    }
  ]
}

/**
 * 依据活跃 NPC 列表，为每位活着的 NPC 抽取生成一条朋友圈动态
 */
export function generateMoments(npcs, character) {
  if (!npcs || !npcs.length) return []
  
  const activeNPCs = npcs.filter(n => n.isActive && n.status === 'alive')
  const moments = []
  
  activeNPCs.forEach((npc, index) => {
    // 决定匹配什么类别的文案句库
    let category = 'default_friend'
    if (npc.role === 'father') category = 'father'
    else if (npc.role === 'mother') category = 'mother'
    else if (npc.role === 'boss') category = 'boss'
    else if (npc.role === 'rival') category = 'rival'
    else if (npc.role === 'partner') category = 'partner'
    else if (npc.role === 'ex') category = 'ex'
    
    const templates = roleMomentsTemplates[category]
    if (templates && templates.length > 0) {
      const tpl = templates[Math.floor(Math.random() * templates.length)]
      
      moments.push({
        id: `moment_${npc.id}_${Date.now()}_${index}`,
        npcId: npc.id,
        npcName: npc.name,
        npcRole: npc.role,
        text: tpl.text.replace('{name}', npc.name),
        comments: tpl.comments,
        liked: false,
        commented: null, // 存储玩家选择的评论对象
        time: '今天'
      })
    }
  })
  
  // 随机排序朋友圈，营造信息流错落感
  return moments.sort(() => Math.random() - 0.5)
}
