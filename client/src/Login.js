import { Component } from "react";
import axios from "./axios";

export default class Login extends Component {
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
            .post("/login", this.state)
            .then(() => {
                console.log("logged in");
                this.setState({
                    error: false,
                });
                this.props.changeLoginStatus();
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="login">
                    <h2>Login</h2>
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
                    {/* <Link to="/resetPassword">
                        Forgot your password? Click here
                    </Link> */}

                    {this.state.error && (
                        <span>Something went wrong, please try again.</span>
                    )}
                    <button onClick={() => this.handleClick()}>submit</button>
                    {/* <Link to="/">Not a user? Register here!</Link> */}
                </div>
            </div>
        );
    }
}
