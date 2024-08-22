import Planner from "./_dashboard/Planner";
import Stats from "./_dashboard/Stats";
import UserInfo from "./_dashboard/UserInfo";

const page = () => {
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-2 gap-4 w-full py-8 bg-background z-20">
      <UserInfo />
      <Stats />
      <Planner />
    </div>
  );
};

export default page;
