import { Component } from "react";
import axios from "./axios";

export default class ProductEditor extends Component {
    constructor() {
        super();
        this.state = {
            product: [],
        };
    }

    componentDidMount() {
        console.log("producteditor.js mounted", this.props);
        axios.get("/product-list").then((res) => {
            let productsArray = [];

            for (let i = 0; i < res.data.length; i++) {
                productsArray.push(res.data[i]);
            }

            this.setState({
                product: productsArray,
            });

            console.log("state in ProductEditor", this.state.product);
        });
    }

    render() {
        const products = this.state.product.map((d, index) => (
            <div key={index}>
                <h1>{d.product_name}</h1>
                <h2>{d.product_price}</h2>
                <p>{d.product_description}</p>
                <img src={d.product_picture} width="100" height="100" />
            </div>
        ));

        console.log("products: ", products);

        return (
            <div>
                <hr />
                <h1>Products</h1>
                <h1>{products}</h1>
            </div>
        );
    }
}
