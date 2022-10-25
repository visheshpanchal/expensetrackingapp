import "./App.css";
import Header from "./Layouts/Header";
import Main from "./Pages/Main";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}user/auth`)
  //     .then((res) => {
  //       if (res.data.status === "success" && res.data.data.isAuthenticated) {
  //         dispatch(authAction.login());
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Main />
      </main>
    </div>
  );
}

export default App;
