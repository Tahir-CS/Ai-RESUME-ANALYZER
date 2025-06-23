import { FileText } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-4">
      <nav className="flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <FileText className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-xl">ResumeWise</span>
        </a>
        <Button variant="ghost">Sign In</Button>
      </nav>
    </header>
  );
};

export default Header;
