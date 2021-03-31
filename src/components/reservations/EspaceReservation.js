import React, {useEffect, useState} from "react";
import {Checkbox, MenuItem, Select} from "@material-ui/core";
import {renameKey, requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import {DataGrid} from "@material-ui/data-grid";
import useStylesTableValueColor from "../table/styles";
import UpdateDeleteJeu from "../jeux/UpdateDeleteJeu";


const EspaceReservation = ({setTrig,reservation}) => {
    const classes = useStylesTableValueColor();

    const authHeader = useAuthHeader()
    const [espaces,setEspaces] = useState()

    const handleChangeStatus = async (event) => {

    };

    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'nom_espace', headerName: 'Zone', flex: 1},
        { field : 'nombre_table', headerName: 'Nombre de table', flex: 1},
        { field : 'nombre_m2', headerName: 'Nombre de m²', flex: 1},
        { field : 'prix_calcule', headerName: 'Prix calculé', flex: 1},
        { field : 'remise', headerName: 'Remise', flex: 1},
        { field : 'prix_totalt', headerName: 'Pri total', flex: 1},

    ]

    useEffect(() => {

        async function fetchData() {

            const [responseEspaceFestival] = await Promise.all([
                await requestToBack('GET',null,`/festival/`+reservation.id_festival+'/espace',authHeader())
            ]);

            const bodyReservation = await responseEspaceFestival[0]
            const list_espace = bodyReservation.message

            console.log(list_espace)

            if (responseEspaceFestival[1] !== 200) {
                console.log(responseEspaceFestival[1])
            }
            else {
                list_espace.rows.forEach(obj => renameKey(obj, 'id_espace', 'id'));
                console.log(list_espace)
                setEspaces(list_espace.rows)

            }




        }

        fetchData();

    },[]);

    return (
        <div>
            {espaces &&
            <div style={{paddingTop: '2em'}}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              className={classes.root}
                              rows={espaces}
                              {...espaces} columns={columns} pageSize={5} />
                </div>
            </div>
            }
        </div>

    )


}
export default EspaceReservation
