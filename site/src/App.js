import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import IndexPage from './pages/IndexPage';



function App() {
  return (
    <Router >
      <Fragment>
        <Route exact path="/" component={IndexPage}/>
      </Fragment>
    </Router>
  );
}

export default App;
