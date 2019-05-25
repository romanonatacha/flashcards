import { getDecks } from "../utils/api";
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK } from "./actionTypes";

export const receiveDecks = decks => {
  return {
    type: RECEIVE_DECKS,
    decks
  };
};

export const addDeck = deck => {
  return {
    type: ADD_DECK,
    deck
  };
};

export const addCard = (card, title) => {
  return {
    type: ADD_CARD,
    card,
    title
  };
};

export const deleteDeck = title => {
  return {
    type: DELETE_DECK,
    title
  };
};

export const handleInitialData = () => {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(receiveDecks({ decks }));
    });
  };
};
