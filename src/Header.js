import {
    AppBar,
    Container,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React from 'react';
import HideOnScroll from "./components/HideOnScroll";
import SideDrawer from "./components/SideDrawer";
import { Link } from 'react-router-dom'


const useStyles = makeStyles({

    navbarDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    navListDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    linkText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'white'
    },

});


const navLinks = [
    { title: 'Käyttäjät', path: '/users' },
    { title: 'Lisää käyttäjä', path: '/adduser' },
    { title: 'Kaikki hankinnat', path: '/purchases' },
    { title: 'Lisää hankinta', path: '/addpurchase' }
];

const Header = () => {
    const classes = useStyles();

    return (
        <>
            <HideOnScroll>
                <AppBar position="fixed">
                    <Typography align='center' variant='h4'>BÅT APP</Typography>
                    <Toolbar component="nav">
                        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                            <IconButton edge="start" aria-label="home">

                                <a href="/" style={{ color: `white` }}>
                                    <Home fontSize="large" />
                                </a>
                            </IconButton>

                            <Hidden smDown>
                                <List
                                    component="nav"
                                    aria-labelledby="main navigation"
                                    className={classes.navListDisplayFlex}
                                >
                                    {navLinks.map(({ title, icon, path }) => (
                                        <a href={path} key={title} className={classes.linkText}>
                                            <ListItem button component={Link} to={path} icon={icon} >
                                                <ListItemText primary={title} />
                                            </ListItem>
                                        </a>
                                    ))}
                                </List>
                            </Hidden>
                            <Hidden mdUp>
                                <SideDrawer navLinks={navLinks} />
                            </Hidden>
                        </Container>
                    </Toolbar>
                </AppBar>
            </HideOnScroll >
            <Toolbar id="back-to-top-anchor" />

        </>
    );
};

export default Header;
