import ProductList from "./features/productlist/ProductList";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import NotFoundPage from "./features/404NotFound/NotFoundPage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <ProductList />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegisterPage />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
