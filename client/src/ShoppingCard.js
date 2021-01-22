import { Component } from "react";
import axios from "./axios";

export default class ShoppingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("shoppingCard mounted", this.props.shoppingCardItems);
        this.getProducts();
    }

    componentDidUpdate() {
        console.log("component did update");
    }

    getProducts() {
        console.log("getting items");
        console.log("getProducts: ", localStorage.getItem("items"));
        let productsInShoppngCart = localStorage.getItem("items");
        console.log("items in local storage ", productsInShoppngCart);

        axios
            .get("/getShoppingCartItems", { params: { productsInShoppngCart } })
            .then((res) => {
                console.log(res);
            });
    }

    render() {
        return (
            <>
                <p>shopping Card</p>
                {this.props.shoppingCardItems.map((d, index) => (
                    <div key={index}>
                        <h1>{d}</h1>
                    </div>
                ))}
            </>
        );
    }
}
