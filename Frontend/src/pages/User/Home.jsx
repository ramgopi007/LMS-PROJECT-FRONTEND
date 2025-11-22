const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        <section className="text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">NextLearn</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn new skills, explore high-quality courses, and grow your career.
          </p>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Explore Courses
          </button>
        </section>

      </div>
    </div>
  );
};

export default Home;
