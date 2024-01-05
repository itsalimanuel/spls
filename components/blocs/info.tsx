"use client";
import { useSelector } from "react-redux";
export const Info = () => {
  const user = useSelector((state: any) => state.player);
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className=" rounded-sm border border-tertiary w-full h-[45px] px-2.5 flex items-center justify-center bg-gradient-to-t from-secondary to-tertiary ">
        <div className="text-lg">🏅</div>
        <div className="w-full text-center">
          {user.userName ? user.balance.toLocaleString("en-US") : ""}
        </div>
      </div>
      <div className=" rounded-sm border border-tertiary w-full h-[45px] px-2.5 flex items-center justify-center bg-gradient-to-t from-secondary to-tertiary ">
        <div className="text-lg">🧑</div>
        <div className="w-full text-center">{user?.userName}</div>
      </div>
      <div className=" rounded-sm border border-tertiary w-full h-[45px] px-2.5 flex items-center justify-center bg-gradient-to-t from-secondary to-tertiary ">
        <div className="text-lg">⏱</div>
        <div className="w-full text-center">
          {user.userName
            ? new Date().getHours() + ":" + new Date().getMinutes()
            : ""}
        </div>
      </div>
    </div>
  );
};
