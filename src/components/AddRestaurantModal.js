import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

function AddRestaurantModal(props) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "all"
  });

  //Submit Form
  const onSubmit = (data) => {
    fetch("http://localhost:3000/restaurant", {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(()=> {
      props.handleModal(false);
      props.showData();
    })
  }
  
  return (
    <>
      <Modal show={props.visible} onHide={props.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Restaurant</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                ref={register({required: true, minLength: 2})}
                className={errors.name ? "error-input" : ""}
                placeholder="Enter Name"
              />
              {errors.name && errors.name.type === "required" && <span className="error-text">This field is required</span>}
              {errors.name && errors.name.type === "minLength" && <span className="error-text">Minimum 2 Letters are required</span>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                ref={register({required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}
                className={errors.email ? "error-input" : ""}
                placeholder="Enter Email"
              />
              {errors.email && errors.email.type === "required" && <span className="error-text">This field is required</span>}
              {errors.email && errors.email.type === "pattern" && <span className="error-text">Please enter valid email</span>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="rating"
                ref={register({min: 1, max: 5})}
                placeholder="Enter Rating"
                className={errors.rating ? "error-input" : ""}
              />
              {errors.rating && errors.rating.type === "min" && <span className="error-text">Minimum 1 Rating allowed</span>}
              {errors.rating && errors.rating.type === "max" && <span className="error-text">Maximum 5 Rating allowed</span>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="address"
                ref={register({required: true, minLength: 2, maxLength: 100})}
                placeholder="Enter Address"
                className={errors.address ? "error-input" : ""}
              />
              {errors.address && errors.address.type === "required" && <span className="error-text">This field is required</span>}
              {errors.address && errors.address.min === "minLength" && <span className="error-text">Minimum 2 Letters are allowed</span>}
              {errors.address && errors.address.type === "maxLength" && <span className="error-text">Maximum 100 Letters are allowed.</span>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleModal(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary" disabled={!formState.isValid}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
    </Modal>
    </>
  );
}

export default AddRestaurantModal;
