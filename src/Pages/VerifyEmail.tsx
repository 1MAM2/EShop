import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("E-posta doğrulanıyor...");

  const { token } = useParams();
  useEffect(() => {
    if (!token) {
      setMessage("Geçersiz bağlantı!");
      return;
    }

    fetch(
      `https://asp-net-web-api-ym61.onrender.com/api/auth/verify-email/${token}`,
      {
        method: "GET",
      }
    )
      .then(async (res) => {
        if (res.ok) {
          setMessage("E-posta başarıyla doğrulandı!");
        } else {
          const err = await res.text();
          setMessage("Doğrulama başarısız: " + err);
        }
      })
      .catch(() => {
        setMessage("Sunucuya ulaşılamadı!");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
