import React from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Import Bootstrap components
import './RegistrationFail.css'; // Import custom CSS for styling

function RegistrationFail() {
  return (
    <Container className="registration-fail-container">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Alert variant="danger" className="alert-fail">
            <Alert.Heading>Oops!</Alert.Heading>
            <p>
              Registration failed. Please try again later or contact support if the problem persists.
            </p>
          </Alert>
          <Button variant="secondary" className="mt-3" href="/">
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationFail;
