import { Component } from "react";
import styled from "styled-components";
import ShoppingCard from "./ShoppingCard";
import LoginAndRegistration from "./LoginAndRegistration";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Paypal from "./Paypal";
import { Link } from "react-router-dom";

const Logo = styled.div`
    color: #f7f4f2;
`;

const Buildingblock = styled.div`
    // border: 1px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: strech;
    flex-wrap: wrap;
    positon: relative;
`;

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: strech;
    flex-wrap: wrap;
    positon: relative;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 40px;
    flex-wrap: wrap;
    positon: fixed;
    color: ghostwhite;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    background: #f5f0ed;
    min-width: 200px;
    max-height: 600px;
    positon: relative;
`;

const Basket = styled.div`
    background: #f5f0ed;
    margin: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    width: 400px;
    z-index: 900;
    // border: 3px solid #292929;
    @media (max-width: 450px) {
        width: 300px;
    }
    @media (max-width: 380px) {
        width: 250px;
    }
`;

const LoginComp = styled.div`
    background: #f5f0ed;
    margin: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    width: 400px;
    z-index: 950;
    // border: 3px solid #292929;
    @media (max-width: 450px) {
        width: 300px;
    }
    @media (max-width: 380px) {
        width: 250px;
    }
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
        console.log("added to shopping cart");
        this.state.shoppingCardItems.push(e.target.id);
        localStorage.setItem("items", [this.state.shoppingCardItems]);
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
                            <>
                                <nav>
                                    <Buildingblock>
                                        <Logo>
                                            <h1>THR3EHOUSE</h1>
                                            <p>
                                                Fragrance Trees for nature
                                                lovers
                                            </p>
                                        </Logo>
                                        <div className="nav-links">
                                            <img
                                                src="/img/my.png"
                                                alt="Your Profile"
                                                className="icon-white"
                                                onClick={() => {
                                                    this.toggleLogin();
                                                }}
                                            />
                                            {this.state.loginVisible && (
                                                <LoginComp
                                                // onMouseLeave={() =>
                                                //     this.toggleLogin()
                                                // }
                                                >
                                                    <img
                                                        src="/img/close.png"
                                                        alt="close"
                                                        className="icon-black-small"
                                                        onClick={() => {
                                                            this.toggleLogin();
                                                        }}
                                                    />

                                                    <LoginAndRegistration />
                                                </LoginComp>
                                            )}

                                            <img
                                                className="icon-white"
                                                src="/img/shopping.png"
                                                alt="Shopping Cart"
                                                onClick={() => {
                                                    this.toggleShoppingCard();
                                                }}
                                            />
                                            {this.state.shoppingCardVisible && (
                                                <Basket
                                                    onMouseLeave={() => {
                                                        this.toggleShoppingCard();
                                                    }}
                                                >
                                                    <img
                                                        src="/img/close.png"
                                                        alt="close"
                                                        className="icon-black-small"
                                                        onClick={() => {
                                                            this.toggleShoppingCard();
                                                        }}
                                                    />
                                                    <ShoppingCard
                                                        shoppingCardItems={
                                                            this.state
                                                                .shoppingCardItems
                                                        }
                                                    />
                                                </Basket>
                                            )}
                                        </div>
                                    </Buildingblock>
                                </nav>
                                <header>
                                    <Buildingblock>
                                        <div className="grid-container">
                                            <div className="name">
                                                THR3EHOUSE.
                                            </div>
                                            <div className="col-50">
                                                {this.state.product[0] && (
                                                    <>
                                                        <img
                                                            width="100%"
                                                            height="100%"
                                                            // src={
                                                            //     this.state
                                                            //         .product[2]
                                                            //         .product_picture
                                                            // }
                                                            src="/img/tree.jpg"
                                                        />
                                                        <div className="special-offer">
                                                            <h3>
                                                                Special Offer:
                                                            </h3>
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
                                                            <br />

                                                            <h2>
                                                                {
                                                                    this.state
                                                                        .product[2]
                                                                        .product_price
                                                                }{" "}
                                                                €
                                                            </h2>
                                                            <br />
                                                            <button
                                                                className="btn-1"
                                                                onClick={(e) =>
                                                                    this.addToShoppingCard(
                                                                        e
                                                                    )
                                                                }
                                                                id={
                                                                    this.state
                                                                        .product[2]
                                                                        .id
                                                                }
                                                            >
                                                                Add to Shopping
                                                                Cart
                                                            </button>
                                                        </div>
                                                    </>
                                                )}{" "}
                                            </div>
                                            <div className="col-50-column">
                                                <div className="col-100">
                                                    <div className="teaser-text">
                                                        <h1>
                                                            Organic for your car
                                                        </h1>

                                                        <h3>
                                                            <br />
                                                            "While many natural
                                                            fragrances have a
                                                            reputation for
                                                            feeling more earthy
                                                            than beachy, THREE
                                                            is like a summer
                                                            day, liquidifed and
                                                            hanging from your
                                                            rear mirror.
                                                            <br />
                                                            <br />
                                                            The fresh florals
                                                            make it light,
                                                            easy-to-wear, and
                                                            cheery."
                                                        </h3>
                                                        <Link to="/more">
                                                            <img
                                                                src="/img/arrow.png"
                                                                className="icon-arrow"
                                                                alt="more infos"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-100">
                                                    <div className="teaser-picture">
                                                        {this.state
                                                            .product[0] && (
                                                            <img
                                                                width="100%"
                                                                src="/img/preview.jpg"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Buildingblock>
                                </header>
                                <main>
                                    <Main>
                                        <div className="grid-container">
                                            {this.state.product.map(
                                                (d, index) => (
                                                    <div
                                                        className="col-50"
                                                        key={index}
                                                    >
                                                        <div className="product">
                                                            <img
                                                                src={
                                                                    d.product_picture
                                                                }
                                                                className="product-picture"
                                                            />

                                                            <div className="product-text">
                                                                <div className="half">
                                                                    <h1>
                                                                        {
                                                                            d.product_name
                                                                        }
                                                                    </h1>
                                                                    <p>
                                                                        Thr3e
                                                                        Fragrance
                                                                        Tree
                                                                    </p>
                                                                    <br />
                                                                    <h2>
                                                                        {
                                                                            d.product_price
                                                                        }{" "}
                                                                        €
                                                                    </h2>
                                                                    <br />
                                                                    <p>
                                                                        {
                                                                            d.product_description
                                                                        }
                                                                    </p>
                                                                    <br />

                                                                    <br />
                                                                    <button
                                                                        className="btn-1"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            this.addToShoppingCard(
                                                                                e
                                                                            )
                                                                        }
                                                                        id={
                                                                            d.id
                                                                        }
                                                                    >
                                                                        Add
                                                                        Product
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </Main>
                                </main>
                                <footer>
                                    <Footer>
                                        <div className="grid-container">
                                            <div
                                                className="col-50"
                                                height="600px"
                                            >
                                                <h1>Threehouse.</h1>
                                                <p>Germany, 2020</p>
                                            </div>
                                            <div className="impressum">
                                                <a>
                                                    <h5>Impressum</h5>
                                                </a>
                                                <div>
                                                    <img
                                                        src="/img/social.png"
                                                        alt="social"
                                                        className="social-icon"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Footer>
                                </footer>
                            </>
                        )}
                    />

                    <Route exact path="/checkout" render={() => <Checkout />} />
                    <Route exact path="/pay" render={() => <Paypal />} />
                    <Route
                        exact
                        path="/more"
                        render={() => (
                            <>
                                <h1>more infos</h1>
                            </>
                        )}
                    />
                </BrowserRouter>
            </>
        );
    }
}
