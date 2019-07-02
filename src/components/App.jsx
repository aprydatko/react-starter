import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from './Header';
import Tabs from './Tabs';

const styles = () => ({
    root: {
        flexGrow: 1,
        margin: '5% auto 0 auto',
        width: 700,
    },
});

const Wrapper = ({children, classes}) => (
    <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
            {children}
        </Grid>
    </div>
);

const Item = ({children}) => (
    <Grid item xs={12}>
        {children}
    </Grid>
);

const App = ({children, classes}) => (
    <Wrapper classes={classes}>
        <Item>
            <Header />
        </Item>
        <Item>
            <Tabs>{children}</Tabs>
        </Item>
    </Wrapper>
);

export default withStyles(styles)(App);
