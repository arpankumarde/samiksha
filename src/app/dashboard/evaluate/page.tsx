"use client";

import { GoogleGenAI } from "@google/genai";
import { useState, ChangeEvent } from "react";
import { config } from "@/lib/genai/evaluateVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileVideoIcon,
  PlayIcon,
  UploadIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface EvaluationParameter {
  score: number;
  feedback: string;
}

interface Evaluation {
  CONTENT_QUALITY: EvaluationParameter;
  SLIDE_DESIGN: EvaluationParameter;
  STRUCTURE_FLOW: EvaluationParameter;
  VOICE_CLARITY_DELIVERY: EvaluationParameter;
  ENGAGEMENT_EXPRESSION: EvaluationParameter;
  BODY_LANGUAGE: EvaluationParameter;
  VISUAL_ENGAGEMENT: EvaluationParameter;
  TECHNICAL_QUALITY: EvaluationParameter;
}

interface Error {
  isError: boolean;
  message?: string;
}

type PresentationType =
  | "SLIDES_ONLY"
  | "VOICE_OVER"
  | "FACE_VISIBLE"
  | "FACE_PLUS_SCREEN";

interface Presentation {
  title: string;
  summary: string;
  type: PresentationType;
  evaluation: Evaluation;
  overallFeedback: string;
  error: Error;
}

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string,
});

const model = "gemini-2.0-flash";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResponse, setEvaluationResponse] =
    useState<Presentation | null>(null);
  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFileContent(e.target.result);
        }
      };
      reader.readAsDataURL(file); // Or readAsArrayBuffer
    } else {
      setFileContent(null);
    }
  };

  const sendFileToGemini = async () => {
    if (!selectedFile || !fileContent) {
      toast.error("Please select a file first.");
      return;
    }

    setIsLoading(true);

    const contents = [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: fileContent.toString().split(",")[1],
              mimeType: selectedFile.type,
            },
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `evaluate this ${selectedFile.type.split("/")[1]}`,
          },
        ],
      },
    ];

    const result = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    let responseText = "";
    for await (const chunk of result) {
      responseText += chunk.text;
    }

    const parsedResponse: Presentation = JSON.parse(responseText);
    console.log(parsedResponse);

    setEvaluationResponse(parsedResponse);

    try {
      const res = await addDoc(collection(db, "evaluations"), {
        ...parsedResponse,
        uid: auth.currentUser?.uid,
      });
      router.push(`/dashboard/evaluate/result?evId=${res.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Presentation Evaluator
            </h1>
            <p className="text-lg text-slate-600">
              Upload your presentation video for AI-powered evaluation and
              feedback
            </p>
          </div>

          {/* Upload Section */}
          <Card className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <UploadIcon className="w-6 h-6 text-blue-600" />
                Upload Presentation File
              </CardTitle>
              <CardDescription>
                Select a video file of your presentation for evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="video/*"
                  className="max-w-md"
                />
              </div>

              {selectedFile && (
                <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FileVideoIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">
                    Selected: {selectedFile.name}
                  </span>
                </div>
              )}

              <div className="flex justify-center">
                <Button
                  onClick={sendFileToGemini}
                  disabled={!selectedFile || isLoading}
                  className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Evaluating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <PlayIcon className="w-4 h-4" />
                      Evaluate Presentation
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error State */}
          {evaluationResponse?.error.isError && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  Evaluation Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">
                  {evaluationResponse.error.message}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
