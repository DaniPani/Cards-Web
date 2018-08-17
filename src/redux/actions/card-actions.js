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