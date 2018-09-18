export const CARDSCHOSED = 'CARDSCHOSED';

export function cardsChosed(spreadsheetId) {
  window.FILESELECTED = true
  return {
    type: CARDSCHOSED,
    payload: spreadsheetId
  }
}

export const CARDSLOADED = 'CARDSLOADED';

export function cardsLoaded(data) {
  return {
    type: CARDSLOADED,
    payload: data
  }
}

export const CARDSRESET = 'CARDSRESET';

export function cardsReset() {
  window.FILESELECTED = false
  return {
    type: CARDSRESET,
    payload: {}
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
      let responseInfo = await gapi.client.sheets.spreadsheets.get({spreadsheetId})
      let responseValues = await gapi.client.sheets.spreadsheets.values.get({spreadsheetId, range: 'A2:B1000'})
      if(responseValues.status == 200 && responseInfo.status == 200){
        await dispatch(cardsLoaded({[spreadsheetId]: {title, words : responseValues.result.values, spreadsheetId, editUrl: responseInfo.result.spreadsheetUrl}}))
      }
  }
}
