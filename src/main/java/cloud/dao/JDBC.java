package cloud.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBC {
    private static final String DRIVERCLASS = "org.apache.hive.jdbc.HiveDriver";
    private static final String URL ="jdbc:hive2://192.168.99.100:32783/cloud";
    //private static final ThreadLocal<Connection> threadLocal = new ThreadLocal<Connection>();// 用来保存数据库连接
    private static Connection conn = null;// 数据库连接
    static { // 通过静态方法加载数据库驱动，并且在数据库不存在的情况下创建数据库

        try {
            Class.forName(DRIVERCLASS); // 加载数据库驱动
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    protected static Connection getConnection() { // 创建数据库连接的方法


            try {
                conn = DriverManager.getConnection(URL,"root","Zl123456");

            } catch (Exception e) {
                System.exit(0);
                e.printStackTrace();
            }
        return conn;
    }
    protected static boolean closeConnection() { // 关闭数据库连接的方法

        boolean isClosed = true;

        //conn = (Connection) threadLocal.get();

       // threadLocal.set(null);

        if (conn != null) {

            try {
                conn.close();

            } catch (SQLException e) {
                isClosed = false;

                e.printStackTrace();
            }
        }
        return isClosed;
    }
}
