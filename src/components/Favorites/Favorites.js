import React, { useEffect, useState, memo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setFavoritesAC } from "../../redux/actions/fav.actions";
import { getVideosBySearchTask } from "./../../redux/actions/videos.action";
import Modal from "./../Modal/Modal";
import { Button } from "antd";
import "./Fav.css";
import { Card, Col, Row } from "antd";

function getUnique(arr, comp) {
  const unique = arr?.map((e) => e[comp])

    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
}

const Favorites = () => {
  const example = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector((state) => state.fav.fav);
  const user = useSelector(state => state.auth.user);
  const tokenLocal = localStorage.getItem("token");
  const fav = localStorage.getItem(tokenLocal);
  const favTwo = JSON.parse(fav);
  console.log(user)
  console.log(fav);
  


  useEffect(() => {
    console.log("works");
    favTwo?.map((f) => {
      dispatch(setFavoritesAC(f));
    });
  }, [tokenLocal]);

 

 
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };


  const uniqueItems = getUnique(favorites);

  return (
    <div className="fav_container">
      <div className="fav_container">
        {uniqueItems?.map((item, index) => (
          <div key={item?.id} className="site-card-wrappe">
            <Row gutter={28}>
              <Col span={23}>
                <Card title={item?.q} bordered={true}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item?.q}</span>

                    <span>{item?.location}</span>

                    <span>{item?.order}</span>

                    <span>{item?.maxResults}</span>
                  </div>

                  <div style={{ paddingTop: "10px" }}>
                    <Button
                      onClick={() => {
                        localStorage.setItem(
                          tokenLocal,
                          JSON.stringify(favorites)
                        );

                        dispatch(getVideosBySearchTask(item));
                        history.push(`/`);
                      }}
                    >
                      Выполнить
                    </Button>
                    <Button onClick={showModal}>Редактировать</Button>
                    {visible && (
                      <Modal
                        visible={visible}
                        setVisible={setVisible}
                        item={item}
                      />
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        ))}
      </div>
      <Button onClick={() => {
          localStorage.setItem(tokenLocal, JSON.stringify(favorites));

  }}>Сохранить запросы</Button>
    </div>
  );
};

export default React.memo(Favorites);

{/**
 <Button onClick={() => {
              localStorage.setItem(tokenLocal, JSON.stringify(favorites));

      }}>Сохранить запросы</Button>
*/}