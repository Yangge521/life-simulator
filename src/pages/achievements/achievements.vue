<template>
  <view class="container">
    <!-- 头部 -->
    <view class="header">
      <text class="title">🏆 成就殿堂</text>
      <text class="subtitle">已解锁 {{ unlockedCount }} / {{ totalCount }} 个</text>
      <view class="points-bar">
        <text class="points">成就点数：{{ totalPoints }}</text>
        <view class="progress-bar">
          <view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
        </view>
      </view>
    </view>
    
    <!-- 分类标签 -->
    <scroll-view scroll-x class="category-tabs">
      <view 
        v-for="(cat, index) in categories" 
        :key="cat.id"
        class="tab-item"
        :class="{ active: currentCategory === cat.id }"
        @click="currentCategory = cat.id"
      >
        <text class="tab-icon">{{ cat.icon }}</text>
        <text class="tab-name">{{ cat.name }}</text>
      </view>
    </scroll-view>
    
    <!-- 成就列表 -->
    <scroll-view scroll-y class="achievement-list">
      <view 
        v-for="(achievement, aIdx) in filteredAchievements" 
        :key="achievement.id"
        class="achievement-card"
        :class="{ unlocked: isUnlocked(achievement.id), locked: !isUnlocked(achievement.id), hidden: achievement.hidden && !isUnlocked(achievement.id) }"
      >
        <view class="achievement-icon-wrap">
          <text class="achievement-icon">{{ isUnlocked(achievement.id) ? achievement.icon : '🔒' }}</text>
        </view>
        <view class="achievement-info">
          <text class="achievement-name">{{ isUnlocked(achievement.id) ? achievement.name : '???' }}</text>
          <text class="achievement-desc">{{ isUnlocked(achievement.id) ? achievement.description : '尚未解锁' }}</text>
          <view class="achievement-rarity" :style="{ color: getRarityColor(achievement.rarity) }">
            {{ getRarityName(achievement.rarity) }}
          </view>
        </view>
        <view class="achievement-points" v-if="isUnlocked(achievement.id)">
          <text class="points-value">+{{ getPoints(achievement.rarity) }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getAllAchievements, rarityColors, calculateAchievementPoints } from '@/utils/achievements.js'

export default {
  data() {
    return {
      currentCategory: 'all',
      categories: [
        { id: 'all', name: '全部', icon: '🏆' },
        { id: 'life', name: '人生', icon: '👶' },
        { id: 'wealth', name: '财富', icon: '💰' },
        { id: 'intelligence', name: '智力', icon: '🧠' },
        { id: 'happiness', name: '幸福', icon: '😊' },
        { id: 'relationship', name: '感情', icon: '💕' },
        { id: 'career', name: '事业', icon: '💼' },
        { id: 'special', name: '特殊', icon: '⭐' }
      ],
      allAchievements: [],
      unlockedIds: []
    }
  },
  computed: {
    filteredAchievements() {
      if (this.currentCategory === 'all') {
        return this.allAchievements
      }
      return this.allAchievements.filter(a => a.category === this.currentCategory)
    },
    unlockedCount() {
      return this.unlockedIds.length
    },
    totalCount() {
      return this.allAchievements.length
    },
    progressPercent() {
      return this.totalCount > 0 ? (this.unlockedCount / this.totalCount * 100) : 0
    },
    totalPoints() {
      const unlocked = this.allAchievements.filter(a => this.unlockedIds.includes(a.id))
      return calculateAchievementPoints(unlocked)
    }
  },
  onLoad() {
    this.allAchievements = getAllAchievements()
    this.loadUnlockedAchievements()
  },
  methods: {
    loadUnlockedAchievements() {
      const character = uni.getStorageSync('currentCharacter')
      this.unlockedIds = (character && character._achievements) || []
    },
    isUnlocked(id) {
      return this.unlockedIds.includes(id)
    },
    getRarityColor(rarity) {
      return (rarityColors[rarity] && rarityColors[rarity].color) || '#9e9e9e'
    },
    getRarityName(rarity) {
      return (rarityColors[rarity] && rarityColors[rarity].name) || '普通'
    },
    getPoints(rarity) {
      const pointsMap = {
        common: 10,
        uncommon: 25,
        rare: 50,
        epic: 100,
        legendary: 200,
        mythic: 500
      }
      return pointsMap[rarity] || 10
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 20rpx;
  padding-bottom: 40rpx;
}

.header {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2));
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  text-align: center;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #ffd700;
  display: block;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 26rpx;
  color: #a0a0a0;
  display: block;
  margin-bottom: 20rpx;
}

.points-bar {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.points {
  font-size: 24rpx;
  color: #e0e0e0;
}

.progress-bar {
  height: 12rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ff8c00);
  border-radius: 6rpx;
  transition: width 0.3s;
}

.category-tabs {
  white-space: nowrap;
  margin-bottom: 20rpx;
}

.tab-item {
  display: inline-flex;
  align-items: center;
  gap: 10rpx;
  padding: 15rpx 25rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 30rpx;
  margin-right: 15rpx;
}

.tab-item.active {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 140, 0, 0.3));
  border: 1rpx solid rgba(255, 215, 0, 0.5);
}

.tab-icon {
  font-size: 24rpx;
}

.tab-name {
  font-size: 24rpx;
  color: #e0e0e0;
}

.achievement-list {
  max-height: calc(100vh - 300rpx);
}

.achievement-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
  padding: 25rpx;
  margin-bottom: 15rpx;
  transition: all 0.3s;
}

.achievement-card.unlocked {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1));
  border: 1rpx solid rgba(255, 215, 0, 0.3);
}

.achievement-card.locked {
  opacity: 0.6;
}

.achievement-card.hidden {
  opacity: 0.3;
}

.achievement-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-icon {
  font-size: 40rpx;
}

.achievement-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.achievement-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 5rpx;
}

.achievement-desc {
  font-size: 24rpx;
  color: #a0a0a0;
  margin-bottom: 5rpx;
}

.achievement-rarity {
  font-size: 22rpx;
  font-weight: bold;
}

.achievement-points {
  padding: 10rpx 20rpx;
  background: rgba(74, 222, 128, 0.2);
  border-radius: 15rpx;
}

.points-value {
  font-size: 24rpx;
  color: #4ade80;
  font-weight: bold;
}
</style>
