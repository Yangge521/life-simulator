// ============================================================
// 人生模拟器 - 社交分享图片生成
// 使用 Canvas 生成精美的人生总结海报
// ============================================================

// ─── 颜色主题 ─────────────────────────────────────────────────
const rarityColors = {
  common: { bg: '#4a4a4a', accent: '#9e9e9e', text: '#ffffff' },
  uncommon: { bg: '#1b5e20', accent: '#4caf50', text: '#ffffff' },
  rare: { bg: '#0d47a1', accent: '#2196f3', text: '#ffffff' },
  epic: { bg: '#4a148c', accent: '#9c27b0', text: '#ffffff' },
  legendary: { bg: '#e65100', accent: '#ffc107', text: '#ffffff' },
  mythical: { bg: '#b71c1c', accent: '#ff1744', text: '#ffffff' }
}

// ─── 生成分享图片 ─────────────────────────────────────────────
export async function generateShareImage(options) {
  const {
    character,
    endingResult,
    summary,
    achievements = [],
    history = [],
    canvasId = 'shareCanvas'
  } = options

  // #ifdef H5
  return generateShareImageH5(canvasId, character, endingResult, summary, achievements, history)
  // #endif
  
  // #ifndef H5
  return generateShareImageUniapp(canvasId, character, endingResult, summary, achievements, history)
  // #endif
}

// ─── H5 Canvas 实现 ───────────────────────────────────────────
function generateShareImageH5(canvasId, character, endingResult, summary, achievements, history) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.getElementById(canvasId)
      if (!canvas) {
        reject(new Error('Canvas not found'))
        return
      }
      
      const ctx = canvas.getContext('2d')
      const width = 750  // 设计宽度
      const height = 1100 // 高度
      
      canvas.width = width
      canvas.height = height
      
      // 获取配色
      const colors = rarityColors[(endingResult && endingResult.rarity)] || rarityColors.common
      
      // 1. 背景渐变
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, colors.bg)
      gradient.addColorStop(0.5, '#1a1a2e')
      gradient.addColorStop(1, '#16213e')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // 2. 顶部装饰
      ctx.fillStyle = colors.accent
      ctx.globalAlpha = 0.1
      ctx.beginPath()
      ctx.arc(width * 0.8, 80, 200, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      
      // 3. 游戏标题
      ctx.font = 'bold 28px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.textAlign = 'center'
      ctx.fillText('人生模拟器', width / 2, 50)
      
      // 4. 角色名字
      ctx.font = 'bold 52px sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(character.name || '未知', width / 2, 140)
      
      // 5. 享年
      ctx.font = '32px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.fillText(`享年 ${character.age || 0} 岁`, width / 2, 190)
      
      // 6. 结局卡片背景
      roundRect(ctx, 40, 220, width - 80, 200, 20, colors.accent + '30')
      roundRect(ctx, 40, 220, width - 80, 200, 20, 'transparent', colors.accent + '60', 2)
      
      // 7. 结局图标和名称
      ctx.font = '64px sans-serif'
      ctx.fillText((endingResult && endingResult.icon) || '🌟', width / 2, 300)
      
      ctx.font = 'bold 36px sans-serif'
      ctx.fillStyle = colors.accent
      ctx.fillText((endingResult && endingResult.name) || '普通结局', width / 2, 360)
      
      ctx.font = '24px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.fillText((endingResult && endingResult.description) || '', width / 2, 395)
      
      // 8. 属性条
      const stats = [
        { key: 'wealth', name: '💰 财富', value: character.wealth || 50, color: '#ffd700' },
        { key: 'health', name: '❤️ 健康', value: character.health || 50, color: '#ff6b6b' },
        { key: 'happiness', name: '😊 幸福', value: character.happiness || 50, color: '#4ecdc4' },
        { key: 'intelligence', name: '🧠 智力', value: character.intelligence || 50, color: '#a8e6cf' }
      ]
      
      let statY = 450
      for (const stat of stats) {
        drawStatBar(ctx, 80, statY, width - 160, 36, stat.value, stat.color, stat.name.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, ''))
        statY += 55
      }
      
      // 9. 成就展示
      if (achievements.length > 0) {
        ctx.font = 'bold 28px sans-serif'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'left'
        ctx.fillText('🏆 成就', 60, statY + 30)
        
        const achText = achievements.slice(0, 5).map(a => {
          if (typeof a === 'string') return a
          return a.name || a
        }).join(' · ')
        
        ctx.font = '22px sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.7)'
        ctx.fillText(achText, 60, statY + 65)
      }
      
      // 10. 墓志铭
      const epitaph = (endingResult && endingResult.epitaph) || '「平平淡淡才是真」'
      ctx.font = 'italic 26px sans-serif'
      ctx.fillStyle = colors.accent
      ctx.textAlign = 'center'
      ctx.fillText(epitaph, width / 2, height - 120)
      
      // 11. 评分
      ctx.font = 'bold 48px sans-serif'
      ctx.fillStyle = '#ffd700'
      ctx.fillText(`${summary.score || 0}`, width / 2, height - 60)
      
      ctx.font = '20px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.fillText('人生评分', width / 2, height - 30)
      
      // 12. 小程序码提示
      ctx.font = '18px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.fillText('长按识别小程序码继续冒险', width / 2, height - 10)
      
      // 导出图片
      setTimeout(() => {
        try {
          const dataUrl = canvas.toDataURL('image/png', 1.0)
          resolve(dataUrl)
        } catch (e) {
          reject(e)
        }
      }, 100)
      
    } catch (e) {
      reject(e)
    }
  })
}

// ─── uni-app Canvas 实现 ─────────────────────────────────────
function generateShareImageUniapp(canvasId, character, endingResult, summary, achievements, history) {
  return new Promise((resolve, reject) => {
    const ctx = uni.createCanvasContext(canvasId)
    const width = 750
    const height = 1100
    const colors = rarityColors[(endingResult && endingResult.rarity)] || rarityColors.common
    
    // 背景
    ctx.setFillStyle(colors.bg)
    ctx.fillRect(0, 0, width, height)
    
    // 标题
    ctx.setFontSize(28)
    ctx.setFillStyle('#ffffff')
    ctx.setTextAlign('center')
    ctx.fillText('人生模拟器', width / 2, 50)
    
    // 名字
    ctx.setFontSize(52)
    ctx.setFillStyle('#ffffff')
    ctx.fillText(character.name || '未知', width / 2, 140)
    
    // 享年
    ctx.setFontSize(32)
    ctx.setFillStyle('rgba(255,255,255,0.7)')
    ctx.fillText(`享年 ${character.age || 0} 岁`, width / 2, 190)
    
    // 结局
    ctx.setFontSize(64)
    ctx.fillText((endingResult && endingResult.icon) || '🌟', width / 2, 290)
    
    ctx.setFontSize(36)
    ctx.setFillStyle(colors.accent)
    ctx.fillText((endingResult && endingResult.name) || '普通结局', width / 2, 350)
    
    ctx.setFontSize(24)
    ctx.setFillStyle('rgba(255,255,255,0.6)')
    ctx.fillText((endingResult && endingResult.description) || '', width / 2, 390)
    
    // 属性
    const stats = [
      { value: character.wealth || 50, color: '#ffd700', label: '💰' },
      { value: character.health || 50, color: '#ff6b6b', label: '❤️' },
      { value: character.happiness || 50, color: '#4ecdc4', label: '😊' },
      { value: character.intelligence || 50, color: '#a8e6cf', label: '🧠' }
    ]
    
    let y = 440
    for (const s of stats) {
      ctx.setFontSize(22)
      ctx.setFillStyle('#ffffff')
      ctx.textAlign = 'left'
      ctx.fillText(s.label, 80, y)
      
      ctx.setFillStyle('rgba(255,255,255,0.2)')
      ctx.fillRect(140, y - 15, 400, 20)
      
      ctx.setFillStyle(s.color)
      ctx.fillRect(140, y - 15, Math.round(s.value * 4), 20)
      
      ctx.setFontSize(20)
      ctx.setFillStyle('#ffffff')
      ctx.textAlign = 'right'
      ctx.fillText(Math.round(s.value), 560, y)
      
      y += 50
    }
    
    // 成就
    if (achievements.length > 0) {
      ctx.setFontSize(28)
      ctx.setFillStyle('#ffffff')
      ctx.textAlign = 'left'
      ctx.fillText('🏆 成就', 60, y + 30)
      
      const achText = achievements.slice(0, 4).map(a => typeof a === 'string' ? a : a.name).join(' · ')
      ctx.setFontSize(22)
      ctx.setFillStyle('rgba(255,255,255,0.7)')
      ctx.fillText(achText, 60, y + 65)
    }
    
    // 墓志铭
    const epitaph = (endingResult && endingResult.epitaph) || '「平平淡淡才是真」'
    ctx.setFontSize(26)
    ctx.setFillStyle(colors.accent)
    ctx.setTextAlign('center')
    ctx.fillText(epitaph, width / 2, height - 120)
    
    // 评分
    ctx.setFontSize(48)
    ctx.setFillStyle('#ffd700')
    ctx.fillText(`${summary.score || 0}`, width / 2, height - 60)
    
    ctx.setFontSize(20)
    ctx.setFillStyle('rgba(255,255,255,0.5)')
    ctx.fillText('人生评分', width / 2, height - 30)
    
    ctx.draw(false, () => {
      setTimeout(() => {
        uni.canvasToTempFilePath({
          canvasId,
          quality: 1,
          success: res => resolve(res.tempFilePath),
          fail: reject
        })
      }, 200)
    })
  })
}

// ─── Canvas 辅助函数 ──────────────────────────────────────────

function roundRect(ctx, x, y, w, h, r, fill, stroke, strokeWidth) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
  if (fill && fill !== 'transparent') {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = strokeWidth || 1
    ctx.stroke()
  }
}

function drawStatBar(ctx, x, y, w, h, value, color, label) {
  // 标签
  ctx.font = '22px sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'left'
  ctx.fillText(label, x, y + 14)
  
  // 背景条
  ctx.fillStyle = 'rgba(255,255,255,0.15)'
  ctx.fillRect(x + 80, y, w - 130, h)
  
  // 进度条
  const fillWidth = Math.round((value / 100) * (w - 130))
  const gradient = ctx.createLinearGradient(x + 80, y, x + 80 + fillWidth, y)
  gradient.addColorStop(0, color)
  gradient.addColorStop(1, color + '99')
  ctx.fillStyle = gradient
  ctx.fillRect(x + 80, y, fillWidth, h)
  
  // 数值
  ctx.font = 'bold 24px sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'right'
  ctx.fillText(Math.round(value), x + w - 40, y + 16)
  
  // 数值标签
  ctx.font = '20px sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.textAlign = 'right'
  ctx.fillText(`/${value}`, x + w - 5, y + 16)
}

// ─── 保存/分享图片 ────────────────────────────────────────────
export function saveShareImage(tempFilePath) {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    // H5 直接下载
    const link = document.createElement('a')
    link.download = `人生模拟器_${Date.now()}.png`
    link.href = tempFilePath
    link.click()
    resolve(tempFilePath)
    // #endif
    
    // #ifndef H5
    // uni-app 保存到相册
    uni.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success: () => resolve(tempFilePath),
      fail: reject
    })
    // #endif
  })
}

export function shareImage(tempFilePath, title, description) {
  // #ifdef H5
  // H5 分享
  if (navigator.share) {
    navigator.share({
      title: title || '人生模拟器',
      text: description || '我在人生模拟器中活出了精彩人生！',
      url: window.location.href
    })
  }
  // #endif
  
  // #ifndef H5
  // uni-app 分享
  uni.share({
    provider: 'weixin',
    type: 'image',
    imageData: tempFilePath,
    success: () => {},
    fail: () => {
      // 降级：保存到相册
      saveShareImage(tempFilePath)
    }
  })
  // #endif
}
