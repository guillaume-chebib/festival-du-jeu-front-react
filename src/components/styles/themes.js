import {createMuiTheme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/';


export const useStylesThemeFestival = makeStyles(theme => ({

    secondaryDark: {
        backgroundColor: themeFestival.palette.secondary.dark
    },
    secondaryMain: {
        backgroundColor: themeFestival.palette.secondary.main
    },
    secondaryLight: {
        backgroundColor: themeFestival.palette.secondary.light
    },
    primaryDark: {
        backgroundColor: themeFestival.palette.primary.dark
    },
    primaryMain: {
        backgroundColor: themeFestival.palette.primary.main
    },
    primaryLight: {
        backgroundColor: themeFestival.palette.primary.light
    }

}));

export const themeFestival = createMuiTheme({
    palette: {
        primary: {
            light: '#91d400',
            main: '#739600',
            dark: '#739600',
            contrastText: '#fff',
        },
        secondary: {
            light: '#9dabe2',
            main: '#4c5cc5',
            dark: '#002663',
            contrastText: '#fff',
        },
    },
});


