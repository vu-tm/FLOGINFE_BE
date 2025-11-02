package com.flogin.service;


import com.flogin.entity.LoginRequest;
import com.flogin.entity.LoginResponse;
import com.flogin.entity.User;
import com.flogin.repository.UserRepository;

public class AuthService {
    private final UserRepository userRepository;
    private final TokenService tokenService = new TokenService();

    public AuthService(UserRepository userRepository)
    { 
        this.userRepository = userRepository;
    }

    public LoginResponse authenticate(LoginRequest request)
    { 
        User user = userRepository.findByUsername(request.getUsername());
        if (user != null && user.getPassword() == request.getPassword())
        { 
            return new LoginResponse(true, "Dang nhap thanh cong", tokenService.generateToken(user));
        }
        return new LoginResponse(false, null, null);
    }
}
