import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import assetReducer from "./assetSlice";
import locationReducer from "./locationSlice";
import assetcategoryReducer from "./assetcategorySlice";
import transferassetReducer from "./transferassetSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    asset: assetReducer,
    location: locationReducer,
    assetcategory: assetcategoryReducer,
    tranferasset: transferassetReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
