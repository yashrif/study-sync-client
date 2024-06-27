"use client";

import studySync from "@/api/studySync";
import { useEffect } from "react";

const Demo = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studySync.get("/demo-controller");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return <div>Demo</div>;
};

export default Demo;
