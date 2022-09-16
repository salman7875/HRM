import React from "react";
import { Spring } from "react-spring/renderprops";
import checkList from "../../assets/images/checklist.svg";
import "../../assets/about-styles/about.css";

export default function About() {
  return (
    <div className="container mt-5">
      <div className="row m-0">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ duration: 300 }}
        >
          {(props) => (
            <div style={props}>
              <div className="col-12 col-sm-12 ">
                <h1 style={{ fontWeight: "lighter mt-5" }}>
                  <span className="font-italic">About HRMS</span>
                </h1>
                <p className="lead font-italic">
                  One stop software to manage your employees
                </p>
                <h1 className="font-italic">Features</h1>
                <p className="mb-1 font-italic">Login/Register feature</p>
                <p className="mb-1 font-italic">Integrated Payroll system</p>
                <p className="mb-1 font-italic">Add, Edit, Delete employees</p>
                <p className="mb-1 font-italic">Search and filter employees</p>
                <p className="mb-1 font-italic">Apply for leaves, loans, bonus</p>
                <p className="mb-1 font-italic">Manage your tickets all at one place</p>
                <p className="mb-1 font-italic">Cool admin dashboard with statistics</p>
                <p className="text-secondary font-italic mt-5">Salman Ansari</p>
                <a href="https://github.com/salman7875" target="_blank"><b>Github Repo</b></a>
                <br />
                <a href="https://youtu.be/qrxTyDDfp0I" target="_blank"><b>Youtube Tutorials for help</b></a>
                <br />
                <a href="https://youtu.be/paqXfTjznc4" target="_blank"><b>Youtube Tutorials for help</b></a>
              </div>

              <div className="col">
                <img className="aboutSVG" src={checkList} alt="" />
              </div>
            </div>
          )}
        </Spring>
      </div>
    </div>
  );
}
