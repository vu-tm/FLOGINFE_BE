package com.flogin.service;

import com.flogin.entity.User;

public class TokenService {
    public String generateToken(User user)
    {
        return user.getUsername() + "-token";
    }
}
