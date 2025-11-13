import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductList from "../components/Product/ProductList";
import * as productService from "../services/productService";

// Mock toàn bộ module
jest.mock("../services/productService");

const mockProducts = [
  {
    id: 1,
    name: "Tai nghe Bluetooth Sony WH-CH520",
    price: 1290000,
    quantity: 10,
    category: "electronics",
  },
];

describe("ProductList Integration Tests", () => {
  beforeEach(() => {
    // Reset mock trước mỗi test
    jest.clearAllMocks();
  });

  test("Hiển thị danh sách sản phẩm từ API", async () => {
    // Mock getProducts trả về mockProducts
    productService.getProducts.mockResolvedValue(mockProducts);

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    // Đợi text xuất hiện
    await waitFor(() => {
      expect(
        screen.getByText("Tai nghe Bluetooth Sony WH-CH520")
      ).toBeInTheDocument();
    });

    // Kiểm tra hàm getProducts đã được gọi
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });
});
