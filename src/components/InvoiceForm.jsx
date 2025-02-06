import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("₹");
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [billHSN, setHSN] = useState(1);
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billToGST, setBillToGST] = useState("");
  const [billFromPhone, setBillFromPhone] = useState("7373592138");
  const [billFromPan, setBillFromPan] = useState("CCWPJ9226R");
  const [billFrom, setBillFrom] = useState("Power Plus Bleaching");
  const [billFromEmail, setBillFromEmail] = useState("demo@gmail.com");
  const [billFromAddress, setBillFromAddress] = useState(
    "Karnayan thottam ,Poomalur village, Tiruppur, Tamil Nadu 641663"
  );
  const [billFromGST, setBillFromGST] = useState("12345678RTGGFD");
  const [bank, setBank] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIFSC] = useState("");

  // const [billFromLogo, setBillFromLogo] = useState("");
  const [declaration, setDeclaration] = useState(
    "I hereby declare that the details provided above, including price and quantity, are accurate to the best of my knowledge and belief."
  );
  const [terms, setTerms] = useState(
    "All disputes are subject to TIRUPUR Jurisdiction only.\nInterest @24% will be charged on overdue bills.\nComplaints, if any, should be received in writing within 10 days from the receipt of the materials."
  );

  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [totalRoll, setTotalRoll] = useState("0.00");
  const [totalWeight, setTotalWeight] = useState("0.00");
  const [totalRate, setTotalRate] = useState("0.00");
  const [cgstRate, setCgstRate] = useState("");
  const [sgstRate, setSgstRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");
  const [roundOff, setRoundOff] = useState(0);

  const [items, setItems] = useState([
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      ourDcNo: "",
      cuDcNo: "",
      colour: "",
      rolls: "",
      weight: "",
      price: "",
      totalPrice: "",
    },
  ]);
  const handleCalculateTotal = useCallback(() => {
    let totalRoll = items.reduce(
      (acc, item) => acc + parseFloat(item.rolls || 0),
      0
    );
    setTotalRoll(totalRoll);

    let totalWeight = items
      .reduce((acc, item) => acc + parseFloat(item.weight || 0), 0)
      .toFixed(2);
    setTotalWeight(totalWeight);

    let totalRate = items
      .reduce((acc, item) => acc + parseFloat(item.price || 0), 0)
      .toFixed(2);
    setTotalRate(totalRate);

    let newSubTotal = items
      .reduce((acc, item) => acc + parseFloat(item.weight * item.price || 0), 0)
      .toFixed(2);

    let cgstAmount = (newSubTotal * (cgstRate / 100) || 0).toFixed(2);
    let sgstAmount = (newSubTotal * (sgstRate / 100) || 0).toFixed(2);
    let totalTaxAmount = (
      parseFloat(cgstAmount) + parseFloat(sgstAmount)
    ).toFixed(2);

    let newDiscountAmount = (newSubTotal * (discountRate / 100) || 0).toFixed(
      2
    );
    let newRoundOff = roundOff ? parseFloat(roundOff) : 0; // Ensure it's treated as a number

    let newTotal = (
      parseFloat(newSubTotal) -
      parseFloat(newDiscountAmount) +
      parseFloat(totalTaxAmount) +
      newRoundOff
    ).toFixed(2);

    setSubTotal(newSubTotal);
    setTaxAmount(totalTaxAmount);
    setDiscountAmount(newDiscountAmount);
    setTotal(newTotal);
  }, [items, cgstRate, sgstRate, discountRate, roundOff]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      ourDcNo: "",
      cuDcNo: "",
      colour: "",
      rolls: "",
      weight: "",
      price: "",
      totalPrice: "",
    };
    setItems([...items, newItem]);
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;

    console.log(id, name, value);

    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [dateOfIssue, setDateOfIssue] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date :&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <br></br>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">
                    Bill&nbsp;Date&nbsp;:&nbsp;
                  </span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={handleChange(setDateOfIssue)}
                    style={{ maxWidth: "150px" }}
                    required
                  />
                </div>
                <br></br>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">HSN :</span>
                  <Form.Control
                    type="number"
                    value={billHSN}
                    name="billHSN"
                    onChange={handleChange(setHSN)}
                    min="1"
                    style={{ maxWidth: "70px" }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Bill&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={handleChange(setInvoiceNumber)}
                  min="1"
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="d-flex flex-column gap-2">
              <span className="fw-bold me-2" style={{ fontSize: "18px" }}>
                Bank Details :&nbsp;
              </span>
              <div className="d-flex align-items-center">
                <Form.Label
                  className="fw-bold me-2"
                  htmlFor="bank"
                  style={{ width: "70px" }} // fixed width for uniform alignment
                >
                  Bank :
                </Form.Label>
                <Form.Control
                  type="text"
                  id="bank"
                  placeholder="Enter Bank"
                  value={bank}
                  name="bank"
                  onChange={handleChange(setBank)}
                  required
                  style={{ width: "200px" }} // adjust input width as needed
                />
              </div>

              <div className="d-flex align-items-center">
                <Form.Label
                  className="fw-bold me-2"
                  htmlFor="accountNo"
                  style={{ width: "70px" }}
                >
                  A/C No :
                </Form.Label>
                <Form.Control
                  type="text"
                  inputMode="numeric"
                  id="accountNo"
                  placeholder="Enter Account Number"
                  value={accountNo}
                  name="accountNo"
                  onChange={handleChange(setAccountNo)}
                  required
                  style={{ width: "200px" }}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/\D/g, ""))
                  } // Removes non-numeric characters
                />
              </div>

              <div className="d-flex align-items-center">
                <Form.Label
                  className="fw-bold me-2"
                  htmlFor="ifsc"
                  style={{ width: "70px" }}
                >
                  IFSC :
                </Form.Label>
                <Form.Control
                  type="text"
                  id="ifsc"
                  placeholder="Enter IFSC"
                  value={ifsc}
                  name="ifsc"
                  onChange={handleChange(setIFSC)}
                  required
                  style={{ width: "200px" }}
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold" style={{ fontSize: "18px" }}>
                  From :
                </Form.Label>
                <Form.Control
                  placeholder="Who is this invoice from?"
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={handleChange(setBillFrom)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Email address"
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={handleChange(setBillFromEmail)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="Biller address"
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillFromAddress)}
                  required
                />
                <Form.Control
                  placeholder="GST"
                  value={billFromGST}
                  type="text"
                  name="billFromGST"
                  className="my-2"
                  onChange={handleChange(setBillFromGST)}
                  autoComplete="gst"
                  required
                />
                <Form.Control
                  placeholder="Pan"
                  value={billFromPan}
                  type="text"
                  name="billFromPan"
                  className="my-2"
                  onChange={handleChange(setBillFromPan)}
                  autoComplete="pan"
                  required
                />
                <Form.Control
                  placeholder="Phone"
                  value={billFromPhone}
                  type="text"
                  name="billFromPhone"
                  className="my-2"
                  onChange={handleChange(setBillFromPhone)}
                  autoComplete="phone"
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold" style={{ fontSize: "18px" }}>
                  To :
                </Form.Label>
                <Form.Control
                  placeholder="Who is this invoice to?"
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={handleChange(setBillTo)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Email address"
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={handleChange(setBillToEmail)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="Billing address"
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={handleChange(setBillToAddress)}
                  required
                />
                <Form.Control
                  placeholder="GST"
                  value={billToGST}
                  type="text"
                  name="billToGST"
                  className="my-2"
                  autoComplete="gst"
                  onChange={handleChange(setBillToGST)}
                  required
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-column gap-3">
                  {/* Total Rolls */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total Rolls:</span>
                    <span>{totalRoll}</span>
                  </div>

                  {/* Total Weight */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total Weight:</span>
                    <span>{totalWeight}</span>
                  </div>

                  {/* SubTotal */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">SubTotal:</span>
                    <span>
                      {currency}
                      {subTotal}
                    </span>
                  </div>

                  {/* Discount */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small">({discountRate || 0}%)</span>{" "}
                      {currency}
                      {discountAmount || 0}
                    </span>
                  </div>

                  {/* CGST */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">CGST:</span>
                    <span>
                      <span className="small">({cgstRate || 0}%)</span>{" "}
                      {currency}
                      {(subTotal * (cgstRate / 100) || 0).toFixed(2)}
                    </span>
                  </div>

                  {/* SGST */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">SGST:</span>
                    <span>
                      <span className="small">({sgstRate || 0}%)</span>{" "}
                      {currency}
                      {(subTotal * (sgstRate / 100) || 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Total Tax */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total Tax:</span>
                    <span>
                      <span className="small">
                        ({parseFloat(cgstRate || 0) + parseFloat(sgstRate || 0)}
                        %)
                      </span>{" "}
                      {currency}
                      {taxAmount || 0}
                    </span>
                  </div>

                  {/* Round-Off */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Round Off:</span>
                    <div className="input-group" style={{ maxWidth: "120px" }}>
                      <span className="input-group-text">₹</span>
                      <input
                        type="number"
                        value={roundOff}
                        onChange={(e) =>
                          setRoundOff(parseFloat(e.target.value))
                        }
                        className="form-control text-end"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Net Amount */}
                  <hr />
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ fontSize: "1.125rem" }}
                  >
                    <span className="fw-bold">Net Amount:</span>
                    <span className="fw-bold">
                      {currency}
                      {total || 0}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <hr className="my-4" />
            <Form.Label className="fw-bold" style={{ fontSize: "18px" }}>
              Declaration:
            </Form.Label>
            <Form.Control
              placeholder="I hereby declare that the details provided above, including price and quantity, are accurate to the best of my knowledge and belief."
              name="declaration"
              value={declaration}
              onChange={handleChange(setDeclaration)}
              as="textarea"
              className="my-2"
              rows={1}
            />
            <Form.Label className="fw-bold" style={{ fontSize: "18px" }}>
              {" "}
              Terms & Conditions :
            </Form.Label>
            <Form.Control
              placeholder="All disputes are subject to TIRUPUR Jurisdiction only.\nInterest @24% will be charged on overdue bills.\nComplaints, if any, should be received in writing within 10 days from the receipt of the materials."
              name="Terms"
              value={terms}
              onChange={handleChange(setTerms)}
              as="textarea"
              className="my-2"
              rows={4}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            {console.log("InvoiceModal Props:", {
              showModal: isOpen,
              closeModal: closeModal,
              info: {
                dateOfIssue,
                invoiceNumber,
                billTo,
                billToEmail,
                billToAddress,
                billToGST,
                billFrom,
                billFromEmail,
                billFromAddress,
                billFromGST,
                billFromPan,
                billFromPhone,
                declaration,
                terms,
                bank,
                accountNo,
                ifsc,
                billHSN,
              },
              items, // This is what we are focusing on
              currency,
              subTotal,
              taxAmount,
              cgstRate,
              sgstRate,
              roundOff,
              discountRate,
              discountAmount,
              total,
            })}
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                dateOfIssue,
                invoiceNumber,
                billTo,
                billToEmail,
                billToAddress,
                billToGST,
                billFrom,
                billFromEmail,
                billFromAddress,
                billFromGST,
                billFromPan,
                billFromPhone,
                declaration,
                terms,
                bank,
                accountNo,
                ifsc,
                billHSN,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              cgstRate={cgstRate}
              sgstRate={sgstRate}
              roundOff={roundOff}
              discountRate={discountRate}
              discountAmount={discountAmount}
              total={total}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency :</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="₹">INR (Indian Rupee)</option>
                <option value="$">USD (US Dollar)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount Rate :</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={handleChange(setDiscountRate)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">CGST :</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="cgstRate"
                  type="number"
                  value={cgstRate}
                  onChange={handleChange(setCgstRate)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">SGST :</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="sgstRate"
                  type="number"
                  value={sgstRate}
                  onChange={handleChange(setSgstRate)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <hr className="mt-4 mb-3" />
            <Button
              variant="primary"
              type="submit"
              className="d-block w-100 btn-secondary"
            >
              Preview Invoice
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
