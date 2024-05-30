import { TGrid } from "@util/types";
import { Col, Row } from "react-bootstrap";

const GridList = <T extends { id: number }>({ data, renderItem }: TGrid<T>) => {
  const List = data.map((item) => (
    <Col
      xs={6}
      md={3}
      key={item.id}
      className="d-flex justify-content-center mb-5 mt-2"
    >
      {renderItem(item)}
    </Col>
  ));
  return <Row>{List}</Row>;
};

export default GridList;
