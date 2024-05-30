import { TOrderItem } from "@util/types";
import { Table } from "react-bootstrap";

const OrderTable = ({
  orderList,
  viewDetailHandler,
}: {
  orderList: TOrderItem[];
  viewDetailHandler: (id: number) => void;
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Items</th>
          <th>Total price</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((el) => (
          <tr key={el.id}>
            <td>#{el.id}</td>
            <td>
              {el.items.length} items '/'
              <span
                onClick={() => viewDetailHandler(el.id)}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {" "}
                Product details
              </span>
            </td>
            <td>{el.subTotal.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;
