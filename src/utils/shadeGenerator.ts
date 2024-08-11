export const shadeGenerator = (
  colorCode: string,
  factor: number,
  type: "tint" | "shade" = "tint"
): string => {
  const color = colorCode.length === 7 ? colorCode.slice(1) : colorCode;
  if (color.length === 6 || color.length === 3) {
    let r: number, g: number, b: number;

    if (color.length === 6) {
      r = parseInt(color.slice(0, 2), 16);
      g = parseInt(color.slice(2, 4), 16);
      b = parseInt(color.slice(4, 6), 16);
    } else {
      r = parseInt(color.slice(0, 1) + color.slice(0, 1), 16);
      g = parseInt(color.slice(1, 2) + color.slice(1, 2), 16);
      b = parseInt(color.slice(2, 3) + color.slice(2, 3), 16);
    }

    let new_r: number, new_g: number, new_b: number;

    if (type === "tint") {
      new_r = r + (Math.ceil(((255 - r) * (100 - factor)) / 100) % 255);
      new_g = g + (Math.ceil(((255 - g) * (100 - factor)) / 100) % 255);
      new_b = b + (Math.ceil(((255 - b) * (100 - factor)) / 100) % 255);
    } else if (type === "shade") {
      new_r = Math.floor(r * (factor / 100));
      new_g = Math.floor(g * (factor / 100));
      new_b = Math.floor(b * (factor / 100));
    } else {
      return colorCode;
    }

    return (
      "#" +
      new_r.toString(16).padStart(2, "0") +
      new_g.toString(16).padStart(2, "0") +
      new_b.toString(16).padStart(2, "0")
    );
  }

  return colorCode;
};
