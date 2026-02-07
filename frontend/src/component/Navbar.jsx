import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css';

import MegaMenuMac from './mega-menu/MegaMenuMac';
import MegaMenuIpad from './mega-menu/MegaMenuIpad';
import MegaMenuWatch from './mega-menu/MegaMenuWatch';
import MegaMenuIphone from './mega-menu/MegaMenuIphone';
import MegaMenuAirpod from './mega-menu/MegaMenuAirpod';
const Navbar = () => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");



    useEffect(() => {
        // Kiểm tra đăng nhập (Logic cũ của initAuthUI)
        const checkAuth = () => {
            const storedUser = localStorage.getItem('user'); // Hoặc lấy từ cookie
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        checkAuth();


    }, []);

    // Tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault(); // Chặn reload trang
        if (keyword.trim()) {

            navigate(`/search?q=${encodeURIComponent(keyword)}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        alert("Đã đăng xuất");
        window.location.href = '/login';
    };

    // Danh sách các mục menu cần có Mega Menu
    const menuItems = [
        { id: 'mac', label: 'Macbook', link: '/product/mac' },
        { id: 'ipad', label: 'iPad', link: '/product/ipad' },
        { id: 'watch', label: 'Apple Watch', link: '/product/watch' },
        { id: 'iphone', label: 'iPhone', link: '/product/iphone' },
        { id: 'airpod', label: 'AirPods', link: '/product/airpod' },
    ];
    return (
        <nav className="navbar navbar-expand-xl fixed-top apple-nav py-4">
            <div className="container-fluid px-4 position-relative">
                <a className="navbar-brand fw-bold" href="/" style={{ fontStyle: 'italic' }}>
                    Apple Store
                </a>

                <ul className="navbar-nav apple-center-menu gap-4 align-items-center">
                    {/* Mega Menu Items - Có thể tách thành component riêng sau này */}
                    <li className="nav-item apple-mega" data-mega="mac">
                        <Link className="nav-link" to="/search?q=mac">Macbook</Link>
                        <MegaMenuMac />
                    </li>

                    <li className="nav-item apple-mega" data-mega="ipad">
                        <Link className="nav-link" to="/search?q=ipad">iPad</Link>
                        <MegaMenuIpad />
                    </li>

                    <li className="nav-item apple-mega" data-mega="watch">
                        <Link className="nav-link" to="/search?q=watch">Apple Watch</Link>
                        <MegaMenuWatch />
                    </li>

                    <li className="nav-item apple-mega" data-mega="iphone">
                        <Link className="nav-link" to="/search?q=iphone">iPhone</Link>
                        <MegaMenuIphone />
                    </li>

                    <li className="nav-item apple-mega" data-mega="airpod">
                        <Link className="nav-link" to="/search?q=airpod">AirPods</Link>
                        <MegaMenuAirpod />
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/contact">Liên hệ</a>
                    </li>

                    {/* Render có điều kiện: Nếu chưa có User thì hiện Login, ngược lại hiện User Menu */}
                    {!user ? (
                        <li className="nav-item" id="nav-login">
                            <a className="nav-link" href="/login">Đăng nhập</a>
                        </li>
                    ) : (
                        <li className="nav-item dropdown" id="nav-user">
                            <a
                                className="nav-link dropdown-toggle d-flex align-items-center gap-2 py-2 px-3 bg-light rounded-pill"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ transition: 'all 0.3s' }}
                            >
                                <span className="material-symbols-outlined fs-5">account_circle</span>
                                <span id="nav-username" className="fw-semibold">
                                    {user.name || "Khách hàng"}
                                </span>
                            </a>

                            <ul
                                className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 p-2"
                                style={{ minWidth: '200px', borderRadius: '12px' }}
                            >
                                <li>
                                    <a className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2" href="/profile">
                                        <span className="material-symbols-outlined fs-5">person</span> Trang cá nhân
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2" href="/settings">
                                        <span className="material-symbols-outlined fs-5">settings</span> Cài đặt
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider opacity-50" />
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 text-danger"
                                        href="#"
                                        onClick={handleLogout}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className="material-symbols-outlined fs-5">logout</span> Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </li>
                    )}

                    {/* Search Form */}
                    <li className="">
                        <nav>
                            <div className="container-fluid">
                                <form onSubmit={handleSearch} className="d-flex" role="search">
                                    <input
                                        className="form-control me-2 rounded-pill"
                                        type="search"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        aria-label="Search"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button className="btn btn-outline-secondary rounded-pill" type="submit">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </nav>
                    </li>

                    {/* Cart Icon */}
                    <li className="nav-item icon-btn">
                        <a href="/cart">
                            <span className="material-symbols-outlined">shopping_bag</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;