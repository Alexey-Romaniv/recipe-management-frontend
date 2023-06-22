import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import {SignRequest} from "../../types/userTypes";
import {useAppDispatch} from "../../utils/hook";
import {registration} from "../../redux/auth/authOperations";

const RegistrationForm = () => {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const dispatch = useAppDispatch()
    const handleSubmit = async (values : SignRequest) => {
        console.log(values); // Действия при отправке формы, например, вызов функции регистрации
        await dispatch(registration(values));
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
                        Register
                    </Button>
                </div>
            </Form>
        </Formik>
    );
};

export default RegistrationForm;
