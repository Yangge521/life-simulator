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
      narrative: '初中那年你在学校机房第一次摸到键盘，一行Hello World让你兴奋得睡不着。代码改变了你的命运，也定义了你的信仰。',
      stages: [
        { age: 12, event: '你第一次接触编程，被代码的魔力吸引', trigger: { minIntelligence: 65, random: 0.35 } },
        { age: 18, event: '你考上了顶尖大学的计算机系', trigger: { flag: 'cs_major', minIntelligence: 75 } },
        { age: 22, event: '你和同学在宿舍里开始了第一个创业项目', trigger: { flag: 'university_done' }, choices: ['全情投入创业', '先进大厂积累经验', '读研深造技术'] },
        { age: 28, event: '你的AI创业项目拿到了顶级VC的投资', trigger: { flag: 'tech_startup', minWealth: 50 } },
        { age: 35, event: '公司成为了独角兽，你登上了科技媒体头条', trigger: { flag: 'raised_funding', minWealth: 75 } },
        { age: 45, event: '你的技术改变了千千万万人的生活', trigger: { flag: 'tech_unicorn', minWealth: 85 } }
      ],
      endings: [
        { name: '独角兽上市', condition: { flag: 'tech_unicorn', minWealth: 85 }, text: '你敲响纳斯达克的钟声那天，世界记住了你的名字。技术改变了千万人的生活，你成了这个时代的英雄。', rewards: { wealth: 15, social: 10 } },
        { name: '被巨头收购', condition: { flag: 'raised_funding', minWealth: 60 }, text: '公司被巨头高价收购，你套现离场。虽然没有亲手把公司带上市，但财务自由让你从容选择了下一段人生。', rewards: { wealth: 10, happiness: 5 } },
        { name: '创业失败', condition: { flag_fail: 'tech_startup', maxWealth: 30 }, text: '项目烧完了最后一轮融资，团队散了。你回到出租屋里发了三天呆，但这段经历让你比任何人都懂创业的残酷。', rewards: { wisdom: 10, happiness: -10 } }
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
      endings: [
        { name: '奥运冠军', condition: { flag: 'won_medal', minHealth: 75 }, text: '站在最高领奖台上，国歌响起的那一刻，你泪流满面。二十年汗水在这一刻凝成金牌，你是国家的骄傲。', rewards: { happiness: 15, social: 15, charm: 10 } },
        { name: '转型教练', condition: { flag: 'national_team', maxHealth: 70 }, text: '伤病让你提前离开了赛场，但你带出了新一代冠军。徒弟站上领奖台时，你比当年自己拿奖还激动。', rewards: { wisdom: 10, happiness: 5, social: 5 } },
        { name: '伤病退役', condition: { flag_fail: 'entered_sports_school', maxHealth: 40 }, text: '一次意外的伤病终结了你的运动生涯。你黯然退役，在康复室里度过了最漫长的夏天，人生重新归零。', rewards: { health: -15, happiness: -15 } }
      ],
      rewards: { health: 35, charm: 20, social: 25, happiness: 20 },
      risk: { intelligence: -5, wealth: -10 }
    },
    
    chef: {
      name: '美食人生',
      icon: '🍳',
      description: '用美食治愈人心，从厨房走向世界',
      narrative: '十岁那年你第一次摸到炒勺，一道番茄炒蛋让全家惊为天人。从那一刻起，你知道自己属于厨房，属于那烟火升腾的世界。',
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
      endings: [
        { name: '国际名医', condition: { flag: 'medical_breakthrough', minIntelligence: 85 }, text: '你在国际医学大会上作主题报告，台下坐着全球顶尖同行。你的研究成果挽救了无数生命，名字被写进了教科书。', rewards: { intelligence: 10, social: 15, happiness: 10 } },
        { name: '平凡医生', condition: { flag: 'attending_doctor' }, text: '你没有惊天动地的成就，但在平凡的岗位上认真对待每一位病人。三十年如一日的仁心，被街坊邻居叫做"活菩萨"。', rewards: { happiness: 5, wisdom: 5 } },
        { name: '医患纠纷', condition: { flag_fail: 'internship_done', maxSocial: 40 }, text: '一场医患纠纷让你心力交瘁，你选择了离开临床一线。那个曾经满怀理想的医学生，最终被现实磨去了棱角。', rewards: { happiness: -15, social: -10 } }
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
        { age: 35, event: '公司上市或被收购', trigger: { flag: 'has_company', minWealth: 80 } }
      ],
      endings: [
        { name: '成功上市', condition: { flag: 'has_company', minWealth: 85 }, text: '你站在交易所敲钟的那一刻热泪盈眶。从出租屋到IPO，这条路走了十三年。你的名字成了创业圈里的传奇。', rewards: { wealth: 20, social: 15, happiness: 10 } },
        { name: '卖掉公司', condition: { flag: 'has_company', minWealth: 60 }, text: '你把公司卖给了行业巨头，拿到一笔不错的现金。虽然有些遗憾，但你想通了：人生不是只有一座山要爬。', rewards: { wealth: 10, wisdom: 5 } },
        { name: '公司清算', condition: { flag_fail: 'entrepreneur_first', maxWealth: 30 }, text: '资金链断了，你不得不解散团队。办公室里只剩下几张空桌和一地狼藉。你对自己说：输了一次不代表一辈子输。', rewards: { wealth: -20, wisdom: 15, happiness: -15 } }
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
      endings: [
        { name: '成名艺术家', condition: { flag: 'recognized_artist', minCreativity: 85 }, text: '你的作品被挂在顶级美术馆里，拍卖行的槌声为你响起。你用一生证明了艺术的力量，影响了整整一代创作者。', rewards: { creativity: 10, wealth: 15, happiness: 10 } },
        { name: '自由画师', condition: { flag: 'exhibited' }, text: '你没有大红大紫，但靠接稿和教学养活了自己。画自己想画的东西，过自己想过的日子，这就是你理解的艺术家生活。', rewards: { happiness: 5, creativity: 5 } },
        { name: '江郎才尽', condition: { flag_fail: 'art_major', maxCreativity: 50 }, text: '曾经灵光闪现的少年，最终被生活磨平了棱角。你已经很久没有拿起画笔了，那些颜料在角落里慢慢干涸。', rewards: { happiness: -10, creativity: -10 } }
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
    },
    
    internet_celebrity: {
      name: '网红博主',
      icon: '📱',
      description: '用镜头记录生活，从普通素人到流量顶流',
      narrative: '十二岁那年你借妈妈的手机拍了第一条短视频，粗糙的剪辑和笨拙的表演却收获了五十个赞。从那天起，你发现镜头是你的另一个世界。',
      stages: [
        { age: 12, event: '你开始爱上拍视频，记录生活的每个细节', trigger: { minCreativity: 55, random: 0.35 } },
        { age: 18, event: '你的账号小有名气，有了第一批忠实粉丝', trigger: { flag: 'kid_vlogger' }, choices: ['签约MCN机构', '继续独立创作', '把自媒体当副业'] },
        { age: 22, event: '你签约了头部MCN，粉丝突破五十万', trigger: { flag: 'rising_creator' } },
        { age: 26, event: '你的粉丝破百万，品牌合作接到手软', trigger: { flag: 'signed_mcn', minCreativity: 70 } },
        { age: 30, event: '你打造了自己的个人IP品牌，年入千万', trigger: { flag: 'million_follower', minSocial: 75 } },
        { age: 38, event: '你转型幕后，成立了MCN机构培养新人', trigger: { flag: 'has_ip_brand', minWealth: 80 } }
      ],
      endings: [
        { name: '顶流IP', condition: { flag: 'has_ip_brand', minWealth: 85 }, text: '你从一个人变成了一家公司，你的名字成了一个品牌。当你签下第一百个达人时，想起十二岁那年的第一条视频，恍如隔世。', rewards: { wealth: 20, social: 15, creativity: 10 } },
        { name: '内容创作者', condition: { flag: 'million_follower' }, text: '你没有做大做强，但一直坚持优质内容创作。粉丝虽然没破千万，但粘性极高。你说：对得起每一个关注我的人就够了。', rewards: { happiness: 10, creativity: 10 } },
        { name: '过气退网', condition: { flag_fail: 'rising_creator', maxSocial: 30 }, text: '流量来得快去得也快。算法不再眷顾你，广告商也悄然离去。你关掉了账号，回到了普通人的生活，偶尔翻翻旧视频，像在看另一个人。', rewards: { happiness: -10, social: -5 } }
      ],
      rewards: { wealth: 25, creativity: 25, social: 30, happiness: 15 },
      risk: { health: -10, intelligence: -5 }
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
      narrative: '高考后你和她去了相距一千公里的两座城市。临别那天你发誓：四年后，我们一定要在同一个地方看日出。手机成了你们之间最细的纽带。',
      stages: [
        { age: 18, event: '高考后你们去了不同的城市，临别时哭着说要坚持', trigger: { relationshipStatus: 'dating' } },
        { age: 20, event: '异地两年了，电话越来越少，你开始动摇', trigger: { flag: 'long_distance_start' }, choices: ['咬牙坚持', '提出分手', '试图转学到一起'] },
        { age: 24, event: '你们终于毕业了，终于有机会在同一个城市了', trigger: { flag: 'ld_struggling' } },
        { age: 26, event: '经历了多年分离，你们结婚了，比任何人都珍惜彼此', trigger: { flag: 'ld_reunited' } },
        { age: 35, event: '回首异地的那几年，觉得一切都是值得的', trigger: { flag: 'married', relationshipStatus: 'married' } }
      ],
      endings: [
        { name: '修成正果', condition: { flag: 'married', relationshipStatus: 'married' }, text: '异地四年、分手两次、复合三次，最后终于修成正果。你的婚礼上播放了七年所有火车票、机票和电话账单，来宾全哭了。', rewards: { happiness: 20, wisdom: 10 } },
        { name: '熬不过分手', condition: { flag_fail: 'ld_struggling', relationshipStatus: 'single' }, text: '你拼尽全力，但时间和距离赢了。分手那天你在电话里沉默了三分钟，最后说了声"保重"。有些爱，输给了两千公里。', rewards: { happiness: -15, wisdom: 10 } },
        { name: '各自安好', condition: { relationshipStatus: 'dating' }, text: '你们没有在一起，但也没有撕心裂肺。多年后在朋友圈看到TA有了新生活，你真心地点了个赞。爱过，不后悔。', rewards: { wisdom: 5 } }
      ],
      rewards: { happiness: 40, wisdom: 20, social: 10 },
      risk: { happiness: -20 }
    },
    
    second_chance: {
      name: '破镜重圆',
      icon: '🪞',
      description: '分开多年后，命运的齿轮又将你们转到一起',
      narrative: '分开五年了，你还是会在深夜翻到她的旧照片。你告诉自己早就放下了，可那座城市的名字一出现，心跳还是会漏一拍。命运说，你们的故事还没写完。',
      stages: [
        { age: 25, event: '你和曾经的恋人分手多年，偶尔还是会想起', trigger: { relationshipStatus: 'single', flag: 'had_love' } },
        { age: 32, event: '你们在一家咖啡馆意外重逢了', trigger: { random: 0.3, age_range: [30, 40] }, choices: ['上前打招呼', '假装没看见', '远远地看了一会儿就走了'] },
        { age: 34, event: '你们开始重新了解彼此，一切熟悉又陌生', trigger: { flag: 'reunited_ex' } },
        { age: 36, event: '你鼓起勇气重新求婚，这次你不再犹豫', trigger: { flag: 'rekindling' } },
        { age: 40, event: '第二次机会让你们更懂得珍惜，婚姻比想象中幸福', trigger: { flag: 'remarried' } }
      ],
      endings: [
        { name: '幸福复合', condition: { flag: 'remarried' }, text: '兜兜转转十年，你们终于又在一起了。这一次你不再说"如果"，每一个拥抱都比上一次更用力。命运给了第二次机会，你抓住了。', rewards: { happiness: 20, wisdom: 10 } },
        { name: '再次错过', condition: { flag_fail: 'reunited_ex', relationshipStatus: 'single' }, text: '重逢后你们尝试重新开始，但时间改变了一切。你们已经不是当年的彼此了。"回不去了"——这是你对自己说的最后一句话。', rewards: { wisdom: 10, happiness: -10 } },
        { name: '只做朋友', condition: { flag: 'reunited_ex', relationshipStatus: 'dating' }, text: '你们发现做朋友比做恋人更舒服。偶尔一起喝杯咖啡，聊聊过去和现在。没有遗憾，只是当初的心动变成了另一种温暖的陪伴。', rewards: { happiness: 5, wisdom: 5 } }
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
      endings: [
        { name: '金婚美满', condition: { flag: 'has_child', relationshipStatus: 'married' }, text: '六十年弹指一挥间，从童年的纸飞机到白发的牵手，你们一起走完了这辈子。金婚庆典上，你看着她，一如八岁初见。', rewards: { happiness: 25, wisdom: 15, social: 10 } },
        { name: '中年危机散伙', condition: { flag_fail: 'married', relationshipStatus: 'divorced' }, text: '四十岁那年你们吵了一架，把几十年的委屈全抖了出来。离婚协议签完后，你忽然想起十五岁那个秋天她递给你情书的样子。', rewards: { happiness: -20, wisdom: 10 } },
        { name: '一方早逝', condition: { flag: 'married', maxHealth: 30 }, text: 'TA走的那天你握着TA的手，从温热到冰凉。青梅竹马一辈子的感情，最后只剩你一个人在老房子里翻相册。但你从不后悔。', rewards: { wisdom: 20, happiness: -15, health: -10 } }
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
      narrative: '第一次走进福利院，你看到角落里那个安静画画的小女孩。她抬头看你一眼又低下头去，那个眼神让你心里某个地方被狠狠揪了一下。你知道，你想给她一个家。',
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
      narrative: '离婚那天你在法院门口抱紧孩子："以后就咱们两个人了。"你没有哭，因为你知道眼泪不能让奶粉钱多一毛。从今天起，你就是孩子全部的天。',
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
    },
    
    pet_parent: {
      name: '铲屎官',
      icon: '🐾',
      description: '从养宠到护生，用爱心温暖每一个小生命',
      narrative: '二十岁那年你在雨夜的垃圾桶旁听到一声微弱的喵叫。你蹲下来，一双湿漉漉的眼睛看着你。你把外套脱下来裹住它，从此你的生活里多了一个甩不掉的"麻烦精"。',
      stages: [
        { age: 20, event: '你收养了第一只流浪猫/狗，手足无措地学习喂养知识', trigger: { random: 0.35 } },
        { age: 25, event: '你在路边救了一条受伤的流浪狗，花了半个月工资给它做手术', trigger: { flag: 'adopted_first_pet' }, choices: ['全力救助，成立救助小组', '尽己所能，给一个家就好', '呼吁身边人一起参与'] },
        { age: 30, event: '你在郊区租了院子，开了自己的小型动物救助站', trigger: { flag: 'rescued_stray' } },
        { age: 35, event: '你的救助站影响了周围社区，越来越多人加入志愿队伍', trigger: { flag: 'opened_shelter', minSocial: 50 } },
        { age: 45, event: '你成为了当地知名的动物保护人士，推动了流浪动物绝育立法提案', trigger: { flag: 'community_impact', minSocial: 65 } }
      ],
      endings: [
        { name: '动保先锋', condition: { flag: 'community_impact', minSocial: 70 }, text: '你从救助一只猫开始，最终推动了城市流浪动物管理条例的出台。救助站的墙上挂着每一只被领养的动物的照片，那是你一生最骄傲的勋章。', rewards: { happiness: 15, social: 15, wisdom: 10 } },
        { name: '温暖铲屎官', condition: { flag: 'opened_shelter' }, text: '你的救助站不大，但很温馨。几十只猫狗在这里找到了新家。你说你不伟大，只是看到流浪动物的眼神就走不动路。这辈子有它们陪着，值了。', rewards: { happiness: 10, creativity: 5 } },
        { name: '爱而无力', condition: { flag_fail: 'adopted_first_pet', maxWealth: 25 }, text: '你想救更多，但自己的能力太有限了。房租、猫粮、疫苗……每一笔都是现实的重量。你把最后一只狗送了人，关了朋友圈里那个曾经的"救助日记"。', rewards: { happiness: -10, wisdom: 5 } }
      ],
      rewards: { happiness: 30, wisdom: 20, social: 20 },
      risk: { wealth: -15, health: -5 }
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
      narrative: '你无意间翻到那份文件时手在发抖。你知道一旦说出去，工作、房贷、安稳的生活可能都没了。可午夜梦回，你对镜子里的自己说：如果这次沉默了，以后还睡得着吗？',
      stages: [
        { age: 30, event: '你在工作中发现了公司的违法行为', trigger: { minIntelligence: 60, minWisdom: 50 } },
        { age: 31, event: '你内心挣扎了很久：举报还是沉默？', trigger: { flag: 'found_misconduct' }, choices: ['选择举报', '假装不知道', '先收集更多证据'] },
        { age: 32, event: '你被公司打击报复，丢了工作', trigger: { flag: 'whistleblower' } },
        { age: 34, event: '媒体曝光了此事，公众舆论站在你这边', trigger: { flag: 'lost_job_for_truth' } },
        { age: 36, event: '你的坚持推动了行业改革，成为了公众英雄', trigger: { flag: 'media_exposure' } },
        { age: 45, event: '你写了一本回忆录，激励了无数人', trigger: { flag: 'became_hero' } }
      ],
      endings: [
        { name: '正义得申', condition: { flag: 'became_hero', minSocial: 60 }, text: '你的举报推动了行业立法改革，成千上万的人因你受益。站在领奖台上，你平静地说："我只是做了每一个有良知的人都会做的事。"', rewards: { wisdom: 15, social: 15, happiness: 10 } },
        { name: '被报复消沉', condition: { flag_fail: 'whistleblower', maxSocial: 35 }, text: '你被行业封杀，没人敢用你。在出租屋里度过了最漫长的三年后，你终于在一个小城找到了普通的工作。你不再提当年的事。', rewards: { happiness: -15, wealth: -10, wisdom: 10 } },
        { name: '沉默的余生', condition: { flag: 'found_misconduct', maxWisdom: 40 }, text: '你最终选择了沉默。没有人来找你的麻烦，但每当听到那家公司又出了事故的新闻，你的良心就会隐隐作痛。这个秘密，你带进了坟墓。', rewards: { happiness: -10, wisdom: -5 } }
      ],
      rewards: { wisdom: 35, social: 25, happiness: 20 },
      risk: { wealth: -25, happiness: -15 }
    },
    
    hermit: {
      name: '归隐田园',
      icon: '🏞️',
      description: '厌倦了城市的喧嚣，回归自然的简单生活',
      hidden: true,
      narrative: '三十五岁那年你在深夜加班到胃疼，望着窗外永不熄灭的城市灯火，突然想起小时候外婆家门口那片稻田。你问自己：我到底在忙什么？',
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
      endings: [
        { name: '理财成功', condition: { flag: 'has_foundation', minWealth: 60 }, text: '你找了靠谱的理财顾问，钱生钱，还成立了慈善基金会。中奖改变的不是你的消费习惯，而是你对财富意义的理解。你用钱做了很多好事。', rewards: { wisdom: 15, happiness: 10, social: 10 } },
        { name: '挥霍一空', condition: { flag_fail: 'friends_for_money', maxWealth: 25 }, text: '豪车、名表、无底洞般的"朋友"借钱——三年之内你挥霍了大半奖金。等你清醒过来，发现银行账户和通讯录一样空。', rewards: { wealth: -15, wisdom: 10, happiness: -10 } },
        { name: '回归平淡', condition: { flag: 'won_lottery', maxWealth: 50 }, text: '你没有疯狂消费，也没有成立基金会。你还清了房贷，存了定期，继续上着班。同事都不知道你身家千万。你说：钱是底气，不是生活。', rewards: { happiness: 5, wisdom: 5 } }
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
      endings: [
        { name: '华丽逆袭', condition: { flag: 'comeback', minWealth: 60 }, text: '你不但站起来了，而且站得比以前更高。那些嘲笑过你的人如今对你毕恭毕敬。你用行动证明了：只要不死，终会出头。', rewards: { wealth: 15, happiness: 15, wisdom: 10 } },
        { name: '小富即安', condition: { flag: 'restarted' }, text: '你重新站稳了脚跟，虽然没有大富大贵，但日子过得踏实。经历了谷底，你比谁都懂：安稳也是一种了不起的成就。', rewards: { happiness: 10, wisdom: 5 } },
        { name: '一蹶不振', condition: { flag_fail: 'hit_bottom', maxWealth: 15 }, text: '你想过重新开始，但每次刚有点起色又被现实打回原形。几次挣扎后，你不再尝试了。人生的光慢慢暗了下去。', rewards: { happiness: -20, wealth: -10 } }
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
    },
    
    undercover: {
      name: '卧底经历',
      icon: '🕶️',
      description: '一个普通人被卷入暗流，用自己的方式守护正义',
      hidden: true,
      narrative: '二十五岁那年你偶然得知了一个秘密——一个足以让许多人陷入危险的信息。你本可以装作不知道，继续过你的普通日子。但你选择了最难的那条路。',
      stages: [
        { age: 25, event: '你偶然卷入了某个事件的调查中，无法脱身', trigger: { random: 0.01, minIntelligence: 60, minWisdom: 50 } },
        { age: 28, event: '你向有关部门提供了关键线索，但身份暴露的风险越来越大', trigger: { flag: 'drawn_into_case' }, choices: ['继续深入，配合调查', '急流勇退，保护自己', '匿名举报，保持距离'] },
        { age: 30, event: '你的信息帮助警方破获了一起大案，但你的生活已经回不去了', trigger: { flag: 'provided_lead' } },
        { age: 35, event: '你因为协助破案获得了官方嘉奖，但选择了低调行事', trigger: { flag: 'case_solved' } },
        { age: 40, event: '你回归了普通生活，那段经历被你深埋在心底', trigger: { flag: 'received_citation' } }
      ],
      endings: [
        { name: '无名英雄', condition: { flag: 'received_citation', minWisdom: 70 }, text: '你的名字从未出现在新闻里，但你知道自己做过什么。每当看到城市平安的灯火，你就觉得当年的选择值了。这个国家的安宁，有你的功劳。', rewards: { wisdom: 15, happiness: 10, social: 5 } },
        { name: '深藏功名', condition: { flag: 'case_solved' }, text: '你回归了普通人的日子，朝九晚五，买菜做饭。没人知道你的过去，你也从不提起。偶尔在新闻里看到类似的事件，你会心一笑，继续低头吃饭。', rewards: { happiness: 5, wisdom: 5 } },
        { name: '身份暴露', condition: { flag_fail: 'provided_lead', maxHealth: 35 }, text: '身份暴露后你不得不多次搬家，隐姓埋名。那段经历留下的不只是一枚嘉奖章，还有再也回不去的正常生活。每个深夜的敲门声都让你心惊。', rewards: { happiness: -15, health: -10, wisdom: 10 } }
      ],
      rewards: { wisdom: 25, social: 15, happiness: 15 },
      risk: { happiness: -15, health: -10, social: -10 }
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

// ─── 获取激活的故事线进度 ────────────────────────────────────────────
export function getActiveStoryLineProgress(character, storyState) {
  if (!character || !character._storyLines || character._storyLines.length === 0) return []
  if (!storyLines) return []

  const progressList = []

  for (const activeLine of character._storyLines) {
    const line = storyLines[activeLine.type] && storyLines[activeLine.type][activeLine.id]
    if (!line) continue

    const total = line.stages.length
    // 计算已完成阶段数：已触发 + 年龄超过该阶段的
    let completed = 0
    const completedStages = activeLine.completedStages || []
    for (let i = 0; i < line.stages.length; i++) {
      const stage = line.stages[i]
      // 已完成：在completedStages中，或年龄已超过该阶段年龄
      if (completedStages.indexOf(i) !== -1 || (character.age || 0) > stage.age) {
        completed++
      }
    }
    // 当前进行中的阶段
    const current = Math.min(completed + 1, total)
    const percentage = Math.min(100, Math.round((completed / total) * 100))

    progressList.push({
      name: line.name,
      icon: line.icon,
      type: activeLine.type,
      id: activeLine.id,
      current: current,
      total: total,
      percentage: percentage
    })
  }

  return progressList
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
