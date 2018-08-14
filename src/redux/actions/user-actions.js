export const USERSIGNEDIN = 'USERSIGNEDIN';

export function userSignedIn(auth) {
  return {
    type: USERSIGNEDIN,
    payload: {auth}
  }
}