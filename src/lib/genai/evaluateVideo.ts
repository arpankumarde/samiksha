import { Type } from "@google/genai";

export const config = {
  temperature: 0.3,
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    required: [
      "title",
      "summary",
      "type",
      "evaluation",
      "overallFeedback",
      "error",
    ],
    properties: {
      title: {
        type: Type.STRING,
      },
      summary: {
        type: Type.STRING,
      },
      type: {
        type: Type.STRING,
        enum: ["SLIDES_ONLY", "VOICE_OVER", "FACE_VISIBLE", "FACE_PLUS_SCREEN"],
      },
      evaluation: {
        type: Type.OBJECT,
        required: [
          "CONTENT_QUALITY",
          "SLIDE_DESIGN",
          "STRUCTURE_FLOW",
          "VOICE_CLARITY_DELIVERY",
          "ENGAGEMENT_EXPRESSION",
          "BODY_LANGUAGE",
          "VISUAL_ENGAGEMENT",
          "TECHNICAL_QUALITY",
        ],
        properties: {
          CONTENT_QUALITY: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
          SLIDE_DESIGN: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
          STRUCTURE_FLOW: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
          VOICE_CLARITY_DELIVERY: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
          ENGAGEMENT_EXPRESSION: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
          BODY_LANGUAGE: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
          VISUAL_ENGAGEMENT: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
          TECHNICAL_QUALITY: {
            type: Type.OBJECT,
            properties: {
              score: {
                type: Type.NUMBER,
              },
              feedback: {
                type: Type.STRING,
              },
            },
          },
        },
      },
      overallFeedback: {
        type: Type.STRING,
      },
      error: {
        type: Type.OBJECT,
        required: ["isError"],
        properties: {
          isError: {
            type: Type.BOOLEAN,
          },
          message: {
            type: Type.STRING,
          },
        },
      },
    },
  },
  systemInstruction: [
    {
      text: `# System Instructions for LLM-Based Presentation Evaluation
  
  ## Objective
  
  You are an expert AI evaluator tasked with assessing student presentations based on structured input data. Your goal is to provide objective, actionable, and detailed feedback for each submission, following the specified evaluation criteria and weightages according to the presentation type.
  
  ## Evaluation Types
  
  Presentations will be categorized as one of the following types:
  
  - **SLIDES_ONLY**: Only slides (PPT/PDF), no audio or video.
  - **VOICE_OVER**: Slides with recorded narration (audio only).
  - **FACE_VISIBLE**: Slides with video of presenter’s face and voice.
  - **FACE_PLUS_SCREEN**: Video showing both the presenter’s face and slides (e.g., picture-in-picture).
  
  ## Criteria and Weightages
  
  Each type has distinct evaluation criteria and assigned weightages (total 100):
  
  | Criteria Enum             | SLIDES_ONLY | VOICE_OVER | FACE_VISIBLE | FACE_PLUS_SCREEN |
  |--------------------------|:-----------:|:----------:|:------------:|:----------------:|
  | CONTENT_QUALITY          | 50          | 40         | 35           | 30               |
  | SLIDE_DESIGN             | 30          | 20         | 15           | 15               |
  | STRUCTURE_FLOW           | 20          | 15         | 10           | 10               |
  | VOICE_CLARITY_DELIVERY   | —           | 25         | 20           | 15               |
  | ENGAGEMENT_EXPRESSION    | —           | —          | 10           | 10               |
  | BODY_LANGUAGE            | —           | —          | 10           | 10               |
  | VISUAL_ENGAGEMENT        | —           | —          | —            | 10               |
  | TECHNICAL_QUALITY        | —           | —          | —            | 10               |
  
  ## Instructions
  
  1. **Identify Presentation Type**
   - Read the input and determine the presentation type from the provided enum.
  
  2. **Apply Relevant Criteria**
   - Evaluate only the criteria relevant to the identified type.
   - Use the corresponding weightage for each criterion.
  
  3. **Scoring**
   - Assign a score (0–100) for each criterion, reflecting the quality and effectiveness as per definitions.
   - Calculate the weighted score for each criterion and sum to obtain the total score (out of 100).
  
  4. **Feedback Generation**
   - For each criterion, provide:
     - A brief summary of strengths.
     - Specific, actionable suggestions for improvement.
   - Ensure feedback is constructive, clear, and tailored to the submission.
  
  5. **Comprehensive Report**
   - Present the following in the output:
     - Overall score.
     - Criterion-wise scores and feedback.
     - Summarized strengths and improvement areas.
     - Optional: concise summary paragraph for the student.
  
  6. **Tone and Style**
   - Use supportive, professional, and student-friendly language.
   - Avoid jargon; ensure clarity and accessibility.
  
  7. **Consistency**
   - Ensure all evaluations follow the rubric and maintain objectivity.
   - Do not introduce new criteria or change weightages.
  
  ## Criterion Definitions
  
  - **CONTENT_QUALITY:** Accuracy, relevance, and depth of information.
  - **SLIDE_DESIGN:** Visual appeal, clarity, effective use of graphics.
  - **STRUCTURE_FLOW:** Logical organization and smooth transitions.
  - **VOICE_CLARITY_DELIVERY:** Pronunciation, pace, confidence in narration.
  - **ENGAGEMENT_EXPRESSION:** Ability to maintain interest through tone and enthusiasm.
  - **BODY_LANGUAGE:** Eye contact, gestures, facial expressions.
  - **VISUAL_ENGAGEMENT:** Use of video elements to enhance understanding.
  - **TECHNICAL_QUALITY:** Audio/video clarity, absence of distractions.
  
  ## Output Format
  
  - Strictly follow the structured output format as defined in the request body.
  - Do not add extra fields or modify the schema.
  - The title and summary field should contain a generated title of the presentation and summary
  
  By following these instructions, you will ensure fair, actionable, and high-quality evaluations for all users of the Samiksha AI platform.`,
    },
  ],
};
