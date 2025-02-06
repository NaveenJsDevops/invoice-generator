import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItem = ({
  items,
  onItemizedItemEdit,
  currency,
  onRowDel,
  onRowAdd,
}) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th className="text-center">Our Dc No</th>
            <th className="text-center">Cus Dc No</th>
            <th className="text-center">Colour</th>
            <th className="text-center">Rolls</th>
            <th className="text-center">Weight</th>
            <th className="text-center">Rate</th>
            <th className="text-center">Amount</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={onRowDel}
              currency={currency}
            />
          ))}
        </tbody>
      </Table>
      <Button className="fw-bold btn-secondary" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, onDelEvent, currency }) => {
  const handleDelete = () => {
    onDelEvent(item);
  };

  return (
    <tr>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "textarea",
            name: "ourDcNo",
            placeholder: "eg: 234-242-20",
            value: item.ourDcNo,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "textarea",
            name: "cuDcNo",
            placeholder: "eg: 322-235-22",
            value: item.cuDcNo,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "colour",
            placeholder: "eg: Black",
            value: item.colour,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "rolls",
            min: 1,
            step: "1",
            placeholder: "1",
            value: item.rolls,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "weight",
            min: 1,
            step: "1",
            placeholder: "1",
            value: item.weight,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            placeholder: "1.00",
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "totalPrice",
            value: (item.weight * item.price).toFixed(2), // Recalculate totalPrice dynamically
            id: item.id,
            readOnly: true,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={handleDelete}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
