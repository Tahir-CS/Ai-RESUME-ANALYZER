import { useCallback, useMemo, useState } from 'react';
import { Briefcase, FileText, Upload, WandSparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

const MAX_JOB_DESCRIPTION_CHARS = 5000;

export interface AnalyzePayload {
  file: File;
  jobDescription: string;
}

interface ResumeUploaderProps {
  onAnalyze: (payload: AnalyzePayload) => void;
  isLoading?: boolean;
  onUseDemo?: () => void;
}

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const ResumeUploader = ({ onAnalyze, isLoading = false, onUseDemo }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  const remainingCharacters = useMemo(
    () => MAX_JOB_DESCRIPTION_CHARS - jobDescription.length,
    [jobDescription.length]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleAnalyze = () => {
    if (!file || isLoading) {
      return;
    }

    onAnalyze({
      file,
      jobDescription: jobDescription.trim(),
    });
  };

  return (
    <div className="glass-card reveal-up rounded-3xl border border-border/60 p-6 shadow-xl md:p-8">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="chip-mono border-primary/30 bg-primary/10 text-primary">Resume Upload</Badge>
        <Badge variant="outline" className="chip-mono border-accent/30 bg-accent/10 text-accent">Optional Job Targeting</Badge>
      </div>

      <label
        htmlFor="resume-upload" 
        className={`relative flex min-h-[230px] w-full cursor-pointer flex-col items-center justify-center space-y-4 overflow-hidden rounded-2xl border-2 border-dashed p-5 text-center transition-all duration-300 ${isDragging ? 'border-primary bg-primary/10' : 'border-border bg-background/40 hover:border-primary/50 hover:bg-primary/5'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 right-2 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
        <div className="relative rounded-2xl border border-primary/30 bg-primary/10 p-4 animate-float">
          <Upload className="h-10 w-10 text-primary" />
        </div>
        <input id="resume-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
        <p className="font-display text-2xl font-bold text-foreground md:text-3xl">Drop resume file here</p>
        <p className="max-w-md text-sm text-muted-foreground md:text-base">Upload a PDF or DOCX and optionally add a target job description to get tailored feedback.</p>
        <p className="chip-mono text-xs uppercase text-muted-foreground">PDF or DOCX · Max 5 MB</p>
      </label>

      {file && (
        <div className="mt-5 rounded-xl border border-border/70 bg-secondary/50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileText className="h-4 w-4 text-primary" />
                Selected Resume
              </p>
              <p className="truncate text-sm text-muted-foreground">{file.name}</p>
            </div>
            <span className="chip-mono rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-xl border border-border/70 bg-background/50 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Briefcase className="h-4 w-4 text-accent" />
          Target Job Description
        </div>
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value.slice(0, MAX_JOB_DESCRIPTION_CHARS))}
          placeholder="Optional: paste the role description to get more specific keyword and ATS feedback."
          className="min-h-[130px] border-border/70 bg-background/70 text-sm"
        />
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Optional but recommended for role-specific scoring.</span>
          <span className={`chip-mono ${remainingCharacters < 350 ? 'text-accent' : 'text-muted-foreground'}`}>
            {jobDescription.length}/{MAX_JOB_DESCRIPTION_CHARS}
          </span>
        </div>
      </div>

      <Button 
        size="lg" 
        className="mt-6 h-12 w-full text-base font-semibold"
        disabled={!file || isLoading}
        onClick={handleAnalyze}
      >
        <WandSparkles className="mr-2 h-5 w-5" />
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </Button>

      {onUseDemo && (
        <Button
          variant="outline"
          className="mt-3 h-11 w-full border-primary/40 bg-primary/5 text-primary hover:bg-primary/10"
          onClick={onUseDemo}
          disabled={isLoading}
        >
          Use Demo Analysis Layout
        </Button>
      )}
    </div>
  );
};

export default ResumeUploader;
