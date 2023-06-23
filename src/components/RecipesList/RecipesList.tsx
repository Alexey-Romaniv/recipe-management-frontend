import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Recipe} from "../../types/userTypes";
import {RecipeItem} from "../RecipeItem/RecipeItem";

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