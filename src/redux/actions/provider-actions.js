export const PROVIDERCHOSED = 'PROVIDERCHOSED';

export function providerChosed(providerName) {
  return {
    type: PROVIDERCHOSED,
    payload: {providerName}
  }
}