import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");

  const street = useField("text");
  const city = useField("text");
  const zipCode = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.value ||
      !email.value ||
      !password.value ||
      !phoneNumber.value ||
      !gender.value ||
      !street.value ||
      !city.value ||
      !zipCode.value
    ) {
      alert("Please fill in all required fields");
      return;
    }

    await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      address: {
        street: street.value,
        city: city.value,
        zipCode: zipCode.value,
      },
    });

    if (!error) {
      alert("Signup successful!");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />

        <label>Email address:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <label>Phone Number:</label>
        <input {...phoneNumber} />

        <label>Gender:</label>
        <input {...gender} />

        <label>Street:</label>
        <input {...street} />

        <label>City:</label>
        <input {...city} />

        <label>Zip Code:</label>
        <input {...zipCode} />

        <button>Sign up</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
