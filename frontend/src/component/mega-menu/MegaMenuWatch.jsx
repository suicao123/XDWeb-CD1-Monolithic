import React from 'react';
import '../../css/style.css';


const MegaMenuWatch = () => {
    return (
        <div className="apple-mega-menu">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className="mega-title">Khám Phá Apple Watch</h6>
                        <ul className="mega-list" id="watch-product-list">
                             {/* Chờ dữ liệu từ API hoặc Props */}
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Mua Apple Watch</h6>
                        <ul className="mega-list">
                            <li><a href="#">Mua Apple Watch</a></li>
                            <li><a href="#">Phụ Kiện Apple Watch</a></li>
                            <li><a href="#">Apple Trade In</a></li>
                            <li><a href="#">Tài Chính</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Tìm Hiểu Thêm</h6>
                        <ul className="mega-list">
                            <li><a href="#">Hỗ Trợ Apple Watch</a></li>
                            <li><a href="#">AppleCare+</a></li>
                            <li><a href="#">WatchOS</a></li>
                            <li><a href="#">Apple Intelligence</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenuWatch;