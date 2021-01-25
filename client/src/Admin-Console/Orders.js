import { Component } from "react";
import axios from "../axios";
import styled from "styled-components";

const Container = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
    margin-bottom: 10px;
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

    render() {
        return (
            <>
                <h1>Recent Orders</h1>
                {this.state.orders.map((d, index) => (
                    <Container key={index}>
                        <h3>OrderNo.: {d.id}</h3>
                        <h4>{d.order_timestamp}</h4>
                        <p>Products: {d.items}</p>
                        <p>total: {d.price} €</p>
                        {!d.payment_status && <p>Payment_status: pending</p>}
                        {d.payment_status && <p>Payment_status: complete</p>}
                        {!d.shipping && <p>Shipping-Status: not dispatched</p>}
                        {d.shipping && (
                            <p>
                                Shipping-Status: dispatched ref:
                                {d.shipping_reference})
                            </p>
                        )}

                        <input
                            name="shippmentRef"
                            type="text"
                            placeholder="Shippment Reference Number"
                        />
                        <button>dispatched</button>
                        <br />
                        <br />
                        <button>payed</button>
                        <h5>Shipping Adress:</h5>
                        <p>
                            {d.first} {d.last}
                        </p>
                        <p>{d.adress}</p>
                        <p>
                            {d.zip} {d.city}
                        </p>
                    </Container>
                ))}
            </>
        );
    }
}

//onClick "dispatch()" and "payed()"
