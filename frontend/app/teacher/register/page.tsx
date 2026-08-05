export default function TeacherRegisterPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center bg-emerald-900 text-white p-12">

          <h1 className="text-5xl font-bold mb-6">
            SchoolLoop
          </h1>

          <h2 className="text-3xl font-semibold mb-4">
            Welcome Teacher!
          </h2>

          <p className="text-lg leading-8 text-emerald-100">
            Manage your classroom with ease and stay connected with
            students, parents and school administration.
          </p>

          <div className="mt-10 space-y-4 text-lg">

            <div>📚 Manage Classes</div>

            <div>📝 Record Student Marks</div>

            <div>📅 Track Attendance</div>

            <div>💬 Communicate With Parents</div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12">

          <h1 className="text-4xl font-bold text-center text-emerald-900">
            SchoolLoop
          </h1>

          <p className="text-center text-gray-600 mt-3 mb-10 text-lg">
            Teacher Registration
          </p>

          <form className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>

              <input
                type="text"
                placeholder="Enter first name"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Enter last name"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="teacher@schoolloop.com"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="+27..."
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-900 text-white font-semibold py-3 rounded-lg hover:bg-emerald-950 transition duration-300"
            >
              Create Account
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-emerald-900 font-semibold hover:underline"
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