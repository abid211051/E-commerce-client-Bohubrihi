import { Link, withRouter } from 'react-router-dom';
import { singout, isAuthenticated, userInfo } from '../utils/auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: 'grey' }
    }
}

const Menu = ({ history }) => {
    return (
        <nav className='navbar navbar-dark bg-dark'>
            <ul className="nav nav-tabs" >
                <li className="nav-item">
                    <a className="nav-link" style={isActive(history, '/')} href={"/"}>Home</a>
                </li>
                {!isAuthenticated() && (<>
                    <li className="nav-item">
                        <a className="nav-link" style={isActive(history, '/login')} href={"/login"}>Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={isActive(history, '/register')} href={"/register"}>Register</a>
                    </li>
                </>)}

                {isAuthenticated() && (<>
                    <li className="nav-item">
                        <a className="nav-link" style={isActive(history, `/${userInfo().role}/dashboard`)} href={`/${userInfo().role}/dashboard`}>Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={isActive(history, `/cart`)} href={`/cart`}>Cart</a>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {
                            singout(() => {
                                window.location.replace('/login')
                            });
                        }}> Log Out</span>
                    </li>
                </>)}
            </ul>
        </nav>
    )
}

export default withRouter(Menu);