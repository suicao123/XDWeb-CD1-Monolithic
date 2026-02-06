import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import CSS Global (Bootstrap & Style riêng)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/style.css';

// 2. Import các trang (Pages)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Khu vực định nghĩa các Route */}
        <Routes>

          {/* Trang chủ: Khi vào đường dẫn "/" thì hiện component Home */}
          <Route path="/" element={<Home />} />

          {/* Trang Đăng nhập */}
          <Route path="/login" element={<Login />} />

          {/* Trang Đăng ký */}
          <Route path="/register" element={<Register />} />

          {/* Ví dụ: Trang chi tiết sản phẩm (Sau này) */}
          <Route path="/detail/:id" element={<ProductDetail />} />
          {/* Ví dụ: Trang giỏ hàng */}
          <Route path="/cart" element={<Cart />} />

          <Route path="/search" element={<SearchResult />} />

          {/* Trang 404 (Nếu người dùng nhập link linh tinh) */}
          <Route path="*" element={
            <div className="text-center mt-5">
              <h1>404</h1>
              <p>Không tìm thấy trang này!</p>
              <a href="/" className="btn btn-primary">Về trang chủ</a>
            </div>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;