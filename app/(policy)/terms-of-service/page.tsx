"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="container py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <div className="inline-block rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-2">
            <FileText className="h-4 w-4 inline-block mr-1" />
            Legal
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last updated: March 11, 2025</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service")
            carefully before using the Orphia website and music generation
            service (the "Service") operated by Orphia ("us", "we", or "our").
          </p>

          <p>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users, and others who access or use the Service.
          </p>

          <p>
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms, then you may not
            access the Service.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Use of Service</h2>

          <p>
            Orphia provides an AI-powered music generation platform that allows
            users to create music using text prompts or audio samples. The
            Service is provided "as is" and "as available" without warranties of
            any kind.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Accounts</h2>

          <p>
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account on our Service.
          </p>

          <p>
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            3. Intellectual Property
          </h2>

          <h3 className="text-lg font-semibold mt-6 mb-3">3.1 Your Content</h3>

          <p>
            By uploading audio samples or providing text prompts to our Service,
            you grant us a worldwide, non-exclusive, royalty-free license to
            use, reproduce, modify, and distribute your content solely for the
            purpose of providing and improving our Service.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">
            3.2 Generated Music
          </h3>

          <p>
            Music generated through our Service is provided to you under the
            following terms:
          </p>

          <ul className="list-disc pl-6 my-4">
            <li>
              You own the rights to music generated using your prompts or
              samples.
            </li>
            <li>
              You may use the generated music for personal or commercial
              purposes.
            </li>
            <li>
              You may not claim copyright on the AI system or algorithm that
              generated the music.
            </li>
            <li>
              You are responsible for ensuring that any samples you upload do
              not infringe on third-party rights.
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Restrictions</h2>

          <p>You agree not to:</p>

          <ul className="list-disc pl-6 my-4">
            <li>
              Use the Service to generate content that is illegal, harmful,
              threatening, abusive, harassing, defamatory, or otherwise
              objectionable.
            </li>
            <li>
              Upload samples that infringe on intellectual property rights of
              others.
            </li>
            <li>
              Attempt to reverse engineer, decompile, or otherwise attempt to
              extract the source code of our Service.
            </li>
            <li>
              Use the Service in any way that could damage, disable, or impair
              the Service.
            </li>
            <li>Use automated scripts or bots to access the Service.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Termination</h2>

          <p>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>

          <p>
            Upon termination, your right to use the Service will immediately
            cease. If you wish to terminate your account, you may simply
            discontinue using the Service.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            6. Limitation of Liability
          </h2>

          <p>
            In no event shall Orphia, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or
            inability to access or use the Service.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">7. Changes</h2>

          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">8. Contact Us</h2>

          <p>
            If you have any questions about these Terms, please contact us at
            legal@orphia.com.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
