import { profile } from "@/assets/data/dashboard/settings";
import SectionHeading from "../../../_components/SectionHeading";
import ChangePassword from "./ChangePassword";
import PersonalInfo from "./PersonalInfo";
import GoogleOAuth from "./GoogleOAuth";

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
        <GoogleOAuth/>
        <ChangePassword />
      </div>
    </section>
  );
};

export default Profile;
