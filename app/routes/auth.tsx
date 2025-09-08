import { use } from "react";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { safeRedirect } from "../lib/utils";

export const meta = () => [
  { title: "CVAnalyser | Auth" },
  { name: "description", content: "Login to your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(safeRedirect(location.search.split("next=")[1], "/"));
  }, [auth.isAuthenticated, location.search])


  const handleLoginSuccess = async () => {
    // ...existing login logic...
    const params = new URLSearchParams(location.search);
    const next = params.get("next");
    navigate(safeRedirect(next, "/"));
  };

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>
            <div>
              { isLoading ? (
                <button className="auth-button animate-pulse">
                  <p>
                    Signing you in...
                  </p>
                </button>
              ) : ( 
                <>
                  { auth.isAuthenticated ? (
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>Log out</p>
                    </button>
                  ) : (<button className="auth-button" onClick={handleLoginSuccess}>
                      <p>Log in</p>
                    </button>)
                    }
                </>
               ) }
            </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
