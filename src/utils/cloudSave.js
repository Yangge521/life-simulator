// ============================================================
// 人生模拟器 - 云端存档服务
// 与后端 server.js 配合实现云同步
// ============================================================

// 配置：修改为你的服务器地址
const API_BASE = 'http://localhost:8080/api'

// ─── 工具函数 ─────────────────────────────────────────────

function getUserId() {
  // 优先使用微信 openid，其他平台生成随机ID
  let userId = uni.getStorageSync('cloudUserId')
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    uni.setStorageSync('cloudUserId', userId)
  }
  return userId
}

function request(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_BASE + options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(new Error((res.data && res.data.error) || '请求失败'))
        }
      },
      fail: (err) => {
        reject(new Error('网络错误: ' + (err.errMsg || '未知错误')))
      }
    })
  })
}

// ─── 云存档API ─────────────────────────────────────────────

/**
 * 保存游戏数据到云端
 * @param {Object} saveData - 要保存的数据（角色、历史、传承等）
 * @returns {Promise<Object>}
 */
export async function saveToCloud(saveData) {
  try {
    const userId = getUserId()
    const result = await request({
      url: '/save',
      method: 'POST',
      data: { userId, saveData }
    })
    
    if (result.success) {
      // 同时保存一份到本地作为备份
      uni.setStorageSync('lastCloudSave', {
        timestamp: Date.now(),
        data: saveData
      })
    }
    
    return result
  } catch (error) {
    console.error('云端保存失败:', error)
    throw error
  }
}

/**
 * 从云端加载游戏数据
 * @returns {Promise<Object>}
 */
export async function loadFromCloud() {
  try {
    const userId = getUserId()
    const result = await request({
      url: `/load/${userId}`,
      method: 'GET'
    })
    
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.error || '加载失败')
    }
  } catch (error) {
    console.error('云端加载失败:', error)
    throw error
  }
}

/**
 * 检查云端是否有存档
 * @returns {Promise<Object>}
 */
export async function checkCloudSave() {
  try {
    const userId = getUserId()
    const result = await request({
      url: `/sync/status/${userId}`,
      method: 'GET'
    })
    return result
  } catch (error) {
    console.error('检查云端存档失败:', error)
    return { hasCloudSave: false, error: error.message }
  }
}

/**
 * 获取所有云端存档列表
 * @returns {Promise<Array>}
 */
export async function listCloudSaves() {
  try {
    const userId = getUserId()
    const result = await request({
      url: `/saves/${userId}`,
      method: 'GET'
    })
    return result.saves || []
  } catch (error) {
    console.error('获取存档列表失败:', error)
    return []
  }
}

/**
 * 删除云端存档
 * @param {string} filename
 * @returns {Promise<Object>}
 */
export async function deleteCloudSave(filename) {
  try {
    const userId = getUserId()
    const result = await request({
      url: `/save/${userId}/${filename}`,
      method: 'DELETE'
    })
    return result
  } catch (error) {
    console.error('删除云端存档失败:', error)
    throw error
  }
}

// ─── 自动同步 ─────────────────────────────────────────────

let autoSyncTimer = null

/**
 * 开启自动云同步
 * 每隔 interval 分钟自动保存一次
 * @param {Function} getSaveData - 获取当前存档数据的函数
 * @param {number} interval - 同步间隔（分钟）
 */
export function startAutoSync(getSaveData, interval = 5) {
  stopAutoSync()
  
  autoSyncTimer = setInterval(async () => {
    try {
      const saveData = getSaveData()
      if (saveData) {
        await saveToCloud(saveData)
        console.log('✅ 自动云同步成功')
      }
    } catch (error) {
      console.error('❌ 自动云同步失败:', error.message)
    }
  }, interval * 60 * 1000)
  
  console.log(`🔄 自动云同步已开启（每${interval}分钟）`)
}

/**
 * 停止自动云同步
 */
export function stopAutoSync() {
  if (autoSyncTimer) {
    clearInterval(autoSyncTimer)
    autoSyncTimer = null
    console.log('⏹️ 自动云同步已停止')
  }
}

/**
 * 检测到新版本时提示用户同步
 */
export function checkVersionAndSync(localVersion, cloudVersion) {
  if (!cloudVersion) return false
  
  const localTime = new Date(localVersion).getTime()
  const cloudTime = new Date(cloudVersion).getTime()
  
  // 云端版本更新则返回true提示用户
  return cloudTime > localTime
}

// ─── 数据合并策略 ───────────────────────────────────────────

/**
 * 本地和云端数据合并
 * @param {Object} local - 本地数据
 * @param {Object} cloud - 云端数据
 * @returns {Object} 合并后的数据
 */
export function mergeSaveData(local, cloud) {
  // 简单策略：取较新的数据
  const localTime = (local && local.savedAt) ? new Date(local.savedAt).getTime() : 0
  const cloudTime = (cloud && cloud.savedAt) ? new Date(cloud.savedAt).getTime() : 0
  
  if (cloudTime > localTime) {
    // 云端更新，询问用户是否覆盖
    return { newer: cloud, older: local, which: 'cloud' }
  } else {
    return { newer: local, older: cloud, which: 'local' }
  }
}

/**
 * 导出存档为JSON（用于分享）
 * @param {Object} saveData 
 * @returns {string}
 */
export function exportSaveData(saveData) {
  return JSON.stringify(saveData, null, 2)
}

/**
 * 导入存档JSON
 * @param {string} jsonStr 
 * @returns {Object}
 */
export function importSaveData(jsonStr) {
  try {
    const data = JSON.parse(jsonStr)
    // 简单验证
    if (typeof data !== 'object') {
      throw new Error('格式错误')
    }
    return data
  } catch (error) {
    throw new Error('无效的存档数据')
  }
}
