import { authService } from "../Services/AuthService";
import type { UserRegisterDTO } from "../types/UserTypes/UserRegisterDTO";

const Account = () => {
  const bilgiler: UserRegisterDTO = {
    UserName: "Mahmut",
    Password: "123456",
    Role: "",
  };
    const bilgiler2 = {
    UserName: "Mahmut",
    Password: "123456",
  };

  const handleClick = () => {
    authService.register(bilgiler);
    console.log("Kayıt başarılı");
    
  };
   const handleLogin = () => {
    authService.login(bilgiler2);
    console.log("Giriş başarılı");
    
  };
   const handleLogout = () => {
    authService.logout(1);
    console.log("Çıkış başarılı");
    
  };
  return (
    <div className="flex justify-center items-center gap-20">
      <button
        className="text-center w-96 h-48 bg-green-900 text-6xl text-white cursor-pointer"
        onClick={() => handleClick()}
      >
        Kayıt ol
      </button>
      <button
        className="text-center w-96 h-48 bg-green-900 text-6xl text-white cursor-pointer"
        onClick={() => handleLogin()}
      >
        Giriş yap
      </button>
      <button
        className="text-center w-96 h-48 bg-green-900 text-6xl text-white cursor-pointer"
        onClick={() => handleLogout()}
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default Account;
