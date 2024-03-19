import React from 'react';
import { loginUser } from '../../services/API/authApi';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const login = async (data, e) => {
    e.preventDefault(); // Ngăn chặn sự kiện mặc định của form
    try {
      console.log(data);
      await loginUser(data);
      navigate('/admin');
      toast.success(" 🦄 Đăng nhập thành công");
    } catch (error) {
      if (error.response) {
        // Nếu có response từ server
        const statusCode = error.response.status;
        if (statusCode === 401) {
          toast.warn('Email không tồn tại!');
        } else if (statusCode === 402) {
          toast('mật khẩu không chính xác!');
        } else {
          // Xử lý các lỗi khác và hiển thị thông báo
          const errorMessage = error.response.data.message || 'Đã xảy ra lỗi khi đăng nhập.';
          toast.error(errorMessage);
        }
      } else {
        // Nếu không có response từ server (ví dụ: không thể kết nối đến server)
        toast.error('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
        <form className="mb-4" onSubmit={(e) => handleSubmit(login)(e)}>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">Username or Email</label>
            <input
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              className={`w-full border rounded p-2 outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              type="email"
              id="email"
              placeholder="Email"
           
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">Password</label>
            <input
              {...register('password', { required: 'Password is required' })}
              className={`w-full border rounded p-2 outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              type="password"
              id="password"
              placeholder="Password"
            
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <a className="text-blue-700 text-center text-sm" href="/login">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;