"use client";

import clsx from "clsx";
import React from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

type Props = {
  data: number[];
  isUp?: boolean;
  height?: number;
  className?: string;
};

export default function SparklineChart({
  data,
  isUp = true,
  height = 40,
  className,
}: Props) {
  const formattedData = data.map((price, index) => ({
    index,
    price,
  }));

  return (
    <div className={clsx("w-full cursor-pointer", className)}>
      <ResponsiveContainer
        width="100%"
        height={height}
        className="pointer-events-none"
      >
        <LineChart
          data={formattedData}
          //   margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <YAxis type="number" domain={["dataMin - 1", "dataMax + 1"]} hide />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isUp ? "#ADFF2F" : "#FF4C4C"}
            strokeWidth={1}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
