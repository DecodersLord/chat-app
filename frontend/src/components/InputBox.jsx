import UserNameInput from "./InputComponents/UserNameInput";
import PasswordInput from "./InputComponents/PasswordInput";
import GenericInput from "./InputComponents/GenericInput";

const InputBox = ({ title, value, onValueChange }) => {
    const handleChange = (e) => {
        onValueChange(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col p-2 space-y-1">
                <h1>{title.toUpperCase()} :</h1>
                {(() => {
                    switch (title) {
                        case "Username":
                            return (
                                <UserNameInput
                                    value={value}
                                    onChange={handleChange}
                                />
                            );
                        case "Password":
                        case "confirm password":
                            return (
                                <PasswordInput
                                    value={value}
                                    onChange={handleChange}
                                />
                            );
                        default:
                            return (
                                <GenericInput
                                    value={value}
                                    onChange={handleChange}
                                />
                            );
                    }
                })()}
            </div>
        </>
    );
};

export default InputBox;
