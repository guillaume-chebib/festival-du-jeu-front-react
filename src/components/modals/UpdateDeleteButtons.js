import React, {useState} from "react";
import {ThemeProvider} from "@material-ui/core/styles";
import {themeFestival} from "../styles/themes";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateOrganisateurModal from "../Organisateur/updateOrganisateurModal";
import AlertDialogDelete from "./AlertDialogDelete";

export const UpdateDeleteButtons = ({onClickOpenEdit,onClickOpenDelete}) => {

    return (
        <div>
            <ThemeProvider theme={themeFestival}>
                <Fab size="small" color="primary" aria-label="edit" onClick={onClickOpenEdit}>
                    <EditIcon/>
                </Fab>
                <Fab size="small" color="secondary" aria-label="delete" onClick={onClickOpenDelete}>
                    <DeleteIcon />
                </Fab>
            </ThemeProvider>
        </div>

    )


}
