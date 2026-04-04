export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-purple-600">QPG</div>
        <div className="flex gap-6">
          <a href="#features" className="text-gray-700 hover:text-purple-600 transition">Features</a>
          <a href="#about" className="text-gray-700 hover:text-purple-600 transition">About</a>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Based Question Paper Generator
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Generate comprehensive question papers automatically using AI and Bloom's taxonomy.
          Perfect for educators, training institutions, and exam preparation.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-purple-700 transition">
            Start Creating
          </button>
          <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg text-lg hover:bg-purple-50 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered</h3>
              <p className="text-gray-600">
                Leverages advanced AI to generate intelligent, contextual questions
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Bloom's Taxonomy</h3>
              <p className="text-gray-600">
                Questions aligned with Bloom's cognitive levels for better learning outcomes
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast & Easy</h3>
              <p className="text-gray-600">
                Generate question papers in minutes with our intuitive interface
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join educators worldwide in revolutionizing question paper generation
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            Create Your First Paper
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2026 AI Question Paper Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
