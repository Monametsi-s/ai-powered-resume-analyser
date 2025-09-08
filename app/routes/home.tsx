import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CV Analyser" },
    { name: "description", content: "Smart resume feedback!" },
  ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);
    
    useEffect(() => {
      if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    useEffect(() => {
  const loadResumes = async () => {
    setLoadingResumes(true);
    
    try {
      const items = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = items.map((item) => {
        try {
          return JSON.parse(item.value) as Resume;
        } catch {
          console.warn('Invalid resume data', item.value);
          return null;
        }
      })
        .filter((resume): resume is Resume => 
          resume !== null && 
          typeof resume.id === 'string' &&
          typeof resume.companyName === 'string'
        );
      
      setResumes(parsedResumes);
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoadingResumes(false);
    }
  };
  
  loadResumes();
}, []);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <section className="main-section">
      <div className="page-heading">
        <Navbar />
         <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
          <>
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
        </>
        ): (
          <>
          <Navbar />
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </>)}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

        
          {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>


     
  </main>
}
