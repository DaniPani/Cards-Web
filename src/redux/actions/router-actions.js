export const NAVIGATE = 'NAVIGATE';

export function navigate(path) {
  return {
    type: NAVIGATE,
    payload: {path}
  }
}