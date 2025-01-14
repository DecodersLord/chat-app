const RadioButton = ({ title, radioButtons, selectedValue, onValueChange }) => {
    const handleChange = (e) => {
        onValueChange(e.target.value);
    };
    return (
        <>
            <div className="flex flex-col p-2 space-y-1">
                <h1>{title.toUpperCase()} :</h1>
                <div className="flex flex-row m-4 justify-center items-center">
                    {radioButtons.map((radioButton, index) => (
                        <label className="label cursor-pointer" key={index}>
                            <span className="mr-2">
                                {radioButton.label.toUpperCase()}
                            </span>
                            <input
                                type="radio"
                                name={title}
                                value={radioButton.label}
                                checked={selectedValue === radioButton.label}
                                onChange={handleChange}
                                className="radio"
                            />
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RadioButton;
