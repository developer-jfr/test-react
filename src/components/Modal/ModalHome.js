import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Slider, Input, Modal, Button, Alert } from "antd";

import { useDispatch } from "react-redux";
import "./Modal.css";
import { Select } from "antd";
import {
  editModeFavoritesAC,
  setFavoritesAC,
} from "../../redux/actions/fav.actions";
import { v4 } from "uuid";

const { Option } = Select;
const usersSearchFormValidate = (values) => {
  const errors = {};
  return errors;
};

function ModalForm({ visible, setVisible }) {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Запрос"
        onOk={handleOk}
        onCancel={handleCancel}
       
      >
        <ModalFormik handleOk={handleOk}  />
      </Modal>
    </>
  );
}

export default ModalForm;

export const ModalFormik = ({handleOk}) => {
  const dispatch = useDispatch();
  const submit = (values, { setSubmitting }) => {
    dispatch(setFavoritesAC(values));
    setSubmitting(false);
  };

  const addToFavorites = () => (
    <Alert message="Success Tips" type="success" showIcon />
  )

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: v4(),
        q: "",
        location: "",
        order: "",
        maxResults: 25,
      }}
      validate={usersSearchFormValidate}
      onSubmit={submit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <label>Запрос</label>
            <Field type="text" name="q" as={Input} />
            <label>Место</label>

            <Field type="text" name="location" as={Input} />
          </div>
          <label>Сортировка</label>

          <div>
            <Select
              name="order"
              onChange={(event) => setFieldValue("order", event)}
              style={{ width: "110px" }}
            >
              <Option value="date">Date</Option>
              <Option value="rating ">Rating</Option>
              <Option value="relevance">Relewence</Option>
              <Option value="title">Title </Option>
              <Option value="videoCount">Video Count </Option>
              <Option value="viewCount">View Count </Option>
            </Select>
          </div>
          <div>
            <label>Максимальное количество </label>
            <Slider
              style={{ paddingTop: "35px" }}
              defaultValue={20}
              tooltipVisible
              max={30}
              value={values.maxResults}
              name="maxResults"
              onChange={(event) => setFieldValue("maxResults", event)}
            />
          </div>

          <div>
           
              <Button
                htmlType="submit"
                disabled={isSubmitting}
                onClick={addToFavorites}
                className=''
              >
                Coxpaнить
              </Button>
           
          </div>
        </Form>
      )}
    </Formik>
  );
};
