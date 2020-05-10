import rootReducer from "./reducers";
import { createStore, compose } from "redux"

const STORE = createStore(rootReducer,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default STORE;
