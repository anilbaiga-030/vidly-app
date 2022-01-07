import React, { Component } from "react";
import { Icon } from "@iconify/react";
import "../../App.css";

class Like extends React.Component {
  getClasses() {
    let classes = "bi:suit-heart";
    return (classes += this.props.liked === true ? "-fill" : "");
  }

  render() {
    return (
      <div>
        <Icon
          onClick={this.props.onClick}
          icon={this.getClasses()}
          style={{ fontSize: 23, cursor: "pointer" }}
        />
      </div>
    );
  }
}

export default Like;
