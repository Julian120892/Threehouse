import ReactDOM from "react-dom";
import App from "./app";
import AdminConsole from "./Admin-Console/AdminConsole";

//Redux
import AdminConsoleRedux from "./Admin-Console/AdminConsoleRedux";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname === "/admin") {
    elem = <AdminConsole />;
} else if (location.pathname === "/adminRedux") {
    elem = (
        <Provider store={store}>
            <AdminConsoleRedux />
        </Provider>
    );
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
