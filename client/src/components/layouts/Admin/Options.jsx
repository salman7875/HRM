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

                      {/* google calender  */}
                      
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
