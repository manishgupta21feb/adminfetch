import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function EditRestaurantModal(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "all"
  });

  const [list, setList] = useState({
    id: "",
    name: "",
    email: "",
    rating: "",
    address: ""
  });

  //For get data in form field
  useEffect(()=> {
    // fetch("http://localhost:3000/restaurant/"+props.dataId).then((response)=> {
    //   response.json().then((result)=> {
    //     setList(result);
    //   })    
    // })
    axios.get("http://localhost:3000/restaurant/"+props.dataId).then((response)=> {
      setList(response.data)
    }).catch((error)=> {
      console.log("error");
    })
  }, [props.dataId]);

  //Submit Updated Form
  const onSubmit = (list) => {
    // fetch("http://localhost:3000/restaurant/"+props.dataId, {
    //   method: "PUT",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(list)
    // }).then(()=> {
    //   props.handleModal(false);
    //   props.showData();
    // })
    axios.put("http://localhost:3000/restaurant/"+props.dataId, list).then((response)=> {
      props.handleModal(false);
      props.showData();
    }).catch((error)=> {
      console.log(error);
    })
  }

  return (
    <>
      <Modal show={props.visible} onHide={props.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Restaurant</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                value={list.name}
                ref={register({required: true, minLength: 2})}
                onChange={(e)=> setList(e.target.value)}
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
                value={list.email}
                ref={register({required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}
                onChange={(e)=> setList(e.target.value)}
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
                value={list.rating}
                ref={register({min: 1, max: 5})}
                onChange={(e)=> setList(e.target.value)}
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
                value={list.address}
                ref={register({required: true, minLength: 2, maxLength: 100})}
                onChange={(e)=> setList(e.target.value)}
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
            <Button type="submit" variant="primary">
              Update Changes
            </Button>
          </Modal.Footer>
        </Form>
    </Modal>
    </>
  );
}

export default EditRestaurantModal;
