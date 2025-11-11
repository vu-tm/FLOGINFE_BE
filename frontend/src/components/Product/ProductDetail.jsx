import React from "react";
import { X } from "lucide-react";
import "./ProductList.css"; // giữ style cũ

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const getCategoryName = (category) => {
    const map = {
      electronics: "Điện tử",
      food: "Thức ăn",
      model: "Mô hình",
    };
    return map[category] || category;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-detail">
        <div className="modal-header-detail">
          <h3 className="modal-title-detail">Chi tiết sản phẩm</h3>
          <button
            onClick={onClose}
            className="btn-close-detail"
            aria-label="Đóng chi tiết"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-detail">
          <div className="detail-row">
            <div className="detail-label">Mã sản phẩm:</div>
            <div className="detail-value">
              SP-{product.id.toString().padStart(3, "0")}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Loại:</div>
            <div className="detail-value">
              <span className={`badge role-${product.category}`}>
                {getCategoryName(product.category)}
              </span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Tên sản phẩm:</div>
            <div className="detail-value large">{product.name}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Giá:</div>
            <div className="detail-value large">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Số lượng:</div>
            <div className="detail-value large">{product.quantity}</div>
          </div>
        </div>

        <div className="modal-footer-detail">
          <button onClick={onClose} className="btn-secondary">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
