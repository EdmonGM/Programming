export const INITIAL_STATE = {
  quiz: {
    question: String,
    correct_answer: String,
    incorrect_answers: [],
    category: String,
    difficulty: String,
  },
  loading: false,
  error: false,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        quiz: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: true,
        quiz: {},
      };
    default:
      return {
        state,
      };
  }
}
