"use client";

import { CheckmarkAnimated } from "@/components/icons/CheckmarkAnimated";
import { useEffect } from "react";
import Lottie from "react-lottie";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import spinner from "@lotties/spinner.json";

const Demo = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studySyncDB.get(dbEndpoints.demo);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <CheckmarkAnimated />
      <Lottie options={defaultOptions} height={36} width={36} />
    </div>
  );
};

export default Demo;
