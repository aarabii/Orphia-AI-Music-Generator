"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <div className="inline-block rounded-full px-3 py-1 text-sm bg-secondary/10 text-secondary mb-2">
            <Shield className="h-4 w-4 inline-block mr-1" />
            Privacy
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last updated: March 11, 2025</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p>
            At Orphia, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our website and music generation service
            (the "Service").
          </p>

          <p>
            Please read this Privacy Policy carefully. By accessing or using our
            Service, you acknowledge that you have read, understood, and agree
            to be bound by all the terms of this Privacy Policy.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            1. Information We Collect
          </h2>

          <h3 className="text-lg font-semibold mt-6 mb-3">
            1.1 Personal Information
          </h3>

          <p>
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>

          <ul className="list-disc pl-6 my-4">
            <li>Create an account</li>
            <li>Use our music generation features</li>
            <li>Contact our support team</li>
            <li>Subscribe to our newsletter</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <p>This information may include:</p>

          <ul className="list-disc pl-6 my-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Username and password</li>
            <li>Profile information</li>
            <li>Payment information (processed by our payment providers)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">1.2 User Content</h3>

          <p>
            We collect and store the content you upload or create using our
            Service, including:
          </p>

          <ul className="list-disc pl-6 my-4">
            <li>Text prompts used for music generation</li>
            <li>Audio samples you upload</li>
            <li>Generated music</li>
            <li>Settings and preferences for music generation</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">
            1.3 Automatically Collected Information
          </h3>

          <p>
            When you access our Service, we automatically collect certain
            information, including:
          </p>

          <ul className="list-disc pl-6 my-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Usage patterns and interactions with our Service</li>
            <li>Timestamps and session duration</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">
            2. How We Use Your Information
          </h2>

          <p>
            We use the information we collect for various purposes, including
            to:
          </p>

          <ul className="list-disc pl-6 my-4">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process and fulfill your music generation requests</li>
            <li>Create and manage your account</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Understand how users interact with our Service</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Protect against harmful or illegal activity</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">
            3. Sharing Your Information
          </h2>

          <p>We may share your information in the following situations:</p>

          <ul className="list-disc pl-6 my-4">
            <li>
              <strong>With Service Providers:</strong> We may share your
              information with third-party vendors, service providers, and
              contractors who perform services for us.
            </li>
            <li>
              <strong>For Business Transfers:</strong> We may share or transfer
              your information in connection with, or during negotiations of,
              any merger, sale of company assets, financing, or acquisition.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your
              information for any other purpose with your consent.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information where required by law or to protect our rights.
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Data Security</h2>

          <p>
            We implement appropriate technical and organizational measures to
            protect the security of your personal information. However, please
            be aware that no method of transmission over the Internet or
            electronic storage is 100% secure.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            5. Your Privacy Rights
          </h2>

          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>

          <ul className="list-disc pl-6 my-4">
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate or incomplete information</li>
            <li>The right to delete your personal information</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>

          <p>
            To exercise these rights, please contact us using the information
            provided in the "Contact Us" section.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Children's Privacy</h2>

          <p>
            Our Service is not directed to individuals under the age of 13. We
            do not knowingly collect personal information from children under
            13. If we learn we have collected personal information from a child
            under 13, we will delete this information.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            7. Changes to This Privacy Policy
          </h2>

          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">8. Contact Us</h2>

          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact us at:
          </p>

          <p className="mt-4">
            <strong>Email:</strong> aarab.nishchal@gmail.com
          </p>
        </div>
      </motion.div>
    </div>
  );
}
