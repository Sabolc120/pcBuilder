package com.pcbuilder.pcbuilder.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(allowedHeaders = "*",origins = "*")
public class mainControllers {
    @GetMapping("/pong")
    public String testConnection(){
        System.out.println("Am I being reached?");
        return "Connection has been established";
    }
}
