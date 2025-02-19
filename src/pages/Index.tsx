
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Sparkles } from "lucide-react";

const MAX_CHARS = 500;

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Temporary mock response for demo
    setTimeout(() => {
      setGeneratedPRD(`
# Product Overview

Your product description here...

## Tech Stack

- React
- TypeScript
- Tailwind CSS

## Core Features

1. Feature One
2. Feature Two
3. Feature Three
      `);
      setIsLoading(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    if (generatedPRD) {
      navigator.clipboard.writeText(generatedPRD);
      toast({
        title: "Copied to clipboard",
        description: "Your PRD has been copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="max-w-4xl mx-auto space-y-8 fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">PRD Generator</h1>
          <p className="text-lg text-muted-foreground">
            Generate professional Product Requirement Documents in seconds
          </p>
        </div>

        <Card className="glass p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Describe your product idea..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={MAX_CHARS}
              />
              <div className="text-sm text-muted-foreground text-right">
                {prompt.length}/{MAX_CHARS}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!prompt || isLoading}
            >
              {isLoading ? (
                "Generating..."
              ) : (
                <>
                  Generate PRD
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Card>

        {generatedPRD && (
          <Card className="glass p-6 space-y-4 fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Generated PRD</h2>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">
              {generatedPRD}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
}
