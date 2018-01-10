package cloud.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;


public class BaseDao {
    public Object selectOnlyValue(String sql) {
        Object value = null;
        Connection conn = JDBC.getConnection();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                value = rs.getObject(1);
            }
            rs.close();
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return value;
    }


    public Vector selectSomeNote(String sql) {
        Vector<Vector> rsV = new Vector<>(); // 创建结果集向量

        Connection conn = JDBC.getConnection();// 获得数据库连接

        try {
            Statement stmt = conn.createStatement();// 创建连接状态对象

            ResultSet rs = stmt.executeQuery(sql);// 执行SQL语句获得查询结果

            int columnCount = rs.getMetaData().getColumnCount();// 获得查询数据表的列数

            while (rs.next()) {// 遍历结果集

                Vector<Object> rowV = new Vector();// 创建行向量

                for (int column = 1; column <= columnCount; column++) {
                    rowV.add(rs.getObject(column));// 添加列值
                }
                rsV.add(rowV);// 将行向量添加到结果集向量中

            }
            rs.close();// 关闭结果集对象

            stmt.close();// 关闭连接状态对象

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rsV;// 返回结果集向量

    }

    // 查询单个记录
    public Vector selectOnlyNote(String sql) {
        Vector<Object> rowV = null;
        Connection conn = JDBC.getConnection();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            int columnCount = rs.getMetaData().getColumnCount();
            while (rs.next()) {
                rowV = new Vector<Object>();
                for (int column = 1; column <= columnCount; column++) {
                    rowV.add(rs.getObject(column));
                }
            }
            rs.close();
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rowV;
    }

    // 查询多个值
    public Vector selectSomeValue(String sql) {
        Vector<Object> valueV = new Vector<Object>();
        Connection conn = JDBC.getConnection();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                valueV.add(rs.getObject(1));
            }
            rs.close();
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return valueV;
    }
}
