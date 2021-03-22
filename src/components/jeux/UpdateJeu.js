import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AlertDialogDelete from "../modals/alert_dialog_delete";
import ModalJeu from "./modal_jeu";

const DeleteJeu = ({row}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {

        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>

            <ModalJeu titre="Supprimer jeu" message={"Etes vous sur de vouloir supprimer : "+row.id} onClose={handleClose} onDelete={handleDelete} open={open}/>
        </div>

    )


}
export default DeleteJeu
