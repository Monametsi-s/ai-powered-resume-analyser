import React from 'react';
import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "../Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-3 py-1 rounded-full",
        score > 69
          ? "bg-green-100 border border-green-300"
          : score > 39
            ? "bg-yellow-100 border border-yellow-300"
            : "bg-red-100 border border-red-300"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score indicator"
        className="w-4 h-4"
      />
      <p
        className={cn(
          "text-sm font-semibold",
          score > 69
            ? "text-green-700"
            : score > 39
              ? "text-yellow-700"
              : "text-red-700"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-3">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  if (!tips || tips.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-center">No feedback available for this category</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Tips Summary Grid */}
      <div className="bg-gray-50 w-full rounded-lg px-5 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tips.map((tip, index) => (
            <div className="flex flex-row gap-3 items-start" key={index}>
              <img
                src={
                  tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                }
                alt={tip.type === "good" ? "strength" : "improvement"}
                className="w-5 h-5 mt-0.5 flex-shrink-0"
              />
              <p className="text-base text-gray-700 font-medium">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detailed Explanations */}
      <div className="flex flex-col gap-3 w-full">
        {tips.map((tip, index) => (
          <div
            key={`${index}-${tip.tip}`}
            className={cn(
              "flex flex-col gap-3 rounded-xl p-4 border",
              tip.type === "good"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-yellow-50 border-yellow-200 text-yellow-800"
            )}
          >
            <div className="flex flex-row gap-3 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={tip.type === "good" ? "strength" : "improvement"}
                className="w-5 h-5 flex-shrink-0"
              />
              <h4 className="text-lg font-semibold">{tip.tip}</h4>
            </div>
            <p className="text-base leading-relaxed pl-8">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const categories = [
    {
      id: "tone-style",
      title: "Tone & Style",
      score: feedback?.toneAndStyle?.score || 0,
      tips: feedback?.toneAndStyle?.tips || []
    },
    {
      id: "content",
      title: "Content",
      score: feedback?.content?.score || 0,
      tips: feedback?.content?.tips || []
    },
    {
      id: "structure",
      title: "Structure",
      score: feedback?.structure?.score || 0,
      tips: feedback?.structure?.tips || []
    },
    {
      id: "skills",
      title: "Skills",
      score: feedback?.skills?.score || 0,
      tips: feedback?.skills?.tips || []
    }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Detailed Feedback</h2>
        <p className="text-gray-600">
          Expand each section below to see specific recommendations for improving your resume.
        </p>
      </div>
      
      <Accordion allowMultiple className="space-y-3">
        {categories.map((category) => (
          <AccordionItem key={category.id} id={category.id}>
            <AccordionHeader itemId={category.id}>
              <CategoryHeader
                title={category.title}
                categoryScore={category.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={category.id}>
              <div className="pt-2 pb-4">
                <CategoryContent tips={category.tips} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
// import { cn } from "~/lib/utils";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionHeader,
//   AccordionItem,
// } from "../Accordion";

// const ScoreBadge = ({ score }: { score: number }) => {
//   return (
//     <div
//       className={cn(
//         "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
//         score > 69
//           ? "bg-badge-green"
//           : score > 39
//             ? "bg-badge-yellow"
//             : "bg-badge-red"
//       )}
//     >
//       <img
//         src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
//         alt="score"
//         className="size-4"
//       />
//       <p
//         className={cn(
//           "text-sm font-medium",
//           score > 69
//             ? "text-badge-green-text"
//             : score > 39
//               ? "text-badge-yellow-text"
//               : "text-badge-red-text"
//         )}
//       >
//         {score}/100
//       </p>
//     </div>
//   );
// };

// const CategoryHeader = ({
//   title,
//   categoryScore,
// }: {
//   title: string;
//   categoryScore: number;
// }) => {
//   return (
//     <div className="flex flex-row gap-4 items-center py-2">
//       <p className="text-2xl font-semibold">{title}</p>
//       <ScoreBadge score={categoryScore} />
//     </div>
//   );
// };

// const CategoryContent = ({
//   tips,
// }: {
//   tips: { type: "good" | "improve"; tip: string; explanation: string }[];
// }) => {
//   return (
//     <div className="flex flex-col gap-4 items-center w-full">
//       <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
//         {tips.map((tip, index) => (
//           <div className="flex flex-row gap-2 items-center" key={index}>
//             <img
//               src={
//                 tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
//               }
//               alt="score"
//               className="size-5"
//             />
//             <p className="text-xl text-gray-500 ">{tip.tip}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col gap-4 w-full">
//         {tips.map((tip, index) => (
//           <div
//             key={index + tip.tip}
//             className={cn(
//               "flex flex-col gap-2 rounded-2xl p-4",
//               tip.type === "good"
//                 ? "bg-green-50 border border-green-200 text-green-700"
//                 : "bg-yellow-50 border border-yellow-200 text-yellow-700"
//             )}
//           >
//             <div className="flex flex-row gap-2 items-center">
//               <img
//                 src={
//                   tip.type === "good"
//                     ? "/icons/check.svg"
//                     : "/icons/warning.svg"
//                 }
//                 alt="score"
//                 className="size-5"
//               />
//               <p className="text-xl font-semibold">{tip.tip}</p>
//             </div>
//             <p>{tip.explanation}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Details = ({ feedback }: { feedback: Feedback }) => {
//   return (
//     <div className="flex flex-col gap-4 w-full">
//       <Accordion>
//         <AccordionItem id="tone-style">
//           <AccordionHeader itemId="tone-style">
//             <CategoryHeader
//               title="Tone & Style"
//               categoryScore={feedback.toneAndStyle.score}
//             />
//           </AccordionHeader>
//           <AccordionContent itemId="tone-style">
//             <CategoryContent tips={feedback.toneAndStyle.tips} />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem id="content">
//           <AccordionHeader itemId="content">
//             <CategoryHeader
//               title="Content"
//               categoryScore={feedback.content.score}
//             />
//           </AccordionHeader>
//           <AccordionContent itemId="content">
//             <CategoryContent tips={feedback.content.tips} />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem id="structure">
//           <AccordionHeader itemId="structure">
//             <CategoryHeader
//               title="Structure"
//               categoryScore={feedback.structure.score}
//             />
//           </AccordionHeader>
//           <AccordionContent itemId="structure">
//             <CategoryContent tips={feedback.structure.tips} />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem id="skills">
//           <AccordionHeader itemId="skills">
//             <CategoryHeader
//               title="Skills"
//               categoryScore={feedback.skills.score}
//             />
//           </AccordionHeader>
//           <AccordionContent itemId="skills">
//             <CategoryContent tips={feedback.skills.tips} />
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// };

// export default Details;
