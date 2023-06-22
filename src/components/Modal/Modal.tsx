import React, { useState } from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from '@mui/material';
import {useAppDispatch} from "../../utils/hook";
import {createRecipe} from "../../redux/recipes/recipesOperations";
import {Recipe} from "../../types/userTypes";

interface RecipeFormProps {
    open: boolean;
    onClose: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ open, onClose }) => {
    const initialValues: Omit<Recipe, "_id"> = {
        title: '',
        description: '',
        imageURL: '',
        ingredients: [{ name: '', quantity: '' }],
        instructions: [''],
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        imageURL: Yup.string().url('Invalid image URL'),
        ingredients: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Ingredient name is required'),
                quantity: Yup.string().required('Ingredient quantity is required'),
            })
        ),
        instructions: Yup.array().of(Yup.string().required('Instruction is required')),
    });

    const dispatch = useAppDispatch();


    const handleSubmit = async (values: Omit<Recipe, "_id">) => {
        console.log(values);
        await dispatch(createRecipe(values));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Recipe</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <Field
                                    as={TextField}
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="title" component="div" />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <Field
                                    as={TextField}
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                                <ErrorMessage name="description" component="div" />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <Field
                                    as={TextField}
                                    name="imageURL"
                                    label="Image URL"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="imageURL" component="div" />
                            </div>

                            <FieldArray name="ingredients">
                                {({ push, remove }) => (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        {values.ingredients.map((_, index) => (
                                            <div key={index} style={{ marginBottom: '1rem' }}>
                                                <Field
                                                    as={TextField}
                                                    name={`ingredients[${index}].name`}
                                                    label="Ingredient Name"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <ErrorMessage
                                                    name={`ingredients[${index}].name`}
                                                    component="div"
                                                />

                                                <Field
                                                    as={TextField}
                                                    name={`ingredients[${index}].quantity`}
                                                    label="Ingredient Quantity"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <ErrorMessage
                                                    name={`ingredients[${index}].quantity`}
                                                    component="div"
                                                />

                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={() => remove(index)}
                                                    style={{ marginTop: '0.5rem' }}
                                                >
                                                    Remove Ingredient
                                                </Button>
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() => push({ name: '', quantity: '' })}
                                        >
                                            Add Ingredient
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>

                            <FieldArray name="instructions">
                                {({ push, remove }) => (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        {values.instructions.map((_, index) => (
                                            <div key={index} style={{ marginBottom: '1rem' }}>
                                                <Field
                                                    as={TextField}
                                                    name={`instructions[${index}]`}
                                                    label={`Instruction ${index + 1}`}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <ErrorMessage
                                                    name={`instructions[${index}]`}
                                                    component="div"
                                                />

                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={() => remove(index)}
                                                    style={{ marginTop: '0.5rem' }}
                                                >
                                                    Remove Instruction
                                                </Button>
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() => push('')}
                                        >
                                            Add Instruction
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>

                            <DialogActions>
                                <Button type="submit" color="primary">
                                    Save
                                </Button>
                                <Button onClick={onClose} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default RecipeForm;
