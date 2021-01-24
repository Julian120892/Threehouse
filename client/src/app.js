import { Component } from "react";
import styled from "styled-components";
import ShoppingCard from "./ShoppingCard";
import LoginAndRegistration from "./LoginAndRegistration";
import axios from "./axios";

const GridContainer = styled.div`
    display: flex;
    justify-content: strech;
    align-items: strech;
    flex-direction: column;
`;

const Buildingblock = styled.div`
    background: blue;
    display: flex;
    justify-content: space-evenly;
    align-items: strech;
    margin-bottom: 10px;
    padding: 10px;
`;

const Item = styled.div`
    background: green;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: strech;
    margin: 10px;
    padding: 10px;
`;

const Basket = styled.div`
    background: yellow;
    margin: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    width: 530px;
`;

const LoginComp = styled.div`
    background: yellow;
    margin: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    width: 530px;
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
        console.log("app.js mounted", this.props);
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
        //sets array of product_id's in local storage
        this.state.shoppingCardItems.push(e.target.id);
        localStorage.setItem("items", [this.state.shoppingCardItems]);
        // console.log("items: ", localStorage.getItem("items"));
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
                <GridContainer>
                    <nav>
                        <Buildingblock>
                            <h1>footer</h1>

                            <h2
                                onClick={() => {
                                    this.toggleShoppingCard();
                                }}
                            >
                                Shopping Cart
                            </h2>
                            {this.state.shoppingCardVisible && (
                                <Basket
                                    onMouseLeave={() => {
                                        this.toggleShoppingCard();
                                    }}
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
                                            this.state.shoppingCardItems
                                        }
                                    />
                                </Basket>
                            )}

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
                        </Buildingblock>
                    </nav>
                    <header>
                        <Buildingblock>
                            <h1>header</h1>
                        </Buildingblock>
                    </header>
                    <main>
                        <Buildingblock>
                            <h1>main</h1>
                            {this.state.product.map((d, index) => (
                                <Item key={index}>
                                    <h1>{d.product_name}</h1>
                                    <h2>{d.product_price}</h2>
                                    <h3>Id: {d.id}</h3>
                                    <p>{d.product_description}</p>
                                    <img
                                        src={d.product_picture}
                                        width="100"
                                        height="100"
                                    />
                                    <button
                                        onClick={(e) =>
                                            this.addToShoppingCard(e)
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
                </GridContainer>
            </>
        );
    }
}
