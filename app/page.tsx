import { Join, Chart, Start, Info, Rank, Chat } from "@/components";

export default function Home() {
  return (
    <div className="relative">
      <div className="container p-10 ">
        <div className="grid grid-cols-[1.3fr_2fr] mt-7 w-full space-x-10">
          <div className="relative w-full">
            <Join />
            <Start />
          </div>
          <div className="w-full  space-y-4">
            <Info />
            <Chart />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <Rank />
          <Chat />
        </div>
      </div>
    </div>
  );
}
