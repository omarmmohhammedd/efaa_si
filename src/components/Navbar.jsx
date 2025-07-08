import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-center p-3 main_bg">
      <div className="flex  w-full lg:w-2/3  justify-between items-center">
        <div className="w-3/4 md:flex hidden">
          <ul class="text-white flex flex-row-reverse items-start gap-x-4 md:text-xs lg:text-sm">
            <li className="cursor-pointer hover:opacity-70 transition-all">
              الرئيسية
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-all">
              عن إيفاء
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-all">
              المستفيدون
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-all">
              قائمة المخالفات
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-all">
              شركاؤنا
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-all">
              اتصل بنا
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-all">
              تسجيل الدخول
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-all">
              EN
            </li>
          </ul>
        </div>
        <RxHamburgerMenu className="text-white text-3xl md:hidden" />
        <img src="/nav.svg" className=" w-32" />
      </div>
    </div>
  );
};

export default Navbar;
