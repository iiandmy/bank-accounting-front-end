import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "./component/ProfilePage";
import { LoginPage } from "./component/auth/LoginPage";
import { RegistrationPage } from "./component/auth/RegistrationPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
