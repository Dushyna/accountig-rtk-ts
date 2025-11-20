import ProfileDate from "./ProfileDate.tsx";
import UpdateUser from "./UpdateUser.tsx";

const Profile = () => {

  const handleClickLogout = () => {
      // TODO logout
      alert("Logout");
  }


    return (
        <div>
            <ProfileDate/>
            <button onClick={handleClickLogout}>Logout</button>
            <UpdateUser/>
        </div>
    );
};

export default Profile;