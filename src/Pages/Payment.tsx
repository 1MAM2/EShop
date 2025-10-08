import { useEffect, useState } from "react";
import { SignalRService } from "../Services/SignalRService";
import { useParams } from "react-router-dom";

const Payment = () => {
  const [html, setHtml] = useState<string>("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const { transactionId } = useParams();

  const pay = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/Payment/pay/${transactionId}`,
        {
          method: "POST",
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error("Sunucu hatası: " + text);
      }
      const data = await res.json();
      console.log("Gelen veri:", data);
      SignalRService.registerTransacrionId(data.ConversationId);

      const blob = new Blob([data.Content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setHtml(url);
    } catch (err) {
      console.error("An error", err);
    }
  };
  useEffect(() => {
    SignalRService.startConnection();
    SignalRService.paymentResult((res: any) => {
      console.log("SignalR'dan gelen:", res);
      setIsPaymentSuccess(res); // Backend "Receive" metoduyla ne gönderirse
    });
    pay();
  }, [transactionId]);

  return (
    <div className="text-center">
      {html && (
        <div>
          {isPaymentSuccess ? (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
              <h1 className="text-4xl md:text-6xl font-bold text-green-600 drop-shadow-lg mb-4">
                Payment Successful!
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                Your payment has been completed successfully.
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-cyan-700 transition text-2xl"
              >
                Go to Homepage
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <iframe
                src={html}
                width={500}
                height={500}
                title="3D Secure"
                className="rounded-xl shadow-lg border border-gray-300"
                style={{ maxWidth: "90%", maxHeight: "90%" }}
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Payment;
