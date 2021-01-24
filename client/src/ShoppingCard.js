import { Component } from "react";
import axios from "./axios";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: strech;
    align-items: strech;
    flex-direction: column;
    background: #f5f0ed;
    border: 1px solid grey;
    margin: 5px;
`;

export default class ShoppingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayItems: [],
            price: 0,
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        let productInShoppngCart = localStorage.getItem("items").split(",");

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
        for (let i = 0; i < data.length; i++) {
            let number = parseFloat(data[i].product_price);
            sum += number;
        }
        this.setState({
            price: sum,
        });
    }

    deleteFromShoppingCart(e) {
        let arr = localStorage.items.split(",");
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i != e.target.id) {
                newArr.push(arr[i]);
            }
        }

        localStorage.setItem("items", newArr);
        this.setState({
            displayItems: [],
        });
        this.getProducts();
    }

    render() {
        if (!this.state.displayItems) {
            return (
                <>
                    <p>shopping Card222222</p>;
                    <Container>
                        <h5>Summe</h5>
                        <h1>00,00</h1>
                    </Container>
                    <button>Check Out</button>
                </>
            );
        }

        return (
            <>
                <p>shopping Card</p>

                {this.state.displayItems.map((d, index) => (
                    <Container key={index}>
                        <h1>{d.product_name}</h1>
                        <h2>{d.product_price}</h2>
                        <h5>{d.id}</h5>
                        <h5>{index}</h5>

                        <p
                            id={index}
                            onClick={(e) => this.deleteFromShoppingCart(e)}
                        >
                            delete Item
                        </p>
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
