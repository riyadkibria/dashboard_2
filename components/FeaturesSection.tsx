export default function FeaturesSection() {
  const features = [
    { title: "Fast", desc: "Quick load times and lag-free interaction." },
    { title: "Responsive", desc: "Looks great on all screen sizes." },
    { title: "Modern", desc: "Built with the latest technologies." },
  ];

  return (
    <section className="bg-gray-50 px-6 py-12">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Why Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
