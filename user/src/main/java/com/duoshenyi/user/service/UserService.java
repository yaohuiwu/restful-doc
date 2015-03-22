package com.duoshenyi.user.service;

import com.duoshenyi.user.model.User;

import java.util.List;

/**
 * Created by wuyaohui on 15-3-19.
 */
public interface UserService {

    boolean exists(String account);

    User addUser(User user);

    List<User> getUsers();

    User removeUser(String userId);

    void updateUser(User user);
}
