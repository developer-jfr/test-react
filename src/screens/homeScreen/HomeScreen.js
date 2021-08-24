import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import Video from "../../components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
import { Redirect, useHistory } from "react-router-dom";
import "./homeScreen.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getVideosBySearch } from "../../redux/actions/videos.action";
import { Field, Form, Formik } from "formik";
import {BiHeart, AiOutlineAppstore} from 'react-icons/all'
import Modal from './../../components/Modal/ModalHome'
import { setFavoritesAC } from "../../redux/actions/fav.actions";
import {v4} from 'uuid'
import {Alert} from 'antd'
const usersSearchFormValidate = (values) => {
  const errors = {};
  return errors;
};

const HomeScreen = () => {

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.searchedVideos
  );
  const error = useSelector(state => state.searchedVideos.error)
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false)
  const showModal = () => {
    setVisible(true)
  }

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      history.push("/signin");
    }
  }, [token,history]);

  const submit = (values, { setSubmitting }) => {
    dispatch(getVideosBySearch(values.search));
    setSubmitting(false);
  };

 

  return (
    <Container>
      {error ? (
    <Alert message="Some problem occured please try again" type="warning" showIcon closable />

      ) : null}
      <div className="form__container">
        <Formik
          enableReinitialize
          initialValues={{ search: "" }}
          validate={usersSearchFormValidate}
          onSubmit={submit}
        >
          {({ isSubmitting, values }) => (
            <Form className="form">
              <Field type="text" name="search" placeholder='Search...' />
              <BiHeart
              size={28}
              color='#000'
              className='form__fav'
              onClick={() => {
                const fav = {
                  id: v4(),
                  q: values.search,
                  location: 'USA',
                  order: 'title',
                  maxResults: 25
                }
                dispatch(setFavoritesAC(fav))

                
              }}
              />
              <AiOutlineAppstore 
              size={28}
              color='#000'
              className='form__fav'
              onClick={showModal}
              />

              <button type="submit" disabled={isSubmitting}>
                Find
              </button>
            </Form>
          )}
        </Formik>

        {visible && <Modal visible={visible} setVisible={setVisible} />}

<div>
  
</div>

      </div>
      {videos ? (
        <InfiniteScroll
          dataLength={videos.length}
         
          hasMore={true}
          className="row"
        >
          {!loading ? (
            videos.map((video) => (
              <Col lg={3} md={4}>
                <Video video={video} key={video.id} />
              </Col>
            ))
          ) : (
            <div style={{paddingTop: '30px', paddingLeft: '30px'}} >
              <h6 style={{color: 'GrayText'}}>no results</h6>
            </div>
          )}
        </InfiniteScroll>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default HomeScreen;
