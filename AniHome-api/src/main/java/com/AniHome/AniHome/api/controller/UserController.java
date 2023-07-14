package com.AniHome.AniHome.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.AniHome.AniHome.api.entity.User;
import com.AniHome.AniHome.api.service.FileUpService;
import com.AniHome.AniHome.api.service.UserService;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
    private UserService userService;
	
	@Autowired
	private FileUpService fileUpService;

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    @PostMapping("/register")
    public User registerNewUser(@RequestBody @Valid User user) {
        return userService.registerNewUser(user);
    }
    
    @PostMapping("/userPic")
    public void fileUpload(@RequestParam("image") MultipartFile image , @RequestParam("fileName") String fileName)
    {
    	this.fileUpService.uploadImg("images", image, fileName);
    }
}
