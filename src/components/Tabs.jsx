import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        marginTop: 40,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabContainer: {
        padding: 8 * 3,
        border: '1px solid #ccc',
    },
    link: {
        color: 'white',
    },
});

function TabContainer({children, classes}) {
    return (
        <Typography component="div" className={classes.tabContainer}>
            {children}
        </Typography>
    );
}

function LinkTab({label, href, active}) {
    return (
        <Link
            className={active}
            to={href}
            style={{
                color: 'white',
                textDecoration: 'white',
            }}
        >
            <Tab label={label} />
        </Link>
    );
}

class NavTabs extends Component {
    state = {
        isLoading: true,
        isError: false,
        data: [],
        value: 0,
    };

    componentDidMount() {
        setTimeout(() => {
            this.fetchList('http://localhost:8080/tabs.json');
        }, 500);
    }

    fetchList = url => {
        this.setState({isLoading: true});
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({data}))
            .catch(() => this.setState({isError: true}));
        this.setState({isLoading: false});
    };

    handleChange = (event, newValue) => {
        event.preventDefault();
        this.setState({value: newValue});
    };

    render() {
        const {classes, children} = this.props;
        const {value, data = [], isLoading, isError} = this.state;

        // eslint-disable-next-line no-use-before-define
        const tabs = data.sort(changeSort);
        let url = '';

        function changeSort(a, b) {
            return a.order - b.order;
        }

        if (isLoading) {
            return (
                <Grid item xs={12}>
                    <Paper style={{padding: '15px 25px', margin: '25px 0'}}>
                        <Typography vatiant="h5">Loading...</Typography>
                    </Paper>
                </Grid>
            );
        }

        if (isError) {
            return (
                <Grid item xs={12} spacing={3}>
                    <Paper style={{padding: '15px 25px', margin: '25px 0'}}>
                        <Typography variant="body1" style={{color: 'red'}}>
                            Oops! We have Error!
                        </Typography>
                    </Paper>
                </Grid>
            );
        }

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={this.handleChange}
                    >
                        {tabs.map(({title, order, path}) => {
                            url = path.slice(4, -3);

                            return (
                                <LinkTab key={order} label={title} href={url} />
                            );
                        })}
                    </Tabs>
                </AppBar>
                {data.map(({order}) =>
                    value === order ? (
                        <TabContainer key={order} classes={classes}>
                            {children}
                        </TabContainer>
                    ) : (
                        ''
                    ),
                )}
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NavTabs));
