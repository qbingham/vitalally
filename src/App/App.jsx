import React from 'react';
import {
	Router,
	Route
} from 'react-router-dom';
import {
	connect
} from 'react-redux';

import {
	history
} from '../_helpers';
import {
	alertActions
} from '../_actions';
import {
	PrivateRoute
} from '../_components';
import {
	HomePage
} from '../HomePage';
import {
	LoginPage
} from '../LoginPage';
import {
	RegisterPage
} from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <div>                      
                            <div className="col-md-6 col-md-offset-3">
                                <br/>
                                <br/>
                                {alert.message &&
                                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                                }
                            </div>
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
                <ul class="text-center list-group">
                    <li>
                        <a href="http://vitalally.com/" target="_top">VitalAlly, Inc.</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/myvitally.com/" target="_top">Check out VitalAlly on LinkedIn!</a>
                    </li>
                </ul>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 