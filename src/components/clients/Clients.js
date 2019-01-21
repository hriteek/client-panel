import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  render() {
    const { clients } = this.props;

    if (!isLoaded(clients)) {
      return <Spinner />;
    }
    if (isEmpty(clients)) {
      return <div>List Is Empty</div>;
    }

    return (
      <div>
        <div className="row">
          <div className="col col-md-6">
            <h2>
              <i className="fa fa-users" /> Clients
            </h2>
          </div>
          <div className="col col-md-6" />
        </div>
        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{`${client.firstName} ${client.lastName}`}</td>
                <td>{client.email}</td>
                <td>${parseFloat(client.balance).toFixed(2)}</td>
                <td>
                  <Link
                    to={`/client/${client.id}`}
                    className="btn btn-secondary btm-sm"
                  >
                    <i className="fa fa-arrow-circle-right" /> Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect(state => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
