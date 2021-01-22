import ReactDOM from "react-dom";
import App from "./App";
import AdminConsole from "./AdminConsole";

let elem;

if (location.pathname === "/admin") {
    elem = <AdminConsole />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
