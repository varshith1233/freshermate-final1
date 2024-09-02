import React from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Import Bootstrap components
import './RegistrationSuccess.css'; // Import custom CSS for styling

function RegistrationSuccess() {
  return (
    <Container className="registration-success-container">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Alert variant="success" className="alert-success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>
              You have been successfully registered. Thank you for signing up!
            </p>
          </Alert>
          <Button variant="primary" className="mt-3" href="/">
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationSuccess;
