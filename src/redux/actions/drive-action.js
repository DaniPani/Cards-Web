export const DRIVELISTFETCH = 'DRIVELISTFETCH';

export function driveListFetch() {
  return async dispatch => {
      let response = await gapi.client.drive.files.list({
          'q': '"1vcrEWntFMeBdJyRoOArepg-j8G7ZkCln" in parents and mimeType = "application/vnd.google-apps.spreadsheet"'
      })
      if(!response.result.incompleteSearch){
        await dispatch(driveListLoaded(response.result.files))
      }
  }
}

export const DRIVELISTLOADED = 'DRIVELISTLOADED'

export function driveListLoaded(list = []) {
  return {
    type: DRIVELISTLOADED,
    payload: {list}
  }
}