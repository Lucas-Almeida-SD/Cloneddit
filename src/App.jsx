import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "./context/Provider";
import { Home } from "./pages/Home";


function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </Provider>
      
  );
}

export default App;
