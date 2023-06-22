// CookingModePage.tsx
import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Ingredient} from '../types/userTypes';
import {useAppSelector} from "../utils/hook";
import {Button, Checkbox, FormControlLabel, List, ListItem, Typography, Box} from '@mui/material';


const CookingModePage: React.FC = () => {
    const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
    const {recipeId} = useParams<{ recipeId: string }>();
    const recipes = useAppSelector((state) => state.recipes.recipes);
    const recipe = recipes.find((r) => r._id === recipeId);
    const navigate = useNavigate();

    if (!recipe) {
        navigate(-1);
        return null;

    }

    const handleToggleIngredient = (ingredient: Ingredient) => {
        if (usedIngredients.includes(ingredient.name)) {
            setUsedIngredients(usedIngredients.filter((name) => name !== ingredient.name));
        } else {
            setUsedIngredients([...usedIngredients, ingredient.name]);
        }
    };

    const handleResetCooking = () => {
        setUsedIngredients([]);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Typography variant="h2" align="center" gutterBottom>
                Cooking Mode: {recipe.title}
            </Typography>
            <Typography variant="h3" align="center" gutterBottom>
                Ingredients:
            </Typography>
            <List>
                {recipe.ingredients.map((ingredient) => (
                    <ListItem key={ingredient.name}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={usedIngredients.includes(ingredient.name)}
                                    onChange={() => handleToggleIngredient(ingredient)}
                                />
                            }
                            label={`${ingredient.name} = ${ingredient.quantity}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Typography variant="h3" align="center" gutterBottom>
                Instructions:
            </Typography>
            <ol>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>
                        <Typography align="center">{step}</Typography>
                    </li>
                ))}
            </ol>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleResetCooking}>
                    Reset
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box>
        </Box>
    );


};

export default CookingModePage;
