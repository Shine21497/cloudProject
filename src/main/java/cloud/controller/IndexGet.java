package cloud.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@EnableAutoConfiguration
public class IndexGet {
    @RequestMapping(value = "/",method = RequestMethod.GET)
    String index(){
        return "index";
    }
}
