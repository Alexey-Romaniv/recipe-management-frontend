import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Recipe, RejectValue} from "../../types/userTypes";
import {AuthState} from "../auth/authSlice";

export const fetchRecipes = createAsyncThunk<Recipe[], undefined, {rejectValue: RejectValue}>(
    "recipes/fetchAll",
    async (_ , {rejectWithValue}) => {
        try{
            const {data} = await axios.get("/recipes");
            return data
        }
        catch (e: any){
            rejectWithValue(e.message);
        }
    }
);

export const createRecipe = createAsyncThunk<Recipe, Omit<Recipe, "_id">, {rejectValue: RejectValue, state: { auth: AuthState}}>(
    "recipes/add",
    async (transactionData, {rejectWithValue, getState})=>{
        try {
            const userId = getState().auth.id;
            const {data} = await axios.post(`/recipes/create/${userId}`, transactionData);

            return data;
        }
        catch (e: any){
            rejectWithValue(e.message);
        }
    }
);
