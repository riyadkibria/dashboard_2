import PricingCard from "./PricingCard";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$19/mo",
      features: [
        "1 Website",
        "Basic Support",
        "500MB Storage",
      ],
      icon: "🧩",
    },
    {
      name: "Pro",
      price: "$49/mo",
      features: [
        "10 Websites",
        "Priority Support",
        "5GB Storage",
        "Custom Domains",
      ],
      badge: "Most Popular",
      gradient: true,
      icon: "🚀",
    },
    {
      name: "Enterprise",
      price: "$99/mo",
      features: [
        "Unlimited Sites",
        "24/7 Premium Support",
        "50GB Storage",
        "Team Access",
        "Advanced Analytics",
      ],
      icon: "🏢",
    },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
        Choose the Right Plan for You
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <PricingCard
            key={i}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            badge={plan.badge}
            gradient={!!plan.gradient}
            icon={plan.icon}
          />
        ))}
      </div>
    </section>
  );
}
