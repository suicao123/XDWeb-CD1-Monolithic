import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // Lấy từ khóa từ URL (?q=iphone)
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const BASE_URL_API = import.meta.env.VITE_API_BASE_URL_API;
    const PRODUCT_API = import.meta.env.VITE_API_PRODUCT;

    // Hàm xử lý link ảnh (tránh lỗi 404)
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/150";
        if (imagePath.startsWith("http")) return imagePath;
        return `${BASE_URL}${imagePath}`;
    };

    // Hàm format giá
    const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // Gọi API tìm kiếm của Django
        fetch(`${BASE_URL_API}${PRODUCT_API}/search/?q=${encodeURIComponent(query)}`)
            .then(res => {
                if (!res.ok) throw new Error("Lỗi kết nối Server");
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [query]); // Chạy lại khi từ khóa thay đổi

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <div className="container flex-grow-1" style={{ marginTop: '100px', marginBottom: '50px' }}>
                <h3 className="mb-4">
                    Kết quả tìm kiếm cho: <span className="text-danger">"{query}"</span>
                </h3>

                {/* Trạng thái Loading */}
                {loading && (
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border text-secondary" role="status"></div>
                        <p className="mt-2 text-secondary">Đang tìm kiếm...</p>
                    </div>
                )}

                {/* Trạng thái Lỗi */}
                {error && (
                    <div className="text-center text-danger py-5">
                        <p>Có lỗi xảy ra: {error}</p>
                    </div>
                )}

                {/* Trạng thái Không tìm thấy */}
                {!loading && !error && products.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <span className="material-symbols-outlined fs-1 text-secondary" style={{fontSize: '64px'}}>search_off</span>
                        <p className="fs-5 mt-3">Rất tiếc, không tìm thấy sản phẩm nào khớp với từ khóa "{query}"</p>
                        <Link to="/" className="btn btn-primary rounded-pill px-4 mt-2">Quay lại trang chủ</Link>
                    </div>
                )}

                {/* Danh sách kết quả */}
                {!loading && !error && products.length > 0 && (
                    <div className="row g-4">
                        {products.map((p) => (
                            <div key={p.id} className="col-6 col-md-4 col-lg-3">
                                <Link to={`/detail/${p.id}`} className="text-decoration-none text-dark">
                                    <div className="card h-100 border-0 shadow-sm product-card transition-all" style={{borderRadius: '16px', overflow: 'hidden'}}>
                                        <div className="position-relative overflow-hidden p-3 bg-light d-flex align-items-center justify-content-center" style={{height: '220px'}}>
                                            <img 
                                                src={getImageUrl(p.image)} 
                                                className="card-img-top object-fit-contain" 
                                                alt={p.productname} 
                                                style={{ maxHeight: '100%', maxWidth: '100%', transition: 'transform 0.5s ease' }}
                                            />
                                        </div>
                                        <div className="card-body text-center d-flex flex-column">
                                            <h6 className="card-title mb-2 fw-semibold text-truncate-2" style={{minHeight: '40px'}}>
                                                {p.productname}
                                            </h6>
                                            <p className="card-text text-danger fw-bold mt-auto fs-5">
                                                {formatPrice(p.price)} ₫
                                            </p>
                                            <button className="btn btn-outline-dark btn-sm rounded-pill mt-2 w-100">Xem chi tiết</button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchResult;