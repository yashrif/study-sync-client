export const tintGenerator = (colorCode: string, factor: number) => {
  const color = colorCode.length === 7 ? colorCode.slice(1) : colorCode;
  if (color.length === 6 || color.length == 3) {
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

    const new_r = r + (Math.ceil(((255 - r) * (100 - factor)) / 100) % 255);
    const new_g = g + (Math.ceil(((255 - g) * (100 - factor)) / 100) % 255);
    const new_b = b + (Math.ceil(((255 - b) * (100 - factor)) / 100) % 255);

    return (
      new_r.toString(16).padStart(2, "0") +
      new_g.toString(16).padStart(2, "0") +
      new_b.toString(16).padStart(2, "0")
    );
  }

  return color;
};
