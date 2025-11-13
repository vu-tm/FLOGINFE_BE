package com.flogin.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.flogin.dto.ProductDto;
import com.flogin.service.ProductService;

import java.util.*;

@RestController
@RequestMapping("/api/products") // GET /api/products
@CrossOrigin(origins = "*") // Cho phép tất cả domain truy cập
public class ProductController {

        private final ProductService productService;

        public ProductController(ProductService productService) {
                this.productService = productService;
        }

        // API: Lấy danh sách sản phẩm
        @GetMapping
        public List<Map<String, Object>> initSanPham() {
                List<Map<String, Object>> products = new ArrayList<>();

                products.add(Map.of(
                                "id", 1,
                                "name", "Tai nghe Bluetooth Sony WH-CH520",
                                "price", 1290000,
                                "quantity", 10,
                                "category", "electronics"));

                products.add(Map.of(
                                "id", 2,
                                "name", "Snack khoai tây Lay’s vị BBQ",
                                "price", 18000,
                                "quantity", 120,
                                "category", "food"));

                products.add(Map.of(
                                "id", 3,
                                "name", "Mô hình Gundam RX-78-2 HG 1/144",
                                "price", 499000,
                                "quantity", 15,
                                "category", "model"));

                products.add(Map.of(
                                "id", 4,
                                "name", "Chuột Logitech M331 Silent Plus",
                                "price", 390000,
                                "quantity", 40,
                                "category", "electronics"));

                return products;
        }

        // CREATE - Tạo sản phẩm mới
        @PostMapping
        public void createProduct() {

        }

        // READ ALL - Lấy tât cả sản phẩm
        @GetMapping
        public void getAllProducts() {

        }

        // READ ONE - Lấy sản phẩm theo ID
        @GetMapping("/{id}")
        public void getProductById() {

        }

        // UPDATE - Cập nhập sản phẩm
        @PutMapping("/{id}")
        public void updateProduct() {

        }

        // CREATE - Tạo sản phẩm mới
        @DeleteMapping("/{id}")
        public void deleteProduct() {

        }

}
