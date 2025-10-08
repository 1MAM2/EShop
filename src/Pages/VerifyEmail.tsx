import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("E-posta doğrulanıyor...");
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      setMessage("Token bulunamadı.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `https://asp-net-web-api-ym61.onrender.com/api/Auth/verify-email?token=${token}`
        );

        if (!res.ok) {
          const errText = await res.text();
          setMessage(`Doğrulama başarısız: ${errText}`);
          return;
        }
        const data = await res.text();
        navigate("/email-verified-success")
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
