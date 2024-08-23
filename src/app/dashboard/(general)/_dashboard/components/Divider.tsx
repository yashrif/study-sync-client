const Divider: React.FC<{ bg: string }> = ({ bg }) => (
  <div
    className="w-[3px] h-[75%] my-auto rounded-full"
    style={{
      backgroundColor: bg,
    }}
  />
);
export default Divider;
