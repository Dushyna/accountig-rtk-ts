import {useState} from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery, useUpdateUserMutation} from "../../features/api/accountApi.ts";

interface Props {
    close: () => void;
}

const EditProfile = ({close}: Props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [updateUser]=useUpdateUserMutation()
    const token=useAppSelector(state=>state.token)
   const {data}= useFetchUserQuery(token);

    const handleClickClear = () => {
        setFirstName('');
        setLastName('');
    }
    const handleClickSave =async () => {
        try {
            await updateUser({userData:{firstName, lastName},token, login: data!.login});

        }catch(err) {
            console.error(err);
        }

        close();
    }


    return (
        <>
            <label>First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <button onClick={handleClickSave}>Save and Close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>

        </>
    );
};

export default EditProfile;