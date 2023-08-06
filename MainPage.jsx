import { useEffect, useState } from "react";

export default function MainPage({ quiz, handleFetch }) {
  const [allQuiz, setAllQuiz] = useState(
    quiz.map((item) => {
      const temp = [];
      for (let i = 0; i < item.incorrect_answers.length; i++) {
        temp.push({
          answer: item.incorrect_answers[i],
          is_clicked: false,
          id: i,
        });
      }
      temp.push({ answer: item.correct_answer, is_clicked: false, id: 3 });
      return {
        question: item.question,
        correct_answer: item.correct_answer,
        all_answers: temp,
        is_chosen: false,
        id: crypto.randomUUID(),
        correct: undefined,
      };
    })
  );
  const [test, setTest] = useState(false); //to refresh the page once after fully loading (in order to display all answers)
  const [replay, setReplay] = useState(false);
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function handleClick(answer_id, quiz_id) {
    setAllQuiz((prevQuiz) => {
      return prevQuiz.map((quiz) => {
        if (quiz.id === quiz_id) {
          return {
            ...quiz,
            all_answers: quiz.all_answers.map((item) => {
              return {
                ...item,
                is_clicked: false,
              };
            }),
          };
        } else return { ...quiz };
      });
    });
    setAllQuiz((prevQuiz) => {
      return prevQuiz.map((quiz) => {
        if (quiz.id === quiz_id) {
          return {
            ...quiz,
            all_answers: quiz.all_answers.map((item) => {
              if (item.id === answer_id) {
                return { ...item, is_clicked: true };
              } else return { ...item };
            }),

            is_chosen: true,
          };
        }
        return { ...quiz };
      });
    });
  }
  useEffect(() => {
    setTest(true);
    for (let i = 0; i < allQuiz.length; i++) {
      shuffle(allQuiz[i].all_answers);
    }
  }, []);

  function checkAnswers() {
    var counter = 0;
    allQuiz.map((quiz) => {
      if (quiz.is_chosen) {
        counter++;
      }
    });
    if (counter == allQuiz.length) {
      setAllQuiz((prevQuiz) => {
        return prevQuiz.map((quiz) => {
          for (let i = 0; i < quiz.all_answers.length; i++) {
            if (
              quiz.all_answers[i].answer === quiz.correct_answer &&
              quiz.all_answers[i].is_clicked
            ) {
              return { ...quiz, correct: true };
            }
          }
          return { ...quiz, correct: false };
        });
      });
      setReplay(true);
    } else {
      console.log("Please answer all questions");
    }
  }
  function playAgain() {
    handleFetch();
    setTest(true);
  }

  return (
    <>
      <div className="main-page">
        {allQuiz.map((quiz) => {
          return (
            <div className="quiz-item" key={quiz.question}>
              <div className="question">
                {quiz.question.replace(/&quot;|&amp;|&#039;|&Uuml;/g, "")}
              </div>
              <div className="answers ">
                {quiz.all_answers.map((answer) => {
                  return (
                    <div
                      key={answer.answer}
                      className={`answer-btn ${
                        answer.is_clicked ? "clicked" : ""
                      } ${
                        quiz.correct === true && answer.is_clicked
                          ? "correct"
                          : ""
                      } ${
                        quiz.correct === false && answer.is_clicked
                          ? "wrong"
                          : ""
                      }`}
                      onClick={() => handleClick(answer.id, quiz.id)}
                    >
                      {answer.answer.replace(/&quot;|&amp;|&#039;|&Uuml;/g, "")}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="btns">
          {replay === false && (
            <button onClick={checkAnswers}>Check Answers</button>
          )}
          {replay && <button onClick={handleFetch}>Take quiz again!</button>}
        </div>
      </div>
    </>
  );
}
