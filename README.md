# 🍎 Apple Store E-commerce Project

Dự án website thương mại điện tử chuyên bán các sản phẩm Apple (iPhone, MacBook, iPad...), được xây dựng theo mô hình **Monolithic Architecture** (tách biệt Frontend và Backend qua API).

## 🚀 Giới thiệu (Overview)
Dự án cung cấp nền tảng mua sắm trực tuyến với các chức năng cốt lõi: Xem sản phẩm, Đăng ký/Đăng nhập bảo mật và Quản lý giỏ hàng.

Hiện tại, hệ thống đang hoạt động theo mô hình Client-Server truyền thống:
* **Frontend:** Single Page Application (SPA) với ReactJS.
* **Backend:** RESTful API với Dijango (Core) và Python (Email Service).
* **Database:** MySQL (Dùng chung cho toàn bộ hệ thống).

## 🛠 Công nghệ sử dụng (Tech Stack)

### Frontend
* **ReactJS**: Thư viện xây dựng giao diện người dùng.
* **Axios**: Xử lý HTTP Request gọi API.
* **React Router**: Điều hướng trang.
* **CSS Framework**: (Bootstrap).

### Backend & Database
* **MySQL**: Hệ quản trị cơ sở dữ liệu quan hệ.
* **JWT (JSON Web Token)**: Cơ chế xác thực người dùng (Stateless Authentication).
* **Python Scripts(Dijango)**: Framework chính xử lý Logic, Routing và Database. Module phụ trợ xử lý gửi Email tự động (SMTP).

## ⚙️ Tính năng chính (Features)

### 1. Xác thực & Phân quyền (Authentication)
* Đăng ký tài khoản mới.
* Đăng nhập (Nhận Access Token JWT).

### 2. Quản lý Sản phẩm (Product Management)
* Hiển thị danh sách sản phẩm (iPhone, Mac, Watch...).
* Xem chi tiết sản phẩm (Cấu hình, giá bán).

### 3. Giỏ hàng (Shopping Cart)
* Thêm sản phẩm vào giỏ hàng.
* Xem danh sách sản phẩm đã chọn.

---

