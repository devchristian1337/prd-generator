import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChatInput,
  ChatInputTextArea,
  ChatInputSubmit,
} from "@/components/ui/chat-input";
import { geminiService } from "@/services/gemini";
import { ScrollShadow } from "@heroui/scroll-shadow";

const MAX_CHARS = 500;

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();
  const generationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await geminiService.createPRD(prompt);
      setGeneratedPRD(response);
    } catch (error) {
      console.error("Error generating PRD:", error);
      toast({
        title: "Error",
        description: "Failed to generate PRD. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    // Currently, we cannot stop the Gemini API call
    setIsLoading(false);
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

  const handleDownload = () => {
    if (generatedPRD) {
      const blob = new Blob([generatedPRD], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "PRD.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded successfully",
        description: "Your PRD has been downloaded as PRD.md",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 scrollbar-custom">
      <div
        className={`w-full max-w-2xl space-y-8 fade-in transition-all duration-500 ease-in-out ${
          generatedPRD ? "pt-16" : ""
        }`}
      >
        <div
          className={`text-center transition-transform duration-500 ${
            generatedPRD ? "-translate-y-4" : "translate-y-8"
          }`}
        >
          <div
            className="select-none pointer-events-none"
            onMouseDown={(e) => e.preventDefault()}
          >
            <img
              src="https://iili.io/2yZBUJ4.png"
              alt="SpecForge Logo"
              className="h-12 mx-auto mb-3 select-none pointer-events-none user-select-none touch-none !cursor-default"
              aria-label="SpecForge"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              style={
                {
                  WebkitUserDrag: "none",
                  WebkitTouchCallout: "none",
                  pointerEvents: "none",
                } as React.CSSProperties
              }
            />
          </div>
          <p className="text-lg text-muted-foreground">
            Generate professional Product Requirement Documents in seconds
          </p>
        </div>

        <Card
          className={`glass p-6 transition-transform duration-500 ${
            generatedPRD ? "-translate-y-4" : "translate-y-0"
          }`}
        >
          <ChatInput
            value={prompt}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setPrompt(e.target.value);
              }
            }}
            onSubmit={handleSubmit}
            loading={isLoading}
            onStop={handleStop}
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
          <Card className="glass p-6 space-y-4 animate-fade-up motion-reduce:animate-none">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Generated PRD</h2>
              <div className="flex gap-2">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleDownload}
                        aria-label="Download PRD"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      className="px-2 py-1 text-xs"
                      showArrow={true}
                    >
                      Download
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyToClipboard}
                      >
                        {hasCopied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      className="px-2 py-1 text-xs"
                      showArrow={true}
                    >
                      {hasCopied ? "Copied!" : "Copy to clipboard"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <ScrollShadow className="prose prose-sm dark:prose-invert max-w-none bg-muted p-4 rounded-lg max-h-[60vh] scrollbar-custom">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {generatedPRD}
              </ReactMarkdown>
            </ScrollShadow>
          </Card>
        )}
      </div>
    </div>
  );
}
