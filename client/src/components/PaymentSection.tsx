export default function PaymentSection() {
  const paymentMethods = [
    {
      name: "Cash",
      icon: "fas fa-money-bill-wave",
      color: "text-green-600"
    },
    {
      name: "Zelle",
      icon: "fas fa-mobile-alt",
      color: "text-purple-600"
    },
    {
      name: "Cash App",
      icon: "fas fa-dollar-sign",
      color: "text-green-500"
    },
    {
      name: "Visa",
      icon: "fab fa-cc-visa",
      color: "text-blue-600"
    },
    {
      name: "Mastercard",
      icon: "fab fa-cc-mastercard",
      color: "text-red-600"
    },
    {
      name: "Amex",
      icon: "fab fa-cc-amex",
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Payment Options</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We accept all major payment methods for your convenience
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <i className={`${method.icon} text-3xl ${method.color} mb-2`}></i>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{method.name}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            No upfront payment required. Pay after service completion.
          </p>
        </div>
      </div>
    </section>
  );
}