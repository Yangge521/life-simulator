// 基于故事状态的连贯事件系统 - 严格按年龄分配事件

// 婴儿期 0-2岁
export const storyEvents = {
  baby: [
    { text: '你睁开眼睛，第一次看到这个世界', effect: { happiness: 5 }, conditions: { maxAge: 0 } },
    { text: '你发出了人生第一声啼哭', effect: { health: 5 }, conditions: { maxAge: 0 } },
    { text: '你被温暖的襁褓包裹着，感到很安心', effect: { happiness: 5 }, conditions: { maxAge: 0 } },
    { text: '你学会了翻身，妈妈很开心', effect: { health: 5 }, conditions: { minAge: 0, maxAge: 1 } },
    { text: '你长出了第一颗乳牙', effect: { health: 5 }, conditions: { minAge: 0, maxAge: 1 } },
    { text: '你开始认人了，看到陌生人会哭', effect: { wisdom: 3 }, conditions: { minAge: 0, maxAge: 1 } },
    { text: '你学会了坐着，可以自己玩玩具了', effect: { health: 5, intelligence: 3 }, conditions: { minAge: 0, maxAge: 1 } },
    { text: '你特别喜欢抓东西，什么都往嘴里塞', effect: { intelligence: 3 }, conditions: { minAge: 0, maxAge: 1 } },
    { text: '你学会了叫"妈妈"，全家人都很开心', effect: { happiness: 10, social: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你学会了叫"爸爸"，爸爸激动得眼眶湿润', effect: { happiness: 10 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你迈出了人生第一步，虽然摇摇晃晃', effect: { health: 5, happiness: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你学会了走路，开始到处探索', effect: { health: 5, intelligence: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你生了一场小病，但很快康复了', effect: { health: -5 }, conditions: { minAge: 0, maxAge: 2 } },
    { text: '你发烧了，妈妈整夜没睡照顾你', effect: { health: -5, happiness: 5 }, conditions: { minAge: 0, maxAge: 2 } },
    { text: '你特别爱笑，是全家的开心果', effect: { happiness: 5, charm: 5 }, conditions: { minAge: 0, maxAge: 2 } },
    { text: '你对音乐很敏感，听到音乐就手舞足蹈', effect: { creativity: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你学会了自己用勺子吃饭', effect: { intelligence: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你开始牙牙学语，说出了很多有趣的词', effect: { intelligence: 5, charm: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你喜欢玩躲猫猫游戏', effect: { happiness: 5, social: 3 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你学会了挥手说再见', effect: { social: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你开始对绘本感兴趣，喜欢看图画', effect: { intelligence: 5, creativity: 3 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你学会了用手指指东西表达需求', effect: { intelligence: 5 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你开始模仿大人的动作', effect: { intelligence: 5, social: 3 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你特别粘妈妈，妈妈一离开就哭', effect: { happiness: -3 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你学会了自己喝水', effect: { health: 3, intelligence: 3 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你开始对玩具有了偏好', effect: { intelligence: 3 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你睡觉时会抱着小毯子', effect: { happiness: 3 }, conditions: { minAge: 0, maxAge: 2 } },
    { text: '你开始认识家里的宠物了', effect: { happiness: 5, social: 3 }, conditions: { minAge: 1, maxAge: 2 } },
    { text: '你学会了拍手', effect: { happiness: 3, social: 3 }, conditions: { minAge: 0, maxAge: 1 } },
    { text: '你开始有了自己的小脾气', effect: { charm: -3, wisdom: 3 }, conditions: { minAge: 1, maxAge: 2 } }
  ],
  
  // 幼儿期 3-5岁
  toddler: [
    { text: '你上幼儿园了，第一天哭着找妈妈', effect: { social: 5, happiness: -5 }, conditions: { minAge: 3, maxAge: 3 } },
    { text: '你慢慢适应了幼儿园的生活', effect: { social: 5, happiness: 5 }, conditions: { minAge: 3, maxAge: 4 } },
    { text: '你在幼儿园交到了第一个好朋友', effect: { social: 10, happiness: 10 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你学会了自己穿衣服', effect: { intelligence: 5 }, conditions: { minAge: 3, maxAge: 4 } },
    { text: '你学会了自己刷牙', effect: { health: 5, intelligence: 3 }, conditions: { minAge: 3, maxAge: 4 } },
    { text: '你开始学习认字，对书本产生了兴趣', effect: { intelligence: 10 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你学会了骑三轮车', effect: { health: 5, happiness: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你在幼儿园表演节目，获得了掌声', effect: { charm: 10, happiness: 10 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你开始问各种"为什么"，好奇心很强', effect: { intelligence: 10, wisdom: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你学会了数数，能数到100了', effect: { intelligence: 10 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你画了一幅画送给妈妈，她很感动', effect: { creativity: 10, happiness: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你和小朋友抢玩具，被老师批评了', effect: { social: -5, wisdom: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '爷爷奶奶来看你，给你带了很多好吃的', effect: { happiness: 15 }, conditions: { minAge: 3, maxAge: 5, hasFlag: 'grandparents_alive' } },
    { text: '你开始换牙了，掉了第一颗乳牙', effect: { health: 5 }, conditions: { minAge: 5, maxAge: 6 } },
    { text: '你学会了系鞋带', effect: { intelligence: 5 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你开始学习简单的英语单词', effect: { intelligence: 8 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你在幼儿园学会了一首新歌', effect: { creativity: 5, happiness: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你开始喜欢听故事', effect: { intelligence: 5, creativity: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你学会了用剪刀剪纸', effect: { creativity: 5, intelligence: 3 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你开始学习写自己的名字', effect: { intelligence: 8 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你在幼儿园被小朋友欺负了', effect: { happiness: -10, social: -5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你帮助了一个哭泣的小朋友', effect: { social: 10, charm: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你开始对恐龙/公主产生了浓厚兴趣', effect: { intelligence: 5, happiness: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你学会了玩拼图', effect: { intelligence: 8 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你开始学习骑带辅助轮的自行车', effect: { health: 5 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你在幼儿园的运动会上获得了小红花', effect: { health: 5, happiness: 10 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你开始有了自己的小秘密', effect: { wisdom: 5 }, conditions: { minAge: 4, maxAge: 5 } },
    { text: '你学会了分享玩具', effect: { social: 10, wisdom: 5 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你开始对动画片着迷', effect: { happiness: 5, creativity: 3 }, conditions: { minAge: 3, maxAge: 5 } },
    { text: '你学会了简单的加减法', effect: { intelligence: 10 }, conditions: { minAge: 5, maxAge: 5 } }
  ]
}


// 童年期 6-11岁
storyEvents.child = [
  { text: '你上小学了，背上了新书包', effect: { intelligence: 5, education: 10 }, conditions: { minAge: 6, maxAge: 6 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'primary' } } },
  { text: '你在学校交到了好朋友', effect: { social: 10, happiness: 10 }, conditions: { minAge: 6, maxAge: 11 } },
  { text: '你学会了骑自行车', effect: { health: 5, happiness: 5 }, conditions: { minAge: 6, maxAge: 8 } },
  { text: '你在班级里当上了小组长', effect: { social: 5, charm: 5 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你参加了学校的运动会', effect: { health: 5 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你第一次考了100分，父母很高兴', effect: { intelligence: 5, happiness: 10 }, conditions: { minAge: 6, maxAge: 11 } },
  { text: '你和同学发生了小矛盾', effect: { happiness: -5, social: -5 }, conditions: { minAge: 6, maxAge: 11 } },
  { text: '你迷上了看动画片', effect: { happiness: 5, creativity: 5 }, conditions: { minAge: 6, maxAge: 10 } },
  { text: '你开始学习写作文', effect: { intelligence: 5, creativity: 5 }, conditions: { minAge: 7, maxAge: 9 } },
  { text: '父母带你去游乐园玩', effect: { happiness: 15 }, conditions: { minAge: 6, maxAge: 11 } },
  { text: '你过生日，收到了很多礼物', effect: { happiness: 10 }, conditions: { minAge: 6, maxAge: 11 } },
  { text: '家里养了一只小宠物', effect: { happiness: 10 }, conditions: { minAge: 6, maxAge: 11 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_pet' } } },
  { text: '你的小宠物生病了，你很担心', effect: { happiness: -10 }, conditions: { minAge: 6, maxAge: 11, hasFlag: 'has_pet' } },
  { text: '爷爷教你下象棋，你学得很快', effect: { intelligence: 10 }, conditions: { minAge: 7, maxAge: 11, hasFlag: 'grandparents_alive' } },
  { text: '你去爷爷奶奶家过暑假', effect: { happiness: 10 }, conditions: { minAge: 6, maxAge: 11, hasFlag: 'grandparents_alive' } },
  { text: '你开始学习游泳', effect: { health: 10 }, conditions: { minAge: 7, maxAge: 10 } },
  { text: '你参加了学校的合唱团', effect: { creativity: 5, social: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你的成绩在班里名列前茅', effect: { intelligence: 10, happiness: 5 }, conditions: { minAge: 8, maxAge: 11, minIntelligence: 60 } },
  { text: '父母因为工作忙，经常不在家', effect: { happiness: -5 }, conditions: { minAge: 6, maxAge: 11 } },
  { text: '你在学校被选为班长', effect: { social: 10, charm: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你参加了奥数班', effect: { intelligence: 10, happiness: -5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在作文比赛中获奖', effect: { creativity: 10, intelligence: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你开始学习打篮球', effect: { health: 8, social: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在学校交到了一个很要好的朋友', effect: { social: 15, happiness: 10 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你开始对科学实验感兴趣', effect: { intelligence: 10, creativity: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你参加了学校的朗诵比赛', effect: { charm: 8, creativity: 5 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你学会了做简单的家务', effect: { wisdom: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你开始有了零花钱', effect: { wealth: 3, wisdom: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在学校的才艺表演中表演了节目', effect: { charm: 10, happiness: 5 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你开始学习乐器', effect: { creativity: 10 }, conditions: { minAge: 7, maxAge: 10 } },
  { text: '你参加了夏令营', effect: { social: 10, happiness: 10 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在考试中发挥失常，有点沮丧', effect: { happiness: -10, intelligence: -3 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你帮助同学解决了难题', effect: { social: 8, intelligence: 3 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你开始对历史故事感兴趣', effect: { intelligence: 8, wisdom: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在学校的跳绳比赛中获奖', effect: { health: 8, happiness: 5 }, conditions: { minAge: 7, maxAge: 10 } },
  { text: '你开始学习书法', effect: { creativity: 8, wisdom: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你和朋友一起去郊游', effect: { happiness: 10, social: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你开始对电脑游戏感兴趣', effect: { happiness: 5, intelligence: 3 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在学校的数学竞赛中获奖', effect: { intelligence: 15, happiness: 10 }, conditions: { minAge: 9, maxAge: 11, minIntelligence: 65 } },
  { text: '你开始学习英语口语', effect: { intelligence: 8 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你参加了学校的足球队', effect: { health: 10, social: 8 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在学校被老师表扬了', effect: { happiness: 10, charm: 5 }, conditions: { minAge: 6, maxAge: 11 } },
  { text: '你开始对天文学感兴趣', effect: { intelligence: 8, creativity: 5 }, conditions: { minAge: 9, maxAge: 11 } },
  { text: '你学会了做简单的饭菜', effect: { wisdom: 5, creativity: 3 }, conditions: { minAge: 10, maxAge: 11 } },
  { text: '你在学校的绘画比赛中获奖', effect: { creativity: 15, happiness: 10 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你开始有了自己的小秘密', effect: { wisdom: 5 }, conditions: { minAge: 9, maxAge: 11 } },
  { text: '你和父母一起去旅游', effect: { happiness: 15, wisdom: 5 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你开始学习围棋', effect: { intelligence: 10, wisdom: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  { text: '你在学校的英语演讲比赛中获奖', effect: { intelligence: 10, charm: 8 }, conditions: { minAge: 9, maxAge: 11 } },
  { text: '你开始对编程感兴趣', effect: { intelligence: 12 }, conditions: { minAge: 10, maxAge: 11 } },
  // === 故事线: 音乐艺术之旅 ===
  { text: '你开始学习钢琴', effect: { creativity: 8, intelligence: 5 }, conditions: { minAge: 5, maxAge: 8 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'music_child' } } },
  { text: '你每天坚持练琴,手指越来越灵活', effect: { creativity: 8, intelligence: 5 }, conditions: { minAge: 6, maxAge: 10, hasFlag: 'music_child' } },
  { text: '你在学校的音乐会上表演', effect: { creativity: 10, charm: 8, happiness: 5 }, conditions: { minAge: 7, maxAge: 11, hasFlag: 'music_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'music_performed' } } },
  // === 故事线: 运动生涯 ===
  { text: '你开始参加学校的体育训练', effect: { health: 8, happiness: 5 }, conditions: { minAge: 7, maxAge: 11 } },
  { text: '你在校运动会中获得第一名', effect: { health: 10, happiness: 15, charm: 5 }, conditions: { minAge: 8, maxAge: 11 } },
  // === 故事线: 科学探索 ===
  { text: '你参加了学校的科学小实验', effect: { intelligence: 10, creativity: 5 }, conditions: { minAge: 8, maxAge: 11 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'science_child' } } },
  { text: '你的科技小发明获得了奖项', effect: { intelligence: 12, creativity: 10 }, conditions: { minAge: 9, maxAge: 11, hasFlag: 'science_child' } },
  // === 故事线: 阅读写作 ===
  { text: '你开始大量阅读课外书籍', effect: { intelligence: 10, wisdom: 5 }, conditions: { minAge: 7, maxAge: 11 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'reading_child' } } },
  { text: '你写了自己的第一篇小故事', effect: { creativity: 10, intelligence: 5 }, conditions: { minAge: 8, maxAge: 11, hasFlag: 'reading_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'writing_child' } } },
  { text: '你的作文被老师当作范文朗读', effect: { creativity: 8, charm: 8, happiness: 10 }, conditions: { minAge: 9, maxAge: 11, hasFlag: 'writing_child' } },
  // === 故事线: 动物与自然 ===
  { text: '你对小动物产生了浓厚的兴趣', effect: { wisdom: 8, happiness: 5 }, conditions: { minAge: 6, maxAge: 10 } },
  { text: '你开始养一只小宠物', effect: { happiness: 15, social: 5, wisdom: 5 }, conditions: { minAge: 7, maxAge: 11 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_pet' } } }
]


// 青少年期 12-17岁
storyEvents.teen = [
  { text: '你升入初中了，开始了新的学习阶段', effect: { intelligence: 5, education: 10 }, conditions: { minAge: 12, maxAge: 12 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'middle' } } },
  { text: '你在新班级里认识了很多新同学', effect: { social: 10 }, conditions: { minAge: 12, maxAge: 13 } },
  { text: '你开始进入青春期，身体发生了变化', effect: { health: 5 }, conditions: { minAge: 12, maxAge: 14 } },
  { text: '你对异性产生了朦胧的好感', effect: { happiness: 5 }, conditions: { minAge: 13, maxAge: 15 } },
  { text: '你暗恋上了班里的一个同学', effect: { happiness: 5, charm: 3 }, conditions: { minAge: 13, maxAge: 16 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_crush' } } },
  { text: '你收到了第一封情书', effect: { happiness: 10, charm: 10 }, conditions: { minAge: 14, maxAge: 17, minCharm: 50 } },
  { text: '你开始注重自己的外表', effect: { charm: 5 }, conditions: { minAge: 13, maxAge: 16 } },
  { text: '你和父母发生了争吵', effect: { happiness: -10 }, conditions: { minAge: 13, maxAge: 17 } },
  { text: '你开始有了自己的想法，不再事事听从父母', effect: { wisdom: 5 }, conditions: { minAge: 13, maxAge: 16 } },
  { text: '你参加了学校的社团活动', effect: { social: 10, happiness: 5 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你在学校的篮球赛中表现出色', effect: { health: 10, charm: 5 }, conditions: { minAge: 13, maxAge: 17 } },
  { text: '你开始熬夜学习，准备考试', effect: { intelligence: 10, health: -5 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你在期中考试中取得了好成绩', effect: { intelligence: 5, happiness: 10 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你考试失利，心情很低落', effect: { happiness: -15, intelligence: -3 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你升入高中了', effect: { intelligence: 5, education: 10 }, conditions: { minAge: 15, maxAge: 15 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'high' } } },
  { text: '你开始为高考做准备', effect: { intelligence: 10, happiness: -5 }, conditions: { minAge: 16, maxAge: 17 } },
  { text: '你参加了学校的文艺汇演', effect: { charm: 10, creativity: 5 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你在学校的辩论赛中获胜', effect: { intelligence: 10, charm: 8 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你开始学习吉他', effect: { creativity: 10, charm: 5 }, conditions: { minAge: 13, maxAge: 16 } },
  { text: '你和好朋友闹翻了', effect: { happiness: -15, social: -10 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你和好朋友和好了', effect: { happiness: 10, social: 5 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你开始对未来的职业有了想法', effect: { wisdom: 10 }, conditions: { minAge: 15, maxAge: 17 } },
  { text: '你参加了志愿者活动', effect: { social: 10, wisdom: 5 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你在学校的科技创新比赛中获奖', effect: { intelligence: 15, creativity: 10 }, conditions: { minAge: 14, maxAge: 17, minIntelligence: 60 } },
  { text: '你开始接触网络，打开了新世界的大门', effect: { intelligence: 5, social: 5 }, conditions: { minAge: 12, maxAge: 14 } },
  { text: '你沉迷于网络游戏，成绩下滑', effect: { intelligence: -10, happiness: 5, health: -5 }, conditions: { minAge: 13, maxAge: 17 } },
  { text: '你意识到学习的重要性，开始努力', effect: { intelligence: 10, wisdom: 5 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你在学校的运动会上获得了名次', effect: { health: 10, happiness: 10 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你开始写日记，记录自己的心情', effect: { creativity: 5, wisdom: 5 }, conditions: { minAge: 13, maxAge: 16 } },
  { text: '你参加了学校的夏令营', effect: { social: 10, happiness: 10 }, conditions: { minAge: 13, maxAge: 16 } },
  { text: '你开始对哲学感兴趣', effect: { wisdom: 10, intelligence: 5 }, conditions: { minAge: 15, maxAge: 17 } },
  { text: '你在学校的作文比赛中获奖', effect: { creativity: 10, intelligence: 5 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你开始学习一门外语', effect: { intelligence: 10 }, conditions: { minAge: 13, maxAge: 17 } },
  { text: '你参加了学校的学生会', effect: { social: 10, charm: 5 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你被选为班级干部', effect: { social: 8, charm: 5 }, conditions: { minAge: 12, maxAge: 17 } },
  { text: '你开始关注社会新闻', effect: { wisdom: 5, intelligence: 3 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你和同学一起组建了乐队', effect: { creativity: 10, social: 10 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你在学校的歌唱比赛中获奖', effect: { charm: 10, creativity: 5 }, conditions: { minAge: 13, maxAge: 17 } },
  { text: '你开始健身，身体变得更强壮', effect: { health: 10, charm: 5 }, conditions: { minAge: 14, maxAge: 17 } },
  { text: '你参加了学校的模拟联合国', effect: { intelligence: 10, social: 8 }, conditions: { minAge: 15, maxAge: 17 } },
  // === 故事线: 音乐之旅续章 ===
  { text: '你组建了自己的乐队', effect: { creativity: 10, social: 10, happiness: 8 }, conditions: { minAge: 14, maxAge: 17, hasFlag: 'music_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'music_teen' } } },
  { text: '你的乐队在校庆活动上演出', effect: { charm: 15, creativity: 10, happiness: 10 }, conditions: { minAge: 15, maxAge: 17, hasFlag: 'music_teen' } },
  { text: '你获得了钢琴考级证书', effect: { creativity: 10, intelligence: 5 }, conditions: { minAge: 14, maxAge: 17, hasFlag: 'music_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'music_certified' } } },
  // === 故事线: 科学研究续章 ===
  { text: '你参加了青少年科技创新大赛', effect: { intelligence: 15, creativity: 10 }, conditions: { minAge: 13, maxAge: 17, hasFlag: 'science_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'science_teen' } } },
  { text: '你的科研项目获得了省级奖项', effect: { intelligence: 12, creativity: 10, happiness: 15 }, conditions: { minAge: 14, maxAge: 17, hasFlag: 'science_teen' } },
  { text: '你对人工智能产生了浓厚兴趣', effect: { intelligence: 10, creativity: 8 }, conditions: { minAge: 14, maxAge: 17 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'ai_interest' } } },
  // === 故事线: 写作之路 ===
  { text: '你开始向校刊投稿', effect: { creativity: 10, intelligence: 5 }, conditions: { minAge: 13, maxAge: 17, hasFlag: 'writing_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'writing_teen' } } },
  { text: '你的文章在校刊连载', effect: { creativity: 10, charm: 8, happiness: 8 }, conditions: { minAge: 14, maxAge: 17, hasFlag: 'writing_teen' } },
  // === 故事线: 领袖之路 ===
  { text: '你当选为学生会的干部', effect: { social: 12, charm: 10, wisdom: 5 }, conditions: { minAge: 14, maxAge: 17 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'student_leader' } } },
  { text: '你组织了学校的大型活动', effect: { social: 15, wisdom: 8, happiness: 8 }, conditions: { minAge: 15, maxAge: 17, hasFlag: 'student_leader' } },
  // === 故事线: 志愿者精神 ===
  { text: '你开始参加志愿服务', effect: { social: 10, wisdom: 8, happiness: 5 }, conditions: { minAge: 14, maxAge: 17 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'volunteer_teen' } } },
  { text: '你在志愿服务中获得了优秀志愿者称号', effect: { social: 12, charm: 8, happiness: 10 }, conditions: { minAge: 15, maxAge: 17, hasFlag: 'volunteer_teen' } },
  // === 故事线: 宠物之情 ===
  { text: '你的宠物成为了你最忠诚的伙伴', effect: { happiness: 12, wisdom: 5 }, conditions: { minAge: 13, maxAge: 17, hasFlag: 'has_pet' } },
  // === 故事线: 编程之路 ===
  { text: '你开始自学编程,写了自己的小程序', effect: { intelligence: 12, creativity: 8 }, conditions: { minAge: 13, maxAge: 17 } },
  { text: '你的小程序在学校里传播开来', effect: { intelligence: 10, creativity: 8, happiness: 10 }, conditions: { minAge: 14, maxAge: 17 } }
]


// 青年期 18-34岁
storyEvents.youth = [
  { text: '你参加了高考，紧张又期待', effect: { intelligence: 5 }, conditions: { minAge: 18, maxAge: 18 } },
  { text: '你收到了大学录取通知书', effect: { happiness: 20, education: 15 }, conditions: { minAge: 18, maxAge: 18, minIntelligence: 50 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'university' } } },
  { text: '你开始了大学生活，一切都很新鲜', effect: { happiness: 10, social: 10 }, conditions: { minAge: 18, maxAge: 19 } },
  { text: '你在大学里加入了社团', effect: { social: 10, happiness: 5 }, conditions: { minAge: 18, maxAge: 22 } },
  { text: '你在大学里谈了恋爱', effect: { happiness: 15, charm: 5 }, conditions: { minAge: 18, maxAge: 24 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'in_relationship' } } },
  { text: '你和恋人分手了，心情很低落', effect: { happiness: -20 }, conditions: { minAge: 19, maxAge: 30, hasFlag: 'in_relationship' }, stateAction: { action: 'REMOVE_FLAG', data: { flag: 'in_relationship' } } },
  { text: '你大学毕业了，开始找工作', effect: { education: 10 }, conditions: { minAge: 22, maxAge: 23 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'graduate' } } },
  { text: '你找到了第一份工作', effect: { wealth: 10, happiness: 10 }, conditions: { minAge: 22, maxAge: 25 }, stateAction: { action: 'CAREER_START', data: { type: 'employee' } } },
  { text: '你在工作中表现出色，得到了领导的认可', effect: { wealth: 10, charm: 5 }, conditions: { minAge: 23, maxAge: 34 } },
  { text: '你获得了升职加薪', effect: { wealth: 15, happiness: 10 }, conditions: { minAge: 24, maxAge: 34 } },
  { text: '你和同事发生了矛盾', effect: { happiness: -10, social: -5 }, conditions: { minAge: 22, maxAge: 34 } },
  { text: '你决定考研深造', effect: { intelligence: 10 }, conditions: { minAge: 22, maxAge: 26 } },
  { text: '你考研成功，继续学业', effect: { intelligence: 15, education: 10 }, conditions: { minAge: 22, maxAge: 27, minIntelligence: 60 }, stateAction: { action: 'EDUCATION_ADVANCE', data: { level: 'master' } } },
  { text: '你遇到了心仪的对象', effect: { happiness: 15 }, conditions: { minAge: 22, maxAge: 32 } },
  { text: '你开始认真考虑结婚的事情', effect: { wisdom: 5 }, conditions: { minAge: 25, maxAge: 32, hasFlag: 'in_relationship' } },
  { text: '你向恋人求婚成功了', effect: { happiness: 25 }, conditions: { minAge: 25, maxAge: 34, hasFlag: 'in_relationship' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'engaged' } } },
  { text: '你结婚了，开始了新的人生阶段', effect: { happiness: 30, social: 10 }, conditions: { minAge: 25, maxAge: 34, hasFlag: 'engaged' }, stateAction: { action: 'MARRY', data: {} } },
  { text: '你买了人生第一套房子', effect: { wealth: -20, happiness: 20 }, conditions: { minAge: 26, maxAge: 34, minWealth: 50 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_house' } } },
  { text: '你买了人生第一辆车', effect: { wealth: -10, happiness: 15 }, conditions: { minAge: 24, maxAge: 34, minWealth: 40 }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_car' } } },
  { text: '你开始创业', effect: { wealth: -10, wisdom: 10 }, conditions: { minAge: 25, maxAge: 34 }, stateAction: { action: 'CAREER_START', data: { type: 'entrepreneur' } } },
  { text: '你的创业项目获得了投资', effect: { wealth: 30, happiness: 20 }, conditions: { minAge: 26, maxAge: 34, hasFlag: 'is_entrepreneur' } },
  { text: '你的创业失败了，但学到了很多', effect: { wealth: -20, wisdom: 15 }, conditions: { minAge: 26, maxAge: 34, hasFlag: 'is_entrepreneur' } },
  { text: '你在工作中遇到了瓶颈', effect: { happiness: -10, wisdom: 5 }, conditions: { minAge: 25, maxAge: 34 } },
  { text: '你决定跳槽，寻找新的机会', effect: { wealth: 5 }, conditions: { minAge: 24, maxAge: 34 } },
  { text: '你开始学习投资理财', effect: { wealth: 5, wisdom: 5 }, conditions: { minAge: 24, maxAge: 34 } },
  { text: '你的投资获得了不错的回报', effect: { wealth: 15 }, conditions: { minAge: 25, maxAge: 34, minWealth: 40 } },
  { text: '你的投资亏损了', effect: { wealth: -15, wisdom: 5 }, conditions: { minAge: 25, maxAge: 34 } },
  { text: '你和朋友一起去旅行', effect: { happiness: 15, social: 5 }, conditions: { minAge: 20, maxAge: 34 } },
  { text: '你开始注重健康，坚持锻炼', effect: { health: 10 }, conditions: { minAge: 25, maxAge: 34 } },
  { text: '你因为工作压力大，身体出了问题', effect: { health: -15, happiness: -10 }, conditions: { minAge: 25, maxAge: 34 } },
  { text: '你参加了同学聚会', effect: { social: 10, happiness: 5 }, conditions: { minAge: 22, maxAge: 34 } },
  { text: '你开始考虑要孩子的事情', effect: { wisdom: 5 }, conditions: { minAge: 26, maxAge: 34, hasFlag: 'married' } },
  { text: '你有了自己的孩子', effect: { happiness: 30 }, conditions: { minAge: 26, maxAge: 34, hasFlag: 'married' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_child' } } },
  { text: '你开始学习育儿知识', effect: { wisdom: 10 }, conditions: { minAge: 26, maxAge: 34, hasFlag: 'has_child' } },
  { text: '你在职场上遇到了贵人', effect: { wealth: 10, social: 10 }, conditions: { minAge: 24, maxAge: 34 } },
  { text: '你被公司派去国外出差', effect: { wisdom: 10, wealth: 5 }, conditions: { minAge: 25, maxAge: 34 } },
  { text: '你开始学习新的技能', effect: { intelligence: 10 }, conditions: { minAge: 22, maxAge: 34 } },
  { text: '你获得了行业内的认可', effect: { charm: 10, wealth: 10 }, conditions: { minAge: 28, maxAge: 34 } },
  { text: '你开始思考人生的意义', effect: { wisdom: 10 }, conditions: { minAge: 28, maxAge: 34 } },
  { text: '你和家人的关系变得更加亲密', effect: { happiness: 10, social: 5 }, conditions: { minAge: 25, maxAge: 34 } },
  // === 故事线: 音乐之旅成年 ===
  { text: '你加入了大学的音乐社团', effect: { creativity: 10, social: 8, happiness: 8 }, conditions: { minAge: 18, maxAge: 22, hasFlag: 'music_teen' } },
  { text: '你和乐队在校外演出', effect: { charm: 12, creativity: 10, happiness: 10 }, conditions: { minAge: 19, maxAge: 25, hasFlag: 'music_teen' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'music_youth' } } },
  { text: '你举办了人生第一场个人音乐会', effect: { charm: 15, creativity: 12, happiness: 15 }, conditions: { minAge: 20, maxAge: 28, hasFlag: 'music_youth' } },
  { text: '你的音乐在网上获得了一定关注', effect: { creativity: 10, charm: 8, wealth: 5 }, conditions: { minAge: 20, maxAge: 30, hasFlag: 'music_youth' } },
  // === 故事线: 科学研究成年 ===
  { text: '你参与了教授的科研项目', effect: { intelligence: 12, wisdom: 5 }, conditions: { minAge: 18, maxAge: 24, hasFlag: 'science_teen' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'science_youth' } } },
  { text: '你的科研论文发表了', effect: { intelligence: 15, creativity: 10, happiness: 15 }, conditions: { minAge: 22, maxAge: 30, hasFlag: 'science_youth' } },
  // === 故事线: 写作事业 ===
  { text: '你开始在网上连载小说', effect: { creativity: 12, intelligence: 5, happiness: 10 }, conditions: { minAge: 18, maxAge: 28, hasFlag: 'writing_teen' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'writing_youth' } } },
  { text: '你获得了第一批忠实读者', effect: { creativity: 10, happiness: 12 }, conditions: { minAge: 20, maxAge: 30, hasFlag: 'writing_youth' } },
  { text: '你收到了出版商的邀约', effect: { creativity: 15, wealth: 10, happiness: 15 }, conditions: { minAge: 22, maxAge: 30, hasFlag: 'writing_youth' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'writing_published' } } },
  // === 故事线: 志愿服务传承 ===
  { text: '你成为了志愿服务的组织者', effect: { social: 15, wisdom: 8, happiness: 8 }, conditions: { minAge: 20, maxAge: 30, hasFlag: 'volunteer_teen' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'volunteer_youth' } } },
  { text: '你发起了自己的公益项目', effect: { social: 15, wisdom: 12, happiness: 10 }, conditions: { minAge: 22, maxAge: 32, hasFlag: 'volunteer_youth' } },
  // === 故事线: 领袖成长 ===
  { text: '你开始在工作中带领团队', effect: { social: 12, wealth: 8, wisdom: 5 }, conditions: { minAge: 22, maxAge: 32, hasFlag: 'student_leader' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'career_leader' } } },
  { text: '你的团队取得了优秀的业绩', effect: { wealth: 15, charm: 10, happiness: 10 }, conditions: { minAge: 25, maxAge: 34, hasFlag: 'career_leader' } },
  // === 故事线: AI人工智能 ===
  { text: '你开始深入学习人工智能', effect: { intelligence: 15, creativity: 10 }, conditions: { minAge: 18, maxAge: 26, hasFlag: 'ai_interest' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'ai_youth' } } },
  { text: '你开发了一个人工智能小工具', effect: { intelligence: 15, creativity: 12, wealth: 8 }, conditions: { minAge: 22, maxAge: 30, hasFlag: 'ai_youth' } },
  // === 故事线: 环球旅行 ===
  { text: '你独自踏上了背包旅行', effect: { wisdom: 12, happiness: 15, social: 5 }, conditions: { minAge: 20, maxAge: 30 } },
  { text: '你在旅途中结识了来自世界各地的朋友', effect: { social: 15, wisdom: 8, happiness: 10 }, conditions: { minAge: 21, maxAge: 30 } }
]


// 中年期 35-59岁
storyEvents.middle = [
  { text: '你步入中年，开始感受到岁月的痕迹', effect: { wisdom: 10 }, conditions: { minAge: 35, maxAge: 36 } },
  { text: '你在事业上达到了新的高度', effect: { wealth: 20, charm: 10 }, conditions: { minAge: 35, maxAge: 50 } },
  { text: '你成为了公司的管理层', effect: { wealth: 15, social: 10 }, conditions: { minAge: 35, maxAge: 50 }, stateAction: { action: 'CAREER_ADVANCE', data: { level: 'manager' } } },
  { text: '你的孩子上学了', effect: { happiness: 10 }, conditions: { minAge: 35, maxAge: 45, hasFlag: 'has_child' } },
  { text: '你开始为孩子的教育操心', effect: { happiness: -5, wisdom: 5 }, conditions: { minAge: 35, maxAge: 50, hasFlag: 'has_child' } },
  { text: '你的孩子取得了好成绩，你很欣慰', effect: { happiness: 15 }, conditions: { minAge: 38, maxAge: 55, hasFlag: 'has_child' } },
  { text: '你和配偶的感情出现了问题', effect: { happiness: -15 }, conditions: { minAge: 35, maxAge: 55, hasFlag: 'married' } },
  { text: '你和配偶一起度过了难关，感情更深了', effect: { happiness: 15, social: 5 }, conditions: { minAge: 35, maxAge: 55, hasFlag: 'married' } },
  { text: '你的父母身体开始不好', effect: { happiness: -10, wisdom: 5 }, conditions: { minAge: 40, maxAge: 55 } },
  { text: '你开始照顾年迈的父母', effect: { happiness: -5, wisdom: 10 }, conditions: { minAge: 45, maxAge: 59 } },
  { text: '你的父亲去世了', effect: { happiness: -30, wisdom: 10 }, conditions: { minAge: 45, maxAge: 59 }, stateAction: { action: 'FAMILY_DEATH', data: { member: 'father' } } },
  { text: '你的母亲去世了', effect: { happiness: -30, wisdom: 10 }, conditions: { minAge: 45, maxAge: 59 }, stateAction: { action: 'FAMILY_DEATH', data: { member: 'mother' } } },
  { text: '你开始注重养生', effect: { health: 10 }, conditions: { minAge: 40, maxAge: 59 } },
  { text: '你体检发现了一些小问题', effect: { health: -10, wisdom: 5 }, conditions: { minAge: 40, maxAge: 59 } },
  { text: '你开始有了白发', effect: { charm: -5, wisdom: 5 }, conditions: { minAge: 40, maxAge: 50 } },
  { text: '你的事业遇到了瓶颈', effect: { happiness: -10, wealth: -5 }, conditions: { minAge: 40, maxAge: 55 } },
  { text: '你成功转型，开辟了新的事业方向', effect: { wealth: 15, wisdom: 10 }, conditions: { minAge: 40, maxAge: 55 } },
  { text: '你开始培养年轻人', effect: { social: 10, wisdom: 10 }, conditions: { minAge: 40, maxAge: 59 } },
  { text: '你在行业内获得了很高的声望', effect: { charm: 15, wealth: 10 }, conditions: { minAge: 45, maxAge: 59 } },
  { text: '你开始考虑退休后的生活', effect: { wisdom: 10 }, conditions: { minAge: 50, maxAge: 59 } },
  { text: '你的孩子大学毕业了', effect: { happiness: 20 }, conditions: { minAge: 45, maxAge: 55, hasFlag: 'has_child' } },
  { text: '你的孩子找到了工作', effect: { happiness: 15 }, conditions: { minAge: 46, maxAge: 56, hasFlag: 'has_child' } },
  { text: '你的孩子结婚了', effect: { happiness: 25 }, conditions: { minAge: 50, maxAge: 59, hasFlag: 'has_child' } },
  { text: '你当上了爷爷/奶奶', effect: { happiness: 30 }, conditions: { minAge: 52, maxAge: 59, hasFlag: 'has_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_grandchild' } } },
  { text: '你开始学习新的爱好', effect: { happiness: 10, creativity: 5 }, conditions: { minAge: 45, maxAge: 59 } },
  { text: '你和老朋友重逢', effect: { happiness: 15, social: 10 }, conditions: { minAge: 40, maxAge: 59 } },
  { text: '你参加了同学会', effect: { happiness: 10, social: 5 }, conditions: { minAge: 40, maxAge: 59 } },
  { text: '你开始写回忆录', effect: { creativity: 10, wisdom: 5 }, conditions: { minAge: 50, maxAge: 59 } },
  { text: '你的投资获得了丰厚的回报', effect: { wealth: 25 }, conditions: { minAge: 40, maxAge: 59, minWealth: 50 } },
  { text: '你经历了一次经济危机，损失惨重', effect: { wealth: -30, wisdom: 10 }, conditions: { minAge: 40, maxAge: 59 } },
  { text: '你开始做慈善', effect: { happiness: 10, charm: 10 }, conditions: { minAge: 45, maxAge: 59, minWealth: 60 } },
  { text: '你获得了行业终身成就奖', effect: { charm: 20, happiness: 20 }, conditions: { minAge: 50, maxAge: 59 } },
  { text: '你开始学习书法/绘画', effect: { creativity: 10, wisdom: 5 }, conditions: { minAge: 45, maxAge: 59 } },
  { text: '你和配偶一起去旅行', effect: { happiness: 15 }, conditions: { minAge: 40, maxAge: 59, hasFlag: 'married' } },
  { text: '你开始关注健康饮食', effect: { health: 10 }, conditions: { minAge: 45, maxAge: 59 } },
  { text: '你的身体出现了一些慢性病', effect: { health: -15 }, conditions: { minAge: 50, maxAge: 59 } },
  { text: '你开始每天散步锻炼', effect: { health: 10, happiness: 5 }, conditions: { minAge: 50, maxAge: 59 } },
  { text: '你的孩子事业有成，你很骄傲', effect: { happiness: 20 }, conditions: { minAge: 50, maxAge: 59, hasFlag: 'has_child' } },
  { text: '你开始整理人生的得失', effect: { wisdom: 15 }, conditions: { minAge: 55, maxAge: 59 } },
  { text: '你决定提前退休，享受生活', effect: { happiness: 15, wealth: -10 }, conditions: { minAge: 55, maxAge: 59, minWealth: 60 } },
  // === 故事线: 音乐中年延续 ===
  { text: '你偶尔还会弹弹琴,音乐成了生活的调味剂', effect: { happiness: 10, creativity: 5 }, conditions: { minAge: 35, maxAge: 55, hasFlag: 'music_youth' } },
  { text: '你带着孩子一起欣赏古典音乐', effect: { social: 8, happiness: 10 }, conditions: { minAge: 35, maxAge: 50, hasFlag: 'has_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'music_family' } } },
  // === 故事线: 科研中年成就 ===
  { text: '你成为了领域内的专家', effect: { intelligence: 15, charm: 10, wealth: 15 }, conditions: { minAge: 35, maxAge: 55, hasFlag: 'science_youth' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'science_middle' } } },
  { text: '你开始带研究生', effect: { wisdom: 12, social: 10, happiness: 8 }, conditions: { minAge: 38, maxAge: 55, hasFlag: 'science_middle' } },
  { text: '你获得了重要的科研奖项', effect: { intelligence: 15, charm: 15, wealth: 20 }, conditions: { minAge: 40, maxAge: 58, hasFlag: 'science_middle' } },
  // === 故事线: 写作中年丰收 ===
  { text: '你的书正式出版了', effect: { creativity: 15, happiness: 15, wealth: 10 }, conditions: { minAge: 35, maxAge: 55, hasFlag: 'writing_youth' } },
  { text: '你受邀参加书展和签售会', effect: { charm: 15, social: 10, happiness: 12 }, conditions: { minAge: 36, maxAge: 55, hasFlag: 'writing_published' } },
  // === 故事线: 志愿服务中年领袖 ===
  { text: '你发起的公益项目越做越大', effect: { social: 15, wisdom: 10, happiness: 10 }, conditions: { minAge: 35, maxAge: 55, hasFlag: 'volunteer_youth' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'volunteer_middle' } } },
  { text: '你获得了社会企业家的荣誉', effect: { charm: 15, social: 15, wealth: 10 }, conditions: { minAge: 40, maxAge: 58, hasFlag: 'volunteer_middle' } },
  // === 故事线: 领袖中年巅峰 ===
  { text: '你成为了公司的高管', effect: { wealth: 20, charm: 15, happiness: 10 }, conditions: { minAge: 38, maxAge: 55, hasFlag: 'career_leader' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'career_executive' } } },
  { text: '你在行业论坛上做主题演讲', effect: { charm: 15, social: 12, wisdom: 8 }, conditions: { minAge: 40, maxAge: 58, hasFlag: 'career_executive' } },
  // === 故事线: AI人工智能中年 ===
  { text: '你创立了人工智能公司', effect: { wealth: 30, intelligence: 15, happiness: 15 }, conditions: { minAge: 35, maxAge: 50, hasFlag: 'ai_youth' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'ai_entrepreneur' } } },
  { text: '你的AI产品获得了市场认可', effect: { wealth: 25, charm: 12, happiness: 15 }, conditions: { minAge: 38, maxAge: 55, hasFlag: 'ai_entrepreneur' } },
  // === 故事线: 家庭传承 ===
  { text: '你开始向孩子讲述家族的故事', effect: { wisdom: 10, social: 5, happiness: 8 }, conditions: { minAge: 38, maxAge: 55, hasFlag: 'has_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'family_legacy' } } },
  { text: '你的家庭成为邻里羡慕的对象', effect: { happiness: 15, charm: 10, social: 8 }, conditions: { minAge: 40, maxAge: 58, hasFlag: 'family_legacy' } }
]


// 老年期 60岁以上
storyEvents.elder = [
  { text: '你正式退休了，开始了新的人生阶段', effect: { happiness: 10, wisdom: 10 }, conditions: { minAge: 60, maxAge: 65 }, stateAction: { action: 'RETIRE', data: {} } },
  { text: '你开始领取退休金', effect: { wealth: 5 }, conditions: { minAge: 60, maxAge: 65 } },
  { text: '你开始学习使用智能手机', effect: { intelligence: 5, happiness: 5 }, conditions: { minAge: 60, maxAge: 70 } },
  { text: '你加入了老年大学', effect: { social: 10, happiness: 10 }, conditions: { minAge: 60, maxAge: 75 } },
  { text: '你开始每天去公园锻炼', effect: { health: 10, social: 5 }, conditions: { minAge: 60, maxAge: 80 } },
  { text: '你和老伴一起去旅游', effect: { happiness: 15 }, conditions: { minAge: 60, maxAge: 75, hasFlag: 'married' } },
  { text: '你的孙子/孙女出生了', effect: { happiness: 25 }, conditions: { minAge: 60, maxAge: 70, hasFlag: 'has_child' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'has_grandchild' } } },
  { text: '你开始帮忙带孙子/孙女', effect: { happiness: 10, health: -5 }, conditions: { minAge: 60, maxAge: 75, hasFlag: 'has_grandchild' } },
  { text: '孙子/孙女叫你爷爷/奶奶，你很开心', effect: { happiness: 20 }, conditions: { minAge: 62, maxAge: 80, hasFlag: 'has_grandchild' } },
  { text: '你开始写回忆录', effect: { creativity: 10, wisdom: 10 }, conditions: { minAge: 65, maxAge: 80 } },
  { text: '你的身体开始出现各种小毛病', effect: { health: -10 }, conditions: { minAge: 65, maxAge: 80 } },
  { text: '你住院治疗了一段时间', effect: { health: -15, wealth: -10 }, conditions: { minAge: 65, maxAge: 85 } },
  { text: '你康复出院了，家人都很高兴', effect: { health: 5, happiness: 10 }, conditions: { minAge: 65, maxAge: 85 } },
  { text: '你开始学习太极拳', effect: { health: 10, wisdom: 5 }, conditions: { minAge: 60, maxAge: 75 } },
  { text: '你在老年书法比赛中获奖', effect: { happiness: 15, creativity: 10 }, conditions: { minAge: 65, maxAge: 80 } },
  { text: '你和老朋友们经常聚会', effect: { happiness: 10, social: 10 }, conditions: { minAge: 60, maxAge: 80 } },
  { text: '你的老朋友去世了，你很伤心', effect: { happiness: -20, wisdom: 5 }, conditions: { minAge: 65, maxAge: 90 } },
  { text: '你的老伴身体不好，你很担心', effect: { happiness: -15 }, conditions: { minAge: 65, maxAge: 85, hasFlag: 'married' } },
  { text: '你的老伴去世了', effect: { happiness: -40, wisdom: 10 }, conditions: { minAge: 70, maxAge: 90, hasFlag: 'married' }, stateAction: { action: 'SPOUSE_DEATH', data: {} } },
  { text: '你开始独自生活', effect: { happiness: -10, wisdom: 5 }, conditions: { minAge: 70, maxAge: 90 } },
  { text: '孩子们经常来看望你', effect: { happiness: 15 }, conditions: { minAge: 65, maxAge: 90, hasFlag: 'has_child' } },
  { text: '你过了一个热闹的生日', effect: { happiness: 20 }, conditions: { minAge: 70, maxAge: 90 } },
  { text: '你开始整理一生的照片', effect: { happiness: 5, wisdom: 10 }, conditions: { minAge: 70, maxAge: 85 } },
  { text: '你把人生经验传授给年轻人', effect: { wisdom: 10, social: 5 }, conditions: { minAge: 65, maxAge: 85 } },
  { text: '你开始学习下棋', effect: { intelligence: 5, social: 5 }, conditions: { minAge: 60, maxAge: 75 } },
  { text: '你在社区里很受尊敬', effect: { charm: 10, social: 10 }, conditions: { minAge: 70, maxAge: 90 } },
  { text: '你开始养花种草', effect: { happiness: 10, health: 5 }, conditions: { minAge: 60, maxAge: 80 } },
  { text: '你的花园成了邻居们羡慕的对象', effect: { happiness: 10, charm: 5 }, conditions: { minAge: 65, maxAge: 85 } },
  { text: '你开始学习画画', effect: { creativity: 10, happiness: 5 }, conditions: { minAge: 60, maxAge: 75 } },
  { text: '你的画作被社区展出', effect: { happiness: 15, charm: 10 }, conditions: { minAge: 65, maxAge: 80 } },
  { text: '你开始写诗', effect: { creativity: 10, wisdom: 5 }, conditions: { minAge: 65, maxAge: 85 } },
  { text: '你的诗被发表了', effect: { happiness: 15, creativity: 10 }, conditions: { minAge: 65, maxAge: 85 } },
  { text: '你开始教孙子/孙女下棋', effect: { happiness: 10, social: 5 }, conditions: { minAge: 65, maxAge: 80, hasFlag: 'has_grandchild' } },
  { text: '孙子/孙女考上了好学校，你很骄傲', effect: { happiness: 20 }, conditions: { minAge: 70, maxAge: 85, hasFlag: 'has_grandchild' } },
  { text: '你开始回忆年轻时的往事', effect: { wisdom: 10 }, conditions: { minAge: 75, maxAge: 90 } },
  { text: '你感到人生很圆满', effect: { happiness: 20, wisdom: 10 }, conditions: { minAge: 75, maxAge: 90 } },
  { text: '你开始思考生命的意义', effect: { wisdom: 15 }, conditions: { minAge: 75, maxAge: 90 } },
  { text: '你安详地度过每一天', effect: { happiness: 10, wisdom: 5 }, conditions: { minAge: 80, maxAge: 100 } },
  { text: '你成为了家族中最年长的人', effect: { wisdom: 10, charm: 5 }, conditions: { minAge: 80, maxAge: 100 } },
  { text: '你的百岁生日，全家人都来庆祝', effect: { happiness: 30 }, conditions: { minAge: 99, maxAge: 100 } },
  // === 故事线: 音乐传承 ===
  { text: '你偶尔弹弹琴,音乐里有你一生的故事', effect: { happiness: 15, wisdom: 8 }, conditions: { minAge: 60, maxAge: 85, hasFlag: 'music_youth' } },
  { text: '你开始教孙子/孙女弹琴', effect: { happiness: 15, social: 8, wisdom: 5 }, conditions: { minAge: 62, maxAge: 78, hasFlag: 'music_youth' } },
  { text: '看着孙辈演奏,你仿佛看到了年轻时的自己', effect: { happiness: 20, wisdom: 10 }, conditions: { minAge: 65, maxAge: 82, hasFlag: 'music_family' } },
  // === 故事线: 写作晚年 ===
  { text: '你开始写人生回忆录', effect: { creativity: 15, wisdom: 12, happiness: 10 }, conditions: { minAge: 60, maxAge: 80, hasFlag: 'writing_published' } },
  { text: '你的回忆录被家人珍藏', effect: { happiness: 15, wisdom: 10 }, conditions: { minAge: 65, maxAge: 85, hasFlag: 'writing_published' } },
  // === 故事线: 科研晚年传承 ===
  { text: '你获得了终身成就奖', effect: { happiness: 20, charm: 15, wisdom: 15 }, conditions: { minAge: 60, maxAge: 80, hasFlag: 'science_middle' } },
  { text: '你开设了个人讲座,分享毕生所学', effect: { wisdom: 15, social: 10, happiness: 10 }, conditions: { minAge: 60, maxAge: 80, hasFlag: 'science_middle' } },
  // === 故事线: 志愿服务晚年 ===
  { text: '你的公益事业有了接班人', effect: { happiness: 15, wisdom: 10 }, conditions: { minAge: 60, maxAge: 80, hasFlag: 'volunteer_middle' } },
  { text: '你的名字被刻在了公益纪念碑上', effect: { happiness: 20, charm: 15, wisdom: 10 }, conditions: { minAge: 65, maxAge: 85, hasFlag: 'volunteer_middle' } },
  // === 故事线: 领袖晚年 ===
  { text: '你成为了年轻人的商业导师', effect: { wisdom: 15, social: 10, happiness: 10 }, conditions: { minAge: 60, maxAge: 80, hasFlag: 'career_executive' } },
  // === 故事线: AI人工智能晚年 ===
  { text: '你的AI公司成为了行业翘楚', effect: { wealth: 20, charm: 10, happiness: 15 }, conditions: { minAge: 55, maxAge: 75, hasFlag: 'ai_entrepreneur' } },
  { text: '你受邀在科技大会上分享创业故事', effect: { wisdom: 12, charm: 15, happiness: 10 }, conditions: { minAge: 60, maxAge: 80, hasFlag: 'ai_entrepreneur' } },
  // === 故事线: 家庭传承晚年 ===
  { text: '你的家族有了完整的族谱', effect: { wisdom: 15, social: 8, happiness: 12 }, conditions: { minAge: 60, maxAge: 85, hasFlag: 'family_legacy' } },
  { text: '你给每个孙辈都准备了一份人生寄语', effect: { wisdom: 20, happiness: 15 }, conditions: { minAge: 65, maxAge: 85, hasFlag: 'family_legacy' }, stateAction: { action: 'ADD_FLAG', data: { flag: 'life_wisdom_shared' } } },
  // === 故事线: 人生圆满 ===
  { text: '你回首一生,发现所有的选择都串联成了独特的旅程', effect: { wisdom: 15, happiness: 15 }, conditions: { minAge: 70, maxAge: 90 } },
  { text: '你成为了后代口中传奇的祖先', effect: { wisdom: 15, charm: 10, happiness: 15 }, conditions: { minAge: 70, maxAge: 90 } }
]


// 处理事件文本中的变量
// 参数: event - 事件对象或文本, storyState - 故事状态, character - 角色对象
export function processEventText(event, storyState, character) {
  // 获取文本
  var text = ''
  if (!event) return ''
  if (typeof event === 'string') {
    text = event
  } else if (event && event.text) {
    text = event.text
  } else {
    return ''
  }
  
  if (!text || typeof text !== 'string') return ''
  
  var result = text
  
  // 替换伴侣名字
  if (storyState && storyState.partner && storyState.partner.name) {
    result = result.replace(/\{partnerName\}/g, storyState.partner.name)
  }
  
  // 替换孩子名字
  if (storyState && storyState.children && storyState.children.length > 0 && storyState.children[0] && storyState.children[0].name) {
    result = result.replace(/\{childName\}/g, storyState.children[0].name)
  }
  
  // 替换角色名字
  if (character && character.name) {
    result = result.replace(/\{name\}/g, character.name)
  }
  
  return result
}

// 根据年龄获取人生阶段
export function getStageByAge(age) {
  if (age === null || age === undefined || age < 0) return 'baby'
  if (age <= 2) return 'baby'
  if (age <= 5) return 'toddler'
  if (age <= 11) return 'child'
  if (age <= 17) return 'teen'
  if (age <= 34) return 'youth'
  if (age <= 59) return 'middle'
  return 'elder'
}

// 获取适合当前状态的故事事件
// 参数: stageIdOrAge - 阶段ID或年龄, character - 角色对象(包含属性和usedStoryEvents), storyState - 故事状态
export function getStoryEvent(stageIdOrAge, character, storyState) {
  if (stageIdOrAge === null || stageIdOrAge === undefined) return null
  
  // 获取实际年龄
  var age = 0
  if (character && character.age !== undefined) {
    age = character.age
  }
  
  // 根据年龄确定阶段
  const stage = getStageByAge(age)
  const events = storyEvents[stage]
  
  if (!events || events.length === 0) return null
  
  // 获取已使用事件列表
  var usedEvents = []
  if (character && character.usedStoryEvents && Array.isArray(character.usedStoryEvents)) {
    usedEvents = character.usedStoryEvents
  }
  
  // 获取flags
  var flags = []
  if (storyState && storyState.flags && Array.isArray(storyState.flags)) {
    flags = storyState.flags
  }
  
  // 过滤符合条件的事件
  const availableEvents = events.filter(function(event) {
    if (!event) return false
    
    // 检查是否已使用
    if (usedEvents.length > 0 && usedEvents.indexOf(event.text) !== -1) {
      return false
    }
    
    // 检查年龄条件
    var conditions = event.conditions || {}
    if (conditions.minAge !== undefined && age < conditions.minAge) return false
    if (conditions.maxAge !== undefined && age > conditions.maxAge) return false
    
    // 检查属性条件 - 从character对象获取
    if (character) {
      if (conditions.minIntelligence !== undefined && (character.intelligence === undefined || character.intelligence < conditions.minIntelligence)) return false
      if (conditions.minCharm !== undefined && (character.charm === undefined || character.charm < conditions.minCharm)) return false
      if (conditions.minWealth !== undefined && (character.wealth === undefined || character.wealth < conditions.minWealth)) return false
      if (conditions.minHealth !== undefined && (character.health === undefined || character.health < conditions.minHealth)) return false
    }
    
    // 检查标志条件
    if (conditions.hasFlag) {
      if (flags.length === 0 || flags.indexOf(conditions.hasFlag) === -1) return false
    }
    
    if (conditions.notHasFlag) {
      if (flags.length > 0 && flags.indexOf(conditions.notHasFlag) !== -1) return false
    }
    
    return true
  })
  
  if (availableEvents.length === 0) {
    // 如果没有可用事件，返回一个通用事件
    return {
      text: '平静的一年过去了',
      effect: {}
    }
  }
  
  // 随机选择一个事件
  var randomIndex = Math.floor(Math.random() * availableEvents.length)
  var selectedEvent = availableEvents[randomIndex]
  
  // 记录已使用的事件
  if (character && character.usedStoryEvents && selectedEvent && selectedEvent.text) {
    character.usedStoryEvents.push(selectedEvent.text)
  }
  
  return selectedEvent
}
