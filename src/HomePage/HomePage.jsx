import React from 'react';
import Sidebar from 'react-sidebar';
import Rectangle from 'react-rectangle';
import {
	Link
} from 'react-router-dom';
import {
	connect
} from 'react-redux';

import {
	userActions
} from '../_actions';


const mql = window.matchMedia(`(min-width: 800px)`);

const sidebarStyles = {
    sidebar: {
        position: "fixed",
        width: 200,
        background: 'white'
    },

    content: {
        position: "fixed",
        top: 0,
        left: 10000,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        transition: "left .3s ease-out, right .3s ease-out"
    },
    
    overlay: {
        backgroundColor: "rgba(0,0,0,0)"
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
                                <p><a href="#"> Profile</a></p>
                                <p><a href="#"> Notifications</a></p>
                                <p><a href="#"> Messages</a></p>
                                <p><a href="#"> Care Groups</a></p>
                                <p><a href="#"> Settings</a></p>
                            </ul>
                        </div>
                        }
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={sidebarStyles}
                    >
                    </Sidebar>
                </div>
                <div class="row">
                    <div className="col-md-4 col-md-offset-2">
                        <p>Logged in as: {user.email}</p>
                    </div>
                    <div className="col-md-1 col-md-offset-2">
                        <p onClick={() => this.onSetSidebarOpen(true)}>
                            <a href="#">Sidebar</a>
                        </p>
                    </div>
                    <div className="col-md-1 col-md-offset-1">
                        <p>
                            <Link to="/login">Logout</Link>
                        </p>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div className="col-md-4 col-md-offset-2">
                        <ul className="nav-justified navbar-default">
                            <li className="navbar-brand">GROUPS</li>
                            <li><button className="btn btn-secondary">+ ADD GROUP </button></li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        <Rectangle aspectRatio={[5, 3]}>
                            <div style={{ background: '#F8F8F8', width: '100%', height: '80%' }} />
                        </Rectangle>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        <Rectangle aspectRatio={[5, 3]}>
                            <div style={{ background: '#F8F8F8', width: '100%', height: '80%' }} />
                        </Rectangle>
                    </div>
                </div>

                
                

                    


                    
                    {/* <h3>All registered users:</h3>
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
                    } */}
                
                
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