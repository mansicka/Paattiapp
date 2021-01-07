import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const url = 'http://localhost:8080'

function Purchaselist() {
    const [viesti, setViesti] = useState(<CircularProgress />);
    const [users, setUsers] = useState([]);
    const [purchases, setPurchases] = useState([]);

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

    const GetPurchases = async () => {
        try {
            const response = await fetch(url + '/purchases/all');
            const json = await response.json();
            setPurchases(json);
            setViesti('');
        } catch (error) {
            setPurchases([]);
            setViesti('Tietojen haku meni pieleen (usernames)');
        }
    }

    useEffect(() => {
        GetUsers();
        GetPurchases();

    }, [])

    const sumPurchases = (purchases.reduce((acc, purchase) => acc + parseFloat(purchase.hinta), 0)).toFixed(2);
    const perHlo = (sumPurchases / users.length).toFixed(2)


    if (purchases.length === 0) {
        return (<p align='center'><CircularProgress /></p>);
    }
    return (
        <div>
            {viesti}
            <Typography variant='h5' align='center'>Hankinnat</Typography>
            <TableContainer component={Paper}>


                <br />
                <Table size="small" aria-label="a dense table"></Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'><Typography variant='subtitle2'><b>Kaikki hankinnat yhteensä</b></Typography></TableCell>
                        <TableCell align='right'><Typography variant='subtitle2'><b>Kokonaiskunstannus per hlö</b></Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableCell align='left'>{sumPurchases}€</TableCell>
                    <TableCell align='right'>{perHlo}€</TableCell>
                </TableBody>
                <br />

                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant='subtitle2'><b>Kuvaus</b></Typography></TableCell>
                            <TableCell align="right"><Typography variant='subtitle2'><b>Hankkija</b></Typography></TableCell>
                            <TableCell align="right"><Typography variant='subtitle2'><b>Hinta (€)</b></Typography></TableCell>
                            <TableCell align="right"><Typography variant='subtitle2'><b>VUOSI-KK-PV</b></Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchases.map(purchase => (

                            <TableRow key={purchase.kuvaus}>
                                <TableCell component='th' scope='purchase'>
                                    {purchase.kuvaus}
                                </TableCell>
                                <TableCell align="right">{purchase.hankkija}</TableCell>
                                <TableCell align="right">{purchase.hinta}€</TableCell>
                                <TableCell align="right">{purchase.date}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    )
}
export default Purchaselist;