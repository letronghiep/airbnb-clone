"use client";

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
};

function Counter({ title, subTitle, value, onChange }: Props) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);
  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="font-semibold"> {title} </h1>
        <p className="font-light text-neutral-500">{subTitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <span
          className="
                rounded-full
                font-light
                w-10
                h-10
                border
                transition
                cursor-pointer
                flex
                items-center
                justify-center
                hover:opacity-80
            "
          onClick={onReduce}
        >
          <AiOutlineMinus size={24} />
        </span>
        <span className="font-light text-neutral-600 text-xl">{value}</span>
        <span
          className="
                rounded-full
                font-light
                w-10
                h-10
                border
                transition
                cursor-pointer
                flex
                items-center
                justify-center
                hover:opacity-80
            "
          onClick={onAdd}
        >
          <AiOutlinePlus size={24} />
        </span>
      </div>
    </div>
  );
}

export default Counter;
