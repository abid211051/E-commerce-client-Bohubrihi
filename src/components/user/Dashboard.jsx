import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import PurchaseHistory from './PurchaseHistory';

const Dashboard = () => {
    const { name, email, role, token } = userInfo();
    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <a className="nav-link" href="/cart">My Cart</a>
                    </li>
                    <li className="list-group-item">
                        <a className="nav-link" href="#">Update Profile</a>
                    </li>
                </ul>
            </div>
        )
    };

    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role}</li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    <UserInfo />
                    <PurchaseHistory token={token} />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;