import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK
} from "../actions/actionTypes";

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK:
      const { deck } = action;
      let data = state.decks;
      return {
        ...state,
        decks: {
          ...data,
          [deck.title]: deck
        }
      };

    case ADD_CARD:
      const { card, title } = action;
      data = state.decks;
      return {
        ...state,
        decks: {
          ...data,
          [title]: {
            title: title,
            questions: data[title].questions.concat([card])
          }
        }
      };

    case DELETE_DECK:
      data = state.decks;

      let result = {};
      for (let [key, value] of Object.entries(data)) {
        if (key !== action.title) {
          result[key] = value;
        }
      }

      return {
        decks: result
      };

    default:
      return state;
  }
};

export default decks;
