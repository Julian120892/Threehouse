import { Component } from "react";
import ProductEditor from "./ProductEditor";
import Admin from "./Admin";
import Orders from "./Orders";
import axios from "../axios";
import styled from "styled-components";

const Container = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 25px;
    margin-bottom: 10px;
    flex-wrap: wrap;
`;

const Itemhalf = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
    margin-bottom: 10px;
    overflow-y: scroll;
    width: 40%;
    height: 500px;
    border: 1px dotted grey;
    margin: 20px;
`;

const Itemfull = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 25px;
    margin-bottom: 10px;
    width: 86%;
    height: 600px;
    border: 1px dotted grey;
`;

export default class AdminConsole extends Component {
    constructor() {
        super();
        this.state = {
            product: [],
        };
        this.getProducts = this.getProducts.bind(this);
        this.updateProductList = this.updateProductList.bind(this);
    }

    componentDidMount() {
        console.log("adminConsole mounted", this.state);
        this.getProducts();
    }

    componentDidUpdate() {
        console.log("component updated");
    }

    updateProductList() {
        console.log("update list");
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

    render() {
        return (
            <>
                <h1> - Admin Console</h1>
                <Container>
                    <Itemhalf>
                        <Admin updateProductList={this.updateProductList} />
                    </Itemhalf>
                    <Itemhalf>
                        <Orders />
                    </Itemhalf>
                    <Itemfull>
                        <ProductEditor
                            product={this.state.product}
                            updateProductList={this.updateProductList}
                        />
                    </Itemfull>
                </Container>
            </>
        );
    }
}
