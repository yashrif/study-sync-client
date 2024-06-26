export const secondsFormatter = (data: number) => {
  return {
    hours: Math.floor(data / 3600),
    minutes: Math.floor((data % 3600) / 60),
    seconds: Math.floor((data % 3600) % 60),
  };
};
