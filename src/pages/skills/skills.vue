<template>
  <view class="container">
    <view class="header">
      <text class="title">📊 技能树</text>
      <text class="subtitle">已学习 {{ learnedCount }} 个技能</text>
    </view>

    <!-- 分类标签 -->
    <scroll-view scroll-x class="category-tabs">
      <view 
        v-for="cat in categories" :key="cat.id"
        class="tab-item" :class="{ active: currentCat === cat.id }"
        @click="currentCat = cat.id"
      >
        <text class="tab-icon">{{ cat.icon }}</text>
        <text class="tab-name">{{ cat.name }}</text>
      </view>
    </scroll-view>

    <!-- 技能列表 -->
    <scroll-view scroll-y class="skill-list">
      <view 
        v-for="sub in currentSubSkills" :key="sub.id"
        class="skill-card"
      >
        <view class="skill-header">
          <text class="skill-icon">{{ sub.icon }}</text>
          <text class="skill-name">{{ sub.name }}</text>
          <view class="skill-level">
            <text class="level-text">Lv.{{ getLevel(sub.id) }}/{{ maxLevel }}</text>
          </view>
        </view>
        <!-- 进度条 -->
        <view class="progress-bar">
          <view class="progress-fill" :style="{ width: getLevel(sub.id) / maxLevel * 100 + '%' }"></view>
        </view>
        <!-- 等级奖励 -->
        <view class="level-milestones">
          <view 
            v-for="lv in sub.levels" :key="lv.level"
            class="milestone" :class="{ unlocked: getLevel(sub.id) >= lv.level }"
          >
            <text class="milestone-level">Lv.{{ lv.level }}</text>
            <text class="milestone-name">{{ lv.name }}</text>
            <view class="milestone-bonuses">
              <text v-for="(val, key) in lv.bonus" :key="key" class="bonus-tag positive">
                {{ key === 'intelligence' ? '🧠' : key === 'creativity' ? '🎨' : key === 'charm' ? '✨' : key === 'health' ? '❤️' : key === 'happiness' ? '😊' : key === 'wisdom' ? '📖' : key === 'social' ? '👥' : key === 'wealth' ? '💰' : '📊' }}{{ val > 0 ? '+' : '' }}{{ val }}
              </text>
            </view>
            <text v-if="lv.unlockEvent" class="unlock-hint">🔓 解锁特殊事件</text>
            <view v-if="lv.unlockCareer" class="unlock-careers">
              <text v-for="c in lv.unlockCareer" :key="c" class="career-tag">{{ c }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { skillTree, initSkillState } from '@/utils/skillTree.js'

export default {
  data() {
    return {
      currentCat: 'academic',
      skillState: initSkillState(),
      categories: [],
      maxLevel: 10
    }
  },
  computed: {
    currentSubSkills() {
      var cat = skillTree[this.currentCat]
      return cat ? cat.subSkills : []
    },
    learnedCount() {
      var count = 0
      var cats = Object.keys(this.skillState)
      for (var i = 0; i < cats.length; i++) {
        var subs = this.skillState[cats[i]]
        var subKeys = Object.keys(subs)
        for (var j = 0; j < subKeys.length; j++) {
          if (subs[subKeys[j]] > 0) count++
        }
      }
      return count
    }
  },
  onLoad() {
    var catKeys = Object.keys(skillTree)
    this.categories = catKeys.map(function(k) { return { id: k, name: skillTree[k].name, icon: skillTree[k].icon } })
    
    var character = uni.getStorageSync('currentCharacter')
    if (character && character._skills) {
      this.skillState = character._skills
    }
    if (this.currentCat && skillTree[this.currentCat]) {
      this.maxLevel = skillTree[this.currentCat].maxLevel || 10
    }
  },
  methods: {
    getLevel(subId) {
      return this.skillState[this.currentCat] ? (this.skillState[this.currentCat][subId] || 0) : 0
    }
  },
  watch: {
    currentCat(newVal) {
      if (skillTree[newVal]) {
        this.maxLevel = skillTree[newVal].maxLevel || 10
      }
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
  text-align: center;
  margin-bottom: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffd700;
  display: block;
}

.subtitle {
  font-size: 24rpx;
  color: #a0a0a0;
  display: block;
  margin-top: 5rpx;
}

.category-tabs {
  white-space: nowrap;
  margin-bottom: 20rpx;
}

.tab-item {
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 20rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25rpx;
  margin-right: 12rpx;
}

.tab-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  border: 1rpx solid rgba(102, 126, 234, 0.5);
}

.tab-icon { font-size: 22rpx; }
.tab-name { font-size: 24rpx; color: #e0e0e0; }

.skill-list {
  max-height: calc(100vh - 220rpx);
}

.skill-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
  padding: 25rpx;
  margin-bottom: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.skill-header {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.skill-icon { font-size: 36rpx; margin-right: 15rpx; }
.skill-name { font-size: 30rpx; font-weight: bold; color: #fff; flex: 1; }
.level-text { font-size: 24rpx; color: #ffd700; }

.progress-bar {
  height: 12rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 6rpx;
  transition: width 0.3s;
}

.level-milestones {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.milestone {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10rpx;
  padding: 12rpx;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.03);
  opacity: 0.5;
}

.milestone.unlocked {
  opacity: 1;
  background: rgba(74, 222, 128, 0.08);
  border: 1rpx solid rgba(74, 222, 128, 0.2);
}

.milestone-level {
  font-size: 22rpx;
  color: #4facfe;
  font-weight: bold;
  width: 70rpx;
}

.milestone-name {
  font-size: 24rpx;
  color: #e0e0e0;
  flex: 1;
}

.milestone-bonuses {
  display: flex;
  gap: 6rpx;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 80rpx;
}

.bonus-tag.positive {
  font-size: 20rpx;
  padding: 3rpx 8rpx;
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
  border-radius: 6rpx;
}

.unlock-hint {
  font-size: 20rpx;
  color: #ffd700;
  width: 100%;
  padding-left: 80rpx;
}

.unlock-careers {
  display: flex;
  gap: 6rpx;
  width: 100%;
  padding-left: 80rpx;
}

.career-tag {
  font-size: 20rpx;
  padding: 3rpx 10rpx;
  background: rgba(79, 172, 254, 0.15);
  color: #4facfe;
  border-radius: 6rpx;
}
</style>
