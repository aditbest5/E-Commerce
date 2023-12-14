import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerHandler, RegisterUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const registerInput = useSelector(RegisterUser);
  const navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    dispatch(registerHandler({ [name]: value }));
  };

  const registerButton = (e) => {
    e.preventDefault();
    const {
      email,
      username,
      password,
      firstname,
      lastname,
      city,
      street,
      number,
      zipcode,
      lat,
      long,
      phone,
    } = registerInput;
    const data = {
      email,
      username,
      password,
      firstname,
      lastname,
      address: {
        city,
        street,
        number,
        zipcode,
        geolocation: {
          lat,
          long,
        },
      },
      phone,
    };
    fetch("https://fakestoreapi.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        Swal.fire({
          title: "Register Success!!",
          text: "Please Login!",
          icon: "success",
        });
        navigate("/login");
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-row justify-center">
          <h1 className="text-3xl font-bold text-white">
            <Link to={"/"}>
              <span className="text-yellow-300">Toko</span>Kita
            </Link>
          </h1>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={registerButton} method="POST">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstname"
                name="firstname"
                type="text"
                autoComplete="firstname"
                onChange={inputHandler}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="lastname"
                name="lastname"
                type="text"
                autoComplete="lastname"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="city"
                name="city"
                type="text"
                autoComplete="city"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="street"
                name="street"
                type="text"
                autoComplete="street"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="number"
                name="number"
                type="number"
                autoComplete="number"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Zip Code
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="zipcode"
                name="zipcode"
                type="zipcode"
                autoComplete="zipcode"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lat"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Geolocation latitude
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="lat"
                name="lat"
                type="text"
                autoComplete="lat"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="long"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Geolocation longitude
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="long"
                name="long"
                type="text"
                autoComplete="long"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                onChange={inputHandler}
                id="phone"
                name="phone"
                type="phone"
                autoComplete="phone"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Have an account?{" "}
          <Link to="/login">
            <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign In
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
