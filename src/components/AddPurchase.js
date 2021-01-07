
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Paper, TextField, Typography, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'


const url = 'http://localhost:8080';


const useStyles = makeStyles({
    tiedosto: {
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
    },
    div: {
        textAlign: 'center',
        marginTop: '10px',
    },
    button: {
        marginRight: 20
    },
    formControl: {

    }
})

//
function AddHankinta() {
    const classes = useStyles();


    const [purchase, setValues] = useState({ kuvaus: '', hinta: '', hankkija: '', kuva: '' });
    const [viesti, setViesti] = useState('');
    const [osuus, setOsuus] = useState('');
    const [users, setUsers] = useState([]);


    const muuta = (e) => {
        setValues({
            ...purchase,
            [e.target.name]: e.target.value

        });
        setOsuus('Oma osuus: ' + (purchase.hinta / users.length).toFixed(2))
    }

    //<Hae käyttäjät kannasta
    const GetUsers = async () => {
        try {
            const response = await fetch(url + '/getusernames');
            const json = await response.json();
            setUsers(json);
            setViesti('');
        } catch (error) {
            setUsers([]);
            setViesti('Tietojen haku meni pieleen (usernames)');
        }
    }

    useEffect(() => {
        GetUsers();
    }, [])
    ///hae käyttäjät kannasta />

    //<Lisää osto
    const addPurchase = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('kuvaus', purchase.kuvaus);
        formData.append('hinta', purchase.hinta);
        formData.append('hankkija', purchase.hankkija);
        formData.append('kuva', purchase.kuva);
        axios.post(url + '/purchases/add', formData)
            .then(response => {
                if (response.status === 200) {
                    setValues({ kuvaus: '', hinta: '', hankkija: '', kuva: '' });
                    setViesti('Lisättiin hankinta ' + purchase.kuvaus);
                } else {
                    setViesti('Lisäys ei onnistunut');
                }
            })
    }
    //lisää osto /> 

    return (


        <Paper style={{ margin: 10, padding: 10 }}>
            <form>

                <Typography variant='h5'>Lisää uusi hankinta</Typography>

                <br />

                <br />
                <Typography variant='body1'>Hankinnan kuvaus:</Typography>
                <TextField fullWidth label='Kuvaus' name='kuvaus' id='kuvaus'
                    value={purchase.nimi} margin="normal" variant="outlined" onChange={(e) => muuta(e)} required />
                <br />   <br />
                <Typography variant='body1'>Hankinnan hinta: </Typography>
                <Typography variant='body2'><i>Hinta pitää olla formaatissa NN.nn (esim. 14.00)</i></Typography>
                <TextField type='number' fullWidth label='Hinta' name='hinta' id='hinta'
                    value={purchase.hinta} margin="normal" variant="outlined" onChange={(e) => muuta(e)} required />
                <Typography variant='body2'>{osuus}</Typography>
                <br /><br />
                <Typography variant='body1'>Kuka hankki:</Typography>

                <FormControl fullWidth>
                    <InputLabel >Valitse hankkija</InputLabel>
                    <Select onChange={muuta} name='hankkija' id='hankkija' value={users.name} minWidth='400'>
                        {users.map((users) => (
                            <MenuItem key={users.id} value={users.name}>{users.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>


                <br /><br />

                <Button onClick={(e) => addPurchase(e)} variant='contained' color='primary'
                    className={classes.button} startIcon={<CreateIcon />}>Lisää</Button>
                <Button variant='contained' color='secondary' component={Link} to='/'
                    startIcon={<HomeIcon />}>Etusivulle</Button>

            </form>
            <Typography>{viesti}</Typography>
        </Paper >



    );

}

export default AddHankinta;
