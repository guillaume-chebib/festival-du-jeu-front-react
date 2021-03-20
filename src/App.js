import React from 'react';
import Navbar from "./components/navbar";
import Routes from "./components/routes";
import {BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from 'react-auth-kit'

const App = () => {

  return (
      <div className="App">
          <AuthProvider authStorageType = {'cookie'}
                        authStorageName={'_auth_t'}
                        authTimeStorageName={'_auth_time'}
                        stateStorageName={'_auth_state'}
                        cookieDomain={window.location.hostname}
                        cookieSecure={window.location.protocol === "https:"}
                        refreshTokenName={'_refresh_t'}>
              <Router>
                  <Navbar/>
                  <Routes/>
              </Router>
          </AuthProvider>
      </div>
  );

}

export default App;
