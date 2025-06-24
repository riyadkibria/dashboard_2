import { FaCheck } from "react-icons/fa";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  badge?: string;
  gradient?: boolean;
  icon?: string;
}

export default function PricingCard({
  name,
  price,
  features,
  badge,
  gradient = false,
  icon,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-8 border transition hover:shadow-2xl relative ${
        gradient
          ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white border-transparent"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-yellow-400 text-gray-900 px-3 py-1 rounded-full shadow-sm">
          {badge}
        </span>
      )}

      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-2xl font-semibold mb-2">{name}</h3>
      <p className={`text-xl mb-6 ${gradient ? "text-white" : "text-gray-700"}`}>
        {price}
      </p>

      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <FaCheck className={`text-sm ${gradient ? "text-white" : "text-green-600"}`} />
            <span className={gradient ? "text-white" : "text-gray-700"}>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-medium transition ${
          gradient
            ? "bg-white text-indigo-700 hover:bg-gray-100"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        Get Started
      </button>
    </div>
  );
}
