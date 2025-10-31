import { CirclePlus, Edit, Eye, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css"; // Import CSS

export default function ProductList() {
  const navigate = useNavigate(); // Dùng để chuyển hướng trang (hook)
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách sản phẩm sau lọc (tạm để trống vì chưa có tìm kiếm)
  const [showCreateModal, setShowCreateModal] = useState(false); // Trạng thái tạo sản phẩm
  const [showEditModal, setShowEditModal] = useState(false); // Trạng thái sửa
  const [showDetailModal, setShowDetailModal] = useState(false); // Trạng thái xem chi tiết
  const [editingProduct, setEditingProduct] = useState(null); // Đối tượng sản phẩm đang sửa
  const [detailProduct, setDetailProduct] = useState(null); // Đối tượng sản phẩm đang xem chi tiết
  const [newProduct, setNewProduct] = useState({ // Dữ liệu form tạo sản phẩm
    name: '',
    price: '',
    quantity: '',
    category: 'model'
  });

  // Demo data
  const demoProducts = [
    {
      id: 1,
      name: 'Tai nghe Bluetooth Sony WH-CH520',
      price: 1290000,
      quantity: 10,
      category: "electronics"
    },
    {
      id: 2,
      name: 'Snack khoai tây Lay’s vị BBQ',
      price: 18000,
      quantity: 120,
      category: "food"
    },
    {
      id: 3,
      name: 'Mô hình Gundam RX-78-2 HG 1/144',
      price: 499000,
      quantity: 15,
      category: "model"
    },
    {
      id: 4,
      name: 'Chuột Logitech M331 Silent Plus',
      price: 390000,
      quantity: 40,
      category: "electronics"
    },
  ];

  useEffect(() => { // Nạp giả lập dữ liệu
    setProducts(demoProducts);
    setFilteredProducts(demoProducts);
  }, []);

  const handleCreateProduct = () => { // Hàm handle khi tạo sản phẩm
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity)
    };
    setProducts([...products, product]); // Thêm vào danh sách hiện ngay dưới bảng
    setShowCreateModal(false);
    setNewProduct({ name: '', price: '', quantity: '', category: 'model' }); // Reset form
  };

  const handleEditProduct = () => { // Hàm handle khi sửa sản phẩm
    setProducts(products.map(p =>
      p.id === editingProduct.id
        ? { ...editingProduct, price: Number(editingProduct.price), quantity: Number(editingProduct.quantity) }
        : p
    ));
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => { // Hàm handle khi xóa sản phẩm
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openDetail = (product) => {
    setDetailProduct(product);
    setShowDetailModal(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getCategoryName = (category) => {
    const map = {
      electronics: 'Điện tử',
      food: 'Thức ăn',
      model: 'Mô hình'
    };
    return map[category] || category;
  };

  return (
    <>
      <div className="container">
        {/* Header */}
        <h1 className="title">Quản lý sản phẩm</h1>
        <div className="header">
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            <CirclePlus className="icon-small" />
            <span>Thêm sản phẩm</span>
          </button>
        </div>

        {/* Bảng sản phẩm */}
        <div className="table-card">
          <div className="table-wrapper">
            <table className="table">
              {/* Header bảng */}
              <thead>
                <tr>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Loại</th>
                  <th className="text-right">Thao tác</th>
                </tr>
              </thead>

              {/* Body bảng */}
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="table-row-hover">
                    {/* Mã sản phẩm */}
                    <td>
                      <div className="user-name">SP-{product.id.toString().padStart(3, '0')}</div>
                    </td>

                    {/* Tên sản phẩm */}
                    <td>
                      <div className="user-name">{product.name}</div>
                    </td>

                    {/* Giá */}
                    <td>
                      <div className="user-name">{formatPrice(product.price)}</div>
                    </td>

                    {/* Số lượng */}
                    <td>
                      <div className="user-name">{product.quantity}</div>
                    </td>

                    {/* Loại */}
                    <td>
                      <span className={`badge role-${product.category}`}>
                        {getCategoryName(product.category)}
                      </span>
                    </td>

                    {/* Thao tác */}
                    <td className="action-cell">
                      <div className="action-buttons">
                        {/* Xem chi tiết */}
                        <button
                          onClick={() => openDetail(product)}
                          className="btn-icon"
                          title="Xem chi tiết"
                        >
                          <Eye className="icon-small" />
                        </button>

                        {/* Sửa */}
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowEditModal(true);
                          }}
                          className="btn-icon text-blue"
                          title="Chỉnh sửa"
                        >
                          <Edit className="icon-small" />
                        </button>

                        {/* Xóa */}
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="btn-icon text-red"
                          title="Xóa"
                        >
                          <Trash2 className="icon-small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal thêm sản phẩm */}
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3 className="modal-title">Thêm sản phẩm mới</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div>
                    <label>Mã sản phẩm</label>
                    <input
                      type="text"
                      value={`SP-${(products.length + 1).toString().padStart(3, '0')}`}
                      disabled
                      className="input"
                    />
                  </div>

                  <div>
                    <label>Tên sản phẩm *</label>
                    <input
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label>Giá *</label>
                    <input
                      type="number"
                      placeholder="Nhập giá"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label>Số lượng *</label>
                    <input
                      type="number"
                      placeholder="Nhập số lượng"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div>
                    <label>Loại *</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="input"
                    >
                      <option value="electronics">Điện tử</option>
                      <option value="food">Thức ăn</option>
                      <option value="model">Mô hình</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateProduct}
                  className="btn-primary"
                  
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal sửa sản phẩm */}
        {showEditModal && editingProduct && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3 className="modal-title">Chỉnh sửa sản phẩm</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn-close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div>
                    <label>Mã sản phẩm</label>
                    <input
                      type="text"
                      value={`SP-${editingProduct.id.toString().padStart(3, '0')}`}
                      disabled
                      className="input"
                    />
                  </div>

                  <div>
                    <label>Tên sản phẩm *</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label>Giá *</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label>Số lượng *</label>
                    <input
                      type="number"
                      value={editingProduct.quantity}
                      onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div>
                    <label>Loại *</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="input"
                    >
                      <option value="electronics">Điện tử</option>
                      <option value="food">Thức ăn</option>
                      <option value="model">Mô hình</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  Hủy
                </button>
                <button
                  onClick={handleEditProduct}
                  className="btn-primary"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal xem chi tiết – màu sắc & bố cục khác */}
        {showDetailModal && detailProduct && (
          <div className="modal-overlay">
            <div className="modal-detail">
              <div className="modal-header-detail">
                <h3 className="modal-title-detail">
                  Chi tiết sản phẩm
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="btn-close-detail"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body-detail">
                {/* Mã + Loại */}
                <div className="detail-row">
                  <div className="detail-label">Mã sản phẩm:</div>
                  <div className="detail-value">
                    SP-{detailProduct.id.toString().padStart(3, '0')}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">Loại:</div>
                  <div className="detail-value">
                    <span className={`badge role-${detailProduct.category}`}>
                      {getCategoryName(detailProduct.category)}
                    </span>
                  </div>
                </div>

                {/* Dòng 2: Tên */}
                <div className="detail-row">
                  <div className="detail-label">Tên sản phẩm:</div>
                  <div className="detail-value large">{detailProduct.name}</div>
                </div>

                {/* Giá */}
                <div className="detail-row">
                  <div className="detail-label">Giá:</div>
                  <div className="detail-value large">{formatPrice(detailProduct.price)}</div>
                </div>

                {/* Số lương */}
                <div className="detail-row">
                  <div className="detail-label">Số lượng:</div>
                  <div className="detail-value large">{detailProduct.quantity}</div>
                </div>

              </div>

              <div className="modal-footer-detail">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="btn-secondary"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}