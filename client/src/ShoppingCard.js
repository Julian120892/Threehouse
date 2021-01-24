import { Component } from "react";
import axios from "./axios";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: strech;
    align-items: strech;
    flex-direction: column;
    background-color: red;
    margin: 5px;
`;

export default class ShoppingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayItems: [],
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        let productInShoppngCart = localStorage.getItem("items").split(",");
        console.log("items in local storage ", productInShoppngCart);

        for (let i = 0; i < productInShoppngCart.length; i++) {
            let value = productInShoppngCart[i];
            axios
                .get("/getShoppingCartItems", { params: { value: value } })
                .then((res) => {
                    this.setState({
                        displayItems: [...this.state.displayItems, res.data[0]],
                    });
                    this.getSumOfShoppingCart(this.state.displayItems);
                });
        }
    }

    getSumOfShoppingCart(data) {
        let sum = 0;
        console.log("rechnet", data[0].product_price);
        for (let i = 0; i < data.length; i++) {
            let w = parseFloat(data[i].product_price);
            console.log(w);
            sum += w;
        }
        this.setState({
            price: sum,
        });
    }

    render() {
        return (
            <>
                <p>shopping Card</p>
                {this.state.displayItems.map((d, index) => (
                    <Container key={index}>
                        <h1>{d.product_name}</h1>
                        <h2>{d.product_price}</h2>
                    </Container>
                ))}
                <hr />
                <Container>
                    <h5>Summe</h5>
                    <h1>{this.state.price}</h1>
                </Container>

                <button>Check Out</button>
            </>
        );
    }
}
