import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bookticket from "./Bookticket";
import { UserProvider } from "./usercontext";
import AdminDashboard from "./AdminDashboard";
import Ticket from "./Ticket";
import Edit from "./Edit";
import View from "./View";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookticket" element={<Bookticket />} />
            <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin-dashboard/:id" element={<View />} />
            <Route path="/admin-dashboard/edit/:id" element={<Edit />} />
           <Route path="/ticket/:movie/:selected/:totalprice" element={<Ticket/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;