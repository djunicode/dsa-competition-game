const initialState = {
  questions: { noOfQuestions: 0, data: [] },
  noOfQuestionsSolved: 0,
  currentQuestion: 0,
  timer: 0,
};

export const gameInfo = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'GAME_QUESTIONS':
      return {
        ...state,
        questions: {
          noOfQuestions: action.payload.length,
          data: action.payload,
        },
      };
    case 'GAME_QUESTION_SOLVED':
      return {
        ...state,
        noOfQuestionsSolved: state.noOfQuestionsSolved + 1,
      };
    case 'GAME_TIMER_UPDATE':
      return {
        ...state,
        timer: state.timer + 1,
      };

    default:
      return state;
  }
};

export const gameTimer = (state = initialState, action) => {};
