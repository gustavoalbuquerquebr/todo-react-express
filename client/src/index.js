import React from 'react';
import ReactDOM from 'react-dom';

import Container from "./components/Container";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));