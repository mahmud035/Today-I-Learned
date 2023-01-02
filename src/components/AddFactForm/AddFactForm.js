import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import './AddFactForm.css';

const AddFactForm = ({ showForm, setShowForm, categories }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddFact = (data) => {
    setShowForm(false);

    const factObj = {
      factText: data.fact,
      source: data.source,
      category: data.category,
      likeCount: 0,
      mindBlowingCount: 0,
      dislikeCount: 0,
    };

    fetch('http://localhost:5000/facts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(factObj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: 'Success',
            text: 'Fact added successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: { error },
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  return (
    <div className="">
      <Form onSubmit={handleSubmit(handleAddFact)} className="fact-form ">
        <Row>
          <Col lg={5}>
            <Form.Group className="mb-3 mb-lg-0" controlId="formBasicEmail">
              <Form.Control
                {...register('fact', {
                  required: 'Fact description is required',
                })}
                type="text"
                placeholder="Share a fact with the world..."
                className="rounded-pill fact-field"
              />

              {errors.fact && (
                <p className="text-danger mb-0">{errors.fact?.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col lg={1} className="d-flex align-items-center">
            <Form.Group className="mb-3  mb-lg-0 " controlId="formBasicEmail">
              <p className="letter-count">200</p>
            </Form.Group>
          </Col>

          <Col lg={2}>
            <Form.Group className="mb-3 mb-lg-0" controlId="formBasicEmail">
              <Form.Control
                {...register('source', {
                  required: 'Source is required',
                })}
                type="text"
                placeholder="Trustworthy source"
                className="rounded-pill fact-field"
              />

              {errors.source && (
                <p className="text-danger mb-0">{errors.source?.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Select
              {...register('category', { required: 'Select a category' })}
              className="mb-3 mb-lg-0 rounded-pill fact-field"
              aria-label="Default select example"
            >
              <option>Choose category</option>

              {categories.map((category, index) => (
                <option key={index} value={category?.category}>
                  {category?.category}
                </option>
              ))}
            </Form.Select>

            {errors.category && (
              <p className="text-danger mb-0">{errors?.category?.message}</p>
            )}
          </Col>

          <Col lg={2}>
            <Button
              className="w-100 border-0 outline-0 btn-post rounded-pill"
              variant="primary"
              type="submit"
            >
              POST
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddFactForm;
