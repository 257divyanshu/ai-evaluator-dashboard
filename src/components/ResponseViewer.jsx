export default function ResponseViewer({ response }) {
  if (!response)
    return (
      <div className="text-gray-500 italic text-center mb-4">
        No response yet — enter a prompt above.
      </div>
    );

  return (
    <div className="bg-gray-50 border p-4 rounded-xl mb-6">
      <h3 className="font-semibold mb-2">AI Response</h3>
      <p className="whitespace-pre-wrap">{response}</p>
    </div>
  );
}
