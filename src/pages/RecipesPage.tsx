import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {fetchRecipes} from "../redux/recipes/recipesOperations";
import {useAppDispatch, useAppSelector} from "../utils/hook";
import {RecipesList} from "../components/RecipesList/RecipesList";
import Modal from "../components/Modal/Modal";
import {getSavedRecipes} from "../redux/auth/authOperations";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RecipesPage() {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector((state) => state.recipes.recipes);
    const {savedRecipes} = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchRecipes());
        if (!savedRecipes.length && !recipes.length) {
            dispatch(getSavedRecipes());
        }
    }, [dispatch, savedRecipes.length, recipes.length]);

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* Hero unit */}
            <Box sx={{ mt: "50px", display: "flex", justifyContent: "center" }}>
                <Button variant="contained" sx={{}} onClick={handleOpenModal}>
                    Create recipe
                </Button>
                <Modal open={openModal} onClose={handleCloseModal} />
            </Box>
            <RecipesList recipes={recipes} savedRecipes={savedRecipes} />
            {/* Footer */}
            <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

