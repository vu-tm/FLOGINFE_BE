import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductList from "../components/Product/ProductList";
import ProductForm from "../components/Product/ProductForm";
import ProductDetail from "../components/Product/ProductDetail";
import * as productService from "../services/productService";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/productService");

describe("ProductList Component Mock Tests (Read/Add/Delete)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // SUCCESS CASE
  test("Hiển thị danh sách sản phẩm khi API trả về dữ liệu", async () => {
    // Mock dữ liệu trả về
    const mockProducts = [
      { id: 1, name: "Laptop Gaming" },
      { id: 2, name: "Chuột không dây" },
    ];

    productService.getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    // Kiểm tra gọi API đúng 1 lần
    expect(productService.getProducts).toHaveBeenCalledTimes(1);

    // Kiểm tra render ra UI đúng tên sản phẩm
    expect(await screen.findByText("Laptop Gaming")).toBeInTheDocument();
    expect(await screen.findByText("Chuột không dây")).toBeInTheDocument();
  });

  // FAILURE CASE
  test("Hiển thị giao diện rỗng khi API thất bại", async () => {
    productService.getProducts.mockRejectedValue(new Error("API Error"));

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    // Kiểm tra API được gọi
    expect(productService.getProducts).toHaveBeenCalledTimes(1);

    // Vì lỗi → không có item nào
    const items = screen.queryAllByRole("listitem");
    expect(items.length).toBe(0);
  });

  test("xóa sản phẩm thành công", async () => {
    const mockProducts = [
      { id: 1, name: "Laptop Gaming" },
      { id: 2, name: "Chuột Không Dây" },
    ];

    productService.getProducts.mockResolvedValue(mockProducts);
    productService.deleteProduct.mockResolvedValue({}); // mock xóa thành công

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(await screen.findByText("Laptop Gaming")).toBeInTheDocument();

    jest.spyOn(window, "confirm").mockReturnValueOnce(true);

    fireEvent.click(screen.getAllByTitle("Xóa")[0]);

    await waitFor(() => {
      expect(productService.deleteProduct).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(productService.deleteProduct).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(screen.queryByText("Laptop Gaming")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Chuột Không Dây")).toBeInTheDocument();
    });
  });

  test("xóa sản phẩm thất bại", async () => {
    const mockProducts = [
      { id: 1, name: "Laptop Gaming" },
      { id: 2, name: "Chuột Không Dây" },
    ];

    productService.getProducts.mockResolvedValue(mockProducts);
    productService.deleteProduct.mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(await screen.findByText("Laptop Gaming")).toBeInTheDocument();

    jest.spyOn(window, "confirm").mockReturnValueOnce(true);

    fireEvent.click(screen.getAllByTitle("Xóa")[0]);

    await waitFor(() => {
      expect(productService.deleteProduct).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(productService.deleteProduct).toHaveBeenCalledWith(1);
    });

    // UI vẫn giữ sản phẩm
    expect(screen.getByText("Laptop Gaming")).toBeInTheDocument();
    expect(screen.getByText("Chuột Không Dây")).toBeInTheDocument();
  });
});

//describe("test");
