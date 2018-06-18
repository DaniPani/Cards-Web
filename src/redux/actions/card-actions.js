export const CARDSLOADING = 'CARDSLOADING';

export function cardsLoading(isLoading) {
  return {
    type: CARDSLOADING,
    payload: {isLoading}
  }
}

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
      await dispatch(cardsLoading(true))
      let response = await fetch('/data/card-tiny.json')
      await dispatch(cardsLoading(false))
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