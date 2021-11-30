import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/postsList/PostsList";
import Product from "./pages/posts/Posts";
import NewProduct from "./pages/newPost/NewPost";


import AuroraHome from "./pages/AURORA--WEBSITE/home/AuroraHome";

import PrivateRoute from './components/auth/PrivateRoute';
import Login from "./components/auth/Login";
import Auth from "./components/auth/Auth";

import BooksList from "./pages/booking/BooksList";
import NewBook from "./pages/booking/NewBook";
import Reservations from "./pages/reservations/Reservations";

const App = () => {
  return (
    <Router>
        {/* Admin dashboard */}
        <Switch>
          <Auth component={Login} path="/login"/>

          <PrivateRoute path="/admin" component={Home}/>

          <PrivateRoute path="/users" component={UserList}/>
          <PrivateRoute path="/user/:id" component={User}/>
          <PrivateRoute path="/new-user" component={NewUser}/>

          <PrivateRoute path="/programs" component={ProductList}/>
          <PrivateRoute path="/program/:programId" component={Product}/>
          <PrivateRoute path="/new-program" component={NewProduct}/>

          <PrivateRoute path="/books" component={BooksList}/>
          <PrivateRoute path="/new-book" component={NewBook}/>

          <PrivateRoute path="/reservations" component={Reservations}/>

          {/* Website */}

          <Route path="/" component={AuroraHome}/>
        </Switch>
    </Router>
  );
}

export default App;
