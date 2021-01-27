import { Component } from "react";
import axios from "./axios";
import ShoppingCart from "./ShoppingCard";
import LoginAndRegistration from "./LoginAndRegistration";
import Adress from "./Adress";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CheckoutPage = styled.div`
    color: #f7f4f2;
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    background-color: #f5f0ed;
    color: black;
    margin: 50px;
    margin-left: auto;
    margin-right: auto;
    padding: 30px;
    text-align: center;
    margin-top: 120px;
`;

const LoginComp = styled.div`
    background: #d4c6bd;
    margin: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    width: 400px;
    z-index: 950;
    border: 3px solid #292929;
    @media (max-width: 450px) {
        width: 300px;
    }
    @media (max-width: 380px) {
        width: 250px;
    }
`;

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

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayItems: [],
            price: 0,
            userLoggedIn: false,
        };
    }

    componentDidMount() {
        console.log("checkout.js did mount", this.props);
        this.userLoggedIn();
    }

    userLoggedIn() {
        axios.get("/userLoggedIn").then((res) => {
            if (res.data.loggedin == true) {
                this.setState({
                    userLoggedIn: true,
                });
            } else {
                this.setState({
                    userLoggedIn: false,
                });
            }
        });
    }

    logout() {
        console.log("logout clicked");
    }

    toggleLogin() {
        this.setState({
            loginVisible: !this.state.loginVisible,
        });
    }

    render() {
        return (
            <>
                <CheckoutPage>
                    <nav>
                        <Buildingblock>
                            <Logo>
                                <h1>THREEHOUSE</h1>
                            </Logo>
                            <Link to="/">
                                <p className="link">back to the Shop</p>
                            </Link>
                            <div className="nav-links">
                                <img
                                    src="/img/my.png"
                                    alt="Your Profile"
                                    className="icon-white"
                                    onClick={() => {
                                        this.toggleLogin();
                                    }}
                                />

                                <br />
                                <br />

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
                            </div>
                        </Buildingblock>
                    </nav>

                    <div div className="grid-container">
                        <>
                            <div className="col-50">
                                <h1>Checkout</h1>
                                <h2>Shopping Cart</h2>
                                <ShoppingCart />
                            </div>

                            <div className="col-50">
                                <Adress />
                            </div>
                        </>
                    </div>
                </CheckoutPage>
            </>
        );
    }
}
