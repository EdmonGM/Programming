import "@fontsource/roboto";
import "./App.css";
import { useReducer, useState, useEffect } from "react";
import { INITIAL_STATE, quizReducer } from "./quizReducer";
import { ACTION_TYPES } from "./quizActionTypes";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";
import Navbar from "./Navbar";
function App() {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);
  const [start, setStart] = useState(false);
  function handleFetch() {
    dispatch({ type: ACTION_TYPES.FETCH_START });
    setStart(true);
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: ACTION_TYPES.FETCH_SUCCESS,
          payload: data.results,
        }).catch((err) => dispatch({ type: ACTION_TYPES.FETCH_ERROR }))
      );
  }
  function tryAgain() {
    setStart(false);
  }
  return (
    <>
      {!start && <LandingPage handleFetch={handleFetch} />}
      {state.loading && start && (
        <div className="wait">
          <span>Please Wait...</span>
          <div>
            <div>Taking too long?</div>
            <button onClick={tryAgain}>Try Again</button>
          </div>
        </div>
      )}
      {!state.loading && start && (
        <>
          <Navbar setStart={setStart} />
          <MainPage quiz={state.quiz} handleFetch={handleFetch} />
        </>
      )}
      {state.error && <div>ERROR!</div>}
    </>
  );
}

export default App;
