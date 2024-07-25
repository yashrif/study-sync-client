import { profile } from "@/assets/data/dashboard/settings";
import SectionHeading from "../../_components/SectionHeading";
import ChangePassword from "./ChangePassword";
import PersonalInfo from "./PersonalInfo";

const Profile = () => {
  return (
    <section id="profile" className="flex flex-col gap-8">
      <SectionHeading
        title={profile.title}
        Icon={profile.Icon}
        description={profile.description}
      />

      <div className="flex flex-col gap-24">
        <PersonalInfo />
        <ChangePassword />
      </div>
    </section>
  );
};

export default Profile;
