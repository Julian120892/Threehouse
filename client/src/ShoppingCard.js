import { Component } from "react";
import axios from "./axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    // background: #f5f0ed;
    margin: 5px;
    padding: 20px;
`;

export default class ShoppingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayItems: [],
            price: 0,
            home: true,
        };
    }

    componentDidMount() {
        this.getProducts();
        this.getLocation();
    }

    getLocation() {
        if (window.location.pathname == "/checkout") {
            this.setState({
                home: false,
            });
        }
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
                    <p>shopping Card</p>;
                    <Container>
                        <h5>Summe</h5>
                        <h1>00,00</h1>
                    </Container>
                    <button className="btn-1">Check Out</button>
                </>
            );
        }

        return (
            <>
                {this.state.displayItems.map((d, index) => (
                    <Container key={index} className="shoppingcart-item">
                        <div>
                            <p>{d.product_name}</p>

                            <br />
                            <h4>{d.product_price}</h4>
                        </div>
                        <div>
                            <img
                                id={index}
                                onClick={(e) => this.deleteFromShoppingCart(e)}
                                src="/img/delete.png"
                                className="icon-black-small"
                                alt="delete Item"
                            />
                        </div>
                    </Container>
                ))}

                <div className="sum">
                    {this.state.home && (
                        <Link to="/checkout">
                            <button className="btn-1">Check Out</button>
                        </Link>
                    )}
                    <div>
                        <h5>Summe</h5>
                        <h1>{this.state.price}€</h1>
                    </div>
                </div>
            </>
        );
    }
}
