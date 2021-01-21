import ReactDOM from "react-dom";
import App from "./App";
import Admin from "./Admin";

let elem;

if (location.pathname === "/admin") {
    elem = <Admin />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
