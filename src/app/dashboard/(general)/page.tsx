import Stats from "./_dashboard/Stats";
import UserInfo from "./_dashboard/UserInfo";

const page = () => {
  return (
    <div className="flex flex-wrap gap-4 w-full py-8 bg-background z-20">
      <UserInfo />
      <Stats />
    </div>
  );
};

export default page;
