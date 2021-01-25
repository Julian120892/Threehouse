import axios from "./axios";
import { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";

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
        };
    }

    componentDidMount() {
        console.log("paypal did mount", this.props);
    }

    changePaymentStatus() {
        let orderId = this.props.currentOrder;
        axios.post("/paymentstatus", orderId).then(() => {
            console.log("weiterleiten mit location");
        });
    }

    render() {
        return (
            <PayPalButton
                amount="0.01" //get from price
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    this.changePaymentStatus();
                    //hier muss dein axios in der datenbank zu bezahlt ändern und eine dankeSeite öffnen.
                    alert(
                        "Transaction completed by " +
                            details.payer.name.given_name
                    );

                    // OPTIONAL: Call your server to save the transaction
                    // return fetch("/paypal-transaction-complete", {
                    //     method: "post",
                    //     body: JSON.stringify({
                    //         orderId: data.orderID,
                    //     }),
                    // });
                }}
                options={{
                    clientId: secrets.PAYPAL_KEY,
                }}
            />
        );
    }
}
