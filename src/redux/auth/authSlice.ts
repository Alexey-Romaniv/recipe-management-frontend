import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
    registration,
    login,
    logout,
    fetchCurrentUser, getSavedRecipes, addSavedRecipes, removeSavedRecipe,
} from "./authOperations";
import {Recipe} from "../../types/userTypes";

export type AuthState = {
    id: string,
    email: string,
    token: string,
    isLoading: boolean,
    error:  string,
    isFetching: boolean,
    isAuth: boolean,
    savedRecipes: Recipe[],
}

const initialState: AuthState = {
    id: '',
    email: "",
    token: '',
    isLoading: false,
    error: '',
    isFetching: false,
    isAuth: false,
    savedRecipes: []
};

const authPersistConfig = {
    key: "token",
    storage,
    whitelist: ["token"],
};
//
// export const handlePending= (state: authState) => {
//     state.isLoading = true;
//     state.error = null;
// };
//
// export const handleRejected = (state , action : PayloadAction<string>) => {
//     state.isLoading = false;
//     state.error = action.payload;
// };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(registration.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(registration.fulfilled, (state, { payload }) => {
                state.email = payload.email;
                state.token = payload.token;
                state.id = payload.id
                state.isAuth = true;

                state.isLoading = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.id = action.payload.id;
                // state.savedRecipes = action.payload.savedRecipes;
                state.isAuth = true;

                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                // state.token = "";
                state.isAuth = false;
                state.isLoading = false;
                state.email = '';
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isFetching = true;
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.email = payload.email;
                state.id = payload.id;
                // state.savedRecipes = payload.savedRecipes
                state.isAuth = true;

                state.isLoading = false;
                state.isFetching = false;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.error = action.payload || '';
                state.isFetching = false;
                state.isAuth = false;
                state.isLoading = false;
            })
            .addCase(getSavedRecipes.pending, (state) => {
                state.isLoading = true;
                state.error = '';
                console.log("Loading")
            })
            .addCase(getSavedRecipes.rejected, (state, action) => {
                    state.error = action.payload || 'Server error';
                    state.isLoading = false;
                })
            .addCase(getSavedRecipes.fulfilled, (state, action) => {
                state.savedRecipes = action.payload;
                console.log(action.payload);
                console.log("Work!")
                state.isLoading = false;
            })
            .addCase(addSavedRecipes.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(addSavedRecipes.rejected, (state, action) => {
                state.error = action.payload || 'Server error';
                state.isLoading = false;
            })
            .addCase(addSavedRecipes.fulfilled, (state, action) => {
                state.savedRecipes.push(action.payload.recipe)
                state.isLoading = false;
            }).addCase(removeSavedRecipe.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(removeSavedRecipe.rejected, (state, action) => {
                state.error = action.payload || 'Server error';
                state.isLoading = false;
            })
            .addCase(removeSavedRecipe.fulfilled, (state, action) => {
                state.savedRecipes = state.savedRecipes.filter(
                    (recipe) => recipe._id !== action.payload.recipe._id
                );
                state.isLoading = false;
            })
});

export const authPersistReducer = persistReducer(
    authPersistConfig,
    authSlice.reducer
);