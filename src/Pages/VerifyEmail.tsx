import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("E-posta doğrulanıyor...");

  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    if (!token) {
      setMessage("Token bulunamadı.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5039/api/Auth/verify-email?token=${token}`
        );

        if (!res.ok) {
          const errText = await res.text();
          setMessage(`Doğrulama başarısız: ${errText}`);
          return;
        }

        const data = await res.text();
        setMessage("E-posta başarıyla doğrulandı!");
        console.log(data);
        
      } catch (error) {
        setMessage("Sunucuya bağlanırken hata oluştu.");
        console.error(error);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
