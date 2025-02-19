
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from "@/components/ui/chat-input";

const MAX_CHARS = 500;

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
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
      setHasCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Your PRD has been copied to clipboard",
      });
      
      // Reset the copy icon after 2 seconds
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen section-padding flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">PRD Generator</h1>
          <p className="text-lg text-muted-foreground">
            Generate professional Product Requirement Documents in seconds
          </p>
        </div>

        <Card className="glass p-6 mx-auto max-w-2xl">
          <ChatInput
            value={prompt}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setPrompt(e.target.value);
              }
            }}
            onSubmit={handleSubmit}
            loading={isLoading}
            onStop={() => setIsLoading(false)}
          >
            <ChatInputTextArea 
              placeholder="Describe your product idea..."
              maxLength={MAX_CHARS}
            />
            <div className="flex items-center justify-end w-full mt-2">
              <ChatInputSubmit />
            </div>
          </ChatInput>
        </Card>

        {generatedPRD && (
          <Card className="glass p-6 space-y-4 fade-in mx-auto max-w-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Generated PRD</h2>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
