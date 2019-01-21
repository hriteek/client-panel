import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect /*, isLoaded, isEmpty*/ } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;

    if (newClient.balance === "") newClient.balance = 0;

    const { firestore } = this.props;
    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => this.props.history.push("/")); //this line will redirect
  };

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName" //for the state handling
                  className="form-control"
                  id="firstName" //to pair with the label
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName" //for the state handling
                  className="form-control"
                  id="lastName" //to pair with the label
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email" //for the state handling
                  className="form-control"
                  required
                  id="email" //to pair with the label
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone" //for the state handling
                  className="form-control"
                  id="phone" //to pair with the label
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  name="balance" //for the state handling
                  className="form-control"
                  id="balance" //to pair with the label
                  onChange={this.onChange}
                  value={balance}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
