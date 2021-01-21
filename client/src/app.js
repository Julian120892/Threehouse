import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("App.js mounted");
    }

    render() {
        return (
            <>
                <h1>hello</h1>
            </>
        );
    }
}
