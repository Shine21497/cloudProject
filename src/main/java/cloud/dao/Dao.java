package cloud.dao;

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

        String sql="select * from shops";
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
        String sql="select name from product where p_id="+id;
        return super.selectSomeValue(sql);
    }
    public Vector getOrderGroupByShop()
    {
        String sql="select s_id,count(o_id) from purchaseorder group by s_id";
        return super.selectSomeNote(sql);
    }
    public Vector getIncludeGroupByProduct()
    {
        String sql="select p_id,sum(number) from purchaseorder group by p_id";
        return super.selectSomeNote(sql);
    }

    public Vector getSellGroupByShop()
    {
        String sql = "select s_id,sum(sales) from sell group by s_id";
        return super.selectSomeNote(sql);
    }
    public Vector getOrderGroupByCustomer()
    {
        String sql = "select c_id,sum(total_price) from purchaseorder group by c_id";
        return super.selectSomeNote(sql);
    }




}
