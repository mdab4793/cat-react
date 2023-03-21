import axios from "axios";
import styles from "../css/CatList.module.css";
import Edit from "./Edit";
import New from "./New";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CatList = ({ cats, setCats, user, setUser }) => {
  const { username } = JSON.parse(user && user.config.data);
  console.log(username);
  const navigate = useNavigate();
  //냥이추가 모달
  const [modal, setModal] = useState(false);
  // 삭제핸들러;
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/cats/${id}`, {
        //delete할땐 data에 담아서 보내줘야한다.
        data: {
          id: id,
        },
      })
      .then(() => {
        // 삭제 후 데이터 다시 불러오기
        axios.get("http://localhost:8080/cats").then((res) => {
          setCats(res.data);
        });
      });
  };
  return (
    <>
      <div>
        <div>
          <h1>{username}님 안녕하세요.</h1>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "로그아웃하시겠습니까?,로그인화면으로 돌아갑니다."
                )
              ) {
                //확인시 처리
                setUser(null);
                navigate("/");
              } else {
                //취소시처리
              }
            }}
          >
            로그아웃
          </button>
        </div>
        <button onClick={() => setModal(true)}>새글쓰기</button>
        {modal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <New setModal={setModal} setCats={setCats} />
              <button onClick={() => setModal(false)}>닫기</button>
            </div>
          </div>
        )}
        {cats.map((cat) => (
          <div key={cat.id}>
            <img
              className={styles.img}
              src="https://github.com/mdab4793/petwalking/blob/master/13.jpeg?raw=true"
            />
            <p>이름: {cat.name}</p>
            <p>나이: {cat.age}</p>
            <p>종류: {cat.breed}</p>
            <EditCatButton cat={cat} setCats={setCats} />
            <button
              onClick={() => {
                deleteHandler(cat.id);
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
const EditCatButton = ({ cat, setCats }) => {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleEditComplete = () => {
    setEdit(false);
    axios.get("http://localhost:8080/cats").then((res) => {
      setCats(res.data);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          handleEdit();
        }}
      >
        수정
      </button>
      {edit && (
        <div className={styles.modalOverlay}>
          {" "}
          <div className={styles.modal}>
            <Edit
              setCats={setCats}
              cat={cat}
              handleEditComplete={handleEditComplete}
              setEdit={setEdit}
            />
            <button onClick={() => setEdit(!edit)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};
export default CatList;
