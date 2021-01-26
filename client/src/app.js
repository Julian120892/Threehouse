import { Component } from "react";
import styled from "styled-components";
import ShoppingCard from "./ShoppingCard";
import LoginAndRegistration from "./LoginAndRegistration";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Paypal from "./Paypal";
import { Link } from "react-router-dom";

const GridContainer = styled.div`
    display: flex;
    justify-content: strech;
    align-items: strech;
    flex-direction: column;
`;

const Page = styled.div`
    display: flex;
    justify-content: strech;
    align-items: strech;
    flex-direction: column;
    padding: 70px;
`;

const Buildingblock = styled.div`
    background: #f5f0ed;
    // border: 1px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: strech;
    margin-bottom: 10px;
    padding: 10px;
    flex-wrap: wrap;
    positon: relative;
`;

const Item = styled.div`
    border: 1px solid grey;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: strech;
    margin: 10px;
    padding: 30px;
`;

const Basket = styled.div`
    background: #f5f0ed;
    border: 1px solid grey;
    margin: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    width: 530px;
    z-index: 100;
`;

const LoginComp = styled.div`
    border: 1px solid grey;
    background: #f5f0ed;
    margin: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    width: 530px;
    z-index: 150;
`;

const SpecialOffer = styled.div`
    position: absolute;
    top: 400px;
    left: 90px;
    color: white;
`;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            product: [],
            shoppingCardVisible: false,
            loginVisible: false,

            shoppingCardItems: [],
        };
    }

    componentDidMount() {
        console.log("app.js mounted");
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

    componentDidUpdate() {
        console.log("updated");
    }

    logout() {
        console.log("logout clicked");
    }

    addToShoppingCard(e) {
        this.state.shoppingCardItems.push(e.target.id);
        localStorage.setItem("items", [this.state.shoppingCardItems]);
        //adds as often as wanted but now we have duplicates not multiple
        //no live update
    }

    toggleShoppingCard() {
        this.setState({
            shoppingCardVisible: !this.state.shoppingCardVisible,
        });
    }

    toggleLogin() {
        this.setState({
            loginVisible: !this.state.loginVisible,
        });
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Page>
                                <nav>
                                    <Buildingblock>
                                        <h1>nav</h1>

                                        <h2
                                            onClick={() => {
                                                this.toggleLogin();
                                            }}
                                        >
                                            Your Profile
                                        </h2>
                                        {this.state.loginVisible && (
                                            <LoginComp
                                            // onMouseLeave={() => this.toggleLogin()}
                                            >
                                                <button
                                                    onClick={() => {
                                                        this.toggleLogin();
                                                    }}
                                                >
                                                    close
                                                </button>
                                                <LoginAndRegistration />
                                            </LoginComp>
                                        )}

                                        <h2
                                            onClick={() => {
                                                this.toggleShoppingCard();
                                            }}
                                        >
                                            Shopping Cart
                                        </h2>
                                        {this.state.shoppingCardVisible && (
                                            <Basket
                                            // onMouseLeave={() => {
                                            //     this.toggleShoppingCard();
                                            // }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        this.toggleShoppingCard();
                                                    }}
                                                >
                                                    close
                                                </button>
                                                <ShoppingCard
                                                    shoppingCardItems={
                                                        this.state
                                                            .shoppingCardItems
                                                    }
                                                />
                                            </Basket>
                                        )}
                                    </Buildingblock>
                                </nav>

                                <header>
                                    <Buildingblock>
                                        <h1>header</h1>
                                        {this.state.product[0] && (
                                            <>
                                                <img
                                                    width="100%"
                                                    height="600px"
                                                    src={
                                                        this.state.product[2]
                                                            .product_picture
                                                    }
                                                />
                                                <SpecialOffer>
                                                    <h1>
                                                        {
                                                            this.state
                                                                .product[2]
                                                                .product_name
                                                        }
                                                    </h1>
                                                    <p>
                                                        {
                                                            this.state
                                                                .product[2]
                                                                .product_description
                                                        }
                                                    </p>

                                                    <h4>
                                                        {
                                                            this.state
                                                                .product[2]
                                                                .product_price
                                                        }
                                                    </h4>
                                                    <button
                                                        className="btn-1"
                                                        onClick={(e) =>
                                                            this.addToShoppingCard(
                                                                e
                                                            )
                                                        }
                                                        id={
                                                            this.state
                                                                .product[2].id
                                                        }
                                                    >
                                                        add to shopping Card
                                                    </button>
                                                </SpecialOffer>
                                            </>
                                        )}
                                    </Buildingblock>
                                </header>
                                <main>
                                    <Buildingblock>
                                        <h1>main</h1>
                                        {this.state.product.map((d, index) => (
                                            <Item key={index}>
                                                <img
                                                    src={d.product_picture}
                                                    width="30%"
                                                    height="auto"
                                                />
                                                <h1>{d.product_name}</h1>
                                                <p>Thr3e Fragrance Tree</p>
                                                <h2>{d.product_price}</h2>
                                                {/* <h3>Id: {d.id}</h3> */}
                                                <p>{d.product_description}</p>
                                                <button
                                                    onClick={(e) =>
                                                        this.addToShoppingCard(
                                                            e
                                                        )
                                                    }
                                                    id={d.id}
                                                >
                                                    add to shopping Card
                                                </button>
                                            </Item>
                                        ))}
                                    </Buildingblock>
                                </main>
                                <footer>
                                    <Buildingblock>
                                        <h1>footer</h1>
                                        <a>Impressum</a>
                                    </Buildingblock>
                                </footer>
                            </Page>
                        )}
                    />

                    <Route exact path="/checkout" render={() => <Checkout />} />
                    <Route exact path="/pay" render={() => <Paypal />} />
                    <Route
                        exact
                        path="/thanks"
                        render={() => (
                            <>
                                <h1>Thank you for your order</h1>
                                <Link to="/">continue shopping</Link>
                            </>
                        )}
                    />
                </BrowserRouter>
            </>
        );
    }
}
