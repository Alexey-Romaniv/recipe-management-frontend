import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../utils/hook";
import {fetchRecipes} from "../../redux/recipes/recipesOperations";
import {Recipe} from "../../types/userTypes";
import {RecipeItem} from "../RecipeItem/RecipeItem";
import {Box} from "@mui/material";
import RecipeFilter from "../RecipeFilter/RecipeFilter";

export const RecipesList: React.FC<{recipes: Recipe[], savedRecipes: Recipe[]}> = ({recipes, savedRecipes}) => {


    return(
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={2} justifyContent="start">
                {recipes.map((recipe) => (
                    <RecipeItem key={recipe._id} recipe={recipe} savedRecipes={savedRecipes} />
                ))}
            </Grid>
        </Container>

    )
}