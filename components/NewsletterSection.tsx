export default function NewsletterSection() {
  return (
    <section className="px-6 py-12 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">Stay Updated</h2>
      <p className="text-gray-600 mt-2 mb-4">
        Subscribe to our newsletter to get the latest updates.
      </p>
      <form
        className="flex flex-col sm:flex-row gap-3 justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="px-4 py-2 border rounded w-full sm:w-64"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
