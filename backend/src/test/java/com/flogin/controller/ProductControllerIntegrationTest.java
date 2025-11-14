package com.flogin.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*; // import get, post, put, delete
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*; // import status, content, jsonPath
import static org.hamcrest.Matchers.hasSize;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.flogin.dto.ProductDto;
import com.flogin.service.ProductService;

@WebMvcTest(ProductController.class) // Chỉ load tầng Controller
@DisplayName("Product API Integration Test")
public class ProductControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    @DisplayName("GET /api/products - Lấy danh sách sản phẩm")
    // Viết test cho web layer phải throws Exception
    void testGetAllProducts() throws Exception {
        // GIVEN
        List<ProductDto> products = Arrays.asList(
                new ProductDto("Laptop", 15000000, 10, "Electronics"),
                new ProductDto("Mouse", 390000, 40, "Electronics"));
        // WHEN
        when(productService.getAllProducts()).thenReturn(products);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Laptop"))
                .andExpect(jsonPath("$[1].name").value("Mouse"))
                .andExpect(jsonPath("$[0].price").value("15000000"))
                .andExpect(jsonPath("$[1].price").value("390000"));
    }
}
