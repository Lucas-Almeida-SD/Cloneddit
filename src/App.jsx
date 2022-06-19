import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "./context/Provider";
import { Home } from "./pages/Home";
import { MyPosts } from "./pages/MyPosts";


function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path={'/my-posts'} component={ MyPosts } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
