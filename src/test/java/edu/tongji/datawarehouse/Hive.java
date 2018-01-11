package edu.tongji.datawarehouse;

import org.apache.commons.net.ntp.TimeStamp;
import org.junit.Test;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Hive {
    private static final String DRIVERCLASS = "org.apache.hive.jdbc.HiveDriver";
    private static final String URL ="jdbc:hive2://192.168.99.100:32783/cloud";


    @Test
    public void contextLoads() throws Exception {

        try{
            Class.forName(DRIVERCLASS);
        }
        catch (ClassNotFoundException e){
            e.printStackTrace();
            System.exit(1);
        }
        Connection con = DriverManager.getConnection(URL,"root","Zl123456");
        Statement statement = con.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from timetest");
        resultSet.next();
        Timestamp timestamp= (Timestamp) resultSet.getObject("time");
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(sdf.format(timestamp));
        System.out.println("");
    }



}
