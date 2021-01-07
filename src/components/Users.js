import React, { useState, useEffect } from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const url = 'http://localhost:8080'
const useStyles = makeStyles({
    table: {
        maxWidth: 200,

    },
    split: {
        display: 'flex',
        flexDirection: 'row'
    },
    left: {
        width: '50%',
    },
    right: {
        width: '50%',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '200px',

    },
});


function ViewUsers() {
    const [viesti, setViesti] = useState('');
    const [users, setUsers] = useState([]);
    const [singleuser, setSingleUser] = useState([]);
    const [userPurchases, setUserPurchases] = useState([]);

    const sumPurchases = (userPurchases.reduce((acc, purchase) => acc + parseFloat(purchase.hinta), 0)).toFixed(2);
    const perHlo = (sumPurchases / users.length).toFixed(2)

    const userFetch = async (e) => {
        getSingleUser(e)
        getUserPurchases(e)
    }
    const getSingleUser = async (e) => {
        try {
            const response = await fetch(url + '/users/' + e);
            const json = await response.json();
            setSingleUser(json);
            setUserPurchases([]);
            console.log(singleuser)
        }
        catch (error) {
            setSingleUser([]);
            setViesti('Käyttäjän tietojen haku ei onnistunut')
        }
    }
    const getUserPurchases = async (e) => {
        try {
            const response = await fetch(url + '/purchases/user/' + e);
            const json = await response.json();
            setUserPurchases(json);
            console.log(userPurchases)
        }
        catch (error) {
            setUserPurchases([]);
            setViesti('Käyttäjän tietojen haku ei onnistunut')
        }
    }

    const GetUsers = async () => {
        try {
            const response = await fetch(url + '/users/all');
            const json = await response.json();
            setUsers(json);
            setViesti('');
            setUserPurchases([]);
        } catch (error) {
            setUsers([]);
            setViesti('Tietojen haku meni pieleen (usernames)');
            setUserPurchases([]);
        }
    }



    useEffect(() => {
        GetUsers();
    }, [])
    const classes = useStyles();

    return (
        <Paper>
            <Typography variant='h5' align='center'>Käyttäjät</Typography>
            <div className={classes.split}>
                <div className={classes.left}>
                    {users.map((user) => (
                        <p key={user.id}>
                            <Button startIcon={<Avatar alt={user.name} src={url + '/dl/' + user.kuva}
                                onClick={(e) => userFetch(user.name, e)} />}><b>{user.name}</b></Button>
                        </p>
                    ))}

                </div>
                <div className={classes.right}>

                    < Grid container spacing={2}>
                        <Grid item>
                            <img className={classes.img} src={url + '/dl/' + singleuser.kuva} alt={singleuser.name} />
                        </Grid>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {singleuser.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Puhelin: {singleuser.puh}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Sähköposti: {singleuser.email}
                                </Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                    <br></br>
                    {/* {(userPurchases.length === 0) ?
                    < Typography variant="body2" color="textSecondary">Käyttäjällä ei ole hankintoja</Typography>
                    : */}

                    <Typography variant='body2' gutterBottom>Käyttäjä on hankkinut <b>{sumPurchases}€ </b>arvosta yhteisiä hankintoja, joista käyttäjän osuus on <b>{perHlo}€</b>.</Typography>

                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant='subtitle2'><b>Kuvaus</b></Typography></TableCell>
                                <TableCell align="left"><Typography variant='subtitle2'><b>Hinta (€)</b></Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userPurchases.map(purchase => (
                                <TableRow key={purchase.id}>
                                    <TableCell component='th' scope='purchase'>
                                        {purchase.kuvaus}
                                    </TableCell>
                                    <TableCell align="left">{purchase.hinta}€</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* } */}



                </div>
                {viesti}
            </div ></Paper>




    )

}

export default ViewUsers;