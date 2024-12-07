import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EmailVerify = () => {
  const param = useParams();
  const [values, setValues] = useState({
    error: "",
    success: false,
  });

  const { error, success } = values;

  // verify process
  useEffect(() => {
    const token = param.token;
    fetch(`/api/confirmation/${token}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({ ...values, error: "", success: true });
        }
      })
      .catch((err) => console.log(err));
  }, [param.token]);

  const showError = () => {
    return (
      <div
        className="bg-red-100 text-red-800 p-4 rounded-lg"
        style={{ display: error ? "" : "none" }}
        role="alert"
      >
        <strong className="font-bold text-sm mr-2">Error!</strong>
        <span className="block text-sm sm:inline max-sm:mt-2">{error}</span>
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="bg-green-100 text-green-800 p-4 rounded-lg"
        style={{ display: success ? "" : "none" }}
        role="alert"
      >
        <strong className="font-bold text-sm mr-2">Success!</strong>
        <span className="block text-sm sm:inline max-sm:mt-2">
          Your email has been verified successfully. Go to login page
        </span>
      </div>
    );
  };

  return (
    <>
      {showError()}
      {showSuccess()}
    </>
  );
};

export default EmailVerify;