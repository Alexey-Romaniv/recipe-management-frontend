import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import {SignRequest} from "../../types/userTypes";
import {useAppDispatch} from "../../utils/hook";
import {login} from "../../redux/auth/authOperations";

const LoginForm = () => {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const dispatch = useAppDispatch()
    const handleSubmit = async (values : SignRequest, {resetForm} : FormikHelpers<SignRequest>) => {
        await dispatch(login(values));
        resetForm();

    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <div>
                    <Field
                        as={TextField}
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        helperText={<ErrorMessage name="email" />}
                    />
                </div>
                <div>
                    <Field
                        as={TextField}
                        type="password"
                        name="password"
                        label="Password"
                        variant="outlined"
                        helperText={<ErrorMessage name="password" />}
                    />
                </div>
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginForm;
