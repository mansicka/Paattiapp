import React from 'react';
import Header from './Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Purchaselist from './components/PurchaseList';
import Adduser from './components/Adduser';
import ViewUsers from './components/Users';
import AddHankinta from './components/AddPurchase';
import IndexForm from './components/IndexForm';
// import UserDetails from './components/Userdetails';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#01579b',
        },
        secondary: {
            main: '#ff8f00',
        },
        info: {
            main: '#e64a19',
        },
        background: {
            default: '#e0e0e0',
        },

    },


});


function Paatti() {

    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <br /><br />
                <div>
                    <Header />
                    <br />
                    <Switch>
                        <Route exact path='/' component={IndexForm} />
                        <Route path='/users' component={ViewUsers} />
                        <Route path='/adduser' component={Adduser} />
                        <Route path='/addpurchase' component={AddHankinta} />
                        <Route path='/purchases' component={Purchaselist} />
                    </Switch>

                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    )


}
export default Paatti;