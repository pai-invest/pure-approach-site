import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neutral-800 selection:text-white">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center border-b border-neutral-900">
        <a href="/" className="text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition">
          ← PURE APPROACH INVESTMENTS
        </a>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-xs text-neutral-500 mb-12">Effective Date: May 2026</p>

        <div className="space-y-10 text-sm text-neutral-400 leading-relaxed">
          <section>
            <p>
              Pure Approach Investments (Pty) Ltd (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the website <strong className="text-neutral-200">pureapproach.org</strong> (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-100 mb-3">1. Information Collection and Use</h2>
            <p className="mb-4">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-neutral-200">Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, such as your email address should you choose to correspond with us.</li>
              <li><strong className="text-neutral-200">Usage Data:</strong> We may collect information on how the Service is accessed and used. This may include your device&apos;s Internet Protocol address (IP address), browser type, pages visited, and the time and date of your visit.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-100 mb-3">2. Cookies and Tracking Data</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-100 mb-3">3. Google AdSense and Third-Party Advertising</h2>
            <p className="mb-4">
              This website intends to utilize Google AdSense to serve advertisements in the future.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Google, as a third-party vendor, uses cookies to serve ads based on a user&apos;s prior visits to our website or other websites.</li>
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
              <li>You may opt out of personalized advertising by visiting Google Ads Settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-100 mb-3">4. POPIA Compliance (South Africa)</h2>
            <p>
              In accordance with the Protection of Personal Information Act (POPIA) of South Africa, we are committed to safeguarding your information. We ensure all data is processed lawfully, transparently, and strictly for legitimate purposes related to our holding entity operations. We do not rent, trade, or sell personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-100 mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you may contact our administrative desk at: <strong className="text-neutral-200">invest@pureapproach.org</strong>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-neutral-900 text-xs text-neutral-600">
        © 2026 Pure Approach Investments (Pty) Ltd. All rights reserved.
      </footer>
    </div>
  );
}
