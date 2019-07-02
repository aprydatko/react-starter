import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import App from './components/App';
import history from './utils/history';
import 'typeface-roboto';
import './index.css';

import Chart from './components/Chart';
import List from './components/List';
import Table from './components/Table';

render(
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/(dummyList)?" component={List} />
                <Route path="/dummyTable" component={Table} />
                <Route path="/dummyChart" component={Chart} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root'),
);
