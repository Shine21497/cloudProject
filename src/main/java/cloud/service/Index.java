package cloud.service;

import cloud.dao.Dao;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

@Service
public class Index {
    private static String driverName = "org.apache.hive.jdbc.HiveDriver";
    public Long timeMonth(int year,int month) {
        return Dao.getInstance().getMovieNumByTimeMonth(year,month);
    }

    public Long timeSeason(int year,String season){
        int quarter=-1;
        switch (season){
            case "春":quarter=1;
            break;
            case  "夏":quarter=2;
            break;
            case "秋": quarter=3;
            break;
            case "冬": quarter=4;
                break;
        }
        return Dao.getInstance().getMovieNumBySeason(year,quarter);
    }

    public Long year(int year){
        System.out.print(year);
        return Dao.getInstance().getMovieNumByYear(year);
    }

    public Long name(String name) throws SQLException {
        return Dao.getInstance().getVerNumByName(name);
    }

    public Long director(String director){
        return Dao.getInstance().getMovieNumByDirector(director);
    }

    public Long actorMain(String actor){
        return Dao.getInstance().getMovieMain(actor);
    }

    public Long actorParticipate(String actor){
        return Dao.getInstance().getMovieParticipate(actor);
    }

    public Long type(String type){

        return Dao.getInstance().getMoviebyType(type);
    }

    public Long combineSeason(int year,String season,String director,String actor,String type){
        int quarter=-1;
        switch (season){
            case "春":quarter=1;
                break;
            case  "夏":quarter=2;
                break;
            case "秋": quarter=3;
                break;
            case "冬": quarter=4;
                break;
        }

        return Dao.getInstance().getMovieNumByTimeCombineSeason(year,quarter,director,actor,type);
    }

    public Long combineMonth(int year,int month,String director,String actor,String type){

        return Dao.getInstance().getMovieCombinedMonth(year,month,director,actor,type);
    }

    public List<HashMap<String,String>> list(int year,int month,String director,String actor){
        List<HashMap<String,String>> list = new ArrayList<>();
        //电影名，时间，类型,导演，演员 在list里面添加hashmap

        /*
        Vector movieids=Dao.getInstance().getMovieIDs(year,month,director,actor);
        for(int i=0;i<2;i++)
        {
            String movieid=(String)movieids.get(i);
            Vector actors=Dao.getInstance().getMovieActors(movieid);
            Vector directors=Dao.getInstance().getMovieDirectors(movieid);
            Vector infos=Dao.getInstance().getMovieInfo(movieid);
            Vector scores=Dao.getInstance().getMovieScores(movieid);
            String allactor="";
            for(int j=0;j<actors.size();j++)
            {
                allactor=allactor+actors.get(j)+" ";
            }
            String alldirector="";
            for(int j=0;j<directors.size();j++)
            {
                alldirector=alldirector+directors.get(j)+" ";
            }
            int score=0;
            for(int j=0;j<scores.size();j++)
            {
                score=score+(int)scores.get(j);
            }
            HashMap hash = new HashMap();
            hash.put("name",infos.get(0)==null?"":infos.get(0));
            hash.put("time",infos.get(2)+"-"+infos.get(3)+"-"+infos.get(4));
            hash.put("type",infos.get(1)==null?"":infos.get(1));
            hash.put("director",alldirector);
            hash.put("actor",allactor);
            hash.put("comment",score/1.0/scores.size());
            list.add(hash);

        }*/

        Vector<Vector<Object>> rs = (Vector<Vector<Object>>) Dao.getInstance().getConcrete(year,month,director,actor);
        int i=0;
        Set<String> set = new HashSet<>();
        for( List row : rs ){
            if(((String)row.get(5)).isEmpty()){
                continue;
            }
            else if(set.contains((String)row.get(0))){
                continue;
            }
            set.add((String)row.get(0));
            HashMap map = new HashMap();
            map.put("name",(String)row.get(0));
            map.put("time","" + (Integer)row.get(1)+(Integer)row.get(2)+(Integer)row.get(3));
            map.put("type",(String)row.get(4));
            map.put("director",(String)row.get(5));
            map.put("actor",(String)row.get(6));
            map.put("comment",(Integer)row.get(7));

            list.add(map);
            if(i >= 999) {
                break;
            }
            ++i;
        }

        //例子
        return list;
    }

    public Long hot(String name){
        return Dao.getInstance().getMovieHot(name);
    }
}
