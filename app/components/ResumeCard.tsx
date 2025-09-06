import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "~/components/ScoreCircle";

interface Resume {
  id: string;
  companyName: string;
  jobTitle: string;
  feedback: any;
  imagePath: string;
}

interface ResumeCardProps {
  resume: Resume;
}

// @ts-ignore
const ResumeCard = ({ resume }: ResumeCardProps) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    let objectUrl: string | undefined;

    const loadResume = async () => {
      try {
        const blob = await fs.read(resume.imagePath);
        if (!blob || !mounted) return;
        objectUrl = URL.createObjectURL(blob);
        setResumeUrl(objectUrl);
      } catch (error) {
        console.error("Error loading resume image:", error);
      }
    };

    loadResume();

    return () => {
      mounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fs, resume.imagePath]);

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {resume.companyName.trim() && (
            <h2 className="!text-black font-bold break-words">
              {resume.companyName}
            </h2>
          )}
          {resume.jobTitle.trim() && (
            <h3 className="text-lg break-words text-gray-500">
              {resume.jobTitle}{" "}
            </h3>
          )}
          {!resume.companyName.trim() && !resume.jobTitle.trim() && (
            <h2 className="!text-black font-bold">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={resume.feedback?.overallScore} />
        </div>
      </div>
      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
