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
             return hashMap;
        }
        else if (((String)map.get("action")).equals("product")){
            String type = (String)map.get("type");
            String name = (String)map.get("name");
            hashMap.put("list",indexService.getProductsByNameType(name,type));
            return hashMap;
        }
        else if (((String)map.get("action")).equals("name")){
            String name = (String)map.get("name");
            number = indexService.name(name);
        }
        else if (((String)map.get("action")).equals("director")){
            String director =  (String)map.get("director");
            number = indexService.director(director);
        }
        else if (((String)map.get("action")).equals("actor")){
            String actor = (String)map.get("actor");
            Long main = indexService.actorMain(actor);
            Long participate = indexService.actorParticipate(actor);
            hashMap.put("main",main);
            hashMap.put("participate",participate);
        }
        else if (((String)map.get("action")).equals("type")){
            String type = (String)map.get("type");
            number = indexService.type(type);
        }
        else if (((String)map.get("action")).equals("combine-season")){
            int year = Integer.parseInt((String)map.get("year"));
            String season = (String)map.get("season");
            String director =  (String)map.get("director");
            String actor = (String)map.get("actor");
            String type = (String)map.get("type");
            number = indexService.combineSeason(year,season,director,actor,type);
        }
        else if (((String)map.get("action")).equals("combine-month")){
            int year = Integer.parseInt((String)map.get("year"));
            int month = Integer.parseInt((String)map.get("month"));
            String director =  (String)map.get("director");
            String actor = (String)map.get("actor");
            String type = (String)map.get("type");
            number = indexService.combineMonth(year,month,director,actor,type);
        }
        else if (((String)map.get("action")).equals("list")){
            int year = Integer.parseInt((String)map.get("year"));
            int month = Integer.parseInt((String)map.get("month"));
            String director =  (String)map.get("director");
            String actor = (String)map.get("actor");
            List list = indexService.list(year,month,director,actor);
            hashMap.put("list",list);
        }
        else if (((String)map.get("action")).equals("hot")){
            String name = (String)map.get("name");
            number = indexService.hot(name);
        }
        else if (((String)map.get("action")).equals("mysql-time-month")){
            int year = Integer.parseInt((String)map.get("year"));
            int month = Integer.parseInt((String)map.get("month"));
        }
        else if (((String)map.get("action")).equals("mysql-time-season")){
            int year = Integer.parseInt((String)map.get("year"));
            String season = (String)map.get("season");
        }
        else if (((String)map.get("action")).equals("mysql-time-week")){
            int year = Integer.parseInt((String)map.get("week"));
        }
        else if (((String)map.get("action")).equals("mysql-name")){
            String name = (String)map.get("name");

        }
        else if (((String)map.get("action")).equals("mysql-director")){
            String director =  (String)map.get("director");
        }
        else if (((String)map.get("action")).equals("mysql-actor")){
            String actor = (String)map.get("actor");

        }
        else if (((String)map.get("action")).equals("mysql-type")){
            String type = (String)map.get("type");
        }
        else if (((String)map.get("action")).equals("mysql-combine-season")){
            int year = Integer.parseInt((String)map.get("year"));
            String season = (String)map.get("season");
            String director =  (String)map.get("director");
            String actor = (String)map.get("actor");
            String type = (String)map.get("type");
        }
        else if (((String)map.get("action")).equals("mysql-combine-month")){
            int year = Integer.parseInt((String)map.get("year"));
            int month = Integer.parseInt((String)map.get("month"));
            String director =  (String)map.get("director");
            String actor = (String)map.get("actor");
            String type = (String)map.get("type");
        }
        else if (((String)map.get("action")).equals("mysql-list")){
            int year = Integer.parseInt((String)map.get("year"));
            int month = Integer.parseInt((String)map.get("month"));
            String director =  (String)map.get("director");
            String actor = (String)map.get("actor");
        }
        else if (((String)map.get("action")).equals("mysql-hot")){
            String name = (String)map.get("name");
        }

        long time = System.currentTimeMillis() - start;

        hashMap.put("number",number);
        hashMap.put("runtime",time);
        return hashMap;
    }

}