"use client";

import { motion } from "framer-motion";
import {
  BugIcon,
  Github,
  Lightbulb,
  MessagesSquare,
  Share2,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContributePage() {
  return (
    <div className="container py-8">
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            Contribute to Orphia
          </h1>
          <p className="text-xl text-muted-foreground">
            Help us improve our AI music generator by contributing in various
            ways.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              icon: <BugIcon className="h-8 w-8 text-primary" />,
              title: "Report Bugs",
              description: "Found a bug? Let us know so we can fix it.",
              link: "#bug-report",
            },
            {
              icon: <Lightbulb className="h-8 w-8 text-secondary" />,
              title: "Suggest Features",
              description:
                "Have ideas for new features? We'd love to hear them.",
              link: "#feature-request",
            },
            {
              icon: <Github className="h-8 w-8 text-accent" />,
              title: "Contribute Code",
              description: "Help us improve the model or web application.",
              link: "https://github.com",
            },
            {
              icon: <MessagesSquare className="h-8 w-8 text-primary" />,
              title: "Join Discussions",
              description: "Participate in our community discussions.",
              link: "https://discord.com",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-primary/20 h-full">
                <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <Button asChild className="rounded-full">
                    <a href={item.link}>Get Started</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="rounded-lg border border-primary/20 p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <div className="flex items-start space-x-4">
            <Share2 className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-medium text-lg gradient-text">
                Share Orphia
              </h3>
              <p className="text-muted-foreground mb-4">
                Love what we're building? Help us spread the word! Share Orphia
                with friends, colleagues, and on social media to grow our
                community.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-secondary/20 hover:bg-secondary/10 hover:text-secondary"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-accent/20 hover:bg-accent/10 hover:text-accent"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
