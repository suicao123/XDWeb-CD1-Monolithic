import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css';

const Home = () => {
    const [newProducts, setNewProducts] = useState([]);
    const [tetProducts, setTetProducts] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL_API;
    const PRODUCT_API = import.meta.env.VITE_API_PRODUCT;


    useEffect(() => {
        // Load New Products
        fetch(`${BASE_URL}${PRODUCT_API}?new=true`)
            .then(res => res.json())
            .then(data => setNewProducts(data))
            .catch(err => console.error("Error loading new products:", err));

        // Load Tet Products
        fetch(`${BASE_URL}${PRODUCT_API}`)
            .then(res => res.json())
            .then(data => setTetProducts(data))
            .catch(err => console.error("Error loading tet products:", err));
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div className="home-page">
            <Navbar />
            <div id="nav-container"></div>

            <section className="hero-section pt-5">
                <div className="container-fluid p-0 position-relative">
                    <img
                        src="/img/cny-gifting-header-202601.png"
                        className="w-100 hero-bg-img"
                        alt="Tết Banner"
                        width="2062"
                        height="290"
                        style={{ objectFit: 'cover' }}
                    />

                    <div className="container hero-content-overlay">
                        <div className="row w-100 align-items-center">
                            <div className="col-md-7">
                                <h1 className="store-title">Cửa Hàng</h1>
                            </div>
                            <div className="col-md-5 text-end text-dark">
                                <h2 className="hero-sub-text">
                                    Mừng tân niên Bính Ngọ,<br />
                                    tặng nhau quà<br />
                                    Tết ấn tượng.
                                </h2>
                                <a href="contact.html" className="text-decoration-none mt-3 d-inline-block"
                                    style={{ position: 'relative', zIndex: 10, cursor: 'pointer' }}>
                                    Kết nối với Chuyên Gia ›
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>
                        <span className="gradient-text">Mẫu mã mới nhất. </span>
                        <span className="highlight-text">Thêm chút tuyệt vời cho năm mới.</span>
                    </h3>
                    <div className="scroll-controls d-none d-md-flex gap-2 ">
                        <button id="btn-prev" className="btn btn-light rounded-circle shadow-sm">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button id="btn-next" className="btn btn-light rounded-circle shadow-sm">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className="row g-4" id="product-list-new">
                    {newProducts.map((p) => (

                        <div key={p.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                            <Link to={`/detail/${p.id}`} className="text-decoration-none text-dark">
                                <div className="card product-card p-4 h-100 border-0 shadow-sm" style={{ borderRadius: '24px', transition: 'transform 0.3s ease' }}>
                                    <div className="card-body d-flex flex-column align-items-center text-center">
                                        <div style={{ height: '180px', width: '100%' }} className="d-flex align-items-center justify-content-center mb-4">
                                            <img src={`http://localhost:8000${p.image}`} className="img-fluid" style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }} alt={p.productname} />
                                        </div>
                                        <h5 className="fw-bold mb-2" style={{ fontSize: '1.2rem', minHeight: '3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {p.productname}
                                        </h5>
                                        <p className="text-primary small fw-bold mb-3">Apple Intelligence</p>
                                        <p className="card-text fw-semibold" style={{ fontSize: '1.1rem' }}>{formatPrice(p.price)}đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>
                        <span className="gradient-text">Lựa Chọn Cho Tết. </span>
                        <span className="highlight-text">Tưng bừng đón xuân Bính Ngọ.</span>
                    </h3>
                    <div className="scroll-controls d-none d-md-flex gap-2 ">
                        <button id="btn-prev-tet" className="btn btn-light rounded-circle shadow-sm">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button id="btn-next-tet" className="btn btn-light rounded-circle shadow-sm">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className="row g-4" id="product-list-tet">
                    {tetProducts.map((p) => (
                        <div key={p.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                            <Link to={`/detail/${p.id}`} className="text-decoration-none text-dark">
                                <div className="card product-card p-4 h-100 border-0 shadow-sm" style={{ borderRadius: '24px', transition: 'transform 0.3s ease' }}>
                                    <div className="card-body d-flex flex-column align-items-center text-center">
                                        <div style={{ height: '180px', width: '100%' }} className="d-flex align-items-center justify-content-center mb-4">
                                            <img src={`http://localhost:8000${p.image}`} className="img-fluid" style={{ maxHeight: '100%', width: 'auto', objectFit: 'contain' }} alt={p.productname} />
                                        </div>
                                        <h5 className="fw-bold mb-2" style={{ fontSize: '1.2rem', minHeight: '3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {p.productname}
                                        </h5>
                                        <p className="text-primary small fw-bold mb-3">Apple Intelligence</p>
                                        <p className="card-text fw-semibold" style={{ fontSize: '1.1rem' }}>{formatPrice(p.price)}đ</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
            <div id="footer-container"></div>
        </div>
    );
};

export default Home;
