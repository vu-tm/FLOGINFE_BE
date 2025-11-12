import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../components/Product/ProductForm";

describe("product integration test", () => {
  //test tao san pham thanh cong product form

  test("Tao san pham moi thanh cong", async () => {
    // b1: tao cac ham onChange, onSubmit, on Cancle gia lap fn()
    const mockOnChange = jest.fn();
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    //b2: tao san pham gia lap de test render product form trong moi truong jest
    const product = { name: "", price: "", quantity: "", category: "model" };
    render(
      <ProductForm
        mode="create"
        product={product}
        onChange={mockOnChange}
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
        nextId={5}
      />
    );

    //b3: gia lap nhap du lieu
    fireEvent.change(screen.getByPlaceholderText("Nhập tên sản phẩm"), {
      target: { value: "Hiep si LBX" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nhập giá"), {
      target: { value: "20000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nhập số lượng"), {
      target: { value: "10" },
    });

    //nhan nut them
    fireEvent.click(screen.getByText("Thêm"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  //test voi sua san pham
  test("cap nhan san pham thanh cong", async () => {
    const mockOnChange = jest.fn();
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    const product = {
      id: 3,
      name: "Hiep si LBX",
      price: "20000",
      quantity: "10",
      category: "model",
    };
    render(
      <ProductForm
        mode="edit"
        product={product}
        onChange={mockOnChange}
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
        nextId={4}
      />
    );

    // sua ten san pham
    fireEvent.change(screen.getByPlaceholderText("Nhập tên sản phẩm"), {
      target: { value: "Robo Trái cây đỏ" },
    });

    fireEvent.click(screen.getByText("Cập nhật"));
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
    //kiemerm tra xem tên mới được truyền vào
    const updateProduct = mockOnChange.mock.calls[0]?.[0]; // lay doi tuong san pham mới nhat mà nguoi dung vua sua
    expect(updateProduct?.name).toBe("Robo Trái cây đỏ");
  });

  test("thao tac huy", async () => {
    const mockOnCancel = jest.fn();
    const product = { name: "", price: "", quantity: "", category: "model" };
    render(
      <ProductForm
        mode="create"
        product={product}
        onChange={() => {}}
        onCancel={mockOnCancel}
        onSubmit={() => {}}
        nextId={5}
      />
    );

    fireEvent.click(screen.getByText("Hủy"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
