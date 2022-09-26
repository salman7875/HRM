import axios from "axios";
import React, { Component } from "react";
import AdminSidePanel from "./AdminSidePanel";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import { Consumer } from "../../../context";
import { Redirect } from "react-router-dom";
import { Spring } from "react-spring/renderprops";

export default class Options extends Component {
  constructor() {
    super();

    this.state = {
      teamName: "",
      roleName: "",

      existingTeamList: [],
      existingRoleList: [],

      error: "",
    };
  }

  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  onAddTeam = async () => {
    // check if team name already exists
    const { existingTeamList } = this.state;
    const { teamName } = this.state;

    if (teamName.trim().length === 0) {
      this.setState({
        error: "Team name cannot be empty",
      });
    } else if (existingTeamList.includes(teamName.trim())) {
      this.setState({
        error: "Team name already exists",
      });
    } else {
      // save the new team
      const newTeam = await axios.post("/api/admin/addNewTeam", {
        teamName: this.state.teamName,
      });

      this.setState({ existingTeamList: newTeam.data.teamNames });

      toast.notify("New team added successfully", {
        position: "top-right",
      });

      console.log("added new team: ", newTeam.data);
    }
  };

  onDeleteAdminAccount = async (dispatch) => {
    const adminId = localStorage.getItem("userId");

    try {
      await axios.delete(`/api/admin/deleteAdminAcc/${adminId}`);
      console.log("deleted admin acc");
      localStorage.setItem("auth-token", "");
      localStorage.setItem("userId", "");

      dispatch({
        type: "LOGGED_OUT",
      });

      this.props.history.push("/login");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // addToGoogleCalender = (e) => {
  //   e.preventDefault();

  //   try {
  //     var gapi = window.gapi;
  //     console.log(gapi);
  //     var CLIENT_ID =
  //       "487679379915-7rvf2ror46e4bbsj8t8obali4heq5qjm.apps.googleusercontent.com";
  //     var API_KEY = "AIzaSyB_HYziuQ7j6s9CiqSgXV3YiGTzr5nc0xE";
  //     var DISCOVERY_DOCS = [
  //       "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  //     ];
  //     var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  //     gapi.load("client:auth2", () => {
  //       console.log("loaded client");

  //       gapi.client.init({
  //         apiKey: API_KEY,
  //         clientId: CLIENT_ID,
  //         discoveryDocs: DISCOVERY_DOCS,
  //         scope: SCOPES,
  //       });

  //       gapi.client.load("calendar", "v3", () =>
  //         console.log("loaded calender")
  //       );

  //       gapi.auth2
  //         .getAuthInstance()
  //         .signIn()
  //         .then(() => {
  //           var event = {
  //             summary: this.state.title,
  //             description: this.state.description,
  //             start: {
  //               dateTime: `${this.state.dueDate}T${this.state.time}:00`,
  //               timeZone: "Asia/Kolkata",
  //             },
  //             end: {
  //               dateTime: `${this.state.dueDate}T${this.state.time}:00`,
  //               timeZone: "Asia/Kolkata",
  //             },
  //             reminders: {
  //               useDefault: false,
  //               overrides: [
  //                 { method: "email", minutes: 24 * 60 },
  //                 { method: "popup", minutes: 10 },
  //               ],
  //             },
  //           };

  //           var request = gapi.client.calendar.events.insert({
  //             calendarId: "primary",
  //             resource: event,
  //           });

  //           console.log("add new event from addTodo");

  //           request.execute((event) => {
  //             console.log(event);
  //           });

  //           toast.notify("Successfully set reminder to your Google Calender", {
  //             position: "top-right",
  //           });
  //         });
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  render() {
    return (
      <Consumer>
        {(value) => {
          let { dispatch, user } = value;

          const token = localStorage.getItem("auth-token");

          if (!token) return <Redirect to="/login" />;
          if (user && user.role !== "admin")
            return <Redirect to="/empDashBoard" />;

          return (
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ duration: 300 }}
            >
              {(props) => (
                <div className="row m-0">
                  {/* left part */}
                  <div className="col-2 p-0 leftPart">
                    <AdminSidePanel />
                  </div>

                  {/* right part */}

                  <div className="col rightPart container" style={props}>
                    <div className="row">
                      {/* add roles, teams */}
                      <div className="col">
                        <div className="row">
                          <div className="col">
                            {/* <form className="addEmpForm"> */}
                            {this.state.error ? (
                              <div className="alert alert-danger">
                                {this.state.error}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="row mt-5 ml-3">
                          <div className="col">
                            <input
                              type="button"
                              className="btn btn-danger"
                              value="Delete Admin Account"
                              onClick={() =>
                                this.onDeleteAdminAccount(dispatch)
                              }
                            />

                            <div className="alert alert-danger mt-3">
                              <small>
                                <b>Note: </b> By deleting admin account, you
                                will loose all your current pending requests,
                                which might lead to adverse effects. Therefore
                                it is recommended you delete the account once
                                clearing all the requests
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

  

                      

                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                          </div>
                        </div>

                        <div className="col">
                          <div className="form-group">
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Spring>
          );
        }}
      </Consumer>
    );
  }
}
