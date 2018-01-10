package cloud.service;

import cloud.dao.Dao;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class Index {
    public Long timeMonth(int year,int month) {
        return Dao.getInstance().getMovieNumByTimeMonth(year,month);
    }

    public Long timeSeason(int year,String season){
        int quarter=-1;
        switch (season){
            case "春":quarter=1;
            break;
            case  "夏":quarter=2;
            break;
            case "秋": quarter=3;
            break;
            case "冬": quarter=4;
                break;
        }
        return Dao.getInstance().getMovieNumBySeason(year,quarter);
    }

    public Long year(int year){
        System.out.print(year);
        return Dao.getInstance().getMovieNumByYear(year);
    }

    public Long name(String name) throws SQLException {
        return Dao.getInstance().getVerNumByName(name);
    }

    public Long director(String director){
        return Dao.getInstance().getMovieNumByDirector(director);
    }

    public Long actorMain(String actor){
        return Dao.getInstance().getMovieMain(actor);
    }

    public Long actorParticipate(String actor){
        return Dao.getInstance().getMovieParticipate(actor);
    }

    public Long type(String type){

        return Dao.getInstance().getMoviebyType(type);
    }

    public Long combineSeason(int year,String season,String director,String actor,String type){
        int quarter=-1;
        switch (season){
            case "春":quarter=1;
                break;
            case  "夏":quarter=2;
                break;
            case "秋": quarter=3;
                break;
            case "冬": quarter=4;
                break;
        }

        return Dao.getInstance().getMovieNumByTimeCombineSeason(year,quarter,director,actor,type);
    }

    public Long combineMonth(int year,int month,String director,String actor,String type){

        return Dao.getInstance().getMovieCombinedMonth(year,month,director,actor,type);
    }

    public List<HashMap<String,String>> list(int year,int month,String director,String actor){
        List<HashMap<String,String>> list = new ArrayList<>();
        //电影名，时间，类型,导演，演员 在list里面添加hashmap

        /*
        Vector movieids=Dao.getInstance().getMovieIDs(year,month,director,actor);
        for(int i=0;i<2;i++)
        {
            String movieid=(String)movieids.get(i);
            Vector actors=Dao.getInstance().getMovieActors(movieid);
            Vector directors=Dao.getInstance().getMovieDirectors(movieid);
            Vector infos=Dao.getInstance().getMovieInfo(movieid);
            Vector scores=Dao.getInstance().getMovieScores(movieid);
            String allactor="";
            for(int j=0;j<actors.size();j++)
            {
                allactor=allactor+actors.get(j)+" ";
            }
            String alldirector="";
            for(int j=0;j<directors.size();j++)
            {
                alldirector=alldirector+directors.get(j)+" ";
            }
            int score=0;
            for(int j=0;j<scores.size();j++)
            {
                score=score+(int)scores.get(j);
            }
            HashMap hash = new HashMap();
            hash.put("name",infos.get(0)==null?"":infos.get(0));
            hash.put("time",infos.get(2)+"-"+infos.get(3)+"-"+infos.get(4));
            hash.put("type",infos.get(1)==null?"":infos.get(1));
            hash.put("director",alldirector);
            hash.put("actor",allactor);
            hash.put("comment",score/1.0/scores.size());
            list.add(hash);

        }*/

        Vector<Vector<Object>> rs = (Vector<Vector<Object>>) Dao.getInstance().getConcrete(year,month,director,actor);
        int i=0;
        Set<String> set = new HashSet<>();
        for( List row : rs ){
            if(((String)row.get(5)).isEmpty()){
                continue;
            }
            else if(set.contains((String)row.get(0))){
                continue;
            }
            set.add((String)row.get(0));
            HashMap map = new HashMap();
            map.put("name",(String)row.get(0));
            map.put("time","" + (Integer)row.get(1)+(Integer)row.get(2)+(Integer)row.get(3));
            map.put("type",(String)row.get(4));
            map.put("director",(String)row.get(5));
            map.put("actor",(String)row.get(6));
            map.put("comment",(Integer)row.get(7));

            list.add(map);
            if(i >= 999) {
                break;
            }
            ++i;
        }

        //例子
        return list;
    }

    public Long hot(String name){
        return Dao.getInstance().getMovieHot(name);
    }


    public List<HashMap<String,String>> getOrdersByDate(String year,String month,String day) {
        List<HashMap<String,String>> list = new ArrayList<>();
        Vector allorders=Dao.getInstance().getAllOrder();
        for(int i=0;i<allorders.size();i++)
        {
            Vector line=(Vector) allorders.get(i);
            Timestamp timestamp=(Timestamp)line.get(4);
            DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            if(!day.isEmpty())
            {
                day.equals(sdf.format(timestamp));
                HashMap<String,String> hashMap=new HashMap<>();
                int o_id=(int)line.get(0);
                int c_id=(int)line.get(1);
                Vector customer=Dao.getInstance().getCustomerById(c_id);
                int s_id=(int)line.get(2);
                Vector shop=Dao.getInstance().getShopById(s_id);
                int totalprice=(int)line.get(3);
                String date=sdf.format(timestamp);
                String status=(String)line.get(5);
                hashMap.put("o_id",String.valueOf(o_id));
                hashMap.put("customer",(String)customer.get(1));
                hashMap.put("shop",(String)shop.get(1));
                hashMap.put("totalprice",String.valueOf(totalprice));
                hashMap.put("date",date);
                hashMap.put("status",status);
                list.add(hashMap);
                continue;
            }
            String[] ymd=sdf.format(timestamp).split("-");
            if(ymd[0].equals(year.isEmpty()?ymd[0]:year)&&ymd[1].equals(month.isEmpty()?ymd[1]:month))
            {
                HashMap<String,String> hashMap=new HashMap<>();
                int o_id=(int)line.get(0);
                int c_id=(int)line.get(1);
                Vector customer=Dao.getInstance().getCustomerById(c_id);
                int s_id=(int)line.get(2);
                Vector shop=Dao.getInstance().getShopById(s_id);
                int totalprice=(int)line.get(3);
                String date=sdf.format(timestamp);
                String status=(String)line.get(5);
                hashMap.put("o_id",String.valueOf(o_id));
                hashMap.put("customer",(String)customer.get(1));
                hashMap.put("shop",(String)shop.get(1));
                hashMap.put("totalprice",String.valueOf(totalprice));
                hashMap.put("date",date);
                hashMap.put("status",status);
                list.add(hashMap);

            }
        }
        return  list;

    }
    public List<HashMap<String,String>> getShopByNameAddress(String name,String address) {
        List<HashMap<String,String>> list = new ArrayList<>();
        Vector allshops=Dao.getInstance().getAllShops();
        for(int i=0;i<allshops.size();i++)
        {
            Vector line=(Vector)allshops.get(i);
            Integer s_id=(Integer)line.get(0);
            String shopname=(String)line.get(1);
            String shopaddr=(String)line.get(2);
            String phonenum=(String)line.get(3);

            if(shopname!=null&&shopaddr!=null&&shopname.equals(name.isEmpty()?shopname:name)&&shopaddr.equals(address.isEmpty()?shopaddr:address))
            {
                System.out.println(shopname);
                System.out.println(name);
                HashMap<String,String> hashMap=new HashMap<>();
                hashMap.put("s_id",String.valueOf(s_id));
                hashMap.put("shopname",shopname);
                hashMap.put("shopaddress",shopaddr);
                hashMap.put("phonenumber",phonenum);
                list.add(hashMap);

            }
        }
        System.out.println(list.size());
        return  list;

    }
    public List<HashMap<String,String>> getProductsByNameType(String name,String type) {
        List<HashMap<String,String>> list = new ArrayList<>();
        Vector allproducts=Dao.getInstance().getAllProducts();
        for(int i=0;i<allproducts.size();i++)
        {
            Vector line=(Vector)allproducts.get(i);
            int p_id=(int)line.get(0);
            String productname=(String)line.get(1);
            String price=(String)line.get(2);
            int type_id=(int)line.get(3);
            if(name.equals(productname))
            {
                String typename=Dao.getInstance().getTypeById(type_id);
                if(typename.equals(type)) {
                    HashMap<String, String> hashMap = new HashMap<>();
                    hashMap.put("p_id", String.valueOf(p_id));
                    hashMap.put("productname", productname);
                    hashMap.put("price", price);
                    hashMap.put("type", typename);
                    list.add(hashMap);
                }

            }
        }
        return  list;

    }
    public List<HashMap<String,String>> getMostPopularShop() {
        List<HashMap<String,String>> list = new ArrayList<>();
        Vector vector=Dao.getInstance().getOrderGroupByShop();
        vector.sort(new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                Vector vector1= (Vector)o1;
                Vector vector2=(Vector)o2;
                if((int)vector1.get(1)<(int)vector2.get(1))
                {
                    return -1;
                }
                else if((int)vector1.get(1)==(int)vector2.get(1))
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
            }
        });
        for (int i=0;i<3;i++)
        {
            Vector shopline=(Vector) vector.get(i);
            int id=(int)shopline.get(0);
            int numoforder=(int)shopline.get(1);
            Vector shop=Dao.getInstance().getShopById(id);
            HashMap<String,String> hashMap=new HashMap<>();
            hashMap.put("id",String.valueOf(id));
            hashMap.put("name",(String)shop.get(1));
            hashMap.put("address",(String)shop.get(2));
            hashMap.put("ordernum",String.valueOf(numoforder));
            list.add(hashMap);

        }
        return list;

    }
    public List<HashMap<String,String>> getMostPopularProduct() {
        List<HashMap<String,String>> list = new ArrayList<>();
        Vector vector=Dao.getInstance().getIncludeGroupByProduct();
        vector.sort(new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                Vector vector1= (Vector)o1;
                Vector vector2=(Vector)o2;
                if((int)vector1.get(1)<(int)vector2.get(1))
                {
                    return -1;
                }
                else if((int)vector1.get(1)==(int)vector2.get(1))
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
            }
        });
        for (int i=0;i<3;i++)
        {
            Vector productline=(Vector) vector.get(i);
            int id=(int)productline.get(0);
            int sellnum=(int)productline.get(1);
            Vector product=Dao.getInstance().getProductById(id);
            String  name=(String)product.get(1);
            int price=(int)product.get(2);
            HashMap<String,String> hashMap=new HashMap<>();
            hashMap.put("id",String.valueOf(id));
            hashMap.put("name",name);
            hashMap.put("price",String.valueOf(price));
            hashMap.put("sellnum",String.valueOf(sellnum));
            list.add(hashMap);

        }
        return list;

    }

}
