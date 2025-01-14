function Button(props) {
    return (
        <button
            className="btn btn-md w-full btn-warning"
            disabled={props.isLoading}
        >
            {props.isLoading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                props.text
            )}
        </button>
    );
}

export default Button;
