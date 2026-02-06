import React from 'react';
import '../../css/style.css';


const MegaMenuMac = () => {
    return (
        <div className="apple-mega-menu">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className="mega-title">Khám Phá Macbook</h6>
                        <ul className="mega-list" id="mac-product-list">
                             {/* Chờ dữ liệu từ API hoặc Props */}
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Mua Macbook</h6>
                        <ul className="mega-list">
                            <li><a href="#">Mua Macbook</a></li>
                            <li><a href="#">Phụ Kiện Macbook</a></li>
                            <li><a href="#">Apple Trade In</a></li>
                            <li><a href="#">Tài Chính</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Tìm Hiểu Thêm</h6>
                        <ul className="mega-list">
                            <li><a href="#">Hỗ Trợ Macbook</a></li>
                            <li><a href="#">AppleCare+</a></li>
                            <li><a href="#">MacOS</a></li>
                            <li><a href="#">Apple Intelligence</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenuMac;