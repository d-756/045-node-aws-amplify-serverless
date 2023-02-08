import React from 'react';
import { LoadingAnimation as Loading } from '../../components/LoadingAnimation';
import SignUpForm from './SignUpForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {}
}));

export default function SignUp() {
    const classes = useStyles();
  
    return (
        <>
            {/* <Loading loading={false} /> */}
            <SignUpForm />
        </>
    );
}