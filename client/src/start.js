import ReactDOM from "react-dom";
import App from "./app";
import AdminConsole from "./Admin-Console/AdminConsole";

let elem;

if (location.pathname === "/admin") {
    elem = <AdminConsole />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
