const GenericInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={value}
            onChange={onChange}
        />
    );
};

export default GenericInput;
