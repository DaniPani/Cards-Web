import {
  cardsFetch
} from './card-actions'

export function listFetchDrive(folderName) {
  return async dispatch => {
    let responseFolder = await gapi.client.drive.files.list({
      'q': `name = "${folderName}" and mimeType ="application/vnd.google-apps.folder"`,
      'pageSize': 1
    })
    if (!responseFolder.incompleteSearch) {
      let response = await gapi.client.drive.files.list({
        'q': `"${responseFolder.result.files[0].id}" in parents and mimeType = "application/vnd.google-apps.spreadsheet"`
      })
      if (!response.result.incompleteSearch) {
        await dispatch(listLoaded(response.result.files))
        response.result.files.forEach(e => dispatch(cardsFetch(e.name, e.id, 'GOOGLE')))
      }
    }
  }
}

export const LISTLOADED = 'LISTLOADED'

export function listLoaded(list = []) {
  return {
    type: LISTLOADED,
    payload: {
      list
    }
  }
}