package com.flogin.repository;

import com.flogin.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Lấy các method save, findById, findAll, deleteById...
}