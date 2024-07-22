import { home } from "@/assets/data/dashboard/settings";
import PageHeading from "../_components/PageHeading";
import Profile from "./_profile";

const Settings = () => {
  return (
    <div>
      <PageHeading
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <div className="flex flex-col gap-24">
        <Profile />
      </div>
    </div>
  );
};

export default Settings;
