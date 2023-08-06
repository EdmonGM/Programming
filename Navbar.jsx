export default function Navbar({ setStart }) {
  function handleClick() {
    setStart(false);
  }
  return (
    <nav>
      <div className="navbar" onClick={handleClick}>
        <img src="../public/quiz-logo.png" width="52px" />
        <div>Quiz</div>
      </div>
    </nav>
  );
}
