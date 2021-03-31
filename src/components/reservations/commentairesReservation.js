import React, {useState} from "react";
import {Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


export const CommentaireReservation = ({row, setTrig}) => {
    const authHeader = useAuthHeader()
    const [isEdit,setIsEdit] = useState(false)
    const [newComment,setNewComment] = useState(row.commentaire_reservation)

    const handleChange = async (row) => {
        console.log(row)
        const response = await requestToBack('PUT',row,`/reservation/${row.id_reservation}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)

    };

    const handleChangeIsEdit = () => {
        setIsEdit(true)
    }

    const handleChangeComment = () => {
        row.commentaire_reservation = newComment
        handleChange(row)
        setIsEdit(false)
    }

    const handleCloseComment = () => {
        setNewComment(row.commentaire_reservation)
        setIsEdit(false)
    }

    let icon, close;
    if(isEdit){
        icon = <DoneIcon onClick={handleChangeComment}/>
        close = <CloseIcon onClick={handleCloseComment}/>
    } else {
        icon = <EditIcon onClick={handleChangeIsEdit}/>
    }

    return (
        <div>
            <TextField
                id={"commentaire"}
                value={newComment}
                fullWidth
                disabled={!isEdit}
                onChange={e => {
                    setNewComment(e.target.value)
                }}
            />
            {icon}{close}
        </div>
    )



}
