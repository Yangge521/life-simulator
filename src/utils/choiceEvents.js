// 选择性事件 - 基于故事状态的连贯抉择，严格按年龄分配
import { generatePartnerName } from './storyEngine.js'

export const choiceEvents = {
  // 婴儿期 0-2岁 - 基本没有选择事件
  baby: [],
  
  // 幼儿期 3-5岁
  toddler: [
    {
      id: 'first_hobby',
      text: '父母问你想学什么？',
      conditions: { minAge: 4, maxAge: 5 },
      choices: [
        { text: '学画画', effect: { creativity: 10 }, followUp: '你开始涂涂画画', tag: 'learned_art' },
        { text: '学跳舞', effect: { charm: 5, health: 5 }, followUp: '你开始学习舞蹈', tag: 'learned_dance' },
        { text: '什么都不想学', effect: { happiness: 5 }, followUp: '你继续快乐地玩耍' }
      ]
    }
,
    {
      id: 'kindergarten_social',
      text: '幼儿园老师说你不太合群，你想怎么做？',
      conditions: { minAge: 3, maxAge: 5 },
      choices: [
        { text: '主动交朋友', effect: { social: 10, happiness: 5 }, followUp: '你交到了第一个好朋友', tag: 'social_butterfly' },
        { text: '一个人玩也开心', effect: { creativity: 5, happiness: 5 }, followUp: '你学会了自己找乐子' },
        { text: '拉着妈妈不松手', effect: { happiness: -5 }, followUp: '你哭着不想去幼儿园' }
      ]
    },
    {
      id: 'pet_choice',
      text: '街上有人在卖小动物，你想要哪个？',
      conditions: { minAge: 4, maxAge: 5 },
      choices: [
        { text: '小猫咪', effect: { happiness: 10, social: 5 }, followUp: '你有了一只可爱的小猫', tag: 'has_pet' },
        { text: '小狗狗', effect: { happiness: 10, health: 5 }, followUp: '你有了一只忠诚的小狗', tag: 'has_pet' },
        { text: '什么都不要', effect: { wisdom: 3 }, followUp: '你觉得还是不养比较好' }
      ]
    },
    {
      id: 'toddler_shy',
      text: '家里来了客人，你躲在妈妈背后不敢出来',
      conditions: { minAge: 3, maxAge: 5 },
      choices: [
        { text: '鼓起勇气打招呼', effect: { social: 8, charm: 5, happiness: 5 }, followUp: '叔叔阿姨都夸你懂事' },
        { text: '继续躲在妈妈身后', effect: { happiness: -3, social: -3 }, followUp: '妈妈帮你圆了场' },
        { text: '递了一颗糖给客人', effect: { charm: 10, social: 5, happiness: 5 }, followUp: '一颗糖化解了尴尬' }
      ]
    },
    {
      id: 'toddler_sick',
      text: '你突然生病了，要去医院',
      conditions: { minAge: 3, maxAge: 5 },
      choices: [
        { text: '勇敢打针不哭', effect: { health: 5, wisdom: 5, happiness: 5 }, followUp: '护士姐姐都夸你厉害' },
        { text: '哭着挣扎', effect: { health: 3, happiness: -5 }, followUp: '全医院都听到了你的哭声' },
        { text: '要妈妈抱着才肯打', effect: { happiness: 5, social: 3 }, followUp: '妈妈抱着你，你感觉好多了' }
      ]
    },
    {
      id: 'toddler_share',
      text: '你有两个糖果，旁边的小朋友一个都没有',
      conditions: { minAge: 3, maxAge: 5 },
      choices: [
        { text: '分一个给小朋友', effect: { social: 10, happiness: 8, wisdom: 5 }, followUp: '你交到了一个好朋友', tag: 'generous' },
        { text: '两个都自己吃', effect: { happiness: 5, wisdom: -3 }, followUp: '你吃得很开心' },
        { text: '假装没看见', effect: { happiness: 3 }, followUp: '你悄悄地溜走了' }
      ]
    }
  ],
  
  // 童年期 6-11岁
  child: [
    {
      id: 'hobby_choice',
      text: '父母问你想学什么兴趣班？',
      conditions: { minAge: 6, maxAge: 8 },
      choices: [
        { text: '学钢琴', effect: { creativity: 10, intelligence: 5 }, followUp: '你开始了漫长的练琴生涯', tag: 'learned_piano' },
        { text: '学画画', effect: { creativity: 15 }, followUp: '你发现自己很有艺术天赋', tag: 'learned_art' },
        { text: '学体育', effect: { health: 15, social: 5 }, followUp: '你的身体素质越来越好', tag: 'learned_sports' },
        { text: '学编程', effect: { intelligence: 15 }, followUp: '你对电脑产生了浓厚兴趣', tag: 'learned_coding' }
      ]
    },
    {
      id: 'bully_witness',
      text: '你看到有人在欺负同学，你会怎么做？',
      conditions: { minAge: 7, maxAge: 11 },
      choices: [
        { text: '挺身而出', effect: { social: 10, happiness: 5, health: -5 }, followUp: '你成了班里的小英雄', tag: 'brave_child' },
        { text: '告诉老师', effect: { wisdom: 5, social: 5 }, followUp: '老师处理了这件事' },
        { text: '假装没看见', effect: { happiness: -5 }, followUp: '你心里有些愧疚' },
        { text: '事后安慰被欺负的同学', effect: { social: 10, charm: 5 }, followUp: '你交到了一个好朋友' }
      ]
    },
    {
      id: 'exam_reward',
      text: '期末考试你考了班级前三名，父母问你想要什么奖励？',
      conditions: { minAge: 7, maxAge: 11, minIntelligence: 55 },
      choices: [
        { text: '新玩具', effect: { happiness: 15 }, followUp: '你得到了心仪已久的玩具' },
        { text: '去游乐园', effect: { happiness: 20, wealth: -5 }, followUp: '你度过了快乐的一天' },
        { text: '存起来', effect: { wealth: 10, wisdom: 5 }, followUp: '你的小金库又增加了', tag: 'saver' },
        { text: '买书', effect: { intelligence: 10 }, followUp: '你沉浸在知识的海洋里', tag: 'bookworm' }
      ]
    },
    {
      id: 'friend_conflict',
      text: '你和好朋友因为一件小事吵架了',
      conditions: { minAge: 7, maxAge: 11 },
      choices: [
        { text: '主动道歉', effect: { social: 10, wisdom: 5 }, followUp: '你们和好如初' },
        { text: '等对方先道歉', effect: { happiness: -5 }, followUp: '你们冷战了好几天' },
        { text: '找其他朋友玩', effect: { social: 5 }, followUp: '你交到了新朋友' }
      ]
    },
    {
      id: 'pet_death',
      text: '你养的小宠物去世了，你会怎么做？',
      conditions: { minAge: 7, maxAge: 11, hasFlag: 'has_pet' },
      choices: [
        { text: '大哭一场', effect: { happiness: -10, wisdom: 5 }, followUp: '你第一次体会到失去的痛苦' },
        { text: '给它办一个小葬礼', effect: { wisdom: 10 }, followUp: '你学会了尊重生命' },
        { text: '请求父母再养一只', effect: { happiness: 5 }, followUp: '你有了新的小伙伴' }
      ]
    }
  ,
    {
      id: 'talent_show',
      text: '学校举办才艺表演，你要参加吗？',
      conditions: { minAge: 8, maxAge: 11 },
      choices: [
        { text: '上台表演', effect: { charm: 10, social: 10, happiness: 5 }, followUp: '你在台上闪闪发光', tag: 'performer' },
        { text: '在台下帮忙', effect: { social: 5, wisdom: 5 }, followUp: '你成了幕后英雄' },
        { text: '不想参加', effect: { happiness: -3 }, followUp: '你看着同学们在台上表演' }
      ]
    },
    {
      id: 'found_wallet',
      text: '你在路上捡到一个钱包，里面有很多钱',
      conditions: { minAge: 7, maxAge: 11 },
      choices: [
        { text: '交给警察', effect: { wisdom: 15, social: 5 }, followUp: '失主感谢了你', tag: 'honest' },
        { text: '拿去买零食', effect: { wealth: 5, happiness: 5, wisdom: -10 }, followUp: '你心里有些不安' },
        { text: '原地等失主', effect: { wisdom: 10, social: 5 }, followUp: '失主找到了，给你了奖励', tag: 'honest' }
      ]
    },
    {
      id: 'science_interest',
      text: '你对科学实验产生了浓厚兴趣',
      conditions: { minAge: 9, maxAge: 11 },
      choices: [
        { text: '报名科学兴趣班', effect: { intelligence: 15 }, followUp: '你成了小科学家', tag: 'science_nerd' },
        { text: '在家做小实验', effect: { intelligence: 10, creativity: 5 }, followUp: '你的房间变成了实验室' },
        { text: '算了太麻烦', effect: { happiness: 3 }, followUp: '你对科学的热情慢慢淡了' }
      ]
    },
    {
      id: 'grandparent_story',
      text: '奶奶/外婆给你讲了一个家族的老故事',
      conditions: { minAge: 7, maxAge: 11 },
      choices: [
        { text: '认真听并追问细节', effect: { wisdom: 12, social: 5 }, followUp: '你了解了家族的根', tag: 'family_history' },
        { text: '听了一会儿就跑去玩了', effect: { happiness: 5 }, followUp: '你错过了有趣的故事' },
        { text: '拿本子把故事记下来', effect: { creativity: 10, wisdom: 8 }, followUp: '你成了家族的小历史学家' }
      ]
    },
    {
      id: 'school_leader',
      text: '班里要选班干部，你想试试吗？',
      conditions: { minAge: 8, maxAge: 11 },
      choices: [
        { text: '竞选班长', effect: { social: 12, charm: 8, happiness: 5 }, followUp: '你成功当选了！', tag: 'leader_kid' },
        { text: '竞选学习委员', effect: { social: 8, intelligence: 5 }, followUp: '你对学习更认真了' },
        { text: '不竞选，帮朋友拉票', effect: { social: 5, wisdom: 5 }, followUp: '你的好朋友当选了' }
      ]
    },
    {
      id: 'new_game',
      text: '同学带了一个新玩具/新游戏来学校，大家都围着看',
      conditions: { minAge: 7, maxAge: 11 },
      choices: [
        { text: '凑过去一起玩', effect: { social: 10, happiness: 8 }, followUp: '你认识了新朋友' },
        { text: '专心做自己的事', effect: { wisdom: 5, intelligence: 5 }, followUp: '你更专注于自己的事' },
        { text: '回家缠着父母买', effect: { happiness: 5, wealth: -5 }, followUp: '父母答应了，但你要洗碗一周' }
      ]
    },
    {
      id: 'school_lunch',
      text: '你带了好吃的便当，同学想跟你换',
      conditions: { minAge: 7, maxAge: 11 },
      choices: [
        { text: '大方交换', effect: { social: 8, happiness: 10 }, followUp: '你们成了饭搭子' },
        { text: '只分享不交换', effect: { social: 5, charm: 5 }, followUp: '同学很感谢你' },
        { text: '拒绝，自己吃', effect: { happiness: 3 }, followUp: '你一个人吃完了便当' }
      ]
    }
]
}


// 青少年期 12-17岁
choiceEvents.teen = [
  {
    id: 'first_love_response',
    text: '{partnerName}向你表白了，你会怎么回应？',
    conditions: { minAge: 14, maxAge: 17, hasFlag: 'has_crush' },
    generatePartner: true,
    choices: [
      { text: '接受，开始恋爱', effect: { happiness: 20, charm: 5 }, followUp: '你体验到了初恋的甜蜜', stateAction: { action: 'START_DATING' } },
      { text: '拒绝，专心学习', effect: { intelligence: 5, wisdom: 5 }, followUp: '你把心思放在了学业上' },
      { text: '说考虑一下', effect: { wisdom: 5 }, followUp: '你需要时间想清楚' }
    ]
  },
  {
    id: 'relationship_trouble',
    text: '你和{partnerName}因为一些事情产生了矛盾',
    conditions: { minAge: 14, maxAge: 17, relationshipStatus: 'dating' },
    choices: [
      { text: '主动道歉和好', effect: { happiness: 10, wisdom: 5 }, followUp: '你们和好如初' },
      { text: '冷战等对方先低头', effect: { happiness: -5 }, followUp: '气氛变得很尴尬' },
      { text: '提出分手', effect: { happiness: -15, wisdom: 10 }, followUp: '你结束了这段感情', stateAction: { action: 'BREAK_UP' } }
    ]
  },
  {
    id: 'high_school_choice',
    text: '中考结束，你要选择去哪所高中？',
    conditions: { minAge: 15, maxAge: 15, educationLevel: 'middle' },
    choices: [
      { text: '重点高中', effect: { intelligence: 10, education: 15, happiness: -5 }, followUp: '你进入了竞争激烈的环境', stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'high', schoolType: 'elite' } } },
      { text: '普通高中', effect: { happiness: 5, social: 10 }, followUp: '你有更多时间发展自己', stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'high', schoolType: 'normal' } } },
      { text: '艺术高中', effect: { creativity: 20, education: 5 }, followUp: '你走上了艺术道路', conditions: { hasFlag: 'learned_art' }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'high', schoolType: 'art' } } },
      { text: '体育学校', effect: { health: 20, education: 5 }, followUp: '你走上了体育道路', conditions: { hasFlag: 'learned_sports' }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'high', schoolType: 'sports' } } }
    ]
  },
  {
    id: 'parent_conflict',
    text: '你和父母因为成绩/恋爱问题发生了争吵',
    conditions: { minAge: 13, maxAge: 17 },
    choices: [
      { text: '冷静沟通', effect: { wisdom: 10, social: 5 }, followUp: '你们达成了理解' },
      { text: '摔门离开', effect: { happiness: -10 }, followUp: '你独自在外面待了很久' },
      { text: '写信表达', effect: { wisdom: 10, creativity: 5 }, followUp: '父母看了信后很感动' }
    ]
  },
  {
    id: 'internet_addiction',
    text: '你发现自己越来越沉迷网络游戏',
    conditions: { minAge: 13, maxAge: 17 },
    choices: [
      { text: '努力戒掉', effect: { wisdom: 10, intelligence: 5 }, followUp: '你成功控制了自己' },
      { text: '继续玩', effect: { happiness: 5, intelligence: -10, health: -5 }, followUp: '你的成绩开始下滑' },
      { text: '把游戏当职业发展', effect: { creativity: 10 }, followUp: '你开始研究游戏设计', tag: 'gamer' }
    ]
  },
  {
    id: 'summer_plan',
    text: '暑假到了，你想做什么？',
    conditions: { minAge: 13, maxAge: 17 },
    choices: [
      { text: '打工赚钱', effect: { wealth: 10, social: 5 }, followUp: '你体验了赚钱的辛苦' },
      { text: '参加补习班', effect: { intelligence: 10 }, followUp: '你的成绩有所提升' },
      { text: '去旅游', effect: { happiness: 15, wealth: -10 }, followUp: '你开阔了眼界' },
      { text: '宅在家里', effect: { happiness: 5 }, followUp: '你度过了轻松的假期' }
    ]
  },
  {
    id: 'teen_relationship',
    text: '你对班上的一个同学有了特别的感觉',
    conditions: { minAge: 13, maxAge: 17 },
    choices: [
      { text: '勇敢表白', effect: { happiness: 15, social: 5 }, followUp: '青春的悸动是最美好的回忆', tag: 'first_love' },
      { text: '默默暗恋', effect: { happiness: 5, wisdom: 5 }, followUp: '你把这份感情藏在心里' },
      { text: '专注学习', effect: { intelligence: 10, education: 5 }, followUp: '你选择了把精力放在学业上' }
    ]
  },
  {
    id: 'teen_bully',
    text: '你被同学欺负了',
    conditions: { minAge: 12, maxAge: 17 },
    choices: [
      { text: '告诉老师', effect: { wisdom: 8, social: 5 }, followUp: '老师帮你解决了问题', tag: 'bully_resolved' },
      { text: '自己面对', effect: { courage: 10, happiness: -5 }, followUp: '你学会了自己保护自己' },
      { text: '告诉家长', effect: { social: 8, happiness: 5 }, followUp: '家人给了你支持和安慰' }
    ]
  },
  {
    id: 'teen_clique',
    text: '你被邀请加入学校的小团体',
    conditions: { minAge: 13, maxAge: 17 },
    choices: [
      { text: '加入主流圈子', effect: { social: 10, happiness: 5 }, followUp: '你融入了新群体' },
      { text: '加入边缘群体', effect: { creativity: 8, social: 5 }, followUp: '你认识了不一样的人', tag: 'alternative_kid' },
      { text: '保持独立', effect: { wisdom: 8, intelligence: 5 }, followUp: '你保持了自我的独立性' }
    ]
  },
  {
    id: 'teen_competition',
    text: '你在比赛中获得了第一名',
    conditions: { minAge: 12, maxAge: 17, intelligence: 20 },
    choices: [
      { text: '继续努力训练', effect: { intelligence: 10, reputation: 8 }, followUp: '你成了学校的风云人物' },
      { text: '低调处理', effect: { wisdom: 8, happiness: 5 }, followUp: '你保持谦逊继续前行' },
      { text: '骄傲自满', effect: { happiness: 5, wisdom: -10 }, followUp: '你开始停滞不前' }
    ]
  },
  {
    id: 'teen_health_issue',
    text: '你发现自己身体出现了一些问题',
    conditions: { minAge: 13, maxAge: 17 },
    choices: [
      { text: '告诉父母并就医', effect: { health: 15, happiness: 5 }, followUp: '及时治疗,恢复健康' },
      { text: '自己买点药', effect: { health: 5, wealth: -5 }, followUp: '情况有所缓解' },
      { text: '觉得会自己好', effect: { health: -10, happiness: -5 }, followUp: '问题变得更加严重了' }
    ]
  },
  {
    id: 'teen_part_time',
    text: '你想找一份兼职工作',
    conditions: { minAge: 15, maxAge: 17 },
    choices: [
      { text: '去餐厅打工', effect: { wealth: 8, social: 8, happiness: -3 }, followUp: '虽然辛苦,但学到了很多' },
      { text: '做家教', effect: { intelligence: 8, wealth: 5, education: 5 }, followUp: '你巩固了自己的知识' },
      { text: '网上做兼职', effect: { wealth: 5, creativity: 5 }, followUp: '你找到了灵活的工作方式' }
    ]
  },
  {
    id: 'teen_dream',
    text: '你开始思考自己长大后想做什么',
    conditions: { minAge: 14, maxAge: 17 },
    choices: [
      { text: '成为科学家', effect: { intelligence: 8, creativity: 8 }, followUp: '你开始认真学习科学知识', tag: 'dream_scientist' },
      { text: '成为艺术家', effect: { creativity: 10, happiness: 5 }, followUp: '你开始培养艺术爱好', tag: 'dream_artist' },
      { text: '成为企业家', effect: { intelligence: 5, creativity: 8 }, followUp: '你开始关注商业世界', tag: 'dream_entrepreneur' },
      { text: '还没想好', effect: { wisdom: 5, happiness: 3 }, followUp: '未来还很长,慢慢探索' }
    ]
  },
  {
    id: 'teen_phone',
    text: '父母想监控你的手机使用',
    conditions: { minAge: 12, maxAge: 17 },
    choices: [
      { text: '理解父母的苦心', effect: { wisdom: 8, social: 5 }, followUp: '父母对你更加信任了' },
      { text: '激烈反抗', effect: { happiness: -10, social: -5 }, followUp: '家里气氛变得紧张' },
      { text: '偷偷破解监控', effect: { creativity: 10, wisdom: -5 }, followUp: '你觉得自己赢了' }
    ]
  },
  {
    id: 'teen_appearance',
    text: '你对自己的外表很不满意',
    conditions: { minAge: 13, maxAge: 17 },
    choices: [
      { text: '努力改变形象', effect: { charm: 10, happiness: 8 }, followUp: '你变得更自信了' },
      { text: '接受自己', effect: { wisdom: 10, happiness: 5 }, followUp: '你学会了欣赏自己' },
      { text: '陷入自卑', effect: { happiness: -15, social: -5 }, followUp: '你变得不爱说话了' }
    ]
  },
  {
    id: 'teen_friend_conflict',
    text: '你最好的朋友和你闹翻了',
    conditions: { minAge: 12, maxAge: 17 },
    choices: [
      { text: '主动道歉和好', effect: { social: 8, happiness: 8 }, followUp: '你们的友谊更加牢固了' },
      { text: '冷战等待对方先低头', effect: { happiness: -5, wisdom: 3 }, followUp: '你们的关系变得微妙' },
      { text: '找新朋友', effect: { social: 5, happiness: -3 }, followUp: '你认识了新的朋友' }
    ]
  },
  {
    id: 'teen_gaokao_pressure',
    text: '高考临近，你感受到了前所未有的压力',
    conditions: { minAge: 17, maxAge: 18 },
    choices: [
      { text: '拼命刷题冲刺', effect: { intelligence: 10, education: 8, health: -5 }, followUp: '你的成绩有了明显提升' },
      { text: '调整心态劳逸结合', effect: { intelligence: 5, health: 5, wisdom: 5 }, followUp: '你找到了平衡的方法' },
      { text: '已经放弃治疗了', effect: { happiness: -5, education: -5 }, followUp: '你觉得路不止一条' }
    ]
  },
  {
    id: 'teen_internet_friend',
    text: '你在网上认识了一个很聊得来的网友',
    conditions: { minAge: 14, maxAge: 17 },
    choices: [
      { text: '开视频聊天认识一下', effect: { social: 10, happiness: 8 }, followUp: '你们成了跨越屏幕的好朋友' },
      { text: '保持神秘感', effect: { creativity: 5, happiness: 5 }, followUp: '你享受这种纯粹的精神交流' },
      { text: '告诉父母让他们放心', effect: { wisdom: 8, social: 5 }, followUp: '父母帮你把关，安全第一' }
    ]
  },
  {
    id: 'teen_style_change',
    text: '你想彻底改变自己的形象',
    conditions: { minAge: 14, maxAge: 17 },
    choices: [
      { text: '潮男/潮女路线', effect: { charm: 12, wealth: -5, happiness: 5 }, followUp: '你成了班里的时尚风向标' },
      { text: '文艺小清新', effect: { charm: 5, creativity: 8, happiness: 8 }, followUp: '你的朋友圈变了画风' },
      { text: '做自己就好', effect: { wisdom: 8, happiness: 3 }, followUp: '你选择了最舒服的状态' }
    ]
  },
  {
    id: 'teen_first_job',
    text: '你想利用暑假打一次工',
    conditions: { minAge: 15, maxAge: 17 },
    choices: [
      { text: '去奶茶店/快餐店', effect: { wealth: 5, social: 8, health: -3 }, followUp: '你第一次体会到了赚钱的辛苦' },
      { text: '帮邻居带小孩/遛狗', effect: { wealth: 3, social: 5, happiness: 5 }, followUp: '简单但很充实的暑假' },
      { text: '做线上小买卖', effect: { wealth: 8, intelligence: 5, creativity: 5 }, followUp: '你发现了商业的乐趣' }
    ]
  },
  {
    id: 'teen_secret_admirer',
    text: '你收到了一个匿名表白信',
    conditions: { minAge: 14, maxAge: 17 },
    choices: [
      { text: '想办法找出是谁', effect: { intelligence: 5, happiness: 10 }, followUp: '你发现是隔壁班那个安静的同学' },
      { text: '不理会，假装不在意', effect: { wisdom: 5 }, followUp: '你没放在心上，但偶尔还是会想' },
      { text: '大大方方公开回应', effect: { social: 8, charm: 5 }, followUp: '你成了校园话题人物' }
    ]
  }
]


// 青年期 18-34岁
choiceEvents.youth = [
  {
    id: 'college_choice',
    text: '高考结束，你要选择什么方向？',
    conditions: { minAge: 18, maxAge: 18, educationLevel: 'high' },
    choices: [
      { text: '985名校', effect: { education: 20, intelligence: 10 }, followUp: '你进入了顶尖学府', conditions: { minIntelligence: 70 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'university', schoolType: 'elite' } } },
      { text: '普通本科', effect: { happiness: 10, education: 10 }, followUp: '你学着自己喜欢的东西', stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'university', schoolType: 'normal' } } },
      { text: '出国留学', effect: { education: 15, wealth: -30, social: 10 }, followUp: '你开始了海外求学之路', conditions: { minWealth: 60 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'university', schoolType: 'overseas' } }, tag: 'studied_abroad' },
      { text: '直接工作', effect: { wealth: 15 }, followUp: '你比同龄人更早进入社会', stateAction: { action: 'START_CAREER', data: { job: '基层员工' } } }
    ]
  },
  {
    id: 'college_major',
    text: '你要选择什么专业？',
    conditions: { minAge: 18, maxAge: 19, educationLevel: 'university' },
    choices: [
      { text: '计算机', effect: { intelligence: 10 }, followUp: '你进入了IT行业', tag: 'cs_major' },
      { text: '金融', effect: { wealth: 5, intelligence: 5 }, followUp: '你学习金融知识', tag: 'finance_major' },
      { text: '医学', effect: { intelligence: 10, health: 5 }, followUp: '你立志成为医生', tag: 'medical_major' },
      { text: '艺术设计', effect: { creativity: 15 }, followUp: '你发挥创意才能', tag: 'art_major' },
      { text: '法律', effect: { intelligence: 10, wisdom: 5 }, followUp: '你学习法律知识', tag: 'law_major' }
    ]
  },
  {
    id: 'graduation_path',
    text: '大学毕业了，你打算怎么发展？',
    conditions: { minAge: 22, maxAge: 23, educationLevel: 'university' },
    choices: [
      { text: '考研深造', effect: { education: 15, intelligence: 10 }, followUp: '你选择继续学习', stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'graduate' } } },
      { text: '进大公司', effect: { wealth: 15, happiness: 5 }, followUp: '你成为了一名白领', stateAction: { action: 'START_CAREER', data: { job: '公司职员', company: '大公司' } } },
      { text: '考公务员', effect: { wealth: 10, happiness: 10 }, followUp: '你开始准备公考', stateAction: { action: 'START_CAREER', data: { job: '公务员' } }, tag: 'civil_servant' },
      { text: '自主创业', effect: { wealth: -10, wisdom: 15 }, followUp: '你开始了创业之路', stateAction: { action: 'START_CAREER', data: { job: '创业者' } }, tag: 'entrepreneur' }
    ]
  },
  {
    id: 'relationship_serious',
    text: '你和{partnerName}交往了几年，对方想结婚',
    conditions: { minAge: 25, maxAge: 34, relationshipStatus: 'dating' },
    choices: [
      { text: '答应结婚', effect: { happiness: 25, wealth: -20 }, followUp: '你们开始筹备婚礼', stateAction: { action: 'GET_MARRIED' }, tag: 'married' },
      { text: '觉得还不是时候', effect: { wisdom: 5 }, followUp: '你想再等等' },
      { text: '提出分手', effect: { happiness: -20, wisdom: 10 }, followUp: '你觉得不合适', stateAction: { action: 'BREAK_UP' } }
    ]
  },
  {
    id: 'meet_someone_new',
    text: '你在工作中遇到了让你心动的{partnerName}',
    conditions: { minAge: 23, maxAge: 32, relationshipStatus: 'single', careerStatus: 'employed' },
    generatePartner: true,
    choices: [
      { text: '主动追求', effect: { happiness: 15, charm: 5 }, followUp: '你们开始交往了', stateAction: { action: 'START_DATING' } },
      { text: '保持距离', effect: { wisdom: 5 }, followUp: '你选择专注工作' },
      { text: '请朋友帮忙介绍', effect: { social: 5 }, followUp: '朋友帮你牵线搭桥' }
    ]
  },
  {
    id: 'buy_house',
    text: '你攒够了首付，要买房吗？',
    conditions: { minAge: 26, maxAge: 34, minWealth: 50, careerStatus: 'employed' },
    choices: [
      { text: '买房安家', effect: { wealth: -30, happiness: 15 }, followUp: '你有了自己的家', tag: 'homeowner' },
      { text: '继续租房投资', effect: { wealth: 10, wisdom: 5 }, followUp: '你把钱用于投资' },
      { text: '和父母同住', effect: { wealth: 15, happiness: -5 }, followUp: '你省下了一笔钱' }
    ]
  },
  {
    id: 'job_offer',
    text: '你收到了一份高薪但需要经常加班的工作邀请',
    conditions: { minAge: 25, maxAge: 34, careerStatus: 'employed' },
    choices: [
      { text: '接受，为了钱拼一把', effect: { wealth: 25, health: -10, happiness: -5 }, followUp: '你开始了高强度工作' },
      { text: '拒绝，生活更重要', effect: { happiness: 10, wisdom: 5 }, followUp: '你选择了工作生活平衡' },
      { text: '谈判争取更好条件', effect: { wealth: 15, charm: 5 }, followUp: '你成功争取到了更好的待遇' }
    ]
  },
  {
    id: 'have_child_decision',
    text: '你们结婚后，要不要孩子？',
    conditions: { minAge: 26, maxAge: 34, hasFlag: 'married', notFlag: 'has_child' },
    choices: [
      { text: '要一个孩子', effect: { happiness: 20, wealth: -15 }, followUp: '你们迎来了新生命', stateAction: { action: 'HAVE_CHILD', data: { childName: '小宝' } } },
      { text: '暂时不要', effect: { wealth: 10 }, followUp: '你们决定先享受二人世界' },
      { text: '丁克到底', effect: { happiness: 5, wealth: 15 }, followUp: '你们选择了丁克生活', tag: 'dink' }
    ]
  }
,
    {
      id: 'startup_chance',
      text: '你有一个创业想法，朋友愿意合伙',
      conditions: { minAge: 20, maxAge: 30, careerStatus: 'employed' },
      choices: [
        { text: '辞职创业', effect: { wealth: -20, happiness: 10, wisdom: 15 }, followUp: '你踏上了创业之路', tag: 'entrepreneur', stateAction: { action: 'START_CAREER', data: { job: '创业者', type: 'entrepreneur' } } },
        { text: '兼职试水', effect: { wealth: -5, health: -5, wisdom: 10 }, followUp: '你白天上班晚上创业' },
        { text: '再等等', effect: { wisdom: 5 }, followUp: '机会稍纵即逝' }
      ]
    },
    {
      id: 'travel_abroad',
      text: '你有机会出国旅行一次',
      conditions: { minAge: 20, maxAge: 34, minWealth: 30 },
      choices: [
        { text: '去欧洲文化之旅', effect: { wisdom: 15, happiness: 20, wealth: -15, creativity: 10 }, followUp: '你看到了不一样的世界', tag: 'europe_trip' },
        { text: '去东南亚冒险', effect: { happiness: 15, health: 5, wealth: -10, wisdom: 10 }, followUp: '你体验了异域风情', tag: 'asia_trip' },
        { text: '把钱省下来', effect: { wealth: 10 }, followUp: '你选择务实' }
      ]
    },
    {
      id: 'friend_startup_invite',
      text: '好朋友邀请你加入他的创业团队',
      conditions: { minAge: 22, maxAge: 32 },
      choices: [
        { text: '加入，全力以赴', effect: { wealth: -10, social: 10, happiness: 10 }, followUp: '你们开始并肩作战', tag: 'cofounder' },
        { text: '以投资人身份参与', effect: { wealth: -15, wisdom: 5 }, followUp: '你成了小股东', conditions: { minWealth: 40 } },
        { text: '婉拒，风险太大', effect: { wisdom: 5 }, followUp: '你选择了稳妥' }
      ]
    },
    {
      id: 'best_friend_crisis',
      text: '你最好的朋友遇到了人生低谷，需要你的帮助',
      conditions: { minAge: 25, maxAge: 40 },
      choices: [
        { text: '借钱帮助', effect: { wealth: -15, social: 20, happiness: 10 }, followUp: '朋友感激涕零', tag: 'loyal_friend' },
        { text: '陪伴安慰', effect: { social: 15, happiness: 5, wisdom: 5 }, followUp: '朋友感到温暖' },
        { text: '介绍机会', effect: { social: 10, charm: 5 }, followUp: '朋友找到了新方向' }
      ]
    },
    {
      id: 'ex_reunion',
      text: '你在街角偶遇了前任',
      conditions: { minAge: 25, maxAge: 45, relationshipStatus: 'single' },
      choices: [
        { text: '重新联系', effect: { happiness: 10, social: 5 }, followUp: '你们成了朋友' },
        { text: '礼貌寒暄', effect: { wisdom: 5 }, followUp: '你学会了释然' },
        { text: '假装没看见', effect: { happiness: -5 }, followUp: '心里还是有些波澜' }
      ]
    },
    {
      id: 'career_crossroads',
      text: '你收到了一个重要的工作机会',
      conditions: { minAge: 22, maxAge: 40, career: 30 },
      choices: [
        { text: '接受挑战', effect: { career: 20, wealth: 15, happiness: -5 }, followUp: '你选择了更大的舞台', tag: 'career_climber' },
        { text: '留在原地', effect: { happiness: 10, wisdom: 5 }, followUp: '你选择了稳定' },
        { text: '先考虑家人意见', effect: { social: 8, happiness: 5 }, followUp: '家人支持你的决定' }
      ]
    },
    {
      id: 'midlife_reflection',
      text: '深夜,你突然思考人生的意义',
      conditions: { minAge: 35, maxAge: 50 },
      choices: [
        { text: '继续追求事业成功', effect: { career: 10, happiness: -5 }, followUp: '你决定继续奋斗' },
        { text: '放慢脚步享受生活', effect: { happiness: 15, health: 8 }, followUp: '你学会了活在当下', tag: 'life_enjoyer' },
        { text: '寻找精神寄托', effect: { wisdom: 15, happiness: 10 }, followUp: '你找到了内心的平静' }
      ]
    },
    {
      id: 'parent_health',
      text: '父母身体出了问题',
      conditions: { minAge: 30, maxAge: 55 },
      choices: [
        { text: '全力照顾', effect: { happiness: -10, social: 10, wisdom: 5 }, followUp: '你放下了工作陪伴他们' },
        { text: '请护工照顾', effect: { wealth: -15, career: -5 }, followUp: '你用钱解决问题但心有愧疚' },
        { text: '送回老家让亲戚照顾', effect: { social: -5, happiness: -5 }, followUp: '你做了现实的决定' }
      ]
    },
    {
      id: 'investment_opportunity',
      text: '有人邀请你一起投资',
      conditions: { minAge: 25, minWealth: 30 },
      choices: [
        { text: '深入调查后决定', effect: { wisdom: 10, wealth: 10 }, followUp: '你谨慎地做了决定' },
        { text: '直接参与', effect: { wealth: 20, happiness: 5 }, followUp: '你获得了收益' },
        { text: '拒绝', effect: { wisdom: 5 }, followUp: '你避免了潜在的风险' }
      ]
    },
    {
      id: 'reconnect_childhood',
      text: '你遇到了童年最好的朋友',
      conditions: { minAge: 25, maxAge: 45 },
      choices: [
        { text: '重温童年回忆', effect: { happiness: 15, social: 8 }, followUp: '你们重新建立了联系' },
        { text: '发现彼此已经完全不同', effect: { wisdom: 8, happiness: -3 }, followUp: '你们礼貌地告别' },
        { text: '一起回忆往事', effect: { happiness: 10, wisdom: 5 }, followUp: '过去的友谊依然珍贵' }
      ]
    },
    {
      id: 'housing_decision',
      text: '是时候换一套更大的房子了',
      conditions: { minAge: 30, minWealth: 40 },
      choices: [
        { text: '买大房子', effect: { wealth: -30, happiness: 15, social: 5 }, followUp: '你的居住条件大大改善' },
        { text: '保持现状存钱', effect: { wealth: 10, happiness: 5 }, followUp: '你选择了稳健' },
        { text: '在小城市买房', effect: { wealth: -15, happiness: 20 }, followUp: '你选择了更好的生活质量', tag: 'lifestyle_change' }
      ]
    },
    {
      id: 'second_child',
      text: '考虑是否要生二胎',
      conditions: { minAge: 28, maxAge: 42, hasFlag: 'has_child' },
      choices: [
        { text: '决定生', effect: { happiness: 15, wealth: -15, social: 8 }, followUp: '家庭更加热闹了' },
        { text: '不要了,一个够了', effect: { happiness: 5, wisdom: 5 }, followUp: '你专注于现有孩子的培养' },
        { text: '顺其自然', effect: { happiness: 8 }, followUp: '你接受了命运的安排' }
      ]
    },
    {
      id: 'secret_past',
      text: '你发现了一个关于家人的秘密',
      conditions: { minAge: 30, maxAge: 55 },
      choices: [
        { text: '当面问清楚', effect: { social: -5, happiness: -10, wisdom: 10 }, followUp: '真相大白,关系重建' },
        { text: '藏在心里', effect: { happiness: -5, wisdom: 5 }, followUp: '你选择了沉默' },
        { text: '慢慢疏远', effect: { social: -10, happiness: -5 }, followUp: '你们渐行渐远' }
      ]
    },
    {
      id: 'youth_volunteer',
      text: '你想参与志愿服务',
      conditions: { minAge: 22, maxAge: 50 },
      choices: [
        { text: '去山区支教', effect: { social: 10, happiness: 15, wisdom: 10 }, followUp: '你的视野改变了', tag: 'volunteer_teacher' },
        { text: '加入环保组织', effect: { social: 8, happiness: 10, creativity: 5 }, followUp: '你为地球做了一点贡献' },
        { text: '社区志愿服务', effect: { social: 12, happiness: 8 }, followUp: '你融入了社区' }
      ]
    },
    {
      id: 'youth_side_hustle',
      text: '你想做一份副业增加收入',
      conditions: { minAge: 25, maxAge: 34 },
      choices: [
        { text: '做自媒体/视频拍摄', effect: { wealth: 10, creativity: 10, social: 5 }, followUp: '你的账号慢慢有了起色' },
        { text: '接私活/兼职', effect: { wealth: 12, health: -5 }, followUp: '虽然累但钱包鼓了' },
        { text: '投资理财', effect: { wealth: 8, wisdom: 5 }, followUp: '你开始让钱生钱' }
      ]
    },
    {
      id: 'youth_burnout',
      text: '你觉得自己要累垮了，工作让你精疲力竭',
      conditions: { minAge: 25, maxAge: 34, careerStatus: 'employed' },
      choices: [
        { text: '请假休息一周', effect: { happiness: 15, health: 10, wealth: -3 }, followUp: '你终于睡了个好觉' },
        { text: '咬牙坚持', effect: { happiness: -10, health: -8, wealth: 5 }, followUp: '你的身体在抗议' },
        { text: '换一份轻松的工作', effect: { happiness: 10, wealth: -10, health: 5 }, followUp: '你选择了健康优先' }
      ]
    },
    {
      id: 'youth_online_dating',
      text: '朋友推荐你试试交友软件',
      conditions: { minAge: 22, maxAge: 30, relationshipStatus: 'single' },
      choices: [
        { text: '积极尝试', effect: { social: 10, happiness: 8 }, followUp: '你认识了一些有趣的人', tag: 'online_dating' },
        { text: '半信半疑地试试', effect: { happiness: 5, wisdom: 5 }, followUp: '感觉还行但也不太靠谱' },
        { text: '拒绝，相信缘分', effect: { wisdom: 5 }, followUp: '你相信对的人会在对的时间出现' }
      ]
    },
    {
      id: 'youth_expense_crisis',
      text: '月底了，你的银行卡余额已经见底',
      conditions: { minAge: 22, maxAge: 30, maxWealth: 30 },
      choices: [
        { text: '向父母求助', effect: { wealth: 10, happiness: -5, wisdom: 3 }, followUp: '父母帮你渡过了难关' },
        { text: '借钱度日', effect: { wealth: 5, social: -5, happiness: -5 }, followUp: '你体验了借钱的心酸' },
        { text: '拼命加班/兼职', effect: { wealth: 10, health: -5, wisdom: 5 }, followUp: '下个月终于熬过去了' }
      ]
    },
    {
      id: 'youth_social_anxiety',
      text: '你被邀请去一个你不熟悉的聚会',
      conditions: { minAge: 20, maxAge: 30, maxSocial: 45 },
      choices: [
        { text: '硬着头皮去', effect: { social: 10, happiness: 5 }, followUp: '其实没你想的那么可怕' },
        { text: '带上一个朋友一起去', effect: { social: 8, happiness: 8 }, followUp: '有朋友在身边安心多了' },
        { text: '找个借口不去', effect: { happiness: 3, social: -3 }, followUp: '你在家刷了一晚上手机' }
      ]
    },
    {
      id: 'youth_pet_adoption',
      text: '你在街上看到一只流浪猫/狗，它正用无辜的眼神看着你',
      conditions: { minAge: 20, maxAge: 34 },
      choices: [
        { text: '带回家收养', effect: { happiness: 15, wisdom: 5, wealth: -5 }, followUp: '你多了一个小伙伴', tag: 'has_pet' },
        { text: '送到宠物救助站', effect: { happiness: 8, social: 5 }, followUp: '你帮它找到了安全的归宿' },
        { text: '买点食物喂完就走', effect: { happiness: 5 }, followUp: '你做了力所能及的事' }
      ]
    }
]


// 中年期 35-59岁
choiceEvents.middle = [
  {
    id: 'child_education',
    text: '孩子到了上学年龄，你会怎么安排？',
    conditions: { minAge: 35, maxAge: 50, hasFlag: 'has_child' },
    choices: [
      { text: '送去重点学校', effect: { wealth: -25, happiness: 5 }, followUp: '孩子进入了好学校' },
      { text: '就近入学', effect: { happiness: 5 }, followUp: '孩子在家附近上学' },
      { text: '送去国际学校', effect: { wealth: -40 }, followUp: '孩子接受国际教育', conditions: { minWealth: 70 } }
    ]
  },
  {
    id: 'child_rebellion',
    text: '孩子进入叛逆期，经常和你对着干',
    conditions: { minAge: 40, maxAge: 55, hasFlag: 'has_child' },
    choices: [
      { text: '耐心沟通', effect: { wisdom: 10, happiness: 5 }, followUp: '你们的关系有所改善' },
      { text: '严厉管教', effect: { happiness: -10 }, followUp: '孩子更加叛逆了' },
      { text: '给予空间', effect: { wisdom: 5 }, followUp: '孩子慢慢成熟了' }
    ]
  },
  {
    id: 'career_crossroad',
    text: '工作多年后，你面临职业选择',
    conditions: { minAge: 35, maxAge: 50, careerStatus: 'employed' },
    choices: [
      { text: '跳槽涨薪', effect: { wealth: 20, social: -5 }, followUp: '你的收入大幅提升' },
      { text: '内部晋升', effect: { wealth: 10, social: 10 }, followUp: '你成为了团队负责人' },
      { text: '转行追梦', effect: { happiness: 15, wealth: -10, creativity: 10 }, followUp: '你开始了新的职业道路' },
      { text: '自己创业', effect: { wealth: -20, wisdom: 15 }, followUp: '你开始了创业之路', tag: 'entrepreneur' }
    ]
  },
  {
    id: 'marriage_crisis',
    text: '你和{partnerName}的婚姻出现了问题',
    conditions: { minAge: 38, maxAge: 55, hasFlag: 'married' },
    choices: [
      { text: '婚姻咨询', effect: { happiness: 10, wealth: -5, wisdom: 10 }, followUp: '你们开始修复关系' },
      { text: '冷处理', effect: { happiness: -10 }, followUp: '问题依然存在' },
      { text: '协议离婚', effect: { happiness: -20, wealth: -20, wisdom: 10 }, followUp: '你们和平分手', stateAction: { action: 'DIVORCE' } }
    ]
  },
  {
    id: 'parent_care',
    text: '父母年迈需要照顾，你会怎么做？',
    conditions: { minAge: 40, maxAge: 55 },
    choices: [
      { text: '接来同住', effect: { happiness: -5, social: 5 }, followUp: '你们住在一起' },
      { text: '请护工照顾', effect: { wealth: -20 }, followUp: '你请了专业护工' },
      { text: '经常探望', effect: { happiness: 5 }, followUp: '你尽量抽时间陪伴' }
    ]
  },
  {
    id: 'midlife_reflection',
    text: '你开始思考人生的意义',
    conditions: { minAge: 40, maxAge: 50 },
    choices: [
      { text: '来一场旅行', effect: { happiness: 20, wealth: -20, wisdom: 15 }, followUp: '你看到了不一样的世界' },
      { text: '培养新爱好', effect: { happiness: 15, creativity: 10 }, followUp: '你找到了新的乐趣' },
      { text: '心理咨询', effect: { wisdom: 15, happiness: 10, wealth: -5 }, followUp: '你开始更了解自己' },
      { text: '做公益', effect: { happiness: 15, social: 10 }, followUp: '帮助他人让你感到充实' }
    ]
  },
  {
    id: 'health_warning',
    text: '体检发现你有一些健康问题',
    conditions: { minAge: 45, maxAge: 59 },
    choices: [
      { text: '积极治疗', effect: { health: 10, wealth: -15 }, followUp: '你的身体逐渐恢复' },
      { text: '改变生活方式', effect: { health: 15, happiness: -5 }, followUp: '你开始注重健康' },
      { text: '不以为意', effect: { health: -10 }, followUp: '问题可能会恶化' }
    ]
  }
,
    {
      id: 'investment_choice',
      text: '你有一笔闲钱，想怎么投资？',
      conditions: { minAge: 35, maxAge: 55, minWealth: 40 },
      choices: [
        { text: '投资股票', effect: { wealth: 20, happiness: -5 }, followUp: '股市起伏让你心惊胆战', tag: 'stock_investor' },
        { text: '买基金定投', effect: { wealth: 10, wisdom: 5 }, followUp: '你选择了稳健的方式' },
        { text: '投资自己学习', effect: { intelligence: 15, wisdom: 10 }, followUp: '你报了MBA课程' },
        { text: '存银行', effect: { wealth: 5 }, followUp: '利息不多但很安心' }
      ]
    },
    {
      id: 'second_child',
      text: '你们在考虑要不要二胎',
      conditions: { minAge: 30, maxAge: 42, hasFlag: 'has_child', notFlag: 'has_second_child' },
      choices: [
        { text: '再要一个', effect: { happiness: 15, wealth: -20 }, followUp: '家里又多了新成员', stateAction: { action: 'HAVE_CHILD', data: { childName: '小二' } } },
        { text: '一个就够了', effect: { wealth: 10 }, followUp: '你们把资源集中在一个孩子身上' },
        { text: '领养一个', effect: { happiness: 20, social: 15, wealth: -15 }, followUp: '你给了另一个孩子温暖的家', tag: 'has_second_child' }
      ]
    },
    {
      id: 'parent_illness',
      text: '父亲/母亲突然住院了',
      conditions: { minAge: 40, maxAge: 59, hasFlag: 'father_alive' },
      choices: [
        { text: '请假照顾', effect: { happiness: -5, social: 10, wealth: -10 }, followUp: '你守在病床前' },
        { text: '请护工+每天探望', effect: { wealth: -15, happiness: -3 }, followUp: '你尽量平衡工作和照顾' },
        { text: '接来身边养病', effect: { happiness: 5, wealth: -20, social: 5 }, followUp: '你把父母接到身边' }
      ]
    },
    {
      id: 'midlife_love',
      text: '你对婚姻感到了倦怠',
      conditions: { minAge: 40, maxAge: 55, relationshipStatus: 'married' },
      choices: [
        { text: '和伴侣沟通', effect: { happiness: 15, social: 8 }, followUp: '你们重新找回了当初的感觉', tag: 'relationship_repair' },
        { text: '寻找新鲜感', effect: { happiness: 5, social: -10, reputation: -5 }, followUp: '你陷入了一段危险的情感' },
        { text: '默默忍受', effect: { happiness: -10, wisdom: 3 }, followUp: '生活继续平淡地过下去' }
      ]
    },
    {
      id: 'career_crisis',
      text: '公司面临裁员,你担心自己会被裁掉',
      conditions: { minAge: 40, maxAge: 55, career: 30 },
      choices: [
        { text: '主动出击找新工作', effect: { career: 10, happiness: -5 }, followUp: '你开始寻找新的机会' },
        { text: '努力表现保住岗位', effect: { career: 5, happiness: -3 }, followUp: '你留了下来但压力很大' },
        { text: '考虑提前退休', effect: { happiness: 8, wealth: -10 }, followUp: '你开始规划退休生活' }
      ]
    },
    {
      id: 'empty_nest',
      text: '孩子离家去外地上大学了',
      conditions: { minAge: 45, maxAge: 55 },
      choices: [
        { text: '很不习惯', effect: { happiness: -10, wisdom: 5 }, followUp: '房子突然变得太安静了' },
        { text: '终于有二人世界了', effect: { happiness: 15, social: 5 }, followUp: '你和伴侣重新找回了浪漫' },
        { text: '发展自己的爱好', effect: { happiness: 12, creativity: 8 }, followUp: '你开始追求自己的兴趣' }
      ]
    },
    {
      id: 'health_checkup',
      text: '年度体检结果出来了',
      conditions: { minAge: 40, maxAge: 60 },
      choices: [
        { text: '问题不大,开始锻炼', effect: { health: 15, happiness: 5 }, followUp: '你开始注重健康' },
        { text: '需要住院治疗', effect: { health: 10, wealth: -20, happiness: -10 }, followUp: '你被迫停下来休息' },
        { text: '一切正常', effect: { happiness: 10, health: 5 }, followUp: '继续保持好的生活习惯' }
      ]
    },
    {
      id: 'children_marriage',
      text: '孩子要结婚了',
      conditions: { minAge: 45, maxAge: 60, hasFlag: 'has_child' },
      choices: [
        { text: '全力支持办婚礼', effect: { wealth: -30, happiness: 15, social: 10 }, followUp: '你为孩子操办了盛大的婚礼' },
        { text: '量力而行', effect: { wealth: -10, happiness: 10, wisdom: 5 }, followUp: '你给了孩子一个温馨的婚礼' },
        { text: '拒绝参与', effect: { social: -15, happiness: -10 }, followUp: '你和孩子的关系变得紧张' }
      ]
    },
    {
      id: 'midlife_quest',
      text: '你想尝试一些不一样的事情',
      conditions: { minAge: 40, maxAge: 55 },
      choices: [
        { text: '去学一门新技能', effect: { intelligence: 10, happiness: 10, creativity: 8 }, followUp: '你发现学习永远不晚', tag: 'lifelong_learner' },
        { text: '创业做自己的事业', effect: { career: 15, wealth: -20, happiness: 10 }, followUp: '你开始了一段新的冒险', tag: 'late_entrepreneur' },
        { text: '环球旅行', effect: { wealth: -25, happiness: 20, wisdom: 10 }, followUp: '世界那么大,你想去看看' }
      ]
    },
    {
      id: 'family_tradition',
      text: '你想建立一些家庭传统',
      conditions: { minAge: 40, maxAge: 60, hasFlag: 'has_child' },
      choices: [
        { text: '每周家庭聚餐', effect: { happiness: 12, social: 10, family: 15 }, followUp: '家庭凝聚力大大增强' },
        { text: '每年一起旅行', effect: { happiness: 15, wealth: -15, social: 8 }, followUp: '旅行成为家庭的美好回忆' },
        { text: '建立家规家训', effect: { wisdom: 15, reputation: 8, family: 10 }, followUp: '你的智慧传承给了下一代' }
      ]
    },
    {
      id: 'midlife_regret',
      text: '回首过去,你有些遗憾',
      conditions: { minAge: 45, maxAge: 60 },
      choices: [
        { text: '想办法弥补', effect: { happiness: 10, wisdom: 8 }, followUp: '你开始行动减少遗憾' },
        { text: '接受过去向前看', effect: { wisdom: 15, happiness: 8 }, followUp: '你学会了放下', tag: 'let_go' },
        { text: '把遗憾写成回忆录', effect: { creativity: 10, wisdom: 10, happiness: 5 }, followUp: '你的故事值得被记录' }
      ]
    },
    {
      id: 'sibling_reunion',
      text: '多年未见的兄弟姐妹要聚会',
      conditions: { minAge: 45, maxAge: 65 },
      choices: [
        { text: '积极参与', effect: { happiness: 15, social: 12 }, followUp: '你们重温了童年的回忆' },
        { text: '表面应付', effect: { happiness: -5, social: 5 }, followUp: '聚会变得有些尴尬' },
        { text: '拒绝参加', effect: { happiness: -8, social: -5 }, followUp: '你错过了和解的机会' }
      ]
    },
    {
      id: 'adult_burnout',
      text: '日复一日的工作让你感到倦怠，你想改变吗？',
      conditions: { minAge: 38, maxAge: 55 },
      choices: [
        { text: '请长假出去走走', effect: { happiness: 18, health: 10, wealth: -10 }, followUp: '旅行让你重新找到了生活的意义', tag: 'burnout_recovery' },
        { text: '培养工作之外的爱好', effect: { happiness: 12, creativity: 10 }, followUp: '你的生活多了色彩' },
        { text: '继续忍耐', effect: { happiness: -10, health: -5 }, followUp: '你变得越来越沉默了' }
      ]
    },
    {
      id: 'adult_caregiver',
      text: '你需要同时照顾老人和小孩，两头忙得不可开交',
      conditions: { minAge: 35, maxAge: 55, hasFlag: 'has_child' },
      choices: [
        { text: '请保姆分担', effect: { wealth: -20, happiness: 8, health: 5 }, followUp: '你终于有了喘气的机会' },
        { text: '和伴侣分工配合', effect: { happiness: 10, social: 8 }, followUp: '你们成了最佳搭档' },
        { text: '硬扛到底', effect: { happiness: -12, health: -15 }, followUp: '你太累了，但不想放弃' }
      ]
    },
    {
      id: 'adult_school_reunion',
      text: '二十年同学聚会邀请你参加',
      conditions: { minAge: 38, maxAge: 55 },
      choices: [
        { text: '盛装出席', effect: { social: 15, happiness: 10, charm: 5 }, followUp: '大家都夸你保养得好' },
        { text: '低调参与', effect: { social: 8, wisdom: 5 }, followUp: '你见到了几个真正想见的人' },
        { text: '不去，不想攀比', effect: { wisdom: 5 }, followUp: '你省下了一次不自在的社交' }
      ]
    },
    {
      id: 'adult_community_service',
      text: '社区邀请你参与一个公益项目',
      conditions: { minAge: 35, maxAge: 55 },
      choices: [
        { text: '积极加入', effect: { social: 15, happiness: 15, wisdom: 8 }, followUp: '你成了社区的核心人物', tag: 'community_leader' },
        { text: '捐款支持', effect: { wealth: -10, social: 8, happiness: 8 }, followUp: '你选择了用钱支持' },
        { text: '婉拒，专心家庭', effect: { happiness: 5 }, followUp: '你把精力留给了家人' }
      ]
    },
    {
      id: 'adult_divorce_aftermath',
      text: '离婚后你第一次尝试独自生活',
      conditions: { minAge: 35, maxAge: 50, relationshipStatus: 'divorced' },
      choices: [
        { text: '重新装修了房子', effect: { happiness: 12, wealth: -10 }, followUp: '新环境带来了新心情' },
        { text: '把精力全部投入工作', effect: { wealth: 15, happiness: -5 }, followUp: '你拼出了业绩但也拼累了身体' },
        { text: '出去旅行散心', effect: { happiness: 15, wisdom: 8, wealth: -8 }, followUp: '你在路上慢慢治愈了自己' }
      ]
    },
    {
      id: 'adult_second_mortgage',
      text: '你考虑换一套更大的房子或者投资第二套',
      conditions: { minAge: 35, maxAge: 50, minWealth: 50 },
      choices: [
        { text: '果断入手', effect: { wealth: -35, happiness: 15, social: 5 }, followUp: '你有了新的资产' },
        { text: '再存几年钱', effect: { wealth: 10, wisdom: 5 }, followUp: '你选择了更稳健的策略' },
        { text: '卖掉现在的换一套', effect: { happiness: 10, social: 5 }, followUp: '你升级了居住环境' }
      ]
    },
    {
      id: 'adult_hobby_business',
      text: '你的爱好/手艺越做越精，有人愿意花钱买你的作品',
      conditions: { minAge: 35, maxAge: 55 },
      choices: [
        { text: '开个工作室/网店', effect: { wealth: 15, creativity: 10, happiness: 10 }, followUp: '你的爱好变成了事业' },
        { text: '保持业余爱好', effect: { happiness: 8, creativity: 5 }, followUp: '纯粹的快乐不需要商业化' },
        { text: '参加比赛提高水平', effect: { creativity: 10, social: 8, happiness: 8 }, followUp: '你的作品获得了认可' }
      ]
    },
    {
      id: 'adult_grandparent',
      text: '你当上爷爷/奶奶了！',
      conditions: { minAge: 48, maxAge: 60 },
      choices: [
        { text: '帮忙带孩子享受天伦之乐', effect: { happiness: 20, health: 5, social: 10 }, followUp: '小生命让你重新年轻了一把' },
        { text: '偶尔来看看就好', effect: { happiness: 10, wisdom: 5 }, followUp: '你给了孩子空间' },
        { text: '给他们一笔钱请保姆', effect: { wealth: -15, happiness: 8 }, followUp: '你用金钱表达了对孙辈的爱' }
      ]
    }
]


// 老年期 60岁以上
choiceEvents.elder = [
  {
    id: 'retirement_plan',
    text: '你到了退休年龄，打算怎么安排退休生活？',
    conditions: { minAge: 60, maxAge: 65, careerStatus: 'employed' },
    choices: [
      { text: '正式退休享受生活', effect: { happiness: 20, health: 10 }, followUp: '你开始了悠闲的退休生活', stateAction: { action: 'RETIRE' } },
      { text: '返聘继续工作', effect: { wealth: 15, health: -5 }, followUp: '你继续发挥余热' },
      { text: '做志愿者', effect: { happiness: 20, social: 15 }, followUp: '你开始帮助他人', stateAction: { action: 'RETIRE' } }
    ]
  },
  {
    id: 'grandchild_care',
    text: '孩子希望你帮忙带孙子/孙女',
    conditions: { minAge: 58, maxAge: 75, hasFlag: 'has_grandchild' },
    choices: [
      { text: '全职带孙', effect: { happiness: 10, health: -10 }, followUp: '你享受着天伦之乐' },
      { text: '偶尔帮忙', effect: { happiness: 15, health: 5 }, followUp: '你保持了自己的生活节奏' },
        { text: '婉拒，想享受自由', effect: { happiness: 5, wisdom: 5 }, followUp: '你选择了自己的生活' }
      ]
    },
    {
      id: 'lifelong_friend_passing',
      text: '你最好的朋友去世了，你感到深深的悲伤',
      conditions: { minAge: 65, maxAge: 90 },
      choices: [
        { text: '写一篇纪念文章', effect: { creativity: 10, happiness: 5, wisdom: 10 }, followUp: '你用文字记录了你们的友谊' },
        { text: '整理照片回忆', effect: { happiness: 5, wisdom: 5 }, followUp: '回忆让你心情平静' },
        { text: '联系其他老朋友', effect: { social: 15, happiness: 10 }, followUp: '你更珍惜眼前的友谊' }
      ]
    },
    {
      id: 'reconnect_relative',
      text: '多年未见的亲戚突然联系你',
      conditions: { minAge: 50, maxAge: 80 },
      choices: [
        { text: '热情接待', effect: { social: 10, happiness: 10 }, followUp: '你们恢复了联系' },
        { text: '礼貌应付', effect: { wisdom: 5 }, followUp: '你保持了距离' },
        { text: '询问来意', effect: { intelligence: 5 }, followUp: '原来是有事相求...' }
      ]
    },
  {
    id: 'health_decline',
    text: '你感觉身体大不如前了',
    conditions: { minAge: 65, maxAge: 85 },
    choices: [
      { text: '坚持锻炼', effect: { health: 15, happiness: 5 }, followUp: '你的身体状况有所改善' },
      { text: '定期体检', effect: { health: 10, wealth: -5 }, followUp: '你更加关注健康' },
      { text: '顺其自然', effect: { happiness: 5, health: -5 }, followUp: '你接受了身体的变化' }
    ]
  },
  {
    id: 'old_friend_reunion',
    text: '你收到了老同学聚会的邀请',
    conditions: { minAge: 60, maxAge: 80 },
    choices: [
      { text: '欣然前往', effect: { happiness: 20, social: 10 }, followUp: '你见到了多年未见的老友' },
      { text: '婉拒不去', effect: { happiness: -5 }, followUp: '你错过了这次聚会' },
      { text: '组织一次更大的聚会', effect: { happiness: 25, social: 15, wealth: -10 }, followUp: '你成了聚会的组织者' }
    ]
  },
  {
    id: 'living_arrangement',
    text: '子女建议你搬去和他们一起住',
    conditions: { minAge: 70, maxAge: 90, hasFlag: 'has_child' },
    choices: [
      { text: '搬去同住', effect: { happiness: 10, social: 10 }, followUp: '你享受着家庭的温暖' },
      { text: '坚持独居', effect: { happiness: 5, wisdom: 5 }, followUp: '你保持了独立的生活' },
      { text: '住养老社区', effect: { happiness: 10, social: 15, wealth: -15 }, followUp: '你交到了很多新朋友' }
    ]
  },
  {
    id: 'hobby_pursuit',
    text: '退休后你有大把时间，想做什么？',
    conditions: { minAge: 60, maxAge: 80, careerStatus: 'retired' },
    choices: [
      { text: '学习书法绘画', effect: { creativity: 15, happiness: 15 }, followUp: '你发现了艺术的乐趣' },
      { text: '环游世界', effect: { happiness: 25, wealth: -25, health: -5 }, followUp: '你看遍了世界的风景' },
      { text: '写回忆录', effect: { wisdom: 15, creativity: 10 }, followUp: '你记录下了人生的故事' },
      { text: '种花养鸟', effect: { happiness: 15, health: 5 }, followUp: '你享受着田园生活' }
    ]
  },
  {
    id: 'life_reflection',
    text: '回顾这一生，你有什么感悟？',
    conditions: { minAge: 75, maxAge: 100 },
    choices: [
      { text: '很满足，不留遗憾', effect: { happiness: 25, wisdom: 20 }, followUp: '你对人生感到满意' },
      { text: '有些遗憾，但接受了', effect: { happiness: 10, wisdom: 15 }, followUp: '你学会了释然' },
      { text: '把经验传给后人', effect: { wisdom: 20, social: 10 }, followUp: '你的智慧将传承下去' }
    ]
  }
,
    {
      id: 'legacy_choice',
      text: '你想给后人留下什么？',
      conditions: { minAge: 70, maxAge: 90 },
      choices: [
        { text: '写一本书', effect: { creativity: 15, wisdom: 10 }, followUp: '你开始记录人生故事' },
        { text: '设立奖学金', effect: { wealth: -30, social: 20, wisdom: 15 }, followUp: '你的名字将被后人记住', conditions: { minWealth: 50 } },
        { text: '把经验传授给年轻人', effect: { wisdom: 20, social: 15 }, followUp: '你成了年轻人的人生导师' },
        { text: '随它去吧', effect: { happiness: 10 }, followUp: '你选择洒脱地活着' }
      ]
    },
    {
      id: 'old_love_reunion',
      text: '你偶然遇到了年轻时的初恋',
      conditions: { minAge: 60, maxAge: 80, relationshipStatus: 'single' },
      choices: [
        { text: '重新开始', effect: { happiness: 25, social: 10 }, followUp: '你们在暮年找到了彼此', stateAction: { action: 'START_DATING' } },
        { text: '做个老朋友', effect: { happiness: 10, social: 10 }, followUp: '你们成了最好的朋友' },
        { text: '微笑着离开', effect: { wisdom: 10 }, followUp: '有些美好留在回忆里就好' }
      ]
    },
    {
      id: 'grandchildren_moment',
      text: '你的孙子/孙女想要听你讲故事',
      conditions: { minAge: 55 },
      choices: [
        { text: '讲你年轻时的冒险故事', effect: { happiness: 15, wisdom: 10 }, followUp: '孩子们的眼睛里闪着光', tag: 'family_man' },
        { text: '讲一个童话故事', effect: { happiness: 10, creativity: 5 }, followUp: '孩子们听得津津有味' },
        { text: '讲人生哲理', effect: { wisdom: 15, happiness: 5 }, followUp: '你在孩子心中种下了智慧的种子' }
      ]
    },
    {
      id: 'final_trip',
      text: '你决定来一次最后的旅行',
      conditions: { minAge: 60, wealth: 30 },
      choices: [
        { text: '回到故乡看看', effect: { happiness: 20, wisdom: 10 }, followUp: '故乡的变化让你感慨万千' },
        { text: '去年轻时向往的地方', effect: { happiness: 25, creativity: 5 }, followUp: '终于实现了年轻时的梦想', tag: 'dream_fulfilled' },
        { text: '就在家附近转转', effect: { happiness: 10, health: 5 }, followUp: '简单的风景也有美好' }
      ]
    },
    {
      id: 'life_summary',
      text: '你坐下来回顾自己的一生',
      conditions: { minAge: 65 },
      choices: [
        { text: '觉得自己很成功', effect: { happiness: 20, wisdom: 10 }, followUp: '这一生没有白活' },
        { text: '有些遗憾但不后悔', effect: { wisdom: 15, happiness: 10 }, followUp: '人生本就充满选择' },
        { text: '如果有来生...', effect: { wisdom: 20, happiness: -5 }, followUp: '过去的已经过去' }
      ]
    },
    {
      id: 'elder_health_crisis',
      text: '你的身体状况开始急剧下降',
      conditions: { minAge: 70, maxAge: 85 },
      choices: [
        { text: '积极治疗延长生命', effect: { health: 10, wealth: -20 }, followUp: '你选择与病魔抗争' },
        { text: '顺其自然享受余生', effect: { happiness: 15, wisdom: 10 }, followUp: '你选择平静地接受' },
        { text: '写遗愿清单', effect: { wisdom: 15, happiness: 10 }, followUp: '你想把剩下的时间过得有意义' }
      ]
    },
    {
      id: 'family_reunion',
      text: '全家人难得聚在一起',
      conditions: { minAge: 50 },
      choices: [
        { text: '主持家庭会议', effect: { social: 15, happiness: 15 }, followUp: '你成了家庭的中心' },
        { text: '安静地观察大家', effect: { happiness: 12, wisdom: 8 }, followUp: '看到家人幸福就是最大的满足' },
        { text: '讲述家族历史', effect: { wisdom: 15, reputation: 10 }, followUp: '你是家族历史的活档案' }
      ]
    },
    {
      id: 'forgiveness',
      text: '你遇到了曾经伤害过你的人',
      conditions: { minAge: 55 },
      choices: [
        { text: '真心原谅对方', effect: { happiness: 20, wisdom: 15 }, followUp: '你放下了心中的怨恨', tag: 'forgiven' },
        { text: '表面和解内心仍有隔阂', effect: { social: 5, happiness: -5 }, followUp: '有些伤痛需要时间治愈' },
        { text: '拒绝见面', effect: { happiness: -10, wisdom: 5 }, followUp: '你选择保持距离' }
      ]
    },
    {
      id: 'last_words',
      text: '你意识到自己时日无多,想留下最后的话',
      conditions: { minAge: 75, maxAge: 90 },
      choices: [
        { text: '告诉家人你爱他们', effect: { happiness: 15, wisdom: 10 }, followUp: '你的爱会永远留在他们心中' },
        { text: '总结人生经验教训', effect: { wisdom: 20, reputation: 10 }, followUp: '你的智慧将被后人传承' },
        { text: '请求原谅曾经的过错', effect: { wisdom: 15, happiness: 5 }, followUp: '你选择了坦诚和释怀' },
        { text: '安静地闭上眼睛', effect: { happiness: 10, wisdom: 10 }, followUp: '你平静地告别了这个世界' }
      ]
    },
    {
      id: 'elder_wisdom_share',
      text: '一个年轻人向你请教人生',
      conditions: { minAge: 60, wisdom: 40 },
      choices: [
        { text: '分享你最重要的一个人生决定', effect: { wisdom: 15, social: 10 }, followUp: '你的经历启发了他', tag: 'mentor_elder' },
        { text: '告诉他不要走你的弯路', effect: { wisdom: 20, happiness: 5 }, followUp: '你希望他能避开你踩过的坑' },
        { text: '说"自己去体验吧"', effect: { wisdom: 10, happiness: 8 }, followUp: '有些事必须亲身经历才能明白' }
      ]
    },
    {
      id: 'memory_alzheimer',
      text: '你开始经常忘记事情',
      conditions: { minAge: 70, maxHealth: 40 },
      choices: [
        { text: '用日记记录一切', effect: { wisdom: 8, happiness: 5 }, followUp: '你努力与遗忘抗争' },
        { text: '接受现实顺其自然', effect: { happiness: 10, wisdom: 5 }, followUp: '你选择了平静面对' },
        { text: '让家人帮忙记录', effect: { social: 10, happiness: 5 }, followUp: '家人成了你的记忆' }
      ]
    }
]


// 根据年龄获取人生阶段
function getStageByAge(age) {
  if (age <= 2) return 'baby'
  if (age <= 5) return 'toddler'
  if (age <= 11) return 'child'
  if (age <= 17) return 'teen'
  if (age <= 34) return 'youth'
  if (age <= 59) return 'middle'
  return 'elder'
}

// 获取选择事件
export function getChoiceEvent(stage, character, storyState) {
  if (!character) character = {}
  if (!storyState) storyState = {}
  
  var age = character.age || 0
  
  // 只有一定概率触发选择事件
  if (Math.random() > 0.25) return null
  
  // 根据年龄获取正确的阶段
  var actualStage = getStageByAge(age)
  
  var stageEvents = choiceEvents[actualStage]
  if (!stageEvents || stageEvents.length === 0) return null
  
  var usedEvents = character.usedChoiceEvents || []
  
  // 过滤符合条件的事件
  var availableEvents = []
  for (var i = 0; i < stageEvents.length; i++) {
    var event = stageEvents[i]
    if (!event) continue
    
    // 检查事件是否已经使用过
    if (event.id && usedEvents.indexOf(event.id) !== -1) continue
    
    if (event.conditions) {
      var c = event.conditions
      
      // 检查年龄条件
      if (c.minAge !== undefined && age < c.minAge) continue
      if (c.maxAge !== undefined && age > c.maxAge) continue
      
      // 检查关系状态
      if (c.relationshipStatus) {
        var currentStatus = storyState.relationshipStatus || (storyState.relationship ? storyState.relationship.status : 'single')
        if (currentStatus !== c.relationshipStatus) continue
      }
      
      // 检查教育等级
      if (c.educationLevel) {
        var currentLevel = storyState.educationLevel || (storyState.education ? storyState.education.currentLevel : 'none')
        if (currentLevel !== c.educationLevel) continue
      }
      
      // 检查职业状态
      if (c.careerStatus) {
        var currentCareer = storyState.careerStatus || (storyState.career ? storyState.career.status : 'none')
        if (currentCareer !== c.careerStatus) continue
      }
      
      // 检查必须有的标记
      if (c.hasFlag) {
        var flags = storyState.flags || []
        if (flags.indexOf(c.hasFlag) === -1) continue
      }
      
      // 检查不能有的标记
      if (c.notFlag) {
        var flags2 = storyState.flags || []
        if (flags2.indexOf(c.notFlag) !== -1) continue
      }
      
      // 检查最低属性要求
      if (c.minWealth && (character.wealth || 0) < c.minWealth) continue
      if (c.minIntelligence && (character.intelligence || 0) < c.minIntelligence) continue
      if (c.minHealth && (character.health || 0) < c.minHealth) continue
    }
    
    availableEvents.push(event)
  }
  
  if (availableEvents.length === 0) return null
  
  var selectedEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)]
  
  // 处理事件文本中的变量替换
  var eventText = selectedEvent.text || ''
  if (eventText.indexOf('{partnerName}') !== -1) {
    var partnerName = storyState.partnerName || (storyState.relationship ? storyState.relationship.partnerName : '') || generatePartnerName(character.gender)
    eventText = eventText.replace(/{partnerName}/g, partnerName)
  }
  
  // 过滤选项中符合条件的选择
  var availableChoices = []
  var choices = selectedEvent.choices || []
  for (var j = 0; j < choices.length; j++) {
    var choice = choices[j]
    if (!choice) continue
    
    if (choice.conditions) {
      var cc = choice.conditions
      if (cc.hasFlag) {
        var flags3 = storyState.flags || []
        if (flags3.indexOf(cc.hasFlag) === -1) continue
      }
      if (cc.minWealth && (character.wealth || 0) < cc.minWealth) continue
      if (cc.minIntelligence && (character.intelligence || 0) < cc.minIntelligence) continue
    }
    availableChoices.push(choice)
  }
  
  if (availableChoices.length === 0) return null
  
  return {
    id: selectedEvent.id || 'unknown',
    text: eventText,
    choices: availableChoices,
    generatePartner: selectedEvent.generatePartner || false
  }
}

// 处理选择结果
export function processChoiceResult(choice) {
  if (!choice) return { effect: {}, followUp: '', success: true, hasChance: false }
  
  var effect = choice.effect || {}
  var followUp = choice.followUp || ''
  var success = true
  var hasChance = choice.chance !== undefined && choice.chance !== null
  
  // 处理概率事件
  if (hasChance) {
    if (Math.random() > choice.chance) {
      effect = choice.failEffect || {}
      followUp = choice.failFollowUp || ''
      success = false
    }
  }
  
  return {
    effect: effect,
    followUp: followUp,
    success: success,
    hasChance: hasChance,
    tag: choice.tag,
    stateAction: choice.stateAction,
    bestieAffection: choice.bestieAffection || 0,
    gatheringType: choice.gatheringType || null
  }
}

// ═══════════════════════════════════════════════════════════════
// 闺蜜兄弟局 - 好友相聚选择事件
// ═══════════════════════════════════════════════════════════════

// 触发挚友聚会选择事件
export function getGatheringChoiceEvent(character, besties) {
  if (!besties || besties.length === 0) return null
  if (character.age < 8) return null
  
  // 找一个好感度较高的挚友
  var candidates = []
  for (var i = 0; i < besties.length; i++) {
    if (besties[i].status === 'active' && besties[i].favorScore > 20) {
      candidates.push(besties[i])
    }
  }
  if (candidates.length === 0) return null
  
  var bestie = candidates[Math.floor(Math.random() * candidates.length)]
  
  // 根据年龄和好感度选择可用的局类型
  var availableGatherings = getAvailableGatheringsForAge(character.age, bestie.favorScore)
  if (availableGatherings.length === 0) return null
  
  var gatheringType = availableGatherings[Math.floor(Math.random() * availableGatherings.length)]
  
  // 导入broBestie模块
  var gatheringInfo = null
  try {
    var gTypes = getBroBestieGatheringTypes()
    for (var j = 0; j < gTypes.length; j++) {
      if (gTypes[j].id === gatheringType) {
        gatheringInfo = gTypes[j]
        break
      }
    }
  } catch(e) {}
  
  var icon = gatheringInfo ? gatheringInfo.icon : '🎉'
  var name = gatheringInfo ? gatheringInfo.name : '聚会'
  
  return {
    id: 'gathering_' + gatheringType + '_' + Date.now(),
    text: icon + ' ' + bestie.name + '约你一起去' + name + '，你有时间吗？',
    icon: icon,
    bestieId: bestie.id,
    bestieName: bestie.name,
    gatheringType: gatheringType,
    choices: [
      {
        text: '当然去！最近确实想放松一下',
        effect: { happiness: 8, wealth: -2, social: 3 },
        followUp: getGatheringScene(gatheringType),
        bestieAffection: 8,
        gatheringType: gatheringType
      },
      {
        text: '走起，但别太破费',
        effect: { happiness: 5, wealth: -1, social: 2, wisdom: 2 },
        followUp: '你们度过了一个愉快的时光，虽然没花什么钱，但欢笑不比大餐少。',
        bestieAffection: 5,
        gatheringType: gatheringType
      },
      {
        text: '最近太忙了，改天吧',
        effect: { wealth: 2, happiness: -3 },
        followUp: bestie.name + '说"行，下次一定要来啊！"你心里有点过意不去，但也确实腾不出时间。',
        bestieAffection: -3,
        gatheringType: null
      }
    ]
  }
}

function getAvailableGatheringsForAge(age, favorScore) {
  var gatherings = []
  if (age >= 8) gatherings.push('sports_together', 'gaming_night')
  if (age >= 12) gatherings.push('dinner_party')
  if (age >= 14) gatherings.push('karaoke_night')
  if (age >= 16) gatherings.push('coffee_chat', 'deep_talk')
  if (age >= 18) gatherings.push('drinks_party', 'travel_together')
  if (favorScore > 75) gatherings.push('help_crisis')
  return gatherings
}

function getGatheringScene(gatheringType) {
  var scenes = {
    dinner_party: '你们在一家热闹的店里大快朵颐，笑声不断，一天的压力都释放了。',
    drinks_party: '觥筹交错间，你们聊了许久不敢聊的话题，关系又近了一步。',
    gaming_night: '你们组队大杀四方，输赢不重要，重要的是并肩作战的感觉太爽了。',
    travel_together: '你们自驾去了周边城市，在路上聊了很多，回来的时候感觉彼此都更了解对方了。',
    karaoke_night: '你们在KTV里放声高歌，管他跑不跑调，开心最重要。一曲"朋友"唱完，眼眶都红了。',
    coffee_chat: '静静地坐在咖啡店里，不用说什么，只是这样待着就很舒服。',
    sports_together: '一场酣畅淋漓的运动之后，浑身舒坦，你们约好了下周继续。',
    deep_talk: '你们聊到了深夜，把心里最柔软的地方给对方看了，出来之后感觉整个人轻松了很多。',
    help_crisis: '在最需要帮助的时候，他/她二话不说就来了。这份情谊，记一辈子。'
  }
  return scenes[gatheringType] || '你们度过了一段愉快的时光。'
}

// 获取broBestie中的gathering类型列表（避免循环依赖）
var _gatheringTypesCache = null
function getBroBestieGatheringTypes() {
  if (_gatheringTypesCache) return _gatheringTypesCache
  try {
    var bb = require('./broBestie.js')
    _gatheringTypesCache = bb.gatheringTypes || []
    return _gatheringTypesCache
  } catch(e) {
    _gatheringTypesCache = []
    return _gatheringTypesCache
  }
}

// ═══════════════════════════════════════════════════════════════
// 挚友相关的生命十字路口
// ═══════════════════════════════════════════════════════════════

// 挚友求助事件
export function getBestieHelpEvent(character, besties) {
  if (!besties || besties.length === 0) return null
  if (character.age < 16) return null
  
  var closeBesties = []
  for (var i = 0; i < besties.length; i++) {
    if (besties[i].status === 'active' && besties[i].favorScore > 50) {
      closeBesties.push(besties[i])
    }
  }
  if (closeBesties.length === 0) return null
  
  var bestie = closeBesties[Math.floor(Math.random() * closeBesties.length)]
  
  var scenarios = [
    {
      text: '💔 ' + bestie.name + '突然来找你，说他/她遇到了困难，需要用钱周转，希望能借一笔不小的数目……',
      choices: [
        { text: '二话不说就借了，朋友有难必须帮', effect: { wealth: -15, happiness: 5, wisdom: 8, social: 5 }, followUp: bestie.name + '非常感动，承诺半年内一定还，你的义气让他/她终生难忘。', bestieAffection: 15 },
        { text: '借一部分，量力而行', effect: { wealth: -5, happiness: 3, wisdom: 5 }, followUp: bestie.name + '理解你的处境，表示尽力就足够了。你们的关系依然很稳固。', bestieAffection: 5 },
        { text: '抱歉，我最近手头也不宽裕', effect: { wealth: 0, happiness: -5, wisdom: 3 }, followUp: bestie.name + '说没关系，但你能感觉到他/她有些失落。', bestieAffection: -5 }
      ]
    },
    {
      text: '🆘 ' + bestie.name + '半夜打来电话，声音哽咽，说有要紧事需要你立刻过去……',
      choices: [
        { text: '马上出门，不管多晚都要去', effect: { happiness: 5, health: -3, wisdom: 10, social: 8 }, followUp: '你赶到了他/她身边，陪着度过了最难的时刻。那一夜你们的关系发生了质的变化。', bestieAffection: 20 },
        { text: '先电话里聊清楚情况再说', effect: { happiness: 2, wisdom: 5 }, followUp: '你们在电话里聊了很久，虽然没见面，但你给了最好的精神支持。', bestieAffection: 5 },
        { text: '明天还有重要的事……委婉拒绝了', effect: { happiness: -8, wisdom: 2 }, followUp: bestie.name + '说"没事的"就挂了电话，你心里很不是滋味。', bestieAffection: -10 }
      ]
    },
    {
      text: '🗣️ ' + bestie.name + '和另一个人闹掰了，来找你评理，但实际上你两边都是朋友……',
      choices: [
        { text: '冷静分析，帮双方找到和解的方法', effect: { wisdom: 10, social: 8, happiness: 3 }, followUp: '你的调解让双方都心服口服，友情没有被破坏反而更牢固了。', bestieAffection: 10 },
        { text: '偏向' + bestie.name + '，朋友就是该帮朋友', effect: { happiness: 5, social: 3 }, followUp: bestie.name + '很开心你站在他/她这边，但你知道问题并没有真正解决。', bestieAffection: 12 },
        { text: '这事我不掺和，你们自己解决吧', effect: { happiness: -3, wisdom: 3 }, followUp: bestie.name + '有点失望，但也表示理解。夹在中间确实不好做人。', bestieAffection: -3 }
      ]
    }
  ]
  
  var scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
  return {
    id: 'bestie_help_' + Date.now(),
    text: scenario.text,
    bestieId: bestie.id,
    bestieName: bestie.name,
    choices: scenario.choices
  }
}

// 挚友合作/创业事件
export function getBestieCareerEvent(character, besties) {
  if (!besties || besties.length === 0) return null
  if (character.age < 22 || character.age > 45) return null
  
  var buddy = null
  for (var i = 0; i < besties.length; i++) {
    if (besties[i].status === 'active' && besties[i].favorScore > 60 && besties[i].type === 'work_buddy') {
      buddy = besties[i]
      break
    }
  }
  // 如果没有职场战友，也可能是好兄弟/闺蜜
  if (!buddy) {
    for (var j = 0; j < besties.length; j++) {
      if (besties[j].status === 'active' && besties[j].favorScore > 70) {
        buddy = besties[j]
        break
      }
    }
  }
  if (!buddy) return null
  
  return {
    id: 'bestie_career_' + Date.now(),
    text: '💼 ' + buddy.name + '找上门来说有一个创业机会，想拉你一起干。他/她说你的能力和资源正好互补……',
    bestieId: buddy.id,
    bestieName: buddy.name,
    choices: [
      {
        text: '干！朋友的判断我相信',
        effect: { wealth: 10, happiness: 8, social: 5, wisdom: 3 },
        followUp: '你们合伙干了起来，虽然辛苦但充满干劲。朋友+合作伙伴的关系让事业有了不一样的意义。',
        bestieAffection: 10,
        chance: 0.7,
        failEffect: { wealth: -8, happiness: -10, wisdom: 10 },
        failFollowUp: '创业不容易，你们的项目没成功。但你们谁也没怪谁，反而因为一起扛过挫折，关系更铁了。'
      },
      {
        text: '风险太大了，还是安安稳稳打工吧',
        effect: { wealth: 2, happiness: -3, wisdom: 5 },
        followUp: buddy.name + '虽然有点失望，但也尊重你的选择。他/她自己干了起来，后来时不时还会请教你意见。',
        bestieAffection: 2
      },
      {
        text: '我以个人的名义投一点，不参与管理',
        effect: { wealth: -3, happiness: 3, wisdom: 5 },
        followUp: '你成了他/公司的忠实支持者，虽然没一起干，但你的信任给了他/她很大的鼓励。',
        bestieAffection: 8
      }
    ]
  }
}
