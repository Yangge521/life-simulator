const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 8080

// 简单的 CORS 中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

// 不使用 cors 包
// app.use(cors())
app.use(express.json({ limit: '10mb' }))

// 静态文件目录（根据构建输出调整）
const staticDir = path.join(__dirname, 'dist', 'build', 'h5')
app.use(express.static(staticDir))

// ─── 存档存储目录 ───────────────────────────────────────────
const SAVE_DIR = path.join(__dirname, 'saves')
if (!fs.existsSync(SAVE_DIR)) {
  fs.mkdirSync(SAVE_DIR, { recursive: true })
}

// ─── API 路由 ───────────────────────────────────────────────

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// 保存游戏数据
app.post('/api/save', (req, res) => {
  try {
    const { userId, saveData } = req.body
    
    if (!userId || !saveData) {
      return res.status(400).json({ success: false, error: '缺少必要参数' })
    }
    
    // 验证数据结构
    if (typeof saveData !== 'object') {
      return res.status(400).json({ success: false, error: '数据格式错误' })
    }
    
    // 生成文件名
    const filename = `${userId}_${Date.now()}.json`
    const filepath = path.join(SAVE_DIR, filename)
    
    // 保存数据
    const saveContent = {
      userId,
      savedAt: new Date().toISOString(),
      version: '1.0',
      data: saveData
    }
    
    fs.writeFileSync(filepath, JSON.stringify(saveContent, null, 2))
    
    // 同时维护一个最新存档映射
    const latestFile = path.join(SAVE_DIR, `${userId}_latest.json`)
    fs.writeFileSync(latestFile, JSON.stringify({
      userId,
      savedAt: new Date().toISOString(),
      filename
    }))
    
    res.json({ 
      success: true, 
      message: '保存成功',
      savedAt: saveContent.savedAt
    })
    
  } catch (error) {
    console.error('保存失败:', error)
    res.status(500).json({ success: false, error: '服务器错误' })
  }
})

// 加载游戏数据
app.get('/api/load/:userId', (req, res) => {
  try {
    const { userId } = req.params
    
    const latestFile = path.join(SAVE_DIR, `${userId}_latest.json`)
    
    if (!fs.existsSync(latestFile)) {
      return res.status(404).json({ success: false, error: '没有找到存档' })
    }
    
    const latestInfo = JSON.parse(fs.readFileSync(latestFile, 'utf-8'))
    const filepath = path.join(SAVE_DIR, latestInfo.filename)
    
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ success: false, error: '存档文件不存在' })
    }
    
    const saveContent = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
    
    res.json({
      success: true,
      data: saveContent.data,
      savedAt: saveContent.savedAt
    })
    
  } catch (error) {
    console.error('加载失败:', error)
    res.status(500).json({ success: false, error: '服务器错误' })
  }
})

// 列出用户所有存档
app.get('/api/saves/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const files = fs.readdirSync(SAVE_DIR)
    
    const saves = files
      .filter(f => f.startsWith(userId + '_') && f.endsWith('.json') && !f.includes('_latest'))
      .map(f => {
        const filepath = path.join(SAVE_DIR, f)
        const content = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
        return {
          filename: f,
          savedAt: content.savedAt
        }
      })
      .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
    
    res.json({ success: true, saves })
    
  } catch (error) {
    console.error('列举存档失败:', error)
    res.status(500).json({ success: false, error: '服务器错误' })
  }
})

// 删除存档
app.delete('/api/save/:userId/:filename', (req, res) => {
  try {
    const { userId, filename } = req.params
    
    // 安全检查：只允许删除属于该用户的存档
    if (!filename.startsWith(userId + '_')) {
      return res.status(403).json({ success: false, error: '无权删除此存档' })
    }
    
    const filepath = path.join(SAVE_DIR, filename)
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }
    
    res.json({ success: true, message: '删除成功' })
    
  } catch (error) {
    console.error('删除失败:', error)
    res.status(500).json({ success: false, error: '服务器错误' })
  }
})

// 云同步状态检查
app.get('/api/sync/status/:userId', (req, res) => {
  try {
    const { userId } = req.params
    const latestFile = path.join(SAVE_DIR, `${userId}_latest.json`)
    
    if (!fs.existsSync(latestFile)) {
      return res.json({ 
        success: true, 
        hasCloudSave: false 
      })
    }
    
    const latestInfo = JSON.parse(fs.readFileSync(latestFile, 'utf-8'))
    
    res.json({
      success: true,
      hasCloudSave: true,
      lastSavedAt: latestInfo.savedAt
    })
    
  } catch (error) {
    res.status(500).json({ success: false, error: '服务器错误' })
  }
})

// ─── SPA 兜底 ───────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('<h1>404 - 构建产物不存在，请先运行 npm run build:h5</h1>')
    }
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
  console.log(`📁 Saves directory: ${SAVE_DIR}`)
})
