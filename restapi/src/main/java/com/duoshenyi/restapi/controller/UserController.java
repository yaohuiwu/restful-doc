package com.duoshenyi.restapi.controller;

import com.duoshenyi.restapi.controller.utils.ResponseEntities;
import com.duoshenyi.restapi.controller.vo.UserParam;
import com.duoshenyi.user.model.User;
import com.duoshenyi.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * Controller for user.
 */
@Controller
@RequestMapping(value = {"/users"}, produces = "application/json;charset=UTF-8")
public class UserController {

    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = {RequestMethod.POST})
    public ResponseEntity<Object> addUser(@RequestBody UserParam userParam){

        if(userService.exists(userParam.getAccount())){
            return ResponseEntities.badRequest("User exists!");
        }

        User user = new User();
        user.setName(userParam.getName());
        user.setAccount(userParam.getAccount());
        user.setMobilePhone(userParam.getMobilePhone());
        user.setPassword(userParam.getPassword().getBytes());
        user.setCreateTime(new Date());

        userService.addUser(user);
        LOG.info("{} added.", user);

        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }

    @RequestMapping(method = {RequestMethod.GET})
    public ResponseEntity<Object> getUsers(@RequestParam(value = "filterText", required = false) String filterText){
        LOG.trace("filterText:{}", filterText);
        return new ResponseEntity<Object>(userService.getUsers(filterText), HttpStatus.OK);
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public ResponseEntity<Object> deleteUser(@PathVariable String id){
        User user = userService.removeUser(id);
        LOG.info("{} deleted", user);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }
}
