const VALID_CATEGORIES = ["electronics", "clothing", "food", "books"];
export const validateProduct = (product) => {
  const errors = {};

  //ten san pham
  const name = product.name?.trim() || "";

  if (!name) {
    errors.name = "Ten san pham khong duoc de trong";
  } else if (name.length < 3 || name.length > 100) {
    errors.name = "Ten san pham phai tu 3 den 100 ky tu";
  }
  //gia san pham
  if (product.price <= 0) {
    errors.price = "Gia san pham phai lon hon 0";
  }
  //so luong san pham
  if (product.quantity < 0) {
    errors.quantity = "So luong phai lon hon hoac bang 0";
  }

  //mo ta san pham
  if (product.description && product.description.length > 500) {
    errors.description = "Mo ta khong duoc vuot qua 500 ky tu";
  }
  //danh muc san pham
  if (product.category && !VALID_CATEGORIES.includes(product.category)) {
    errors.category = "Danh muc khong hop le";
  }

  return errors;
};
