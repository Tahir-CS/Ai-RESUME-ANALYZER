import { BadgeCheck, FileText, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6 md:py-8">
      <nav className="glass-card rounded-2xl px-4 py-4 md:px-6 md:py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-85">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Career Intelligence Studio</p>
              <p className="font-display text-xl font-bold text-foreground md:text-2xl">Resume Forge Lab</p>
            </div>
          </a>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="chip-mono border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Live AI Review
            </Badge>
            <Badge variant="outline" className="chip-mono border-accent/40 bg-accent/10 text-accent">
              <BadgeCheck className="mr-1.5 h-3.5 w-3.5" />
              ATS Focused
            </Badge>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
