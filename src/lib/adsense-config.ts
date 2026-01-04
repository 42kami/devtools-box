// Google AdSense 配置
// 请将下面的 XXXXXXX 替换为你的真实 ID

export const ADSENSE_CONFIG = {
  // 发布商 ID (在 AdSense 首页可以找到，格式: ca-pub-1234567890)
  publisherId: "ca-pub-XXXXXXX",
  
  // 广告单元 ID (每个广告位一个，在 AdSense 后台创建广告单元后获取)
  slots: {
    // 首页横幅广告
    homeTop: "1234567890",
    homeBottom: "1234567891",
    
    // 工具页面广告
    toolTop: "1234567892",
    toolBottom: "1234567893",
  }
}

/*
===========================================
如何获取这些 ID:
===========================================

1. 发布商 ID (publisherId):
   - 登录 https://www.google.com/adsense
   - 点击左侧 "账号" → "账号信息"
   - 复制 "发布商 ID" (格式: ca-pub-1234567890)

2. 广告单元 ID (slots):
   - 在 AdSense 后台点击 "广告" → "按广告单元"
   - 点击 "新建广告单元"
   - 选择 "展示广告" 
   - 选择广告尺寸:
     * 横幅: 选 "自适应" 或 "728x90"
     * 方形: 选 "300x250"
   - 创建后复制广告单元 ID (纯数字)

3. 替换代码中的 ID:
   - 修改此文件中的 publisherId 和 slots
   - 修改 src/app/layout.tsx 中的 ca-pub-XXXXXXX
   - 修改 src/components/ad-banner.tsx 中的 ca-pub-XXXXXXX

===========================================
*/
