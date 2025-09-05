
import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-white p-6 flex flex-col gap-4",
        score > 69
          ? "from-green-100"
          : score > 49
            ? "from-yellow-100"
            : "from-red-100"
      )}
    >
      <div className="flex flex-row gap-4 items-center">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 49
                ? "/icons/ats-warning.svg"
                : "/icons/ats-bad.svg"
          }
          alt="ATS Score"
          className="w-10 h-10"
        />
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800">ATS Score</h3>
          <p className="text-xl font-semibold text-gray-600">{score}/100</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="mb-2">
          <p className="font-semibold text-lg text-gray-800 mb-1">
            How well does your resume pass through Applicant Tracking Systems?
          </p>
          <p className="text-gray-600">
            Your resume was scanned like an employer would. Here's how it performed:
          </p>
        </div>
        
        {suggestions.length > 0 ? (
          <div className="flex flex-col gap-3">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="flex flex-row gap-3 items-start p-3 rounded-lg bg-white bg-opacity-50"
              >
                <img
                  src={
                    suggestion.type === "good"
                      ? "/icons/check.svg"
                      : "/icons/warning.svg"
                  }
                  alt={suggestion.type === "good" ? "Good" : "Improve"}
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                />
                <p className="text-gray-700 leading-relaxed">{suggestion.tip}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600 text-center">No ATS suggestions available</p>
          </div>
        )}
        
        {suggestions.some(s => s.type === "improve") && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-800 font-medium">
              💡 Want a better score? Improve your resume by applying the suggestions above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATS;
