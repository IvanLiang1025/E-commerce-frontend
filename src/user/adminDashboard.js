

import React from "react";
import Layout from "../common/layout";
import {isAuthenticated} from "../auth/index";
import {Link} from "react-router-dom";

const UserDashboard = () => {
    const {user: { name, email, role}} = isAuthenticated();
    return (
        <Layout title="Admin Dashboard" description={`hello, ${name}`} className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-5">
                        <h3 className="card-header"> User Links</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="nav-link" to="/profile/update">Update profile</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/category/create">Create category</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/Product/create">Create product</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card mb-5">
                        <h3 className="card-header"> Admin information</h3>
                        <ul className="list-group">
                            <li className="list-group-item">{name}</li>
                            <li className="list-group-item">{email}</li>
                            <li className="list-group-item">{role === 1 ? "Admin" : "Registered user"}</li>
                        </ul>
                    </div>
                </div>

            </div>
            
        </Layout>
    )
}

export default UserDashboard;