export default function Toaster({ message, type = "success" }) {
  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out fixed top-4 right-4 z-50`}
    >
      {message}
    </div>
  );
}
