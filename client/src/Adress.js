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

export default class Adress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveToServer: false,
            displayItems: [],
            price: 0,
        };
    }

    componentDidMount() {
        console.log("adress.js did mount");
        this.getUserData();
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

    getUserData() {
        axios.get("/userdata").then((res) => {
            console.log(res.data);
            this.setState({
                userdata: {
                    first: res.data.first,
                    last: res.data.last,
                    email: res.data.email,
                    city: res.data.city,
                    zip: res.data.zip,
                    adress: res.data.adress,
                },
            });
            console.log(this.state);
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state);
    }

    handleClick() {
        if (this.state.saveToServer == true) {
            axios
                .post("/adress", this.state)
                .then(() => {
                    this.setState({
                        error: false,
                    });
                    this.completeOrder();
                })
                .catch((err) => {
                    console.log("error in /adress post request", err);
                    this.setState({
                        error: true,
                    });
                });
        } else {
            console.log("just process");
            this.completeOrder();
        }
    }

    completeOrder() {
        let orderObj = {
            items: localStorage.items,
            price: this.state.price,
        };

        axios.post("/order", orderObj).then(() => {
            console.log("order completed");
        });
    }

    saveToServer() {
        this.setState({
            saveToServer: !this.state.saveToServer,
        });
        console.log("change", this.state.saveToServer);
    }

    render() {
        if (this.state.userdata) {
            return (
                <Container>
                    <h1>adress</h1>
                    <div className="container">
                        <div className="registration">
                            <h2>Shipping Adress</h2>

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="name"
                                type="text"
                                placeholder="Name"
                                defaultValue={this.state.userdata.first}
                                required
                            />

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="last"
                                type="text"
                                placeholder="Lastname"
                                defaultValue={this.state.userdata.last}
                                required
                            />

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="email"
                                type="email"
                                placeholder="email"
                                defaultValue={this.state.userdata.email}
                                required
                            />

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="city"
                                type="text"
                                placeholder="City"
                                defaultValue={this.state.userdata.city}
                                required
                            />
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="zip"
                                type="text"
                                placeholder="Zip Code"
                                defaultValue={this.state.userdata.zip}
                                required
                            />
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="adress"
                                type="text"
                                placeholder="adress"
                                defaultValue={this.state.userdata.adress}
                                required
                            />

                            <input
                                onChange={() => {
                                    this.saveToServer();
                                }}
                                type="checkbox"
                                id="addToServer"
                                name="addToServer"
                                value="add"
                            />
                            <label htmlFor="addToServer">
                                Save for next purchase?
                            </label>

                            {this.state.error && (
                                <span>
                                    Something went wrong, please try again.
                                </span>
                            )}

                            <button onClick={() => this.handleClick()}>
                                Buy
                            </button>
                        </div>
                    </div>
                </Container>
            );
        } else {
            return (
                <Container>
                    <h1>adress</h1>
                    <div className="container">
                        <div className="registration">
                            <h2>Shipping Adress</h2>

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="name"
                                type="text"
                                placeholder="Name"
                                required
                            />

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="last"
                                type="text"
                                placeholder="Lastname"
                                required
                            />

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="email"
                                type="email"
                                placeholder="email"
                                required
                            />

                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="city"
                                type="text"
                                placeholder="City"
                                required
                            />
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="zip"
                                type="text"
                                placeholder="Zip Code"
                                required
                            />
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="adress"
                                type="text"
                                placeholder="adress"
                                required
                            />

                            {this.state.error && (
                                <span>
                                    Something went wrong, please try again.
                                </span>
                            )}

                            <button onClick={() => this.handleClick()}>
                                Buy
                            </button>
                        </div>
                    </div>
                </Container>
            );
        }
    }
}
