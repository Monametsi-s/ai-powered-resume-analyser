import { use } from "react";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { safeRedirect } from "~/lib/utils";

export const meta = () => [
  { title: "CVAnalyser | Auth" },
  { name: "description", content: "Login to your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Get user-supplied redirect but validate it
      const params = new URLSearchParams(location.search);
      const nextParam = params.get("next");
      const target = safeRedirect(nextParam, "/");
      navigate(target);
    }
  }, [auth.isAuthenticated, location.search]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
