import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const handleSignUp = async ({
        fullName,
        userName,
        password,
        confirmPassword,
        gender,
    }) => {
        const isSuccess = handleInputValidation({
            fullName,
            userName,
            password,
            confirmPassword,
            gender,
        });

        if (!isSuccess) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    userName,
                    password,
                    confirmPassword,
                    gender,
                }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            //localstorage
            localStorage.setItem("chat-app-user", JSON.stringify(data));
            //context
            setAuthUser(data);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleSignUp };
};

export default useSignup;

function handleInputValidation({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
}) {
    console.log("here checking inputs");
    if (
        fullName === "" ||
        userName === "" ||
        password === "" ||
        confirmPassword === "" ||
        gender === ""
    ) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be 6 character long.");
        return false;
    }

    return true;
}
