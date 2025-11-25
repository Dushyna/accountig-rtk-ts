import ProfileDate from "./ProfileDate.tsx";
import UpdateUser from "./UpdateUser.tsx";
import {clearToken} from "../../features/token/tokenSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";

const Profile = () => {
    const dispatch = useAppDispatch();
    const handleClickLogout = () => {
        dispatch(clearToken());
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