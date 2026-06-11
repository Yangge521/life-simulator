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
    tech_pioneer: {
      name: '科技先锋',
      icon: '💻',
      description: '站在AI与互联网浪潮之巅，用代码改变世界',
      stages: [
        { age: 12, event: '你第一次接触编程，被代码的魔力吸引', trigger: { minIntelligence: 65, random: 0.35 } },
        { age: 18, event: '你考上了顶尖大学的计算机系', trigger: { flag: 'cs_major', minIntelligence: 75 } },
        { age: 22, event: '你和同学在宿舍里开始了第一个创业项目', trigger: { flag: 'university_done' }, choices: ['全情投入创业', '先进大厂积累经验', '读研深造技术'] },
        { age: 28, event: '你的AI创业项目拿到了顶级VC的投资', trigger: { flag: 'tech_startup', minWealth: 50 } },
        { age: 35, event: '公司成为了独角兽，你登上了科技媒体头条', trigger: { flag: 'raised_funding', minWealth: 75 } },
        { age: 45, event: '你的技术改变了千千万万人的生活', trigger: { flag: 'tech_unicorn', minWealth: 85 } }
      ],
      rewards: { wealth: 45, intelligence: 25, social: 15 },
      risk: { health: -10, happiness: -5 }
    },
    
    athlete: {
      name: '运动员之路',
      icon: '🥇',
      description: '在赛场上挥洒汗水，追逐金牌与荣耀',
      stages: [
        { age: 8, event: '你展现出了惊人的运动天赋', trigger: { minHealth: 65, random: 0.3 } },
        { age: 12, event: '你进入市体校开始专业训练', trigger: { flag: 'sports_talent', minHealth: 70 } },
        { age: 16, event: '你在全国青少年比赛中拿了奖牌', trigger: { flag: 'entered_sports_school' }, choices: ['全力冲国家队', '兼顾学业和运动', '放弃走职业路线'] },
        { age: 22, event: '你代表国家参加国际大赛', trigger: { flag: 'national_team', minHealth: 80 } },
        { age: 28, event: '你站上了奥运/世锦赛的领奖台', trigger: { flag: 'international_compete', minHealth: 75 } },
        { age: 35, event: '你退役了，转型教练/体育评论员', trigger: { flag: 'won_medal' } }
      ],
      rewards: { health: 35, charm: 20, social: 25, happiness: 20 },
      risk: { intelligence: -5, wealth: -10 }
    },
    
    chef: {
      name: '美食人生',
      icon: '🍳',
      description: '用美食治愈人心，从厨房走向世界',
      stages: [
        { age: 10, event: '你第一次下厨就做出了让全家人惊艳的菜', trigger: { minCreativity: 50, random: 0.4 } },
        { age: 18, event: '你放弃了常规大学，去了烹饪学院', trigger: { flag: 'cooking_talent' }, choices: ['去法国蓝带学西餐', '拜中餐大师为师', '自学创新融合菜'] },
        { age: 25, event: '你在知名餐厅从学徒做到了主厨', trigger: { flag: 'culinary_school' } },
        { age: 32, event: '你开了自己的第一家餐厅', trigger: { flag: 'became_head_chef', minWealth: 30 } },
        { age: 40, event: '你的餐厅获得了米其林星级', trigger: { flag: 'has_restaurant', minCreativity: 75 } },
        { age: 50, event: '你成为了美食界的传奇人物，出版了畅销食谱', trigger: { flag: 'michelin_star', minCreativity: 85 } }
      ],
      rewards: { creativity: 35, happiness: 30, charm: 20 },
      risk: { health: -5, intelligence: -5 }
    },
    
    esports: {
      name: '电竞选手',
      icon: '🎮',
      description: '在虚拟战场中封神，从网瘾少年到世界冠军',
      stages: [
        { age: 14, event: '你在某款游戏里打到了服务器前十', trigger: { minIntelligence: 55, random: 0.25 } },
        { age: 17, event: '有职业战队来邀请你试训', trigger: { flag: 'gamer' }, choices: ['签约成为职业选手', '拒绝，继续学业', '做游戏主播'] },
        { age: 20, event: '你第一次站上了职业赛场，手在抖', trigger: { flag: 'signed_team' } },
        { age: 23, event: '你和队友一起拿下了国内联赛冠军', trigger: { flag: 'pro_debut', minIntelligence: 65 } },
        { age: 26, event: '你捧起了世界冠军的奖杯，全场高呼你的ID', trigger: { flag: 'domestic_champion' } },
        { age: 30, event: '你退役了，但作为电竞传奇永远被铭记', trigger: { flag: 'world_champion' } }
      ],
      rewards: { wealth: 30, charm: 25, happiness: 25, social: 20 },
      risk: { health: -15, intelligence: -5 }
    },
    
    doctor_path: {
      name: '医者仁心',
      icon: '⚕️',
      description: '悬壶济世，用仁心仁术守护生命',
      stages: [
        { age: 18, event: '你以优异的成绩考入医学院', trigger: { minIntelligence: 75, flag: 'medical_major' } },
        { age: 23, event: '你完成了临床实习，第一次直面生死', trigger: { flag: 'med_school' }, choices: ['选外科，挑战极限', '选内科，深耕医学', '选儿科，守护未来'] },
        { age: 28, event: '你通过了规培，成为了一名主治医生', trigger: { flag: 'internship_done' } },
        { age: 35, event: '你主刀了一台高难度手术，挽救了一条生命', trigger: { flag: 'attending_doctor', minIntelligence: 80 } },
        { age: 45, event: '你在医学领域有了重大突破，发表了里程碑式论文', trigger: { flag: 'saved_lives', minIntelligence: 85 } },
        { age: 55, event: '你成为了科室主任，培养了无数年轻医生', trigger: { flag: 'medical_breakthrough', minWisdom: 75 } }
      ],
      rewards: { intelligence: 30, wisdom: 25, social: 20, happiness: 15 },
      risk: { health: -10, wealth: -5 }
    },
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
    long_distance: {
      name: '异地恋坚守',
      icon: '📞',
      description: '山海阻隔不了真心，用坚守换来最终团圆',
      stages: [
        { age: 18, event: '高考后你们去了不同的城市，临别时哭着说要坚持', trigger: { relationshipStatus: 'dating' } },
        { age: 20, event: '异地两年了，电话越来越少，你开始动摇', trigger: { flag: 'long_distance_start' }, choices: ['咬牙坚持', '提出分手', '试图转学到一起'] },
        { age: 24, event: '你们终于毕业了，终于有机会在同一个城市了', trigger: { flag: 'ld_struggling' } },
        { age: 26, event: '经历了多年分离，你们结婚了，比任何人都珍惜彼此', trigger: { flag: 'ld_reunited' } },
        { age: 35, event: '回首异地的那几年，觉得一切都是值得的', trigger: { flag: 'married', relationshipStatus: 'married' } }
      ],
      rewards: { happiness: 40, wisdom: 20, social: 10 },
      risk: { happiness: -20 }
    },
    
    second_chance: {
      name: '破镜重圆',
      icon: '🪞',
      description: '分开多年后，命运的齿轮又将你们转到一起',
      stages: [
        { age: 25, event: '你和曾经的恋人分手多年，偶尔还是会想起', trigger: { relationshipStatus: 'single', flag: 'had_love' } },
        { age: 32, event: '你们在一家咖啡馆意外重逢了', trigger: { random: 0.3, age_range: [30, 40] }, choices: ['上前打招呼', '假装没看见', '远远地看了一会儿就走了'] },
        { age: 34, event: '你们开始重新了解彼此，一切熟悉又陌生', trigger: { flag: 'reunited_ex' } },
        { age: 36, event: '你鼓起勇气重新求婚，这次你不再犹豫', trigger: { flag: 'rekindling' } },
        { age: 40, event: '第二次机会让你们更懂得珍惜，婚姻比想象中幸福', trigger: { flag: 'remarried' } }
      ],
      rewards: { happiness: 38, wisdom: 25, charm: 10 },
      risk: { happiness: -10 }
    },
    
    online_romance: {
      name: '网络情缘',
      icon: '💌',
      description: '在虚拟世界相遇，在现实世界相爱',
      stages: [
        { age: 16, event: '你在网上认识了一个很有趣的人', trigger: { random: 0.4 } },
        { age: 18, event: '你们聊了好几年，TA成了你最重要的知己', trigger: { flag: 'online_friend' }, choices: ['约定见面', '保持网上友谊', '怕见光死干脆不见'] },
        { age: 20, event: '你们终于在线下见面了，紧张到手心冒汗', trigger: { flag: 'met_online' } },
        { age: 23, event: '你们跨越了虚拟和现实的界限，确立了恋爱关系', trigger: { flag: 'first_meet_good' } },
        { age: 28, event: '你们结婚了，婚礼上播放了你们当年的聊天记录', trigger: { flag: 'online_dating' } }
      ],
      rewards: { happiness: 35, social: 15, wisdom: 15 },
      risk: { happiness: -10, social: -5 }
    },
    
    single_parent: {
      name: '单亲再遇爱',
      icon: '🦸',
      description: '带着孩子重新出发，在生活的夹缝中再次找到爱情',
      stages: [
        { age: 30, event: '你一个人带着孩子，觉得这辈子可能不会再爱了', trigger: { relationshipStatus: 'single', flag: 'has_child' } },
        { age: 33, event: '你在孩子的家长会上遇到了一个特别的人', trigger: { random: 0.35 } },
        { age: 35, event: 'TA不介意你有孩子，反而很喜欢你的小家伙', trigger: { flag: 'met_someone_again' }, choices: ['慢慢接受这段感情', '怕孩子受影响，拒绝了', '先当朋友相处'] },
        { age: 37, event: '孩子接受了新爸爸/新妈妈，你们组成了新家庭', trigger: { flag: 'new_love_accepted' } },
        { age: 40, event: '回头看，你觉得第二次爱情比第一次更成熟和温暖', trigger: { flag: 'blended_family_formed' } }
      ],
      rewards: { happiness: 35, wisdom: 25, social: 10 },
      risk: { happiness: -15 }
    },
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
    adopted: {
      name: '收养之路',
      icon: '🤲',
      description: '给无家可归的孩子一个温暖的家',
      stages: [
        { age: 28, event: '你了解到孤儿院里有很多孩子需要领养', trigger: { random: 0.3 } },
        { age: 30, event: '你开始认真考虑收养一个孩子', trigger: { flag: 'learned_orphanage' }, choices: ['着手办领养手续', '纠结于血缘的关系', '打听跨国收养'] },
        { age: 31, event: '你第一次见到了那个孩子，TA怯生生地叫你叔叔/阿姨', trigger: { flag: 'adoption_process' } },
        { age: 32, event: '领养手续终于办下来了，TA正式成为了你的家人', trigger: { flag: 'met_adopted_child' } },
        { age: 38, event: '孩子慢慢长大，你们的感情比血缘还深', trigger: { flag: 'adopted_child' } },
        { age: 50, event: '孩子出息了，你不后悔当年的决定', trigger: { flag: 'child_grown' } }
      ],
      rewards: { happiness: 35, wisdom: 20, social: 15 },
      risk: { wealth: -15 }
    },
    
    stay_home_dad: {
      name: '全职奶爸',
      icon: '🍼',
      description: '放弃事业在家带娃，谁说养娃不是伟大事业',
      stages: [
        { age: 28, event: '孩子出生后，你们决定有一个人在家带娃', trigger: { flag: 'has_child' }, choices: ['你辞职在家带娃', '继续上班请保姆', '和伴侣轮流带'] },
        { age: 29, event: '全职带娃比你想象中累多了，但也更有意义', trigger: { flag: 'chose_stayhome' } },
        { age: 32, event: '孩子上了幼儿园，你发现自己比同龄人更懂孩子', trigger: { flag: 'full_time_parent' } },
        { age: 35, event: '你写的育儿日记/博客火了，成了半个育儿专家', trigger: { flag: 'child_started_school' }, choices: ['继续全职育儿，写书分享经验', '回归职场重新开始', '做自由职业两不误'] },
        { age: 40, event: '孩子把你当成最好的朋友和人生导师', trigger: { flag: 'parent_blogger' } }
      ],
      rewards: { happiness: 30, wisdom: 25, social: 15 },
      risk: { wealth: -15, intelligence: -5 }
    },
    
    blended_family: {
      name: '重组家庭',
      icon: '🏡',
      description: '把两个破碎的家庭拼成完整，爱比血缘更重要',
      stages: [
        { age: 32, event: '你再婚了，但两个孩子不太合得来', trigger: { flag: 'remarried' } },
        { age: 33, event: '继子/继女对你表现出了抵触，你有点难受', trigger: { flag: 'two_kids' }, choices: ['耐心陪伴，等TA慢慢接受', '严厉管教，立好规矩', '让伴侣多沟通'] },
        { age: 35, event: '两个孩子一起闯了个祸，反而团结起来了', trigger: { flag: 'blended_struggling' } },
        { age: 38, event: '你们终于像一个真正的家庭了，虽然一路磕磕绊绊', trigger: { flag: 'kids_bonded' } },
        { age: 45, event: '孩子们长大后，反而成了彼此最亲近的人', trigger: { flag: 'blended_harmonious' } }
      ],
      rewards: { happiness: 30, wisdom: 25, social: 15 },
      risk: { happiness: -10, wealth: -10 }
    },
    
    single_mom: {
      name: '单亲妈妈的坚强',
      icon: '💪',
      description: '一个人撑起一个家，用双倍的爱养大孩子',
      stages: [
        { age: 25, event: '你成为了单亲妈妈/爸爸，感觉天都要塌了', trigger: { relationshipStatus: 'single', flag: 'has_child' } },
        { age: 27, event: '你一个人又要赚钱又要带娃，每天都累到散架', trigger: { flag: 'single_parent_start' } },
        { age: 30, event: '你学会了所有生活技能，比任何人都强大', trigger: { flag: 'single_parent_struggling' }, choices: ['为了孩子拼命赚钱', '多花时间陪孩子', '接受父母帮忙'] },
        { age: 35, event: '孩子考了第一名，把奖状递给你说"妈妈/爸爸，谢谢你"', trigger: { flag: 'fought_alone' } },
        { age: 42, event: '孩子上了好大学，你一个人坐在空荡荡的家里哭了', trigger: { flag: 'child_excelled' } },
        { age: 55, event: '孩子成家立业了，他们比任何人都孝顺你', trigger: { flag: 'child_launched' } }
      ],
      rewards: { happiness: 30, wisdom: 30, social: 10 },
      risk: { health: -10, wealth: -15 }
    },
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
    whistleblower: {
      name: '正义举报人',
      icon: '🕵️',
      description: '发现黑幕后选择站出来，代价巨大但无怨无悔',
      hidden: true,
      stages: [
        { age: 30, event: '你在工作中发现了公司的违法行为', trigger: { minIntelligence: 60, minWisdom: 50 } },
        { age: 31, event: '你内心挣扎了很久：举报还是沉默？', trigger: { flag: 'found_misconduct' }, choices: ['选择举报', '假装不知道', '先收集更多证据'] },
        { age: 32, event: '你被公司打击报复，丢了工作', trigger: { flag: 'whistleblower' } },
        { age: 34, event: '媒体曝光了此事，公众舆论站在你这边', trigger: { flag: 'lost_job_for_truth' } },
        { age: 36, event: '你的坚持推动了行业改革，成为了公众英雄', trigger: { flag: 'media_exposure' } },
        { age: 45, event: '你写了一本回忆录，激励了无数人', trigger: { flag: 'became_hero' } }
      ],
      rewards: { wisdom: 35, social: 25, happiness: 20 },
      risk: { wealth: -25, happiness: -15 }
    },
    
    hermit: {
      name: '归隐田园',
      icon: '🏞️',
      description: '厌倦了城市的喧嚣，回归自然的简单生活',
      hidden: true,
      stages: [
        { age: 35, event: '你开始厌倦了朝九晚五的都市生活', trigger: { happiness: 35, maxHappiness: 40, random: 0.2 } },
        { age: 37, event: '你卖掉城里的房子，回老家/搬到了乡下', trigger: { flag: 'city_despair' }, choices: ['回农村种地', '去山里开民宿', '找个小镇定居'] },
        { age: 38, event: '刚开始很不适应，但慢慢爱上了泥土的味道', trigger: { flag: 'moved_to_country' } },
        { age: 42, event: '你的田园生活开始在朋友圈里火了，朋友纷纷来打卡', trigger: { flag: 'country_life' } },
        { age: 50, event: '你看着自己种的花草菜园，觉得这辈子终于活明白了', trigger: { flag: 'hermit_peace' } }
      ],
      rewards: { happiness: 35, health: 20, wisdom: 20, creativity: 15 },
      risk: { wealth: -30, social: -10 }
    },
    
    crime_redemption: {
      name: '改过自新',
      icon: '🕊️',
      description: '走过弯路后痛改前非，用余生弥补过错',
      hidden: true,
      stages: [
        { age: 20, event: '你因为一时的错误被关了几年', trigger: { maxHappiness: 25, maxSocial: 25, random: 0.08 } },
        { age: 25, event: '你出狱了，但社会对你的标签很难撕掉', trigger: { flag: 'incarcerated' }, choices: ['隐瞒过去重新开始', '坦然面对，努力证明自己', '回到老圈子又走歪了'] },
        { age: 28, event: '没有人愿意给你机会，你在街头做最苦的活', trigger: { flag: 'released' } },
        { age: 32, event: '你的善良打动了一位雇主，给了你一个机会', trigger: { flag: 'struggling_excon' } },
        { age: 38, event: '你成了一个小团队的负责人，大家都尊重你', trigger: { flag: 'second_chance_given' } },
        { age: 50, event: '你去了少管所做志愿者，用自己的故事警醒迷途少年', trigger: { flag: 'redeemed' } }
      ],
      rewards: { wisdom: 40, happiness: 20, social: 15 },
      risk: { happiness: -25, social: -20, wealth: -20 }
    },
    
    lottery_curse: {
      name: '中奖后的诅咒',
      icon: '💸',
      description: '一夜暴富之后，你发现钱不能解决一切',
      hidden: true,
      stages: [
        { age: 28, event: '你中了一大笔彩票奖金，几千万到手！', trigger: { random: 0.02, minAge: 25 } },
        { age: 29, event: '亲戚朋友纷纷找上门来借钱，你疲于应对', trigger: { flag: 'won_lottery' }, choices: ['慷慨解囊帮助所有人', '学会拒绝', '请专业人士管理'] },
        { age: 31, event: '你发现身边的人接近你大多是为了钱', trigger: { flag: 'surrounded_by_beggars' } },
        { age: 34, event: '你挥霍了很多钱，开始反思财富的意义', trigger: { flag: 'friends_for_money' } },
        { age: 38, event: '你成立了一个基金会，专门帮助有需要的人', trigger: { flag: 'wealth_reflection' } },
        { age: 50, event: '你把大部分钱捐了出去，反而感到了前所未有的轻松', trigger: { flag: 'has_foundation' } }
      ],
      rewards: { wisdom: 30, happiness: 15, social: 10 },
      risk: { happiness: -20, social: -15 }
    },
    
    alien_encounter: {
      name: '外星邂逅',
      icon: '🛸',
      description: '你与来自星空的访客有了一次不可思议的邂逅',
      hidden: true,
      stages: [
        { age: 18, event: '某个夏夜，你在郊外看到了一道奇异的光', trigger: { random: 0.005, minCreativity: 60 } },
        { age: 20, event: '你开始疯狂研究UFO和外星文明', trigger: { flag: 'strange_light' }, choices: ['成为业余天文学家', '写科幻小说表达想象', '太荒谬了，还是算了'] },
        { age: 25, event: '你在一次野营中再次遇到了那道神秘的光', trigger: { flag: 'ufo_researcher' } },
        { age: 26, event: '这次你鼓起勇气走近了，看到了......难以描述的场景', trigger: { flag: 'second_encounter' } },
        { age: 30, event: '你成了一名UFO研究专家，虽然没人信你，但你知道真相', trigger: { flag: 'close_encounter' } },
        { age: 60, event: '你在回忆录最后一章写下："他们还会回来的"', trigger: { flag: 'know_the_truth' } }
      ],
      rewards: { creativity: 40, wisdom: 20, happiness: 25 },
      risk: { social: -20, intelligence: -5 }
    },
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
