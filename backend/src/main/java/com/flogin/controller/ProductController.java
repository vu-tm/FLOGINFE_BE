package com.flogin.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Cho phép frontend (localhost:3000) truy cập
public class ProductController {

    // API: Lấy danh sách sản phẩm
    @GetMapping
    public List<Map<String, Object>> getAllProducts() {
        List<Map<String, Object>> products = new ArrayList<>();

        products.add(Map.of(
                "id", 1,
                "name", "Tai nghe Bluetooth Sony WH-CH520",
                "price", 1290000,
                "quantity", 10,
                "category", "electronics"
        ));

        products.add(Map.of(
                "id", 2,
                "name", "Snack khoai tây Lay’s vị BBQ",
                "price", 18000,
                "quantity", 120,
                "category", "food"
        ));

        products.add(Map.of(
                "id", 3,
                "name", "Mô hình Gundam RX-78-2 HG 1/144",
                "price", 499000,
                "quantity", 15,
                "category", "model"
        ));

        products.add(Map.of(
                "id", 4,
                "name", "Chuột Logitech M331 Silent Plus",
                "price", 390000,
                "quantity", 40,
                "category", "electronics"
        ));

        return products;
    }
}
