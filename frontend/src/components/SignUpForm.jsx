import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  const { signup, loading } = useAuthStore();
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        signup({ name, email, password, gender, age, genderPreference });
      }}
    >
      {/* name input */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      {/* email input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      {/* password input */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      {/* age input */}
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <div className="mt-1">
          <input
            id="age"
            name="age"
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      {/* gender input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Gender
        </label>
        {/* male */}
        <div className="mt-1 flex gap-2">
          <div className="flex items-center">
            <input
              id="male"
              name="gender"
              type="checkbox"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="h-4 w-4 text-pink-600 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-gray-900">
              Male
            </label>
          </div>
        </div>
        {/* female */}
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              id="female"
              name="gender"
              type="checkbox"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="h-4 w-4 text-pink-600 border-gray-300 rounded"
            />
            <label
              htmlFor="female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
        </div>
      </div>
      {/* gender preference input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prefer Me
        </label>
        {/* male */}
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              id="male"
              name="genderPreference"
              type="radio"
              checked={genderPreference === "male"}
              onChange={() => setGenderPreference("male")}
              className="h-4 w-4 text-pink-600 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-gray-900">
              Male
            </label>
          </div>
        </div>
        {/* female */}
        <div className="mt-1 flex gap-2">
          <div className="flex items-center">
            <input
              id="female"
              name="genderPreference"
              type="radio"
              checked={genderPreference === "female"}
              onChange={() => setGenderPreference("female")}
              className="h-4 w-4 text-pink-600 border-gray-300 rounded"
            />
            <label
              htmlFor="female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
        </div>
        {/* Both */}
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              id="both"
              name="genderPreference"
              type="radio"
              checked={genderPreference === "both"}
              onChange={() => setGenderPreference("both")}
              className="h-4 w-4 text-pink-600 border-gray-300 rounded"
            />
            <label htmlFor="both" className="ml-2 block text-sm text-gray-900">
              Both
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          loading
            ? "bg-pink-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 "
        }`}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};

export default SignUpForm;
