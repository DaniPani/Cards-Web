export const CARDSLOADED = 'CARDSLOADED';

export function cardsLoaded(data) {
  return {
    type: CARDSLOADED,
    payload: {data}
  }
}

export const CARDSFETCH = 'CARDSFETCH';

export function cardsFetch() {
  return async dispatch => {
      let response = await fetch('/data/card-tiny.json')
      let data = await response.json()
      await dispatch(cardsLoaded(data))
  }
}

export const CARDSADDED = 'CARDSADDED';

export function cardsAdded(cards = {}) {
  return {
    type: CARDSADDED,
    payload: {cards}
  }
}

export const CARDSSAVED = 'CARDSSAVED';

export function cardsSaved(cards = []) {
  return {
    type: CARDSSAVED,
    payload: {cards}
  }
}

export const CARDSREMOVED = 'CARDSREMOVED';

export function cardsRemoved(index = 0) {
  return {
    type: CARDSREMOVED,
    payload: {index}
  }
}