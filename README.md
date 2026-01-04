# DevTools Box - 开发者工具箱

免费、快速、安全的在线开发者工具集合。所有工具在浏览器本地运行，数据不上传服务器。

## 🛠️ 包含工具

- **JSON 格式化** - 格式化、压缩、验证 JSON 数据
- **JSON 转 TypeScript** - 自动生成 TypeScript 类型定义
- **JSON 对比** - 对比两个 JSON 的差异
- **Base64 编解码** - 文本/图片的 Base64 编解码
- **URL 编解码** - URL encode/decode

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📦 部署到 Vercel

### 方式一：一键部署（推荐）

1. 将代码推送到你的 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com)
3. 使用 GitHub 登录
4. 点击 "New Project"
5. 选择你的仓库
6. 点击 "Deploy"
7. 等待部署完成，即可获得免费域名 `xxx.vercel.app`

### 方式二：命令行部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel --prod
```

## 💰 变现方式

1. **Google AdSense** - 页面已预留广告位
2. **付费去广告** - 可添加付费功能
3. **API 服务** - 提供批量处理 API

## 🔧 接入 Google AdSense

1. 申请 AdSense 账号：https://www.google.com/adsense
2. 获取广告代码
3. 修改 `src/components/ad-banner.tsx` 中的广告代码

## 📢 推广渠道

- V2EX: https://www.v2ex.com
- 掘金: https://juejin.cn
- 少数派: https://sspai.com
- Product Hunt: https://www.producthunt.com

## 📄 License

MIT
