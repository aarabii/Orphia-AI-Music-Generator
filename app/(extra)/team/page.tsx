"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, MailIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { teacherMentor, teamMembers } from "@/constants/team-members";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";

export default function TeamPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="container py-8">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl gradient-text">
            Meet Our Team
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            The brilliant minds behind Orphia working to transform how music is
            created with AI.
          </p>
        </div>

        {/* Teacher/Mentor Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          onHoverStart={() => setHoveredMember(-1)}
          onHoverEnd={() => setHoveredMember(null)}
        >
          <Card className="overflow-hidden border-primary/20 h-full">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 relative">
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                  <Image
                    src={teacherMentor.image || "/placeholder.svg"}
                    alt={teacherMentor.name}
                    fill
                    className="object-cover transition-transform duration-500"
                    style={{
                      transform:
                        hoveredMember === -1 ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20 md:hidden">
                    <h3 className="text-xl font-bold text-white">
                      {teacherMentor.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {teacherMentor.role}
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="space-y-4 pt-6 md:w-3/4 flex flex-col">
                <div className="hidden md:block">
                  <h3 className="text-2xl font-bold gradient-text">
                    {teacherMentor.name}
                  </h3>
                  <p className="text-lg text-primary">{teacherMentor.role}</p>
                </div>
                <p className="text-muted-foreground flex-grow">
                  {teacherMentor.description}
                </p>
                <div className="flex space-x-2">
                  <Link
                    href={teacherMentor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link
                    href={teacherMentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 hover:text-secondary"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href={`mailto:${teacherMentor.mail}`}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredMember(index)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              <Card className="overflow-hidden border-primary/20 h-full">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <div className="aspect-square relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500"
                        style={{
                          transform:
                            hoveredMember === index
                              ? "scale(1.05)"
                              : "scale(1)",
                        }}
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20 md:hidden">
                        <h3 className="text-xl font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="text-white/80 text-sm">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="space-y-4 pt-6 md:w-2/3 flex flex-col">
                    <div className="hidden md:block">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground flex-grow">
                      {member.description}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                        >
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                      </Link>
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 hover:text-secondary"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </Link>
                      <Link href={`mailto:${member.mail.toLowerCase()}`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
