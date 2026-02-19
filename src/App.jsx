import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from "./pages/Login";
import { Teste } from "./pages/Teste";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { UserUI } from "./pages/UserUI"
import { GuardRoute } from "./guards/guardRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<Teste />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Private Routes */}
        <Route element={<GuardRoute />}>
          <Route path="/user/dashboard" element={<UserUI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}