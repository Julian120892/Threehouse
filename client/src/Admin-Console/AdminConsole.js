import { Component } from "react";
import ProductEditor from "./ProductEditor";
import Admin from "./Admin";
import axios from "../axios";

export default class AdminConsole extends Component {
    constructor() {
        super();
        this.state = {
            product: [],
        };
        this.getProducts = this.getProducts.bind(this);
        this.updateProductList = this.updateProductList.bind(this);
    }

    componentDidMount() {
        console.log("adminConsole mounted", this.state);

        // axios.get("/product-list").then((res) => {
        //     let productsArray = [];

        //     for (let i = 0; i < res.data.length; i++) {
        //         productsArray.push(res.data[i]);
        //     }

        //     this.setState({
        //         product: productsArray,
        //     });
        // });
        // console.log(this.state);

        this.getProducts();
    }

    componentDidUpdate() {
        console.log("component updated");
    }

    updateProductList() {
        console.log("update list");
        this.getProducts();
    }

    getProducts() {
        axios.get("/product-list").then((res) => {
            let productsArray = [];

            for (let i = 0; i < res.data.length; i++) {
                productsArray.push(res.data[i]);
            }

            this.setState({
                product: productsArray,
            });
        });
    }

    render() {
        return (
            <>
                <Admin updateProductList={this.updateProductList} />
                <ProductEditor
                    product={this.state.product}
                    updateProductList={this.updateProductList}
                />
            </>
        );
    }
}
