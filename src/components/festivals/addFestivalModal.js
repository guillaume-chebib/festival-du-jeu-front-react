import {Button, TextField} from "@material-ui/core";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";


export const AddFestivalModal = ({open,titre,row,setRow,onAdd,onClose}) => {

    const year = new Date().getFullYear()

    return(
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{titre}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                    <form noValidate autoComplete="on" onSubmit={onAdd} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField required id="outlined-required" isrequired="true" label="Nom du festival" variant="outlined"
                                           onChange={e => setRow(prevState => ({
                                               ...prevState,
                                               nom_festival: e.target.value
                                           }))}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Année du festival"
                                    type="number"
                                    defaultValue={year}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={e => setRow(prevState => ({
                                        ...prevState,
                                        annee_festival: e.target.value
                                    }))}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h4>Espace n°1</h4>
                            <FormEspace setForm={setRow} value={1} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h4>Espace n°2</h4>
                            <FormEspace setForm={setRow} value={2}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h4>Espace n°3</h4>
                            <FormEspace setForm={setRow} value={3}/>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={onAdd}  type="submit" variant="contained" color="secondary" autoFocus>
                        Soumettre
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const FormEspace = ({setForm,value}) => {

    const setValue_prix_espace = async e => {
        switch (value) {
            case 1:
                setForm(prevState => ({
                    ...prevState,
                    prix_surface_espace_1: e.target.value

                }))
                break;
            case 2:
                setForm(prevState => ({
                    ...prevState,
                    prix_surface_espace_2: e.target.value

                }))
                break;
            case 3:
                setForm(prevState => ({
                    ...prevState,
                    prix_surface_espace_3: e.target.value

                }))
                break
        }
    }

    const setValue_nb_tables_espace = async e => {
        switch (value) {
            case 1:
                setForm(prevState => ({
                    ...prevState,
                    nb_table_espace_1: e.target.value

                }))
                break;
            case 2:
                setForm(prevState => ({
                    ...prevState,
                    nb_table_espace_2: e.target.value

                }))
                break;
            case 3:
                setForm(prevState => ({
                    ...prevState,
                    nb_table_espace_3: e.target.value

                }))
                break
        }
    }

    const setValue_prix_tables_espace = async e =>{
        switch(value) {
            case 1:
                setForm(prevState => ({
                    ...prevState,
                    prix_table_espace_1: e.target.value

                }))
                break;
            case 2:
                setForm(prevState => ({
                    ...prevState,
                    prix_table_espace_2: e.target.value

                }))
                break;
            case 3:
                setForm(prevState => ({
                    ...prevState,
                    prix_table_espace_3: e.target.value

                }))
                break
        }
    }
    return(
        <div>
            <FormControl >
                <InputLabel htmlFor="prix-m2">Prix m²</InputLabel>
                <Input
                    id="prix-m2"
                    endAdornment={<InputAdornment position="end">€</InputAdornment>}
                    onChange={e => setValue_prix_espace(e)}

                />
            </FormControl>
            <FormControl >
                <InputLabel htmlFor="nb-tables">Nb tables</InputLabel>
                <Input
                    id="nb-tables"
                    onChange={e => setValue_nb_tables_espace(e)}
                />
            </FormControl>
            <FormControl >
                <InputLabel htmlFor="prix-table">Prix table</InputLabel>
                <Input
                    id="prix-table"
                    endAdornment={<InputAdornment position="end">€</InputAdornment>}
                    onChange={e => setValue_prix_tables_espace(e)}
                />
            </FormControl>
        </div>

    )
}
