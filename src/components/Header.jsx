import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
});

const header = ({classes}) => (
    <Paper className={classes.paper}>
        <Typography variant="h4">Tabs</Typography>
    </Paper>
);

export default withStyles(styles)(header);
