import {combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import jobslice from './jobslice';
import applicationSlice from './applicationSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import companySlices from './companySlices';
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const  rootReducer = combineReducers({
    auth:authSlice,
    job:jobslice,
    company:companySlices,
    application:applicationSlice
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    // reducer:{
    // // auth:authSlice,
    // //  job:jobslice

    
    // }
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export default store;