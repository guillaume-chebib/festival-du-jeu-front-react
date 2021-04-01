import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © Festival du jeu '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">Réalisé avec amour par Remy, Solene et Guillaume !</Typography>
                    <Copyright/>
                </Container>
            </footer>
        </div>
    );
}
