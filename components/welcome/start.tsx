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

const getRandomNumber = (
  min: number,
  max: number,
  decimalPlaces: number
): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
};

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
  const [multiplier, setMultiplier] = useState(1.0);
  const [players, setPlayers] = useState<any>([]);

  const player = useSelector((state: any) => state.player);

  useEffect(() => {
    const randomGuess = generaterandomGuess();
    setPlayers(randomGuess);
    dispatch(updateRank(randomGuess));
  }, []);

  const generaterandomGuess = (): Player[] => {
    return Array.from({ length: 5 }, (_, i) =>
      generateRandomPlayer(i, i === 0 ? "-" : `-`)
    );
  };

  const generateRandomPlayer = (id: number, name: string): Player => {
    const points: number = getRandomNumber(1, 700, 0);
    const multiplier: number = getRandomNumber(1, 4, 2);

    return {
      id,
      name,
      point: points,
      multiplier,
      score: player.userName ? Math.round(points * multiplier) : "-",
    };
  };

  const generateRandomPlayers = (): void => {
    const randomGuess: Player[] = [
      generateRandomPlayer(0, "You"),
      ...Array.from({ length: 4 }, (_, i) =>
        generateRandomPlayer(i + 1, `CPU ${i + 1}`)
      ),
    ];

    setPlayers(randomGuess);
    dispatch(updateRank(randomGuess));
  };

  const SatrtGame = () => {
    if (0 > player.balance) {
      alert("You don't have enough balance");
      return false;
    }
    setValue(getRandomNumber(1, 9, 2));
    dispatch(updateSpeed(speed));
    generateRandomPlayers();
    dispatch(updateValue(value));
    dispatch(updateBalance(player.balance - points));
    setTimeout(handelBalance, 3000 + 1000 * speed);
  };
  const handelBalance = () => {
    dispatch(updateIsOnline(false));
    value === multiplier
      ? dispatch(updateBalance(player.balance + points))
      : dispatch(updateBalance(player.balance - points));
  };

  const decreasePoints = () => {
    if (points > 25) setPoints(points - 25);
  };
  const increasePoints = () => {
    if (player.balance >= points + 25) setPoints(points + 25);
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
            </span>
            <div className="flex w-full  items-center gap-2">
              <button
                onClick={decreasePoints}
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
                onClick={increasePoints}
                className="w-8 py-1 text-center rounded-sm border border-tertiary text-xs cursor-pointer text-[#a7a7a7] bg-none hover:bg-secondary"
              >
                ▲
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap py-1 w-full border border-tertiary rounded-md bg-gradient-to-t from-secondary to-tertiary px-2">
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
                step={0.25}
                value={multiplier}
                onChange={(e) => setMultiplier(parseFloat(e.target.value))}
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
        onClick={SatrtGame}
        disabled={player.isOnline}
        className="w-full p-2.5 mt-5 rounded-sm bg-is-gray text-white text-sm leading-[20px] font-[600] hover:bg-gradient-to-r hover:from-is-pink hover:to-is-orange disabled:bg-is-light"
      >
        {player.isOnline ? "Game is running" : "Start"}
      </button>
      <div className="mt-5 mb-1.5">
        <span>🎗️ Current Round</span>
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
      <div className="mt-5 mb-1.5">⚡ Speed</div>
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
