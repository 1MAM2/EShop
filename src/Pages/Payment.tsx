import { useEffect, useState } from "react";
import { SignalRService } from "../Services/SignalRService";

const Payment = () => {
  const [html, setHtml] = useState<string>("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const success = "Payment success";

  const pay = async () => {
    try {
      const res = await fetch("http://localhost:5039/PaymentContoller/pay");
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
  }, []);

  // const blob = new Blob([res.Content],{type:"text/html"});
  // const obj = URL.createObjectURL(blob)
  // console.log("obje",obj,"blooob",blob);

  // setHtml(obj);

  return (
    <div className="text-center">
      {html && (
        <div>
          {isPaymentSuccess ? (
            <h1>{success}</h1>
          ) : (
            <iframe
              src={html}
              width={500}
              height={500}
              title="3D Secure"
              style={{ border: "none" }}
            ></iframe>
          )}
        </div>
      )}
      <button onClick={pay} className="w-7xl text-2xl text-white bg-blue-950">
        Pay
      </button>
    </div>
  );
};
export default Payment;
