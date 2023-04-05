import "./ErrorBox.css";

export const ErrorBox = ({ err }) => {
    return (
        <div className="errorBox" >
            <p>{err.message}</p>
        </div >
    );
}