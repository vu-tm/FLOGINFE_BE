// src/tests/ProductDetail.integration.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetail from "../components/Product/ProductDetail";
import "@testing-library/jest-dom";

describe("ProductDetail Integration test", () => {
  test("Xem chi tiết sản phẩm và đóng modal", () => {
    const mockOnClose = jest.fn();

    const product = {
      id: 5,
      name: "Chuot bluetooth VXE R1 SE",
      price: 500000,
      quantity: 5,
      category: "electronics",
    };

    render(<ProductDetail product={product} onClose={mockOnClose} />);

    // Kiểm tra tiêu đề
    expect(screen.getByText("Chi tiết sản phẩm")).toBeInTheDocument();

    // Kiểm tra thông tin
    expect(screen.getByText("Chuot bluetooth VXE R1 SE")).toBeInTheDocument();
    expect(screen.getByText("500.000 ₫")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    // Kiểm tra nút Đóng
    fireEvent.click(screen.getByText("Đóng"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
