export const Chat = () => {
  return (
    <div className="w-full flex flex-col">
      <span className="mb-3">💬 Chat</span>
      <div className="bg-secondary rounded-sm border border-tertiary">
        <div className="h-28 text-sm overflow-x-hidden overflow-y-scroll">
          <div className="p-1.5">
            <div className="flex items-end">
              <span className="text-is-pink font-bold text-xs">👤 User1</span>
              <span className="ml-2 px-1.5 rounded-sm bg-is-dark-gray text-xs text-white">
                Lorem ipsum dolor sit.
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-1.5 gap-2">
          <input className="w-full text-sm px-2 py-2.5 outline-none text-white bg-is-dark rounded-sm border border-tertiary" />
          <button className="w-fit  px-5 py-2.5   rounded-sm bg-is-gray text-white text-sm leading-[20px] font-[600] hover:bg-gradient-to-r hover:from-is-pink hover:to-is-orange disabled:bg-is-light">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
