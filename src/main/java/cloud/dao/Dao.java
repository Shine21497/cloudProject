package cloud.dao;

import javax.persistence.criteria.CriteriaBuilder;
import java.io.File;
import java.io.FileInputStream;
import java.util.*;

public class Dao extends BaseDao{
    private static final Dao dao;
    private static final HashMap<String,ArrayList<String>> versionmap;


    static {
        dao = new Dao();
        versionmap=new HashMap<>();
        Scanner scanner=null;
        String wholefile="";

        try {
            File inputfile = new File("src/main/resources/map");
            scanner = new Scanner(new FileInputStream(inputfile));
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        while(scanner.hasNext())
        {
            String line=scanner.nextLine();
            wholefile=wholefile+line+"\n";
        }
        String[] lines=wholefile.split("\\^");
        System.out.println("lines:"+lines.length);
        for(int i=0;i<lines.length;i++)
        {
            String line=lines[i];
            if (line.isEmpty())
            {
                continue;
            }
            String[] keyandvalue=line.split("\\|");
            if(keyandvalue.length==1)
            {
                continue;
            }
            String key=keyandvalue[0];
            ArrayList<String> temp=new ArrayList<>();
            String[] values=keyandvalue[1].split("@");
            for(int z=0;z<values.length;z++)
            {
                if (values[z].contains("'")){
                    temp.add(values[z].replaceAll("\\'","\\\\'"));
                }
                else
                    temp.add(values[z]);
            }
            versionmap.put(key,temp);


        }


    }

    public static Dao getInstance() {
        return dao;
    }
    public Vector getAllOrder()
    {

        String sql="select * from purchaseorder";
        return super.selectSomeNote(sql);
    }
    public Vector getAllShops()
    {

        String sql="select * from shop";
        return super.selectSomeNote(sql);
    }
    public Vector getAllProducts()
    {

        String sql="select * from product";
        return super.selectSomeNote(sql);
    }
    public Vector getCustomerById(int id)
    {

        String sql="select * from customer where c_id="+id;
        return super.selectOnlyNote(sql);
    }
    public Vector getShopById(int id)
    {

        String sql="select * from shop where s_id="+id;
        return super.selectOnlyNote(sql);
    }
    public String getTypeById(int id)
    {
        String sql="select name from product_type where t_id="+id;
        return (String)super.selectOnlyValue(sql);
    }
    public Vector getProductById(int id)
    {
        String sql="select * from product where p_id="+id;
        return super.selectOnlyNote(sql);
    }
    public Vector getOrderGroupByShop()
    {
        String sql="select s_id,o_id from purchaseorder";
        Vector vector=super.selectSomeNote(sql);
        HashMap<Integer,Integer> hashMap=new HashMap<>();
        for(int i=0;i<vector.size();i++)
        {
            Vector line=(Vector) vector.get(i);
            int s_id=(int)line.get(0);
            int o_id=(int)line.get(1);
            if (hashMap.containsKey(s_id))
            {
                int tmep=hashMap.get(s_id);
                hashMap.put(s_id,tmep+1);
            }
            else
            {
                hashMap.put(s_id,1);
            }
        }
        Vector all=new Vector();
        for (Map.Entry<Integer,Integer> item : hashMap.entrySet()) {
            Vector row=new Vector();
            row.add(item.getKey());
            row.add(item.getValue());
            all.add(row);
        }
        return all;
    }
    public Vector getIncludeGroupByProduct()
    {
        String sql="select p_id,number from include";
        Vector vector=super.selectSomeNote(sql);
        HashMap<Integer,Integer> hashMap=new HashMap<>();
        for(int i=0;i<vector.size();i++)
        {
            Vector line=(Vector) vector.get(i);
            int p_id=(int)line.get(0);
            int number=(int)line.get(1);
            if (hashMap.containsKey(p_id))
            {
                int tmep=hashMap.get(p_id);
                hashMap.put(p_id,tmep+number);
            }
            else
            {
                hashMap.put(p_id,number);
            }
        }
        Vector all=new Vector();
        for (Map.Entry<Integer,Integer> item : hashMap.entrySet()) {
            Vector row=new Vector();
            row.add(item.getKey());
            row.add(item.getValue());
            all.add(row);
        }
        return all;
    }

    public Vector getSellGroupByShop()
    {
        String sql = "select s_id,sales from sell";
        Vector vector=super.selectSomeNote(sql);
        HashMap<Integer,Integer> hashMap=new HashMap<>();
        for(int i=0;i<vector.size();i++)
        {
            Vector line=(Vector) vector.get(i);
            int s_id=(int)line.get(0);
            int sales=(int)line.get(1);
            if (hashMap.containsKey(s_id))
            {
                int tmep=hashMap.get(s_id);
                hashMap.put(s_id,tmep+sales);
            }
            else
            {
                hashMap.put(s_id,sales);
            }
        }
        Vector all=new Vector();
        for (Map.Entry<Integer,Integer> item : hashMap.entrySet()) {
            Vector row=new Vector();
            row.add(item.getKey());
            row.add(item.getValue());
            all.add(row);
        }
        return all;
    }
    public Vector getOrderGroupByCustomer()
    {
        String sql = "select c_id,total_price from purchaseorder";
        Vector vector=super.selectSomeNote(sql);
        HashMap<Integer,Integer> hashMap=new HashMap<>();
        for(int i=0;i<vector.size();i++)
        {
            Vector line=(Vector) vector.get(i);
            int c_id=(int)line.get(0);
            int total_price=(int)line.get(1);
            if (hashMap.containsKey(c_id))
            {
                int tmep=hashMap.get(c_id);
                hashMap.put(c_id,tmep+total_price);
            }
            else
            {
                hashMap.put(c_id,total_price);
            }
        }
        Vector all=new Vector();
        for (Map.Entry<Integer,Integer> item : hashMap.entrySet()) {
            Vector row=new Vector();
            row.add(item.getKey());
            row.add(item.getValue());
            all.add(row);
        }
        return all;
    }




}
