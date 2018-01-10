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

    public List<HashMap<String,String>> getMostRichShop() {
        List<HashMap<String,String>> list = new ArrayList<>();
        Vector vector=Dao.getInstance().getSellGroupByShop();
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
            int sales=(int)shopline.get(1);
            Vector shop=Dao.getInstance().getShopById(id);
            String name=(String)shop.get(1);
            HashMap<String,String> hashMap=new HashMap<>();
            hashMap.put("id",String.valueOf(id));
            hashMap.put("name",name);
            hashMap.put("sales",String.valueOf(sales));
            list.add(hashMap);
        }
        return list;
    }

    public List<HashMap<String,String>> getMostRichCustomer() {
        List<HashMap<String,String>> list = new ArrayList<>();
        Vector vector=Dao.getInstance().getOrderGroupByCustomer();
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
            Vector orderline=(Vector) vector.get(i);
            int id=(int)orderline.get(0); // customer id
            int outcome=(int)orderline.get(1); //customer outcome
            Vector customer=Dao.getInstance().getCustomerById(id);
            String name=(String)customer.get(1);
            HashMap<String,String> hashMap=new HashMap<>();
            hashMap.put("id",String.valueOf(id));
            hashMap.put("name",name);
            hashMap.put("outcome",String.valueOf(outcome));
            list.add(hashMap);
        }
        return list;
    }
}
