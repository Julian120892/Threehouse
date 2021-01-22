import { Component } from "react";
import axios from "../axios";
import styled from "styled-components";

const Item = styled.div`
    background-color: lightblue;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
    font-size: 0.4rem;
    margin: 5px;
`;

const OuterContainer = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Container = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
`;

export default class ProductEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            editModeVisible: false,
        };
    }

    componentDidMount() {
        console.log("producteditor.js mounted", this.props);
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
        console.log("component updated");
    }

    handleClick() {
        let formData = new FormData();
        formData.append("image", this.state.undefined);
        this.add = null;
        this.pending = 1;

        let name;
        let price;
        let description;

        if (this.state.updateName == null) {
            name = this.state.product[[this.state.updateValues.updateId]]
                .product_name;
        } else {
            name = this.state.updateName;
        }
        if (this.state.updatePrice == null) {
            price = this.state.product[[this.state.updateValues.updateId]]
                .product_price;
        } else {
            price = this.state.updatePrice;
        }
        if (this.state.updateDescription == null) {
            description = this.state.product[[this.state.updateValues.updateId]]
                .product_description;
        } else {
            description = this.state.updateDescription;
        }

        let updateObj = {
            updateName: name,
            updatePrice: price,
            updateDescription: description,
            id: this.state.product[this.state.updateValues.updateId].id,
        };

        axios
            .post("/product/edit", { updateObj })
            .then(() => {
                console.log("updated profile");

                if (this.state.undefined) {
                    axios.post("/upload", formData).then(() => {
                        console.log("updated picture");
                        this.setState({
                            error: false,
                            newProduct: true,
                        });
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    error: true,
                });
            });
        this.getProducts();
        this.closeUploader();
    }

    editProduct(e) {
        this.setState({
            updateValues: {
                updateId: e.target.id,
                updateName: "",
                updatePrice: "",
                updateDescription: "",
            },
            editModeVisible: !this.state.editModeVisible,
        });
    }

    closeUploader() {
        console.log("close");
        this.setState({
            editModeVisible: !this.state.editModeVisible,
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleFileChange(e) {
        console.log("file changed");
        this.setState({
            [this.state.image]: e.target.files[0],
        });
    }

    deleteProduct() {
        let id = this.state.product[this.state.updateValues.updateId].id;
        axios.post("/product/delete", { id }).then(() => {
            console.log("product deleted with id: ", id);
            this.getProducts();
            this.closeUploader();
        });
    }

    render() {
        return (
            <>
                <hr />
                {this.state.editModeVisible && (
                    <>
                        <button
                            onClick={() => {
                                this.closeUploader();
                            }}
                        >
                            close
                        </button>
                        <h1>Update {this.state.updateValues.updateName}</h1>

                        <Container>
                            <h5>
                                Product_Id:
                                {
                                    this.state.product[
                                        this.state.updateValues.updateId
                                    ].id
                                }
                            </h5>
                            <button onClick={() => this.deleteProduct()}>
                                Delete
                            </button>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="updateName"
                                type="text"
                                placeholder={
                                    this.state.product[
                                        [this.state.updateValues.updateId]
                                    ].product_name
                                }
                                required
                            />
                            <br />
                            <input
                                onChange={(e) => this.handleChange(e)}
                                name="updatePrice"
                                type="number"
                                placeholder={
                                    this.state.product[
                                        [this.state.updateValues.updateId]
                                    ].product_price
                                }
                                required
                            />
                            <br />

                            <textarea
                                onChange={(e) => this.handleChange(e)}
                                name="updateDescription"
                                type="text"
                                placeholder={
                                    this.state.product[
                                        [this.state.updateValues.updateId]
                                    ].product_description
                                }
                                required
                            />
                            <br />

                            <input
                                onChange={(e) => this.handleFileChange(e)}
                                type="file"
                                name="updateProductPicture"
                                accept="image/*"
                                required
                            />
                            <br />

                            {this.state.error && (
                                <span>
                                    Something went wrong, please try again.
                                </span>
                            )}
                            <button onClick={() => this.handleClick()}>
                                submit
                            </button>
                        </Container>
                    </>
                )}
                <h1>Products</h1>
                <OuterContainer>
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
                                onClick={(e) => this.editProduct(e)}
                                id={index}
                            >
                                Edit
                            </button>
                        </Item>
                    ))}
                </OuterContainer>
            </>
        );
    }
}
