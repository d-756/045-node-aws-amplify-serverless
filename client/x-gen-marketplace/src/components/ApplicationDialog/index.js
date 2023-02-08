import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
  
function ApplicationDialog(props) {
    const {open, data, onClose, onConfirm} = props;
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby={`form-dialog-title-${data.id}`}>
            <DialogTitle id={`form-dialog-title-${data.id}`}>{data.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {data.domain}
                </DialogContentText>
                <DialogContentText>
                    {data.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    {data.isSubscribed ? 'unsubscribe': 'subscribe'}
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ApplicationDialog;
