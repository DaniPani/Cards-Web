import{cardsFetch} from './card-actions'

export function listFetchDrive(folderId) {
  return async dispatch => {
      let response = await gapi.client.drive.files.list({
          'q': `"${folderId}" in parents and mimeType = "application/vnd.google-apps.spreadsheet"`
      })
      if(!response.result.incompleteSearch){
        await dispatch(listLoaded(response.result.files))
        response.result.files.forEach(e => dispatch(cardsFetch(e.name, e.id, 'GOOGLE')))
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