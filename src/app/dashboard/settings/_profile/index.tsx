import SectionHeading from "../../_components/SectionHeading";
import { profile } from "@/assets/data/dashboard/settings";
import PersonalInfo from "./PersonalInfo";

const Profile = () => {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        title={profile.title}
        Icon={profile.Icon}
        description={profile.description}
      />

      <div className="flex flex-col gap-24">
        <PersonalInfo />
      </div>
    </div>
  );
};

export default Profile;
