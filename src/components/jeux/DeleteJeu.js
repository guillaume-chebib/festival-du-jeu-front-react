import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialogDelete from "../modals/alert_dialog_delete";

const DeleteJeu = ({row}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {

        const response = await fetch(`/jeu/${row.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const body = await response.json()
        if (response.status !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)

        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>

            <AlertDialogDelete titre="Supprimer jeu" message={"Etes vous sur de vouloir supprimer : "+row.id} onClose={handleClose} onDelete={handleDelete} open={open}/>
        </div>

    )


}
export default DeleteJeu
