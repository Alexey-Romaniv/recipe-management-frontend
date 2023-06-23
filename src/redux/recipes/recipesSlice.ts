import {createSlice} from "@reduxjs/toolkit";

import { RecipeState} from "../../types/userTypes";

import {fetchRecipes, createRecipe} from "./recipesOperations";
import {logout} from "../auth/authOperations";

const initialState: RecipeState = {
    recipes: [],
    isLoading: false,
    error: undefined,
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(fetchRecipes.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
        .addCase(createRecipe.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
        .addCase(fetchRecipes.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
        .addCase(createRecipe.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchRecipes.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.error = undefined;
            state.recipes = payload;
        }).addCase(createRecipe.fulfilled, (state, {payload}) =>{
            state.isLoading = false;
            state.error = undefined;
            state.recipes.push(payload)
        }).addCase(logout.fulfilled, (state)=> {
            state.recipes = [];
            state.error = undefined;
            state.isLoading = false;
        })
})

export const  recipesReducer = recipesSlice.reducer;