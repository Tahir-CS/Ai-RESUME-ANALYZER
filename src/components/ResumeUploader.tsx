import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';

interface ResumeUploaderProps {
  onAnalyze: (file: File) => void;
}

const ResumeUploader = ({ onAnalyze }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <div className="bg-secondary/20 border-2 border-dashed border-border rounded-lg p-8 text-center transition-all duration-300 ease-in-out">
      <label 
        htmlFor="resume-upload" 
        className={`flex flex-col items-center justify-center space-y-4 cursor-pointer w-full h-full p-4 rounded-md transition-colors ${isDragging ? 'bg-primary/10' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="border-4 border-dashed border-border rounded-full p-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
        </div>
        <input id="resume-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
        <p className="text-xl font-semibold">Drag & drop your resume here</p>
        <p className="text-muted-foreground">or click to browse</p>
        <p className="text-sm text-muted-foreground mt-2">(PDF, DOC, DOCX, TXT)</p>
      </label>
      {file && (
        <div className="mt-6 text-center">
          <p className="font-medium">Selected file: <span className="text-primary">{file.name}</span></p>
        </div>
      )}
      <Button 
        size="lg" 
        className="mt-6 w-full font-bold text-lg" 
        disabled={!file} 
        onClick={() => file && onAnalyze(file)}
      >
        Analyze Resume
      </Button>
    </div>
  );
};

export default ResumeUploader;
