package edu.tongji.datawarehouse;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DatawarehouseApplicationTests {
	private static final String DRIVERCLASS = "org.apache.hive.jdbc.HiveDriver";
	private static final String URL ="jdbc:hive2://120.79.77.193:53310/default";


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
		ResultSet resultSet = statement.executeQuery("select * from test_person");
		resultSet.next();
		System.out.println(resultSet.getString(1));
		System.out.println("");
	}

}
