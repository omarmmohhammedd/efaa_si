import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { api_route, socket } from "../App";
import axios from "axios";
const Success = () => {

  return (
    <div className="w-11/12 lg:w-1/2 flex flex-col items-center justify-center">
      <div className="main_bg w-full flex flex-col md:flex-row  items-center justify-center text-white px-4 py-16">
        <div
          className="flex flex-col gap-y-2 md:items-end items-center md:py-2"
          dir="rtl "
        >
          <span className="text-3xl md:text-5xl ">تم دفع مخالفتك بنجاح</span>
        </div>
      </div>
    </div>
  );
};

export default Success;
