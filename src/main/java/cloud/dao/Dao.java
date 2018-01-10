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
    public Long getMovieNumByTimeMonth(int year,int month)
    {
        String sql="select count(distinct movieid) from performance where year="+year+" and month="+month;
        System.out.println(sql);
        Object num = super.selectOnlyValue(sql);
        return (Long)num;
    }
    public Long getMovieNumByYear(int year)
    {
        String sql="select count(distinct movieid) from performance where year="+year;
        Object num = super.selectOnlyValue(sql);
        return (Long)num;
    }
    public Long getMovieNumBySeason(int year,int quarter)
    {
        Object num = super.selectOnlyValue("select count(distinct movieid) from performance where year="+year+" and month>"+(quarter-1)*3+" and month<"+(quarter*3+1));
        return (Long)num;
    }
    /*public Long getMovieNumByTimeMonth(int week)
    {
        Object num = super.selectOnlyValue("select count(*) from performance where year="+year+"and month="+month);
        return (Long)num;
    }*/
    public Long getMovieNumByDirector(String director)
    {
        Object num = super.selectOnlyValue("select count(distinct movieid) from performance where director='"+director+"'");
        return (Long)num;
    }
    public Long getVerNumByName(String name)
    {
        Object num = super.selectOnlyValue("select versionnum from movie where name='"+name+"'");
        return new Long((Integer)num);
    }
    public Long getMovieMain(String actor)
    {
        Object num = super.selectOnlyValue("select count(distinct movieid) from performance where actor='"+actor+"' and ifleading=1");
        return (Long)num;
    }
    public Long getMovieParticipate(String actor)
    {
        Object num = super.selectOnlyValue("select count(distinct movieid) from performance where actor='"+actor+"'");
        return (Long)num;
    }
    public Long getMoviebyType(String type)
    {
        ArrayList<String> types=versionmap.get(type);
        String sql="select count(distinct movieid) from performance where ";
        for(int i=0;i<types.size();i++)
        {
            sql=sql+"type='"+types.get(i)+"'";
            if ((i+1)!=types.size())
            {
                sql=sql+" or ";
            }
        }
        Object num = super.selectOnlyValue(sql);
        return (Long)num;
    }
    public Long getMovieNumByTimeCombineSeason(int year,int quarter,String director,String actor,String type)
    {
        String sql="select count(distinct movieid) from performance where year="+year+" and director='"+director+"' and month>"+(quarter-1)*3+" and month<"+(quarter*3+1)+" and actor='"+actor+"'";
        if(director.isEmpty())
        {
            sql = sql.replaceAll(" and director=''","");
        }
        if(actor.isEmpty())
        {
            sql = sql.replaceAll(" and actor=''","");
        }
        if(!type.isEmpty())
        {
            ArrayList<String> types=versionmap.get(type);
            sql=sql+"and (type='"+types.get(0)+"' or ";
            for(int i=1;i<types.size();i++)
            {
                sql=sql+"type='"+types.get(i)+"'";
                if ((i+1)!=types.size())
                {
                    sql=sql+" or ";
                }
            }
            sql=sql+")";
        }
        Object num = super.selectOnlyValue(sql);
        return (Long)num;
    }
    public Long getMovieCombinedMonth(int year,int month,String director,String actor,String type)
    {
        String sql="select count(distinct movieid) from performance where year="+year+" and director='"+director+"' and month="+month+" and actor='"+actor+"' ";
        if(director.isEmpty())
        {
            sql = sql.replaceAll(" and director=''","");
        }
        if(actor.isEmpty())
        {
            sql = sql.replaceAll(" and actor=''","");
        }
        if(!type.isEmpty())
        {
            if(!type.isEmpty())
            {
                ArrayList<String> types=versionmap.get(type);
                sql=sql+"and (type='"+types.get(0)+"' or ";
                for(int i=1;i<types.size();i++)
                {
                    sql=sql+"type='"+types.get(i)+"'";
                    if ((i+1)!=types.size())
                    {
                        sql=sql+" or ";
                    }
                }
                sql=sql+")";
            }
            System.out.println(sql);
        }
        Object num = super.selectOnlyValue(sql);
        return (Long)num;
    }

    /*
    public Vector getMovieIDs(int year, int month, String director, String actor)
    {
        String sql="select distinct movieid from performance where year="+year+" and director='"+director+"' and month="+month+" and actor='"+actor+"' ";
        if(director.isEmpty())
        {
            sql = sql.replaceAll(" and director=''","");
        }
        if(actor.isEmpty())
        {
            sql = sql.replaceAll(" and actor=''","");
        }
        if(!type.isEmpty())
        {
            if(!type.isEmpty())
            {
                ArrayList<String> types=versionmap.get(type);
                sql=sql+"and (type='"+types.get(0)+"' or ";
                for(int i=1;i<types.size();i++)
                {
                    sql=sql+"type='"+types.get(i)+"'";
                    if ((i+1)!=types.size())
                    {
                        sql=sql+" or ";
                    }
                }
                sql=sql+")";
            }
            System.out.println(sql);
        }
        return  super.selectSomeValue(sql);
    }

    */
    /*

    public Vector getMovieActors(String movieid)
    {
        String sql="select distinct actor from performance where movieid='"+movieid+"'";
        return  super.selectSomeValue(sql);
    }
    public Vector getMovieDirectors(String movieid)
    {
        String sql="select distinct director from performance where movieid='"+movieid+"'";
        return  super.selectSomeValue(sql);
    }
    public Vector getMovieTypes(String movieid)
    {
        String sql="select distinct type from performance where movieid='"+movieid+"'";
        return  super.selectSomeValue(sql);
    }
    public Vector getMovieInfo(String movieid)
    {
        String sql="select name,type,year,month,day from movie join performance on movie.movieid=performqnce.movieid" ;
        return  super.selectOnlyNote(sql);
    }
    public String getMovieName(String movieid)
    {
        String sql="select distinct name from movie where movieid='"+movieid+"'";
        return  (String)super.selectOnlyValue(sql);
    }
    public Vector getMovieScores(String movieid)
    {
        String sql="select rank from comments where movieid='"+movieid+"'";
        return  super.selectSomeValue(sql);
    }*/

    public Long getMovieHot(String name)
    {

        String sql="select count(*) from comments join movie on ( comments.movieid = movie.movieid ) where name ='"+name+"'";
        return  (Long) super.selectOnlyValue(sql);
    }

    public Vector getConcrete(Integer year, Integer month, String director, String actor){
        String sql = "select distinct(name),performance.year,performance.month,performance.day,performance.type,performance.director,performance.actor,rank from performance join movie on (performance.movieid = movie.movieid) join comments on (movie.movieid = comments.movieid) where performance.year = " + year + " and performance.month = " +month;
        if(!director.isEmpty()){
            sql = sql + " and performance.director='" + director + "'";
        }
        if(!actor.isEmpty()){
            sql = sql + " and performance.actor='" + actor + "'";
        }

        return super.selectSomeNote(sql);

    }
}
