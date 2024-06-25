import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import ButtonComponent from "./components/ButtonComponent";
import { LoadingComponent } from "./components/LoadingComponent";
const CardComponent = lazy(() => import("./components/Cards/CardComponent"));
import NavbarComponent from "./components/NavbarComponent";
import { BASE_URL } from "./utils/baseUrl";
import { useDispatch } from "react-redux";
import { increment, decrement } from "./redux/features/counters/counterSlice";

function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function handleCount() {
    setCount(count + 1);
    console.log(count);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  }

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(BASE_URL + "users");
      const data = await response.json();
      console.log(data.users);
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <ButtonComponent onClick={handleCount} title="Count Increment" />
      <h1>{count}</h1>
      <form action="">
        <label htmlFor="email"></label>
        <input onChange={(e) => handleEmail(e)} id="email" type="text" />
      </form>
      {email}
      <div className="text-red-600">
      {errorMsg}
      </div>   */}
      <div className="flex m-5 gap-5">
        
      <ButtonComponent title="Increment" onClick={() => dispatch(increment())} />
      <ButtonComponent title="Decrement" onClick={() => dispatch(decrement())} />

      </div>

      <main className="flex flex-wrap min-h-screen items-center justify-center gap-7">
        {/* isLoading ? (
          <LoadingComponent />
        ) : ( */}

        <Suspense fallback={<LoadingComponent />}>
          {users.map((user) => (
            <div key={user?.id}>
              <CardComponent profile={user.image} lastname={user.lastName} />
            </div>
          ))}
        </Suspense>
      </main>
    </>
  );
}

export default App;
