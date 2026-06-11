<template>
  <view class="container">
    <!-- 头部导航与精美双行行标 -->
    <view class="header">
      <text class="title">社交与情感中心</text>
      <text class="subtitle">在这个广阔世界中与你紧密相连的人们</text>
    </view>

    <!-- 高清摩登 Tab 切换器 -->
    <view class="tab-bar">
      <view class="tab-item" :class="{ active: currentTab === 'list' }" @click="switchTab('list')">
        <text class="tab-icon">👥</text>
        <text class="tab-text">人脉网</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 'match' }" @click="switchTab('match')">
        <text class="tab-icon">🎯</text>
        <text class="tab-text">相亲角</text>
        <text class="tab-badge" v-if="character.age >= 22 && !hasSpouse">新</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 'moments' }" @click="switchTab('moments')">
        <text class="tab-icon">📱</text>
        <text class="tab-text">朋友圈</text>
        <text class="tab-badgedot" v-if="moments.length > 0 && !hasReadMoments"></text>
      </view>
    </view>

    <!-- ─────────────────── TAB 1: 人脉关系网 ─────────────────── -->
    <view v-if="currentTab === 'list'" class="tab-content fade-in">
      <view class="stat-summary">
        <view class="stat-item">
          <text class="stat-num">{{ relationships.length }}</text>
          <text class="stat-label">总认识人数</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">{{ activeCount }}</text>
          <text class="stat-label">常有来往</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">{{ avgAffection }}</text>
          <text class="stat-label">平均好感度</text>
        </view>
      </view>

      <view class="relationships-list">
        <view v-for="npc in displayRelationships" :key="npc.id" class="npc-card">
          <view class="npc-header">
            <text class="npc-icon">{{ getNpcIcon(npc) }}</text>
            <view class="npc-info">
              <view class="npc-name-row">
                <text class="npc-name">{{ npc.name }}</text>
                <view class="npc-status-dot" :class="'status-' + getNpcStatusType(npc)"></view>
              </view>
              <text class="npc-meta">{{ npc.gender === "男" ? "♂ 绅士" : "♀ 淑女" }} · {{ getRelationName(npc) }}</text>
              <text class="npc-duration" v-if="npc.appearAge">认识于{{ npc.appearAge }}岁 · 已相识{{ getRelationYears(npc) }}年</text>
            </view>
            <text class="npc-status-text" v-if="npc.status !== 'alive'">{{ npc.status === 'dead' ? '💀 已故' : (npc.status === 'left' ? '🛫 已离开' : '💔 疏远') }}</text>
            <text class="npc-level" :style="{ color: getRelationColor(npc) }">{{ getRelationLevelName(npc) }}</text>
          </view>

          <!-- 亲密、尊重、信任三维能量条 -->
          <view class="npc-stats">
            <view class="stat-row">
              <text class="stat-label">好感度</text>
              <view class="stat-bar-wrap">
                <view class="stat-fill affection" :style="{ width: npc.affection + '%' }"></view>
              </view>
              <text class="stat-val">{{ npc.affection }}</text>
              <text class="affection-trend" :class="{ up: getAffectionTrend(npc) > 0, down: getAffectionTrend(npc) < 0 }">{{ getAffectionTrend(npc) > 0 ? '↑' : getAffectionTrend(npc) < 0 ? '↓' : '' }}</text>
            </view>
            <view class="stat-row">
              <text class="stat-label">信任感</text>
              <view class="stat-bar-wrap">
                <view class="stat-fill trust" :style="{ width: npc.trust + '%' }"></view>
              </view>
              <text class="stat-val">{{ npc.trust }}</text>
            </view>
            <view class="stat-row">
              <text class="stat-label">敬佩感</text>
              <view class="stat-bar-wrap">
                <view class="stat-fill respect" :style="{ width: npc.respect + '%' }"></view>
              </view>
              <text class="stat-val">{{ npc.respect }}</text>
            </view>
          </view>

          <!-- 共同回忆 -->
          <view class="npc-memories" v-if="npc.memories && npc.memories.length">
            <text class="memories-title">共同经历</text>
            <view v-for="(mem, idx) in npc.memories.slice(-3)" :key="idx" class="memory-item">
              <text class="memory-age">{{ mem.age }}岁</text>
              <text class="memory-text">{{ mem.text }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-if="!displayRelationships.length" class="empty">
        <view class="empty-illustration">
          <text class="empty-illust-bg">🌌</text>
          <text class="empty-illust-icon">👤</text>
        </view>
        <text class="empty-text">还没有和任何人建立关系</text>
        <text class="empty-hint">继续度过人生，你会慢慢结交各类有趣的人士。</text>
        <view class="empty-tips">
          <text class="tip-line">💡 多参与社交活动可结识新朋友</text>
          <text class="tip-line">💡 关注相亲角也许能遇到命中注定的人</text>
          <text class="tip-line">💡 维护好感度需要经常互动</text>
        </view>
      </view>
    </view>

    <!-- ─────────────────── TAB 2: 相亲市场 ─────────────────── -->
    <view v-if="currentTab === 'match'" class="tab-content fade-in">
      <!-- 开启相亲市场的限制 -->
      <view v-if="character.age < 22" class="match-locked">
        <text class="locked-icon">🔒</text>
        <text class="locked-title">尚未到达适婚年龄</text>
        <text class="locked-desc">根据地方风俗，本市的高端相亲市场只对年满 22 岁及以上的高素质单身男女青年开放，请先专心积累学业或事业吧。</text>
      </view>
      <view v-else-if="hasSpouse" class="match-locked">
        <text class="locked-icon">💍</text>
        <text class="locked-title">你已有合法伴侣</text>
        <text class="locked-desc">执子之手，与子偕老。你已拥有深爱你的伴侣，相亲市场大门已为你幸福地关闭。</text>
      </view>
      <view v-else class="match-active">
        <view class="match-intro">
          <text class="intro-title">✨ 缘分一网打尽</text>
          <text class="intro-desc">红娘系统已为您量身匹配本年度的 3 位优质异性嘉宾。点击相亲将扣除少许请客费用，并触发专属浪漫场景博弈，成功确立恋爱好感将正式转为正式恋人！</text>
        </view>

        <view class="guests-grid">
          <view v-for="guest in matchmakingGuests" :key="guest.id" class="guest-card">
            <view class="guest-avatar-wrap">
              <text class="guest-avatar">{{ guest.avatar }}</text>
              <view class="match-score-badge">速配度 {{ guest.score }}%</view>
            </view>
            <view class="guest-details">
              <text class="guest-name">{{ guest.name }}</text>
              <text class="guest-job">💼 职业：{{ guest.job }} · {{ guest.gender }}</text>
              <text class="guest-desc">{{ guest.desc }}</text>
              
              <!-- 性格特质展示 -->
              <view class="guest-traits">
                <text v-for="t in guest.traits" :key="t.id" class="trait-tag">{{ t.icon }} {{ t.name }}</text>
              </view>

              <!-- 发起约会按钮 -->
              <view class="date-btn" @click="startMatchmakingDate(guest)">
                <text class="date-btn-text">🌹 发起心动邀约 (花销 {{ guest.cost }} 万)</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- ─────────────────── TAB 3: 动态朋友圈 ─────────────────── -->
    <view v-if="currentTab === 'moments'" class="tab-content fade-in">
      <view class="moments-timeline" v-if="moments.length > 0">
        <view v-for="moment in moments" :key="moment.id" class="moment-card">
          <view class="moment-user">
            <!-- 仿微信圆形渐变头像 -->
            <view class="mom-avatar" :style="{ background: getRandomGradient(moment.npcName) }">
              {{ moment.npcName.charAt(0) }}
            </view>
            <view class="mom-user-info">
              <text class="mom-name">{{ moment.npcName }}</text>
              <text class="mom-role">{{ getRoleTagText(moment.npcRole) }}</text>
            </view>
            <text class="mom-time">{{ moment.time }}</text>
          </view>

          <text class="moment-text">{{ moment.text }}</text>

          <!-- 朋友圈交互栏 -->
          <view class="moment-actions">
            <!-- 点赞按钮 -->
            <view class="action-item" :class="{ liked: moment.liked }" @click="toggleLike(moment)">
              <text class="action-icon">{{ moment.liked ? '❤️' : '🤍' }}</text>
              <text class="action-text">{{ moment.liked ? '已点赞' : '点赞' }}</text>
            </view>
            <!-- 评论按钮 -->
            <view class="action-item" @click="openCommentChoices(moment)">
              <text class="action-icon">💬</text>
              <text class="action-text">神评博弈</text>
            </view>
          </view>

          <!-- 朋友圈下方的互动评论展示区 -->
          <view class="moment-feedback" v-if="moment.liked || moment.commented">
            <view class="feedback-likes" v-if="moment.liked">
              <text class="like-heart">❤️</text>
              <text class="like-users">你 觉得很赞</text>
            </view>
            <view class="feedback-comment" v-if="moment.commented">
              <text class="comment-user">我：</text>
              <text class="comment-text">{{ moment.commented }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="empty">
        <text class="empty-icon">📱</text>
        <text class="empty-text">朋友圈空空如也</text>
        <text class="empty-hint">当前没有活跃关系发布动态。今年多去结识新朋友吧！</text>
      </view>
    </view>

    <!-- 约会情境弹窗 -->
    <view class="modal-mask" v-if="showDateModal && currentDate">
      <view class="modal-box glassmorphism">
        <view class="modal-header">
          <text class="modal-title">💞 心动相亲约会</text>
        </view>
        <scroll-view scroll-y class="modal-body">
          <text class="date-scenario">{{ currentDate.text }}</text>
        </scroll-view>
        <view class="modal-options">
          <view v-for="(choice, idx) in currentDate.choices" :key="idx" class="modal-option" @click="selectDateChoice(choice)">
            <text class="choice-text">{{ choice.text }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 朋友圈神评选项弹窗 -->
    <view class="modal-mask" v-if="showCommentModal && currentMoment">
      <view class="modal-box glassmorphism">
        <view class="modal-header">
          <text class="modal-title">💬 朋友圈高商神评</text>
        </view>
        <view class="scenario-bubble">
          <text class="scenario-user">{{ currentMoment.npcName }} 的朋友圈：</text>
          <text class="scenario-content">“{{ currentMoment.text }}”</text>
        </view>
        <scroll-view scroll-y class="modal-options">
          <view v-for="(comment, idx) in currentMoment.comments" :key="idx" class="modal-option" @click="selectCommentChoice(comment)">
            <text class="choice-text">{{ comment.text }}</text>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { getActiveRelationships, getRelationLevel } from "@/utils/relationships.js"
import { generateMatchmakingGuests, matchmakingDates, generateMoments } from "@/utils/relationshipCircleData.js"

export default {
  data() {
    return {
      currentTab: 'list',
      relationships: [],
      character: {},
      matchmakingGuests: [],
      moments: [],
      hasReadMoments: false,
      
      // 弹窗控制
      showDateModal: false,
      currentDate: null,
      currentDateGuest: null,
      
      showCommentModal: false,
      currentMoment: null
    }
  },
  computed: {
    displayRelationships() {
      return getActiveRelationships ? getActiveRelationships(this.relationships, 20) : this.relationships
    },
    activeCount() {
      return this.relationships.filter(n => n.isActive && n.status === "alive" && n.affection > 5).length
    },
    avgAffection() {
      const active = this.relationships.filter(n => n.isActive && n.status === "alive")
      if (!active.length) return 0
      const sum = active.reduce((s, n) => s + (n.affection || 0), 0)
      return Math.round(sum / active.length)
    },
    hasSpouse() {
      // 检查是否有配偶关系
      return this.relationships.some(n => n.relation === 'spouse' || n.role === 'partner' && n.status === 'alive' && n.affection >= 85)
    }
  },
  onLoad() {
    this.loadGameData()
  },
  methods: {
    loadGameData() {
      this.character = uni.getStorageSync("currentCharacter") || {}
      this.relationships = uni.getStorageSync("relationships") || []
      
      // 记录上一次好感度用于趋势对比
      for (let i = 0; i < this.relationships.length; i++) {
        if (this.relationships[i]._lastAffection == null) {
          this.relationships[i]._lastAffection = this.relationships[i].affection || 0
        }
      }
      
      // 惰性加载相亲和朋友圈
      this.loadMatchmaking()
      this.loadMoments()
    },
    loadMatchmaking() {
      const age = this.character.age || 0
      let guests = uni.getStorageSync('matchmakingGuests')
      // 如果没有，或者已经不是今年生成的相亲名单
      if (!guests || uni.getStorageSync('matchmakingAge') !== age) {
        guests = generateMatchmakingGuests(this.character)
        uni.setStorageSync('matchmakingGuests', guests)
        uni.setStorageSync('matchmakingAge', age)
      }
      this.matchmakingGuests = guests
    },
    loadMoments() {
      const age = this.character.age || 0
      let list = uni.getStorageSync('moments')
      if (!list || uni.getStorageSync('momentsAge') !== age) {
        list = generateMoments(this.relationships, this.character)
        uni.setStorageSync('moments', list)
        uni.setStorageSync('momentsAge', age)
      }
      this.moments = list
    },
    switchTab(tab) {
      this.currentTab = tab
      if (tab === 'moments') {
        this.hasReadMoments = true
      }
    },
    getNpcIcon(npc) {
      const level = getRelationLevel ? getRelationLevel(npc) : null
      return level ? level.icon : "👤"
    },
    getRelationName(npc) {
      var map = {
        father: '父亲', mother: '母亲', brother: '兄弟', sister: '姐妹',
        childhood_friend: '发小', classmate: '同学', teacher: '教师',
        colleague: '同事', boss: '上司', mentor: '贵人', rival: '宿敌',
        partner: '伴侣', lover: '恋人', spouse: '配偶', neighbor: '邻居'
      }
      return map[npc.role] || npc.relation || '朋友'
    },
    getRelationLevelName(npc) {
      const level = getRelationLevel ? getRelationLevel(npc) : null
      return level ? level.name : "陌生人"
    },
    getRelationColor(npc) {
      const level = getRelationLevel ? getRelationLevel(npc) : null
      return level ? level.color : "#666"
    },
    getNpcStatusType(npc) {
      if (!npc || npc.status === 'dead' || npc.status === 'left') return 'left'
      if (npc.status === 'estranged' || npc.affection < 10) return 'estranged'
      return 'active'
    },
    getRelationYears(npc) {
      if (!npc || !npc.appearAge) return 0
      return (this.character.age || 0) - npc.appearAge
    },
    getAffectionTrend(npc) {
      if (!npc) return 0
      const prev = npc._lastAffection
      const curr = npc.affection || 0
      if (prev == null) return 0
      if (curr > prev + 2) return 1
      if (curr < prev - 2) return -1
      return 0
    },
    getRandomGradient(name) {
      // 通过名字生成唯一的渐变色
      const colors = [
        'linear-gradient(135deg, #fbc2eb 0%, #a18cd1 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
      ]
      let sum = 0
      for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i)
      }
      return colors[sum % colors.length]
    },
    getRoleTagText(role) {
      var map = {
        father: '家属 · 父亲', mother: '家属 · 母亲',
        partner: '契约 · 伴侣', spouse: '契约 · 配偶',
        boss: '职场 · 上司', rival: '生平 · 宿敌',
        ex: '过往 · 前任'
      }
      return map[role] || '关系 · 朋友'
    },
    
    // ─── 点赞与神评交互 ───────────────────────────────────────
    
    toggleLike(moment) {
      if (moment.liked) return
      moment.liked = true
      
      // 点赞对亲密度有小幅加成 (+3)
      const npcIdx = this.relationships.findIndex(n => n.id === moment.npcId)
      if (npcIdx >= 0) {
        this.relationships[npcIdx].affection = Math.min(100, (this.relationships[npcIdx].affection || 50) + 3)
        uni.setStorageSync('relationships', this.relationships)
        
        // 界面轻飘浮效果
        uni.showToast({
          title: `${moment.npcName} 好感度 +3!`,
          icon: 'none'
        })
      }
      // 同步 moments 状态
      uni.setStorageSync('moments', this.moments)
    },
    openCommentChoices(moment) {
      if (moment.commented) {
        uni.showToast({ title: '你已经评价过这条朋友圈了。', icon: 'none' })
        return
      }
      this.currentMoment = moment
      this.showCommentModal = true
    },
    selectCommentChoice(comment) {
      this.showCommentModal = false
      this.currentMoment.commented = comment.text
      
      // 应用评论效果
      const npcIdx = this.relationships.findIndex(n => n.id === this.currentMoment.npcId)
      if (npcIdx >= 0) {
        // 增减好感
        const aDelta = comment.affectionDelta || 0
        this.relationships[npcIdx].affection = Math.max(0, Math.min(100, (this.relationships[npcIdx].affection || 50) + aDelta))
        uni.setStorageSync('relationships', this.relationships)
        
        // 影响角色基本属性（如幸福、压力、智慧）
        if (comment.happiness) {
          this.character.happiness = Math.max(0, Math.min(100, (this.character.happiness || 50) + comment.happiness))
        }
        if (comment.wisdom) {
          this.character.wisdom = Math.max(0, Math.min(100, (this.character.wisdom || 50) + comment.wisdom))
        }
        if (comment.social) {
          this.character.social = Math.max(0, Math.min(100, (this.character.social || 50) + comment.social))
        }
        if (comment.stress) {
          // 由于原引擎中没有专门的压力属性，我们可以换算为折损健康/减少幸福
          this.character.happiness = Math.max(0, Math.min(100, (this.character.happiness || 50) - Math.round(comment.stress / 2)))
        }
        uni.setStorageSync('currentCharacter', this.character)
        
        // 历史轨迹里记录神评
        const history = uni.getStorageSync('lifeHistory') || []
        const logText = `📱 朋友圈神评：在【${this.currentMoment.npcName}】朋友圈评论了【${comment.text}】`
        history.push({ age: this.character.age, text: logText, effect: {} })
        uni.setStorageSync('lifeHistory', history)
        
        uni.showToast({
          title: `好感度已结算！`,
          icon: 'none'
        })
      }
      uni.setStorageSync('moments', this.moments)
      this.currentMoment = null
    },
    
    // ─── 相亲角交互 ───────────────────────────────────────────
    
    startMatchmakingDate(guest) {
      if ((this.character.wealth || 0) < guest.cost) {
        uni.showModal({
          title: '余额不足',
          content: `本次相亲邀约花销为 ${guest.cost} 万元，您的财富储备不足，请努力工作攒钱！`,
          showCancel: false
        })
        return
      }
      
      const scenario = matchmakingDates[guest.role]
      if (scenario) {
        this.currentDate = scenario
        this.currentDateGuest = guest
        this.showDateModal = true
      }
    },
    selectDateChoice(choice) {
      this.showDateModal = false
      const guest = this.currentDateGuest
      const wealthCost = Math.abs(choice.effect.wealth || guest.cost)
      
      // 1. 扣除花销
      this.character.wealth = Math.max(0, (this.character.wealth || 50) - wealthCost)
      
      // 2. 结算约会中角色属性增益
      if (choice.effect.intelligence) {
        this.character.intelligence = Math.min(100, (this.character.intelligence || 50) + choice.effect.intelligence)
      }
      if (choice.effect.wisdom) {
        this.character.wisdom = Math.min(100, (this.character.wisdom || 50) + choice.effect.wisdom)
      }
      if (choice.effect.creativity) {
        this.character.creativity = Math.min(100, (this.character.creativity || 50) + choice.effect.creativity)
      }
      if (choice.effect.social) {
        this.character.social = Math.min(100, (this.character.social || 50) + choice.effect.social)
      }
      uni.setStorageSync('currentCharacter', this.character)
      
      // 3. 结算相亲好感
      const finalIntimacy = choice.affectionDelta || 20
      
      // 4. 约会成功或失败的轨迹记录
      const history = uni.getStorageSync('lifeHistory') || []
      
      if (finalIntimacy >= 20) {
        // 成功结为恋人！
        const newPartner = {
          id: `npc_partner_${Date.now()}`,
          role: 'partner',
          name: guest.name,
          gender: guest.gender,
          age: guest.age || this.character.age,
          relation: 'lover',
          affection: finalIntimacy + 30, // 初始好感度爆表
          trust: 50,
          respect: 50,
          status: 'alive',
          appearAge: this.character.age,
          canDie: true,
          canLeave: true,
          memories: [{ age: this.character.age, text: '相亲一见钟情，正式结为恋人！' }],
          isActive: true
        }
        this.relationships.push(newPartner)
        uni.setStorageSync('relationships', this.relationships)
        
        // 改变故事婚姻状态
        const storyState = uni.getStorageSync('storyState') || {}
        if (!storyState.relationship) storyState.relationship = { status: 'single' }
        storyState.relationship.status = 'dating'
        storyState.relationship.partnerName = guest.name
        uni.setStorageSync('storyState', storyState)
        
        // 记录历史
        const succText = `💘 相亲大成功！你与【${guest.name}】（职业：${guest.job}）在相亲中相谈甚欢，在月色浪漫下正式结为恋人！【${choice.followUp}】`
        history.push({ age: this.character.age, text: succText, effect: {} })
        
        // 从当年的相亲列表中移除
        this.matchmakingGuests = this.matchmakingGuests.filter(g => g.id !== guest.id)
        uni.setStorageSync('matchmakingGuests', this.matchmakingGuests)
        
        uni.showModal({
          title: '相亲喜报',
          content: `恭喜！你成功牵手了【${guest.name}】，TA已加入你的人脉关系网！`,
          showCancel: false
        })
      } else {
        // 约会失败
        const failText = `❌ 相亲失败：你与【${guest.name}】进行了约会，但因理念不合一拍两散。钱打水漂了！【${choice.followUp}】`
        history.push({ age: this.character.age, text: failText, effect: {} })
        
        uni.showToast({
          title: '相亲无缘，一拍两散',
          icon: 'none'
        })
      }
      
      uni.setStorageSync('lifeHistory', history)
      this.currentDate = null
      this.currentDateGuest = null
    }
  }
}
</script>

<style>
.container {
  padding: 24rpx;
  min-height: 100vh;
  background: linear-gradient(180deg, #100b26, #211c47, #131030);
  color: #e0e0ff;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 24rpx;
  padding-top: 10rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  background: linear-gradient(90deg, #fbc2eb, #a18cd1, #ff9a9e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  letter-spacing: 4rpx;
}

.subtitle {
  font-size: 24rpx;
  color: #8980b3;
  display: block;
  margin-top: 6rpx;
}

/* 摩登 Tab 切换器 */
.tab-bar {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 30rpx;
  padding: 8rpx;
  margin-bottom: 30rpx;
  border: 1rpx solid rgba(161, 140, 209, 0.15);
  backdrop-filter: blur(10px);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16rpx 0;
  border-radius: 24rpx;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-item.active {
  background: linear-gradient(135deg, rgba(161, 140, 209, 0.4), rgba(251, 194, 235, 0.3));
  border: 1rpx solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.2);
}

.tab-icon {
  font-size: 36rpx;
  margin-bottom: 4rpx;
}

.tab-text {
  font-size: 22rpx;
  color: #a097cc;
  font-weight: bold;
}

.tab-item.active .tab-text {
  color: #ffffff;
}

.tab-badge {
  position: absolute;
  top: 6rpx;
  right: 20rpx;
  background: #ff4d4f;
  color: #ffffff;
  font-size: 16rpx;
  padding: 2rpx 8rpx;
  border-radius: 10rpx;
  font-weight: bold;
}

.tab-badgedot {
  position: absolute;
  top: 12rpx;
  right: 32rpx;
  width: 12rpx;
  height: 12rpx;
  background: #ff4d4f;
  border-radius: 50%;
}

/* Tab 1 关系列表样式 */
.stat-summary {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 24rpx;
  padding: 24rpx 16rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.06);
}

.stat-item {
  text-align: center;
}

.stat-num {
  font-size: 38rpx;
  font-weight: bold;
  color: #fbc2eb;
  display: block;
}

.stat-label {
  font-size: 20rpx;
  color: #8888aa;
  display: block;
  margin-top: 4rpx;
}

.relationships-list {
  margin-bottom: 40rpx;
}

.npc-card {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.05);
}

.npc-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.npc-icon {
  font-size: 44rpx;
  margin-right: 16rpx;
}

.npc-info {
  flex: 1;
}

.npc-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #e0e0ff;
  display: block;
}

.npc-meta {
  font-size: 20rpx;
  color: #8a80b8;
  display: block;
  margin-top: 4rpx;
}

.npc-status {
  font-size: 20rpx;
  color: #ff6b6b;
  margin-left: 12rpx;
  background: rgba(255,107,107,0.1);
  padding: 2rpx 8rpx;
  border-radius: 6rpx;
}

.npc-level {
  font-size: 22rpx;
  font-weight: bold;
  margin-left: 12rpx;
}

.npc-stats {
  margin: 16rpx 0;
}

.stat-row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.stat-label {
  width: 80rpx;
  font-size: 20rpx;
  color: #8a80b8;
}

.stat-bar-wrap {
  flex: 1;
  height: 8rpx;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4rpx;
  overflow: hidden;
  margin: 0 12rpx;
}

.stat-fill {
  height: 100%;
  border-radius: 4rpx;
  transition: width 0.5s ease;
}

.affection {
  background: linear-gradient(90deg, #ff9a9e, #fecfef);
}

.trust {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
}

.respect {
  background: linear-gradient(90deg, #a18cd1, #fbc2eb);
}

.stat-val {
  width: 40rpx;
  font-size: 18rpx;
  color: #aaaacc;
  text-align: right;
}

.npc-memories {
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.06);
}

.memories-title {
  font-size: 20rpx;
  color: #8a80b8;
  display: block;
  margin-bottom: 8rpx;
}

.memory-item {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
  padding: 6rpx 10rpx;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8rpx;
}

.memory-age {
  font-size: 18rpx;
  color: #fbc2eb;
  margin-right: 12rpx;
  white-space: nowrap;
}

.memory-text {
  font-size: 22rpx;
  color: #ccccee;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Tab 2 相亲市场样式 */
.match-locked {
  text-align: center;
  padding: 100rpx 40rpx;
  background: rgba(255,255,255,0.03);
  border-radius: 30rpx;
  border: 1rpx solid rgba(255,255,255,0.05);
}

.locked-icon {
  font-size: 72rpx;
  display: block;
  margin-bottom: 24rpx;
}

.locked-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #e0e0ff;
  display: block;
  margin-bottom: 12rpx;
}

.locked-desc {
  font-size: 24rpx;
  color: #8a80b8;
  line-height: 1.6;
  display: block;
}

.match-intro {
  background: linear-gradient(135deg, rgba(161,140,209,0.1), rgba(251,194,235,0.05));
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 30rpx;
  border: 1rpx solid rgba(255,255,255,0.06);
}

.intro-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #fbc2eb;
  display: block;
  margin-bottom: 8rpx;
}

.intro-desc {
  font-size: 22rpx;
  color: #aaaacc;
  line-height: 1.6;
  display: block;
}

.guests-grid {
  display: flex;
  flex-direction: column;
}

.guest-card {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 28rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.05);
}

.guest-avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24rpx;
}

.guest-avatar {
  font-size: 80rpx;
  background: rgba(255, 255, 255, 0.06);
  width: 120rpx;
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
  border-radius: 30rpx;
  border: 1rpx solid rgba(255,255,255,0.1);
}

.match-score-badge {
  background: linear-gradient(90deg, #ff9a9e, #fda085);
  color: #ffffff;
  font-size: 16rpx;
  font-weight: bold;
  padding: 4rpx 10rpx;
  border-radius: 12rpx;
  margin-top: 16rpx;
  white-space: nowrap;
}

.guest-details {
  flex: 1;
}

.guest-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 4rpx;
}

.guest-job {
  font-size: 22rpx;
  color: #fbc2eb;
  display: block;
  margin-bottom: 12rpx;
}

.guest-desc {
  font-size: 22rpx;
  color: #aaaacc;
  line-height: 1.6;
  display: block;
  margin-bottom: 16rpx;
}

.guest-traits {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20rpx;
}

.trait-tag {
  font-size: 18rpx;
  background: rgba(255,255,255,0.06);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  margin-right: 8rpx;
  margin-bottom: 8rpx;
  color: #e0e0ff;
  border: 1rpx solid rgba(255,255,255,0.05);
}

.date-btn {
  background: linear-gradient(90deg, #a18cd1, #fbc2eb);
  border-radius: 20rpx;
  padding: 16rpx 0;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(161,140,209,0.3);
  transition: all 0.3s;
}

.date-btn:active {
  transform: scale(0.97);
  opacity: 0.9;
}

.date-btn-text {
  font-size: 22rpx;
  font-weight: bold;
  color: #ffffff;
}

/* Tab 3 朋友圈样式 */
.moments-timeline {
  display: flex;
  flex-direction: column;
}

.moment-card {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 28rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.05);
}

.moment-user {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.mom-avatar {
  width: 76rpx;
  height: 76rpx;
  line-height: 76rpx;
  text-align: center;
  border-radius: 50%;
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
  margin-right: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
}

.mom-user-info {
  flex: 1;
}

.mom-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
}

.mom-role {
  font-size: 18rpx;
  color: #fbc2eb;
  display: block;
  margin-top: 2rpx;
}

.mom-time {
  font-size: 20rpx;
  color: #666688;
}

.moment-text {
  font-size: 26rpx;
  color: #ddddf7;
  line-height: 1.6;
  margin-bottom: 20rpx;
  padding-left: 92rpx;
  display: block;
}

.moment-actions {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 12rpx;
  border-bottom: 1rpx solid rgba(255,255,255,0.05);
  margin-bottom: 12rpx;
}

.action-item {
  display: flex;
  align-items: center;
  margin-left: 32rpx;
  padding: 6rpx 16rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12rpx;
}

.action-icon {
  font-size: 26rpx;
  margin-right: 6rpx;
}

.action-text {
  font-size: 20rpx;
  color: #aaaacc;
}

.action-item.liked .action-text {
  color: #ff9a9e;
  font-weight: bold;
}

/* 朋友圈下方互动展示区 */
.moment-feedback {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 16rpx;
  padding: 16rpx;
  margin-left: 92rpx;
}

.feedback-likes {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.like-heart {
  font-size: 22rpx;
  margin-right: 8rpx;
}

.like-users {
  font-size: 22rpx;
  color: #ff9a9e;
  font-weight: bold;
}

.feedback-comment {
  font-size: 22rpx;
  line-height: 1.5;
  border-top: 1rpx solid rgba(255,255,255,0.05);
  padding-top: 8rpx;
  margin-top: 8rpx;
}

.comment-user {
  color: #fbc2eb;
  font-weight: bold;
}

.comment-text {
  color: #ccccee;
}

/* 玻璃模态弹窗 mask */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
}

.modal-box.glassmorphism {
  background: rgba(30, 25, 60, 0.85);
  border: 1rpx solid rgba(255,255,255,0.15);
  border-radius: 40rpx;
  width: 620rpx;
  max-height: 75vh;
  display: flex;
  flex-direction: column;
  padding: 30rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.4);
}

.modal-header {
  text-align: center;
  margin-bottom: 24rpx;
}

.modal-title {
  font-size: 32rpx;
  font-weight: bold;
  background: linear-gradient(90deg, #ff9a9e, #fecfef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-body {
  flex: 1;
  margin-bottom: 30rpx;
}

.date-scenario {
  font-size: 26rpx;
  color: #ddddf7;
  line-height: 1.6;
}

.scenario-bubble {
  background: rgba(0,0,0,0.25);
  border-radius: 20rpx;
  padding: 16rpx;
  margin-bottom: 24rpx;
  border-left: 6rpx solid #a18cd1;
}

.scenario-user {
  font-size: 22rpx;
  font-weight: bold;
  color: #fbc2eb;
  display: block;
}

.scenario-content {
  font-size: 24rpx;
  color: #ccccee;
  margin-top: 4rpx;
  display: block;
}

.modal-options {
  display: flex;
  flex-direction: column;
}

.modal-option {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 20rpx;
  padding: 20rpx 16rpx;
  text-align: center;
  margin-bottom: 16rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s;
}

.modal-option:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.12);
}

.choice-text {
  font-size: 24rpx;
  color: #ffffff;
  line-height: 1.4;
}

/* 空状态 */
.empty {
  text-align: center;
  padding: 120rpx 0;
}

.empty-icon {
  font-size: 80rpx;
  display: block;
  margin-bottom: 24rpx;
  opacity: 0.5;
}

.empty-text {
  font-size: 32rpx;
  color: #8888aa;
  display: block;
  margin-bottom: 12rpx;
}

.empty-hint {
  font-size: 26rpx;
  color: #666688;
  display: block;
}

/* 淡入动画 */
.fade-in {
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ═══ NPC 名字行 + 状态点 ═══ */
.npc-name-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.npc-status-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.npc-status-dot.status-active {
  background: #4ade80;
  box-shadow: 0 0 8rpx rgba(74, 222, 128, 0.5);
}

.npc-status-dot.status-estranged {
  background: #fbbf24;
  box-shadow: 0 0 8rpx rgba(251, 191, 36, 0.4);
}

.npc-status-dot.status-left {
  background: rgba(255, 255, 255, 0.25);
}

/* ═══ 关系持续年数 ═══ */
.npc-duration {
  font-size: 18rpx;
  color: #6b6b8a;
  display: block;
  margin-top: 2rpx;
}

/* ═══ 好感度趋势箭头 ═══ */
.affection-trend {
  font-size: 22rpx;
  font-weight: 700;
  width: 24rpx;
  text-align: center;
  flex-shrink: 0;
}

.affection-trend.up {
  color: #4ade80;
  animation: trendUpBounce 0.4s ease-out;
}

.affection-trend.down {
  color: #f87171;
  animation: trendDownBounce 0.4s ease-out;
}

@keyframes trendUpBounce {
  0% { transform: translateY(4rpx); opacity: 0; }
  60% { transform: translateY(-6rpx); }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes trendDownBounce {
  0% { transform: translateY(-4rpx); opacity: 0; }
  60% { transform: translateY(6rpx); }
  100% { transform: translateY(0); opacity: 1; }
}

/* ═══ 增强空状态 ═══ */
.empty-illustration {
  position: relative;
  width: 240rpx;
  height: 240rpx;
  margin: 0 auto 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-illust-bg {
  position: absolute;
  font-size: 180rpx;
  opacity: 0.15;
  animation: emptyFloat 3s ease-in-out infinite;
}

.empty-illust-icon {
  font-size: 80rpx;
  opacity: 0.5;
}

@keyframes emptyFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10rpx) scale(1.05); }
}

.empty-tips {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.tip-line {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.25);
  text-align: center;
}

/* ═══ NPC 状态文字标签 ═══ */
.npc-status-text {
  font-size: 18rpx;
  color: #ff6b6b;
  margin-left: 8rpx;
  background: rgba(255, 107, 107, 0.1);
  padding: 2rpx 8rpx;
  border-radius: 6rpx;
}
</style>
