import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useChangePasswordMutation, useFetchUserQuery} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";
import {setToken} from "../../features/token/tokenSlice.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const dispatch = useAppDispatch();
const [changePassword]=useChangePasswordMutation();
const token1= useAppSelector(state=>state.token);
const {data}=useFetchUserQuery(token1)
    const handleClickSave = async () => {
        if (newPassword === newPasswordConfirm) {
            console.log("old token ",token1);
            const token=createToken(data!.login, oldPassword);
            console.log("old token2 ",token);

            try {
                 await changePassword({token,newPassword});


                dispatch(setToken(createToken(data!.login, newPassword)));

            }catch(err){
                console.log('change password ',err);
            }
            close();

        } else {
            alert('Password do not match');
        }
    }


    const handleClickClear = () => {
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
    }


    return (
        <div>
            <label>Old Password:
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

            </label>
            <label>New Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

            </label>

            <label>New Password Confirm:
                <input
                    type="password"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />

            </label>
            <button onClick={handleClickSave}>Save</button>
            <button onClick={close}>Close</button>
            <button onClick={handleClickClear}>Clear</button>

        </div>
    );
};

export default ChangePassword;