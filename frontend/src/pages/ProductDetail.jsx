import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [newProducts, setNewProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    // State cho UI (Màu sắc & Dung lượng) - Giả lập
    const [selectedColor, setSelectedColor] = useState('Trắng');
    const [selectedRom, setSelectedRom] = useState('256GB');

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const BASE_URL_API = import.meta.env.VITE_API_BASE_URL_API;
    const PRODUCT_API = import.meta.env.VITE_API_PRODUCT;
    const CART_API = import.meta.env.VITE_API_CART;

    // Hàm xử lý link ảnh (tránh lỗi 404)
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/150";
        if (imagePath.startsWith("http")) return imagePath;
        return `${BASE_URL}${imagePath}`;
    };

    // Hàm format giá
    const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

    // 1. Load chi tiết sản phẩm và sản phẩm gợi ý
    useEffect(() => {
        if (!id) return;
        setLoading(true);

        // Fetch chi tiết sản phẩm
        fetch(`${BASE_URL_API}${PRODUCT_API}/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => console.error("Lỗi tải sản phẩm:", err));

        // Fetch sản phẩm mới (để hiện ở dưới cùng)
        fetch(`${BASE_URL}${PRODUCT_API}?new=true`)
            .then(res => res.json())
            .then(data => setNewProducts(data))
            .catch(err => console.error("Lỗi tải sản phẩm mới:", err));

        // Reset số lượng khi đổi sản phẩm
        setQuantity(1);
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }, [id]);

    // 2. Xử lý Thêm vào giỏ hàng
    const handleAddToCart = () => {
        const token = localStorage.getItem("access");

        if (!token) {
            alert("Vui lòng đăng nhập để mua hàng!");
            localStorage.setItem("redirect_after_login", window.location.pathname + window.location.search);
            navigate('/login');
            return;
        }

        fetch(`${BASE_URL_API}${CART_API}/add/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                product_id: product.id,
                quantity: quantity
            })
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Lỗi khi thêm vào giỏ");
            })
            .then(data => alert(data.message || "Đã thêm vào giỏ hàng thành công!"))
            .catch(err => {
                console.error(err);
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            });
    };

    if (loading) {
        return <div className="text-center mt-5 pt-5"><h3>Đang tải sản phẩm...</h3></div>;
    }

    if (!product) {
        return <div className="text-center mt-5 pt-5"><h3>Không tìm thấy sản phẩm!</h3></div>;
    }

    const oldPrice = product.price * 1.15; // Giả lập giá cũ cao hơn 15%

    return (
        <div className="product-detail-page bg-white">
            <Navbar />

            <div className="container" style={{ marginTop: '100px' }}>
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/" className="text-secondary text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item text-dark fw-bold" aria-current="page">{product.productname}</li>
                    </ol>
                </nav>

                {/* Chi tiết sản phẩm */}
                <div className="row g-5">
                    
                    <div className="col-lg-7">
                        <div className="d-flex flex-column align-items-center">
                            <div className="main-image-bg p-5 rounded w-100 d-flex justify-content-center bg-light">
                                <img
                                    src={getImageUrl(product.image)}
                                    className="img-fluid"
                                    alt={product.productname}
                                    style={{ maxHeight: '500px', mixBlendMode: 'multiply' }}
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-lg-5">
                        <h2 className="fw-bold mb-2">{product.productname}</h2>
                        <div className="mb-3">
                            <span className={`fw-bold me-2 ${product.status === 1 ? 'text-success' : 'text-danger'}`}>
                                {product.status === 1 ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <span className="text-muted">| 4.5 Stars (150 Reviews)</span>
                        </div>

                        <div className="fs-3 fw-bold mb-3">
                            {formatPrice(product.price)}đ
                            <span className="fs-5 text-muted text-decoration-line-through ms-2">
                                {formatPrice(oldPrice)}đ
                            </span>
                        </div>

                        <p className="text-muted mb-4 border-bottom pb-3">
                            {product.description || "Mô tả đang cập nhật..."}
                        </p>

                        {/* Chọn Màu */}
                        <div className="mb-4">
                            <h6 className="fw-bold">Colours:</h6>
                            <div className="d-flex gap-2">
                                {['Trắng', 'Sa mạc', 'Đen'].map(color => (
                                    <button
                                        key={color}
                                        className={`product-variant-btn btn btn-outline-secondary ${selectedColor === color ? 'active bg-secondary text-white' : ''}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chọn ROM */}
                        <div className="mb-4">
                            <h6 className="fw-bold">ROM:</h6>
                            <div className="d-flex gap-2">
                                {['128GB', '256GB', '512GB'].map(rom => (
                                    <button
                                        key={rom}
                                        className={`product-variant-btn btn btn-outline-secondary ${selectedRom === rom ? 'active bg-secondary text-white' : ''}`}
                                        onClick={() => setSelectedRom(rom)}
                                    >
                                        {rom}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Số lượng & Nút mua */}
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="qty-container d-flex align-items-center border rounded-pill px-2">
                                <button className="btn btn-link text-dark text-decoration-none" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <input type="text" value={quantity} readOnly className="form-control border-0 text-center" style={{ width: '40px' }} />
                                <button className="btn btn-link text-dark text-decoration-none" onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>

                            <button
                                className="btn btn-danger flex-grow-1 py-2 fw-bold rounded-pill"
                                style={{ backgroundColor: '#c04444', border: 'none' }}
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>

                            <button className="btn btn-outline-dark px-3 py-2 rounded-circle">
                                <span className="material-symbols-outlined align-middle">favorite</span>
                            </button>
                        </div>

                        <button className="btn btn-outline-danger w-100 py-2 fw-bold rounded-pill mb-4">Buy Now</button>
                    </div>
                </div>
            </div>

            {/* Sản phẩm gợi ý (New Products) */}
            <div className="container pb-5 mt-5">
                <h3 className="mb-4" style={{ padding: '20px 0' }}>
                    <span className="gradient-text fw-bold text-danger">Mẫu mã mới nhất. </span>
                    <span className="text-dark">Thêm chút tuyệt vời cho năm mới.</span>
                </h3>
                <div className="row g-4">
                    {newProducts.slice(0, 4).map((p) => (
                        <div key={p.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                            
                            <div
                                onClick={() => navigate(`/detail/${p.id}`)}
                                style={{ cursor: 'pointer' }}
                                className="text-decoration-none text-dark"
                            >
                                <div className="card product-card p-4 h-100 border-0 shadow-sm" style={{ borderRadius: '24px' }}>
                                    <div className="card-body d-flex flex-column align-items-center text-center">
                                        <div style={{ height: '180px', width: '100%' }} className="d-flex align-items-center justify-content-center mb-4">
                                            <img src={getImageUrl(p.image)} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} alt={p.productname} />
                                        </div>
                                        <h5 className="fw-bold mb-2 text-truncate-2">{p.productname}</h5>
                                        <p className="text-primary small fw-bold mb-3">Apple Intelligence</p>
                                        <p className="card-text fw-semibold fs-5">{formatPrice(p.price)}đ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;