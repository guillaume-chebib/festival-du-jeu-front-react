import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import BusinessIcon from "@material-ui/icons/Business";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const styles = (theme) => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: "#f7f7f7"
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(30),
        display: 'flex',
        position: 'relative',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 70,
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        fontFamily : 'Roboto',
        textAlign: 'center'
    },
    text: {
        fontFamily : 'Work Sans',
        textAlign: 'center'
    },

    backL: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
});

const ProductValues = (props) => {
    const { classes } = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>

                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="images/labyrinthe.svg"
                                alt="jeu"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Sortez jouer !
                            </Typography>
                            <Typography variant="h5" className={classes.text}>
                                Retrouvez les plusieurs dizaines de jeux présents au festival
                                en cliquant sur la partie "jeux du festival"
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="images/editeur.svg"
                                alt="editeur"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Retrouvez des éditeurs rénommés !
                            </Typography>
                            <Typography variant="h5" className={classes.text}>
                               De nombreux exposants seront présents parmis lesquels des éditeurs celèbres,
                                vous pouvez déjà acceder à la liste via l'onglet "les editeurs"
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="images/localisation.svg"
                                alt="localisation"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Rendez-vous au Corum !
                            </Typography>
                            <Typography variant="h5" className={classes.text}>
                                La prochaine édition se tiendra en 2022 au Corum à Montpellier. Nous espérons vous
                                y voir nombreux.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}



export default withStyles(styles)(ProductValues);
