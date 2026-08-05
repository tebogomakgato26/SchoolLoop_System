export default function ParentRegisterPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center bg-purple-700 text-white p-12">

          <h1 className="text-5xl font-bold mb-6">
            SchoolLoop
          </h1>

          <h2 className="text-3xl font-semibold mb-4">
            Welcome Parent!
          </h2>

          <p className="text-lg leading-8 text-purple-100">
            Stay connected with your child's education anytime,
            anywhere.
          </p>

          <div className="mt-10 space-y-4 text-lg">

            <div>📚 Track Academic Progress</div>

            <div>📅 Receive School Updates</div>

            <div>👨‍🏫 Communicate With Teachers</div>

            <div>📝 View Attendance Records</div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12">

          <h1 className="text-4xl font-bold text-center text-purple-800">
            SchoolLoop
          </h1>

          <p className="text-center text-gray-600 mt-3 mb-10 text-lg">
            Parent Registration
          </p>

          <form className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>

              <input
                type="text"
                placeholder="Enter first name"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Enter last name"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="+27..."
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-semibold py-3 rounded-lg hover:bg-purple-800 transition duration-300"
            >
              Create Account
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-700 font-semibold hover:underline"
              >
                Sign In
              </a>
            </p>

          </form>

        </div>

      </div>

    </main>
  );
}