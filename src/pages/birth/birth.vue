<template>
  <view class="container">
    <!-- iOS 状态栏模拟 -->
    <view class="ios-status-bar">
      <text class="status-time">{{ timeString }}</text>
      <view class="dynamic-island"></view>
      <view class="status-icons">
        <text class="status-icon">📶</text>
        <text class="status-icon">🔋</text>
      </view>
    </view>

    <!-- 弥散极光背景 -->
    <view class="aurora-bg">
      <view class="aurora-circle circle-blue"></view>
      <view class="aurora-circle circle-purple"></view>
    </view>
    
    <!-- 精美头部标题 -->
    <view class="header fade-in">
      <view class="header-icon-wrap">
        <text class="header-icon">👶</text>
      </view>
      <text class="title">选择你的出生</text>
      <text class="subtitle">每个微小的抉择，都将重塑整个人生轨迹</text>
    </view>

    <!-- ─────────────────── SECTION 1: 选择性别 ─────────────────── -->
    <view class="section fade-in">
      <view class="section-header">
        <text class="section-icon">⚖️</text>
        <text class="section-title">选择性别</text>
      </view>
      <view class="gender-options">
        <view 
          class="gender-btn male-btn" 
          :class="{ active: gender === 'male' }"
          @click="selectGender('male')"
        >
          <view class="gender-icon-circle male">
            <text class="gender-emoji">👦</text>
          </view>
          <view class="gender-info">
            <text class="gender-label">男性 · Male</text>
            <text class="gender-desc">阳光坚毅，理性探索</text>
          </view>
          <view class="gender-check" v-if="gender === 'male'">✓</view>
        </view>
        
        <view 
          class="gender-btn female-btn" 
          :class="{ active: gender === 'female' }"
          @click="selectGender('female')"
        >
          <view class="gender-icon-circle female">
            <text class="gender-emoji">👧</text>
          </view>
          <view class="gender-info">
            <text class="gender-label">女性 · Female</text>
            <text class="gender-desc">温柔聪慧，感性创造</text>
          </view>
          <view class="gender-check" v-if="gender === 'female'">✓</view>
        </view>
      </view>
    </view>

    <!-- ─────────────────── SECTION 2: 选择家庭 ─────────────────── -->
    <view class="section fade-in">
      <view class="section-header">
        <text class="section-icon">🏠</text>
        <text class="section-title">选择家庭</text>
        <text class="section-hint">左右滑动，挑选不同的成长起点 ›</text>
      </view>
      <scroll-view scroll-x class="family-scroll" :show-scrollbar="false">
        <view class="family-list">
          <view 
            v-for="family in familyTypes" 
            :key="family.id"
            class="family-card glassmorphism"
            :class="{ active: selectedFamily && selectedFamily.id === family.id }"
            @click="selectFamily(family)"
          >
            <view class="family-card-glow" v-if="selectedFamily && selectedFamily.id === family.id"></view>
            <view class="family-card-header">
              <view class="fam-icon-wrap">
                <text class="fam-icon">{{ family.icon }}</text>
              </view>
              <view class="family-check" v-if="selectedFamily && selectedFamily.id === family.id">✓</view>
            </view>
            <text class="family-name">{{ family.name }}</text>
            <text class="family-desc">{{ family.description }}</text>
            
            <!-- 精致家庭属性条 -->
            <view class="family-stats">
              <view class="stat-row">
                <text class="stat-label">💰 财富</text>
                <view class="stat-bar">
                  <view class="stat-fill wealth" :style="{ width: family.wealth + '%' }"></view>
                </view>
                <text class="stat-num">{{ family.wealth }}</text>
              </view>
              <view class="stat-row">
                <text class="stat-label">📚 教育</text>
                <view class="stat-bar">
                  <view class="stat-fill education" :style="{ width: family.education + '%' }"></view>
                </view>
                <text class="stat-num">{{ family.education }}</text>
              </view>
              <view class="stat-row">
                <text class="stat-label">😊 幸福</text>
                <view class="stat-bar">
                  <view class="stat-fill happiness" :style="{ width: family.happiness + '%' }"></view>
                </view>
                <text class="stat-num">{{ family.happiness }}</text>
              </view>
            </view>
            <!-- 特质徽章 -->
            <view class="family-traits">
              <text v-for="trait in family.traits" :key="trait" class="trait-tag">{{ trait }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- ─────────────────── SECTION 3: 天资加点分配 [NEW PLAY] ─────────────────── -->
    <view class="section fade-in" v-if="selectedFamily">
      <view class="section-header">
        <text class="section-icon">🧠</text>
        <text class="section-title">天资点数分配</text>
        <view class="points-badge" :class="{ empty: remainingCustomPoints === 0 }">
          <text class="points-badge-text">剩余天资 💎 {{ remainingCustomPoints }}</text>
        </view>
      </view>
      
      <view class="stat-allocator-panel glassmorphism">
        <view class="alloc-row">
          <view class="alloc-label-wrap">
            <text class="alloc-icon">🧠</text>
            <view class="alloc-text-wrap">
              <text class="alloc-stat-name">智商 (Intelligence)</text>
              <text class="alloc-stat-desc">影响学术考研、考博上岸概率与科研职业</text>
            </view>
          </view>
          <view class="alloc-controller">
            <view class="alloc-btn minus" :class="{ disabled: intelligencePoints <= 0 }" @click="adjustStat('intelligence', -1)">-</view>
            <text class="alloc-value">{{ 50 + intelligencePoints }}</text>
            <view class="alloc-btn plus" :class="{ disabled: remainingCustomPoints <= 0 }" @click="adjustStat('intelligence', 1)">+</view>
          </view>
        </view>

        <view class="alloc-row">
          <view class="alloc-label-wrap">
            <text class="alloc-icon">✨</text>
            <view class="alloc-text-wrap">
              <text class="alloc-stat-name">魅力 (Charm)</text>
              <text class="alloc-stat-desc">影响相亲速配度、演艺界与交友成功率</text>
            </view>
          </view>
          <view class="alloc-controller">
            <view class="alloc-btn minus" :class="{ disabled: charmPoints <= 0 }" @click="adjustStat('charm', -1)">-</view>
            <text class="alloc-value">{{ 50 + charmPoints }}</text>
            <view class="alloc-btn plus" :class="{ disabled: remainingCustomPoints <= 0 }" @click="adjustStat('charm', 1)">+</view>
          </view>
        </view>

        <view class="alloc-row">
          <view class="alloc-label-wrap">
            <text class="alloc-icon">🎨</text>
            <view class="alloc-text-wrap">
              <text class="alloc-stat-name">创造力 (Creativity)</text>
              <text class="alloc-stat-desc">极客与设计师核心，影响设计大奖与艺术路线</text>
            </view>
          </view>
          <view class="alloc-controller">
            <view class="alloc-btn minus" :class="{ disabled: creativityPoints <= 0 }" @click="adjustStat('creativity', -1)">-</view>
            <text class="alloc-value">{{ 50 + creativityPoints }}</text>
            <view class="alloc-btn plus" :class="{ disabled: remainingCustomPoints <= 0 }" @click="adjustStat('creativity', 1)">+</view>
          </view>
        </view>

        <view class="alloc-row">
          <view class="alloc-label-wrap">
            <text class="alloc-icon">❤️</text>
            <view class="alloc-text-wrap">
              <text class="alloc-stat-name">健康 (Health)</text>
              <text class="alloc-stat-desc">生命根本，抗疾病、抗996及防突发意外</text>
            </view>
          </view>
          <view class="alloc-controller">
            <view class="alloc-btn minus" :class="{ disabled: healthPoints <= 0 }" @click="adjustStat('health', -1)">-</view>
            <text class="alloc-value">{{ (selectedFamily.health || 70) + healthPoints }}</text>
            <view class="alloc-btn plus" :class="{ disabled: remainingCustomPoints <= 0 }" @click="adjustStat('health', 1)">+</view>
          </view>
        </view>

        <view class="alloc-row">
          <view class="alloc-label-wrap">
            <text class="alloc-icon">👥</text>
            <view class="alloc-text-wrap">
              <text class="alloc-stat-name">情商 (Social)</text>
              <text class="alloc-stat-desc">职场核心，影响体制内晋升与人脉朋友圈神评</text>
            </view>
          </view>
          <view class="alloc-controller">
            <view class="alloc-btn minus" :class="{ disabled: socialPoints <= 0 }" @click="adjustStat('social', -1)">-</view>
            <text class="alloc-value">{{ 50 + socialPoints }}</text>
            <view class="alloc-btn plus" :class="{ disabled: remainingCustomPoints <= 0 }" @click="adjustStat('social', 1)">+</view>
          </view>
        </view>
      </view>
    </view>

    <!-- ─────────────────── SECTION 4: 姓名输入 ─────────────────── -->
    <view class="section fade-in">
      <view class="section-header">
        <text class="section-icon">✏️</text>
        <text class="section-title">起个大名</text>
      </view>
      <view class="name-input-wrap">
        <view class="input-container glassmorphism">
          <input 
            class="name-input" 
            v-model="characterName" 
            placeholder="请输入您的名字"
            placeholder-class="input-placeholder"
            maxlength="10"
          />
        </view>
        <view class="random-name-btn" @click="randomizeName">
          <text class="random-icon">🎲</text>
          <text class="random-text">天赐</text>
        </view>
      </view>
    </view>

    <!-- ─────────────────── SECTION 5: 轮回继承 ─────────────────── -->
    <view class="section fade-in" v-if="isInheritanceMode && inheritanceOverview && inheritanceOverview.totalPoints > 0">
      <view class="section-header">
        <text class="section-icon">💫</text>
        <text class="section-title">轮回继承</text>
        <view class="inheritance-points-badge">
          <text class="badge-icon">💎</text>
          <text class="badge-value">{{ remainingPoints }}</text>
          <text class="badge-label">传承剩余</text>
        </view>
      </view>
      <view class="inheritance-intro">
        <text class="intro-text">已累计 {{ inheritanceOverview.totalPoints }} 传承点，可点选加成开局：</text>
      </view>
      <view class="inheritance-grid">
        <view 
          v-for="inh in inheritanceTypes" 
          :key="inh.id"
          class="inheritance-card glassmorphism"
          :class="[
            inh.rarity || 'common',
            { 
              'selected': isInheritanceSelected(inh),
              'maxed': inh.maxed || inh.currentLevel >= inh.maxLevel,
              'disabled': !canSelectInheritance(inh)
            }
          ]"
          @click="toggleInheritance(inh)"
        >
          <view class="inh-header">
            <text class="inh-icon">{{ inh.icon }}</text>
            <view class="inh-levels" v-if="inh.maxLevel > 1">
              <text v-for="i in inh.maxLevel" :key="i" class="level-dot" :class="{ active: i <= (inh.currentLevel + (isInheritanceSelected(inh) ? 1 : 0)) }"></text>
            </view>
          </view>
          <text class="inh-name">{{ inh.name }}</text>
          <text class="inh-desc">{{ inh.description }}</text>
          <view class="inh-effect" v-if="inh.effect">
            <text class="effect-text" v-for="(val, key) in inh.effect" :key="key">
              {{ key === 'wealth' ? '💰' : key === 'intelligence' ? '🧠' : key === 'happiness' ? '😊' : key === 'health' ? '❤️' : key === 'social' ? '👥' : key === 'charm' ? '✨' : key === 'wisdom' ? '📖' : key === 'creativity' ? '🎨' : '' }}+{{ val }}
            </text>
          </view>
          <text class="inh-cost" v-if="!inh.maxed">
            💎 {{ (inh.cost * (inh.currentLevel + 1)) }}
          </text>
          <text class="inh-maxed" v-else>已满级</text>
        </view>
      </view>
      <view class="inheritance-summary" v-if="selectedInheritances.length > 0">
        <text class="summary-text">已点选 {{ selectedInheritances.length }} 项，共耗 💎 {{ totalInheritanceCost }} 传承点</text>
      </view>
    </view>

    <!-- ─────────────────── SECTION 6: 即将出生机票 ─────────────────── -->
    <view class="preview-section fade-in" v-if="canStart">
      <view class="preview-card glassmorphism">
        <view class="ticket-header">
          <text class="ticket-brand">🌟 DESTINY TICKET</text>
          <text class="ticket-title">命运之旅登机牌</text>
        </view>
        <view class="preview-content">
          <view class="preview-avatar-wrap">
            <text class="preview-avatar">{{ gender === 'male' ? '👦' : '👧' }}</text>
          </view>
          <view class="preview-info">
            <view class="preview-name-row">
              <text class="preview-name">{{ characterName }}</text>
              <text class="preview-gender-tag" :class="gender">{{ gender === 'male' ? '♂ 男' : '♀ 女' }}</text>
            </view>
            <text class="preview-family">出生门第：{{ selectedFamily ? selectedFamily.name : '' }}</text>
            
            <!-- 新属性预览 -->
            <view class="attrs-preview">
              <text class="attr-preview-tag">🧠 智:{{ 50 + intelligencePoints }}</text>
              <text class="attr-preview-tag">✨ 魅:{{ 50 + charmPoints }}</text>
              <text class="attr-preview-tag">🎨 创:{{ 50 + creativityPoints }}</text>
              <text class="attr-preview-tag">❤️ 康:{{ (selectedFamily ? selectedFamily.health : 70) + healthPoints }}</text>
              <text class="attr-preview-tag">👥 商:{{ 50 + socialPoints }}</text>
            </view>
            
            <!-- 天赋特质 -->
            <view class="talent-preview" v-if="rolledTalents.length > 0">
              <view 
                v-for="t in rolledTalents" 
                :key="t.id" 
                class="talent-chip"
                :class="t.rarity"
              >
                <text class="talent-chip-icon">{{ t.icon }}</text>
                <text class="talent-chip-name">{{ t.name }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- ─────────────────── SECTION 7: 开始按钮 ─────────────────── -->
    <view class="start-section">
      <view 
        class="start-btn" 
        :class="{ disabled: !canStart, ready: canStart }"
        @click="startLife"
      >
        <view class="start-glow" v-if="canStart"></view>
        <text class="start-icon">🚀</text>
        <text class="start-text">开启人生新旅程</text>
      </view>
      <text class="start-hint" v-if="!canStart">请完成以上所有人生配置</text>
    </view>
  </view>
</template>

<script>
import { familyTypes } from '@/utils/gameData.js'
import { generateRandomName } from '@/utils/gameEngine.js'
import { rollTalents, applyTalentPassives, talentRarity } from '@/utils/talents.js'
import { initSkillState } from '@/utils/skillTree.js'
import { getInheritanceOverview, applyInheritance, inheritanceTypes } from '@/utils/inheritanceSystem.js'

export default {
  data() {
    return {
      familyTypes,
      inheritanceTypes,
      gender: '',
      selectedFamily: null,
      characterName: '',
      isRandom: false,
      rolledTalents: [],
      talentRarity,
      
      // 轮回系统
      isInheritanceMode: false,
      inheritanceOverview: null,
      selectedInheritances: [],
      
      // 初始天资加点
      intelligencePoints: 0,
      charmPoints: 0,
      creativityPoints: 0,
      healthPoints: 0,
      socialPoints: 0,
      
      timeString: '18:49',
      timeTimer: null
    }
  },
  computed: {
    canStart() {
      return this.gender && this.selectedFamily && this.characterName.trim() && this.remainingCustomPoints === 0
    },
    remainingCustomPoints() {
      return 20 - (this.intelligencePoints + this.charmPoints + this.creativityPoints + this.healthPoints + this.socialPoints)
    },
    totalInheritanceCost() {
      return this.selectedInheritances.reduce((sum, inh) => {
        const currentLevel = ((this.inheritanceOverview && this.inheritanceOverview.unlockedInheritances && this.inheritanceOverview.unlockedInheritances[inh.id]) || 0)
        return sum + (inh.cost * (currentLevel + 1))
      }, 0)
    },
    remainingPoints() {
      if (!this.inheritanceOverview) return 0
      return this.inheritanceOverview.totalPoints - this.totalInheritanceCost
    }
  },
  watch: {
    selectedFamily(newFam) {
      this.rollTalents()
      // 每次切换家庭，重置健康点数分配，避免越界
      this.healthPoints = 0
    },
    gender() {
      this.rollTalents()
    }
  },
  onLoad(options) {
    this.updateTime()
    this.timeTimer = setInterval(this.updateTime, 30000)

    if (options.mode === 'inheritance') {
      this.isInheritanceMode = true
      this.loadInheritanceData()
    }
    
    if (options.random === 'true') {
      this.isRandom = true
      this.randomizeAll()
    }
  },
  onUnload() {
    if (this.timeTimer) {
      clearInterval(this.timeTimer)
    }
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      this.timeString = `${hours}:${minutes}`
    },
    selectGender(gender) {
      this.gender = gender
      if (!this.characterName) {
        this.randomizeName()
      }
    },
    selectFamily(family) {
      this.selectedFamily = family
    },
    rollTalents() {
      if (this.selectedFamily) {
        this.rolledTalents = rollTalents(this.selectedFamily)
      }
    },
    randomizeName() {
      this.characterName = generateRandomName(this.gender || 'male')
    },
    adjustStat(stat, delta) {
      if (delta > 0) {
        if (this.remainingCustomPoints > 0) {
          if (stat === 'intelligence') this.intelligencePoints++
          if (stat === 'charm') this.charmPoints++
          if (stat === 'creativity') this.creativityPoints++
          if (stat === 'health') this.healthPoints++
          if (stat === 'social') this.socialPoints++
        }
      } else {
        if (stat === 'intelligence' && this.intelligencePoints > 0) this.intelligencePoints--
        if (stat === 'charm' && this.charmPoints > 0) this.charmPoints--
        if (stat === 'creativity' && this.creativityPoints > 0) this.creativityPoints--
        if (stat === 'health' && this.healthPoints > 0) this.healthPoints--
        if (stat === 'social' && this.socialPoints > 0) this.socialPoints--
      }
    },
    randomizeAll() {
      this.gender = Math.random() > 0.5 ? 'male' : 'female'
      this.selectedFamily = this.familyTypes[Math.floor(Math.random() * this.familyTypes.length)]
      this.characterName = generateRandomName(this.gender)
      
      // 随机分配 20 个点数到 5 个属性中
      this.intelligencePoints = 0
      this.charmPoints = 0
      this.creativityPoints = 0
      this.healthPoints = 0
      this.socialPoints = 0
      
      const stats = ['intelligence', 'charm', 'creativity', 'health', 'social']
      for (let i = 0; i < 20; i++) {
        const selectedStat = stats[Math.floor(Math.random() * stats.length)]
        if (selectedStat === 'intelligence') this.intelligencePoints++
        if (selectedStat === 'charm') this.charmPoints++
        if (selectedStat === 'creativity') this.creativityPoints++
        if (selectedStat === 'health') this.healthPoints++
        if (selectedStat === 'social') this.socialPoints++
      }
    },
    loadInheritanceData() {
      const savedData = uni.getStorageSync('inheritanceData') || {}
      this.inheritanceOverview = getInheritanceOverview(savedData)
    },
    toggleInheritance(inh) {
      if (inh.maxed) return
      if (inh.currentLevel >= inh.maxLevel) return
      
      const idx = this.selectedInheritances.findIndex(s => s.id === inh.id)
      if (idx >= 0) {
        this.selectedInheritances.splice(idx, 1)
      } else {
        const currentLevel = ((this.inheritanceOverview && this.inheritanceOverview.unlockedInheritances && this.inheritanceOverview.unlockedInheritances[inh.id]) || 0)
        const cost = inh.cost * (currentLevel + 1)
        if (this.remainingPoints >= cost) {
          this.selectedInheritances.push(inh)
        }
      }
    },
    isInheritanceSelected(inh) {
      return this.selectedInheritances.some(s => s.id === inh.id)
    },
    canSelectInheritance(inh) {
      if (inh.maxed) return false
      const currentLevel = ((this.inheritanceOverview && this.inheritanceOverview.unlockedInheritances && this.inheritanceOverview.unlockedInheritances[inh.id]) || 0)
      const cost = inh.cost * (currentLevel + 1)
      return this.remainingPoints >= cost
    },
    startLife() {
      if (!this.canStart) return
      
      var baseCharacter = {
        name: this.characterName,
        gender: this.gender,
        family: this.selectedFamily,
        age: 0,
        wealth: this.selectedFamily.wealth,
        education: this.selectedFamily.education,
        happiness: this.selectedFamily.happiness,
        health: (this.selectedFamily.health || 70) + this.healthPoints,
        intelligence: 50 + this.intelligencePoints,
        social: 50 + this.socialPoints,
        charm: 50 + this.charmPoints,
        wisdom: 30,
        creativity: 50 + this.creativityPoints,
        usedChoiceEvents: [],
        usedStoryEvents: [],
        tags: [],
        _flags: [],
        _achievements: [],
        _storyLines: [],
        _usedFates: [],
        _talents: this.rolledTalents,
        _skills: initSkillState()
      }
      
      // 应用天赋被动效果
      var character = applyTalentPassives(baseCharacter, this.rolledTalents)
      
      // 应用传承点加成
      if (this.selectedInheritances.length > 0) {
        character = applyInheritance(character, this.selectedInheritances)
        
        const savedData = uni.getStorageSync('inheritanceData') || {}
        const newUnlocked = { ...savedData.unlockedInheritances }
        for (const inh of this.selectedInheritances) {
          const currentLevel = newUnlocked[inh.id] || 0
          newUnlocked[inh.id] = currentLevel + 1
        }
        uni.setStorageSync('inheritanceData', {
          ...savedData,
          unlockedInheritances: newUnlocked,
          totalInheritancePoints: this.remainingPoints
        })
      }
      
      uni.setStorageSync('currentCharacter', character)
      uni.setStorageSync('lifeHistory', [])
      
      uni.redirectTo({ url: '/pages/life/life' })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 0 40rpx calc(180rpx + constant(safe-area-inset-bottom));
  padding-box: calc(180rpx + env(safe-area-inset-bottom));
  background-color: #080512;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* iOS 状态栏模拟 */
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

/* 弥散背景极光 */
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
  background: radial-gradient(circle, #5856d6, transparent 70%);
  top: -100rpx;
  left: -100rpx;
}

.circle-purple {
  width: 500rpx;
  height: 500rpx;
  background: radial-gradient(circle, #ff2d55, transparent 70%);
  top: 200rpx;
  right: -200rpx;
}

/* 顶部的标题区 */
.header {
  text-align: center;
  margin-top: 20rpx;
  margin-bottom: 40rpx;
  z-index: 1;
}

.header-icon-wrap {
  width: 110rpx;
  height: 110rpx;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
}

.header-icon {
  font-size: 56rpx;
}

.title {
  font-size: 42rpx;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 4rpx;
  background: linear-gradient(135deg, #ffffff 0%, #d8d8d8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.subtitle {
  font-size: 22rpx;
  color: #7b7899;
  margin-top: 8rpx;
  display: block;
  font-weight: 500;
}

/* 通用模块样式 */
.section {
  width: 100%;
  margin-bottom: 40rpx;
  z-index: 1;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 800;
  color: #ffffff;
}

.section-hint {
  font-size: 18rpx;
  color: #8e8e93;
  margin-left: auto;
  font-weight: 500;
}

/* ─────────────────── 性别选择重构 ─────────────────── */
.gender-options {
  display: flex;
  gap: 20rpx;
}

.gender-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 32rpx;
  padding: 30rpx 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  transition: all 0.25s ease;
}

.gender-btn:active {
  transform: scale(0.97);
}

.gender-btn.active.male-btn {
  border-color: #007aff;
  background: rgba(0, 122, 255, 0.06);
  box-shadow: 0 4rpx 20rpx rgba(0, 122, 255, 0.15);
}

.gender-btn.active.female-btn {
  border-color: #ff2d55;
  background: rgba(255, 45, 85, 0.06);
  box-shadow: 0 4rpx 20rpx rgba(255, 45, 85, 0.15);
}

.gender-icon-circle {
  width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}

.gender-icon-circle.male {
  background: linear-gradient(135deg, #007aff, #0051d6);
}

.gender-icon-circle.female {
  background: linear-gradient(135deg, #ff2d55, #d6003c);
}

.gender-emoji {
  font-size: 40rpx;
}

.gender-info {
  margin-left: 20rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.gender-label {
  font-size: 26rpx;
  font-weight: 700;
  color: #ffffff;
}

.gender-desc {
  font-size: 18rpx;
  color: #8e8e93;
  margin-top: 4rpx;
  font-weight: 500;
}

.gender-check {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  color: #ffffff;
  font-weight: bold;
}

.male-btn .gender-check {
  background: #007aff;
}

.female-btn .gender-check {
  background: #ff2d55;
}

/* ─────────────────── 家庭滑动卡片重构 ─────────────────── */
.family-scroll {
  white-space: nowrap;
  margin: 0 -40rpx;
  padding: 0 40rpx;
}

.family-list {
  display: inline-flex;
  gap: 20rpx;
  padding: 8rpx 0;
}

.family-card {
  width: 320rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 36rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.06);
  display: inline-flex;
  flex-direction: column;
  white-space: normal;
  position: relative;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.family-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 36rpx;
  background: radial-gradient(circle at top, rgba(255, 215, 0, 0.08), transparent 70%);
  pointer-events: none;
}

.family-card.active {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.04);
  box-shadow: 0 12rpx 36rpx rgba(255, 215, 0, 0.1);
  transform: translateY(-4rpx);
}

.family-card-header {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 12rpx;
}

.fam-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.family-card.active .fam-icon-wrap {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
}

.fam-icon {
  font-size: 50rpx;
}

.family-check {
  position: absolute;
  top: -8rpx;
  right: 64rpx;
  width: 32rpx;
  height: 32rpx;
  background: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  color: #080512;
  font-weight: bold;
}

.family-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 8rpx;
}

.family-desc {
  font-size: 20rpx;
  color: #8e8e93;
  margin-bottom: 20rpx;
  line-height: 1.4;
  text-align: center;
  font-weight: 500;
  height: 56rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.family-stats {
  margin-bottom: 16rpx;
}

.stat-row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.stat-label {
  font-size: 18rpx;
  color: #8e8e93;
  width: 80rpx;
  font-weight: 600;
}

.stat-bar {
  flex: 1;
  height: 6rpx;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3rpx;
  overflow: hidden;
  margin: 0 10rpx;
}

.stat-fill {
  height: 100%;
  border-radius: 3rpx;
}

.stat-fill.wealth {
  background: linear-gradient(90deg, #ffcc00, #ff9500);
}

.stat-fill.education {
  background: linear-gradient(90deg, #5856d6, #af52de);
}

.stat-fill.happiness {
  background: linear-gradient(90deg, #30d158, #34c759);
}

.stat-num {
  font-size: 18rpx;
  color: #8e8e93;
  width: 32rpx;
  text-align: right;
  font-weight: 700;
}

.family-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  justify-content: center;
}

.trait-tag {
  font-size: 16rpx;
  padding: 4rpx 10rpx;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12rpx;
  color: #a1a1aa;
  font-weight: 600;
}

.family-card.active .trait-tag {
  background: rgba(255, 215, 0, 0.1);
  color: #ffd700;
}

/* ─────────────────── 天资加点系统 [NEW DESIGN] ─────────────────── */
.points-badge {
  margin-left: auto;
  background: #5856d6;
  border-radius: 20rpx;
  padding: 6rpx 18rpx;
  box-shadow: 0 4rpx 12rpx rgba(88, 86, 214, 0.2);
}

.points-badge.empty {
  background: #34c759;
  box-shadow: 0 4rpx 12rpx rgba(52, 199, 89, 0.2);
}

.points-badge-text {
  font-size: 22rpx;
  font-weight: 800;
  color: #ffffff;
}

.stat-allocator-panel {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 36rpx;
  padding: 30rpx;
  box-sizing: border-box;
  border: 1rpx solid rgba(255, 255, 255, 0.06);
}

.alloc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.04);
}

.alloc-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.alloc-row:first-child {
  padding-top: 0;
}

.alloc-label-wrap {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.alloc-icon {
  font-size: 40rpx;
}

.alloc-text-wrap {
  margin-left: 16rpx;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.alloc-stat-name {
  font-size: 24rpx;
  font-weight: 700;
  color: #ffffff;
}

.alloc-stat-desc {
  font-size: 16rpx;
  color: #8e8e93;
  margin-top: 4rpx;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.alloc-controller {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.alloc-btn {
  width: 56rpx;
  height: 56rpx;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: 700;
  color: #ffffff;
  transition: all 0.2s ease;
  border: 1rpx solid rgba(255, 255, 255, 0.04);
}

.alloc-btn:active:not(.disabled) {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.15);
}

.alloc-btn.disabled {
  opacity: 0.3;
}

.alloc-value {
  font-size: 30rpx;
  font-weight: 800;
  color: #ffffff;
  min-width: 48rpx;
  text-align: center;
}

/* ─────────────────── 起大名重构 ─────────────────── */
.name-input-wrap {
  display: flex;
  gap: 16rpx;
}

.input-container {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.name-input {
  height: 90rpx;
  padding: 0 28rpx;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 700;
}

.input-placeholder {
  color: #48484a;
}

.random-name-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100rpx;
  background: rgba(255, 215, 0, 0.12);
  border-radius: 28rpx;
  border: 1rpx solid rgba(255, 215, 0, 0.3);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.random-name-btn:active {
  transform: scale(0.92);
}

.random-icon {
  font-size: 30rpx;
}

.random-text {
  font-size: 16rpx;
  color: #ffd700;
  margin-top: 2rpx;
  font-weight: 800;
}

/* ─────────────────── 轮回继承样式 ─────────────────── */
.inheritance-points-badge {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6rpx;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(88, 86, 214, 0.2));
  border-radius: 20rpx;
  padding: 6rpx 18rpx;
  border: 1rpx solid rgba(168, 85, 247, 0.3);
}

.badge-icon {
  font-size: 22rpx;
}

.badge-value {
  font-size: 26rpx;
  font-weight: 800;
  color: #a855f7;
}

.badge-label {
  font-size: 16rpx;
  color: #8e8e93;
  font-weight: 600;
}

.inheritance-intro {
  margin-bottom: 16rpx;
}

.intro-text {
  font-size: 22rpx;
  color: #8e8e93;
  font-weight: 600;
}

.inheritance-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.inheritance-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 28rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.05);
  padding: 20rpx;
  position: relative;
  transition: all 0.25s ease;
}

.inheritance-card.selected {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.05);
}

.inheritance-card.maxed {
  opacity: 0.45;
}

.inheritance-card.disabled {
  opacity: 0.35;
}

.inheritance-card.rare {
  border-color: rgba(0, 122, 255, 0.25);
}

.inheritance-card.legendary {
  border-color: rgba(255, 204, 0, 0.35);
  background: rgba(255, 204, 0, 0.02);
}

.inheritance-card.mythic {
  border-color: rgba(255, 45, 85, 0.35);
  background: rgba(255, 45, 85, 0.02);
}

.inh-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.inh-icon {
  font-size: 38rpx;
}

.inh-levels {
  display: flex;
  gap: 4rpx;
}

.level-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.level-dot.active {
  background: #ffd700;
}

.inh-name {
  font-size: 24rpx;
  font-weight: 700;
  color: #ffffff;
  display: block;
  margin-bottom: 4rpx;
}

.inh-desc {
  font-size: 18rpx;
  color: #8e8e93;
  display: block;
  line-height: 1.4;
  margin-bottom: 10rpx;
  font-weight: 500;
}

.inh-effect {
  display: flex;
  flex-wrap: wrap;
  gap: 6rpx;
  margin-bottom: 10rpx;
}

.effect-text {
  font-size: 18rpx;
  color: #30d158;
  background: rgba(48, 209, 88, 0.08);
  padding: 2rpx 8rpx;
  border-radius: 6rpx;
  font-weight: 700;
}

.inh-cost {
  font-size: 20rpx;
  color: #a855f7;
  display: block;
  font-weight: 700;
}

.inh-maxed {
  font-size: 20rpx;
  color: #48484a;
  display: block;
  font-weight: 700;
}

.inheritance-summary {
  margin-top: 20rpx;
  text-align: center;
  background: rgba(168, 85, 247, 0.06);
  border-radius: 20rpx;
  padding: 14rpx;
  border: 1rpx solid rgba(168, 85, 247, 0.15);
}

.summary-text {
  font-size: 22rpx;
  color: #a855f7;
  font-weight: 700;
}

/* ─────────────────── 机票登机牌预览重构 ─────────────────── */
.preview-section {
  width: 100%;
  z-index: 1;
  margin-top: 10rpx;
  margin-bottom: 40rpx;
}

.preview-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 36rpx;
  padding: 30rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.25);
  position: relative;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 2rpx dashed rgba(255, 255, 255, 0.1);
  padding-bottom: 16rpx;
  margin-bottom: 20rpx;
}

.ticket-brand {
  font-size: 18rpx;
  font-weight: 800;
  color: #34c759;
  letter-spacing: 2rpx;
}

.ticket-title {
  font-size: 18rpx;
  font-weight: 800;
  color: #8e8e93;
  letter-spacing: 4rpx;
}

.preview-content {
  display: flex;
  align-items: center;
}

.preview-avatar-wrap {
  width: 110rpx;
  height: 110rpx;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.preview-avatar {
  font-size: 60rpx;
}

.preview-info {
  margin-left: 24rpx;
  flex: 1;
  min-width: 0;
}

.preview-name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.preview-name {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-gender-tag {
  font-size: 16rpx;
  font-weight: 800;
  padding: 2rpx 10rpx;
  border-radius: 8rpx;
  color: #ffffff;
}

.preview-gender-tag.male {
  background: #007aff;
}

.preview-gender-tag.female {
  background: #ff2d55;
}

.preview-family {
  font-size: 20rpx;
  color: #ffd700;
  margin-top: 4rpx;
  font-weight: 700;
}

/* 属性徽记预览 */
.attrs-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-top: 10rpx;
}

.attr-preview-tag {
  font-size: 16rpx;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.04);
  color: #a1a1aa;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
}

/* 天赋预览 */
.talent-preview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-top: 12rpx;
}

.talent-chip {
  display: inline-flex;
  align-items: center;
  gap: 6rpx;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  border: 1rpx solid transparent;
}

.talent-chip.common {
  background: rgba(255, 255, 255, 0.04);
  color: #a1a1aa;
}

.talent-chip.rare {
  background: rgba(0, 122, 255, 0.08);
  border-color: rgba(0, 122, 255, 0.2);
  color: #007aff;
}

.talent-chip.epic {
  background: rgba(168, 85, 247, 0.08);
  border-color: rgba(168, 85, 247, 0.2);
  color: #af52de;
}

.talent-chip.legendary {
  background: rgba(255, 204, 0, 0.08);
  border-color: rgba(255, 204, 0, 0.3);
  color: #ffd700;
  animation: talentGlow 1.5s ease-in-out infinite;
}

.talent-chip-icon {
  font-size: 22rpx;
}

.talent-chip-name {
  font-size: 16rpx;
  font-weight: 700;
}

@keyframes talentGlow {
  0%, 100% { box-shadow: 0 0 4rpx rgba(255, 204, 0, 0.1); }
  50% { box-shadow: 0 0 12rpx rgba(255, 204, 0, 0.25); }
}

/* ─────────────────── 开始按钮重构 ─────────────────── */
.start-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx 40rpx;
  padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background: linear-gradient(transparent 0%, #080512 40%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-btn {
  width: 100%;
  max-width: 620rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28rpx;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 36rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.25s ease;
}

.start-btn.ready {
  background: linear-gradient(135deg, #5856d6 0%, #3b3ab2 100%);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 8rpx 32rpx rgba(88, 86, 214, 0.3);
}

.start-btn.disabled {
  opacity: 0.4;
}

.start-btn.ready:active {
  transform: scale(0.975);
  box-shadow: 0 4rpx 16rpx rgba(88, 86, 214, 0.2);
}

.start-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 60%);
  animation: breathing 4s ease-in-out infinite alternate;
  pointer-events: none;
}

.start-icon {
  font-size: 34rpx;
  margin-right: 14rpx;
  z-index: 1;
}

.start-text {
  font-size: 30rpx;
  font-weight: 800;
  color: #ffffff;
  z-index: 1;
}

.start-hint {
  font-size: 20rpx;
  color: #48484a;
  text-align: center;
  margin-top: 14rpx;
  display: block;
  font-weight: 600;
}

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
