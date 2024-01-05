"use client";
import {
  updateBalance,
  updateIsOnline,
  updateRank,
  updateSpeed,
  updateValue,
} from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function getRandomNumber(min: number, max: number, decimal: number) {
  return Number((Math.random() * (max - min + 1) + min).toFixed(decimal));
}

type Player = {
  id: number;
  name: string;
  point: any;
  multiplier: any;
  score: any;
};

export const Start = () => {
  const dispatch = useDispatch();
  const [speed, setSpeed] = useState<any>(0);
  const [value, setValue] = useState(getRandomNumber(1, 9, 2));
  const [points, setPoints] = useState(50);
  const [multiplier, setMultiplier] = useState<any>(1.0);
  const [players, setPlayers] = useState<any>([]);
  const player = useSelector((state: any) => state.player);
  useEffect(() => {
    let autoplayersGuess: any = [];

    for (let i = 0; i < 5; i++) {
      let data: Player = {
        id: i,
        name: i === 0 ? "You" : `CPU ${i}`,
        point: "-",
        multiplier: "-",
        score: 0,
      };
      autoplayersGuess.push(data);
    }
    setPlayers(autoplayersGuess);
    console.log(autoplayersGuess);
    dispatch(updateRank(autoplayersGuess));
  }, []);

  const generateRandomPlayers = () => {
    let autoplayersGuess: any = [];
    const data: Player = {
      id: 0,
      name: "You",
      point: points,
      multiplier: multiplier,
      score: Math.round(points * multiplier),
    };

    autoplayersGuess.push(data);
    for (let i = 0; i < 4; i++) {
      let p: number = getRandomNumber(1, 700, 0),
        m: number = getRandomNumber(1, 4, 2);

      autoplayersGuess.push({
        id: i + 1,
        name: `CPU ${i + 1}`,
        point: p,
        multiplier: m,
        score: Math.round(p * m),
      });
    }

    setPlayers(autoplayersGuess);
    dispatch(updateRank(autoplayersGuess));
  };

  const Satrt = () => {
    if (0 > player.balance) {
      alert("You don't have enough balance");
      return false;
    }
    setValue(getRandomNumber(1, 9, 2));
    dispatch(updateSpeed(speed));
    generateRandomPlayers();
    dispatch(updateValue(value));
    dispatch(updateBalance(player.balance - points));
    setTimeout(handelBalance, 4000 + 1000 * speed);
  };
  const handelBalance = () => {
    dispatch(updateIsOnline(false));
    if (value === multiplier) {
      dispatch(updateBalance(player.balance + points));
    } else {
      dispatch(updateBalance(player.balance - points));
    }
  };

  const increasePoints = () => {
    console.log(points);
    if (points < 25) {
      return false;
    } else {
      setPoints(points - 25);
    }
  };
  const decreasePoints = () => {
    if (player.balance >= points + 25) {
      return false;
    } else {
      setPoints(points + 25);
    }
  };
  const decreaseMultiplier = () => {
    if (multiplier >= 1.25) {
      setMultiplier(multiplier - 0.25);
    }
  };
  const increaseMultiplier = () => {
    if (10 >= multiplier + 0.25) {
      setMultiplier(multiplier + 0.25);
    }
  };
  return (
    <div className="relative w-full ">
      <div className="flex flex-row gap-5">
        <div className="w-full">
          <div className="flex flex-wrap py-1 w-full border border-tertiary rounded-md bg-gradient-to-t from-secondary to-tertiary px-2">
            <span className="text-xs w-full mb-1 text-is-light-gray text-center">
              {/* Points */}
            </span>
            <div className="flex w-full  items-center gap-2">
              <button
                onClick={increasePoints}
                className="w-8 py-1  text-center rounded-sm border border-tertiary text-xs cursor-pointer text-[#a7a7a7] bg-none hover:bg-secondary"
              >
                ▼
              </button>
              <input
                type="number"
                min={0}
                value={points}
                onChange={(e) => setPoints(parseFloat(e.target.value))}
                max={player.balance}
                step={25}
                className="w-[calc(100%-58px)] text-sm text-center px-2.5 py-1.5 outline-none text-white bg-is-dark rounded-sm border border-tertiary"
              />
              <button
                onClick={decreasePoints}
                className="w-8 py-1 text-center rounded-sm border border-tertiary text-xs cursor-pointer text-[#a7a7a7] bg-none hover:bg-secondary"
              >
                ▲
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap py-1 w-full border border-tertiary rounded-md bg-gradient-to-t from-secondary to-tertiary px-2">
            <span className="text-xs w-full mb-1 text-is-light-gray text-center">
              {/* Multiplier */}
            </span>
            <div className="flex w-full  items-center gap-2">
              <button
                onClick={decreaseMultiplier}
                className="w-8 py-1  text-center rounded-sm border border-tertiary text-xs cursor-pointer text-[#a7a7a7] bg-none hover:bg-secondary"
              >
                ▼
              </button>
              <input
                type="number"
                min={1}
                max={10}
                step={0.15}
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
                className="w-[calc(100%-58px)] text-sm text-center px-2.5 py-1.5 outline-none text-white bg-is-dark rounded-sm border border-tertiary"
              />
              <button
                onClick={increaseMultiplier}
                className="w-8 py-1  text-center rounded-sm border border-tertiary text-xs cursor-pointer text-[#a7a7a7] bg-none hover:bg-secondary"
              >
                ▲
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={Satrt}
        className="w-full p-2.5 mt-5 rounded-sm bg-is-gray text-white text-sm leading-[20px] font-[600] hover:bg-gradient-to-r hover:from-is-pink hover:to-is-orange disabled:bg-is-light"
      >
        Satrt
      </button>
      <div className="mt-5 mb-1.5">
        <span>🏆 Current round</span>
      </div>
      <div className="bg-secondary rounded-sm border border-tertiary overflow-hidden">
        <table className="bg-table text-[#f2f6ff] text-xs w-full">
          <thead>
            <tr>
              <th className="text-center text-xs bg-is-dark text-is-light font-[500]">
                Name
              </th>
              <th className="text-center text-xs bg-is-dark text-is-light font-[500]">
                Point
              </th>
              <th className="text-center text-xs bg-is-dark text-is-light font-[500]">
                Multiplier
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map(
              (
                player: {
                  name: string;
                  point: any;
                  multiplier: string;
                  score: any;
                },
                index: number
              ) => (
                <tr
                  key={index}
                  className={`${index === 0 ? "bg-tertiary" : "bg-[#3f4657]"} ${
                    index !== 0 &&
                    player.score !== "-" &&
                    player.score > players[0].score
                      ? "text-is-green"
                      : "text-is-red"
                  }`}
                >
                  <td className="text-center py-1.5">{player.name}</td>
                  <td className="text-center py-1.5">{player.point}</td>
                  <td className="text-center py-1.5">{player.multiplier}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-5 mb-1.5">⌛ Speed</div>
      <div className="bg-secondary rounded-sm border border-tertiary p-2.5 pt-3">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="p-0 w-full mb-3 cursor-pointer"
        />
        <div className="flex justify-between items-start text-xs -mt-1.5 mx-1 mb-0">
          <div
            className={` font-bold ${
              speed >= 1 ? "text-is-pink" : "text-is-light"
            }`}
          >
            1x
          </div>
          <div
            className={` font-bold ${
              speed >= 2 ? "text-is-pink" : "text-is-light"
            }`}
          >
            2x
          </div>
          <div
            className={` font-bold ${
              speed >= 3 ? "text-is-pink" : "text-is-light"
            }`}
          >
            3x
          </div>
          <div
            className={` font-bold ${
              speed >= 4 ? "text-is-pink" : "text-is-light"
            }`}
          >
            4x
          </div>
          <div
            className={` font-bold ${
              speed >= 5 ? "text-is-pink" : "text-is-light"
            }`}
          >
            5x
          </div>
        </div>
      </div>
    </div>
  );
};
