import { useState, useEffect } from "react";
import axios from "axios";
const New = ({ setCats, setModal }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 동작 막기
    //post한다음 get으로 다시 가져온다
    const data = { name: name, age: age, breed: breed };
    axios.post("http://localhost:8080/cats", data).then((res) => {
      console.log(res.data);
      setName("");
      setAge(0);
      setBreed("");
      axios.get("http://localhost:8080/cats").then((res) => {
        setCats(res.data);
      });
    });
    alert("작성완료!");
    setModal(false);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        // action={"http://localhost:8080/cats"}
        method="POST"
      >
        <header>
          <h1>냥이추가</h1>
        </header>
        <div>
          <div>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>나이</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label>묘종</label>
            <input
              type="text"
              name="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <button
            type="submit"
            // onClick={() => {
            //   setModal(false);
            // }}
          >
            올리기
          </button>
        </div>
      </form>
    </>
  );
};
export default New;
