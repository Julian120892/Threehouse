import { Component } from "react";
import ProductEditor from "./ProductEditor";
import Admin from "./Admin";
import axios from "../axios";

export default class AdminConsole extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("adminConsole mounted", this.state);

        axios.get("/product-list").then((res) => {
            let productsArray = [];

            for (let i = 0; i < res.data.length; i++) {
                productsArray.push(res.data[i]);
            }

            this.setState({
                product: productsArray,
            });
        });
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log("component updated");
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
