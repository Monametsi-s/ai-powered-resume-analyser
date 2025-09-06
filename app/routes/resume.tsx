import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/feedback/Summary";
import ATS from "~/components/feedback/ATS";
import Details from "~/components/feedback/Details";

export const meta = () => [
  { title: "CVAnalyser | Review" },
  { name: "description", content: "Review your resume" },
];

const Resume = () => {
    const { id } = useParams();
    const { auth, isLoading, fs, kv } = usePuterStore();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading, auth.isAuthenticated]);

    useEffect(() => {
      let mounted = true;
      let resumeObjectUrl: string | undefined;
      let imageObjectUrl: string | undefined;

      const loadResume = async () => {
        try {
          const resume = await kv.get(`resume:${id}`);
          if (!resume || !mounted) return;

          const data = JSON.parse(resume);
          
          const resumeBlob = await fs.read(data.resumePath);
          if (!resumeBlob || !mounted) return;
          const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
          resumeObjectUrl = URL.createObjectURL(pdfBlob);
          setResumeUrl(resumeObjectUrl);

          const imageBlob = await fs.read(data.imagePath);
          if (!imageBlob || !mounted) return;
          imageObjectUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageObjectUrl);

          setFeedback(data.feedback);
        } catch (error) {
          console.error('Error loading resume:', error);
        }
      };
      
      loadResume();

      return () => {
        mounted = false;
        if (resumeObjectUrl) URL.revokeObjectURL(resumeObjectUrl);
        if (imageObjectUrl) URL.revokeObjectURL(imageObjectUrl);
      };
    }, [id])
  return (
    <main className="!pt-0">
        <nav className="resume-nav">
            <Link to="/" className="back-button">
                <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                <span className="text-gray-800 text-sm font-semibold">
                    Back to HomePage
                </span>
            </Link>
        </nav>
        <div className="flex flex-row w-full max-lg:flex-col-reverse">
          <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center]">
            {imageUrl && resumeUrl && (
              <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <img src={imageUrl} alt="resume image" className="w-full h-full object-contain rounded-2xl" title="resume" />
                </a>
              </div>
            )}
          </section>
          <section className="feedback-section">
            <h2 className="text-4xl !text-black font-bold">
              Resume Review
            </h2>
            {feedback ? (
              <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback={feedback} />
                <ATS score={feedback.ATS?.score || 0} suggestions={feedback.ATS?.tips || []}/>
                <Details feedback={feedback} />
              </div>
            )
               : (
                <img src="/images/resume-scan-2.gif" className="w-full" alt="" />
               )}
          </section>
        </div>
    </main>
  )
}

export default Resume;