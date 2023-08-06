export default function LandingPage({ handleFetch }) {
  return (
    <div className="landing-page">
      <div className="logo">
        <img src="../public/quiz-logo-empty.png" />
      </div>
      <button onClick={handleFetch} className="btn">
        Start
      </button>
    </div>
  );
}
