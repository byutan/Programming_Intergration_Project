# Đồ án tổng hợp 251

## Overall
Nền tảng tuyển dụng freelancer tích hợp hỗ trợ template hợp đồng được xây dựng nhằm kết nối giữa khách hàng có nhu cầu thuê dịch vụ và các freelancer cung cấp kỹ năng chuyên môn. Dự án không chỉ tập trung vào việc tạo ra môi trường tuyển dụng linh hoạt và minh bạch mà còn tích hợp tính năng hỗ trợ **soạn thảo, ký kết và quản lý hợp đồng** trực tiếp trên nền tảng, giúp giảm thiểu rủi ro trong quá trình hợp tác. Hệ thống cho phép người dùng đăng ký tài khoản với vai trò **freelancer** hoặc **client**, đăng tải thông tin cá nhân, đăng việc hoặc ứng tuyển vào các dự án. Dự án hướng đến mục tiêu xây dựng một giải pháp toàn diện, kết hợp giữa **tuyển dụng trực tuyến** và **quản lý hợp đồng thông minh**, mang lại trải nghiệm liền mạch và tin cậy cho cả người thuê và người làm tự do.


## Teck Stack
- **Frontend:** ReactJS (Dev sever: Vite)
- **Backend:** ExpressJS (NodeJS)
- **Database:** MySQL

## Folder structure
<section id="project-structure">
  <h2>Project Structure</h2>
  <pre><code>
project
│
├── client/                     
│   ├── node_modules
│   ├── src/
│   │   ├── components/           # Các thành phần UI (NavBar, SignUpForm, ...)
│   │   └── assets/               # Hình ảnh, logo, icon
│   ├── App.jsx                   # Cấu hình các component
│   ├── main.jsx                  
│   ├── index.css
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.lock.json
│   ├── package.json
│   ├── README.md
│   ├── .gitignore
│   └── vite.config.js
│
├── server/       
│   ├── node_modules
│   ├── data/                     # Dữ liệu dạng json 
│   ├── public/                   
│   ├── src/
│   │   ├── routes/               # Định nghĩa các API route
│   │   ├── app.js                # Cấu hình các API
│   ├── .env                      # Thông tin môi trường
│   ├── package.json
└── └── server.js
  </code></pre>
</section>


