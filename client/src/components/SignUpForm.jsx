import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Link } from "react-router-dom";

const signUpSchema = z.object({
    fullName: z.string().nonempty("Vui lòng điền vào chỗ trống"),
    email: z.email("Địa chỉ email không hợp lệ."),
    password: z.string()
        .min(8, "Mật khẩu từ 8 ký tự trở lên.")
        .regex(/[0-9]/, "Mật khẩu có ít nhất 1 ký tự số.")
        .regex(/[A-Z]/, "Mật khẩu có ít nhất 1 ký tự in hoa.")
        .regex(/[a-z]/, "Mật khẩu có ít nhất 1 ký tự in thường.")
        .regex(/[\W_]/, "Mật khẩu có ít nhất 1 ký tự đặc biệt."),
    confirmedPassword: z.string(),
    role: z.enum(["freelancer", "customer"], {
        required_error: "Vui lòng chọn vai trò",
        invalid_type_error: "Vai trò không hợp lệ"
    })
}).refine(data => data.password === data.confirmedPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmedPassword"]
});

export default function SignUpForm() {
    const [serverMessage, setServerMessage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchema),
        mode: "onChange"
    });
    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.fullName,
                    email: data.email,
                    password: data.password,
                    confirmedPassword: data.confirmedPassword,
                    role: data.role
                }),
            });
            const result = await res.json();
            if (res.ok) {
                setServerMessage({ type: "success", text: result.message || "'Đăng ký tài khoản thành công." });
            } else {
                setServerMessage({ type: "error", text: result.error || "Đăng ký tài khoản thất bại. Vui lòng thử lại sau." });
            }
            console.log("Form data:", data);
        } catch {
            setServerMessage({ type: "error", text: "Không thể kết nối tới server." });
        }
    }
    return (
        <div>
            <div className="flex justify-center text-3xl mb-6 mt-16">
                Đăng ký tài khoản để bắt đầu sử dụng ngay
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 font-nunito">
                <div className="mb-4">
                    <label>Họ và tên</label>
                    <input {...register("fullName")} className="w-full border border-gray-300 p-2 rounded focus:border-black hover:border-black transition-colors duration-300" />
                    {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                </div>
                <div className="mb-4">
                    <label>Email</label>
                    <input {...register("email")} className="w-full border border-gray-300 p-2 rounded focus:border-black hover:border-black transition-colors duration-300" />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label>Mật khẩu</label>
                    <input type="password" {...register("password")} className="w-full border border-gray-300 p-2 rounded focus:border-black hover:border-black transition-colors duration-300" />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <label>Xác nhận mật khẩu</label>
                    <input type="password" {...register("confirmedPassword")} className="w-full border border-gray-300 p-2 rounded focus:border-black hover:border-black transition-colors duration-300" />
                    {errors.confirmedPassword && <p className="text-red-500">{errors.confirmedPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <div className="flex gap-20 justify-center">
                        <label className="flex items-center gap-2 ">
                            <input
                                type="radio"
                                value="freelancer"
                                {...register("role")}
                                className="accent-green-300 h-4 w-4"
                            />
                            Tôi là freelancer
                        </label>

                        <label className="flex items-center gap-2 ">
                            <input
                                type="radio"
                                value="customer"
                                {...register("role")}
                                className="accent-green-300 h-4 w-4"
                            />
                            Tôi là khách hàng
                        </label>
                    </div>
                    {errors.role && <p className="text-red-500">{errors.role.required_error}</p>}
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                        ĐĂNG KÝ
                    </button>
                </div>
                {serverMessage && (
                    <p
                        className={`text-center mt-4 ${serverMessage.type === "error" ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {serverMessage.text}
                    </p>
                )}
                <div className='flex justify-center mt-3 text-gray-400'>
                    Hoặc chưa có tài khoản?
                    <Link to='/signin'>
                        <button className='text-black ml-1 hover:underline transition-all duration-300 font-bold'>
                            Đăng nhập ngay
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

