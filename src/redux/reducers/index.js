import { combineReducers } from 'redux'
import cardsReducer from './cards-reducer'
import userReducer from './user-reducer'
import driveReducer from './drive-reducer'

const allReducers = {
    data: cardsReducer,
    user: userReducer,
    drive: driveReducer
}

const rootReducer = combineReducers(allReducers)

export default rootReducer