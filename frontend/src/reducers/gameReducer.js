const initialState = { gameQuestions: [] };

export const gameInfo = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'GAME_QUESTIONS':
      return { ...state, gameQuestions: action.payload };
    default:
      return state;
  }
};

export const gameTimer = (state = initialState, action) => {};
