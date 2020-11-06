import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function DeleteRestaurantModal(props) {

  const onDelete = () => {
    // fetch("http://localhost:3000/restaurant/"+props.dataId, {
    //   method: 'DELETE'
    // }).then(()=> {
    //   props.handleModal(false);
    //   props.showData();
    // })
    axios.delete("http://localhost:3000/restaurant/"+props.dataId).then((response)=> {
      props.handleModal(false);
      props.showData();
    }).catch((error)=> {
      console.log(error);
    }) 
  }

  return (
    <>
      <Modal className="delete-modal" show={props.visible} onHide={props.handleModal} centered>
        <Modal.Body>
          <h2 className="modal-heading">Delete Restaurant</h2>
          <p className="modal-text">Are you sure, you want to delete this restaurant from the list?</p>
          <div className="modal-btn-row">
            <Button variant="secondary" onClick={()=> props.handleModal(false)}>
              No  
            </Button>
            <Button variant="primary" onClick={()=> onDelete(props.dataId)}>
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default DeleteRestaurantModal;
