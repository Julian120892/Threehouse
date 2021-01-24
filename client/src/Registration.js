import { Component } from "react";
import axios from "./axios";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick() {
        axios
            .post("/registration", this.state)
            .then(() => {
                this.setState({
                    error: false,
                });
                this.props.changeLoginStatus();
            })
            .catch((err) => {
                console.log("error in /registration post request", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="registration">
                    <h2>Registration</h2>

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                        required
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    {this.state.error && (
                        <span>Something went wrong, please try again.</span>
                    )}

                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            </div>
        );
    }
}
