<template>
  <view class="container">
    <!-- 角色信息头部 -->
    <view class="header">
      <view class="avatar-section">
        <text class="avatar">{{ stageIcon }}</text>
        <view class="basic-info">
          <text class="name">{{ character.name }}</text>
          <text class="age">{{ character.age }}岁 · {{ stageName }}</text>
          <text class="status" v-if="relationshipStatusText">{{ relationshipStatusText }}</text>
          <text class="status bianzhi-badge" v-if="character._bianzhi && character._examStage === 'passed'">🏛️ {{ character._bianzhiName || '已编制' }}</text>
          <text class="status career-badge" v-if="character._career && !character._retired">💼 {{ character._careerTitle || getCareerTitle(character._career, character._careerRank) }} · {{ careerNames[character._career] || character._career }} · {{ character._careerYears || 0 }}年</text>
          <text class="status retired-badge" v-if="character._retired">👴 已退休</text>
          <text class="status exam-badge" v-if="character._examStage === 'prep'">📝 备考中（{{ character._examType === 'civil_service' ? '公务员' : character._examType === 'public_institution' ? '事业编' : '教师' }}）</text>
        </view>
      </view>
      <view class="header-actions">
        <text class="action-btn" @click="goToRelationships" v-if="relationships.length">👥 关系</text>
        <text class="action-btn" @click="showPropertyPurchase" v-if="character.age >= 22">🏠 房产购置</text>
        <text class="action-btn" @click="openSocialModal" v-if="character.age >= 22">🤝 社交圈子</text>
        <text class="action-btn" @click="goToAchievements">🏆 成就</text>
      </view>
      <!-- 故事线进度 -->
      <view class="storyline-progress" v-if="storyLineProgress.length > 0">
        <view v-for="(line, idx) in storyLineProgress" :key="idx" class="storyline-item">
          <text class="storyline-icon">{{ line.icon }}</text>
          <text class="storyline-name">{{ line.name }}</text>
          <view class="storyline-bar-wrap">
            <view class="storyline-bar-fill" :style="{ width: line.percentage + '%' }"></view>
          </view>
          <text class="storyline-progress-text">{{ line.current }}/{{ line.total }}</text>
        </view>
      </view>
      <!-- 季节指示器 -->
      <view class="season-indicator" v-if="seasonContext">
        <text class="season-emoji">{{ seasonContext.icon }}</text>
        <text class="season-name">{{ seasonContext.name }}</text>
      </view>
    </view>

    <!-- 挚友信息条 -->
    <view class="bestie-strip" v-if="displayBesties.length > 0">
      <view 
        v-for="(b, bIdx) in displayBesties" :key="b.id"
        class="bestie-chip"
        :style="{ borderColor: b.favorColor }"
        @click="openBestieDetail(b, bIdx)"
      >
        <text class="bestie-chip-icon">{{ b.typeIcon }}</text>
        <text class="bestie-chip-name">{{ b.name }}</text>
        <view class="bestie-chip-bar-wrap">
          <view class="bestie-chip-bar" :style="{ width: (b.favorScore || 0) + '%', background: b.favorColor }"></view>
        </view>
        <text class="bestie-chip-level" :style="{ color: b.favorColor }">{{ b.favorLevel }}</text>
      </view>
    </view>

    <!-- 属性面板 -->
    <view class="stats-panel">
      <view class="stat-row">
        <view class="stat-item">
          <text class="stat-icon">💰</text>
          <text class="stat-name">财富</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: character.wealth + '%', background: getStatGradient('wealth', character.wealth) }"></view>
          </view>
          <text class="stat-value">{{ character.wealth }}</text>
          <text class="stat-trend">{{ getStatTrend(character.wealth) }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-icon">❤️</text>
          <text class="stat-name">健康</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: character.health + '%', background: getStatGradient('health', character.health) }"></view>
          </view>
          <text class="stat-value">{{ character.health }}</text>
          <text class="stat-trend">{{ getStatTrend(character.health) }}</text>
        </view>
      </view>
      <view class="stat-row">
        <view class="stat-item">
          <text class="stat-icon">😊</text>
          <text class="stat-name">幸福</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: character.happiness + '%', background: getStatGradient('happiness', character.happiness) }"></view>
          </view>
          <text class="stat-value">{{ character.happiness }}</text>
          <text class="stat-trend">{{ getStatTrend(character.happiness) }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-icon">🧠</text>
          <text class="stat-name">智力</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: character.intelligence + '%', background: getStatGradient('intelligence', character.intelligence) }"></view>
          </view>
          <text class="stat-value">{{ character.intelligence }}</text>
          <text class="stat-trend">{{ getStatTrend(character.intelligence) }}</text>
        </view>
      </view>
      <view class="stat-row">
        <view class="stat-item">
          <text class="stat-icon">👥</text>
          <text class="stat-name">社交</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: character.social + '%', background: getStatGradient('social', character.social) }"></view>
          </view>
          <text class="stat-value">{{ character.social }}</text>
          <text class="stat-trend">{{ getStatTrend(character.social) }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-icon">📖</text>
          <text class="stat-name">智慧</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: character.wisdom + '%', background: getStatGradient('wisdom', character.wisdom) }"></view>
          </view>
          <text class="stat-value">{{ character.wisdom }}</text>
          <text class="stat-trend">{{ getStatTrend(character.wisdom) }}</text>
        </view>
      </view>
      <!-- 拓展属性 -->
      <view class="stat-row extra-stats" v-if="character.charm || character.creativity || character.education">
        <view class="stat-item" v-if="character.charm != null">
          <text class="stat-icon">✨</text>
          <text class="stat-name">魅力</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: (character.charm || 0) + '%', background: 'linear-gradient(90deg, #f472b6, #ec4899)' }"></view>
          </view>
          <text class="stat-value">{{ character.charm }}</text>
        </view>
        <view class="stat-item" v-if="character.creativity != null">
          <text class="stat-icon">🎨</text>
          <text class="stat-name">创意</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: (character.creativity || 0) + '%', background: 'linear-gradient(90deg, #a78bfa, #8b5cf6)' }"></view>
          </view>
          <text class="stat-value">{{ character.creativity }}</text>
        </view>
      </view>
      <view class="stat-row extra-stats" v-if="character.education != null">
        <view class="stat-item">
          <text class="stat-icon">🎓</text>
          <text class="stat-name">教育</text>
          <view class="stat-bar-wrap">
            <view class="stat-bar" :style="{ width: (character.education || 0) + '%', background: 'linear-gradient(90deg, #60a5fa, #3b82f6)' }"></view>
          </view>
          <text class="stat-value">{{ character.education }}</text>
        </view>
      </view>
    </view>

    <!-- 当前事件 -->
    <view class="event-panel" v-if="currentEvent && !showChoiceModal">
      <view class="event-card" :class="[eventStageClass, { 'storyline-card': currentEvent.isStoryLine, 'special-card': currentEvent.isSpecial }]">
        <view class="event-header-row">
          <text class="event-age">{{ character.age }}岁</text>
          <text class="event-marker storyline" v-if="currentEvent.isStoryLine && currentEvent.storyLineData">
            📖 {{ currentEvent.storyLineData.lineName }}
          </text>
          <text class="event-marker special" v-else-if="currentEvent.isSpecial">
            {{ currentEvent.icon || '🌟' }} 稀有事件
          </text>
          <text class="event-marker stage" v-else>{{ stageIcon }} {{ stageName }}</text>
        </view>
        <text class="event-text">{{ currentEvent.text }}</text>
        <view class="event-meta-row" v-if="currentEvent.category">
          <text class="category-tag">{{ currentEvent.categoryIcon }} {{ currentEvent.categoryText }}</text>
        </view>
        <text class="event-atmosphere" v-if="currentEvent.atmosphere">🖋️ {{ currentEvent.atmosphere }}</text>
        <view class="event-effects" v-if="currentEvent.effect">
          <text 
            v-for="(value, key) in currentEvent.effect" :key="key"
            class="effect-tag"
            :class="{ positive: value > 0, negative: value < 0 }"
            v-if="getStatName(key) && typeof value === 'number'"
          >
            {{ getStatName(key) }} {{ value > 0 ? '+' : '' }}{{ value }}
          </text>
        </view>
      </view>
    </view>

    <!-- 人生履迹 -->
    <view class="history-panel">
      <text class="panel-title">历史轨迹</text>
      <scroll-view scroll-y class="history-scroll">
        <view class="history-list">
          <view v-for="(item, index) in displayHistory" :key="index" class="history-item" :class="{ 'choice-item': item.isChoice, 'milestone-item': item.isMilestone }">
            <text class="history-dot" v-if="item.isChoice">🔸</text>
            <text class="history-dot" v-else-if="item.isMilestone">⭐</text>
            <text class="history-dot" v-else>•</text>
            <text class="history-age">{{ item.age }}岁</text>
            <text class="history-text" :class="{ 'choice-text': item.isChoice, 'milestone-text': item.isMilestone }">{{ item.text }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部按钮 -->
    <view class="action-panel" v-if="!showChoiceModal">
      <view class="action-btn timeline-btn" @click="goToTimeline">
        <text class="action-text">⏳</text>
      </view>
      <view class="action-btn skills-btn" @click="goToSkills">
        <text class="action-text">🌳</text>
      </view>
      <view class="action-btn next-year-btn" @click="nextYear">
        <text class="action-text">下一年 🚀</text>
      </view>
      <view class="action-btn skip-btn" @click="skipYears">
        <text class="action-text">快进5年 ⏩</text>
      </view>
    </view>

    <!-- 选项抉择弹窗 -->
    <view class="choice-modal" v-if="showChoiceModal">
      <view class="choice-content">
        <view class="choice-header">
          <text class="choice-age">{{ character.age }}岁</text>
          <text class="choice-title">🤔 抉择时刻</text>
        </view>
        <text class="choice-question">{{ currentChoiceEvent.text }}</text>
        <view class="choice-options">
          <view 
            v-for="(choice, index) in currentChoiceEvent.choices" :key="index"
            class="choice-option"
            @click="makeChoice(choice, index)"
          >
            <text class="option-text">{{ choice.text }}</text>
            <view class="option-preview" v-if="showEffectPreview">
              <text 
                v-for="(value, key) in choice.effect" :key="key"
                class="preview-tag"
                :class="{ positive: value > 0, negative: value < 0 }"
                v-if="getStatEmoji(key) && typeof value === 'number'"
              >
                {{ getStatEmoji(key) }}{{ value > 0 ? '+' : '' }}{{ value }}
              </text>
            </view>
          </view>
        </view>
        <view class="choice-tip">
          <text class="tip-text">💡 不同的选择将开启截然不同的人生轨迹</text>
        </view>
      </view>
    </view>

    <!-- 选择结果弹窗 -->
    <view class="result-modal" v-if="showResultModal" @click="closeResultModal">
      <view class="result-content" @click.stop>
        <text class="result-title" :class="{ success: choiceResult.hasChance && choiceResult.success, fail: choiceResult.hasChance && !choiceResult.success, neutral: !choiceResult.hasChance }">
          {{ choiceResult.hasChance ? (choiceResult.success ? '✓ 成功' : '✗ 失败') : '✨ 抉择回响' }}
        </text>
        <text class="result-text">{{ choiceResult.followUp }}</text>
        <view class="result-effects">
          <text 
            v-for="(value, key) in choiceResult.effect" :key="key"
            class="result-tag"
            :class="{ positive: value > 0, negative: value < 0 }"
            v-if="getStatName(key) && typeof value === 'number'"
          >
            {{ getStatName(key) }} {{ value > 0 ? '+' : '' }}{{ value }}
          </text>
        </view>
        <view class="result-btn" @click="closeResultModal">
          <text>继续人生</text>
        </view>
      </view>
    </view>

    <!-- 时间节点记录提示 -->
    <view class="milestone-toast" v-if="showMilestoneToast && lastMilestone">
      <text class="toast-icon">{{ lastMilestone.typeInfo.icon }}</text>
      <text class="toast-text">时间节点已记录</text>
    </view>
    
    <!-- 成就解锁提示 -->
    <view class="achievement-toast" v-if="showAchievementToast && newAchievement">
      <text class="achievement-icon">{{ newAchievement.icon }}</text>
      <view class="achievement-info">
        <text class="achievement-name">{{ newAchievement.name }}</text>
        <text class="achievement-desc">{{ newAchievement.description }}</text>
      </view>
    </view>
    
    <!-- 考试系统弹窗 -->
    <view class="exam-modal" v-if="showExamModal && currentExamEvent">
      <view class="exam-content">
        <view class="exam-header">
          <text class="exam-icon">{{ currentExamEvent.icon || '📝' }}</text>
          <text class="exam-title">{{ currentExamEvent.text }}</text>
        </view>
        <view v-if="currentExamEvent.choices" class="exam-options">
          <text class="exam-bonus-tip" v-if="currentExamEvent.choices.length > 1">{{ examBonusDescription }}</text>
          <view 
            v-for="(choice, idx) in currentExamEvent.choices" :key="idx"
            class="exam-option"
            @tap="handleExamChoice(choice)"
          >
            <text class="exam-option-text">{{ choice.text }}</text>
            <text class="exam-option-hint" v-if="choice.flag === 'kaogong_written_pass'">（需要较高的教育/智力属性）</text>
          </view>
        </view>
        <view v-else class="exam-actions">
          <view class="exam-btn exam-btn-primary" @tap="handleExamConfirm">确认</view>
        </view>
    <!-- 房产配置弹窗 -->
        <view class="exam-bianzhi" v-if="character._bianzhi">
          <text class="bianzhi-tag">🏛️ {{ character._bianzhiName || '无编制' }}</text>
          <text class="bianzhi-stability">稳定性：{{ getBianzhiStability(character._bianzhi) }}</text>
        </view>
    <!-- 房屋状态 -->
        <view class="exam-status" v-if="character._examStage && character._examStage !== 'passed'">
          <text class="exam-status-text">📝 备考状态：{{ getExamStageText(character._examStage) }}</text>
          <view class="exam-progress-bar">
            <view class="exam-progress-fill" :style="{ width: Math.min(100, ((character._examPrepYears || 0) / 1) * 100) + '%' }"></view>
          </view>
          <text class="exam-status-info">已备考{{ character._examPrepYears || 0 }}年 · 已考{{ character._examAttempts || 0 }}次</text>
        </view>
      </view>
    </view>

    <!-- 命运转折点弹窗 -->
    <view class="fate-modal" v-if="showFateModal && currentFateNode">
      <view class="fate-content">
        <view class="fate-header">
          <text class="fate-icon">{{ currentFateNode.icon }}</text>
          <text class="fate-age">{{ character.age }}岁</text>
        </view>
        <text class="fate-title">{{ currentFateNode.title }}</text>
        <text class="fate-desc">{{ currentFateNode.description }}</text>
        <view class="fate-options">
          <view 
            v-for="(option, idx) in currentFateNode.options" :key="idx"
            class="fate-option"
            :class="option.rarity"
            @click="makeFateChoice(option)"
          >
            <text class="fate-option-text">{{ option.text }}</text>
            <view class="fate-option-meta">
              <text class="fate-rarity-tag">{{ option.rarity === 'legendary' ? '🌟 传说' : option.rarity === 'epic' ? '🟣 史诗' : option.rarity === 'rare' ? '🔵 稀有' : '⚪ 普通' }}</text>
              <view class="fate-effect-preview">
                <text v-for="(val, key) in option.effect" :key="key" class="fate-effect" :class="val > 0 ? 'positive' : 'negative'">
                  {{ val > 0 ? '+' : '' }}{{ val }}
                </text>
              </view>
            </view>
          </view>
        </view>
        <text class="fate-tip">🔮 命运的选择将不可逆转，请慎重抉择</text>
      </view>
    </view>

    <!-- 挚友详情弹窗 -->
    <view class="bestie-detail-modal" v-if="showBestieModal && currentBestie">
      <view class="bestie-detail-content">
        <view class="bestie-detail-header">
          <text class="bestie-detail-icon">{{ currentBestie.typeIcon }}</text>
          <view class="bestie-detail-title-group">
            <text class="bestie-detail-name">{{ currentBestie.name }}</text>
            <text class="bestie-detail-type">{{ currentBestie.typeName }}</text>
          </view>
          <text class="bestie-detail-close" @click="closeBestieDetail">✕</text>
        </view>
        <view class="bestie-detail-body">
          <view class="bestie-bond-panel">
            <text class="bond-title">羁绊等级：{{ currentBestie.favorLevel }}</text>
            <view class="bond-bar-wrap">
              <view class="bond-bar" :style="{ width: (currentBestie.favorScore || 0) + '%', background: currentBestie.favorColor }"></view>
            </view>
            <view class="bond-stats">
              <text class="bond-stat">好感度 {{ currentBestie.favorScore }}/100</text>
              <text class="bond-stat">相识 {{ currentBestie.years }} 年</text>
            </view>
          </view>
          <view class="bestie-actions">
            <text class="bestie-action-btn" @click="startGathering('dinner_party')">🍽️ 约饭</text>
            <text class="bestie-action-btn" @click="startGathering('coffee_chat')">☕ 喝咖啡</text>
            <text class="bestie-action-btn" @click="startGathering('gaming_night')">🎮 开黑</text>
            <text class="bestie-action-btn" @click="startGathering('travel_together')">✈️ 旅行</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 挚友聚会确认弹窗 -->
    <view class="gathering-modal" v-if="showGatheringModal && currentGatheringEvent">
      <view class="gathering-content">
        <view class="gathering-header">
          <text class="gathering-icon">{{ currentGatheringEvent.icon || '🎉' }}</text>
          <text class="gathering-title">聚会邀约</text>
        </view>
        <text class="gathering-text">{{ currentGatheringEvent.text }}</text>
        <view class="gathering-options">
          <view 
            v-for="(choice, idx) in currentGatheringEvent.choices" :key="idx"
            class="gathering-option"
            @click="makeGatheringChoice(choice, idx)"
          >
            <text class="gathering-option-text">{{ choice.text }}</text>
            <view class="gathering-option-preview" v-if="showEffectPreview && choice.effect">
              <text 
                v-for="(value, key) in choice.effect" :key="key"
                class="preview-tag"
                :class="{ positive: value > 0, negative: value < 0 }"
                v-if="getStatEmoji(key) && typeof value === 'number'"
              >
                {{ getStatEmoji(key) }}{{ value > 0 ? '+' : '' }}{{ value }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 房产配置弹窗 -->
    <view class="property-modal" v-if="showPropertyModal && currentPropertyChoice">
      <view class="property-content">
        <view class="property-header">
          <text class="property-icon">🏠</text>
          <text class="property-title">购置房产</text>
        </view>
        <view class="property-list">
          <view 
            v-for="(prop, idx) in currentPropertyChoice" :key="idx"
            class="property-item"
            @click="handlePropertyPurchase({ type: prop.type, paymentType: 'mortgage' })"
          >
            <text class="property-icon-lg">{{ propertyTypes[prop.type] && propertyTypes[prop.type].icon }}</text>
            <view class="property-info">
              <text class="property-name">{{ prop.name }}</text>
              <text class="property-payment">首付约{{ prop.minDownPayment }}万元</text>
            </view>
          </view>
        </view>
        <view class="property-actions">
          <view class="property-btn cancel" @click="showPropertyModal = false">
            <text>取消</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 社交圈子弹窗 -->
    <view class="social-modal" v-if="showSocialModal">
      <view class="social-content">
        <view class="social-header">
          <text class="social-icon">🤝</text>
          <text class="social-title">社交圈</text>
        </view>
        
          <!-- 已加入组织 -->
        <view class="social-section" v-if="joinedOrgs.length > 0">
          <text class="section-title">已加入</text>
          <view v-for="(org, idx) in joinedOrgs" :key="idx" class="org-item joined">
            <text class="org-icon">{{ socialOrganizations[org.id] && socialOrganizations[org.id].icon }}</text>
            <view class="org-info">
              <text class="org-name">{{ org.name }}</text>
              <text class="org-year">已加入{{ character.age - org.joinYear }}年</text>
            </view>
            <text class="org-leave" @click="leaveOrg(org.id)">退出</text>
          </view>
        </view>
        
          <!-- 可加入组织 -->
        <view class="social-section" v-if="availableOrgs.length > 0">
          <text class="section-title">可加入</text>
          <view v-for="(org, idx) in availableOrgs" :key="idx" class="org-item" @click="joinOrg(org)">
            <text class="org-icon">{{ org.icon }}</text>
            <view class="org-info">
              <text class="org-name">{{ org.name }}</text>
              <text class="org-cost">年费{{ org.annualCost }}元</text>
            </view>
          </view>
        </view>
        
        <view class="social-actions">
          <view class="social-btn cancel" @click="closeSocialModal">
            <text>关闭</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCurrentStage, generateEvent, applyEventEffect, calculateDeathChance, checkAndUnlockAchievements, getTotalAchievementPoints, startExamPrep, takeExam, getAvailableExams, applyBianzhiEffects, calculateExamSuccessRate, examTypes, examPrepEvents, examResultEvents, bianzhiTypes, checkPromotion, applyPromotion, getCareerTitle, processCareerYear, promotionTitles, getEducationBonus, calculateCareerSalary, getSeasonContext, generateBestieEvent, getBestieDisplay } from '@/utils/gameEngine.js'
import { checkBestieTrigger, hostGathering, updateBesties, getFavorLevel } from '@/utils/broBestie.js'
import { getGatheringChoiceEvent, getBestieHelpEvent, getBestieCareerEvent } from '@/utils/choiceEvents.js'
import * as careerData from '@/utils/careerData.js'
import { getFateNode } from '@/utils/fateWheel.js'
import { createMilestone, shouldCreateMilestone } from '@/utils/timelineData.js'
import { getChoiceEvent, processChoiceResult } from '@/utils/choiceEvents.js'
import { initStoryState, updateStoryState } from '@/utils/storyEngine.js'
import { getStoryEvent, processEventText } from '@/utils/storyEvents.js'
import { initRelationships, updateRelationships, getActiveRelationships, getRelationLevel } from '@/utils/relationships.js'
import { getActiveStoryLineProgress } from '@/utils/storyLines.js'
import { propertyTypes, cityLevels, propertyEvents, getAvailableProperties, buyPropertyMortgage, buyPropertyCash, sellProperty, processPropertyYear } from '@/utils/propertyData.js'
import { getAvailableOrganizations, joinOrganization, leaveOrganization, processSocialYear, getSocialTier, getReputationLevel, getSocialEvent, socialOrganizations } from '@/utils/socialCircleData.js'
import { generateMatchmakingGuests, generateMoments } from '@/utils/relationshipCircleData.js'

export default {
  data() {
    return {
      character: {},
      history: [],
      currentEvent: null,
      milestones: [],
      showMilestoneToast: false,
      lastMilestone: null,
      showChoiceModal: false,
      currentChoiceEvent: null,
      showResultModal: false,
      choiceResult: null,
      showEffectPreview: true,
      storyState: null,
      showAchievementToast: false,
      newAchievement: null,
      showFateModal: false,
      currentFateNode: null,
      showExamModal: false,
      currentExamEvent: null,
      showExamChoiceModal: false,
      currentExamChoice: null,
      relationships: [],
      showRelationshipPanel: false,
            careerNames: { civil_servant: '公务员', public_institution: '事业单位', teacher: '教师', doctor: '医生', police: '警察', soldier: '军人', writer: '作家', programmer: '程序员', ios_indie_dev: 'iOS独立开发者', apple_designer: 'Apple体验设计师', swift_architect: 'Swift架构师', tech_tycoon_ceo: '硅谷科技大亨', lawyer: '律师', entrepreneur: '创业者', freelancer: '自由职业', artist: '艺术家', chef: '厨师', driver: '司机', cashier: '收银员', university_professor: '大学教授', researcher: '科研人员' },
      properties: [],
      showPropertyModal: false,
      currentPropertyChoice: null,
      cityLevel: 'tier2',
      joinedOrgs: [],
      showSocialModal: false,
      availableOrgs: [],
      besties: [],
      showBestieModal: false,
      currentBestie: null,
      currentBestieIndex: -1,
      showGatheringModal: false,
      currentGatheringEvent: null
    }
  },
  computed: {
    stageIcon() {
      const stage = getCurrentStage(this.character.age || 0)
      return stage ? stage.icon : '👶'
    },
    stageName() {
      const stage = getCurrentStage(this.character.age || 0)
      return stage ? stage.name : '婴儿期'
    },
    displayHistory() {
      return [...this.history].reverse().slice(0, 20)
    },
    relationshipStatusText() {
      if (!this.storyState || !this.storyState.relationship) return ''
      const status = this.storyState.relationship.status
      const partner = this.storyState.relationship.partnerName
      if (status === 'married' && partner) return `💍 已婚 (${partner})`
      if (status === 'married') return '💍 已婚'
      if (status === 'dating' && partner) return `💕 恋爱中 (${partner})`
      if (status === 'dating') return '💕 恋爱中'
      if (status === 'divorced') return '💔 离婚'
      if (status === 'widowed') return '🕯️ 丧偶'
      return ''
    },
    examBonusDescription() {
      if (!this.character._career) return ''
      return '💼 在职且非备考状态下无法再次考公'
    },
    seasonContext() {
      return getSeasonContext(this.character.age || 0)
    },
    storyLineProgress() {
      if (!this.character._storyLines || !this.character._storyLines.length) return []
      return getActiveStoryLineProgress(this.character, this.storyState)
    },
    eventStageClass() {
      if (!this.character) return ''
      const stage = getCurrentStage(this.character.age || 0)
      if (!stage) return ''
      return 'stage-' + stage.id
    },
    displayBesties() {
      if (!this.besties || !this.besties.length) return []
      return getBestieDisplay(this.besties)
    }
  },
  onLoad(options) {
    if (options.continue === 'true' || options.rewind === 'true') {
      this.loadGame()
    } else {
      this.character = uni.getStorageSync('currentCharacter') || this.getDefaultCharacter()
      this.character.usedChoiceEvents = []
      this.character.usedStoryEvents = []
      this.character.tags = []
      this.history = []
      this.milestones = []
      this.storyState = initStoryState(this.character)
      this.relationships = initRelationships(this.character)
      this.createBirthMilestone()
      this.saveGame()
    }
  },
  methods: {
    getDefaultCharacter() {
      return {
                name: '未知',
        gender: 'male',
        age: 0,
        wealth: 50,
        health: 70,
        happiness: 60,
        intelligence: 50,
        social: 50,
        wisdom: 30,
        charm: 50,
        creativity: 50,
        education: 50,
        usedChoiceEvents: [],
        usedStoryEvents: [],
        tags: []
      }
    },
    calculateSalaryEffect() {
      if (!this.character._career || this.character._retired) return 0
      try {
    // calculateCareerSalary 函数，计算职业收入
        const careerObj = careerData.careers ? careerData.careers.find(function(c) { return c.id === this.character._career }.bind(this)) : null
        if (!careerObj) return 0
        const baseIncome = calculateCareerSalary(
          careerObj,
          this.character._careerYears || 0,
          this.character._careerRank || 0
        )
    // 在职备考折扣 penalty
        const prepPenalty = this.character._examStage === 'prep' ? 0.5 : 1
        return Math.round(baseIncome * prepPenalty)
      } catch (e) {
        return 0
      }
    },
    loadGame() {
      this.character = uni.getStorageSync('currentCharacter') || this.getDefaultCharacter()
      if (!this.character.usedChoiceEvents) this.character.usedChoiceEvents = []
      if (!this.character.usedStoryEvents) this.character.usedStoryEvents = []
      if (!this.character.tags) this.character.tags = []
      this.history = uni.getStorageSync('lifeHistory') || []
      this.milestones = uni.getStorageSync('lifeMilestones') || []
      this.storyState = uni.getStorageSync('storyState') || initStoryState(this.character)
      this.relationships = uni.getStorageSync('relationships') || []
      this.properties = uni.getStorageSync('properties') || []
      this.joinedOrgs = uni.getStorageSync('joinedOrgs') || []
      this.besties = uni.getStorageSync('besties') || []
    },
    createBirthMilestone() {
            const familyName = (this.character.family && this.character.family.name) || '普通家庭'
      const milestone = createMilestone(
        'birth', 0,
                `${this.character.name}出生在${familyName}`,
        { 
          character: JSON.parse(JSON.stringify(this.character)), 
          history: [],
          storyState: JSON.parse(JSON.stringify(this.storyState))
        }
      )
      this.milestones.push(milestone)
      uni.setStorageSync('lifeMilestones', this.milestones)
    },
    checkAndCreateMilestone(event) {
      const milestoneInfo = shouldCreateMilestone(event, this.character, null)
      if (milestoneInfo) {
        const milestone = createMilestone(
          milestoneInfo.type, this.character.age, milestoneInfo.description,
          { 
            character: JSON.parse(JSON.stringify(this.character)), 
            history: JSON.parse(JSON.stringify(this.history)),
            storyState: JSON.parse(JSON.stringify(this.storyState))
          }
        )
        this.milestones.push(milestone)
        uni.setStorageSync('lifeMilestones', this.milestones)
        this.lastMilestone = milestone
        this.showMilestoneToast = true
        setTimeout(() => { this.showMilestoneToast = false }, 2000)
      }
    },
    goToTimeline() {
      uni.navigateTo({ url: '/pages/timeline/timeline' })
    },
    goToSkills() {
      uni.navigateTo({ url: '/pages/skills/skills' })
    },
    saveGame() {
      uni.setStorageSync('currentCharacter', this.character)
      uni.setStorageSync('lifeHistory', this.history)
      uni.setStorageSync('storyState', this.storyState)
      uni.setStorageSync('relationships', this.relationships)
      uni.setStorageSync('properties', this.properties)
      uni.setStorageSync('joinedOrgs', this.joinedOrgs)
      uni.setStorageSync('besties', this.besties)
      uni.setStorageSync('lifeSimSave', { timestamp: Date.now() })
    },
    getStatColor(value) {
      if (value >= 80) return 'linear-gradient(90deg, #4ade80, #16a34a)'
      if (value >= 60) return 'linear-gradient(90deg, #86efac, #22c55e)'
      if (value >= 40) return 'linear-gradient(90deg, #fbbf24, #f59e0b)'
      if (value >= 20) return 'linear-gradient(90deg, #fb923c, #ea580c)'
      return 'linear-gradient(90deg, #f87171, #dc2626)'
    },
    getStatGradient(name, value) {
      var v = value || 50
      var gradients = {
        wealth: 'linear-gradient(90deg, #4ade80, #f59e0b)',
        health: v >= 60 ? 'linear-gradient(90deg, #4ade80, #22c55e)' : v >= 30 ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : 'linear-gradient(90deg, #f87171, #dc2626)',
        happiness: v >= 60 ? 'linear-gradient(90deg, #f472b6, #ec4899)' : v >= 30 ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : 'linear-gradient(90deg, #f87171, #dc2626)',
        intelligence: 'linear-gradient(90deg, #60a5fa, #8b5cf6)',
        social: 'linear-gradient(90deg, #34d399, #3b82f6)',
        wisdom: 'linear-gradient(90deg, #a78bfa, #7c3aed)'
      }
      return gradients[name] || 'linear-gradient(90deg, #6b7280, #9ca3af)'
    },
    getStatTrend(value) {
      if (value > 70) return '↑'
      if (value < 30) return '↓'
      return '→'
    },
    getStatName(key) {
      const names = {
        wealth: '💰 财富', health: '❤️ 健康', happiness: '😊 幸福',
        intelligence: '🧠 智力', social: '👥 社交', wisdom: '📖 智慧',
        charm: '✨ 魅力', creativity: '🎨 创意', education: '🎓 教育'
      }
      if (!key) return ''
      return names[key] || ''
    },
    getStatEmoji(key) {
      const emojis = {
        wealth: '💰', health: '❤️', happiness: '😊',
        intelligence: '🧠', social: '👥', wisdom: '📖',
        charm: '✨', creativity: '🎨', education: '🎓'
      }
      if (!key) return ''
      return emojis[key] || ''
    },
    nextYear() {
      const deathChance = calculateDeathChance(this.character.age, this.character.health || 50)
      if (Math.random() < deathChance) {
                this.endLife('自然原因')
        return
      }
      this.character.age++
      
      // 确认故事状态
      if (!this.storyState) {
        this.storyState = initStoryState(this.character)
      }
      
      // 备考期间：高频随机事件
      const usedFates = this.character._usedFates || []
      const fateNode = getFateNode(this.character.age, usedFates)
      if (fateNode) {
        this.currentFateNode = fateNode
        this.showFateModal = true
        return
      }
      
      // 备考系统判定
      if (this.character._examStage === 'prep') {
        this.character._examPrepYears = (this.character._examPrepYears || 0) + 1
        if (this.character._examPrepYears >= 1) {
      // 备考已考1年
          const exam = examTypes[this.character._examType]
          if (exam) {
      this.character._examStage = exam.stages[0] || '备考'
          }
          const examResult = takeExam(this.character._examType, this.character)
          if (examResult.passed) {
                        if (examResult.stage === 'final' || examResult.stage === '录取') {
      // 考试全部通过
              this.showExamResult(examResult)
              return
            } else {
      // 考完当前阶段
              this.currentEvent = { text: examResult.message, effect: {} }
              this.history.push({ age: this.character.age, text: examResult.message, effect: {} })
      // 考完所有阶段，成功上岸
            }
          } else {
            this.showExamResult(examResult)
            return
          }
        } else {
      // 增加考试经历
          const currentExamType = this.character._examType
          const preps = examPrepEvents.filter(function(e) {
            return e.examType === null || e.examType === undefined || e.examType === currentExamType
          })
          if (preps.length > 0 && Math.random() < 0.15) {
            const prep = preps[Math.floor(Math.random() * preps.length)]
            this.currentExamEvent = prep
            this.showExamModal = true
            return
          }
        }
      }
      // 备考面试中
      if (this.character._examStage && this.character._examStage !== 'prep' && this.character._examStage !== 'passed' && this.character._examStage !== 'given_up') {
        const examResult = takeExam(this.character._examType, this.character)
        if (examResult.passed) {
                    if (examResult.stage === 'final' || examResult.stage === '录取') {
            this.showExamResult(examResult)
            return
          } else {
            this.currentEvent = { text: examResult.message, effect: {} }
            this.history.push({ age: this.character.age, text: examResult.message, effect: {} })
          }
        } else {
          this.showExamResult(examResult)
          return
        }
      }
      // 毕业未工作自动展示考试信息
      if (!this.character._examStage && !this.character._career && this.character.age >= 22 && this.character.age <= 35 && (this.character.education || 0) >= 55) {
        const available = getAvailableExams(this.character)
        if (available.length > 0 && Math.random() < 0.08) {
          this.currentExamEvent = {
                        text: '你看到了几条招考编制的信息：' + available.map(function(e) { return e.icon + e.name }).join('、'),
                        icon: '📝',
            choices: available.map(function(exam) {
                            return { text: exam.icon + ' ' + exam.name + '，难度：' + exam.difficulty + '/100', examType: exam.id }
                        }).concat([{ text: '暂时不考，专心做别的', examType: null }])
          }
          this.showExamModal = true
          return
        }
      }
      
      // 职业生涯结算
      if (this.character._career && !this.character._retired) {
        var careerResults = processCareerYear(this.character, careerData)
        if (careerResults) {
          for (var ci = 0; ci < careerResults.length; ci++) {
            var cr = careerResults[ci]
            if (cr.type === 'promotion') {
      // 职业事件展示
              this.currentEvent = { text: cr.text, effect: cr.effect }
              this.character = applyEventEffect(this.character, cr.effect)
              this.history.push({ age: this.character.age, text: cr.text, effect: cr.effect })
              return
            } else if (cr.type === 'career_event') {
              if (cr.choices && cr.choices.length > 0) {
      // 优先触发职业大抉择
                this.currentChoiceEvent = { text: cr.text, choices: cr.choices, effect: cr.effect }
                this.showChoiceModal = true
                return
              } else {
                this.currentEvent = { text: cr.text, effect: cr.effect }
                this.character = applyEventEffect(this.character, cr.effect || {})
                this.history.push({ age: this.character.age, text: cr.text, effect: cr.effect })
                return
              }
            } else if (cr.type === 'retirement') {
              this.currentEvent = { text: cr.text, effect: cr.effect }
              this.character = applyEventEffect(this.character, cr.effect)
              this.history.push({ age: this.character.age, text: cr.text, effect: cr.effect })
              return
            }
          }
        }
      }
      
      // 金融投资理财结算
      const salaryEffect = this.calculateSalaryEffect()
      if (salaryEffect > 0) {
        this.character.wealth = Math.min(100, (this.character.wealth || 50) + salaryEffect)
      }
      
      // 房产配置结算
      if (this.properties && this.properties.length > 0) {
        for (var pi = 0; pi < this.properties.length; pi++) {
          var prop = this.properties[pi]
        var propUpdate = processPropertyYear(prop, 0) // 计算房产
          
        // 房屋折旧与收益
          if (propUpdate.rentIncome) {
            this.character.wealth = Math.min(100, (this.character.wealth || 50) + propUpdate.rentIncome)
            this.history.push({ age: this.character.age, text: `🏠 ${prop.name}收租进账 +${propUpdate.rentIncome}万元`, effect: { wealth: propUpdate.rentIncome } })
          }
          
        // 支付房贷
          if (propUpdate.mortgagePayment) {
            this.character.wealth = Math.max(0, (this.character.wealth || 50) - propUpdate.mortgagePayment)
            this.history.push({ age: this.character.age, text: `🏠 偿还房屋贷款 -${propUpdate.mortgagePayment}万元`, effect: { wealth: -propUpdate.mortgagePayment } })
          }
          
        // 房产大事件
          if (propUpdate.events && propUpdate.events.length > 0) {
            for (var ei = 0; ei < propUpdate.events.length; ei++) {
              this.history.push({ age: this.character.age, text: propUpdate.events[ei].text, effect: {} })
            }
          }
        }
      }
      
      // 社交圈子结算
      if (this.joinedOrgs && this.joinedOrgs.length > 0) {
        var socialUpdate = processSocialYear(this.character, this.joinedOrgs)
        // 扣除年费
        for (var si = 0; si < socialUpdate.updates.length; si++) {
          var sUpdate = socialUpdate.updates[si]
          if (sUpdate.type === 'fee') {
            this.character.wealth = Math.max(0, (this.character.wealth || 50) - sUpdate.cost)
            this.history.push({ age: this.character.age, text: `🤝 扣除${sUpdate.org}会费 -${sUpdate.cost}元`, effect: { wealth: -sUpdate.cost } })
          }
        }
        // 社交事件
        if (socialUpdate.benefits && Object.keys(socialUpdate.benefits).length > 0) {
          var appliedEffect = {}
          for (var bKey in socialUpdate.benefits) {
            appliedEffect[bKey] = socialUpdate.benefits[bKey]
            this.character[bKey] = Math.max(0, Math.min(100, (this.character[bKey] || 0) + socialUpdate.benefits[bKey]))
          }
        }
      }
      
      // 检查是否触发人生抉择
      const stage = getCurrentStage(this.character.age)
      const stageId = stage ? stage.id : 'child'
      const choiceEvent = getChoiceEvent(stageId, this.character, this.storyState)
      
      if (choiceEvent) {
        this.currentChoiceEvent = choiceEvent
        this.showChoiceModal = true
        return
      }
      
      // 尝试触发重大故事事件
      const storyEvent = getStoryEvent(stageId, this.character, this.storyState)
      if (storyEvent) {
        const eventText = processEventText(storyEvent, this.storyState, this.character)
        if (eventText) {
          this.currentEvent = { text: eventText, effect: storyEvent.effect || {} }
          this.character = applyEventEffect(this.character, storyEvent.effect || {})
          this.history.push({ age: this.character.age, text: eventText, effect: storyEvent.effect || {} })
          
        // 状态机制更新
          if (storyEvent.stateAction) {
            const actionData = storyEvent.stateAction.data ? { ...storyEvent.stateAction.data } : {}
            actionData.age = this.character.age
            this.storyState = updateStoryState(this.storyState, storyEvent.stateAction.action, actionData)
          }
          
          this.checkAndCreateMilestone({ text: eventText })
        }
      } else {
        // 普通年份随机事件
        const event = generateEvent(this.character.age, this.character, this.storyState)
        if (event && event.text) {
          this.currentEvent = event
          this.character = applyEventEffect(this.character, event.effect || {})
          this.history.push({ age: this.character.age, text: event.text, effect: event.effect || {} })
          this.checkAndCreateMilestone(event)
        } else if (this.besties && this.besties.length > 0) {
          // 没有主线事件时，尝试触发挚友日常事件
          var bestieEv = generateBestieEvent(this.character, this.besties, this.character.age)
          if (bestieEv) {
            this.currentEvent = { text: bestieEv.text, effect: bestieEv.effect || {} }
            this.character = applyEventEffect(this.character, bestieEv.effect || {})
            this.history.push({ age: this.character.age, text: bestieEv.text, effect: bestieEv.effect || {} })
          }
        }
      }
      
      // 年度关系网更新
      if (this.relationships && this.relationships.length) {
        this.relationships = updateRelationships(this.relationships, this.character)
      }
      
      // 挚友系统年度更新
      if (this.besties && this.besties.length > 0) {
        this.besties = updateBesties(this.besties, this.character, this.character.age)
      }
      
      // 尝试触发新挚友相识事件
      if (!this.showChoiceModal && !this.currentEvent) {
        var bestieTrigger = checkBestieTrigger(this.character, this.besties, this.character.age)
        if (bestieTrigger && bestieTrigger.event) {
          this.besties.push(bestieTrigger.bestie)
          this.currentEvent = { 
            text: bestieTrigger.event.text, 
            effect: bestieTrigger.event.effect || {} 
          }
          this.character = applyEventEffect(this.character, bestieTrigger.event.effect || {})
          this.history.push({ age: this.character.age, text: bestieTrigger.event.text, effect: bestieTrigger.event.effect || {} })
        }
      }
      
      // 触发挚友相关的选择事件（聚会/求助/合作）
      if (!this.showChoiceModal && !this.currentEvent && this.besties && this.besties.length > 0 && this.character.age >= 16) {
        var gatheringChoices = [
          function() { return getGatheringChoiceEvent(this.character, this.besties) },
          function() { return getBestieHelpEvent(this.character, this.besties) },
          function() { return getBestieCareerEvent(this.character, this.besties) }
        ]
        // 随机选一种类型的挚友选择事件
        if (Math.random() < 0.25) {
          var choiceFn = gatheringChoices[Math.floor(Math.random() * gatheringChoices.length)]
          var gatheringChoice = choiceFn.call(this)
          if (gatheringChoice) {
            this.currentGatheringEvent = gatheringChoice
            this.showGatheringModal = true
            return
          }
        }
      }
      
      // 每年主动更新朋友圈与相亲嘉宾缓存
      try {
        const nextGuests = generateMatchmakingGuests(this.character)
        const nextMoms = generateMoments(this.relationships, this.character)
        uni.setStorageSync('matchmakingGuests', nextGuests)
        uni.setStorageSync('matchmakingAge', this.character.age)
        uni.setStorageSync('moments', nextMoms)
        uni.setStorageSync('momentsAge', this.character.age)
      } catch (e) {}
      
      this.naturalChanges()
      this.saveGame()
    },
    makeChoice(choice, index) {
      const result = processChoiceResult(choice)
      this.choiceResult = result
      
      // 应用加成
      this.character = applyEventEffect(this.character, result.effect || {})
      
      // 记录抉择历史
      if (!this.character.usedChoiceEvents) this.character.usedChoiceEvents = []
      if (this.currentChoiceEvent && this.currentChoiceEvent.id) {
        this.character.usedChoiceEvents.push(this.currentChoiceEvent.id)
      }
      
      // 初始化故事状态
      if (!this.storyState) {
        this.storyState = initStoryState(this.character)
      }
      
      // 新增标签
      if (choice.tag) {
        if (!this.character.tags) this.character.tags = []
        this.character.tags.push(choice.tag)
        this.storyState = updateStoryState(this.storyState, 'ADD_FLAG', { flag: choice.tag })
      }
      
      // 更新故事状态
      if (result.stateAction) {
        const actionData = result.stateAction.data ? { ...result.stateAction.data } : {}
        actionData.age = this.character.age
        if (this.currentChoiceEvent && this.currentChoiceEvent.partnerName) {
          actionData.partnerName = this.currentChoiceEvent.partnerName
        }
        this.storyState = updateStoryState(this.storyState, result.stateAction.action, actionData)
      }
      
      // 历史轨迹归档
      const questionText = (this.currentChoiceEvent && this.currentChoiceEvent.text) || '人生抉择'
      const choiceText = choice.text || '未知抉择'
      const followUpText = result.followUp || ''
      const historyText = `面对【${questionText}】，你选择了【${choiceText}】，结果：${followUpText}`
      this.history.push({
        age: this.character.age,
        text: historyText,
        effect: result.effect || {},
        isChoice: true
      })
      
      // 记录里程碑
      this.checkAndCreateMilestone({ text: historyText })
      
      this.showChoiceModal = false
      this.showResultModal = true
    },
    closeResultModal() {
      this.showResultModal = false
      this.currentChoiceEvent = null
      this.choiceResult = null
      this.naturalChanges()
      this.saveGame()
    },
    skipYears() {
      for (let i = 0; i < 5; i++) {
        if (this.showChoiceModal || this.showFateModal || this.showExamModal) return
        const deathChance = calculateDeathChance(this.character.age, this.character.health || 50)
        if (Math.random() < deathChance) {
          this.endLife('自然老化')
          return
        }
        this.character.age++
        
      // 确认故事状态
        if (!this.storyState) {
          this.storyState = initStoryState(this.character)
        }
        
      // 命运轮轴转折点触发
        const usedFates = this.character._usedFates || []
        const fateNode = getFateNode(this.character.age, usedFates)
        if (fateNode) {
          this.currentFateNode = fateNode
          this.showFateModal = true
          this.saveGame()
          return
        }
        
      // 考试结果判定
        if (this.character._examStage === 'prep') {
          this.character._examPrepYears = (this.character._examPrepYears || 0) + 1
          if (this.character._examPrepYears >= 1) {
            const exam = examTypes[this.character._examType]
            if (exam) {
      this.character._examStage = exam.stages[0] || '备考'
            }
            const examResult = takeExam(this.character._examType, this.character)
            if (examResult.passed) {
      if (examResult.stage === 'final' || examResult.stage === '录取') {
                this.showExamResult(examResult)
                this.saveGame()
                return
              } else {
                this.history.push({ age: this.character.age, text: examResult.message, effect: {} })
              }
            } else {
      // 考试未通过
              this.character._examAttempts = (this.character._examAttempts || 0) + 1
              if (examResult.canRetry) {
                this.character._examStage = 'prep'
                this.character._examPrepYears = 0
              } else {
                this.character._examStage = 'given_up'
              }
              this.history.push({ age: this.character.age, text: '📝 ' + (examResult.message || '成绩公布') + '，通过概率为' + Math.round(successRate * 100) + '%' })
            }
          }
        } else if (this.character._examStage && this.character._examStage !== 'passed' && this.character._examStage !== 'given_up') {
      // 考试合格进入下一阶段
          const examResult = takeExam(this.character._examType, this.character)
          if (examResult.passed) {
      if (examResult.stage === 'final' || examResult.stage === '录取') {
              this.showExamResult(examResult)
              this.saveGame()
              return
            } else {
              this.history.push({ age: this.character.age, text: examResult.message, effect: {} })
            }
          } else {
            this.character._examAttempts = (this.character._examAttempts || 0) + 1
            if (examResult.canRetry) {
              this.character._examStage = 'prep'
              this.character._examPrepYears = 0
            } else {
              this.character._examStage = 'given_up'
            }
            this.history.push({ age: this.character.age, text: '📝 ' + (examResult.message || '考试结束') })
          }
        }
      // 弹出招考编制岗位列表
        if (!this.character._examStage && !this.character._career && this.character.age >= 22 && this.character.age <= 35 && (this.character.education || 0) >= 55) {
          const available = getAvailableExams(this.character)
          if (available.length > 0 && Math.random() < 0.08) {
            this.currentExamEvent = {
        text: '你查看了本年度的招聘和招考编制公告：',
              icon: '📝',
              choices: available.map(function(exam) {
                return { text: exam.icon + ' ' + exam.name, examType: exam.id }
      }).concat([{ text: '先不考了，专心干别的', examType: null }])
            }
            this.showExamModal = true
            this.saveGame()
            return
          }
        }
        
      // 职业生涯结算
        if (this.character._career && !this.character._retired) {
          var careerResults = processCareerYear(this.character, careerData)
          if (careerResults) {
            for (var ci = 0; ci < careerResults.length; ci++) {
              var cr = careerResults[ci]
              if (cr.type === 'promotion') {
                this.character = applyEventEffect(this.character, cr.effect)
                this.history.push({ age: this.character.age, text: cr.text, effect: cr.effect })
              } else if (cr.type === 'career_event') {
                if (cr.choices && cr.choices.length > 0) {
                  this.currentChoiceEvent = { text: cr.text, choices: cr.choices, effect: cr.effect }
                  this.showChoiceModal = true
                  this.saveGame()
                  return
                } else {
                  this.character = applyEventEffect(this.character, cr.effect || {})
                  this.history.push({ age: this.character.age, text: cr.text, effect: cr.effect })
                }
              } else if (cr.type === 'retirement') {
                this.character = applyEventEffect(this.character, cr.effect)
                this.history.push({ age: this.character.age, text: cr.text, effect: cr.effect })
              }
            }
          }
        }
        
      // 金融资产结算
        const salaryEffect = this.calculateSalaryEffect()
        if (salaryEffect > 0) {
          this.character.wealth = Math.min(100, (this.character.wealth || 50) + salaryEffect)
        }
        
      // 房贷支付结算
        if (this.properties && this.properties.length > 0) {
          for (var pi = 0; pi < this.properties.length; pi++) {
            var prop = this.properties[pi]
            var propUpdate = processPropertyYear(prop, 0)
            if (propUpdate.rentIncome) {
              this.character.wealth = Math.min(100, (this.character.wealth || 50) + propUpdate.rentIncome)
            }
            if (propUpdate.mortgagePayment) {
              this.character.wealth = Math.max(0, (this.character.wealth || 50) - propUpdate.mortgagePayment)
            }
          }
        }
        
      // 社交会费结算
        if (this.joinedOrgs && this.joinedOrgs.length > 0) {
          var socialUpdate = processSocialYear(this.character, this.joinedOrgs)
          for (var si = 0; si < socialUpdate.updates.length; si++) {
            var sUpdate = socialUpdate.updates[si]
            if (sUpdate.type === 'fee') {
              this.character.wealth = Math.max(0, (this.character.wealth || 50) - sUpdate.cost)
            }
          }
          if (socialUpdate.benefits && Object.keys(socialUpdate.benefits).length > 0) {
            for (var bKey in socialUpdate.benefits) {
              this.character[bKey] = Math.max(0, Math.min(100, (this.character[bKey] || 0) + socialUpdate.benefits[bKey]))
            }
          }
        }
        
      // 抉择时刻触发
        const stage = getCurrentStage(this.character.age)
        const stageId = stage ? stage.id : 'child'
        const choiceEvent = getChoiceEvent(stageId, this.character, this.storyState)
        if (choiceEvent) {
          this.currentChoiceEvent = choiceEvent
          this.showChoiceModal = true
          this.saveGame()
          return
        }
        
      // 优先故事大纲
        const storyEvent = getStoryEvent(stageId, this.character, this.storyState)
        if (storyEvent) {
          const eventText = processEventText(storyEvent, this.storyState, this.character)
          if (eventText) {
            this.character = applyEventEffect(this.character, storyEvent.effect || {})
            this.history.push({ age: this.character.age, text: eventText })
            if (storyEvent.stateAction) {
              const actionData = storyEvent.stateAction.data ? { ...storyEvent.stateAction.data } : {}
              actionData.age = this.character.age
              this.storyState = updateStoryState(this.storyState, storyEvent.stateAction.action, actionData)
            }
            this.checkAndCreateMilestone({ text: eventText })
          }
        } else {
          const event = generateEvent(this.character.age, this.character, this.storyState)
          if (event && event.text) {
            this.character = applyEventEffect(this.character, event.effect || {})
            this.history.push({ age: this.character.age, text: event.text })
            this.checkAndCreateMilestone(event)
          }
        }
        
      // 关系网变化
        if (this.relationships && this.relationships.length) {
          this.relationships = updateRelationships(this.relationships, this.character)
        }
        
        this.naturalChanges()
      }
      this.saveGame()
    },
    makeFateChoice(option) {
      // 结算加成
      this.character = applyEventEffect(this.character, option.effect || {})
      
      // 记录抉择历史
      if (!this.character._usedFates) this.character._usedFates = []
      if (this.currentFateNode && !this.character._usedFates.includes(this.currentFateNode.id)) {
        this.character._usedFates.push(this.currentFateNode.id)
      }
      
      // 增加标签
      if (option.flag) {
        if (!this.character._flags) this.character._flags = []
        if (!this.character._flags.includes(option.flag)) {
          this.character._flags.push(option.flag)
        }
        if (this.storyState) {
          this.storyState = updateStoryState(this.storyState, 'ADD_FLAG', { flag: option.flag })
        }
      }
      
      // 历史轨迹归档
      this.history.push({
        age: this.character.age,
        text: `🔮 命运轨迹发生改变：在「${this.currentFateNode.title}」中，你选择${option.text}，${option.consequence || ''}`,
        effect: option.effect || {},
        isFate: true
      })
      
      // 状态更新
      this.choiceResult = {
        text: option.consequence || option.text,
        effect: option.effect || {}
      }
      this.showFateModal = false
      this.showResultModal = true
      
      // 成就检测
      this.checkAchievements()
    },
    naturalChanges() {
      if (this.character.age > 50) {
        this.character.health = Math.max(0, this.character.health - 1)
      }
      if (this.character.age > 70) {
        this.character.health = Math.max(0, this.character.health - 2)
      }
      if (this.character.age > 30 && this.character.age < 70) {
        this.character.wisdom = Math.min(100, this.character.wisdom + 0.5)
      }
      
      // 成就检测
      this.checkAchievements()
    },
    checkAchievements() {
      const newAchievements = checkAndUnlockAchievements(this.character, this.storyState)
      if (newAchievements && newAchievements.length > 0) {
        this.newAchievement = newAchievements[0]
        this.showAchievementToast = true
        setTimeout(() => { this.showAchievementToast = false }, 3000)
        
      // 记录到历史
        for (const achievement of newAchievements) {
          this.history.push({
            age: this.character.age,
            text: `🏆 解锁新成就：${achievement.icon} ${achievement.name}`,
            isAchievement: true
          })
        }
      }
    },
    endLife(cause) {
      uni.setStorageSync('deathCause', cause)
      uni.redirectTo({ url: '/pages/ending/ending' })
    },
    goToRelationships() {
      uni.navigateTo({ url: '/pages/relationships/relationships' })
    },
    goToAchievements() {
      uni.navigateTo({ url: '/pages/achievements/achievements' })
    },
    // 备考逻辑
    goToProperties() {
      uni.navigateTo({ url: '/pages/properties/properties' })
    },
    showPropertyPurchase() {
      this.currentPropertyChoice = getAvailableProperties(this.character)
      if (this.currentPropertyChoice && this.currentPropertyChoice.length > 0) {
        this.showPropertyModal = true
      }
    },
    handlePropertyPurchase(choice) {
      this.showPropertyModal = false
      if (!choice) return
      
      var result
      if (choice.paymentType === 'mortgage') {
        result = buyPropertyMortgage(this.character, choice.type, this.cityLevel)
      } else {
        result = buyPropertyCash(this.character, choice.type, this.cityLevel)
      }
      
      if (result && result.property) {
        this.properties.push(result.property)
        this.character = applyEventEffect(this.character, result.effect)
        this.history.push({ 
          age: this.character.age, 
          text: `🏠 成功购置房产：${result.property.name}`,
          effect: result.effect 
        })
      }
    },
    sellProperty(propId) {
      var idx = this.properties.findIndex(function(p) { return p.id === propId })
      if (idx >= 0) {
        var prop = this.properties[idx]
        var yearsOwned = this.character.age - prop.purchaseYear
        var result = sellProperty(prop, yearsOwned)
        
        this.properties.splice(idx, 1)
        this.character = applyEventEffect(this.character, result.effect)
        this.history.push({ 
          age: this.character.age, 
          text: `🏠 成功出售房产：${prop.name}，扣除贷款结余获得净收入 ${result.netProceeds} 万元`,
          effect: result.effect 
        })
      }
    },
    // 社交圈逻辑
    openSocialModal() {
      this.availableOrgs = getAvailableOrganizations(this.character)
      if (this.availableOrgs && this.availableOrgs.length > 0) {
        this.showSocialModal = true
      }
    },
    closeSocialModal() {
      this.showSocialModal = false
    },
    joinOrg(org) {
      this.showSocialModal = false
      var result = joinOrganization(this.character, org.id)
      if (result.success && result.organization) {
        this.joinedOrgs.push(result.organization)
        this.character = applyEventEffect(this.character, result.effect)
        this.history.push({ 
          age: this.character.age, 
          text: `🤝 成功加入社交圈：${org.name}，年费 ${org.annualCost} 元`,
          effect: result.effect 
        })
      }
    },
    leaveOrg(orgId) {
      var idx = this.joinedOrgs.findIndex(function(o) { return o.id === orgId })
      if (idx >= 0) {
        var org = this.joinedOrgs[idx]
        this.joinedOrgs.splice(idx, 1)
        this.history.push({ 
          age: this.character.age, 
          text: `🤝 已退出社交圈：${org.name}`,
          effect: {} 
        })
      }
    },
    // 备考考试
    handleExamChoice(choice) {
      this.showExamModal = false
      if (!choice.examType) {
        // 备考中随机事件的选项结算
        if (choice.effect) {
          this.character = applyEventEffect(this.character, choice.effect)
          const descText = this.currentExamEvent ? this.currentExamEvent.text : '备考事件'
          const cleanDesc = descText.length > 25 ? descText.slice(0, 25) + '...' : descText
          const historyText = `📝 备考抉择：【${cleanDesc}】选择了【${choice.text}】`
          this.history.push({ age: this.character.age, text: historyText, effect: choice.effect })
        }
        // 保存选项的 tag 标签
        if (choice.tag) {
          if (!this.character.tags) this.character.tags = []
          if (this.character.tags.indexOf(choice.tag) === -1) {
            this.character.tags.push(choice.tag)
          }
        }
        // 特殊指令：直接保研/考博录取
        if (choice.action === 'auto_pass_exam') {
          this.character._examStage = 'passed'
          if (this.character._examType === 'graduate_entrance') {
            this.character.education = Math.min(100, (this.character.education || 50) + 15)
            this.history.push({ age: this.character.age, text: '🎓 恭喜！你通过绿色免试通道成功保送至名校攻读硕士研究生！', effect: { education: 15, happiness: 10 } })
          } else if (this.character._examType === 'doctoral_entrance') {
            this.character.education = Math.min(100, (this.character.education || 50) + 20)
            this.history.push({ age: this.character.age, text: '🔬 恭喜！你顺利通过学术直通车免试录取为攻读博士研究生！', effect: { education: 20, happiness: 15 } })
          }
          this.character._examType = null
        }
        // 特殊指令：放弃报考
        if (choice.flag === 'give_up_exam') {
          this.character._examStage = 'given_up'
          this.character._examType = null
        }
        return


          const descText = this.currentExamEvent ? this.currentExamEvent.text : '备考事件'
          const cleanDesc = descText.length > 25 ? descText.slice(0, 25) + '...' : descText
          const historyText = `📝 备考抉择：【${cleanDesc}】选择了【${choice.text}】`
          this.history.push({ age: this.character.age, text: historyText, effect: choice.effect })
        }
        // 特殊指令：直接保研/考博录取
        if (choice.action === 'auto_pass_exam') {
          this.character._examStage = 'passed'
          if (this.character._examType === 'graduate_entrance') {
            this.character.education = Math.min(100, (this.character.education || 50) + 15)
            this.history.push({ age: this.character.age, text: '🎓 恭喜！你通过绿色免试通道成功保送至名校攻读硕士研究生！', effect: { education: 15, happiness: 10 } })
          } else if (this.character._examType === 'doctoral_entrance') {
            this.character.education = Math.min(100, (this.character.education || 50) + 20)
            this.history.push({ age: this.character.age, text: '🔬 恭喜！你顺利通过学术直通车免试录取为攻读博士研究生！', effect: { education: 20, happiness: 15 } })
          }
          this.character._examType = null
        }
        // 特殊指令：放弃报考
        if (choice.flag === 'give_up_exam') {
          this.character._examStage = 'given_up'
          this.character._examType = null
        }
        return


    // 考试上岸
      const result = startExamPrep(choice.examType, this.character)
      this.character._examStage = 'prep'
      this.character._examType = choice.examType
      this.character._examPrepYears = 0
      this.character._examAttempts = (this.character._examAttempts || 0)
      
      const examInfo = examTypes[choice.examType]
      const historyText = examInfo 
        ? '📝 你已报名了 ' + examInfo.name + '，请在接下来一年内全力备考！'
        : '📝 报名成功'
      this.currentEvent = { text: historyText, effect: {} }
      this.history.push({ age: this.character.age, text: historyText, effect: {} })
    },
    showExamResult(examResult) {
      if (examResult.passed && examResult.stage === 'final') {
    // 落榜
        this.character._examStage = 'passed'
        if (examResult.bianzhi) {
          this.character._bianzhi = examResult.bianzhi
          const bi = bianzhiTypes[examResult.bianzhi]
          this.character._bianzhiName = bi ? bi.name : examResult.bianzhi
          const updated = applyBianzhiEffects(this.character, examResult.bianzhi)
          for (const key in updated) this.character[key] = updated[key]
        }
        const exam = examTypes[this.character._examType]
        if (exam && exam.careerPath) {
          this.character._career = exam.careerPath
        }
        const successRate = calculateExamSuccessRateWithBonus(this.character._examType, this.character)
        const eduBonus = getEducationBonus(this.character, this.character._examType)
        const bonusText = eduBonus.description ? '  ' + eduBonus.description.trim() : ''
        this.currentEvent = {
          text: '🎉 ' + (examResult.message || '恭喜上岸！') + '，面试成功通过！录取概率为 ' + Math.round(successRate * 100) + '%',
          effect: examResult.effect || { happiness: 20, social: 10 }
        }
        this.character = applyEventEffect(this.character, examResult.effect || { happiness: 20, social: 10 })
        this.history.push({ age: this.character.age, text: this.currentEvent.text, effect: examResult.effect || {} })
      } else {
    // 彻底失败
        this.character._examAttempts = (this.character._examAttempts || 0) + 1
        if (examResult.canRetry) {
          this.character._examStage = 'prep'
          this.character._examPrepYears = 0
          this.currentEvent = {
            text: '❌ ' + (examResult.message || '很遗憾未能通过本次考试，继续加油！'),
            effect: { happiness: -10 }
          }
        } else {
          this.character._examStage = 'given_up'
          this.currentEvent = {
            text: '❌ ' + (examResult.message || '很遗憾面试未通过，已超出报考年龄限制，无法再次报名'),
            effect: { happiness: -20, wisdom: 10 }
          }
        }
        this.character = applyEventEffect(this.character, this.currentEvent.effect)
        this.history.push({ age: this.character.age, text: this.currentEvent.text, effect: this.currentEvent.effect })
      }
    },
    getExamStageText(stage) {
      var map = { prep: '复习备考', passed: '成功上岸', given_up: '已放弃', retaking: '再次挑战' }
      return map[stage] || stage
    },
    getBianzhiStability(bianzhiId) {
      var map = { administrative: '行政编制 (极稳定)', public_institution: '事业编制 (极稳定)', teacher: '教师编制 (稳定)', medical: '医疗编制 (稳定)', military_civilian: '军队文职 (极稳定)', none: '非在编人员 (无编制)' }
      return map[bianzhiId] || '非在编人员'
    },
    openBestieDetail(bestie, index) {
      // 在原始 besties 数组中根据 id 查找
      var rawBestie = null
      var rawIdx = -1
      for (var i = 0; i < this.besties.length; i++) {
        if (this.besties[i].id === bestie.id) {
          rawBestie = this.besties[i]
          rawIdx = i
          break
        }
      }
      if (!rawBestie) return
      
      this.currentBestie = {
        id: rawBestie.id,
        name: rawBestie.name,
        type: rawBestie.type,
        typeName: rawBestie.typeName,
        typeIcon: rawBestie.typeIcon,
        favorScore: rawBestie.favorScore || 0,
        favorLevel: getFavorLevel(rawBestie.favorScore || 0).name,
        favorColor: getFavorLevel(rawBestie.favorScore || 0).color,
        years: rawBestie.knowYears || 0
      }
      this.currentBestieIndex = rawIdx
      this.showBestieModal = true
    },
    closeBestieDetail() {
      this.showBestieModal = false
      this.currentBestie = null
      this.currentBestieIndex = -1
    },
    startGathering(typeId) {
      var idx = this.currentBestieIndex
      if (idx < 0 || idx >= this.besties.length) return
      
      var bestie = this.besties[idx]
      var result = hostGathering(bestie, this.character, typeId)
      if (!result || !result.success) {
        uni.showToast({ title: result && result.reason || '无法发起聚会', icon: 'none' })
        return
      }
      
      // 更新 bestie 数据
      this.besties[idx] = bestie
      
      // 应用效果
      this.character = applyEventEffect(this.character, result.effects)
      
      // 更新 UI
      this.currentBestie.favorScore = bestie.favorScore
      this.currentBestie.favorLevel = getFavorLevel(bestie.favorScore).name
      
      // 弹出聚会结果
      uni.showToast({ title: '聚会愉快！好感度+' + result.affectionGain, icon: 'none', duration: 2000 })
      
      // 添加历史事件
      this.history.push({
        age: this.character.age,
        text: '和' + bestie.name + '搞了一次' + (result.gathering ? result.gathering.name : '') + '，很开心。'
      })
      
      this.closeBestieDetail()
    },
    makeGatheringChoice(choice, index) {
      var result = processChoiceResult(choice)
      
      // 应用效果
      this.character = applyEventEffect(this.character, result.effect || {})
      this.history.push({
        age: this.character.age,
        text: result.followUp || choice.followUp || ''
      })
      
      // 更新对应挚友好感度
      if (result.bestieAffection && this.currentGatheringEvent && this.currentGatheringEvent.bestieId) {
        var bid = this.currentGatheringEvent.bestieId
        for (var i = 0; i < this.besties.length; i++) {
          if (this.besties[i].id === bid) {
            this.besties[i].favorScore = Math.min(100, Math.max(0, (this.besties[i].favorScore || 0) + result.bestieAffection))
            this.besties[i].lastGatheringAge = this.character.age
            if (result.gatheringType && result.bestieAffection > 0) {
              this.besties[i].gatherings = this.besties[i].gatherings || []
              this.besties[i].gatherings.push({
                type: result.gatheringType,
                age: this.character.age,
                affectionGain: result.bestieAffection
              })
            }
            break
          }
        }
      }
      
      this.showGatheringModal = false
      this.currentGatheringEvent = null
      this.saveGame()
    },
  }
}
</script>


<style scoped>
/* ═══════════════════════════════════════════════
   Apple Design System - Simulated Life
   Glassmorphism + Large Radius + Refined Shadows + Breathing Space
   ═══════════════════════════════════════════════ */

.container {
  min-height: 100vh;
  padding: 24rpx 28rpx;
  padding-bottom: 220rpx;
}

/* Character Header Card */
.header {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 28rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.avatar-section {
  display: flex;
  align-items: center;
}

.avatar {
  font-size: 80rpx;
  margin-right: 28rpx;
  filter: drop-shadow(0 4rpx 12rpx rgba(0,0,0,0.3));
}

.basic-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 38rpx;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1rpx;
}

.age {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 6rpx;
  font-weight: 500;
}

.status {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 6rpx;
  font-weight: 500;
}
.bianzhi-badge {
  color: #fbbf24;
  font-weight: 600;
}
.exam-badge {
  color: #93c5fd;
}
.career-badge {
  color: #86efac;
}
.retired-badge {
  color: #fcd34d;
}

.header-actions {
  display: flex;
  gap: 12rpx;
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
}

.action-btn {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.85);
  padding: 10rpx 22rpx;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 40rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  transition: all 0.25s ease;
  font-weight: 500;
}

.action-btn:active {
  background: rgba(255, 255, 255, 0.18);
  transform: scale(0.95);
}

/* Stats Panel */
.stats-panel {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 28rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
}

.extra-stats {
  margin-top: 12rpx;
  padding-top: 12rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.06);
}
.stat-row {
  display: flex;
  gap: 20rpx;
  margin-bottom: 18rpx;
}

.stat-row:last-child {
  margin-bottom: 0;
}

.stat-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.stat-icon {
  font-size: 26rpx;
}

.stat-name {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.5);
  width: 60rpx;
  font-weight: 500;
}

.stat-bar-wrap {
  flex: 1;
  height: 14rpx;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 7rpx;
  overflow: hidden;
  position: relative;
}

.stat-bar {
  height: 100%;
  border-radius: 7rpx;
  transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.stat-value {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.75);
  width: 38rpx;
  text-align: right;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.stat-trend {
  font-size: 18rpx;
  width: 24rpx;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
}

/* Season Indicator */
.season-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  margin-top: 18rpx;
  padding: 10rpx 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 30rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.season-emoji {
  font-size: 28rpx;
}

.season-name {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
}

/* Story Line Progress */
.storyline-progress {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.06);
}

.storyline-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.storyline-icon {
  font-size: 22rpx;
  width: 32rpx;
  text-align: center;
}

.storyline-name {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.6);
  width: 100rpx;
  flex-shrink: 0;
  font-weight: 500;
}

.storyline-bar-wrap {
  flex: 1;
  height: 8rpx;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4rpx;
  overflow: hidden;
}

.storyline-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #a78bfa, #c4b5fd);
  border-radius: 4rpx;
  transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.storyline-progress-text {
  font-size: 18rpx;
  color: rgba(255, 255, 255, 0.4);
  width: 44rpx;
  text-align: right;
  font-weight: 500;
}

/* Event Card */
.event-panel {
  margin-bottom: 24rpx;
}

.event-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  border-radius: 24rpx;
  padding: 28rpx;
  animation: slideUpIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

/* 阶段渐变背景 */
.event-card.stage-infant {
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(255, 255, 255, 0.06));
  border-color: rgba(244, 114, 182, 0.2);
}
.event-card.stage-child {
  background: linear-gradient(135deg, rgba(147, 197, 253, 0.15), rgba(255, 255, 255, 0.06));
  border-color: rgba(147, 197, 253, 0.2);
}
.event-card.stage-teen {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(255, 255, 255, 0.06));
  border-color: rgba(167, 139, 250, 0.2);
}
.event-card.stage-young {
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(255, 255, 255, 0.06));
  border-color: rgba(96, 165, 250, 0.2);
}
.event-card.stage-adult {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.15), rgba(255, 255, 255, 0.06));
  border-color: rgba(156, 163, 175, 0.2);
}
.event-card.stage-elder {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(217, 119, 6, 0.08), rgba(255, 255, 255, 0.06));
  border-color: rgba(251, 191, 36, 0.2);
}

/* 故事线卡片发光 */
.event-card.storyline-card {
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1),
              0 0 20rpx rgba(168, 85, 247, 0.2);
}

/* 稀有事件卡片发光 */
.event-card.special-card {
  border-color: rgba(251, 191, 36, 0.4);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1),
              0 0 20rpx rgba(251, 191, 36, 0.2);
}

/* 事件头部行 */
.event-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

/* 事件标记 */
.event-marker {
  font-size: 20rpx;
  padding: 4rpx 14rpx;
  border-radius: 20rpx;
  font-weight: 600;
}
.event-marker.stage {
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.06);
}
.event-marker.storyline {
  color: #c4b5fd;
  background: rgba(168, 85, 247, 0.15);
  border: 1rpx solid rgba(168, 85, 247, 0.25);
}
.event-marker.special {
  color: #fcd34d;
  background: rgba(251, 191, 36, 0.15);
  border: 1rpx solid rgba(251, 191, 36, 0.25);
}

/* 事件元数据行 */
.event-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 12rpx;
  align-items: center;
}

/* 类别标签 */
.category-tag {
  font-size: 20rpx;
  padding: 4rpx 14rpx;
  border-radius: 20rpx;
  color: rgba(255, 255, 255, 0.65);
  background: rgba(255, 255, 255, 0.08);
  font-weight: 500;
}

/* 氛围文字 */
.event-atmosphere {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.35);
  display: block;
  margin-top: 10rpx;
  font-style: italic;
  line-height: 1.5;
}

.event-age {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  display: block;
  margin-bottom: 12rpx;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.event-text {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  display: block;
  font-weight: 500;
}

.event-effects {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 18rpx;
}

.effect-tag {
  font-size: 22rpx;
  padding: 6rpx 18rpx;
  border-radius: 40rpx;
  font-weight: 500;
  letter-spacing: 0.5rpx;
}

.effect-tag.positive {
  background: rgba(52, 211, 153, 0.18);
  color: #6ee7b7;
  border: 1rpx solid rgba(52, 211, 153, 0.3);
  box-shadow: 0 2rpx 8rpx rgba(52, 211, 153, 0.1);
}

.effect-tag.negative {
  background: rgba(251, 113, 133, 0.18);
  color: #fda4af;
  border: 1rpx solid rgba(251, 113, 133, 0.3);
  box-shadow: 0 2rpx 8rpx rgba(251, 113, 133, 0.1);
}

/* History Panel */
.history-panel {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 28rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.08);
}

.panel-title {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 18rpx;
  display: block;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3rpx;
}

.history-scroll {
  max-height: 360rpx;
}

.history-item {
  display: flex;
  padding: 16rpx 0;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.04);
  align-items: flex-start;
}

.history-item.history-item.choice-item {
  background: rgba(99, 102, 241, 0.06);
  border-left: 3rpx solid rgba(99, 102, 241, 0.4);
  border-radius: 0 12rpx 12rpx 0;
  padding: 16rpx 12rpx;
  margin: 0 -12rpx;
}

.history-item.milestone-item {
  background: rgba(251, 191, 36, 0.06);
  border-left: 3rpx solid rgba(251, 191, 36, 0.4);
  border-radius: 0 12rpx 12rpx 0;
  padding: 16rpx 12rpx;
  margin: 0 -12rpx;
}

.history-dot {
  font-size: 18rpx;
  width: 28rpx;
  text-align: center;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.25);
  padding-top: 4rpx;
}

.choice-item .history-dot {
  color: rgba(99, 102, 241, 0.7);
}

.milestone-item .history-dot {
  color: rgba(251, 191, 36, 0.7);
}

.choice-text {
  color: rgba(199, 210, 254, 0.85);
}

.milestone-text {
  color: rgba(253, 230, 138, 0.9);
}

.history-item:last-child {
  border-bottom: none;
}

.history-age {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.4);
  width: 76rpx;
  flex-shrink: 0;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.history-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.65);
  flex: 1;
  line-height: 1.5;
}

/* Bottom Dock */
.action-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 12rpx;
  padding: 20rpx 28rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: rgba(15, 15, 35, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 1rpx solid rgba(255, 255, 255, 0.08);
}

.action-btn {
  flex: 1;
  padding: 22rpx 10rpx;
  border-radius: 20rpx;
  text-align: center;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.action-btn:active {
  transform: scale(0.94);
}

.timeline-btn {
  background: rgba(251, 191, 36, 0.15);
  border: 1rpx solid rgba(251, 191, 36, 0.25);
  flex: 0.6;
}

.skills-btn {
  background: rgba(168, 85, 247, 0.15);
  border: 1rpx solid rgba(168, 85, 247, 0.25);
  flex: 0.6;
}

.next-year-btn {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  box-shadow: 0 4rpx 16rpx rgba(99, 102, 241, 0.35);
  flex: 1.4;
}

.skip-btn {
  background: rgba(244, 114, 182, 0.15);
  border: 1rpx solid rgba(244, 114, 182, 0.25);
  flex: 1;
}

.action-text {
  font-size: 26rpx;
  font-weight: 600;
  color: #fff;
}

/* Choice Modal */
.choice-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 40rpx;
}

.choice-content {
  width: 100%;
  max-width: 650rpx;
  background: rgba(30, 30, 50, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 32rpx;
  padding: 40rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  animation: appleModalIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.5),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.choice-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28rpx;
}

.choice-age {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  font-weight: 600;
}

.choice-title {
  font-size: 32rpx;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.choice-question {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  display: block;
  margin-bottom: 32rpx;
  text-align: center;
  font-weight: 500;
}

.choice-options {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.choice-option {
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  padding: 26rpx;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.choice-option:active {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.4);
  transform: scale(0.97);
}

.option-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-bottom: 10rpx;
  font-weight: 500;
}

.option-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.preview-tag {
  font-size: 22rpx;
  padding: 4rpx 14rpx;
  border-radius: 16rpx;
  font-weight: 500;
}

.preview-tag.positive {
  background: rgba(52, 211, 153, 0.15);
  color: #6ee7b7;
}

.preview-tag.negative {
  background: rgba(251, 113, 133, 0.15);
  color: #fda4af;
}

.choice-tip {
  margin-top: 28rpx;
  text-align: center;
}

.tip-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 400;
}

/* Result Modal */
.result-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 40rpx;
}

.result-content {
  width: 100%;
  max-width: 550rpx;
  background: rgba(30, 30, 50, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 32rpx;
  padding: 50rpx 40rpx;
  text-align: center;
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  animation: appleModalIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.5),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.result-title {
  font-size: 56rpx;
  font-weight: 800;
  display: block;
  margin-bottom: 20rpx;
}

.result-title.success {
  color: #30d158;
}

.result-title.fail {
  color: #ff453a;
}

.result-title.neutral {
  color: #ffd700;
  font-size: 48rpx;
  background: linear-gradient(135deg, #ffd700, #ff9500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.result-text {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  display: block;
  margin-bottom: 25rpx;
  font-weight: 500;
}

.result-effects {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12rpx;
  margin-bottom: 30rpx;
}

.result-tag {
  font-size: 26rpx;
  padding: 8rpx 18rpx;
  border-radius: 20rpx;
  font-weight: 500;
}

.result-tag.positive {
  background: rgba(52, 211, 153, 0.2);
  color: #6ee7b7;
}

.result-tag.negative {
  background: rgba(251, 113, 133, 0.2);
  color: #fda4af;
}

.result-btn {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  padding: 25rpx 60rpx;
  border-radius: 50rpx;
  display: inline-block;
}

.result-btn text {
  font-size: 30rpx;
  font-weight: 600;
  color: #fff;
}

/* Milestone Toast */
.milestone-toast {
  position: fixed;
  top: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 18rpx 36rpx;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-radius: 50rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  z-index: 100;
  animation: toastIn 0.4s ease-out, toastOut 0.4s ease-in 2s forwards;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.2);
}

.toast-icon {
  font-size: 30rpx;
}

.toast-text {
  font-size: 26rpx;
  color: #fff;
  font-weight: 600;
}

/* Achievement Toast */
.achievement-toast {
  position: fixed;
  top: 280rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 18rpx 28rpx;
  background: rgba(251, 191, 36, 0.15);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-radius: 20rpx;
  border: 1rpx solid rgba(251, 191, 36, 0.3);
  z-index: 100;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.2);
  animation: toastIn 0.4s ease-out, toastOut 0.4s ease-in 2.5s forwards;
}

.achievement-icon {
  font-size: 36rpx;
}

.achievement-info {
  display: flex;
  flex-direction: column;
}

.achievement-name {
  font-size: 26rpx;
  color: #fbbf24;
  font-weight: 600;
}

.achievement-desc {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.6);
}

/* Exam Modal */
.exam-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.exam-content {
  background: rgba(30, 30, 50, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 32rpx;
  padding: 48rpx;
  width: 85%;
  max-width: 650rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.5),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}
.exam-header {
  text-align: center;
  margin-bottom: 30rpx;
}
.exam-icon {
  font-size: 80rpx;
  display: block;
  margin-bottom: 15rpx;
}
.exam-title {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-weight: 500;
}
.exam-options {
  margin-top: 25rpx;
}
.exam-option {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 18rpx;
  padding: 24rpx 28rpx;
  margin-bottom: 14rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.exam-option:active {
  background: rgba(251, 191, 36, 0.12);
  border-color: rgba(251, 191, 36, 0.4);
  transform: scale(0.98);
}
.exam-option-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}
.exam-option-hint {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.4);
  display: block;
  margin-top: 8rpx;
}
.exam-bonus-tip {
  display: block;
  font-size: 22rpx;
  color: #fbbf24;
  margin-bottom: 12rpx;
  padding: 8rpx 16rpx;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 12rpx;
  font-weight: 500;
}
.exam-actions {
  margin-top: 30rpx;
  text-align: center;
}
.exam-btn {
  display: inline-block;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 600;
}
.exam-btn-primary {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1a1a2e;
}
.exam-bianzhi {
  margin-top: 25rpx;
  padding: 20rpx;
  background: rgba(251, 191, 36, 0.08);
  border-radius: 16rpx;
  border: 1rpx solid rgba(251, 191, 36, 0.2);
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.bianzhi-tag {
  font-size: 28rpx;
  color: #fbbf24;
  font-weight: 600;
}
.bianzhi-stability {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}
.exam-status {
  margin-top: 20rpx;
  padding: 15rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12rpx;
}
.exam-status-text {
  font-size: 24rpx;
  color: #93c5fd;
  display: block;
  font-weight: 500;
}
.exam-progress-bar {
  height: 8rpx;
  background: rgba(147, 197, 253, 0.15);
  border-radius: 4rpx;
  margin: 10rpx 0;
  overflow: hidden;
}
.exam-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #93c5fd, #60a5fa);
  border-radius: 4rpx;
  transition: width 0.3s ease;
}
.exam-status-info {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.35);
  display: block;
}

/* Fate Modal */
.fate-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  padding: 40rpx;
}

.fate-content {
  width: 100%;
  max-width: 650rpx;
  background: rgba(30, 20, 50, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 32rpx;
  padding: 40rpx;
  border: 1rpx solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 24rpx 80rpx rgba(168, 85, 247, 0.15),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.fate-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15rpx;
  margin-bottom: 15rpx;
}

.fate-icon {
  font-size: 48rpx;
}

.fate-age {
  font-size: 24rpx;
  color: rgba(168, 85, 247, 0.8);
  background: rgba(168, 85, 247, 0.15);
  padding: 6rpx 18rpx;
  border-radius: 16rpx;
  font-weight: 600;
}

.fate-title {
  font-size: 36rpx;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  display: block;
  text-align: center;
  margin-bottom: 15rpx;
}

.fate-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.65);
  display: block;
  text-align: center;
  margin-bottom: 30rpx;
  line-height: 1.6;
}

.fate-options {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 25rpx;
}

.fate-option {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  padding: 22rpx;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fate-option.rare {
  border-color: rgba(96, 165, 250, 0.3);
  background: rgba(96, 165, 250, 0.08);
}

.fate-option.epic {
  border-color: rgba(168, 85, 247, 0.3);
  background: rgba(168, 85, 247, 0.08);
}

.fate-option.legendary {
  border-color: rgba(251, 191, 36, 0.4);
  background: rgba(251, 191, 36, 0.08);
  animation: legendaryGlow 2s ease-in-out infinite;
}

@keyframes legendaryGlow {
  0%, 100% { box-shadow: 0 0 10rpx rgba(251, 191, 36, 0.15); }
  50% { box-shadow: 0 0 24rpx rgba(251, 191, 36, 0.3); }
}

.fate-option-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-bottom: 10rpx;
  font-weight: 600;
}

.fate-option-meta {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.fate-rarity-tag {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 10rpx;
  font-weight: 500;
}

.fate-effect-preview {
  display: flex;
  gap: 8rpx;
  flex-wrap: wrap;
}

.fate-effect {
  font-size: 22rpx;
  padding: 4rpx 10rpx;
  border-radius: 10rpx;
  font-weight: 500;
}

.fate-effect.positive {
  background: rgba(52, 211, 153, 0.15);
  color: #6ee7b7;
}

.fate-effect.negative {
  background: rgba(251, 113, 133, 0.15);
  color: #fda4af;
}

.fate-tip {
  font-size: 24rpx;
  color: rgba(168, 85, 247, 0.6);
  text-align: center;
  display: block;
}

/* Property Modal */
.property-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.property-content {
  width: 90%;
  max-height: 80vh;
  background: rgba(30, 30, 50, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 28rpx;
  padding: 30rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.5),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.property-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin-bottom: 30rpx;
}

.property-icon {
  font-size: 48rpx;
}

.property-title {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 700;
}

.property-list {
  max-height: 50vh;
  overflow-y: auto;
}

.property-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  margin-bottom: 14rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.property-item:active {
  background: rgba(251, 191, 36, 0.08);
}

.property-icon-lg {
  font-size: 40rpx;
}

.property-info {
  flex: 1;
}

.property-name {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8rpx;
  font-weight: 500;
}

.property-payment {
  display: block;
  font-size: 22rpx;
  color: #fbbf24;
}

.property-actions {
  display: flex;
  justify-content: center;
  margin-top: 30rpx;
}

.property-btn {
  padding: 16rpx 60rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  text-align: center;
  font-weight: 500;
}

.property-btn.cancel {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
}

/* Social Modal */
.social-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.social-content {
  width: 90%;
  max-height: 85vh;
  background: rgba(30, 30, 50, 0.92);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 28rpx;
  padding: 30rpx;
  border: 1rpx solid rgba(96, 165, 250, 0.2);
  box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.5),
              inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.social-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin-bottom: 30rpx;
}

.social-icon {
  font-size: 48rpx;
}

.social-title {
  font-size: 32rpx;
  color: #93c5fd;
  font-weight: 700;
}

.social-section {
  margin-bottom: 25rpx;
}

.section-title {
  display: block;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 15rpx;
  padding-left: 12rpx;
  border-left: 4rpx solid rgba(96, 165, 250, 0.6);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.org-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 18rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14rpx;
  margin-bottom: 12rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.org-item.joined {
  background: rgba(96, 165, 250, 0.08);
  border-color: rgba(96, 165, 250, 0.25);
}

.org-item:active {
  background: rgba(96, 165, 250, 0.12);
}

.org-icon {
  font-size: 36rpx;
  width: 50rpx;
  text-align: center;
}

.org-info {
  flex: 1;
}

.org-name {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 6rpx;
  font-weight: 500;
}

.org-cost, .org-year {
  display: block;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.45);
}

.org-leave {
  font-size: 24rpx;
  color: #f87171;
  padding: 8rpx 16rpx;
  background: rgba(248, 113, 113, 0.1);
  border-radius: 10rpx;
  font-weight: 500;
}

.social-actions {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
}

.social-btn {
  padding: 16rpx 60rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  text-align: center;
  font-weight: 500;
}

.social-btn.cancel {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
}

/* Animations */
@keyframes slideUpIn {
  from {
    opacity: 0;
    transform: translateY(32rpx) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes appleFadeIn {
  from {
    opacity: 0;
    transform: translateY(16rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes appleModalIn {
  from {
    opacity: 0;
    transform: scale(0.88);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4rpx 16rpx rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 4rpx 28rpx rgba(99, 102, 241, 0.5);
  }
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-24rpx) scale(0.88);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-16rpx) scale(0.92);
  }
}

/* ─── 挚友信息条 ───────────────────────────────── */
.bestie-strip {
  margin: 12rpx 20rpx 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}
.bestie-chip {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 8rpx 16rpx;
  border-radius: 24rpx;
  background: rgba(255,255,255,0.95);
  border: 2rpx solid #60a5fa;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}
.bestie-chip-icon {
  font-size: 24rpx;
}
.bestie-chip-name {
  font-size: 22rpx;
  color: #374151;
  font-weight: 600;
  max-width: 100rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bestie-chip-bar-wrap {
  width: 60rpx;
  height: 6rpx;
  background: #e5e7eb;
  border-radius: 3rpx;
  overflow: hidden;
}
.bestie-chip-bar {
  height: 100%;
  border-radius: 3rpx;
  transition: width 0.3s;
}
.bestie-chip-level {
  font-size: 18rpx;
  font-weight: 700;
}

/* ─── 挚友详情弹窗 ───────────────────────────── */
.bestie-detail-modal {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.25s;
}
.bestie-detail-content {
  width: 600rpx;
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  animation: slideUp 0.3s;
}
.bestie-detail-header {
  display: flex;
  align-items: center;
  padding: 32rpx;
  background: linear-gradient(135deg, #fce7f3, #e0e7ff);
  gap: 16rpx;
}
.bestie-detail-icon {
  font-size: 56rpx;
}
.bestie-detail-title-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.bestie-detail-name {
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
}
.bestie-detail-type {
  font-size: 22rpx;
  color: #6b7280;
}
.bestie-detail-close {
  font-size: 32rpx;
  color: #9ca3af;
  padding: 8rpx;
}
.bestie-detail-body {
  padding: 24rpx 32rpx 32rpx;
}
.bond-panel {
  margin-bottom: 24rpx;
}
.bond-title {
  font-size: 26rpx;
  font-weight: 700;
  color: #374151;
  margin-bottom: 12rpx;
}
.bond-bar-wrap {
  height: 14rpx;
  background: #e5e7eb;
  border-radius: 7rpx;
  overflow: hidden;
  margin-bottom: 12rpx;
}
.bond-bar {
  height: 100%;
  border-radius: 7rpx;
  transition: width 0.4s;
}
.bond-stats {
  display: flex;
  gap: 24rpx;
}
.bond-stat {
  font-size: 22rpx;
  color: #6b7280;
}
.bestie-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}
.bestie-action-btn {
  flex: 1;
  min-width: 120rpx;
  text-align: center;
  padding: 16rpx 12rpx;
  background: linear-gradient(135deg, #f9fafb, #f3f4f6);
  border-radius: 16rpx;
  font-size: 24rpx;
  color: #374151;
  border: 1rpx solid #e5e7eb;
  transition: all 0.2s;
}
.bestie-action-btn:active {
  background: linear-gradient(135deg, #ede9fe, #dbeafe);
  transform: scale(0.97);
}

/* ─── 聚会确认弹窗 ───────────────────────────── */
.gathering-modal {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1001;
  animation: fadeIn 0.25s;
}
.gathering-content {
  width: 640rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  animation: slideUp 0.3s;
}
.gathering-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}
.gathering-icon {
  font-size: 40rpx;
}
.gathering-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}
.gathering-text {
  font-size: 26rpx;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 24rpx;
  display: block;
}
.gathering-options {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.gathering-option {
  padding: 20rpx 24rpx;
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  border-radius: 16rpx;
  border: 1rpx solid #d1fae5;
}
.gathering-option:active {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  transform: scale(0.98);
}
.gathering-option-text {
  font-size: 26rpx;
  color: #374151;
  font-weight: 600;
  display: block;
  margin-bottom: 8rpx;
}
.gathering-option-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}
.preview-tag {
  font-size: 20rpx;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
}
.preview-tag.positive {
  background: #dcfce7;
  color: #16a34a;
}
.preview-tag.negative {
  background: #fee2e2;
  color: #dc2626;
}
</style>
