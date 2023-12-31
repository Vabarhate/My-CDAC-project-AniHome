import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useAppContext } from "../../context/appContext";
import CustomAlert from "../Alert/CustomAlert";

let flag = false;

const UpdateOrder = () => {
  const { updateOrder, showAlert, displayAlert, getOrderById, orderUser } =
    useAppContext();

  const { ordId } = useParams();
  console.log(ordId);
  useEffect(() => {
    getOrderById(ordId);
  }, []);

  console.log(orderUser);

  const [id, setId] = useState(orderUser?.id);
  const [userName, setUserName] = useState(orderUser?.userName);
  const [orderName, setName] = useState(orderUser?.orderName);
  const [orderAddress, setAddress] = useState(orderUser?.orderAddress);
  const [orderCity, setCity] = useState(orderUser?.orderCity);
  const [orderPhone, setPhone] = useState(orderUser?.orderPhone);
  const [orderEmail, setEmail] = useState(orderUser?.orderEmail);
  const [animalId, setAnimalId] = useState(orderUser?.animalId);
  const [postedBy, setPostedBy] = useState(orderUser?.postedBy);

  console.log(orderUser?.subject);
  // console.log(subject);

  const changeId = () => setId(orderUser?.id);
  const changeUserName = () => setUserName(orderUser?.userName);
  const changeName = () => setName(orderUser?.orderName);
  const changeAddress = () => setAddress(orderUser?.orderAddress);
  const changeCity = () => setCity(orderUser?.orderCity);
  const changePhone = () => setPhone(orderUser?.orderPhone);
  const changeEmail = () => setEmail(orderUser?.orderEmail);
  const changeAnimalId = () => setAnimalId(orderUser?.animalId);
  const changePostedBy = () => setPostedBy(orderUser?.postedBy);

  if (!flag) {
    setTimeout(() => {
      changeId();
      changeUserName();
      changeName();
      changeAddress();
      changeCity();
      changePhone();
      changeEmail();
      changeAnimalId();
      changePostedBy();
      flag = true;
    }, 2000);
  }

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  let today = new Date();
  let orderDate =
    today.getDate() +
    "/" +
    parseInt(today.getMonth() + 1) +
    "/" +
    today.getFullYear();
  //   console.log(orderDate);

  //   console.log(orderName + " and " + animalId);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);

    if (
      !orderName ||
      !orderCity ||
      !orderAddress ||
      !orderPhone ||
      !orderEmail
    ) {
      displayAlert();
      // console.log("hello");
      return;
    }

    const currentOrd = {
      id,
      userName,
      orderName,
      orderAddress,
      orderCity,
      orderDate,
      orderPhone,
      orderEmail,
      animalId,
      postedBy,
    };

    updateOrder(currentOrd);

    // console.log(currentOrd);
    // navigate("/login");
  };

  //   useEffect(() => {
  //     if (user) {
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 3000);
  //     }
  //   }, [user, navigate]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onSubmit(event);
    }

    setValidated(true);
  };

  return (
    <div>
      <Container style={{ paddingTop: "50px" }}>
        <Row>
          <Col
            style={{
              backgroundImage: `url(https://media.npr.org/assets/img/2017/08/11/istock-466417874_sq-71e59e36a4e47cd842a6d26d8c11a1529b39c221-s800-c85.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "0.9",
            }}
          ></Col>
          <Col xs={5} style={{ border: "5px double black" }}>
            <h1>Edit your order.</h1>
            {showAlert && <CustomAlert />}
            <Form
              noValidate
              validated={validated}
              style={{ paddingTop: "10px", color: "black" }}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {/* <Form style={{ color: "red" }} noValidate validated={validated} onSubmit={handleSubmit}> */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Type your full name here"
                    pattern="[a-zA-Z\s]{5,}"
                    name="orderName"
                    value={orderName}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid subject.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Label>Your Address</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    placeholder="Type your address here"
                    minLength={10}
                    maxLength={200}
                    name="orderAddress"
                    value={orderAddress}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid Address. Minimum Characters - 10, Maximum
                    Characters - 200.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Your City</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Type City"
                      aria-describedby="inputGroupPrepend"
                      required
                      pattern="[a-zA-Z0-9]{3,}"
                      name="orderCity"
                      value={orderCity}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city name.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom04">
                  <Form.Label>Phone</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">
                      +91
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      pattern="^[6-9]\d{9}$"
                      required
                      name="orderPhone"
                      value={orderPhone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Phone Number.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                    required
                    name="orderEmail"
                    value={orderEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom06">
                  <Form.Label>Order Date</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="orderDate"
                    value={orderDate}
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom07">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="userName"
                    value={userName}
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom07">
                  <Form.Label>Animal ID</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="animalId"
                    value={animalId}
                    disabled
                  />
                </Form.Group>
              </Row>
              <Button className="mb-3" type="submit" variant="success">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateOrder;
