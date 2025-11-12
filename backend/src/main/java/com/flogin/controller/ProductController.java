
package com.flogin.controller;
//mai mốt tới phần kết nối DB thì sửa lại chỗ này, chổ này tạm hardcode dữ liệu sản phẩm để test FE API thôi
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private List<Map<String, Object>> products = new ArrayList<>();

    // Khởi tạo dữ liệu mẫu khi server chạy lần đầu
    @PostConstruct
    public void init() {
        Map<String, Object> p1 = new HashMap<>();
        p1.put("id", 1);
        p1.put("name", "Tai nghe Bluetooth Sony WH-CH520");
        p1.put("price", 1290000);
        p1.put("quantity", 10);
        p1.put("category", "electronics");
        products.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("id", 2);
        p2.put("name", "Snack Lay’s vị BBQ");
        p2.put("price", 18000);
        p2.put("quantity", 120);
        p2.put("category", "food");
        products.add(p2);

        Map<String, Object> p3 = new HashMap<>();
        p3.put("id", 3);
        p3.put("name", "Mô hình Gundam RX-78-2 HG 1/144");
        p3.put("price", 499000);
        p3.put("quantity", 15);
        p3.put("category", "model");
        products.add(p3);

        Map<String, Object> p4 = new HashMap<>();
        p4.put("id", 4);
        p4.put("name", "Chuột Logitech M331 Silent Plus");
        p4.put("price", 350000);
        p4.put("quantity", 25);
        p4.put("category", "electronics");
        products.add(p4);
    }

    @GetMapping
    public List<Map<String, Object>> getAllProducts() {
        return products;
    }

    @PostMapping
    public List<Map<String, Object>> addProduct(@RequestBody Map<String, Object> newProduct) {
        products.add(newProduct);
        return products;
    }
}
