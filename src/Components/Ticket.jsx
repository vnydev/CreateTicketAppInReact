import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { StoreTickets, updateTicketById } from "../app.service";
const styles = {
  ticket: {
    border: "1px solid #ccc",
    borderRadius: "3px",
    minHeight: "7em",
    padding: "0.5em",
    margin: "0.5em",
    fontWeight: "normal",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
};

class Ticket extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    handleMoveTicket: PropTypes.func.isRequired
  };
  state = {
    allTickets: [],
    activeTicketId: "",
    displayTicket: {}
  };

  componentWillMount() {
    this.setState({ allTickets: StoreTickets() });
    const {
      match: { params }
    } = this.props;
    this.setState({ activeTicketId: params.id });
  }
  componentDidMount() {
    this.state.allTickets.map(ticket => {
      if (ticket.Id == this.state.activeTicketId) {
        this.setState({ displayTicket: ticket });
      }
    });
  }

  updateTicket = status => {
    let updateTicketStatus = {
      ...this.state.displayTicket,
      Status: status
    };
    this.setState({
      displayTicket: updateTicketStatus
    });
    updateTicketById(updateTicketStatus);
    this.props.history.push("/");
  };

  render() {
    const { desc } = this.props;

    return (
      <div style={styles.ticket}>
        {/* Ticket description */}
        {this.state.displayTicket.Title}
        <div>{desc}</div>
        {/* Ticket actions [Done/Not Fix/Close]. Modify to display them properly */}
        <div>
          {this.state.displayTicket.Status != "close" ? (
            this.state.displayTicket.Status == "done" ? (
              <div>
                <button onClick={() => this.updateTicket("notFixe")}>
                  Not Fix
                </button>
                <button onClick={() => this.updateTicket("close")}>
                  Close
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => this.updateTicket("done")}>Done</button>
                <button onClick={() => this.updateTicket("close")}>
                  Close
                </button>
              </div>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Ticket);
