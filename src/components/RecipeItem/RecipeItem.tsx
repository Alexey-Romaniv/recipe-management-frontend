import React, {MouseEvent, useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Recipe} from '../../types/userTypes';
import {useNavigate} from "react-router";
import {Box, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../utils/hook";
import {addSavedRecipes, removeSavedRecipe} from "../../redux/auth/authOperations";



export const RecipeItem: React.FC<{ recipe: Recipe; savedRecipes: Recipe[] }> = ({ recipe, savedRecipes }) => {
    const [isSaved, setIsSaved] = useState(false);
    const dispatch = useAppDispatch();

    const handleAddSavedRecipes = async (event: MouseEvent<HTMLButtonElement>, recipeId: string) => {
        event.preventDefault();
        await dispatch(addSavedRecipes(recipeId));
        setIsSaved(true);
    };

    const handleRemoveSavedRecipes = async (event: MouseEvent<HTMLButtonElement>, recipeId: string) => {
        event.preventDefault();
        await dispatch(removeSavedRecipe(recipeId));
        setIsSaved(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const isRecipeSaved = savedRecipes.some(({ _id }) => _id === recipe._id);
        setIsSaved(isRecipeSaved);
    }, [savedRecipes, recipe]);

    return (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {recipe.title[0]}
                        </Avatar>
                    }
                    title={recipe.title}
                />
                <CardMedia component="img" height="194" width="100%" image={recipe.imageURL} alt="" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {recipe.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        type="button"
                        aria-label="add to favorites"
                        onClick={async (event) => {
                            event.stopPropagation();
                            isSaved ? await handleRemoveSavedRecipes(event, recipe._id) : await handleAddSavedRecipes(event, recipe._id);
                        }}
                    >
                        <FavoriteIcon sx={{ color: isSaved ? "orange" : "" }} />
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => navigate(`/cooking-mode/${recipe._id}`)}>
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};
