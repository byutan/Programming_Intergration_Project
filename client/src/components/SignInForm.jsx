import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../contexts/UseAuth';
import * as z from 'zod';

const signInSchema = z.object({
    email: z.email("Địa chỉ email không hợp lệ."),
    password: z.string()
        .min(8, "Mật khẩu từ 8 ký tự trở lên.")
        .regex(/[0-9]/, "Mật khẩu có ít nhất 1 ký tự số.")
        .regex(/[A-Z]/, "Mật khẩu có ít nhất 1 ký tự in hoa.")
        .regex(/[a-z]/, "Mật khẩu có ít nhất 1 ký tự in thường.")
        .regex(/[\W_]/, "Mật khẩu có ít nhất 1 ký tự đặc biệt.")
});

export default function SignInForm() {
    const [serverMessage, setServerMessage] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signInSchema),
        mode: "onChange"
    });
    const { setUser } = useAuth();
    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:3000/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            const result = await res.json();
            if (res.ok) {
                setServerMessage({ type: "success", text: result.message || "Đăng nhập thành công." });
                setUser({ role: result.role, email: result.email });
                localStorage.setItem("user", JSON.stringify({ role: result.role, email: result.email }));
                navigate('/homepage');
            } else {
                setServerMessage({ type: "error", text: result.message || "Email hoặc mật khẩu không đúng. Vui lòng thử lại." });
            }
        } catch {
            setServerMessage({ type: "error", text: "Không thể kết nối tới server." })
        }
    };

    const onError = (errors) => {
        console.log(errors);
        setServerMessage({ type: "error", text: "Vui lòng điền vào chỗ trống." });
    };
    return (
        <div>
            <div className="fade-slide-in flex justify-center text-3xl mb-6 mt-16">
                Đăng nhập tài khoản của bạn
            </div>

            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="fade-slide-in max-w-md mx-auto p-4 font-nunito"
            >
                {/* Email */}
                <div className="mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full border border-gray-300 p-2 rounded focus:border-black hover:border-black transition-colors duration-300"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full border border-gray-300 p-2 rounded focus:border-black hover:border-black transition-colors duration-300"
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                        ĐĂNG NHẬP
                    </button>
                </div>

                {/* Server message */}
                {serverMessage && (
                    <p
                        className={`text-center mt-4 ${serverMessage.type === "error"
                            ? "text-red-500"
                            : "text-green-500"
                            }`}
                    >
                        {serverMessage.text}
                    </p>
                )}

                {/* Link chuyển hướng */}
                <div className="flex justify-center mt-3 text-gray-400">
                    Chưa có tài khoản?
                    <Link to="/signup">
                        <button className="text-black ml-1 hover:underline transition-all duration-300 font-bold">
                            Đăng ký ngay
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}