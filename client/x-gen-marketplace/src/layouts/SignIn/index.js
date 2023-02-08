import React from 'react';
import { LoadingAnimation as Loading } from '../../components/LoadingAnimation';
import SignInForm from './SignInForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {}
}));

export default function SignIn() {
    const classes = useStyles();
  
    return (
        <>
            {/* <Loading loading={false} /> */}
            <SignInForm />
        </>
    );
}