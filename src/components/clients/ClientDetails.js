import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames"; //this package helps to conditionally assign the class based of the condition

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onDeleteClick = () => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };

  // update balance
  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="balanceUpdateAmount"
              id=""
              placeholder="Add New Balance..."
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    }

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
              <i className="fa fa-arrow-circle-left" />
              Back to dashboard
            </Link>
          </div>
          <div className="col col-md-6">
            <div className="btn-group float-right">
              <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                Edit
              </Link>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="card">
          <h3 className="card-header">
            {client.firstName} {client.lastName}
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col col-md-8 col-sm-6">
                <h4>
                  Client Id :{" "}
                  <span className="text-secondary"> {client.id}</span>
                </h4>
              </div>
              <div className="col col-md-4 col-sm-6">
                <h3 className="pull-right">
                  Balance :{" "}
                  <span
                    className={classnames({
                      "text-danger": client.balance > 0,
                      "text-success": client.balance === 0
                    })}
                  >
                    ${parseFloat(client.balance).toFixed(2)}
                  </span>{" "}
                  <small>
                    <a
                      href="#!"
                      onClick={() =>
                        this.setState({
                          showBalanceUpdate: !this.state.showBalanceUpdate
                        })
                      }
                    >
                      <i className="fa fa-pencil-alt text-primary" />
                    </a>
                  </small>
                </h3>
                {balanceForm}
              </div>
            </div>
            <hr />
            <ul className="list-group">
              <li className="list-group-item">Client email : {client.email}</li>
              <li className="list-group-item">
                Client phone no. : {client.phone}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div>
  //     <h1>{client.firstName}</h1>
  //   </div>
  // );
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(state => ({
    client: state.firestore.ordered.client && state.firestore.ordered.client[0]
  }))
)(ClientDetails);
