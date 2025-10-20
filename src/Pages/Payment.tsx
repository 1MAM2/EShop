import { useEffect, useState } from "react";
import { SignalRService } from "../Services/SignalRService";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";

const Payment = () => {
  const [html, setHtml] = useState<string>("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const { transactionId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const pay = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/Payment/pay/${transactionId}`,
        {
          method: "POST",
        }
      );
      let data;
      const text = await res.text(); // gelen yanıtın ne olduğunu öğren
      try {
        console.log("Ham yanıt:", text);
        data = JSON.parse(text);
      } catch (err) {
        console.error("JSON parse edilemedi, gelen veri:", text);
        throw new Error("Beklenmeyen yanıt formatı");
      }
      SignalRService.registerTransacrionId(data.ConversationId);

      const blob = new Blob([data.Content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setHtml(url);
      setLoading(false);
    } catch (err) {
      console.error("An error", err);
      setLoading(false);
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
      {loading ? (
        <Loading />
      ) : (
        html && (
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
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-cyan-700 transition text-2xl"
                >
                  Go to Homepage
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <iframe
                  src={html}
                  title="3D Secure"
                  className="w-[90vw] h-[80vh] max-w-lg rounded-xl shadow-lg border border-gray-300"
                ></iframe>
              </div>
            )}
          </div>
        )
      )}
      {}
    </div>
  );
};
export default Payment;
