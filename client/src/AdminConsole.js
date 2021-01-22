import React, { Component } from "react";
import axios from "./axios";
import ProductEditor from "./ProductEditor";
import Admin from "./Admin";

export default class AdminConsole extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("adminConsole mounted", this.state);
    }

    render() {
        return (
            <>
                <Admin />
                <ProductEditor />
            </>
        );
    }
}
