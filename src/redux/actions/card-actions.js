export const CARDSCHOSED = 'CARDSCHOSED';

export function cardsChosed() {
  return {
    type: CARDSCHOSED,
    payload: {}
  }
}

export const CARDSLOADED = 'CARDSLOADED';

export function cardsLoaded(data) {
  return {
    type: CARDSLOADED,
    payload: {data}
  }
}

export function cardsFetch(title, spreadsheetId, provider) {
  return async dispatch => {
    switch(provider){
      case 'GOOGLE':
        return dispatch(cardsFetchDrive(title, spreadsheetId))
    }
  }
}

export function cardsFetchDrive(title, spreadsheetId) {
  return async dispatch => {
      await dispatch(cardsChosed())
      let response = await gapi.client.sheets.spreadsheets.values.get({spreadsheetId, range: 'A2:B1000'})
      if(response.status == 200){
        await dispatch(cardsLoaded({title, cards : response.result.values, spreadsheetId}))
      }
  }
}