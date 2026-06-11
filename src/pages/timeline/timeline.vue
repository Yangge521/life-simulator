<template>
  <view class="container">
    <view class="bg-gradient"></view>
    
    <view class="header">
      <view class="header-icon">⏳</view>
      <text class="title">时间回溯</text>
      <text class="subtitle">选择一个时间节点，重新开始那段人生</text>
    </view>

    <view class="filter-section">
      <scroll-view scroll-x class="filter-scroll" :show-scrollbar="false">
        <view class="filter-list">
          <view class="filter-btn" :class="{ active: currentFilter === 'all' }" @click="currentFilter = 'all'">
            <text class="filter-icon">📋</text>
            <text class="filter-text">全部</text>
          </view>
          <view v-for="(info, type) in milestoneTypes" :key="type" class="filter-btn" :class="{ active: currentFilter === type }" @click="currentFilter = type">
            <text class="filter-icon">{{ info.icon }}</text>
            <text class="filter-text">{{ info.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <scroll-view scroll-y class="timeline-scroll">
      <view class="timeline-container">
        <view v-for="(milestone, index) in filteredMilestones" :key="milestone.id" class="timeline-item" @click="selectMilestone(milestone)">
          <view class="timeline-line">
            <view class="timeline-dot" :style="{ background: milestone.typeInfo.color }">
              <text class="dot-icon">{{ milestone.typeInfo.icon }}</text>
            </view>
            <view class="line" v-if="index < filteredMilestones.length - 1"></view>
          </view>
          
          <view class="timeline-content">
            <view class="content-header">
              <view class="age-badge">{{ milestone.age }}岁</view>
              <view class="type-tag" :style="{ background: milestone.typeInfo.color + '20', borderColor: milestone.typeInfo.color + '40' }">
                <text :style="{ color: milestone.typeInfo.color }">{{ milestone.typeInfo.name }}</text>
              </view>
            </view>
            <text class="description">{{ milestone.description }}</text>
            
            <view class="snapshot-preview">
              <view class="snapshot-item">
                <text class="snapshot-icon">💰</text>
                <text class="snapshot-value">{{ milestone.snapshot.character.wealth }}</text>
              </view>
              <view class="snapshot-item">
                <text class="snapshot-icon">❤️</text>
                <text class="snapshot-value">{{ milestone.snapshot.character.health }}</text>
              </view>
              <view class="snapshot-item">
                <text class="snapshot-icon">😊</text>
                <text class="snapshot-value">{{ milestone.snapshot.character.happiness }}</text>
              </view>
              <view class="snapshot-item">
                <text class="snapshot-icon">🧠</text>
                <text class="snapshot-value">{{ milestone.snapshot.character.intelligence }}</text>
              </view>
            </view>
            
            <view class="rewind-hint">
              <text class="hint-icon">↩️</text>
              <text class="hint-text">点击回到这一刻</text>
            </view>
          </view>
        </view>

        <view v-if="filteredMilestones.length === 0" class="empty-state">
          <text class="empty-icon">📭</text>
          <text class="empty-text">暂无此类型的时间节点</text>
          <text class="empty-hint">继续你的人生旅程，创造更多回忆</text>
        </view>
      </view>
    </scroll-view>

    <!-- 里程碑详情弹窗 -->
    <view class="modal-mask" v-if="showDetail" @click="closeDetail">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-icon">{{ selectedMilestone ? selectedMilestone.typeInfo.icon : '⏪' }}</text>
          <text class="modal-title">时间节点详情</text>
        </view>
        <view class="modal-body" v-if="selectedMilestone">
          <view class="detail-type" v-if="selectedMilestone.typeInfo">
            <text :style="{ color: selectedMilestone.typeInfo.color }">{{ selectedMilestone.typeInfo.name }}</text>
          </view>
          <text class="modal-desc">在 <text class="highlight">{{ selectedMilestone.age }}岁</text> 发生了：</text>
          <view class="modal-event">
            <text class="event-text">"{{ selectedMilestone.description }}"</text>
          </view>
          <view class="detail-snapshot" v-if="selectedMilestone.snapshot && selectedMilestone.snapshot.character">
            <text class="snapshot-label">当时属性快照：</text>
            <view class="snapshot-grid">
              <text class="snapshot-item">💰 {{ selectedMilestone.snapshot.character.wealth }}</text>
              <text class="snapshot-item">❤️ {{ selectedMilestone.snapshot.character.health }}</text>
              <text class="snapshot-item">😊 {{ selectedMilestone.snapshot.character.happiness }}</text>
              <text class="snapshot-item">🧠 {{ selectedMilestone.snapshot.character.intelligence }}</text>
            </view>
          </view>
        </view>
        <view class="modal-actions">
          <view class="modal-btn cancel-btn" @click="closeDetail">
            <text>关闭</text>
          </view>
          <view class="modal-btn confirm-btn" @click="confirmRewindSimple">
            <text>简单回溯</text>
          </view>
          <view class="modal-btn memory-btn" @click="confirmRewindWithMemory">
            <text>带着记忆回溯</text>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-actions">
      <view class="action-btn back-btn" @click="goBack">
        <text class="btn-icon">←</text>
        <text class="btn-text">返回人生</text>
      </view>
    </view>
  </view>
</template>

<script>
import { milestoneTypes, rewindModes } from '@/utils/timelineData.js'

export default {
  data() {
    return {
      milestoneTypes,
      rewindModes,
      milestones: [],
      currentFilter: 'all',
      selectedMilestone: null,
      // 新增：详情弹窗 & 回溯模式选择
      showDetail: false,
      showRewindPicker: false,
      selectedModeIndex: 0,
      // 新增：假设推演
      showWhatIf: false,
      whatIfChoices: [],
      whatIfSelectedIndex: -1
    }
  },
  computed: {
    filteredMilestones() {
      if (this.currentFilter === 'all') return this.milestones
      return this.milestones.filter(function(m) { return m.type === this.currentFilter }.bind(this))
    }
  },
  onLoad() {
    this.loadMilestones()
  },
  methods: {
    loadMilestones() {
      this.milestones = uni.getStorageSync('lifeMilestones') || []
      this.milestones.sort(function(a, b) { return b.age - a.age })
    },
    selectMilestone(milestone) {
      this.selectedMilestone = milestone
      this.showDetail = true
    },
    closeDetail() {
      this.showDetail = false
    },
    // 简单回溯
    confirmRewindSimple() {
      if (!this.selectedMilestone) return
      const snapshot = this.selectedMilestone.snapshot
      uni.setStorageSync('currentCharacter', snapshot.character)
      uni.setStorageSync('lifeHistory', snapshot.history || [])
      if (snapshot.storyState) { uni.setStorageSync('storyState', snapshot.storyState) }
      const rewindAge = this.selectedMilestone.age
      const newMilestones = this.milestones.filter(function(m) { return m.age < rewindAge })
      uni.setStorageSync('lifeMilestones', newMilestones)
      uni.showToast({ title: '已回到' + rewindAge + '岁', icon: 'success' })
      this.showDetail = false
      setTimeout(function() { uni.redirectTo({ url: '/pages/life/life?rewind=true' }) }, 1000)
    },
    // 带着记忆回溯
    confirmRewindWithMemory() {
      if (!this.selectedMilestone) return
      const snapshot = JSON.parse(JSON.stringify(this.selectedMilestone.snapshot))
      snapshot.character.wisdom = Math.min(100, (snapshot.character.wisdom || 0) + 5)
      snapshot.character.intelligence = Math.min(100, (snapshot.character.intelligence || 0) + 3)
      uni.setStorageSync('currentCharacter', snapshot.character)
      uni.setStorageSync('lifeHistory', snapshot.history || [])
      if (snapshot.storyState) { uni.setStorageSync('storyState', snapshot.storyState) }
      const rewindAge = this.selectedMilestone.age
      const newMilestones = this.milestones.filter(function(m) { return m.age < rewindAge })
      uni.setStorageSync('lifeMilestones', newMilestones)
      uni.showToast({ title: '带着记忆回到' + rewindAge + '岁', icon: 'none' })
      this.showDetail = false
      setTimeout(function() { uni.redirectTo({ url: '/pages/life/life?rewind=true' }) }, 1000)
    },
    goBack() { uni.navigateBack() }
  }
}
</script>

<style scoped>
.container { 
  min-height: 100vh; 
  padding: 24rpx; 
  padding-bottom: calc(140rpx + constant(safe-area-inset-bottom)); 
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom)); 
  position: relative; 
  box-sizing: border-box;
}
.bg-gradient { position: absolute; top: 0; left: 0; right: 0; height: 360rpx; background: linear-gradient(180deg, rgba(255, 215, 0, 0.08) 0%, transparent 100%); pointer-events: none; }

.header { text-align: center; margin-bottom: 28rpx; position: relative; }
.header-icon { font-size: 54rpx; display: block; margin-bottom: 12rpx; }
.title { font-size: 40rpx; font-weight: bold; color: #fff; display: block; letter-spacing: 4rpx; }
.subtitle { font-size: 24rpx; color: rgba(255, 255, 255, 0.5); margin-top: 10rpx; display: block; }

.filter-section { margin-bottom: 24rpx; margin: 0 -24rpx 24rpx; padding: 0 24rpx; }
.filter-scroll { white-space: nowrap; }
.filter-list { display: inline-flex; gap: 12rpx; padding: 8rpx 0; }
.filter-btn { display: inline-flex; flex-direction: column; align-items: center; padding: 14rpx 20rpx; background: rgba(255, 255, 255, 0.03); border-radius: 18rpx; border: 2rpx solid rgba(255, 255, 255, 0.08); min-width: 90rpx; }
.filter-btn.active { background: rgba(255, 215, 0, 0.1); border-color: rgba(255, 215, 0, 0.4); }
.filter-icon { font-size: 26rpx; margin-bottom: 4rpx; }
.filter-text { font-size: 20rpx; color: rgba(255, 255, 255, 0.6); }
.filter-btn.active .filter-text { color: #ffd700; }

.timeline-scroll { height: calc(100vh - 360rpx); }
.timeline-container { padding: 8rpx 0; }

.timeline-item { display: flex; margin-bottom: 20rpx; }
.timeline-line { width: 60rpx; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.timeline-dot { width: 50rpx; height: 50rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3); }
.dot-icon { font-size: 24rpx; }
.line { width: 3rpx; flex: 1; background: linear-gradient(180deg, rgba(255, 215, 0, 0.3), rgba(255, 255, 255, 0.1)); margin-top: 6rpx; border-radius: 2rpx; }

.timeline-content { flex: 1; background: rgba(255, 255, 255, 0.03); border-radius: 18rpx; padding: 20rpx; margin-left: 12rpx; border: 1rpx solid rgba(255, 255, 255, 0.06); min-width: 0; }
.timeline-content:active { background: rgba(255, 255, 255, 0.06); }
.content-header { display: flex; align-items: center; gap: 10rpx; margin-bottom: 12rpx; flex-wrap: wrap; }
.age-badge { font-size: 26rpx; font-weight: bold; color: #ffd700; background: rgba(255, 215, 0, 0.15); padding: 4rpx 14rpx; border-radius: 14rpx; }
.type-tag { font-size: 20rpx; padding: 4rpx 12rpx; border-radius: 10rpx; border: 1rpx solid; }
.description { font-size: 28rpx; color: #fff; line-height: 1.5; display: block; margin-bottom: 14rpx; word-break: break-all; }

.snapshot-preview { display: flex; gap: 16rpx; margin-bottom: 14rpx; padding: 12rpx; background: rgba(255, 255, 255, 0.03); border-radius: 10rpx; flex-wrap: wrap; }
.snapshot-item { display: flex; align-items: center; gap: 4rpx; }
.snapshot-icon { font-size: 18rpx; }
.snapshot-value { font-size: 22rpx; color: rgba(255, 255, 255, 0.7); font-weight: 500; }

.rewind-hint { display: flex; align-items: center; justify-content: flex-end; gap: 6rpx; }
.hint-icon { font-size: 20rpx; }
.hint-text { font-size: 22rpx; color: rgba(102, 126, 234, 0.9); }

.empty-state { text-align: center; padding: 80rpx 32rpx; }
.empty-icon { font-size: 70rpx; display: block; margin-bottom: 20rpx; }
.empty-text { font-size: 28rpx; color: rgba(255, 255, 255, 0.5); display: block; margin-bottom: 10rpx; }
.empty-hint { font-size: 24rpx; color: rgba(255, 255, 255, 0.3); }

.modal-mask { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.85); display: flex; align-items: center; justify-content: center; z-index: 999; padding: 32rpx; box-sizing: border-box; }
.modal-content { width: 100%; max-width: 580rpx; background: linear-gradient(180deg, #1e1e3f 0%, #151528 100%); border-radius: 28rpx; padding: 36rpx; border: 2rpx solid rgba(255, 215, 0, 0.2); box-sizing: border-box; }
.modal-header { text-align: center; margin-bottom: 24rpx; }
.modal-icon { font-size: 50rpx; display: block; margin-bottom: 10rpx; }
.modal-title { font-size: 32rpx; font-weight: bold; color: #fff; }
.modal-body { margin-bottom: 28rpx; }
.modal-desc { font-size: 28rpx; color: rgba(255, 255, 255, 0.8); display: block; text-align: center; margin-bottom: 16rpx; }
.highlight { color: #ffd700; font-weight: bold; }
.modal-event { background: rgba(255, 255, 255, 0.05); border-radius: 14rpx; padding: 16rpx; margin-bottom: 16rpx; }
.event-text { font-size: 26rpx; color: rgba(255, 255, 255, 0.6); font-style: italic; text-align: center; display: block; }
.modal-warning { display: flex; align-items: center; justify-content: center; gap: 6rpx; }
.warning-icon { font-size: 22rpx; }
.warning-text { font-size: 24rpx; color: #f87171; }
.modal-actions { display: flex; gap: 16rpx; }
.modal-btn { flex: 1; padding: 22rpx; border-radius: 18rpx; text-align: center; }
.modal-btn text { font-size: 28rpx; font-weight: 600; }
.cancel-btn { background: rgba(255, 255, 255, 0.08); }
.cancel-btn text { color: rgba(255, 255, 255, 0.6); }
.confirm-btn { background: linear-gradient(135deg, #667eea, #764ba2); }
.confirm-btn text { color: #fff; }

.bottom-actions { 
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  padding: 20rpx 24rpx; 
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom)); 
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); 
  background: linear-gradient(transparent, rgba(15, 15, 35, 0.98) 30%); 
}
.action-btn { display: flex; align-items: center; justify-content: center; gap: 8rpx; padding: 24rpx; border-radius: 18rpx; }
.back-btn { background: rgba(255, 255, 255, 0.08); border: 1rpx solid rgba(255, 255, 255, 0.15); }
.btn-icon { font-size: 26rpx; color: rgba(255, 255, 255, 0.8); }
.btn-text { font-size: 28rpx; color: rgba(255, 255, 255, 0.8); font-weight: 500; }

/* 新增：详情弹窗样式 */
.detail-type { font-size: 28rpx; font-weight: bold; margin-bottom: 12rpx; text-align: center; }
.detail-snapshot { margin-top: 16rpx; padding: 16rpx; background: rgba(255, 255, 255, 0.05); border-radius: 12rpx; }
.snapshot-label { font-size: 24rpx; color: rgba(255, 255, 255, 0.6); margin-bottom: 8rpx; display: block; }
.snapshot-grid { display: flex; flex-wrap: wrap; gap: 12rpx; }
.snapshot-grid text { font-size: 22rpx; color: rgba(255, 255, 255, 0.8); }
.memory-btn { background: linear-gradient(135deg, #f093fb, #f5576c); }
.memory-btn text { color: #fff; }
</style>
