import React from 'react';
import '../css/style.css'; 

const Footer = () => {
  return (
    <footer className="apple-footer">
      <div className="container py-5">
        {/* Phần ghi chú */}
        <div className="footer-notes pb-3 mb-4 border-bottom">
          <p>
            1. Apple Intelligence sẽ khả dụng ở bản beta trên tất cả các mẫu iPhone 16, iPhone 15 Pro và iPhone 15 Pro Max vào đầu năm 2026.
          </p>
          <p>
            2. Chương trình đổi điểm thưởng áp dụng cho các khách hàng đủ điều kiện. Giá trị đổi máy có thể thay đổi tùy theo tình trạng thiết bị.
          </p>
        </div>

        {/* Phần liên kết - Footer Links */}
        <div className="row footer-links">
          {/* Cột 1: Mua sắm */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold">Mua sắm và tìm hiểu</h6>
            <ul className="list-unstyled">
              <li><a href="#">Cửa hàng</a></li>
              <li><a href="#">Mac</a></li>
              <li><a href="#">iPad</a></li>
              <li><a href="#">iPhone</a></li>
              <li><a href="#">Watch</a></li>
              <li><a href="#">AirPods</a></li>
            </ul>
          </div>

          {/* Cột 2: Dịch vụ */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold">Dịch vụ</h6>
            <ul className="list-unstyled">
              <li><a href="#">Apple Music</a></li>
              <li><a href="#">Apple TV+</a></li>
              <li><a href="#">iCloud</a></li>
              <li><a href="#">Apple Pay</a></li>
              <li><a href="#">Apple Books</a></li>
            </ul>
          </div>

          {/* Cột 3: Tài khoản */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold">Tài khoản</h6>
            <ul className="list-unstyled">
              <li><a href="#">Quản lý ID Apple</a></li>
              <li><a href="#">Tài khoản Apple Store</a></li>
              <li><a href="#">iCloud.com</a></li>
            </ul>
          </div>

          {/* Cột 4: Giá trị cốt lõi */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold">Giá trị của Apple</h6>
            <ul className="list-unstyled">
              <li><a href="#">Khả năng truy cập</a></li>
              <li><a href="#">Môi trường</a></li>
              <li><a href="#">Quyền riêng tư</a></li>
            </ul>
          </div>

          {/* Cột 5: Về Apple (Rộng hơn) */}
          <div className="col-12 col-md-6 col-lg-4">
            <h6 className="fw-bold">Về Apple</h6>
            <ul className="list-unstyled">
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Cơ hội việc làm</a></li>
              <li><a href="#">Nhà đầu tư</a></li>
              <li><a href="#">Đạo đức & Tuân thủ</a></li>
            </ul>
          </div>
        </div>

        {/* Phần cuối trang - Copyright & Legal */}
        <div className="footer-bottom pt-4 mt-4 border-top">
          <p className="text-secondary mb-2">
            Xem thêm cách mua hàng: <a href="#" className="text-primary text-decoration-none">Tìm Cửa Hàng Apple</a> hoặc <a href="#" className="text-primary text-decoration-none">nhà bán lẻ khác</a> gần bạn. Hoặc gọi 1800-1192.
          </p>
          <div className="d-md-flex justify-content-between align-items-center">
            <p className="mb-0 text-secondary">Bản quyền © 2026 Apple Inc. Bảo lưu mọi quyền.</p>
            <div className="footer-legal-links mt-2 mt-md-0">
              <a href="#">Chính sách bảo mật</a> |{' '}
              <a href="#">Điều khoản sử dụng</a> |{' '}
              <a href="#">Bản đồ trang web</a>
            </div>
            <p className="mb-0 text-secondary">Việt Nam</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;