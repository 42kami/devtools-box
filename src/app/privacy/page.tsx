import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - DevTools Box",
  description: "DevTools Box Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">Data Processing</h2>
          <p className="text-muted-foreground">
            All DevTools Box tools run locally in your browser. Any data you input (JSON, text, images, etc.)
            is never uploaded to our servers or any third-party servers. All data processing is done entirely on the client side.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Storage</h2>
          <p className="text-muted-foreground">
            We do not store any data you input or process. Once you close the browser window or refresh the page,
            all data is cleared. We do not use cookies to track your usage behavior.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Analytics</h2>
          <p className="text-muted-foreground">
            We may use anonymous website analytics services to understand tool usage patterns and improve our services.
            These analytics do not collect any personally identifiable information or the content of your input data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Advertising</h2>
          <p className="text-muted-foreground">
            This site may display third-party advertisements (such as Google AdSense). These advertising services may use cookies
            to display relevant ads. You can manage cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Security</h2>
          <p className="text-muted-foreground">
            Since all data processing is done locally, your data security is protected entirely by your device and browser.
            We recommend using the latest version of your browser for the best security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about our privacy policy, please contact us using the information at the bottom of the page.
          </p>
        </section>

        <p className="text-sm text-muted-foreground pt-8">
          Last updated: January 2026
        </p>
      </div>
    </div>
  )
}
