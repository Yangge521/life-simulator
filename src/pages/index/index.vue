<template>
  <view class="container">
    <!-- iOS 灵动状态栏模拟 -->
    <view class="ios-status-bar">
      <text class="status-time">{{ timeString }}</text>
      <view class="dynamic-island"></view>
      <view class="status-icons">
        <text class="status-icon">📶</text>
        <text class="status-icon">🔋</text>
      </view>
    </view>

    <!-- 背景极光与星尘效果 -->
    <view class="aurora-bg">
      <view class="aurora-circle circle-blue"></view>
      <view class="aurora-circle circle-purple"></view>
      <view class="aurora-circle circle-pink"></view>
    </view>
    
    <!-- 顶奢毛玻璃头部 -->
    <view class="header-section">
      <text class="main-title">模拟人生</text>
      <text class="sub-title">PERSISTENT LIFE SIMULATOR</text>
    </view>

    <!-- ─────────────────── WIDGET 1: Apple Game Center 命运面板 ─────────────────── -->
    <view class="gamecenter-card glassmorphism fade-in" @click="goToAchievements">
      <view class="gc-header">
        <view class="gc-logo-wrap">
          <view class="gc-logo-bubble bubble-1"></view>
          <view class="gc-logo-bubble bubble-2"></view>
          <text class="gc-logo">🎯</text>
        </view>
        <view class="gc-title-wrap">
          <text class="gc-brand">GAME CENTER</text>
          <text class="gc-title">命运荣誉中心</text>
        </view>
        <text class="gc-arrow">🛈 查看全部 ›</text>
      </view>

      <view class="gc-profile">
        <!-- 带有苹果彩虹光环的头像 -->
        <view class="profile-avatar-wrap">
          <text class="profile-avatar">👨‍🚀</text>
          <view class="rainbow-ring"></view>
        </view>
        <view class="profile-info">
          <text class="profile-name">{{ hasSavedGame ? savedInfo.split(' · ')[0] : '探索先锋' }}</text>
          <text class="profile-rank">{{ achievementTitle }}</text>
        </view>
        <view class="profile-points">
          <text class="points-num">{{ totalPoints }}</text>
          <text class="points-label">成就积分</text>
        </view>
      </view>

      <!-- iOS 微动进度条 -->
      <view class="gc-progress-section">
        <view class="progress-info">
          <text class="progress-label">成就解锁进度</text>
          <text class="progress-val">{{ unlockedCount }} / {{ totalCount }} ({{ progressPercent }}%)</text>
        </view>
        <view class="progress-bar-wrap">
          <view class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></view>
        </view>
      </view>

      <!-- 最近解锁荣誉勋章展示墙 -->
      <view class="gc-medals-wall">
        <text class="wall-title">最近解锁勋章</text>
        <view class="medals-grid" v-if="recentUnlocked.length > 0">
          <view class="medal-item" v-for="medal in recentUnlocked" :key="medal.id">
            <text class="medal-icon">{{ medal.icon }}</text>
            <text class="medal-name">{{ medal.name }}</text>
          </view>
        </view>
        <view class="medals-empty" v-else>
          <text class="empty-hint">尚未解锁任何成就，开启新人生解锁第一枚勋章！</text>
        </view>
      </view>
    </view>

    <!-- ─────────────────── WIDGET 2: iOS 锁屏风格操作卡片 ─────────────────── -->
    <view class="actions-container">
      <!-- 开始新人生 - 炫彩Hero Card -->
      <view class="hero-card start-life-btn" @click="startNewLife">
        <view class="hero-glow"></view>
        <view class="hero-content">
          <view class="hero-icon-wrap">
            <text class="hero-icon">✨</text>
          </view>
          <view class="hero-text-wrap">
            <text class="hero-main-text">开启崭新人生</text>
            <text class="hero-sub-text">自选天赋异禀，重塑命运格局</text>
          </view>
          <text class="hero-action-arrow">›</text>
        </view>
      </view>

      <!-- 双栏并排副卡片 -->
      <view class="dual-row">
        <!-- 随机人生卡片 -->
        <view class="sub-widget-card random-life-btn" @click="randomLife">
          <view class="sub-card-glow"></view>
          <text class="sub-card-icon">🎲</text>
          <text class="sub-card-title">交由天命</text>
          <text class="sub-card-desc">一切交由命运随机判定</text>
        </view>

        <!-- 继续旅程卡片 -->
        <view class="sub-widget-card continue-life-btn" :class="{ disabled: !hasSavedGame }" @click="continueGame">
          <view class="sub-card-glow"></view>
          <text class="sub-card-icon">📖</text>
          <text class="sub-card-title">继续旅程</text>
          <text class="sub-card-desc">{{ hasSavedGame ? savedInfo : '暂无进行中存档' }}</text>
        </view>
      </view>
    </view>

    <!-- ─────────────────── WIDGET 3: iOS 系统 App 网格卡片 ─────────────────── -->
    <view class="system-apps-section">
      <text class="section-title">命运维度的全方位成长</text>
      <view class="apps-grid">
        <view class="app-widget" @click="showFeatureToast('家庭')">
          <view class="app-icon-container gradient-orange">
            <text class="app-icon">👨‍👩‍👧‍👦</text>
          </view>
          <text class="app-label">人脉网</text>
          <text class="app-desc">至亲血脉</text>
        </view>

        <view class="app-widget" @click="showFeatureToast('教育')">
          <view class="app-icon-container gradient-blue">
            <text class="app-icon">📚</text>
          </view>
          <text class="app-label">学术路</text>
          <text class="app-desc">修读备考</text>
        </view>

        <view class="app-widget" @click="showFeatureToast('事业')">
          <view class="app-icon-container gradient-indigo">
            <text class="app-icon">💼</text>
          </view>
          <text class="app-label">生涯殿</text>
          <text class="app-desc">职业发展</text>
        </view>

        <view class="app-widget" @click="showFeatureToast('爱情')">
          <view class="app-icon-container gradient-pink">
            <text class="app-icon">💖</text>
          </view>
          <text class="app-label">相亲角</text>
          <text class="app-desc">恋爱关系</text>
        </view>

        <view class="app-widget" @click="goToSkills">
          <view class="app-icon-container gradient-green">
            <text class="app-icon">🌲</text>
          </view>
          <text class="app-label">技能树</text>
          <text class="app-desc">领悟演化</text>
        </view>
      </view>
    </view>

    <!-- 顶奢极简页脚 -->
    <view class="footer-wrap">
      <text class="quote">“ 每一次选择，都是新的可能 ”</text>
      <text class="developer-info">Apple Design Studio · 模拟人生版本</text>
    </view>
  </view>
</template>

<script>
import { getAllAchievements, calculateAchievementPoints } from '@/utils/achievements.js'

export default {
  data() {
    return {
      hasSavedGame: false,
      savedInfo: '',
      timeString: '18:49',
      
      // Game Center 数据
      unlockedCount: 0,
      totalCount: 0,
      progressPercent: 0,
      totalPoints: 0,
      achievementTitle: '时空新萌新',
      recentUnlocked: [],
      timer: null
    }
  },
  onLoad() {
    this.updateTime()
    this.checkSavedGame()
    this.timer = setInterval(this.updateTime, 30000) // 每30秒更新一次状态栏时间
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  onShow() {
    this.checkSavedGame()
    this.updateTime()
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      this.timeString = `${hours}:${minutes}`
    },
    checkSavedGame() {
      const saved = uni.getStorageSync('lifeSimSave')
      const character = uni.getStorageSync('currentCharacter')
      this.hasSavedGame = !!saved
      
      if (character && character.name && character.age !== undefined) {
        this.savedInfo = character.name + ' · ' + character.age + '岁'
      } else {
        this.savedInfo = '继续上次的游戏'
      }

      // 获取全部成就数据
      try {
        const allAchievements = getAllAchievements()
        this.totalCount = allAchievements.length

        // 获取已解锁成就
        const unlockedIds = (character && character._achievements) || uni.getStorageSync('global_unlocked_achievements') || []
        this.unlockedCount = unlockedIds.length
        this.progressPercent = this.totalCount > 0 ? Math.round((this.unlockedCount / this.totalCount) * 100) : 0

        // 获取已解锁成就对象列表来计算积分与最近勋章
        const unlockedAchievements = allAchievements.filter(a => unlockedIds.includes(a.id))
        this.totalPoints = calculateAchievementPoints(unlockedAchievements)

        // 评定荣誉段位称号
        if (this.totalPoints >= 1000) {
          this.achievementTitle = '🌌 命运掌控主宰'
        } else if (this.totalPoints >= 600) {
          this.achievementTitle = '👑 硅谷科技大亨'
        } else if (this.totalPoints >= 350) {
          this.achievementTitle = '🚀 Swift核心架构师'
        } else if (this.totalPoints >= 150) {
          this.achievementTitle = '🎨 极简体验设计师'
        } else if (this.totalPoints >= 40) {
          this.achievementTitle = '💻 iOS独立开发者'
        } else {
          this.achievementTitle = '👶 时空新萌新'
        }

        // 截取最近 3 个解锁的成就
        this.recentUnlocked = unlockedAchievements.slice(-3).reverse()
      } catch (e) {
        console.error('Error loading achievements statistics:', e)
      }
    },
    startNewLife() {
      uni.navigateTo({ url: '/pages/birth/birth' })
    },
    randomLife() {
      uni.navigateTo({ url: '/pages/birth/birth?random=true' })
    },
    continueGame() {
      if (!this.hasSavedGame) return
      uni.navigateTo({ url: '/pages/life/life?continue=true' })
    },
    goToAchievements() {
      uni.navigateTo({ url: '/pages/achievements/achievements' })
    },
    goToSkills() {
      uni.navigateTo({ url: '/pages/skills/skills' })
    },
    showFeatureToast(featureName) {
      uni.showToast({
        title: `请点击“继续旅程”或“开启新人生”，即可在游戏运行中深度体验：${featureName} 模块。`,
        icon: 'none',
        duration: 3000
      })
    }
  }
}
</script>

<style scoped>
/* 全局暗色极简容器，融入WWDC极光背景 */
.container {
  min-height: 100vh;
  padding: 0 40rpx 40rpx;
  background-color: #080512;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* iOS 极光背景微动弥散 */
.aurora-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.aurora-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(120rpx);
  opacity: 0.15;
}

.circle-blue {
  width: 500rpx;
  height: 500rpx;
  background: radial-gradient(circle, #007aff, transparent 70%);
  top: -100rpx;
  right: -100rpx;
}

.circle-purple {
  width: 600rpx;
  height: 600rpx;
  background: radial-gradient(circle, #5856d6, transparent 70%);
  bottom: 200rpx;
  left: -200rpx;
}

.circle-pink {
  width: 400rpx;
  height: 400rpx;
  background: radial-gradient(circle, #ff2d55, transparent 70%);
  bottom: -100rpx;
  right: -50rpx;
}

/* iOS 系统状态栏模拟 */
.ios-status-bar {
  width: 100%;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
  box-sizing: border-box;
  z-index: 10;
  margin-top: 10rpx;
}

.status-time {
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
  font-family: -apple-system, SF Pro Text, sans-serif;
  letter-spacing: -0.5rpx;
}

.dynamic-island {
  width: 220rpx;
  height: 56rpx;
  background: #000000;
  border-radius: 30rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.status-icon {
  font-size: 26rpx;
}

/* 简约大标题区 */
.header-section {
  text-align: center;
  margin-top: 30rpx;
  margin-bottom: 40rpx;
  z-index: 1;
}

.main-title {
  font-size: 58rpx;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 4rpx;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: linear-gradient(135deg, #ffffff 0%, #e2e2e2 60%, #a0a0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.sub-title {
  font-size: 18rpx;
  font-weight: 700;
  color: #7b7899;
  letter-spacing: 6rpx;
  margin-top: 8rpx;
  display: block;
}

/* 顶奢玻璃微气泡 Game Center 卡片 */
.gamecenter-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 36rpx;
  padding: 30rpx;
  box-sizing: border-box;
  border: 1.5rpx solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.35);
  margin-bottom: 40rpx;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.gamecenter-card:active {
  transform: scale(0.985);
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.15);
}

.gc-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.gc-logo-wrap {
  width: 72rpx;
  height: 72rpx;
  background: linear-gradient(135deg, #2b5cff, #11b1ff);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(43, 92, 255, 0.3);
}

.gc-logo-bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.bubble-1 {
  width: 40rpx;
  height: 40rpx;
  top: -10rpx;
  left: -10rpx;
}

.bubble-2 {
  width: 30rpx;
  height: 30rpx;
  bottom: -5rpx;
  right: -5rpx;
}

.gc-logo {
  font-size: 34rpx;
  z-index: 1;
}

.gc-title-wrap {
  margin-left: 18rpx;
  flex: 1;
}

.gc-brand {
  font-size: 18rpx;
  font-weight: 800;
  color: #34c759;
  letter-spacing: 2rpx;
  display: block;
}

.gc-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #ffffff;
  display: block;
  margin-top: 2rpx;
}

.gc-arrow {
  font-size: 22rpx;
  color: #8e8e93;
  font-weight: 500;
}

/* 个人形象行 */
.gc-profile {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24rpx;
  padding: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.03);
}

.profile-avatar-wrap {
  width: 90rpx;
  height: 90rpx;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.profile-avatar {
  font-size: 48rpx;
}

.rainbow-ring {
  position: absolute;
  top: -4rpx;
  left: -4rpx;
  right: -4rpx;
  bottom: -4rpx;
  border-radius: 50%;
  border: 3rpx solid transparent;
  background: linear-gradient(135deg, #007aff, #34c759, #ffcc00, #ff2d55, #007aff) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  animation: rotateRing 6s linear infinite;
}

@keyframes rotateRing {
  100% {
    transform: rotate(360deg);
  }
}

.profile-info {
  margin-left: 20rpx;
  flex: 1;
}

.profile-name {
  font-size: 30rpx;
  font-weight: 700;
  color: #ffffff;
  display: block;
}

.profile-rank {
  font-size: 22rpx;
  color: #ffcc00;
  font-weight: 600;
  margin-top: 4rpx;
  display: inline-block;
  background: rgba(255, 204, 0, 0.08);
  padding: 2rpx 12rpx;
  border-radius: 8rpx;
}

.profile-points {
  text-align: right;
}

.points-num {
  font-size: 38rpx;
  font-weight: 800;
  color: #30d158;
  display: block;
}

.points-label {
  font-size: 18rpx;
  color: #8e8e93;
  display: block;
  margin-top: 2rpx;
}

/* 进度条板块 */
.gc-progress-section {
  margin-top: 24rpx;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.progress-label {
  font-size: 20rpx;
  color: #8e8e93;
  font-weight: 600;
}

.progress-val {
  font-size: 20rpx;
  color: #ffffff;
  font-weight: 700;
}

.progress-bar-wrap {
  width: 100%;
  height: 8rpx;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4rpx;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #34c759, #30d158);
  border-radius: 4rpx;
  transition: width 0.6s cubic-bezier(0.1, 0.8, 0.1, 1);
}

/* 勋章墙 */
.gc-medals-wall {
  margin-top: 24rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.06);
}

.wall-title {
  font-size: 20rpx;
  font-weight: 700;
  color: #8e8e93;
  display: block;
  margin-bottom: 12rpx;
}

.medals-grid {
  display: flex;
  gap: 16rpx;
}

.medal-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: rgba(255, 255, 255, 0.03);
  padding: 10rpx 14rpx;
  border-radius: 16rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.03);
}

.medal-icon {
  font-size: 28rpx;
}

.medal-name {
  font-size: 18rpx;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.medals-empty {
  padding: 10rpx 0;
}

.empty-hint {
  font-size: 18rpx;
  color: #545456;
  text-align: center;
  display: block;
}

/* ─────────────────── ACTIONS WIDGETS ─────────────────── */
.actions-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 40rpx;
  z-index: 1;
}

/* 开始人生炫光Hero Card */
.hero-card {
  width: 100%;
  background: linear-gradient(135deg, #5856d6 0%, #3b3ab2 100%);
  border-radius: 36rpx;
  padding: 36rpx;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12rpx 36rpx rgba(88, 86, 214, 0.25);
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  transition: all 0.25s ease;
}

.hero-card:active {
  transform: scale(0.98);
  opacity: 0.95;
  box-shadow: 0 6rpx 20rpx rgba(88, 86, 214, 0.15);
}

.hero-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 60%);
  animation: breathing 4s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes breathing {
  0% {
    transform: scale(0.9) translate(-5%, -5%);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.1) translate(5%, 5%);
    opacity: 0.8;
  }
}

.hero-content {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-icon-wrap {
  width: 90rpx;
  height: 90rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.hero-icon {
  font-size: 42rpx;
}

.hero-text-wrap {
  margin-left: 24rpx;
  flex: 1;
}

.hero-main-text {
  font-size: 34rpx;
  font-weight: 800;
  color: #ffffff;
  display: block;
}

.hero-sub-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
  display: block;
  margin-top: 4rpx;
  font-weight: 500;
}

.hero-action-arrow {
  font-size: 48rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
}

/* 双栏副操作卡 */
.dual-row {
  display: flex;
  gap: 20rpx;
}

.sub-widget-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 32rpx;
  padding: 30rpx 24rpx;
  box-sizing: border-box;
  border: 1rpx solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;
}

.sub-widget-card:active:not(.disabled) {
  transform: scale(0.97);
  background: rgba(255, 255, 255, 0.06);
}

.sub-widget-card.disabled {
  opacity: 0.45;
}

.sub-card-icon {
  font-size: 42rpx;
  margin-bottom: 12rpx;
}

.sub-card-title {
  font-size: 26rpx;
  font-weight: 700;
  color: #ffffff;
  display: block;
}

.sub-card-desc {
  font-size: 18rpx;
  color: #8e8e93;
  margin-top: 6rpx;
  display: block;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 给各个按钮配上微弱的呼吸霓虹边框 */
.random-life-btn {
  box-shadow: 0 4rpx 16rpx rgba(255, 45, 85, 0.05);
}

.random-life-btn .sub-card-icon {
  text-shadow: 0 0 10rpx rgba(255, 45, 85, 0.5);
}

.continue-life-btn:not(.disabled) {
  box-shadow: 0 4rpx 16rpx rgba(52, 199, 89, 0.05);
}

.continue-life-btn:not(.disabled) .sub-card-icon {
  text-shadow: 0 0 10rpx rgba(52, 199, 89, 0.5);
}

/* ─────────────────── SYSTEM APPS SECTION ─────────────────── */
.system-apps-section {
  width: 100%;
  z-index: 1;
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 22rpx;
  font-weight: 800;
  color: #8e8e93;
  letter-spacing: 2rpx;
  display: block;
  margin-bottom: 20rpx;
  text-transform: uppercase;
}

.apps-grid {
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 36rpx;
  padding: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.04);
}

.app-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110rpx;
  transition: all 0.2s ease;
}

.app-widget:active {
  transform: scale(0.9);
}

.app-icon-container {
  width: 96rpx;
  height: 96rpx;
  border-radius: 22rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.2);
  margin-bottom: 12rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.app-icon {
  font-size: 46rpx;
}

.app-label {
  font-size: 20rpx;
  font-weight: 700;
  color: #ffffff;
  display: block;
}

.app-desc {
  font-size: 15rpx;
  color: #8e8e93;
  margin-top: 4rpx;
  font-weight: 500;
  text-align: center;
}

/* 经典的 iOS APP 颜色渐变定义 */
.gradient-orange {
  background: linear-gradient(135deg, #ff9500, #ff5e00);
}
.gradient-blue {
  background: linear-gradient(135deg, #007aff, #0051d6);
}
.gradient-indigo {
  background: linear-gradient(135deg, #5856d6, #3b3ab2);
}
.gradient-pink {
  background: linear-gradient(135deg, #ff2d55, #d6003c);
}
.gradient-green {
  background: linear-gradient(135deg, #34c759, #248f3d);
}

/* 极简页脚 */
.footer-wrap {
  margin-top: auto;
  padding-top: 60rpx;
  text-align: center;
  z-index: 1;
}

.quote {
  font-size: 22rpx;
  font-style: italic;
  color: #8e8e93;
  display: block;
}

.developer-info {
  font-size: 18rpx;
  color: #444446;
  font-weight: 600;
  margin-top: 10rpx;
  display: block;
  letter-spacing: 2rpx;
}

/* 全局高透卡片拟态规则 */
.glassmorphism {
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
}

.fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
