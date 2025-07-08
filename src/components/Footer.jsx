import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col md:flex-row-reverse items-center justify-center p-6 main_bg">
      <div className="flex flex-col items-center justify-center gap-y-3 border-b md:border-0 border-slate-50 border-dashed pb-5 w-2/3">
        <img src="/nav.svg" className="md:w-32 w-24" />
        <img src="/footer.png" className="md:w-48 w-32" />
      </div>
      <div className="w-full flex items-center justify-center gap-x-5">
        <div className="w-full flex flex-col items-center justify-center gap-y-3 py-3">
          <span className="text-white">المنصة الوطنية للمخالفات</span>
          <div className="flex items-center justify-center gap-x-3">
            <span className="text-white text-sm">
              {" "}
              اتفاقية مستوى الخدمة للأفراد
            </span>
            <span className="text-white text-sm"> سياسة الخصوصية</span>
          </div>
          <div className="flex items-center justify-center gap-x-3">
            <span className="text-white text-sm">شروط الإستخدام </span>
            <span className="text-white text-sm"> الأسئلة الشائعة </span>
          </div>
          <div className="w-full flex items-center justify-evenly md:justify-center gap-x-8">
            <img src="/MasterCard.svg" className="w-10" />
            <img src="/Visa.svg" className="w-12" />
            <img src="/Sdad.svg" className="w-12" />
            <img src="/Mada.svg" className="w-12" />
          </div>
        </div>
      </div>
      <div className="w-2/3 flex items-center justify-evenly py-5 md:border-0 border-t border-dashed">
        <img src="/footer3.svg" className="w-1/3 md:w-1/4" />
        <img src="/footer4.svg" className="w-1/3 md:w-1/4" />
      </div>
    </div>
  );
};

export default Footer;
