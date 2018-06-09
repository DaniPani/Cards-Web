import { NAVIGATE } from '../actions/router-actions'

const initialState = {
    edit: false,
    add: false,
    remove: false
}

export default function(state = initialState, action) {
    switch (action.type) {
      case NAVIGATE: {
        switch(action.payload.path){
            case '/':
            return initialState

            case '/edit/':
              return {
                ...state,
                edit: true,
                add: false,
                remove: false
              }
      
            case '/add/':
              return {
                ...state,
                add: true
              }

            case '/remove/':
              return {
                ...state,
                remove: true
              }
          }
      }
  
      default:
        return state;
    }
  }