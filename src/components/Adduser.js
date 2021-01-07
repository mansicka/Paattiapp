import React, { useState } from 'react'
import axios from 'axios'
import { Button, Paper, TextField, Typography, Input, InputLabel } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create'
import HomeIcon from '@material-ui/icons/Home'
import AttachmentIcon from '@material-ui/icons/Attachment'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const url = 'http://localhost:8080'


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

    }

}
)

//
function Adduser() {
    const classes = useStyles();


    const [user, setValues] = useState({ name: '', email: '', puh: '', kuva: [] });
    const [viesti, setViesti] = useState('');
    // const [image, setImage] = useState('');

    const muuta = (e) => {
        setValues({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const setImg = (e) => {

        setValues({
            ...user,
            kuva: e.target.files[0]
        });
    }

    const addUser = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('puh', user.puh);
        formData.append('kuva', user.kuva);

        axios.post(url + '/users/add', formData)
            .then(response => {
                if (response.status === 200) {
                    setValues({ name: '', email: '', puh: '', kuva: [] });
                    setViesti('Lisättiin käyttäjä ' + user.name);
                } else {
                    setViesti('Lisäys ei onnistunut');
                }
            })
    }

    let imgName = '';
    if (user.kuva !== null) {
        imgName = user.kuva.name;
    }

    return (
        <Paper style={{ margin: 10, padding: 10 }}>
            <Typography variant='h5'>Lisää uusi käyttäjä</Typography>

            <form>
                <TextField fullWidth={true} label='Nimi' name='name' id='name'
                    value={user.nimi} onChange={muuta} required />

                <TextField fullWidth={true} label='Email' name='email' id='email'
                    value={user.email} onChange={muuta} required />

                <TextField fullWidth={true} label='Puhelinnumero' name='puh' id='puh'
                    value={user.puh} onChange={muuta} required />
                <br />
                <Input accept='image/*' name='kuva' id='kuva' type='file'
                    onChange={setImg} style={{ display: 'none' }} />

                <InputLabel htmlFor='kuva'>

                    <Button component='span' color='primary' style={{ marginLeft: 20, marginRight: 20 }}>
                        <AttachmentIcon />Lisää kuva
                    </Button>
                    {imgName}

                </InputLabel>


                <div className={classes.div}>
                    <Button onClick={(e) => addUser(e)} variant='contained' color='primary'
                        className={classes.button} startIcon={<CreateIcon />}>Lisää</Button>
                    <Button variant='contained' color='secondary' component={Link} to='/'
                        startIcon={<HomeIcon />}>Etusivulle</Button>
                </div>
            </form>
            <Typography>{viesti}</Typography>
        </Paper>

    );
}

export default Adduser;
