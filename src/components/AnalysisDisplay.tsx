import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FilePlus, FileMinus, Edit } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-border"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className="text-primary"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{score}</span>
        <span className="text-sm text-muted-foreground">out of 100</span>
      </div>
    </div>
  );
};

interface Analysis {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  bulletPointRewrites: {
    before: string;
    after: string;
    explanation: string;
  }[];
  atsAnalysis: {
    score: number;
    issues: string[];
    missingKeywords: string[];
    formatWarnings: string[];
  };
}

interface AnalysisDisplayProps {
  analysis: Analysis;
  onReset: () => void;
  onExport: () => void;
}

const AnalysisDisplay = ({ analysis, onReset, onExport }: AnalysisDisplayProps) => {
  const { score, summary, strengths, weaknesses, improvementSuggestions, bulletPointRewrites, atsAnalysis } = analysis;

  return (
    <Card className="w-full animate-fade-in border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-display">Your Resume Analysis</CardTitle>
        <p className="text-muted-foreground mt-2">{summary}</p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Resume Score</h3>
            <ScoreGauge score={score} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">ATS Score</h3>
            <ScoreGauge score={atsAnalysis.score} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-green-400">
              <FilePlus className="h-5 w-5" />
              Strengths
            </h3>
            <ul className="space-y-2 list-inside text-muted-foreground">
              {strengths.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-yellow-400">
              <FileMinus className="h-5 w-5" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2 list-inside text-muted-foreground">
              {weaknesses.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Suggested Improvements
          </h3>
          <ul className="space-y-2 list-inside text-muted-foreground">
            {improvementSuggestions.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>

        {bulletPointRewrites.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Bullet Point Improvements</h3>
            <div className="space-y-6">
              {bulletPointRewrites.map((rewrite, index) => (
                <div key={index} className="bg-secondary/20 p-4 rounded-lg space-y-2">
                  <p className="text-muted-foreground"><strong>Before:</strong> {rewrite.before}</p>
                  <p className="text-primary"><strong>After:</strong> {rewrite.after}</p>
                  <p className="text-sm text-muted-foreground"><strong>Why:</strong> {rewrite.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {atsAnalysis.issues.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">ATS Issues</h3>
            <ul className="space-y-2 list-inside text-muted-foreground">
              {atsAnalysis.issues.map((issue, index) => <li key={index}>{issue}</li>)}
            </ul>
          </div>
        )}

        <div className="border-t border-border pt-6 space-y-4">
             <h3 className="font-semibold text-lg text-center">Ready to improve?</h3>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={onExport}>Export Improved Version <Edit className="ml-2 h-4 w-4" /></Button>
                <Button variant="outline" onClick={onReset}>Analyze Another</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisDisplay;
