import React, { Component } from "react";
import { StoreTickets } from "../app.service";
import { withRouter } from "react-router";
const styles = {
  container: {
    display: "flex"
  },
  box: {
    flex: "0 1 33%",
    textAlign: "center",
    borderRight: "1px solid #ccc",
    label: {
      fontWeight: 600
    }
  },
  ticketBox: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "2px"
  }
};

class Home extends Component {
  state = {
    loading: false,
    ticketTitle: "",
    allTickets: []
  };

  componentWillMount() {
    this.setState({ allTickets: StoreTickets() });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  };
  addTickets = event => {
    if (this.state.ticketTitle) {
      this.setState({ loading: true });
      let TicketObj = {
        Title: this.state.ticketTitle,
        Status: "inprogress",
        Id: new Date().getTime()
      };
      let GetAllTicket = [];
      StoreTickets(TicketObj)
        .then(res => {
          GetAllTicket = res;
          this.setState({ loading: false });
          this.setState({ allTickets: GetAllTicket });
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      alert("Please fill the field.");
    }
    event.preventDefault();
  };
  ticketDetails = id => {
    this.props.history.push("/ticket/" + id);
  };
  render() {
    let { ticketTitle, loading, allTickets } = this.state;
    return (
      <div>
        <form onSubmit={this.addTickets}>
          <input
            type="text"
            name="ticketTitle"
            value={this.state.ticketTitle}
            style={{ borderRadius: "3px" }}
            onChange={this.handleChange}
          />
          <button type="submit">Add Ticket</button>
        </form>
        <br />
        <br />
        <div style={styles.container}>
          <div style={styles.box}>
            <label style={styles.box.label}>IN-PROGRESS</label>
            {/** show Todo tickets below */}
            <br />
            <br />
            {this.state.allTickets.map((ticket, indx) => {
              if (ticket.Status === "inprogress") {
                return (
                  <span
                    key={indx}
                    onClick={() => this.ticketDetails(ticket.Id)}
                  >
                    <a> {ticket.Title}</a> <br />
                    <br />
                  </span>
                );
              }
            })}
          </div>

          <div style={styles.box}>
            <label style={styles.box.label}>DONE</label>
            {/** show Done tickets below */}
            <br />
            <br />
            {this.state.allTickets.map((ticket, indx) => {
              if (ticket.Status === "done") {
                return (
                  <span
                    key={indx}
                    onClick={() => this.ticketDetails(ticket.Id)}
                  >
                    <a> {ticket.Title}</a> <br />
                    <br />
                  </span>
                );
              }
            })}
          </div>
          <div style={styles.box}>
            <label style={styles.box.label}>CLOSE</label>
            {/** show Close tickets below */}
            <br />
            <br />
            {this.state.allTickets.map((ticket, indx) => {
              if (ticket.Status === "close") {
                return (
                  <span
                    key={indx}
                    onClick={() => this.ticketDetails(ticket.Id)}
                  >
                    <a> {ticket.Title}</a> <br />
                    <br />
                  </span>
                );
              }
            })}
          </div>
        </div>
        {this.state.loading ? <div>Creating Ticket...</div> : null}
      </div>
    );
  }
}

export default withRouter(Home);
