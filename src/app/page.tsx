import Link from "next/link";
import { 
  Braces, 
  FileCode, 
  GitCompare, 
  Binary, 
  Link as LinkIcon,
  Zap,
  Shield,
  Globe
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdBanner } from "@/components/ad-banner";

const tools = [
  {
    name: "JSON 格式化",
    description: "格式化、压缩、验证 JSON 数据，支持语法高亮",
    href: "/json-formatter",
    icon: Braces,
    color: "text-blue-500",
  },
  {
    name: "JSON 转 TypeScript",
    description: "将 JSON 自动转换为 TypeScript 类型定义",
    href: "/json-to-ts",
    icon: FileCode,
    color: "text-green-500",
  },
  {
    name: "JSON 对比",
    description: "对比两个 JSON 的差异，高亮显示变化",
    href: "/json-diff",
    icon: GitCompare,
    color: "text-orange-500",
  },
  {
    name: "Base64 编解码",
    description: "文本、图片的 Base64 编码与解码",
    href: "/base64",
    icon: Binary,
    color: "text-purple-500",
  },
  {
    name: "URL 编解码",
    description: "URL 编码（encodeURI）与解码",
    href: "/url-encode",
    icon: LinkIcon,
    color: "text-pink-500",
  },
];

const features = [
  {
    icon: Zap,
    title: "快速响应",
    description: "所有工具在浏览器本地运行，无需等待服务器响应",
  },
  {
    icon: Shield,
    title: "隐私安全",
    description: "数据不会上传到服务器，完全在本地处理",
  },
  {
    icon: Globe,
    title: "免费使用",
    description: "所有工具永久免费，无需注册即可使用",
  },
];

export default function Home() {
  return (
    <div className="container py-8 space-y-12">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          开发者工具箱
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          免费、快速、安全的在线开发工具集合<br />
          JSON 格式化 · 类型生成 · 数据对比 · 编解码
        </p>
      </section>

      <AdBanner slot="horizontal" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">全部工具</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted ${tool.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">为什么选择我们</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AdBanner slot="horizontal" />

      <section className="prose prose-invert max-w-none">
        <h2 className="text-xl font-bold">关于 DevTools Box</h2>
        <p className="text-muted-foreground">
          DevTools Box 是一个免费的在线开发者工具集合，为程序员提供日常开发中常用的工具。
          我们的工具包括 JSON 格式化器、JSON 转 TypeScript 类型生成器、JSON 对比工具、
          Base64 编解码器、URL 编解码器等。所有工具都在浏览器本地运行，
          确保您的数据安全和隐私。无需注册，打开即用。
        </p>
      </section>
    </div>
  );
}
