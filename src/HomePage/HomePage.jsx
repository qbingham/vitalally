import React from 'react';
import Sidebar from 'react-sidebar';
import {
	Link
} from 'react-router-dom';
import {
	connect
} from 'react-redux';

import {
	userActions
} from '../_actions';

// import '../_styles/sidebar.css';

const mql = window.matchMedia(`(min-width: 800px)`);

const sidebarStyles = {
    sidebar: {
        width: 150,
        background: 'white'
        
    }
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: true
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
     
    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }
     
      componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    
    render() {
        const { user, users } = this.props;
        return (
            <div>
                <div>
                    <Sidebar
                        sidebar={
                        <div>
                            <ul className='list-group container'>
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Notifications</a></li>
                                <li><a href="#">Messages</a></li>
                                <li><a href="#">Care Groups</a></li>
                                <li><a href="#">Settings</a></li>
                            </ul>
                        </div>
                        }
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={sidebarStyles}
                    >
                    </Sidebar>
                </div>
                <div className="col-md-8 col-md-offset-1">
                    <button className="btn btn-primary" onClick={() => this.onSetSidebarOpen(true)}>
                        Open sidebar
                    </button>
                    <h1>Hi {user.email}!</h1>
                    <p>You're logged in with React!!</p>
                    <h3>All registered users:</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                        <ul>
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.email + ' ' + user.phone}
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }
                                </li>
                            )}
                        </ul>
                    }
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };