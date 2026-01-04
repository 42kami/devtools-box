# DevTools Box

A free, fast, and privacy-focused collection of online developer tools. All processing happens locally in your browser - your data never leaves your device.

🌐 **Live Demo**: [devtools-box-liart.vercel.app](https://devtools-box-liart.vercel.app)

## ✨ Features

| Tool | Description |
|------|-------------|
| **JSON Formatter** | Format, minify, and validate JSON data with syntax highlighting |
| **JSON to TypeScript** | Auto-generate TypeScript interfaces from JSON |
| **JSON Diff** | Compare two JSON objects and highlight differences |
| **Base64 Encoder/Decoder** | Encode/decode text and images to Base64 |
| **URL Encoder/Decoder** | URL encode/decode with encodeURI & encodeURIComponent |

## 🔒 Privacy First

- ✅ 100% client-side processing
- ✅ No data uploaded to servers
- ✅ No tracking or analytics
- ✅ No registration required

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel
- **Language**: TypeScript

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/42kami/devtools-box.git

# Navigate to the project
cd devtools-box

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/42kami/devtools-box)

Or deploy manually:

```bash
npm i -g vercel
vercel --prod
```

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── json-formatter/       # JSON formatter tool
│   ├── json-to-ts/           # JSON to TypeScript
│   ├── json-diff/            # JSON diff tool
│   ├── base64/               # Base64 encoder/decoder
│   ├── url-encode/           # URL encoder/decoder
│   └── privacy/              # Privacy policy
├── components/
│   ├── navbar.tsx            # Navigation bar
│   ├── footer.tsx            # Footer
│   └── ui/                   # UI components
└── lib/
    └── utils.ts              # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## ⭐ Support

If you find this project useful, please consider giving it a star on GitHub!
