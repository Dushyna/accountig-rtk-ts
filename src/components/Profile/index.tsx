import ProfileDate from "./ProfileDate.tsx";
import UpdateUser from "./UpdateUser.tsx";
import {useDispatch} from "react-redux";
import {clearToken} from "../../features/token/tokenSlice.ts";
import {clearUser} from "../../features/user/userSlice.ts";

const Profile = () => {
const dispatch = useDispatch();
  const handleClickLogout = () => {
dispatch(clearToken());
dispatch(clearUser());
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