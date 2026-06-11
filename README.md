# 🎮 模拟人生 · Life Simulator

> 回到出生之前，选择不同的人生轨迹。一款高自由度的文字模拟人生微信小程序。

<p align="center">
  <img src="https://img.shields.io/badge/platform-WeChat%20MiniProgram-07C160" alt="platform">
  <img src="https://img.shields.io/badge/framework-uni--app-2B9939" alt="framework">
  <img src="https://img.shields.io/badge/framework-Vue%203-4FC08D" alt="vue">
  <img src="https://img.shields.io/badge/build-Vite%205-646CFF" alt="vite">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license">
</p>

---

## 📖 简介

从出生那一刻开始，你的人生由你自己决定。

- 🍼 随机家庭背景、初始属性、天赋特质
- 🎓 从幼儿园到博士的完整教育链，含升学考试、考编系统
- 💼 多种职业路径：技术、管理、自由职业、创业…可晋升、跳槽、转行
- ❤️ 恋爱、结婚、交友，完整的社交关系网络
- 🎲 命运之轮 — 每年触发随机事件，你的选择改变命运
- 📚 故事线系统 — 28+ 条故事线，含分支选择、多结局、叙事文本
- 👯 挚友系统 — 闺蜜/兄弟/知己，7 级好感度，10 种聚会局
- 🌳 技能树 — 多维度培养角色能力
- 🏆 成就系统 — 丰富的成就收集
- 🎯 天赋/特质系统 — 出生随机获得，影响整个人生
- 📜 时间线回顾 — 完整的人生轨迹可视化（含回溯功能）
- 🌦️ 季节系统 — 四季轮转，氛围文字随季节变化
- ☁️ 云存档 — 可选 Express 后端，支持存档同步

## 🎬 游戏截图

*（待补充）*

## 🧩 核心系统

| 系统 | 说明 |
|------|------|
| **出生系统** | 随机家庭财富、教育背景、天赋特质（普通/稀有/史诗/传说） |
| **教育系统** | 幼儿园→小学→初中→高中→大学→研究生→博士，含升学考试 |
| **考试系统** | 统考/校考/考编，成功率和属性挂钩 |
| **职业系统** | 多职业树、晋升机制、薪资计算、跳槽转行 |
| **经济系统** | 薪资、房产、投资、经济周期波动 |
| **社交系统** | 社交圈、好感度、恋爱结婚、关系维护 |
| **健康系统** | 疾病、成瘾（吸烟/酗酒等）、体检、戒断 |
| **命运之轮** | 每年随机事件，含正面/负面/中性/稀有事件 |
| **故事线** | 28+ 条故事线（事业/感情/家庭/特殊），分支选择影响结局走向 |
| **挚友系统** | 闺蜜/兄弟/知己/发小/职场战友，好感度 7 级，饭局/酒局/旅行等 10 种聚会 |
| **隐藏剧情** | 条件触发的特殊事件，含彩蛋内容 |
| **技能树** | 多维度技能，解锁特殊事件和加成 |
| **成就系统** | 数十种成就，含成就点数计算 |
| **传承系统** | 人生结束后，部分属性和天赋可传承至下一代 |
| **多结局** | 20+ 种独特结局，每条故事线 3 种分支结局 |
| **季节系统** | 四季轮转，事件氛围与季节联动 |

## 🛠 技术栈

- **前端**: Vue 3 + uni-app（Composition API）
- **构建**: Vite 5
- **语言**: JavaScript / TypeScript
- **目标平台**: 微信小程序（可扩展 H5 / App）
- **后端**（可选）: Express.js，用于云存档

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- 微信开发者工具

### 安装运行

```bash
# 克隆
git clone https://github.com/Yangge521/life-simulator.git
cd life-simulator

# 安装依赖
npm install

# 微信小程序开发模式
npm run dev:mp-weixin

# 微信小程序构建
npm run build:mp-weixin
```

构建产物在 `dist/build/mp-weixin`，用**微信开发者工具**打开该目录即可预览。

### H5 版本

```bash
npm run dev:h5    # 开发
npm run build:h5  # 构建
```

### 云存档服务（可选）

```bash
node server.js
# 服务运行在 http://localhost:8080
```

## 📁 项目结构

```
src/
├── pages/
│   ├── birth/              # 出生页 — 角色创建
│   ├── life/               # 主游戏页 — ~2300行核心逻辑
│   ├── index/              # 首页/存档选择
│   ├── ending/             # 结局展示
│   ├── timeline/           # 人生时间线
│   ├── achievements/       # 成就展示
│   ├── relationships/      # 社交关系
│   └── skills/             # 技能树
└── utils/
    ├── gameEngine.js              # 游戏引擎（核心调度）
    ├── careerData.js              # 职业数据 & 薪资计算
    ├── examSystem.js              # 考试系统 & 升学逻辑
    ├── storyEngine.js             # 剧情引擎（故事状态管理、条件过滤、选择分支解析）
    ├── storyLines.js              # 28+ 条故事线数据（事业/感情/家庭/特殊，含叙事&多结局）
    ├── storyEvents.js             # 故事事件
    ├── specialEvents.js           # 特殊事件（67+）
    ├── hiddenStoryTriggers.js     # 隐藏剧情触发
    ├── choiceEvents.js            # 选择分支事件（含挚友聚会/求助/合作事件）
    ├── fateWheel.js               # 命运之轮
    ├── broBestie.js               # 闺蜜兄弟系统（挚友类型/好感度/10种聚会局/冲突与和解）
    ├── talents.js                 # 天赋/特质系统
    ├── achievements.js            # 成就系统
    ├── skillTree.js               # 技能树
    ├── inheritanceSystem.js       # 传承系统
    ├── economySystem.js           # 经济系统
    ├── healthData.js              # 健康/疾病/成瘾
    ├── educationData.js           # 教育数据
    ├── relationships.js           # 关系管理
    ├── relationshipData.js        # 关系事件数据
    ├── relationshipCircleData.js  # 社交圈数据
    ├── socialCircleData.js        # 社交圈
    ├── propertyData.js            # 房产数据
    ├── endings.js                 # 多结局系统
    ├── gameData.js                # 基础游戏数据（~206 个生命事件）
    ├── timelineData.js            # 时间线数据
    ├── shareImage.js              # 分享图片生成
    └── cloudSave.js               # 云存档客户端
```

## 🎯 角色属性

| 属性 | 英文 | 说明 |
|------|------|------|
| 财富 | wealth | 金钱和社会资源 |
| 教育 | education | 学历水平和知识储备 |
| 幸福感 | happiness | 心理健康和满足感 |
| 健康 | health | 身体状态 |
| 智力 | intelligence | 学习和分析能力 |
| 社交 | social | 人际交往能力 |
| 魅力 | charm | 外表和吸引力 |
| 智慧 | wisdom | 生活经验和洞察力 |
| 创造力 | creativity | 创新和艺术能力 |

## 🤝 贡献

欢迎提 Issue 和 PR！如果你想添加新的事件、职业、结局或其他内容，请参考 `src/utils/` 中的现有数据结构。

## 📄 开源协议

MIT License © 2025

---

*感谢 [uni-app](https://uniapp.dcloud.net.cn/) 和 [DCloud](https://www.dcloud.io/) 提供的跨平台框架支持。*
