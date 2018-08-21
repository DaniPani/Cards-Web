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

export function cardsFetchDrive(title, spreadsheetId) {
  return async dispatch => {
      let response = await gapi.client.sheets.spreadsheets.values.get({spreadsheetId, range: 'A2:B1000'})
      if(response.status == 200){
        await dispatch(cardsLoaded({title, cards : response.result.values, spreadsheetId}))
      }
  }
}