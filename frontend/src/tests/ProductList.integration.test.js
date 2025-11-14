import { render, screen } from "@testing-library/react";
import ProductList from "../components/Product/ProductList";
import { getProducts } from "../services/productService";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/productService", () => ({
  getProducts: jest.fn(),
}));

test("Hiển thị danh sách sản phẩm từ API mock", async () => {
  getProducts.mockResolvedValue([
    {
      id: 1,
      name: "Tai nghe Bluetooth Sony WH-CH520",
      price: 1290000,
      quantity: 10,
      category: "electronics",
    },
    {
      id: 2,
      name: "Snack khoai tây Lay’s vị BBQ",
      price: 18000,
      quantity: 120,
      category: "food",
    },
  ]);

  render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>
  );

  expect(
    await screen.findByText("Tai nghe Bluetooth Sony WH-CH520")
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Snack khoai tây Lay’s vị BBQ")
  ).toBeInTheDocument();

  expect(getProducts).toHaveBeenCalledTimes(1);
});
