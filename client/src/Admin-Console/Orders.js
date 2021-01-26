import { Component } from "react";
import axios from "../axios";
import styled from "styled-components";

const Container = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    padding: 25px;
    margin-bottom: 20px;
    background-color: ghostwhite;
`;

const Item = styled.div`
    margin-top: 650px;
`;

export default class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
        };
    }

    componentDidMount() {
        console.log("orders mounted", this.state);
        this.getOrders();
    }

    getOrders() {
        console.log("in orders");
        axios.get("/recent").then((res) => {
            this.setState({
                orders: res.data,
            });
            console.log(this.state);
        });
    }

    deleteOrder(e) {
        let orderId = e.target.id;
        console.log(orderId);
        axios.post("/deleteorder", { params: { orderId } }).then(() => {
            this.getOrders();
        });
    }

    changePaymentStatus(e) {
        let orderId = e.target.id;
        console.log(orderId);
        axios.post("/paymentstatus", { params: { orderId } }).then(() => {
            this.getOrders();
        });
    }

    dispatch(e) {
        let orderId = e.target.id;
        console.log(this.state.shippmentRef);
        let referenceNumber = this.state.shippmentRef;
        console.log("ref ", referenceNumber);
        axios
            .post("/dispatch", { params: { orderId, referenceNumber } })
            .then(() => {
                this.getOrders();
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <Item>
                <h1>Recent Orders</h1>
                {this.state.orders.map((d, index) => (
                    <Container key={index}>
                        <h3>OrderNo.: {d.id}</h3>
                        <hr />
                        <h4>{d.order_timestamp}</h4>
                        <p>Products: {d.items}</p>
                        <p>total: {d.price} €</p>
                        <h5>Shipping Adress:</h5>
                        <p>
                            {d.first} {d.last}
                        </p>
                        <p>{d.adress}</p>
                        <p>
                            {d.zip} {d.city}
                        </p>

                        {!d.payment_status && <p>Payment_status: pending</p>}
                        {d.payment_status && <p>Payment_status: complete</p>}
                        {!d.shipping && <p>Shipping-Status: not dispatched</p>}
                        {d.shipping && (
                            <p>
                                Shipping-Status: dispatched ref:{" "}
                                {d.shipping_reference}
                            </p>
                        )}

                        <input
                            name="shippmentRef"
                            type="text"
                            placeholder="Shippment Reference Number"
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                        />
                        <button
                            id={d.id}
                            onClick={(e) => {
                                this.dispatch(e);
                            }}
                        >
                            dispatched
                        </button>

                        <button
                            id={d.id}
                            onClick={(e) => {
                                this.changePaymentStatus(e);
                            }}
                        >
                            payed
                        </button>

                        <button
                            id={d.id}
                            onClick={(e) => {
                                this.deleteOrder(e);
                            }}
                        >
                            Delete Order
                        </button>
                    </Container>
                ))}
            </Item>
        );
    }
}

//onClick "dispatch()" and "payed()"
