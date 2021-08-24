import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Slider, Input, Alert } from "antd";
import { Modal, Button } from "antd";
import {useDispatch} from 'react-redux'
import "./Modal.css";
import { Select } from "antd";
import { editModeFavoritesAC, setFavoritesAC } from "../../redux/actions/fav.actions";

const { Option } = Select;
const usersSearchFormValidate = (values) => {
  const errors = {};
  return errors;
};

function ModalForm({ visible, setVisible, item }) {
  const [loading, setLoading] = useState(false);
  const submit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

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
        title="Редактирование"
        onOk={handleOk}
        onCancel={handleCancel}
      
      >
        <ModalFormik item={item} />
      </Modal>
    </>
  );
}

export default ModalForm;

export const ModalFormik = ({item}) => {
  const dispatch = useDispatch();
  const submit = (values, { setSubmitting }) => {
    dispatch(editModeFavoritesAC( values))
    setSubmitting(false);
  };
const editModeDone = () => {
  return <Alert message={`Изменилься объект: ${item?.q}`} />
}

  return (
    <Formik
      enableReinitialize
      initialValues={{id: item?.id , q: item?.q , location: item?.location ,order: item?.order ,  maxResults: item?.maxResults }}
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
          <Select name="order" value={values.order}  onChange={(event) => setFieldValue("order", event)}  style={{width: '110px'}} >
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
            <div className="footer">
              <Button htmlType="submit" disabled={isSubmitting} onClick={editModeDone}>
              Сохранить запрос
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
