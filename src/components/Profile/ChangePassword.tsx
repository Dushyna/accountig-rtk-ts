import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountApi.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const dispatch = useAppDispatch();

    const handleClickSave = () => {
        if (newPassword === newPasswordConfirm) {
            dispatch(changePassword({newPassword, oldPassword}));
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