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
    payload: data
  }
}

export function cardsFetch(title, spreadsheetId, provider) {
  return async dispatch => {
    await dispatch(cardsChosed())
    switch(provider){
      case 'GOOGLE':
        return dispatch(cardsFetchDrive(title, spreadsheetId))
    }
  }
}

export function cardsFetchDrive(title, spreadsheetId) {
  return async dispatch => {
      let responseInfo = await gapi.client.sheets.spreadsheets.get({spreadsheetId})
      let responseValues = await gapi.client.sheets.spreadsheets.values.get({spreadsheetId, range: 'A2:B1000'})
      if(responseValues.status == 200 && responseInfo.status == 200){
        await dispatch(cardsLoaded({title, words : responseValues.result.values, spreadsheetId, editUrl: responseInfo.result.spreadsheetUrl}))
      }
  }
}