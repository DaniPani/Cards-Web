export function listFetch(folderId, provider) {
  return async dispatch => {
    switch(provider){
      case 'GOOGLE':
        dispatch(listFetchDrive(folderId))
    }
  }
}

export function listFetchDrive(folderId) {
  return async dispatch => {
      let response = await gapi.client.drive.files.list({
          'q': `"${folderId}" in parents and mimeType = "application/vnd.google-apps.spreadsheet"`
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