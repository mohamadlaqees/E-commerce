import { Badge, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import HeaderCounter from "@components/eCommerce/HeaderCounter/HeaderCounter";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import WishListLogo from "@assets/wishList.svg?react";
import CartLogo from "@assets/cart.svg?react";
import { numOfItems } from "@store/Cart/cartSlice";
import { logout } from "@store/Auth/authSlice";
import { useEffect } from "react";
import { getProductsByItems } from "@store/Cart/act/getProductsByItems";

const { headerContainer, headerLogo, headerLeftBar } = styles;

const Header = () => {
  const wishListTotalQuantity = useAppSelector(
    (state) => state.wishListSlice.itemsId.length
  );
  const cartTotalQuantity = useAppSelector(numOfItems);
  const { user, accessToken } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getProductsByItems({ type: "wishListIds" }));
      dispatch(getProductsByItems({ type: "cartListIds" }));
    }
  }, [dispatch, accessToken]);
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">eCom</Badge>
        </h1>
        <div className={headerLeftBar}>
          <HeaderCounter
            path="wishList"
            totalQuantity={wishListTotalQuantity}
            Icon={<WishListLogo />}
          />
          <HeaderCounter
            path="cart"
            totalQuantity={cartTotalQuantity}
            Icon={<CartLogo />}
          />
        </div>
      </div>

      <div>
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          bg="dark"
          data-bs-theme="dark"
        >
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to={"/"}>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to={"categories"}>
                  Categories
                </Nav.Link>
                <Nav.Link as={NavLink} to={"aboutUs"}>
                  About Us
                </Nav.Link>
              </Nav>
              <Nav>
                {!accessToken ? (
                  <>
                    <Nav.Link as={NavLink} to={"signIn"}>
                      Sign In
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"signUp"}>
                      Sign Up
                    </Nav.Link>
                  </>
                ) : (
                  <NavDropdown
                    title={`welcome : ${user?.firstName} ${user?.lastName}`}
                  >
                    <NavDropdown.Item as={NavLink} to={"profile"} end>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={"profile/orders"}>
                      Orders{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={NavLink}
                      to={"/"}
                      onClick={logOutHandler}
                    >
                      Log out{" "}
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
