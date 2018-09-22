import {
  GoogleApiKey,
  GoogleClientId
} from '../../../config'
import {
  listFetchDrive
} from './list-action'

let GoogleAuth

export const USERSIGNEDIN = 'USERSIGNEDIN';

export function userSignedIn(user) {
  return {
    type: USERSIGNEDIN,
    payload: user
  }
}

export const INITIALIZEDGOOGLEAUTH = 'INITIALIZEDGOOGLEAUTH';

export function initializedGoogleAuth(isSignedIn) {
  return {
    type: INITIALIZEDGOOGLEAUTH,
    payload: isSignedIn
  }
}

export const initAuth = () => async (dispatch, getState) => {
  if (!getState().user.ISINITIALIZED) {
    await loadGapi()
    await gapi.client.init({
      apiKey: GoogleApiKey,
      clientId: GoogleClientId,
      scope: 'profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive',
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
    })
    GoogleAuth = await gapi.auth2.getAuthInstance()
    return dispatch(initializedGoogleAuth(GoogleAuth.isSignedIn.get()))
  }
}

export const GoogleSignInTry = () => async (dispatch, getState) => {
  await dispatch(initAuth())
  if (getState().user.ISLOGGEDIN) {
    return dispatch(googleSignedIn())
  }
}

export const GoogleSignIn = () => async (dispatch, getState) => {
  await dispatch(initAuth())
  await GoogleAuth.signIn()
  if (GoogleAuth.isSignedIn.get()) {
    return dispatch(googleSignedIn())
  }
}

const googleSignedIn = () => async dispatch => {
  await dispatch(userSignedIn({
    name: GoogleAuth.currentUser.get().getBasicProfile().getGivenName(),
    provider: 'GOOGLE'
  }))
  return dispatch(listFetchDrive('Cards'))
}

const loadGapi = _ => {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api:client.js?onload=__gapiCallback'
  script.setAttribute('async', '')
  document.head.appendChild(script)
  return new Promise((r) => window.__gapiCallback = r);
}