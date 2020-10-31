import React, { useEffect } from 'react';
import edit from '../assets/images/edit.png';
import deleteimg from '../assets/images/delete.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import AddRestaurantModal from '../components/AddRestaurantModal';
import EditRestaurantModal from '../components/EditRestaurantModal';
import DeleteRestaurantModal from '../components/DeleteRestaurantModal';
import { useState } from 'react';

function Restaurant() {

  //State
  const [list, setList] = useState();

  //Add Modal
  const [modalOpenValue, setModalOpenValue] = useState();
  const modalOpen = (value) => {
    setModalOpenValue(value);
  }

  //Edit Modal
  const [editModalOpenValue, setEditModalOpenValue] = useState();
  const [id, setId] = useState();
  const editModalOpen = (value, id) => {
    setEditModalOpenValue(value);
    setId(id);
  } 

  //Delete Modal
  const [deleteModalOpenValue, setDeleteModalOpenValue] = useState();
  const [idForDelete, setIdForDelete] = useState();
  const deleteModalOpen = (value, id) => {
    setDeleteModalOpenValue(value);
    setIdForDelete(id);
  }

  //Get Data
  const getData = () => {
    fetch("http://localhost:3000/restaurant").then((response)=> {
      response.json().then((result)=> {
        setList(result);
      })
    })
  }

  //Get Data onLoad
  useEffect(()=> {
    getData();
  }, []);

  return (
    <>
      <div className="main-heading-wrapper">
        <h2>Restaurant</h2>
      </div>
      <div className="search-btn-wrapper">
        <Form.Group className="custom-search">
          <Form.Control type="text" placeholder="Search here" />
          <i className="icon-search"></i>
        </Form.Group>
        <Button variant="primary" className="small-btn" onClick={() => modalOpen(true)}>Add Restaurant</Button>{' '}
      </div>
      <div className="main-inner-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list && list.map((item, i)=>
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.rating}</td>
                  <td>{item.address}</td>
                  <td>
                    <div className="edit-delete-icon">
                      <span onClick={()=> editModalOpen(true, item.id)}>
                        <img src={edit} alt="edit" />
                      </span>
                      <span onClick={()=> deleteModalOpen(true, item.id)}>
                        <img src={deleteimg} alt="delete" />
                      </span>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
      <EditRestaurantModal 
        visible={editModalOpenValue}
        handleModal={editModalOpen}
        dataId={id}
        showData={getData}
      />
      <AddRestaurantModal 
        visible={modalOpenValue} 
        handleModal={modalOpen} 
        showData={getData}
      />
      <DeleteRestaurantModal
        visible={deleteModalOpenValue}
        handleModal={deleteModalOpen}
        dataId={idForDelete}
        showData={getData}
      />
    </>
  )
}

export default Restaurant;
