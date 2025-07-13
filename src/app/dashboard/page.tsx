"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileVideoIcon,
  StarIcon,
  TrendUpIcon,
  EyeIcon,
  PlayIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";

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

interface EvaluationDoc {
  id: string;
  title: string;
  summary: string;
  type: PresentationType;
  evaluation: Evaluation;
  overallFeedback: string;
  error: Error;
  createdAt?: any;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-700";
  if (score >= 70) return "text-yellow-600";
};

const getScoreVariant = (score: number) => {
  if (score >= 70) return "outline";
  return "destructive";
};

const formatParameterName = (name: string) => {
  return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

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

const calculateOverallScore = (
  evaluation: Evaluation,
  type: PresentationType
) => {
  const criteria = getEvaluationCriteria(type);
  return Math.round(
    criteria.reduce(
      (sum, criteriaKey) => sum + evaluation[criteriaKey].score,
      0
    ) / criteria.length
  );
};

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [evaluations, setEvaluations] = useState<EvaluationDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluations = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const evaluationsRef = collection(db, "evaluations");
        const q = query(evaluationsRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const evaluationDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(evaluationDocs);
        setEvaluations(evaluationDocs as EvaluationDoc[]);
      } catch (err) {
        console.error("Error fetching evaluations:", err);
        setError("Failed to load evaluations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluations();
  }, [user?.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const avgScore =
    evaluations.reduce(
      (sum, evaluation) =>
        sum + calculateOverallScore(evaluation.evaluation, evaluation.type),
      0
    ) / evaluations.length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800">
                  Total Evaluations
                </CardTitle>
                <FileVideoIcon className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">
                  {evaluations.length}
                </div>
                <p className="text-xs text-orange-600">
                  Presentations analyzed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">
                  Average Score
                </CardTitle>
                <StarIcon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${getScoreColor(avgScore)}`}
                >
                  {avgScore.toFixed(2)}/100
                </div>
                <p className="text-xs text-green-600">Overall performance</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-800">
                  Progress Trend
                </CardTitle>
                <TrendUpIcon className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">
                  {evaluations.length > 0 ? "↗" : "—"}
                </div>
                <p className="text-xs text-yellow-600">Keep improving!</p>
              </CardContent>
            </Card>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  Error Loading Evaluations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* No Evaluations */}
          {!isLoading && !error && evaluations.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileVideoIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  No Evaluations Yet
                </h3>
                <p className="text-slate-500 mb-4">
                  Start by uploading your first presentation for evaluation
                </p>
                <Button
                  onClick={() => router.push("/dashboard/evaluate")}
                  className="bg-gradient-to-br from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-500"
                >
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Create First Evaluation
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Evaluations Grid */}
          {!isLoading && !error && evaluations.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  Your Evaluations
                </h2>
                <Button
                  className="bg-gradient-to-br from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-500"
                  asChild
                >
                  <Link href="/dashboard/evaluate">
                    <PlayIcon className="w-4 h-4 mr-2" />
                    New Evaluation
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {evaluations.map((evaluation) => {
                  const overallScore = calculateOverallScore(
                    evaluation.evaluation,
                    evaluation.type
                  );

                  return (
                    <Link
                      href={`/dashboard/evaluate/result?evId=${evaluation?.id}`}
                      key={evaluation.id}
                    >
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg line-clamp-2 mb-2">
                                {evaluation.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2 mb-3">
                                {evaluation.summary}
                              </CardDescription>
                            </div>
                            <Badge
                              variant={getScoreVariant(overallScore)}
                              className="ml-2"
                            >
                              <span className={getScoreColor(overallScore)}>
                                {overallScore}
                              </span>
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-600">
                                Overall Score
                              </span>
                              <span
                                className={`text-sm font-bold ${getScoreColor(
                                  overallScore
                                )}`}
                              >
                                {overallScore}/100
                              </span>
                            </div>

                            <Progress
                              value={overallScore}
                              className="h-2 bg-orange-300/50"
                            />

                            <div className="flex items-center justify-between pt-2">
                              <Badge variant="outline" className="text-xs">
                                {formatParameterName(evaluation.type)}
                              </Badge>

                              <Button
                                size="sm"
                                className="bg-gradient-to-tr from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-500"
                              >
                                <EyeIcon className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
