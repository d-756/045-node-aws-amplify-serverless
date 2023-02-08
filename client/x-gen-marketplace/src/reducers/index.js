import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
import configureStore from '../configureStore'

const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  transforms: [],
}

/* ------------- Assemble The Reducers ------------- */
const reducers = combineReducers({
  app: require('./app').reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const initialState = {}

const store = configureStore(initialState, persistedReducer, history)

const persistor = persistStore(store)

export { store, persistor, history }
