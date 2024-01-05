"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "@/store/index";
import { default as socket } from "@/utils/socket";

export const Join = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [active, setActive] = useState(false);
  const userName = useSelector((state: any) => state.player.userName);
  const handleSubmit = () => {
    dispatch(updateUserName(name));
    // socket.emit("user-nickname", name);
    setActive(true);
  };

  return (
    <div
      className={`max-w-full w-full h-full max-md:h-[calc(100%-15px)] p-5 flex flex-col items-center justify-center bg-secondary rounded-sm absolute border border-tertiary py-20  z-10 ${
        active ? "hidden" : ""
      }`}
    >
      <h3 className="w-full text-is-gray font-normal text-xl text-center mb-20">
        Welcome {userName}
      </h3>
      <div className="relative flex flex-col w-full">
        <label
          htmlFor="nickname"
          className="w-full text-is-label text-xs text-center mb-5"
        >
          Please Enter Your Nickname
        </label>
        <input
          type="text"
          className="w-full outline-none py-1.5 px-2.5 bg-is-dark rounded-sm border border-tertiary text-white"
          id="nickname"
          name="nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={active}
          className="w-full py-2.5 px-4 mt-5 rounded-sm bg-is-gray text-white text-sm leading-[20px] font-[600] hover:bg-gradient-to-r hover:from-is-pink hover:to-is-orange disabled:bg-is-light"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
