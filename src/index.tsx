import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Auth0Provider
    domain="dev-eznktshy.us.auth0.com"
    clientId="xQ9cJnOypap7f1ZlnhK1sKyPRcNzzpYL"
    redirectUri={window.location.origin}
  >
    <App/>
    </Auth0Provider>
  </BrowserRouter>
);