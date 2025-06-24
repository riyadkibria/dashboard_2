import { FaCheckCircle } from "react-icons/fa";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  badge?: string;
  gradient?: boolean;
}

export default function PricingCard({
  name,
  price,
  features,
  badge,
  gradient = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative p-8 rounded-2xl shadow-lg transform transition hover:scale-105 ${
        gradient
          ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
          : "bg-white text-gray-800"
      }`}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-sm font-semibold text-black px-4 py-1 rounded-full shadow">
          ⭐ {badge}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 text-center">{name}</h3>
      <p className="text-center text-3xl font-bold mb-6">{price}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full px-4 py-2 rounded-lg font-semibold ${
          gradient
            ? "bg-white text-indigo-600 hover:bg-gray-100"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        } transition`}
      >
        Choose Plan
      </button>
    </div>
  );
}
