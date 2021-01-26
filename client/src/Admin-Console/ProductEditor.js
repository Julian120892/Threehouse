import { Component } from "react";
import axios from "../axios";
import styled from "styled-components";

const Item = styled.div`
    background-color: ghostwhite;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
    font-size: 0.8rem;
    margin: 5px;
    width: 80%;
`;

const Container = styled.div`
    background: white;
    display: flex;
    padding: 25px;
    width: 100%;
    // flex-wrap: wrap;
`;

const InnerContainer = styled.div`
    background: white;
    display: flex;
    align-items: flex-start;
    padding: 25px;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: column;
    border: 1px solid grey;
`;

const ProductContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
    width: 80%;
    flex-direction: column;
    overflow-y: scroll;
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
        this.props.updateProductList();
    }

    componentDidUpdate() {
        console.log("component updated", this.props);
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
            name = this.props.product[[this.state.updateValues.updateId]]
                .product_name;
        } else {
            name = this.state.updateName;
        }
        if (this.state.updatePrice == null) {
            price = this.props.product[[this.state.updateValues.updateId]]
                .product_price;
        } else {
            price = this.state.updatePrice;
        }
        if (this.state.updateDescription == null) {
            description = this.props.product[[this.state.updateValues.updateId]]
                .product_description;
        } else {
            description = this.state.updateDescription;
        }

        let updateObj = {
            updateName: name,
            updatePrice: price,
            updateDescription: description,
            id: this.props.product[this.state.updateValues.updateId].id,
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
        this.props.updateProductList();
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
        let id = this.props.product[this.state.updateValues.updateId].id;
        let url = this.props.product[this.state.updateValues.updateId]
            .product_picture;
        axios.post("/product/delete", { params: { id, url } }).then(() => {
            console.log("product deleted with id: ", id);
            this.props.updateProductList();
            this.closeUploader();
        });
    }

    render() {
        return (
            <ProductContainer>
                <Container>
                    {this.props.product.map((d, index) => (
                        <Item key={index}>
                            <div>
                                <img
                                    src={d.product_picture}
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div>
                                <h1>{d.product_name}</h1>
                                <h2>{d.product_price}</h2>
                                <h3>Id: {d.id}</h3>
                                <p>{d.product_description}</p>
                                <button
                                    onClick={(e) => this.editProduct(e)}
                                    id={index}
                                >
                                    Edit
                                </button>
                            </div>
                        </Item>
                    ))}
                </Container>
                {this.state.editModeVisible && (
                    <>
                        <Container>
                            <InnerContainer>
                                <h1>
                                    Update {this.state.updateValues.updateName}
                                </h1>
                                <h5>
                                    Product_Id:
                                    {
                                        this.props.product[
                                            this.state.updateValues.updateId
                                        ].id
                                    }
                                </h5>

                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    name="updateName"
                                    type="text"
                                    defaultValue={
                                        this.props.product[
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
                                    defaultValue={
                                        this.props.product[
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
                                    defaultValue={
                                        this.props.product[
                                            [this.state.updateValues.updateId]
                                        ].product_description
                                    }
                                    required
                                />
                                <br />

                                <a
                                    src={
                                        this.props.product[
                                            [this.state.updateValues.updateId]
                                        ].product_picture
                                    }
                                >
                                    current Picture Url:
                                    <br />
                                    {
                                        this.props.product[
                                            [this.state.updateValues.updateId]
                                        ].product_picture
                                    }
                                </a>
                                <br />
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

                                <div>
                                    <button onClick={() => this.handleClick()}>
                                        Submit
                                    </button>

                                    <button
                                        onClick={() => this.deleteProduct()}
                                    >
                                        Delete Product
                                    </button>
                                    <button
                                        onClick={() => {
                                            this.closeUploader();
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </InnerContainer>
                        </Container>
                    </>
                )}
            </ProductContainer>
        );
    }
}
