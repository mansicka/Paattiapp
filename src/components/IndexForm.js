import React, { useState, useEffect } from 'react';
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import img from '../img/i.jpg'
import CircularProgress from '@material-ui/core/CircularProgress';

const url = 'http://localhost:8080/'


function IndexForm() {

    const [viesti, setViesti] = useState([]);

    const tarkistaKanta = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setViesti(json);
        }
        catch (error) {
            setViesti({ message: 'ei toimi. Ei yhteyttä backendiin.' })
        }
    }

    useEffect(() => {
        setViesti({ message: <CircularProgress size={15} /> })
        tarkistaKanta();
    }, [])

    return (
        <Paper>
            <Grid container spacing={5}>
                <Grid item>
                    <img src={img} width='300px' alt='' />
                </Grid>
                <Grid item>
                    <Typography variant='subtitle2'>Veneen kulunhallintasovellus v 0.1 // 05.12.2020</Typography><br />
                    <Typography variant='subtitle2'>Backend: {viesti.message} </Typography> <br />
                    <Typography variant='subtitle2' color='textSecondary'>Tulevia ominaisuuksia: <br />
                    -Hankintojen merkkaaminen maksetuiksi per käyttäjä<br />
                    -Käyttäjienhallinta ja mahdollinen login/logout -toiminto <br />
                    -Yleistä siivousta
                    </Typography>
                </Grid>
            </Grid>

        </Paper>
    );


}

export default IndexForm;
