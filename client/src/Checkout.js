import { Component } from "react";
import axios from "./axios";
import ShoppingCart from "./ShoppingCard";
import LoginAndRegistration from "./LoginAndRegistration";
import Adress from "./Adress";
import Paypal from "./Paypal";

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

    render() {
        return (
            <>
                <h1>checkout</h1>
                {!this.state.userLoggedIn && (
                    <>
                        <LoginAndRegistration />
                    </>
                )}

                <>
                    <h2>Shopping Cart</h2>
                    <ShoppingCart />
                    <Adress />
                </>
            </>
        );
    }
}
