import { Component } from "react";
import axios from "./axios";

export default class ShoppingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCardItems: [],
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    componentDidUpdate() {
        console.log("component did update");
    }

    getProducts() {
        let productInShoppngCart = localStorage.getItem("items").split(",");
        console.log("items in local storage ", productInShoppngCart);

        let arrOfProducts = [];

        for (let i = 0; i < productInShoppngCart.length; i++) {
            let value = productInShoppngCart[i];
            axios
                .get("/getShoppingCartItems", { params: { value: value } })
                .then((res) => {
                    console.log(res.data[0]);
                    arrOfProducts.push(res.data[0]);
                });
        }
        console.log("arrOfProducts in Shoppingcard: ", arrOfProducts);
        this.shoppingCardItems.push(arrOfProducts);
        console.log("state in ShoppingCart", this.state);
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
