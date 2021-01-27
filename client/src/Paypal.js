import axios from "./axios";
import { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: strech;
    align-items: strech;
    flex-direction: column;
    margin: 5px;
    padding: 20px;
`;

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

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("/server/secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
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
            localStorage.removeItem("items");
            location.replace("/");
        });
    }

    render() {
        return (
            <CheckoutPage>
                <Container>
                    <h1>
                        Hey {this.state.currentOrder.first}, please complete
                        your Order now.
                    </h1>
                    <h3>Order No. {this.state.currentOrder.id}</h3>
                    <br />
                    <p>Total amount:</p>
                    <h4>{this.state.currentOrder.price}€</h4>
                    <br />
                    <br />
                    <h3>Please select your payment Method</h3>
                    <br />

                    <PayPalButton
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "EUR",
                                            value: this.state.currentOrder
                                                .price,
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
            </CheckoutPage>
        );
    }
}
