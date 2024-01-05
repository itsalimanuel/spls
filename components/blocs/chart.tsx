"use client";
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis,Legend } from "recharts";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const Chart = () => {
  const player = useSelector((state: any) => state.player);

  const calculateSpeed = () => {
    return 3000 + 1000 * player.speed;
  };
  const chartData = useMemo(() => {
    return [{ value: 0 }, { value: 0 }, { value: player.value }];
  }, [player.value]);
  return (
    <div className="w-full h-full">
      <div className="bg-secondary rounded-sm border border-tertiary relative h-[400px] flex items-center justify-center p-4">
        <div className="absolute z-10 top-1/3 text-3xl fon-[500]">
          <CountUp
            start={0}
            end={player.value}
            redraw={false}
            duration={calculateSpeed() / 1000}
            separator=" "
            decimals={2}
            decimal="."
            prefix=""
            suffix="x"
          ></CountUp>
        </div>
        <LineChart width={500} height={300} data={chartData} key={player.value}>
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
            stroke="#FC5C4A"
            dot={true}
            animationDuration={calculateSpeed()}
            hide={player.value === 0}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Chart;
