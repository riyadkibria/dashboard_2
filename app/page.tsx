@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .home-page {
    @apply min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4 border border-gray-400 rounded-lg p-8 shadow-md;
  }

  .welcome-text {
    @apply text-4xl font-bold text-blue-600;
  }

  .welcome-subtext {
    @apply text-lg text-gray-600;
  }

  .welcome-button {
    @apply mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200;
  }
}
