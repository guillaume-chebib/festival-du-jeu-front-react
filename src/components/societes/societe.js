import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Exposant from "./exposant";
import Editeur from "./editeur";
import EditeurExposant from "./editeur_exposant";
import CreateSociete from "./createSociete";
import {IsAdmin} from "../../utils/utils_functions";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Societe() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [trig,setTrig] = useState([])

    const handleChange = (event, newValue) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <IsAdmin/>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Exposants Seulement" {...a11yProps(0)} />
                    <Tab label="Editeurs Seulement" {...a11yProps(1)} />
                    <Tab label="Editeurs Exposants" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CreateSociete setTrig={setTrig}/>
                <Exposant setTrig={setTrig} trig={trig}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CreateSociete setTrig={setTrig}/>
                <Editeur setTrig={setTrig} trig={trig}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CreateSociete setTrig={setTrig}/>
                <EditeurExposant setTrig={setTrig} trig={trig}/>
            </TabPanel>
        </div>
    );
}
