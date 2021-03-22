import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

export default function ModalJeu({open,est_create,titre,message,onDelete,onClose}) {
    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{titre}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Nom du jeu :
                        </DialogContentText>
                        <TextField
                            autoFocus
                            id="titre_jeu"
                            label="nom du jeu"
                            type="string"
                        />
                        <DialogContentText>
                            Nombre minimum pour jouer
                        </DialogContentText>

                        <TextField
                            autoFocus
                            id="min_joueur"
                            label="0"
                            type="int"
                        />

                    </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Non
                    </Button>
                    <Button onClick={onDelete}  color="primary" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
