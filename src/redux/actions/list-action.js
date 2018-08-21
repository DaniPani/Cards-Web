export function listFetchDrive() {
  return async dispatch => {
      let response = await gapi.client.drive.files.list({
          'q': '"1vcrEWntFMeBdJyRoOArepg-j8G7ZkCln" in parents and mimeType = "application/vnd.google-apps.spreadsheet"'
      })
      if(!response.result.incompleteSearch){
        await dispatch(listLoaded(response.result.files))
      }
  }
}

export const LISTLOADED = 'LISTLOADED'

export function listLoaded(list = []) {
  return {
    type: LISTLOADED,
    payload: {list}
  }
}