import Link from "next/link";
import { Github, Mail, Music2, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Logo  */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
            <Music2 className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium gradient-text">Orphia</span>
          <Link
            href="/license"
            className="text-sm text-muted-foreground hover:text-accent hover:underline transition-colors"
          >
            © {new Date().getFullYear()}
          </Link>
        </div>

        {/* Policies  */}
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/privacy-policy"
            className="underline-offset-4 hover:text-primary hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="underline-offset-4 hover:text-secondary hover:underline transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/faq"
            className="underline-offset-4 hover:text-accent hover:underline transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Socials  */}
        <div className="flex gap-3">
          <Link
            href="https://github.com/aarabii/orphia-ai-music-generator/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link
            href="https://twitter.com/aarab.ii"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-secondary transition-colors" />
          </Link>
          <Link href="mailto:aarab.nishchal@gmail.com">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
