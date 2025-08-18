import "@/public/styles/globals.css";
import { ButtonTheme } from "./components/shared";
import { LoginForm } from "./components/shared/LoginForm";

export function App() {

  // Uncomment the following lines to use the component with state management
  // const [angka, setAngka] = useState<number>(0);

  // const incrementFunction = () => {
  //   setAngka(angka + 1)
  // }

  // const resetFunction = () => {
  //   setAngka(0)
  // }
  //

  return (
    <>

      {/* <UseEffect /> */}

      {/* <FetchDragonBall /> */}

      <LoginForm />

      <ButtonTheme />
      {/* <UseMemo /> */}

      {/* <Counter /> */}

      {/* <RegistrationForm /> */}
    </>
  );
}

export default App;
