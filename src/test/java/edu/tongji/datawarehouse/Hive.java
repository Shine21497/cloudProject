package edu.tongji.datawarehouse;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Hive {
    private static String driverName = "org.apache.hive.jdbc.HiveDriver";
    public static void main(String[] args) throws SQLException {

       Timestamp timestamp=new Timestamp(System.currentTimeMillis());
        System.out.println(System.currentTimeMillis());
    }



}
