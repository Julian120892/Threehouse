import { Component } from "react";
import Login from "./Login";
import Registration from "./Registration";

import axios from "./axios";

export default class LoginAndRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false,
            userWantsToLogIn: "registration",
        };
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
    }

    componentDidMount() {
        console.log("registration mounted");
        this.userLoggedIn();
    }

    changeLoginMode(mode) {
        console.log("change");
        this.setState({
            userWantsToLogIn: mode,
        });
    }

    userLoggedIn() {
        axios.get("/userLoggedIn").then((res) => {
            if (res.data.loggedin == true) {
                this.setState({
                    userLoggedIn: true,
                });
            } else {
                this.setState({
                    userLoggedIn: false,
                });
            }
        });
    }

    logout() {
        axios.post("/logout").then(() => {
            this.setState({
                userLoggedIn: false,
            });
        });
    }

    changeLoginStatus() {
        console.log("changed status");
        this.setState({
            userLoggedIn: true,
        });
    }

    render() {
        if (this.state.userLoggedIn) {
            return (
                <>
                    <h1>You are logged in now.</h1>
                    <button className="btn-2" onClick={() => this.logout()}>
                        LOG OUT
                    </button>
                </>
            );
        } else {
            if (this.state.userWantsToLogIn == "login") {
                return (
                    <>
                        <Login
                            changeLoginStatus={this.changeLoginStatus}
                        ></Login>

                        <p
                            className="link"
                            onClick={() => this.changeLoginMode("registration")}
                        >
                            Not a Customer, register here.
                        </p>
                    </>
                );
            } else {
                return (
                    <>
                        <Registration
                            changeLoginStatus={this.changeLoginStatus}
                        />
                        <p
                            className="link"
                            onClick={() => this.changeLoginMode("login")}
                        >
                            Already a Customer, login here.
                        </p>
                    </>
                );
            }
        }
    }
}
