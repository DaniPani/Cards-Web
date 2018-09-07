import { GoogleApiKey, GoogleClientId } from '../../../config'
import {listFetchDrive} from './list-action'

export const USERSIGNEDIN = 'USERSIGNEDIN';

export function userSignedIn(user) {
  return {
    type: USERSIGNEDIN,
    payload: user
  }
}

export const initAuth = async() => {
  await loadGapi()
  return gapi.client.init({
      apiKey: GoogleApiKey,
      clientId: GoogleClientId,
      scope: 'profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive',
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
    })

}

export const signIn = () => async dispatch => {
  await initAuth()
  let GoogleAuth = await gapi.auth2.getAuthInstance()
  await GoogleAuth.signIn()
  await dispatch(listFetchDrive('1vcrEWntFMeBdJyRoOArepg-j8G7ZkCln'))
  return dispatch(userSignedIn({name: GoogleAuth.currentUser.get().getBasicProfile().getGivenName(), provider: 'GOOGLE'}))
}

const loadGapi = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api:client.js?onload=__gapiCallback'
    script.setAttribute('async', '')
    document.head.appendChild(script)
  return new Promise((r) => window.__gapiCallback = r);
}

