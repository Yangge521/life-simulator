# 🎮 模拟人生 · 微信小程序版

> 回到出生之前，选择不同的人生轨迹。一款基于 uni-app 的文字模拟人生游戏。

## ✨ 功能特性

- 🍼 **出生系统** — 随机家庭背景、属性、天赋
- 🎓 **教育系统** — 从幼儿园到大学，完整的升学考试链
- 💼 **职业系统** — 多种职业路径，晋升、跳槽、薪资计算
- ❤️ **社交关系** — 恋爱、结婚、朋友、社交圈
- 🎯 **命运之轮** — 随机事件、选择分支、隐藏剧情
- 🌳 **技能树** — 多维度技能培养
- 🏆 **成就系统** — 丰富的成就收集
- 📜 **时间线回顾** — 完整的人生轨迹记录
- ☁️ **云存档** — 支持 Node.js 后端存档同步

## 🛠 技术栈

- **前端框架**: Vue 3 + uni-app
- **构建工具**: Vite 5
- **小程序平台**: 微信小程序
- **后端服务**: Express (可选，用于云存档)

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 微信小程序开发模式
npm run dev:mp-weixin

# 微信小程序构建
npm run build:mp-weixin

# H5 开发模式
npm run dev:h5

# H5 构建
npm run build:h5
```

构建产物在 `dist/build/mp-weixin`，用微信开发者工具打开该目录即可预览。

## 📁 项目结构

```
src/
├── pages/
│   ├── birth/          # 出生页
│   ├── life/           # 主游戏页
│   ├── index/          # 首页
│   ├── ending/         # 结局页
│   ├── timeline/       # 时间线
│   ├── achievements/   # 成就
│   ├── relationships/  # 关系
│   └── skills/         # 技能
└── utils/
    ├── gameEngine.js           # 游戏引擎
    ├── careerData.js           # 职业数据
    ├── examSystem.js           # 考试系统
    ├── storyEngine.js          # 剧情引擎
    ├── fateWheel.js            # 命运之轮
    ├── talents.js              # 天赋系统
    ├── achievements.js         # 成就系统
    ├── inheritanceSystem.js    # 传承系统
    ├── economySystem.js        # 经济系统
    └── ...
```

## 📄 开源协议

MIT License

---

*小程序端使用 [uni-app](https://uniapp.dcloud.net.cn/) 构建，感谢 DCloud 团队。*
