import PricingCard from "./PricingCard";

export default function PricingSection({ products }) {
  return (
    <section className="bg-white px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
        Choose the Right Plan for You
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map(({ sys, fields }) => (
          <PricingCard
            key={sys.id}
            name={fields.title}
            price={`$${fields.price}/mo`}
            features={fields.features || []}
            badge={fields.badge || ""}
            gradient={fields.gradient || false}
            icon={fields.icon || "📦"}
          />
        ))}
      </div>
    </section>
  );
}
