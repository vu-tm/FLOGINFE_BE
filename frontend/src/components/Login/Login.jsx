import { Eye, EyeOff, LogIn } from 'lucide-react' // Thư viện Icon trạng thái đăng nhập, xuất
import { useNavigate } from 'react-router-dom' // Thư viện Thẻ link 
import { useState } from 'react'
import './LoginPage.css'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Ngăn chặn reload lại trang khi gửi form
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      // Lưu trạng thái đăng nhập (vd: localStorage)
      localStorage.setItem("isLoggedIn", "true");
      navigate("/products");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-header">
            <h2 className='login-title'>Sign in to your account</h2>
          </div>

          <form action="" className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input id="usernamme"
                type="text"
                placeholder='Username'
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              {/* Chưa viết error */}
            </div>

            <div className='input-group password-wrapper'>
              <input id='password'
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Show mật khẩu */}
              <button type='button'
                className='password-toggle'
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className='login-icon-pasword' /> : <Eye className='login-icon-pasword' />}
              </button>
              {/*  Chưa viết Error */}
            </div>

            <button type='submit'
              className='btn-primary'>
              <LogIn className="login-icon-submit" />Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  )
};