import { useState } from "react";
import {
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function BookForm() {
  const [step, setStep] = useState(1);
  const [tourType, setTourType] = useState("Day Tour");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [days, setDays] = useState(1);
  const [tourName, setTourName] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    notes: "",
  });

  const [message, setMessage] = useState(null); // success/error message

  // Dummy prices
  const dayTourPrices = {
    "Kandy Day Tour": 15000,
    "Sigiriya Day Tour": 18000,
    "Galle Day Tour": 16000,
    "Colombo City Tour": 12000,
  };

  const roundTourPricesPerDay = {
    "4 Days Round Tour": 5000,
    "6 Days Round Tour": 4500,
    "8 Days Round Tour": 4000,
    "10 Days Round Tour": 3800,
    "14 Days Round Tour": 3500,
  };

  const dayTours = Object.keys(dayTourPrices);
  const roundTours = Object.keys(roundTourPricesPerDay);
  const destinations = [
    "Colombo",
    "Kandy",
    "Sigiriya",
    "Ella",
    "Nuwara Eliya",
    "Galle",
    "Mirissa",
    "Jaffna",
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Calculate price
  const calculatePrice = () => {
    if (tourType === "Day Tour" && tourName) {
      return (
        dayTourPrices[tourName] * adults +
        0.5 * dayTourPrices[tourName] * children
      );
    }
    if (tourType === "Round Tour" && tourName) {
      return (
        roundTourPricesPerDay[tourName] * days * adults +
        0.5 * roundTourPricesPerDay[tourName] * days * children
      );
    }
    return 0;
  };

  // Simulate submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !tourName ||
      !destination ||
      !paymentData.cardNumber ||
      !paymentData.expiry ||
      !paymentData.cvv
    ) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Random success/failure for demo
      const success = Math.random() > 0.2; // 80% chance success
      if (success) {
        setMessage({
          type: "success",
          text: "Booking successful! Thank you for booking.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Booking failed! Please try again.",
        });
      }
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto shadow-2xl rounded-xl">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6 flex items-center gap-4">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-14 h-14 object-contain"
        />
        <h2 className="text-3xl font-bold">Book Your Tour</h2>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center items-center space-x-6 py-4 bg-blue-50">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 text-lg font-semibold ${
              step === s
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 text-white font-semibold rounded ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form className="p-10 space-y-8 bg-white" onSubmit={handleSubmit}>
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              Step 1: Personal Info
            </h3>
            <div className="flex items-center gap-2">
              <User className="text-blue-700" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-blue-700" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-blue-700" />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          </div>
        )}

        {/* Step 2: Tour Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              Step 2: Tour Details
            </h3>
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Tour Type
              </label>
              <select
                className="w-full border rounded-lg p-3"
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
              >
                <option>Day Tour</option>
                <option>Round Tour</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Tour Name
              </label>
              <select
                className="w-full border rounded-lg p-3"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
              >
                <option value="">Select a Tour</option>
                {(tourType === "Day Tour" ? dayTours : roundTours).map(
                  (t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Destination
              </label>
              <select
                className="w-full border rounded-lg p-3"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select Destination</option>
                {destinations.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            {tourType === "Round Tour" && (
              <div>
                <label className="block mb-1 font-medium text-blue-700">
                  Number of Days
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-3"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  required
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-blue-700">
                  Adults
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-3"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-blue-700">
                  Children
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-3"
                  min="0"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Price Summary */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              Step 3: Price Summary
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Tour:</strong> {tourName}
              </p>
              <p>
                <strong>Destination:</strong> {destination}
              </p>
              {tourType === "Round Tour" && (
                <p>
                  <strong>Days:</strong> {days}
                </p>
              )}
              <p>
                <strong>Adults:</strong> {adults}
              </p>
              <p>
                <strong>Children:</strong> {children}
              </p>
              <p className="text-lg font-semibold">
                <strong>Total Price:</strong> LKR{" "}
                {calculatePrice().toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              Step 4: Payment
            </h3>
            <div className="flex items-center gap-2">
              <CreditCard className="text-blue-700" />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded-lg p-3"
                value={paymentData.cardNumber}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, cardNumber: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-blue-700" />
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border rounded-lg p-3"
                  value={paymentData.expiry}
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, expiry: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full border rounded-lg p-3"
                  value={paymentData.cvv}
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, cvv: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MessageSquare className="text-blue-700 mt-2" />
              <textarea
                placeholder="Special Requests / Notes"
                className="w-full border rounded-lg p-3"
                rows={3}
                value={paymentData.notes}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, notes: e.target.value })
                }
              />
            </div>
            <p className="mt-6 text-center text-gray-700 text-sm">
              Book your tour safely! You will receive a confirmation email. Need
              help? Contact{" "}
              <a
                href="mailto:info@netlankatours.com"
                className="text-blue-700 underline"
              >
                info@netlankatours.com
              </a>
              .
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-blue-100 text-blue-800 px-6 py-2 rounded-lg font-medium hover:bg-blue-200"
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800"
            >
              Submit Booking
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
