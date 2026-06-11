<template>
  <view class="container">
    <view class="bg-overlay"></view>
    
    <view class="ending-header">
      <view class="candle-wrap">
        <text class="candle-icon">🕯️</text>
        <view class="candle-glow"></view>
      </view>
      <text class="ending-title">人生终章</text>
      <text class="ending-name">{{ character.name }}</text>
      <text class="ending-years">{{ birthYear }}年 — 2026年</text>
    </view>

    <view class="score-section">
      <view class="score-ring">
        <view class="score-inner">
          <text class="score-number">{{ summary.score }}</text>
          <text class="score-label">人生评分</text>
        </view>
      </view>
      <view class="rating-wrap">
        <text class="rating-text">{{ summary.rating }}</text>
        <text class="rating-sub">的一生</text>
      </view>
    </view>

    <!-- 🏆独特结局卡片 -->
    <view class="ending-card" v-if="endingResult" :class="endingResult.rarity">
      <view class="ending-card-header">
        <text class="ending-card-icon">{{ endingResult.icon }}</text>
        <view class="ending-card-title-wrap">
          <text class="ending-card-name">{{ endingResult.name }}</text>
          <text class="ending-card-rarity" :style="{ color: endingRarity[endingResult.rarity] && endingRarity[endingResult.rarity].color }">
            {{ (endingRarity[endingResult.rarity] && endingRarity[endingResult.rarity].name) || '' }}
          </text>
        </view>
      </view>
      <text class="ending-card-desc">{{ endingResult.description }}</text>
      <view class="ending-card-epitaph">
        <text class="epitaph-text">「{{ endingResult.epitaph }}」</text>
      </view>
      <!-- 天赋回顾 -->
      <view class="ending-talents" v-if="character._talents && character._talents.length > 0">
        <text class="ending-talents-label">天生特质</text>
        <view class="ending-talents-list">
          <text v-for="t in character._talents" :key="t.id" class="ending-talent-tag" :class="t.rarity">
            {{ t.icon }} {{ t.name }}
          </text>
        </view>
      </view>
    </view>

    <view class="life-summary">
      <view class="summary-row">
        <view class="summary-item">
          <text class="summary-icon">👤</text>
          <text class="summary-value">{{ character.age }}岁</text>
          <text class="summary-label">享年</text>
        </view>
        <view class="summary-divider"></view>
        <view class="summary-item">
          <text class="summary-icon">🏠</text>
          <text class="summary-value">{{ familyName }}</text>
          <text class="summary-label">出身</text>
        </view>
        <view class="summary-divider"></view>
        <view class="summary-item">
          <text class="summary-icon">💫</text>
          <text class="summary-value">{{ deathCause }}</text>
          <text class="summary-label">死因</text>
        </view>
      </view>
    </view>

    <view class="achievements-section" v-if="summary.achievements && summary.achievements.length > 0">
      <view class="section-header">
        <text class="section-icon">🏆</text>
        <text class="section-title">人生成就</text>
      </view>
      <view class="achievements-grid">
        <view v-for="(achievement, idx) in summary.achievements" :key="idx" class="achievement-card">
          <text class="achievement-text">{{ achievement }}</text>
        </view>
      </view>
    </view>

    <view class="final-stats">
      <view class="section-header">
        <text class="section-icon">📊</text>
        <text class="section-title">最终属性</text>
      </view>
      <view class="stats-grid">
        <view class="final-stat" v-for="stat in statsList" :key="stat.key">
          <text class="stat-icon">{{ stat.icon }}</text>
          <view class="stat-info">
            <text class="stat-name">{{ stat.name }}</text>
            <view class="stat-bar-wrap">
              <view class="stat-bar" :style="{ width: getStatValue(stat.key) + '%' }" :class="getStatBarClass(getStatValue(stat.key))"></view>
            </view>
          </view>
          <text class="stat-value" :class="getStatClass(getStatValue(stat.key))">{{ getStatValue(stat.key) }}</text>
        </view>
      </view>
    </view>

    <view class="history-section">
      <view class="section-header">
        <text class="section-icon">📜</text>
        <text class="section-title">人生回顾</text>
        <text class="history-count">{{ historyCount }}条记录</text>
      </view>
      <scroll-view scroll-y class="history-scroll">
        <view class="history-timeline">
          <view v-for="(item, index) in history" :key="index" class="history-item" v-if="item && item.text">
            <view class="timeline-dot"></view>
            <view class="history-content">
              <text class="history-age">{{ item.age || 0 }}岁</text>
              <text class="history-text">{{ item.text }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="action-section">
      <view class="action-btn restart-btn" @click="restartLife">
        <text class="btn-icon">🔄</text>
        <text class="btn-text">重新开始</text>
      </view>
      <view class="action-btn home-btn" @click="goHome">
        <text class="btn-icon">🏠</text>
        <text class="btn-text">返回首页</text>
      </view>
    </view>

    <!-- 🔮隐藏剧情区域 -->
    <view class="hidden-stories-section" v-if="triggeredHiddenStories && triggeredHiddenStories.length > 0">
      <view class="section-header">
        <text class="section-icon">🔮</text>
        <text class="section-title">隐藏剧情</text>
        <text class="hidden-count">{{ triggeredHiddenStories.length }} 个</text>
      </view>
      <view class="hidden-stories-list">
        <view 
          v-for="(story, sIdx) in triggeredHiddenStories" 
          :key="story.id"
          class="hidden-story-card"
          :class="story.rarity"
        >
          <view class="story-header">
            <text class="story-icon">{{ story.icon }}</text>
            <text class="story-name">{{ story.name }}</text>
            <text class="story-rarity-tag" :class="story.rarity">{{ story.rarity }}</text>
          </view>
          <text class="story-desc">{{ story.description }}</text>
          <text class="story-epitaph">「{{ story.epitaph }}」</text>
          <view class="story-reward" v-if="story.reward">
            <text class="reward-icon">💎</text>
            <text class="reward-text">+{{ story.reward.inheritanceBonus }} 传承点</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 💫传承点数区域 -->
    <view class="inheritance-section">
      <view class="section-header">
        <text class="section-icon">💫</text>
        <text class="section-title">轮回馈赠</text>
      </view>
      <view class="inheritance-card">
        <view class="inheritance-earned">
          <text class="earned-icon">+{{ earnedInheritancePoints }}</text>
          <text class="earned-label">本次获得传承点</text>
        </view>
        <view class="inheritance-total">
          <text class="total-icon">💎</text>
          <text class="total-value">{{ totalInheritancePoints }}</text>
          <text class="total-label">累计传承点</text>
        </view>
        <view class="inheritance-stats">
          <text class="stats-text">共{{ gamesPlayed }} 局</text>
          <text class="stats-sep">·</text>
          <text class="stats-text" v-if="bestEnding">最高结局: {{ bestEnding.icon }} {{ bestEnding.name }}</text>
        </view>
        <view class="inheritance-tip" v-if="earnedInheritancePoints > 0">
          <text class="tip-icon">💡</text>
          <text class="tip-text">传承点可解锁强力开局奖励，下一轮可选择天赋传承点</text>
        </view>
      </view>
    </view>

    <!-- 🔒分享与云端区域-->
    <view class="share-cloud-section">
      <!-- 隐藏剧情进度 -->
      <view class="hidden-progress" v-if="hiddenStoriesOverview">
        <view class="progress-header">
          <text class="progress-icon">🔮</text>
          <text class="progress-title">隐藏剧情收集进度</text>
          <text class="progress-count">{{ hiddenStoriesOverview.unlockedCount }}/{{ hiddenStoriesOverview.totalCount }}</text>
        </view>
        <view class="progress-bar-wrap">
          <view class="progress-bar" :style="{ width: hiddenStoriesOverview.progress + '%' }"></view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-grid">
        <view class="action-card share-btn" @click="generateAndShare">
          <text class="action-icon">📤</text>
          <text class="action-name">分享图片</text>
          <text class="action-hint">生成精美海报</text>
        </view>
        <view class="action-card cloud-btn" :class="{ synced: hasCloudSave }" @click="syncToCloud">
          <text class="action-icon">{{ hasCloudSave ? '☁️' : '🔄' }}</text>
          <text class="action-name">{{ hasCloudSave ? '已同步' : '云端同步' }}</text>
          <text class="action-hint" v-if="hasCloudSave">{{ getCloudSaveTime() }}</text>
          <text class="action-hint" v-else>保存到云端</text>
        </view>
      </view>
    </view>

    <!-- 🎨隐藏画布（用于生成分享图片）-->
    <canvas canvas-id="shareCanvas" id="shareCanvas" class="hidden-canvas"></canvas>
  </view>
</template>

<script>
import { generateLifeSummary } from '@/utils/gameEngine.js'
import { calculateEnding, generateEndingStory, endingRarity } from '@/utils/endings.js'
import { unlockGameEndRewards } from '@/utils/inheritanceSystem.js'
import { checkHiddenStoryTriggers, calculateHiddenStoryRewards, saveHiddenStories, getHiddenStoriesOverview } from '@/utils/hiddenStoryTriggers.js'
import { generateShareImage, saveShareImage, shareImage } from '@/utils/shareImage.js'
import { saveToCloud, checkCloudSave, loadFromCloud } from '@/utils/cloudSave.js'

export default {
  data() {
    return {
      character: {
        name: '未知',
        age: 0,
        wealth: 50,
        health: 50,
        happiness: 50,
        intelligence: 50,
        social: 50,
        wisdom: 50,
        charm: 50,
        creativity: 50,
        education: 50,
        family: null,
        _talents: [],
        _flags: []
      },
      history: [],
      deathCause: '自然原因',
      summary: { achievements: [], score: 0, rating: '平凡' },
      familyName: '普通家庭',
      birthYear: 1958,
      historyCount: 0,
      endingResult: null,
      endingStory: '',
      endingRarity,
      earnedInheritancePoints: 0,
      totalInheritancePoints: 0,
      gamesPlayed: 0,
      bestEnding: null,
      // 隐藏剧情
      triggeredHiddenStories: [],
      hiddenStoryBonus: 0,
      hiddenStoriesOverview: null,
      // 分享图片
      shareImageUrl: '',
      isGeneratingShare: false,
      showSharePanel: false,
      // 云端存储
      hasCloudSave: false,
      lastCloudSavedAt: '',
      isSyncing: false,
      statsList: [
        { key: 'wealth', icon: '💰', name: '财富' },
        { key: 'health', icon: '❤️', name: '健康' },
        { key: 'happiness', icon: '😊', name: '幸福' },
        { key: 'intelligence', icon: '🧠', name: '智力' },
        { key: 'social', icon: '👥', name: '社交' },
        { key: 'wisdom', icon: '📖', name: '智慧' },
        { key: 'charm', icon: '✨', name: '魅力' },
        { key: 'creativity', icon: '🎨', name: '创意' }
      ]
    }
  },
  onLoad() {
    // 读取角色数据
    var savedCharacter = uni.getStorageSync('currentCharacter')
    if (savedCharacter) {
      this.character.name = savedCharacter.name || '未知'
      this.character.age = savedCharacter.age || 0
      this.character.wealth = typeof savedCharacter.wealth === 'number' ? Math.round(savedCharacter.wealth) : 50
      this.character.health = typeof savedCharacter.health === 'number' ? Math.round(savedCharacter.health) : 50
      this.character.happiness = typeof savedCharacter.happiness === 'number' ? Math.round(savedCharacter.happiness) : 50
      this.character.intelligence = typeof savedCharacter.intelligence === 'number' ? Math.round(savedCharacter.intelligence) : 50
      this.character.social = typeof savedCharacter.social === 'number' ? Math.round(savedCharacter.social) : 50
      this.character.wisdom = typeof savedCharacter.wisdom === 'number' ? Math.round(savedCharacter.wisdom) : 50
      this.character.charm = typeof savedCharacter.charm === 'number' ? Math.round(savedCharacter.charm) : 50
      this.character.creativity = typeof savedCharacter.creativity === 'number' ? Math.round(savedCharacter.creativity) : 50
      this.character.education = typeof savedCharacter.education === 'number' ? Math.round(savedCharacter.education) : 50
      this.character._talents = savedCharacter._talents || []
      this.character._flags = savedCharacter._flags || []
      
      if (savedCharacter.family && savedCharacter.family.name) {
        this.familyName = savedCharacter.family.name
      }
      this.birthYear = 2026 - (this.character.age || 0)
    }
    
    // 读取历史记录
    var savedHistory = uni.getStorageSync('lifeHistory')
    if (savedHistory && Array.isArray(savedHistory)) {
      this.history = savedHistory
      this.historyCount = savedHistory.length
    }
    
    // 读取死因
    var savedDeathCause = uni.getStorageSync('deathCause')
    if (savedDeathCause) {
      this.deathCause = savedDeathCause
    }
    
    // 生成总结
    var summaryResult = generateLifeSummary(this.character, this.history, this.character._achievements || [])
    if (summaryResult) {
      this.summary = summaryResult
    }
    
    // 计算独特结局
    var storyState = uni.getStorageSync('storyState') || null
    this.endingResult = calculateEnding(this.character, this.history, this.summary.achievements, storyState, this.character._talents)
    this.endingStory = generateEndingStory(this.character, this.endingResult, this.history, this.character._talents)
    
    // 计算传承点数
    this.calculateInheritance()
    
    // 检查隐藏剧情触发
    this.checkHiddenTriggers()
    
    // 检查云端存储
    this.checkCloudSave()
    
    uni.removeStorageSync('lifeSimSave')
  },
  methods: {
    getStatValue(key) {
      if (!key) return 0
      var val = this.character[key]
      if (typeof val === 'number') return Math.round(val)
      return 0
    },
    getStatClass(value) {
      var v = typeof value === 'number' ? value : 0
      if (v >= 70) return 'high'
      if (v >= 40) return 'medium'
      return 'low'
    },
    getStatBarClass(value) {
      var v = typeof value === 'number' ? value : 0
      if (v >= 70) return 'bar-high'
      if (v >= 40) return 'bar-medium'
      return 'bar-low'
    },
    calculateInheritance() {
      // 获取已有的传承存档
      var savedData = uni.getStorageSync('inheritanceData') || {}
      this.totalInheritancePoints = savedData.totalInheritancePoints || 0
      this.gamesPlayed = savedData.gamesPlayed || 0
      this.bestEnding = savedData.bestEnding || null
      
      // 计算本局获得的传承点
      var gameHistory = { maxAge: this.character.age || 0 }
      var rewards = unlockGameEndRewards(
        this.endingResult,
        this.summary.achievements || [],
        gameHistory,
        savedData
      )
      this.earnedInheritancePoints = rewards.earnedPoints
      this.totalInheritancePoints = rewards.totalPoints
      this.gamesPlayed = rewards.gamesPlayed
      this.bestEnding = rewards.bestEnding
      
      // 保存到本地
      uni.setStorageSync('inheritanceData', {
        totalInheritancePoints: rewards.totalPoints,
        unlockedInheritances: rewards.unlockedInheritances,
        gamesPlayed: rewards.gamesPlayed,
        bestEnding: rewards.bestEnding
      })
    },
    restartLife() {
      // 带传承的新游戏
      uni.reLaunch({ url: '/pages/birth/birth?mode=inheritance' })
    },
    goHome() {
      uni.reLaunch({ url: '/pages/index/index' })
    },
    // ─── 隐藏剧情触发检查──────────────────────
    checkHiddenTriggers() {
      const inheritanceData = uni.getStorageSync('inheritanceData') || {}
      const gameData = {
        age: this.character.age,
        wealth: this.character.wealth,
        health: this.character.health,
        happiness: this.character.happiness,
        intelligence: this.character.intelligence,
        social: this.character.social,
        wisdom: this.character.wisdom,
        charm: this.character.charm,
        creativity: this.character.creativity,
        talents: (this.character._talents && this.character._talents.map(t => t.id)) || [],
        achievements: this.summary.achievements || [],
        endingRarity: (this.endingResult && this.endingResult.rarity),
        isMarried: (this.character._flags && this.character._flags.includes('married')) || false,
        relationshipCount: (this.character._flags && this.character._flags.filter(f => f.startsWith('npc_')).length) || 0
      }
      
      const triggered = checkHiddenStoryTriggers(gameData, inheritanceData)
      this.triggeredHiddenStories = triggered
      
      if (triggered.length > 0) {
        const rewards = calculateHiddenStoryRewards(triggered)
        this.hiddenStoryBonus = rewards.totalInheritanceBonus
        
        // 保存已解锁的隐藏剧情
        const updatedData = saveHiddenStories(triggered, inheritanceData)
        // 额外奖励：直接加到传承点
        updatedData.totalInheritancePoints = (updatedData.totalInheritancePoints || 0) + rewards.totalInheritanceBonus
        uni.setStorageSync('inheritanceData', updatedData)
        this.totalInheritancePoints = updatedData.totalInheritancePoints
        this.earnedInheritancePoints += rewards.totalInheritanceBonus
      }
      
      // 获取总览
      const allSaved = uni.getStorageSync('inheritanceData') || {}
      this.hiddenStoriesOverview = getHiddenStoriesOverview(allSaved)
    },
    // ─── 分享图片 ──────────────────────────────
    async generateAndShare() {
      if (this.isGeneratingShare) return
      
      this.isGeneratingShare = true
      this.showSharePanel = true
      
      try {
        const dataUrl = await generateShareImage({
          character: this.character,
          endingResult: this.endingResult,
          summary: this.summary,
          achievements: this.summary.achievements,
          history: this.history,
          canvasId: 'shareCanvas'
        })
        
        this.shareImageUrl = dataUrl
        
        // H5 自动触发下载
        // #ifdef H5
        const link = document.createElement('a')
        link.download = `人生模拟器_${this.character.name}_${this.character.age}.png`
        link.href = dataUrl
        link.click()
        // #endif
        
      } catch (e) {
        console.error('生成分享图失败', e)
        uni.showToast({ title: '生成分享图失败', icon: 'none' })
      } finally {
        this.isGeneratingShare = false
      }
    },
    async saveImageToLocal() {
      if (!this.shareImageUrl) {
        await this.generateAndShare()
      }
      // #ifndef H5
      uni.saveImageToPhotosAlbum({
        filePath: this.shareImageUrl,
        success: () => uni.showToast({ title: '已保存到相册', icon: 'success' }),
        fail: () => uni.showToast({ title: '保存失败', icon: 'none' })
      })
      // #endif
    },
    // ─── 云端存档 ──────────────────────────────
    async checkCloudSave() {
      try {
        const result = await checkCloudSave()
        this.hasCloudSave = result.hasCloudSave
        this.lastCloudSavedAt = result.lastSavedAt || ''
      } catch (e) {
        this.hasCloudSave = false
      }
    },
    async syncToCloud() {
      if (this.isSyncing) return
      
      this.isSyncing = true
      uni.showLoading({ title: '同步中...' })
      
      try {
        // 收集所有本地数据
        const saveData = {
          character: this.character,
          history: this.history,
          inheritanceData: uni.getStorageSync('inheritanceData') || {},
          achievements: this.summary.achievements,
          endingResult: this.endingResult,
          savedAt: new Date().toISOString()
        }
        
        await saveToCloud(saveData)
        
        uni.hideLoading()
        uni.showToast({ title: '同步成功', icon: 'success' })
        this.hasCloudSave = true
        this.lastCloudSavedAt = new Date().toISOString()
        
      } catch (e) {
        uni.hideLoading()
        uni.showModal({
          title: '同步失败',
          content: '无法连接到服务器，请检查网络后重试',
          showCancel: false
        })
      } finally {
        this.isSyncing = false
      }
    },
    getCloudSaveTime() {
      if (!this.lastCloudSavedAt) return ''
      const d = new Date(this.lastCloudSavedAt)
      return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
.container { 
  min-height: 100vh; 
  padding: 30rpx; 
  padding-bottom: calc(180rpx + constant(safe-area-inset-bottom)); 
  padding-bottom: calc(180rpx + env(safe-area-inset-bottom)); 
  position: relative; 
  box-sizing: border-box;
}
.bg-overlay { position: absolute; top: 0; left: 0; right: 0; height: 500rpx; background: linear-gradient(180deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%); pointer-events: none; }

.ending-header { text-align: center; margin-bottom: 36rpx; position: relative; padding-top: 20rpx; }
.candle-wrap { position: relative; display: inline-block; margin-bottom: 16rpx; }
.candle-icon { font-size: 70rpx; position: relative; z-index: 1; }
.candle-glow { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100rpx; height: 100rpx; background: radial-gradient(circle, rgba(255, 200, 100, 0.4) 0%, transparent 70%); border-radius: 50%; }
.ending-title { font-size: 40rpx; font-weight: bold; color: #fff; display: block; letter-spacing: 6rpx; }
.ending-name { font-size: 32rpx; color: #ffd700; margin-top: 12rpx; display: block; }
.ending-years { font-size: 24rpx; color: rgba(255, 255, 255, 0.5); margin-top: 6rpx; display: block; }

.score-section { text-align: center; margin-bottom: 28rpx; }
.score-ring { width: 180rpx; height: 180rpx; border-radius: 50%; background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3)); display: flex; align-items: center; justify-content: center; margin: 0 auto 16rpx; border: 4rpx solid rgba(255, 215, 0, 0.3); }
.score-inner { display: flex; flex-direction: column; align-items: center; }
.score-number { font-size: 48rpx; font-weight: bold; color: #ffd700; }
.score-label { font-size: 20rpx; color: rgba(255, 255, 255, 0.6); }
.rating-wrap { display: flex; align-items: baseline; justify-content: center; }
.rating-text { font-size: 32rpx; color: #ffd700; font-weight: bold; margin-right: 8rpx; }
.rating-sub { font-size: 26rpx; color: rgba(255, 255, 255, 0.6); }

.life-summary { background: rgba(255, 255, 255, 0.03); border-radius: 20rpx; padding: 24rpx; margin-bottom: 24rpx; border: 1rpx solid rgba(255, 255, 255, 0.06); }
.summary-row { display: flex; align-items: center; }
.summary-item { flex: 1; text-align: center; min-width: 0; }
.summary-icon { font-size: 28rpx; display: block; margin-bottom: 6rpx; }
.summary-value { font-size: 26rpx; color: #fff; font-weight: 600; display: block; margin-bottom: 4rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.summary-label { font-size: 20rpx; color: rgba(255, 255, 255, 0.5); }
.summary-divider { width: 1rpx; height: 50rpx; background: rgba(255, 255, 255, 0.1); flex-shrink: 0; }

.section-header { display: flex; align-items: center; margin-bottom: 16rpx; }
.section-icon { font-size: 26rpx; margin-right: 8rpx; }
.section-title { font-size: 28rpx; color: #fff; font-weight: 600; }
.history-count { font-size: 22rpx; color: rgba(255, 255, 255, 0.4); margin-left: auto; }

.achievements-section { background: rgba(255, 255, 255, 0.03); border-radius: 20rpx; padding: 20rpx; margin-bottom: 24rpx; border: 1rpx solid rgba(255, 255, 255, 0.06); }
.achievements-grid { display: flex; flex-wrap: wrap; gap: 10rpx; }
.achievement-card { background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.1)); border: 1rpx solid rgba(255, 215, 0, 0.25); border-radius: 14rpx; padding: 10rpx 16rpx; }
.achievement-text { font-size: 24rpx; color: #ffd700; }

.final-stats { background: rgba(255, 255, 255, 0.03); border-radius: 20rpx; padding: 20rpx; margin-bottom: 24rpx; border: 1rpx solid rgba(255, 255, 255, 0.06); }
.stats-grid { display: flex; flex-direction: column; gap: 14rpx; }
.final-stat { display: flex; align-items: center; gap: 14rpx; }
.final-stat .stat-icon { font-size: 26rpx; width: 36rpx; flex-shrink: 0; }
.stat-info { flex: 1; min-width: 0; }
.final-stat .stat-name { font-size: 22rpx; color: rgba(255, 255, 255, 0.6); display: block; margin-bottom: 4rpx; }
.stat-bar-wrap { height: 10rpx; background: rgba(255, 255, 255, 0.1); border-radius: 5rpx; overflow: hidden; }
.stat-bar { height: 100%; border-radius: 5rpx; }
.bar-high { background: linear-gradient(90deg, #4ade80, #22c55e); }
.bar-medium { background: linear-gradient(90deg, #fbbf24, #f59e0b); }
.bar-low { background: linear-gradient(90deg, #f87171, #ef4444); }
.final-stat .stat-value { font-size: 26rpx; font-weight: bold; width: 56rpx; text-align: right; flex-shrink: 0; }
.stat-value.high { color: #4ade80; }
.stat-value.medium { color: #fbbf24; }
.stat-value.low { color: #f87171; }

.history-section { background: rgba(255, 255, 255, 0.03); border-radius: 20rpx; padding: 20rpx; margin-bottom: 24rpx; border: 1rpx solid rgba(255, 255, 255, 0.06); }
.history-scroll { max-height: 360rpx; }
.history-timeline { padding-left: 16rpx; }
.history-item { display: flex; padding: 12rpx 0; position: relative; }
.timeline-dot { width: 8rpx; height: 8rpx; background: rgba(255, 215, 0, 0.6); border-radius: 50%; margin-right: 14rpx; margin-top: 10rpx; flex-shrink: 0; }
.history-content { flex: 1; min-width: 0; }
.history-age { font-size: 22rpx; color: #ffd700; display: block; margin-bottom: 4rpx; }
.history-text { font-size: 24rpx; color: rgba(255, 255, 255, 0.7); line-height: 1.5; word-break: break-all; }

.action-section { 
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  display: flex; 
  gap: 16rpx; 
  padding: 20rpx 24rpx; 
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom)); 
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); 
  background: linear-gradient(transparent, rgba(15, 15, 35, 0.98) 30%); 
}
.action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8rpx; padding: 24rpx 16rpx; border-radius: 18rpx; }
.restart-btn { background: linear-gradient(135deg, #667eea, #764ba2); }
.home-btn { background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); border: 1rpx solid rgba(255, 255, 255, 0.2); }
.btn-icon { font-size: 28rpx; }
.btn-text { font-size: 28rpx; font-weight: 600; color: #fff; }

/* 结局卡片 */
.ending-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.1);
}

.ending-card.epic {
  border-color: rgba(168, 85, 247, 0.4);
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(102, 126, 234, 0.08));
}

.ending-card.legendary {
  border-color: rgba(255, 215, 0, 0.5);
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 165, 0, 0.05));
  box-shadow: 0 0 30rpx rgba(255, 215, 0, 0.1);
}

.ending-card.mythic {
  border-color: rgba(255, 68, 68, 0.5);
  background: linear-gradient(135deg, rgba(255, 68, 68, 0.08), rgba(255, 215, 0, 0.05));
  box-shadow: 0 0 40rpx rgba(255, 68, 68, 0.15);
}

.ending-card-header {
  display: flex;
  align-items: center;
  gap: 15rpx;
  margin-bottom: 15rpx;
}

.ending-card-icon {
  font-size: 48rpx;
}

.ending-card-title-wrap {
  display: flex;
  flex-direction: column;
}

.ending-card-name {
  font-size: 34rpx;
  font-weight: bold;
  color: #fff;
}

.ending-card-rarity {
  font-size: 22rpx;
  font-weight: bold;
  margin-top: 4rpx;
}

.ending-card-desc {
  font-size: 28rpx;
  color: #c0c0c0;
  line-height: 1.6;
  display: block;
  margin-bottom: 15rpx;
}

.ending-card-epitaph {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12rpx;
  padding: 15rpx;
  margin-bottom: 15rpx;
}

.epitaph-text {
  font-size: 26rpx;
  color: #ffd700;
  font-style: italic;
}

.ending-talents {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.ending-talents-label {
  font-size: 22rpx;
  color: #a0a0a0;
}

.ending-talents-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.ending-talent-tag {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 10rpx;
}

.ending-talent-tag.common {
  background: rgba(158,158,158,0.15);
  color: #ccc;
}

.ending-talent-tag.rare {
  background: rgba(79,172,254,0.15);
  color: #4facfe;
}

.ending-talent-tag.epic {
  background: rgba(168,85,247,0.15);
  color: #a855f7;
}

.ending-talent-tag.legendary {
  background: rgba(255,215,0,0.15);
  color: #ffd700;
}

/* 传承点数区域 */
.inheritance-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 215, 0, 0.2);
}

.inheritance-card {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.06), rgba(168, 85, 247, 0.04));
  border-radius: 16rpx;
  padding: 20rpx;
}

.inheritance-earned {
  display: flex;
  align-items: baseline;
  gap: 10rpx;
  margin-bottom: 16rpx;
}

.earned-icon {
  font-size: 44rpx;
  font-weight: bold;
  color: #ffd700;
}

.earned-label {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.6);
}

.inheritance-total {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.total-icon {
  font-size: 28rpx;
}

.total-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #a855f7;
}

.total-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}

.inheritance-stats {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.stats-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}

.stats-sep {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.3);
}

.inheritance-tip {
  display: flex;
  align-items: flex-start;
  gap: 8rpx;
  background: rgba(255, 215, 0, 0.08);
  border-radius: 10rpx;
  padding: 12rpx;
}

.tip-icon {
  font-size: 24rpx;
  flex-shrink: 0;
}

.tip-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* 隐藏剧情区域 */
.hidden-stories-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(168, 85, 247, 0.2);
}

.hidden-count {
  font-size: 22rpx;
  color: #a855f7;
  margin-left: auto;
}

.hidden-stories-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.hidden-story-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16rpx;
  padding: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.hidden-story-card.rare {
  border-color: rgba(33, 150, 243, 0.3);
  background: rgba(33, 150, 243, 0.05);
}

.hidden-story-card.epic {
  border-color: rgba(156, 39, 176, 0.3);
  background: rgba(156, 39, 176, 0.05);
}

.hidden-story-card.legendary {
  border-color: rgba(255, 193, 7, 0.3);
  background: rgba(255, 193, 7, 0.05);
}

.hidden-story-card.mythical {
  border-color: rgba(244, 67, 54, 0.3);
  background: rgba(244, 67, 54, 0.05);
  animation: mythicalGlow 2s ease-in-out infinite;
}

@keyframes mythicalGlow {
  0%, 100% { box-shadow: 0 0 10rpx rgba(244, 67, 54, 0.1); }
  50% { box-shadow: 0 0 25rpx rgba(244, 67, 54, 0.2); }
}

.story-header {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 10rpx;
}

.story-icon {
  font-size: 32rpx;
}

.story-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
  flex: 1;
}

.story-rarity-tag {
  font-size: 20rpx;
  padding: 2rpx 10rpx;
  border-radius: 8rpx;
}

.story-rarity-tag.rare { background: rgba(33, 150, 243, 0.2); color: #2196f3; }
.story-rarity-tag.epic { background: rgba(156, 39, 176, 0.2); color: #9c27b0; }
.story-rarity-tag.legendary { background: rgba(255, 193, 7, 0.2); color: #ffc107; }
.story-rarity-tag.mythical { background: rgba(244, 67, 54, 0.2); color: #f44336; }

.story-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  display: block;
  margin-bottom: 8rpx;
}

.story-epitaph {
  font-size: 22rpx;
  color: #ffd700;
  font-style: italic;
  display: block;
  margin-bottom: 8rpx;
}

.story-reward {
  display: flex;
  align-items: center;
  gap: 6rpx;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 8rpx;
  padding: 6rpx 12rpx;
  width: fit-content;
}

.reward-icon {
  font-size: 20rpx;
}

.reward-text {
  font-size: 22rpx;
  color: #a855f7;
  font-weight: bold;
}

/* 分享与云端区域 */
.share-cloud-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.06);
}

.hidden-progress {
  margin-bottom: 16rpx;
}

.progress-header {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 10rpx;
}

.progress-icon {
  font-size: 24rpx;
}

.progress-title {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.progress-count {
  font-size: 22rpx;
  color: #a855f7;
  margin-left: auto;
}

.progress-bar-wrap {
  height: 8rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4rpx;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #a855f7, #667eea);
  border-radius: 4rpx;
  transition: width 0.3s ease;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.share-btn {
  border-color: rgba(255, 193, 7, 0.2);
}

.share-btn:active {
  background: rgba(255, 193, 7, 0.1);
}

.cloud-btn.synced .action-icon {
  font-size: 32rpx;
}

.cloud-btn .action-icon {
  font-size: 32rpx;
}

.action-icon {
  font-size: 32rpx;
  margin-bottom: 6rpx;
}

.action-name {
  font-size: 26rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4rpx;
}

.action-hint {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.4);
}

/* 隐藏画布 */
.hidden-canvas {
  position: fixed;
  left: -9999px;
  top: -9999px;
  width: 750px;
  height: 1100px;
  pointer-events: none;
}
</style>
