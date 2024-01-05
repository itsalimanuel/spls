"use client";
import { useSelector } from "react-redux";
export const Rank = () => {
  const playerRank = useSelector((state: any) => state.player.rank);
  const player = useSelector((state: any) => state.player);
  const listRank = Array.isArray(playerRank) ? [...playerRank] : [];

  return (
    <div className="w-full h-full flex flex-col">
      <span className="mb-3">📊 Ranking</span>
      <div className="bg-secondary rounded-sm border border-tertiary overflow-hidden">
        <table className="bg-table text-is-light-gray text-xs w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {listRank
              .sort((a: any, b: any) => b.score - a.score)
              .map((user: any, index: number) => (
                <tr
                  key={index}
                  className={`text-center  bg-[#222832] ${
                    user.name === "You" && !player.isOnline && user.score !== 0
                      ? "text-is-pink"
                      : ""
                  }`}
                >
                  <td className="py-1.5">{index + 1}</td>
                  <td className="py-1.5">
                    {player.isOnline || user.score == 0 ? "-" : user.name}
                  </td>
                  <td className="py-1.5">
                    {player.isOnline || user.score == 0 ? "-" : user.score}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
