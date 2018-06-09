import { combineReducers } from 'redux'
import routerReducer from './router-reducer'
import cardsReducer from './cards-reducer'

const allReducers = {
    router: routerReducer,
    data: cardsReducer
}

const rootReducer = combineReducers(allReducers)

export default rootReducer