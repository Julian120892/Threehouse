import axios from "./axios";
import { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
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

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./paypalsecret.json"); // in dev they are in secrets.json which is listed in .gitignore
}

export default class Paypal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayItems: [],
            price: 0,
            userLoggedIn: false,
            currentOrder: {},
        };
    }

    componentDidMount() {
        console.log("paypal did mount");
        axios.get("/payment").then((res) => {
            console.log(res.data[0]);
            this.setState({
                currentOrder: res.data[0],
            });
        });
    }

    changePaymentStatus() {
        let orderId = this.state.currentOrder.id;
        console.log(orderId);
        axios.post("/paymentstatus", { params: { orderId } }).then(() => {
            location.replace("/thanks");
        });
    }

    render() {
        return (
            <Container>
                <h1>
                    {this.state.currentOrder.first}, please complete your order
                </h1>
                <h3>Order No. {this.state.currentOrder.id}</h3>
                <br />
                <p>Total amount:</p>
                <h4>{this.state.currentOrder.price}€</h4>
                <h3>Please select your payment Method</h3>

                <PayPalButton
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "EUR",
                                        value: this.state.currentOrder.price,
                                    },
                                },
                            ],
                        });
                    }}
                    onSuccess={(details, data) => {
                        this.changePaymentStatus();
                    }}
                    options={{
                        clientId: secrets.PAYPAL_KEY,
                        currency: "EUR",
                    }}
                />
            </Container>
        );
    }
}
