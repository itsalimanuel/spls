"use client";
import { useEffect, useState, useRef, ElementRef } from "react";
import { default as socket } from "@/utils/socket";

export const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [userOnline, setUserOnline] = useState([]);
  const [incomingMessages, setIncomingMessages] = useState<any>([]);

  const msgSelector = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    socket.on("chat-message", ({ nickname, msg }) => {
      setIncomingMessages([
        ...incomingMessages,
        { name: nickname, message: msg },
      ]);
    });
    socket.on("connect", () => {
      socket.emit("new-user");
    });
    socket.on("users-on", (list: any) => {
      setUserOnline(list);
    });

    socket.on("user-data", (nick: any) => {
      if (!name) setName(nick[0]);
    });

    socket.on("user-disconnected", (user: any) => {
      if (user !== null) {
        setMessages([...messages, `${user} has left the chat. 😢`]);
      }
    });

    if (msgSelector.current) {
      msgSelector.current.scrollTop = msgSelector.current.scrollHeight;
    }

    return () => {
      socket.off();
    };
  }, [incomingMessages, name]);

  const sendMessage = () => {
    console.log(message);
    if (message) {
      socket.emit("chat-message", { nickname: name, msg: message });
      setMessages([...messages, { name, message }]);
      console.log(message);
      setMessage("");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <span className="mb-3">
        💬 Chat {userOnline !== null ? userOnline.length : 0}
      </span>
      <div className="bg-secondary rounded-sm border border-tertiary">
        <div
          ref={msgSelector}
          className="h-28 text-sm overflow-x-hidden overflow-y-scroll"
        >
          <div className="p-1.5">
            {incomingMessages.map((user: any, index: any) => (
              <div key={index} className="flex items-end">
                <span className="text-is-pink font-bold text-xs flex gap-2">
                  <pre>👤</pre>
                  {user?.name ? user?.name : "user"}
                </span>
                <span className="ml-2 px-1.5 rounded-sm bg-is-dark-gray text-xs text-white">
                  {user?.message}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-1.5 gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="w-full text-sm px-2 py-2.5 outline-none text-white bg-is-dark rounded-sm border border-tertiary"
          />
          <button
            onClick={() => sendMessage()}
            className="w-fit px-5 py-2.5 rounded-sm bg-is-gray text-white text-sm leading-[20px] font-[600] hover:bg-gradient-to-r hover:from-is-pink hover:to-is-orange disabled:bg-is-light"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
