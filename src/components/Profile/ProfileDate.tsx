import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery} from "../../features/api/accountApi.ts";

const ProfileDate = () => {
    const token = useAppSelector(state => state.token);
    const {data, isLoading} = useFetchUserQuery(token);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <>
            <p>First name: {data.firstName}</p>
            <p>Last name: {data.lastName}</p>
            <p>Login: {data.login}</p>
            <ul>
                {data.roles.map(role => <li key={role}>{role}</li>)}
            </ul>
        </>
    );
};

export default ProfileDate;