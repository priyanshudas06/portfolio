import { useGitHub } from "./hooks/useGitHub";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import Languages from "./components/Languages";
import Footer from "./components/Footer";

// const [username, setUsername] = useState("");
// const [submitted, setSubmitted] = useState(false);
// const { data, loading, error } = useGitHub(submitted ? username : null);

// if (!submitted) {
//   return (
//     <UsernameForm
//       onSubmit={(name) => {
//         setUsername(name);
//         setSubmitted(true);
//       }}
//     />
//   );
// }

export default function App() {
  const { data, loading, error } = useGitHub();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-dots">
          <span />
          <span />
          <span />
        </div>
        <span>fetching github data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <code>error: {error}</code>
        <p style={{ fontSize: "13px", color: "var(--text2)" }}>
          GitHub API rate limit may have been hit. Try again in a minute.
        </p>
      </div>
    );
  }

  const { profile, repos, languages, totalStars } = data;

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} />
        <Stats profile={profile} totalStars={totalStars} />
        <Projects repos={repos} />
        <Languages languages={languages} />
      </main>
      <Footer profile={profile} />
    </>
  );
}

// import { useState } from "react";
// import { useGitHub } from "./hooks/useGitHub";
// import UsernameForm from "./components/UsernameForm";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Stats from "./components/Stats";
// import Projects from "./components/Projects";
// import Languages from "./components/Languages";
// import Footer from "./components/Footer";

// export default function App() {
//   const [username, setUsername] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const { data, loading, error } = useGitHub(submitted ? username : null);

//   function handleSubmit(name) {
//     setUsername(name);
//     setSubmitted(true);
//   }

//   if (!submitted) {
//     return <UsernameForm onSubmit={handleSubmit} />;
//   }

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="loading-dots">
//           <span />
//           <span />
//           <span />
//         </div>
//         <span>fetching {username}'s github...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-screen">
//         <code>error: {error}</code>
//         <p
//           style={{ fontSize: "13px", color: "var(--text2)", marginTop: "8px" }}
//         >
//           "{username}" may not exist, or the API rate limit was hit.
//         </p>
//         <button
//           onClick={() => {
//             setSubmitted(false);
//             setUsername("");
//           }}
//           style={{
//             marginTop: "16px",
//             fontFamily: "var(--mono)",
//             fontSize: "12px",
//             padding: "8px 16px",
//             background: "transparent",
//             border: "1px solid var(--border2)",
//             color: "var(--text2)",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           ← try another username
//         </button>
//       </div>
//     );
//   }

//   const { profile, repos, languages, totalStars } = data;

//   return (
//     <>
//       <Navbar username={username} onReset={() => setSubmitted(false)} />
//       <main>
//         <Hero profile={profile} />
//         <Stats profile={profile} totalStars={totalStars} />
//         <Projects repos={repos} />
//         <Languages languages={languages} />
//       </main>
//       <Footer profile={profile} />
//     </>
//   );
// }
