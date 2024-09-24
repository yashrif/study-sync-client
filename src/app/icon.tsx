import { ImageResponse } from "next/og";

import LogoSmall from "@/components/logo/LogoSmall";

export const runtime = "edge";

export const size = {
  width: 36,
  height: 36,
};
export const contentType = "image/png";

const Icon = () => {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#8B5FBF",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <LogoSmall
          style={{
            width: 30,
            height: 30,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
};

export default Icon;
