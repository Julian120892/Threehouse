import { Component } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Admin extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    componentDidMount() {
        console.log("Admin.js mounted");
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick() {
        console.log(this.state);
        let formData = new FormData();
        formData.append("image", this.state.undefined);
        this.add = null;
        this.pending = 1;

        axios
            .post("/product", this.state)
            .then(() => {
                axios.post("/upload", formData).then(() => {
                    console.log("logged in");
                    this.setState({
                        error: false,
                    });
                });
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
            <>
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
            </>
        );
    }
}
