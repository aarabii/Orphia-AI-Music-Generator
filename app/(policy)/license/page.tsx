"use client";

import { motion } from "framer-motion";
import { FileText, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LicensePage() {
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
            Open Source
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            MIT License
          </h1>
          <p className="text-muted-foreground">
            Orphia is proudly open source software
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Last updated: March 11, 2025</p>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full"
            asChild
          >
            <Link
              href="https://github.com/aarabii/Orphia-AI-Music-Generator/blob/master/LICENSE.txt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Link>
          </Button>
        </div>

        <div className="prose prose-gray max-w-none">
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 p-6 rounded-lg border border-primary/10">
            <pre className="text-sm whitespace-pre-wrap font-mono text-foreground">
              {`
                The MIT License (MIT)

                Copyright (c) 2025 Orphia Team

                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:

                The above copyright notice and this permission notice shall be included in
                all copies or substantial portions of the Software.

                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              `}
            </pre>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">What does this mean?</h2>

          <p>
            The MIT License is a permissive license that is short and to the
            point. It lets people do almost anything they want with the project,
            like making and distributing closed source versions, as long as they
            provide attribution back to Orphia and don't hold us liable.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">You are free to:</h3>

          <ul className="list-disc pl-6 my-4">
            <li>
              <strong>Use</strong>: You can use Orphia in your own projects,
              both personal and commercial.
            </li>
            <li>
              <strong>Modify</strong>: You can modify the code to suit your
              needs.
            </li>
            <li>
              <strong>Distribute</strong>: You can distribute your modified
              version.
            </li>
            <li>
              <strong>Sublicense</strong>: You can incorporate Orphia into a
              proprietary product.
            </li>
            <li>
              <strong>Sell</strong>: You can sell products that use or are
              derived from Orphia.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">
            Under these conditions:
          </h3>

          <ul className="list-disc pl-6 my-4">
            <li>
              <strong>Attribution</strong>: You must include the copyright
              notice and permission notice in all copies or substantial portions
              of the software.
            </li>
            <li>
              <strong>No Liability</strong>: The authors of Orphia are not
              liable for any damages or issues arising from the use of the
              software.
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Contributing to Orphia
          </h2>

          <p>
            We welcome contributions to Orphia! By contributing code, you agree
            to license your contributions under the same MIT license. Visit our{" "}
            <Link href="/contribute" className="text-primary hover:underline">
              Contribute page
            </Link>{" "}
            to learn more about how you can get involved.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">Third-Party Libraries</h2>

          <p>
            Orphia uses several open-source libraries, each with their own
            licenses. We've made every effort to comply with the terms of these
            licenses. A full list of dependencies and their licenses can be
            found in our GitHub repository.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
