import React, { useState, useEffect } from "react";
import axios from "axios";
const Edit = ({ setCats, cat, handleEditComplete, setEdit }) => {
  const [name, setName] = useState(cat.name);
  const [age, setAge] = useState(cat.age);
  const [breed, setBreed] = useState(cat.breed);
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 동작 막기

    const data = { name: name, age: age, breed: breed };
    axios
      .put(`http://localhost:8080/cats/${cat.id}`, data)
      .then((res) => {
        console.log(res.data);
        handleEditComplete();
      })
      .then(() => {
        // 삭제 후 데이터 다시 불러오기
        axios.get("http://localhost:8080/cats").then((res) => {
          setCats(res.data);
        });
      });
    alert("수정완료!");
    setEdit(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <header>
          <h1>수정하기</h1>
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
          <button type="submit">올리기</button>
        </div>
      </form>
    </>
  );
};

export default Edit;
