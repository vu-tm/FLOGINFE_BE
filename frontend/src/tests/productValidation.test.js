//đầu tiên TTD là test driven, phải thấy đỏ trước xong mới thấy xanh
//viết test trước chạy cho thấy đỏ trước sau đó mới viết productValidation.js để cho test chạy xanh
import { validateProduct } from "../utils/productValidation";

describe("test validation cua san pham", () => {
  //1. test san pham voi ten rong
  test("TC01: ten san pham rong - nen tra ve loi", () => {
    const product = {
      name: "",
      price: 1000000,
      quantity: 10,
      description: "San pham nhap khau",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.name).toBe("Ten san pham khong duoc de trong");
  });

  //2. test sân pham voi ten <3 ky tu hoac >100 ky tu
  test("TC02: ten san pham <3 ky tu hoac >100 ky tu - nen tra ve loi", () => {
    const product = {
      name: "ca",
      price: 1000000,
      quantity: 10,
      description: "San pham nhap khau",
      category: "food",
    };
    const errors = validateProduct(product);
    expect(errors.name).toBe("Ten san pham phai tu 3 den 100 ky tu");
  });

  //3. test giá âm
  test("TC03: gia san pham am - nen tra ve loi", () => {
    const product = {
      name: "Dien thoai",
      price: -500000,
      quantity: 10,
      description: "San pham nhap khau",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.price).toBe("Gia san pham phai lon hon 0");
  });
  //4. test gia =0
  test("TC04: gia san pham =0 - nen tra ve loi", () => {
    const product = {
      name: "Dien thoai",
      price: 0,
      quantity: 10,
      description: "San pham nhap khau",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.price).toBe("Gia san pham phai lon hon 0");
  });
  //5. test giá hop le
  test("TC05: gia san pham hop le - khong tra ve loi", () => {
    const product = {
      name: "Dien thoai",
      price: 500000,
      quantity: 10,
      description: "San pham nhap khau",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.price).toBeUndefined();
  });
  //6. test so luong am
  test("TC06: so luong am - nen tra ve loi", () => {
    const product = {
      name: "Dien thoai",
      price: 500000,
      quantity: -5,
      description: "San pham nhap khau",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.quantity).toBe("So luong phai lon hon hoac bang 0");
  });

  //7. test so luong hop le
  test("TC07: so luong hop le - khong tra ve loi", () => {
    const product = {
      name: "Dien thoai",
      price: 500000,
      quantity: 5,
      description: "San pham nhap khau",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.quantity).toBeUndefined();
  });

  //8. test mo ta >500 ky tu
  test("TC08: mo ta >500 ky tu - nen tra ve loi", () => {
    const longDescription = "a".repeat(501); // Chuoi 501 ky tu
    const product = {
      name: "Dien thoai",
      price: 500000,
      quantity: 5,
      description: longDescription,
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.description).toBe("Mo ta khong duoc vuot qua 500 ky tu");
  });

  //9. test mo ta hop le
  test("TC09: mo ta hop le - khong tra ve loi", () => {
    const validDescription = "a".repeat(100); // Chuoi 100 ky tu
    const product = {
      name: "Dien thoai",
      price: 500000,
      quantity: 5,
      description: validDescription,
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.description).toBeUndefined();
  });

  //10. test danh muc khong hop le
  test("TC10: danh muc khong hop le - nen tra ve loi", () => {
    const product = {
      name: "Dien thoai",
      price: 500000,
      quantity: 5,
      description: "San pham nhap khau",
      category: "danh muc khong hop le",
    };
    const errors = validateProduct(product);
    expect(errors.category).toBe("Danh muc khong hop le");
  });

  //11. test danh muc hop le
  test("TC11: danh muc hop le - khong tra ve loi", () => {
    const product = {
      name: "Dien thoai",
      price: 500000,
      quantity: 5,
      description: "San pham nhap khau",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(errors.category).toBeUndefined();
  });
  //12. test tat ca thong tin hop le
  test("TC12: San pham hop le - khong tra ve loi", () => {
    const product = {
      name: "Laptop Dell",
      price: 15000000,
      quantity: 10,
      description: "May tinh xach tay",
      category: "electronics",
    };
    const errors = validateProduct(product);
    expect(Object.keys(errors).length).toBe(0);
  });
});
