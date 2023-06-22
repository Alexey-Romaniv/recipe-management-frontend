import { configureStore } from "@reduxjs/toolkit";

import { authPersistReducer } from "./auth/authSlice";
import {recipesReducer} from  './recipes/recipesSlice'

import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

export const store = configureStore({
    reducer: {
        auth: authPersistReducer,
        recipes: recipesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
