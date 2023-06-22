// SavedRecipesPage.tsx
import React, { useEffect, useState } from 'react';
import { Recipe } from '../types/userTypes';
import {useAppDispatch, useAppSelector} from "../utils/hook";
import {getSavedRecipes} from "../redux/auth/authOperations";
import {RecipeItem} from "../components/RecipeItem/RecipeItem";
import {Box, Typography } from "@mui/material";
import {RecipesList} from "../components/RecipesList/RecipesList";

const SavedRecipesPage: React.FC = () => {
    // const fetchSavedRecipes = () => {
    //     dispatch(getSavedRecipes());
    // }
const dispatch = useAppDispatch();
    const savedRecipesData = useAppSelector((state) => state.auth.savedRecipes);
useEffect(() => {
    if (!savedRecipesData.length){

    dispatch(getSavedRecipes());
    console.log("UseEffecT!!!")
    }

}, [savedRecipesData.length, dispatch])
// getSavedRecipes();


    const handleDeleteRecipe = (recipeId: string) => {
        // Запрос к API для удаления рецепта по идентификатору
        // Обновление списка сохраненных рецептов после удаления
    };

    return (
        <>
        <Typography variant="h2" component="h2" textAlign="center" my="10px">
            Saved Recipes
        </Typography>
            <RecipesList recipes={savedRecipesData} savedRecipes={savedRecipesData}/>
        </>
    );
};

export default SavedRecipesPage;
