"use client";

import { useState, useEffect } from "react";
import { CheckCircleIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

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

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
};

const getScoreVariant = (score: number) => {
  if (score >= 85) return "default";
  if (score >= 70) return "secondary";
  return "destructive";
};

const formatParameterName = (name: string) => {
  return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

// Define which evaluation criteria should be shown for each presentation type
const getEvaluationCriteria = (
  type: PresentationType
): (keyof Evaluation)[] => {
  switch (type) {
    case "SLIDES_ONLY":
      return ["CONTENT_QUALITY", "SLIDE_DESIGN", "STRUCTURE_FLOW"];
    case "VOICE_OVER":
      return [
        "CONTENT_QUALITY",
        "SLIDE_DESIGN",
        "STRUCTURE_FLOW",
        "VOICE_CLARITY_DELIVERY",
      ];
    case "FACE_VISIBLE":
      return [
        "CONTENT_QUALITY",
        "SLIDE_DESIGN",
        "STRUCTURE_FLOW",
        "VOICE_CLARITY_DELIVERY",
        "ENGAGEMENT_EXPRESSION",
        "BODY_LANGUAGE",
      ];
    case "FACE_PLUS_SCREEN":
      return [
        "CONTENT_QUALITY",
        "SLIDE_DESIGN",
        "STRUCTURE_FLOW",
        "VOICE_CLARITY_DELIVERY",
        "ENGAGEMENT_EXPRESSION",
        "BODY_LANGUAGE",
        "VISUAL_ENGAGEMENT",
        "TECHNICAL_QUALITY",
      ];
    default:
      return Object.keys({} as Evaluation) as (keyof Evaluation)[];
  }
};

const Page = () => {
  const searchParams = useSearchParams();
  const evId = searchParams.get("evId");

  const [isLoading, setIsLoading] = useState(true);
  const [evaluationResponse, setEvaluationResponse] =
    useState<Presentation | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (!evId) {
        setFetchError("No evaluation ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const docRef = doc(db, "evaluations", evId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Presentation;
          setEvaluationResponse(data);
        } else {
          setFetchError("Evaluation not found");
        }
      } catch (error) {
        console.error("Error fetching evaluation:", error);
        setFetchError("Failed to fetch evaluation data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluation();
  }, [evId]);

  // Calculate overall score based on presentation type-specific criteria
  const overallScore = evaluationResponse
    ? Math.round(
        getEvaluationCriteria(evaluationResponse.type).reduce(
          (sum, criteriaKey) =>
            sum + evaluationResponse.evaluation[criteriaKey].score,
          0
        ) / getEvaluationCriteria(evaluationResponse.type).length
      )
    : 0;

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {isLoading && (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-slate-600">
                    Loading evaluation results...
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fetch Error */}
          {fetchError && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  Error Loading Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">{fetchError}</p>
              </CardContent>
            </Card>
          )}

          {/* Evaluation Results */}
          {evaluationResponse && !evaluationResponse.error.isError && (
            <div className="space-y-6">
              {/* Title and Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">
                    {evaluationResponse.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">
                    {evaluationResponse.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Overall Score */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <StarIcon className="w-6 h-6 text-yellow-500" />
                    Overall Score
                  </CardTitle>
                  <div
                    className={`text-5xl font-bold mt-2 ${getScoreColor(
                      overallScore
                    )}`}
                  >
                    {overallScore}
                    <span className="text-2xl text-slate-500">/100</span>
                  </div>
                  <Progress
                    value={overallScore}
                    className="w-full max-w-md mx-auto mt-4"
                  />
                </CardHeader>
              </Card>

              {/* Presentation Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Presentation Type</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {formatParameterName(evaluationResponse.type)}
                  </Badge>
                </CardHeader>
              </Card>

              {/* Individual Scores - Only show relevant criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Evaluation</CardTitle>
                  <CardDescription>
                    Breakdown of evaluation across different parameters for{" "}
                    {formatParameterName(evaluationResponse.type)} presentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {getEvaluationCriteria(evaluationResponse.type).map(
                      (criteriaKey) => {
                        const param =
                          evaluationResponse.evaluation[criteriaKey];
                        return (
                          <div
                            key={criteriaKey}
                            className="space-y-2 p-4 rounded-lg border bg-slate-50"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-slate-700">
                                {formatParameterName(criteriaKey)}
                              </h3>
                              <Badge variant={getScoreVariant(param.score)}>
                                <span className={getScoreColor(param.score)}>
                                  {param.score}/100
                                </span>
                              </Badge>
                            </div>
                            <Progress value={param.score} className="h-2" />
                            <p className="text-sm text-slate-600 mt-2">
                              {param.feedback}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    Overall Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed">
                      {evaluationResponse.overallFeedback}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Evaluation Error State */}
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
