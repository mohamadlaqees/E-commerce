import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <Row>
      <Col md={3}>
        <ListGroup>
          <ListGroupItem as={NavLink} to={""} end>
            Account Info
          </ListGroupItem>
          <ListGroupItem as={NavLink} to={"orders"}>
            Orders
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};

export default ProfileLayout;
