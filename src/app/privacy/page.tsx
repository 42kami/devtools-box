import { Metadata } from "next"

export const metadata: Metadata = {
  title: "隐私政策 - DevTools Box",
  description: "DevTools Box 隐私政策",
}

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">隐私政策</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">数据处理</h2>
          <p className="text-muted-foreground">
            DevTools Box 所有工具均在您的浏览器本地运行。您输入的任何数据（JSON、文本、图片等）
            都不会被上传到我们的服务器或任何第三方服务器。所有数据处理完全在客户端完成。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">数据存储</h2>
          <p className="text-muted-foreground">
            我们不存储您输入或处理的任何数据。一旦您关闭浏览器窗口或刷新页面，
            所有数据都会被清除。我们不使用 cookies 来跟踪您的使用行为。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">分析服务</h2>
          <p className="text-muted-foreground">
            我们可能使用匿名的网站分析服务来了解工具的使用情况，以便改进服务。
            这些分析不会收集任何个人身份信息或您输入的数据内容。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">广告</h2>
          <p className="text-muted-foreground">
            本站可能展示第三方广告（如 Google AdSense）。这些广告服务可能使用 cookies 
            来展示与您相关的广告。您可以通过浏览器设置管理 cookies。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">安全性</h2>
          <p className="text-muted-foreground">
            由于所有数据处理都在本地进行，您的数据安全完全由您的设备和浏览器保护。
            我们建议使用最新版本的浏览器以获得最佳安全性。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">联系我们</h2>
          <p className="text-muted-foreground">
            如果您对我们的隐私政策有任何疑问，请通过页面底部的联系方式与我们联系。
          </p>
        </section>

        <p className="text-sm text-muted-foreground pt-8">
          最后更新时间：2026年1月
        </p>
      </div>
    </div>
  )
}
