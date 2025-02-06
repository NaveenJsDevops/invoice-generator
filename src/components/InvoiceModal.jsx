import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toWords } from "number-to-words";

const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture"), {
    useCORS: true,
    scale: 2,
    backgroundColor: "white",
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );
    pdf.save("invoice.pdf");
  });
};

const InvoiceModal = ({
  showModal,
  closeModal,
  info,
  items,
  currency,
  cgstRate,
  sgstRate,
  total,
  roundOff,
  discountAmount,
  discountRate,
  taxAmount,
  subTotal,
}) => {
  console.log("Items:", items);
  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div id="invoiceCapture" className="a4-container">
          {/* Header Section */}
          <div
            className="header-section"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h3 className="fw-bold" style={{ color: "red" }}>
              {info.billFrom}
            </h3>
            <p>{info.billFromAddress}</p>
            <small>
              Email : {info.billFromEmail} &nbsp;&nbsp; Phone :{" "}
              {info.billFromPhone}
            </small>
            <small>
              PAN : {info.billFromPan} &nbsp;&nbsp; GST : {info.billFromGST}
            </small>
          </div>

          <div className="invoice-title" style={{ marginTop: "-6px" }}>
            GST INVOICE
          </div>
          {/* Billing Details */}
          <div
            style={{
              marginTop: "-11px",
              marginLeft: "11.5px",
              marginRight: "10.5px",
            }}
          >
            <Row className="billing-section">
              <Col
                md={8}
                className="billing-left"
                style={{
                  borderRight: "1px solid black",
                  paddingRight: "20px",
                }}
              >
                <h6 className="fw-bold" style={{ marginBottom: "2px" }}>
                  To:
                </h6>
                <p style={{ marginBottom: "2px", marginLeft: "15px" }}>
                  {info.billTo}
                </p>
                <p style={{ marginBottom: "2px", marginLeft: "15px" }}>
                  {info.billToAddress}
                </p>
                <p style={{ marginBottom: "0px", marginLeft: "15px" }}>
                  <strong>GST:</strong> {info.billToGST}
                </p>
              </Col>
              <Col
                md={4}
                className="billing-right"
                style={{ paddingLeft: "15px" }}
              >
                <p style={{ marginBottom: "6px" }}>
                  <strong>Bill No:</strong> {info.invoiceNumber}
                </p>
                <p style={{ marginBottom: "6px" }}>
                  <strong>Date:</strong> {info.dateOfIssue}
                </p>
                <p style={{ marginBottom: "6px" }}>
                  <strong>HSN:</strong> {info.billHSN}
                </p>
              </Col>
            </Row>
          </div>
          {/* Table Section */}
          <div
            style={{
              width: "100%",
              border: "1px black",
              marginBottom: "0px",
              marginTop: "-5px",
              padding: "0px",
            }}
          >
            <Table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
                tableLayout: "fixed",
                margin: "0px",
              }}
            >
              {/* Table Header */}
              <thead>
                <tr style={{ background: "#f1f1f1" }}>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    Our DC No
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    Cus DC No
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "none",
                    }}
                  >
                    Colour
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    Rolls
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    Weight
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    Rate
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {[...Array(15)].map((_, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid white" }}>
                    {" "}
                    {/* Set row separator to white */}
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      }}
                    >
                      {items[i]?.ourDcNo}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      }}
                    >
                      {items[i]?.cuDcNo}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      }}
                    >
                      {items[i]?.colour}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      }}
                    >
                      {items[i]?.rolls}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      }}
                    >
                      {items[i]?.weight}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      }}
                    >
                      {items[i]?.price}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      }}
                    >
                      {items[i]?.weight && items[i]?.price
                        ? (items[i]?.weight * items[i]?.price).toFixed(2)
                        : ""}{" "}
                      {/* Leave it empty if any of the values are missing */}
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Total Row */}
              <tfoot>
                <tr style={{ fontWeight: "bold", background: "#f1f1f1" }}>
                  <td
                    colSpan="3"
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontSize: "14px",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    Total:
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    {items.reduce(
                      (total, item) => total + (parseFloat(item.rolls) || 0),
                      0
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    {items.reduce(
                      (total, item) => total + (parseFloat(item.weight) || 0),
                      0
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    {items.reduce(
                      (total, item) => total + (parseFloat(item.price) || 0),
                      0
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                    }}
                  >
                    {items.reduce(
                      (total, item) => total + (parseFloat(subTotal) || 0),
                      0
                    )}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>

          {/* Bank Details & Summary Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: "-1px",
              padding: "15px",
              border: "1px solid black",
            }}
          >
            {/* Left Section - Bank Details */}
            <div
              style={{ width: "50%", paddingRight: "20px", lineHeight: "1.2" }}
            >
              <h6
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  marginBottom: "5px",
                }}
              >
                BANK DETAILS
              </h6>
              <table
                style={{
                  fontSize: "12px",
                  width: "50%",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        paddingRight: "5px",
                      }}
                    >
                      Bank
                    </td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{info.bank}</td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        paddingRight: "5px",
                      }}
                    >
                      A/c No
                    </td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{info.accountNo}</td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        paddingRight: "5px",
                      }}
                    >
                      IFSC
                    </td>
                    <td>:</td>
                    <td style={{ textAlign: "left" }}>{info.ifsc}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Section - Amount Summary */}
            <div style={{ width: "30%", fontSize: "12px", lineHeight: "1.4" }}>
              <table
                style={{
                  fontSize: "12px",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  <tr
                    style={{
                      borderBottom: "1px dashed #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <td style={{ textAlign: "left", padding: "2px 0" }}>
                      Sub-Total
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {currency} {subTotal || 0}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px dashed #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <td style={{ textAlign: "left", padding: "2px 0" }}>
                      Discount: ({discountRate || 0}%)
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {currency} {discountAmount}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px dashed #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <td style={{ textAlign: "left", padding: "2px 0" }}>
                      CGST ({cgstRate || 0}%)
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {currency} {((cgstRate * subTotal) / 100).toFixed(2)}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px dashed #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <td style={{ textAlign: "left", padding: "2px 0" }}>
                      SGST ({sgstRate || 0}%)
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {currency} {((sgstRate * subTotal) / 100).toFixed(2)}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px dashed #ccc",
                      fontSize: "12px",
                    }}
                  >
                    <td style={{ textAlign: "left", padding: "2px 0" }}>
                      Round off
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {currency} {roundOff || 0}
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderTop: "2px solid black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      paddingTop: "8px",
                    }}
                  >
                    <td style={{ textAlign: "left", padding: "2px 0" }}>
                      Total
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {currency} {total || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Net Amount in Words Section */}
          {total > 0 ? (
            <p
              style={{ margin: "0", padding: "0", textTransform: "capitalize" }}
            >
              <strong>Rupees {toWords(total)} Only</strong>
            </p>
          ) : (
            <p
              style={{ margin: "0", padding: "0", textTransform: "capitalize" }}
            >
              <strong> </strong>
            </p>
          )}

          {/*Declaration */}
          <div style={{ marginTop: "-6px", border: "1px solid black" }}>
            <p
              style={{
                textDecoration: "underline",
                fontSize: "12px",
                display: "block",
                paddingLeft: "10px",
                marginBottom: "1px",
                fontWeight: "bold",
              }}
            >
              Declaration:
            </p>
            <ul
              style={{
                fontSize: "10px",
                marginBottom: "2px",
                paddingLeft: "16px",
                paddingTop: "1px",
                listStyleType: "disc",
              }}
            >
              {info.declaration}
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div
            className="terms-section"
            style={{ marginTop: "-1px", marginBottom: "2px" }}
          >
            <div>
              <h6
                style={{
                  textDecoration: "underline",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginTop: "-10px",
                  marginBottom: "5px" /* Reduced margin-bottom */,
                }}
              >
                Terms & Conditions:
              </h6>
              <ul
                style={{
                  fontSize: "10px",
                  marginBottom: "2px",
                  paddingBottom: "0",
                }}
              >
                {info.terms.split("\n").map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
            <div
              style={{
                textAlign: "right",
                fontSize: "12px",
                marginTop: "-10px",
                paddingLeft: "40px",
                paddingTop: "60px" /* Reduced padding */,
              }}
            >
              <p style={{ fontSize: "8px", marginBottom: "0" }}>
                Received (Seal and Sign)
              </p>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginBottom: "0",
              }}
            >
              <p style={{ marginBottom: "0" }}>
                For <strong>{info.billFrom}</strong>
              </p>
              <p
                style={{
                  fontSize: "8px",
                  marginBottom: "0",
                  paddingTop: "30px",
                }}
              >
                Authorized Signatory
              </p>
            </div>
          </div>
        </div>
        {/* Download Button */}
        <div className="button-container">
          <Button
            variant="primary"
            onClick={GenerateInvoice}
            className="download-btn"
          >
            <BiCloudDownload className="me-2" /> Download Invoice
          </Button>
        </div>

        {/* A4 Styling */}
        <style>
          {`
                .a4-container {
                    width: 212mm; 
                    height: 297mm; 
                    padding: 20px; 
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                    border: 1px solid black;
                }

                .header-section, .invoice-title, .billing-section, .invoice-table, .summary-section, .amount-words, .terms-section {
                    border: 1px solid black;
                    padding: 10px;
                    margin-bottom: 5px;
                }

                .invoice-title {
                    text-align: center;
                    font-weight: bold;
                    font-size: 18px;
                    padding: 5px;
                    border-top: 1px solid black;
                    border-bottom: 1px solid black;
                    margin: 10px 0;
                }

                .billing-section {
                    display: flex;
                    justify-content: space-between;
                }

                .invoice-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .invoice-table th, .invoice-table td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                    font-size: 12px;
                }

                .summary-section {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    padding: 10px;
                }

                .bank-details h6 {
                    text-decoration: underline;
                }

                .amount-summary {
                    text-align: right;
                }
                .amount-summary div {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
                .total {
                    font-size: 16px;
                    border-top: 1px solid black;
                    padding-top: 5px;
                }

                .amount-words {
                    text-align: left;
                    border: 1px solid black;
                    padding: 3px; /* Reduced padding */
                    font-size: 12px;
                    margin-top: 2px; /* Reduced top margin */
                    margin-bottom: 2px; /* Reduced bottom margin */
                }


                .terms-section {
                    display: flex;
                    justify-content: space-between;
                    border: 1px solid black;
                    padding: 10px;
                    margin-top: 10px;
                }
                .signature {
                    
                    font-weight: bold;
                }
                .button-container {
                    margin-top: 10px;
                    text-align: center;
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background 0.3s ease-in-out;
                    &:hover {
                        background: #e2e2e2;
                    }
                    .download-btn {
                        background: #3498db;
                        color: white;
                    }
                    .me-2 {
                        margin-right: 5px;
                    }
                }
                
            `}
        </style>
      </Modal>
    </div>
  );
};
export default InvoiceModal;
