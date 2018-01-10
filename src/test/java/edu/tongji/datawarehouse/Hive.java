package edu.tongji.datawarehouse;

import java.sql.*;

public class Hive {
    private static String driverName = "org.apache.hive.jdbc.HiveDriver";
    public static void main(String[] args) throws SQLException {
        try{
            Class.forName(driverName);
        }
        catch (ClassNotFoundException e){
            e.printStackTrace();
            System.exit(1);
        }

        Connection con = DriverManager.getConnection("jdbc:hive2://192.168.99.100:32783/default","root","123456");
        Statement statement = con.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from test_person");
        resultSet.next();
        System.out.println(resultSet.getString("name"));
    }



}
