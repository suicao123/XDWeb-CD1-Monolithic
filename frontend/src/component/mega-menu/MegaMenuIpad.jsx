import React from 'react';
import '../../css/style.css';


const MegaMenuIpad = () => {
    return (
        <div className="apple-mega-menu">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className="mega-title">Khám Phá iPad</h6>
                        <ul className="mega-list" id="ipad-product-list">
                             {/* Chờ dữ liệu từ API hoặc Props */}
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Mua iPad</h6>
                        <ul className="mega-list">
                            <li><a href="#">Mua iPad</a></li>
                            <li><a href="#">Phụ Kiện iPad</a></li>
                            <li><a href="#">Apple Trade In</a></li>
                            <li><a href="#">Tài Chính</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Tìm Hiểu Thêm</h6>
                        <ul className="mega-list">
                            <li><a href="#">Hỗ Trợ iPad</a></li>
                            <li><a href="#">AppleCare+</a></li>
                            <li><a href="#">iOS</a></li>
                            <li><a href="#">Apple Intelligence</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenuIpad;