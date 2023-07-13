import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState} from './authSlice';
import {SignRequest, SignResponse, Recipe, RejectValue} from "../../types/userTypes";

axios.defaults.baseURL = "https://recipe-backend-h6sf.onrender.com";

const token = {
    set(token: string) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = "";
    },
};

export const registration = createAsyncThunk<Omit<SignResponse, "savedRecipes">, SignRequest, {rejectValue: RejectValue}>(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/users/register", userData);
            token.set(data.token);
            return data;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const login = createAsyncThunk<SignResponse, SignRequest, {rejectValue: RejectValue}>(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/users/login", userData);
            token.set(data.token);
            return data;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const logout = createAsyncThunk<undefined, undefined, {rejectValue: RejectValue}>(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await axios.post("/users/logout");
            token.unset();
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<Omit<SignResponse, "token">, undefined, {rejectValue: RejectValue, state: {auth:  AuthState }}>(
    "auth/refreshUser",
    async (_, { rejectWithValue, getState}) => {
        const tokenFromStorage = getState().auth.token;

        if (!tokenFromStorage) {
            return rejectWithValue({message: "Unauthorized"});
        }
        token.set(tokenFromStorage);
        try {
            const { data } = await axios("/users/current");
            return data;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const getSavedRecipes = createAsyncThunk<Recipe[], undefined, {rejectValue: RejectValue , state: {auth:  AuthState }}>(
    "auth/getSavedRecipes",
    async (_, {rejectWithValue, getState}) => {
        try {
            const userId = getState().auth.id;
            if (!userId){
                rejectWithValue({ message: "Can't fetch saved recipes"})
            }
            const {data} = await axios.get(`/users/${userId}/savedRecipes`)
            return data;
        } catch (e: any) {
            rejectWithValue(e.message)
        }
    }
);

export const addSavedRecipes = createAsyncThunk<{ recipe: Recipe }, string, {rejectValue: RejectValue , state: {auth:  AuthState }}>(
    "auth/addSavedRecipe",
    async (recipeId, {rejectWithValue, getState}) => {
        try {
            const userId = getState().auth.id;
            const {data} = await axios.post(`/users/${userId}/savedRecipes/${recipeId}`)

            return data;
        } catch (e: any){
            rejectWithValue(e.message)
        }
    }
);

export const removeSavedRecipe = createAsyncThunk<{recipe: Recipe}, string, {rejectValue: RejectValue, state: {auth:  AuthState }}>(
    "auth/removeSavedRecipe",
    async (recipeId, { rejectWithValue, getState}) => {
        try {
            const userId = getState().auth.id
            const {data} = await axios.delete(`users/${userId}/savedRecipes/${recipeId}`)
            return data;
        } catch (e: any) {
            rejectWithValue(e.message)
        }
    }
)