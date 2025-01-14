import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
    const { logout } = useLogout();

    return (
        <div className="mt-auto">
            <CiLogout className="h-6 w-6 cursor-pointer" onClick={logout} />
        </div>
    );
}

export default LogoutButton;
