import React from 'react';
import Routes from "./components/routes";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {AuthProvider, useAuthUser, useIsAuthenticated, useSignOut} from 'react-auth-kit'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {MainListItems,publicListItems,useStyles1,OrgaListItems} from "./components/styles/navbarStyle";
import Container from "@material-ui/core/Container";
import StickyFooter from "./components/styles/footer";
import {themeResponsive} from "./components/table/styles";
import {ThemeProvider} from "@material-ui/core/styles";

const App = () => {

    return (
        <div className="App">
            <AuthProvider authStorageType={'cookie'}
                          authStorageName={'_auth_t'}
                          authTimeStorageName={'_auth_time'}
                          stateStorageName={'_auth_state'}
                          cookieDomain={window.location.hostname}
                          cookieSecure={window.location.protocol === "https:"}
                          refreshTokenName={'_refresh_t'}>
                <AppNav/>
            </AuthProvider>
        </div>
    );

}

const AppNav = () => {

    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()
    const auth = useAuthUser()


    const classes = useStyles1();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <img src="/images/logo_seul_festival.png" alt="logo" className={classes.logo} />

                        <ThemeProvider theme={themeResponsive}>
                            <Typography variant="caption" color="inherit" noWrap className={classes.title}>
                                Festival du jeu
                            </Typography>
                        </ThemeProvider>


                        <IconButton name="home" color="inherit" component={Link} to="/">
                            <HomeIcon fontSize={"large"}/>
                        </IconButton>

                        {isAuthenticated() &&
                        <IconButton name="dashboard" color="inherit" component={Link} to="/dashboard">
                            <AccountCircleIcon fontSize={"large"}/>
                        </IconButton>

                        }


                        {isAuthenticated() ? (
                            <IconButton name="home" color="inherit" component={Link} to="/" onClick={signOut}>
                                <ExitToAppIcon fontSize={"large"}/>
                            </IconButton>
                        ) : (
                            <IconButton name="home" color="inherit" component={Link} to="/login">
                                <LockIcon fontSize={"large"}/>
                            </IconButton>
                        )}

                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    {isAuthenticated() &&
                    <Divider/>
                    }
                    {isAuthenticated() && (
                        auth().superuser==="true" ?
                        <MainListItems/>:
                        <OrgaListItems/>)
                    }
                    <Divider/>
                    <List>{publicListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Routes/>
                    </Container>
                    <StickyFooter/>
                </main>

            </div>
        </Router>
    )
}
export default App;
