import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // create ref
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { firestore, client, history } = this.props;

    const UpdateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    firestore
      .update({ collection: "clients", doc: client.id }, UpdateClient)
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;
    if (!isLoaded(client)) {
      return <Spinner />;
    }
    if (isEmpty(client)) {
      return <div>List Is Empty</div>;
    }
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
                  ref={this.firstNameInput}
                  defaultValue={client.firstName}
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
                  ref={this.lastNameInput}
                  defaultValue={client.lastName}
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
                  ref={this.emailInput}
                  defaultValue={client.email}
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
                  ref={this.phoneInput}
                  defaultValue={client.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  name="balance" //for the state handling
                  className="form-control"
                  id="balance" //to pair with the label
                  ref={this.balanceInput}
                  defaultValue={client.balance}
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

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id } //here we are getting the clients from the firestore collection as "client" and the client id form the uri using  doc: props.match.params.id
  ]),
  connect(state => ({
    client: state.firestore.ordered.client && state.firestore.ordered.client[0] //here we are gettiing the cleint details from the firestore (client is form above fireconnect) and the first the first element of the array
  }))
)(EditClient);
