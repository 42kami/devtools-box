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
    name: "JSON Formatter",
    description: "Format, minify, and validate JSON data with syntax highlighting",
    href: "/json-formatter",
    icon: Braces,
    color: "text-blue-500",
  },
  {
    name: "JSON to TypeScript",
    description: "Automatically convert JSON to TypeScript type definitions",
    href: "/json-to-ts",
    icon: FileCode,
    color: "text-green-500",
  },
  {
    name: "JSON Diff",
    description: "Compare two JSON objects and highlight the differences",
    href: "/json-diff",
    icon: GitCompare,
    color: "text-orange-500",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode text and images to/from Base64",
    href: "/base64",
    icon: Binary,
    color: "text-purple-500",
  },
  {
    name: "URL Encoder/Decoder",
    description: "URL encoding (encodeURI/encodeURIComponent) and decoding",
    href: "/url-encode",
    icon: LinkIcon,
    color: "text-pink-500",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "All tools run locally in your browser - no server requests needed",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data never leaves your device - 100% client-side processing",
  },
  {
    icon: Globe,
    title: "Free Forever",
    description: "All tools are completely free - no registration required",
  },
];

export default function Home() {
  return (
    <div className="container py-8 space-y-12">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Developer Toolbox
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Free, fast, and secure online developer tools<br />
          JSON Formatting · Type Generation · Data Comparison · Encoding
        </p>
      </section>

      <AdBanner slot="horizontal" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">All Tools</h2>
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
        <h2 className="text-2xl font-bold">Why Choose Us</h2>
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
        <h2 className="text-xl font-bold">About DevTools Box</h2>
        <p className="text-muted-foreground">
          DevTools Box is a free collection of online developer tools designed for everyday programming tasks.
          Our tools include a JSON formatter, JSON to TypeScript converter, JSON diff tool,
          Base64 encoder/decoder, URL encoder/decoder, and more. All tools run locally in your browser,
          ensuring your data remains secure and private. No registration required - just open and use.
        </p>
      </section>
    </div>
  );
}
