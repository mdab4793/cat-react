import Login from "./Login";

const Main = ({ user, setUser }) => {
  return (
    <>
      <Login setUser={setUser} user={user} />
    </>
  );
};

export default Main;
