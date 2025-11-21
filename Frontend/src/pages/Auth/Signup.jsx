// src/pages/Auth/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authThunks";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  // local validations
  const validators = {
    firstName: (v) => (v.length < 2 ? "First name must be at least 2 chars" : ""),
    lastName: (v) => (v.length < 2 ? "Last name must be at least 2 chars" : ""),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Invalid email format",
    password: (v) =>
      v.length < 6 ? "Password must be at least 6 characters" : "",
  };

  const validateField = (name, value) => {
    const msg = validators[name] ? validators[name](value) : "";
    setErrors((prev) => ({ ...prev, [name]: msg }));
    return msg === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    validateField(name, value);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    Object.keys(validators).forEach((k) => {
      const msg = validators[k](form[k]);
      if (msg) valid = false;
      newErrors[k] = msg;
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(registerUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error(res.payload);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FIRST NAME */}
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-sm text-gray-600"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
