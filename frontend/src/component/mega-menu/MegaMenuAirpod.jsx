import React from 'react';
import '../../css/style.css';

const MegaMenuAirpod = () => {
    return (
        <div className="apple-mega-menu">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className="mega-title">Khám Phá AirPods</h6>
                        {/* Trong React, bạn nên truyền props danh sách sản phẩm vào đây thay vì dùng id */}
                        <ul className="mega-list" id="airpod-product-list">
                            {/* Chờ dữ liệu từ API hoặc Props */}
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Mua AirPods</h6>
                        <ul className="mega-list">
                            <li><a href="#">Mua AirPods</a></li>
                            <li><a href="#">Phụ Kiện AirPods</a></li>
                            <li><a href="#">Apple Trade In</a></li>
                            <li><a href="#">Tài Chính</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mega-title">Tìm Hiểu Thêm</h6>
                        <ul className="mega-list">
                            <li><a href="#">Hỗ Trợ AirPods</a></li>
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

export default MegaMenuAirpod;