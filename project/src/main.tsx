import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { lazy } from "react";
import { getProducts } from "@pages/Products";
import MainLayout from "@layouts/MainLayout/MainLayout";
import { loadCategories } from "@pages/Categories";
import Error from "@pages/Error";
import SuspensePage from "@components/feedback/SuspensePage/SuspensePage";
import { authRegister } from "@pages/SignUp";
import { authLogin } from "@pages/SignIn/SignIn";
import ProtectedRoutes from "@components/Auth/ProtectedRoutes";
import ProfileLayout from "@layouts/ProfileLayout/ProfileLayout";
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const WishList = lazy(() => import("@pages/WishList"));
const Cart = lazy(() => import("@pages/Cart"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const SignIn = lazy(() => import("@pages/SignIn/SignIn"));
const SignUp = lazy(() => import("@pages/SignUp"));
const Profile = lazy(() => import("@pages/Profile"));
const Orders = lazy(() => import("@pages/Orders"));

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SuspensePage children={<Home />} type="cartLoading" />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <SuspensePage children={<Cart />} type="cartLoading" />
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoutes>
            <SuspensePage children={<WishList />} type="cartLoading" />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        loader: loadCategories,
        element: <SuspensePage children={<Categories />} type="cartLoading" />,
      },
      {
        path: "products/:prefix",
        loader: getProducts,
        element: <SuspensePage children={<Products />} type="cartLoading" />,
      },
      {
        path: "aboutUs",
        element: <SuspensePage children={<AboutUs />} type="cartLoading" />,
      },
      {
        path: "signIn",
        action: authLogin,
        element: <SuspensePage children={<SignIn />} type="cartLoading" />,
      },
      {
        path: "signUp",
        action: authRegister,
        element: <SuspensePage children={<SignUp />} type="cartLoading" />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <ProfileLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <SuspensePage children={<Profile />} type="cartLoading" />,
          },
          {
            path: "orders",
            element: <SuspensePage children={<Orders />} type="cartLoading" />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);
