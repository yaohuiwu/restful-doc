package com.duoshenyi.restapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * A greet controller using for test to see if the mvc framework is ready.
 * <p>
 *     visit: <a href="http://localhost/restapi/greet?name=jetty">say hello to jetty.</a>
 * </p>
 */
@Controller
@RequestMapping(produces = "text/plain;charset=UTF-8")
public class GreetController {

    private static final Logger LOG = LoggerFactory.getLogger(GreetController.class);

    @RequestMapping(value = {"/greet"}, method = {RequestMethod.GET})
    public ResponseEntity<Object> greet(@RequestParam String name){
        LOG.info("Greet from {}.", name);
        return new ResponseEntity<Object>("Hi, " + name, HttpStatus.OK);
    }
}
