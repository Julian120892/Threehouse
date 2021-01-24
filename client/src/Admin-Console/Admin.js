import { Component } from "react";
import axios from "../axios";
import styled from "styled-components";

const Container = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
`;

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidMount() {
        console.log("Admin.js mounted", this.state);
    }

    componentDidUpdate() {
        console.log("component updated");
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick() {
        let formData = new FormData();
        formData.append("image", this.state.undefined);
        this.add = null;
        this.pending = 1;

        axios
            .post("/product", this.state)
            .then(() => {
                console.log(this.state);
                axios.post("/upload", formData).then(() => {
                    console.log("added product");
                    this.setState({
                        error: false,
                    });
                });
                this.props.updateProductList();
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    error: true,
                });
            });
    }

    handleFileChange(e) {
        console.log("file changed");
        this.setState({
            [this.state.image]: e.target.files[0],
        });
    }

    render() {
        return (
            <Container>
                <h1>Admin-Console</h1>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="productName"
                    type="text"
                    placeholder="Product Name"
                    required
                />
                <br />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="productPrice"
                    type="number"
                    placeholder="Product Price"
                    required
                />
                <br />

                <textarea
                    onChange={(e) => this.handleChange(e)}
                    name="productDescription"
                    type="text"
                    placeholder="Product Description"
                    required
                />
                <br />

                <input
                    onChange={(e) => this.handleFileChange(e)}
                    type="file"
                    name="productPicture"
                    accept="image/*"
                    required
                />
                <br />

                {this.state.error && (
                    <span>Something went wrong, please try again.</span>
                )}
                <button onClick={() => this.handleClick()}>submit</button>
            </Container>
        );
    }
}
