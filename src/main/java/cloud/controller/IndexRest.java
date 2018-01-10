package cloud.controller;

import cloud.service.Index;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@EnableAutoConfiguration
public class IndexRest {
    @Autowired
    Index indexService;


    @ResponseBody
    @RequestMapping(value = "/" , method = RequestMethod.POST ,produces = "application/json")
    HashMap index(@RequestBody Map<String,Object> map) throws SQLException {
        HashMap hashMap = new HashMap();
        Long number = new Long(0);

        long start = System.currentTimeMillis();

        if(((String)map.get("action")).equals("order")){
            String year = (String)map.get("year");
            String month = (String)map.get("month");
            String day = (String)map.get("number");
            hashMap.put("list",indexService.getOrdersByDate(year,month,day));
            return hashMap;
        }
        else if (((String)map.get("action")).equals("shop")){
            String name = (String)map.get("name");
            String address = (String)map.get("address");
             hashMap.put("list",indexService.getShopByNameAddress(name,address));
            System.out.println("here");
             return hashMap;
        }
        else if (((String)map.get("action")).equals("product")){
            String type = (String)map.get("type");
            String name = (String)map.get("name");
            hashMap.put("list",indexService.getProductsByNameType(name,type));
            return hashMap;
        }
        else if (((String)map.get("action")).equals("hot-shop")){
            hashMap.put("list",indexService.getMostPopularShop());
            return hashMap;
        }
        else if (((String)map.get("action")).equals("hot-product")){
            hashMap.put("list",indexService.getMostPopularProduct());
            return hashMap;
        }
        else if (((String)map.get("action")).equals("rich-shop")){
            hashMap.put("list",indexService.getMostRichShop());
            return hashMap;
        }
        else if (((String)map.get("action")).equals("rich-customer")){
            hashMap.put("list",indexService.getMostRichCustomer());
            return hashMap;
        }

        return hashMap;
    }

}