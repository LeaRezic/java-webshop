package src.com.webshop.Util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    private static final String DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";

    public static String getNowWithMins(int minutes) {
        Calendar cl = Calendar.getInstance();
        cl.setTime(new Date());
        cl.add(Calendar.MINUTE, 30);
        return new SimpleDateFormat(DATE_FORMAT).format(cl.getTime());
    }

    public static long getSecondsDiff(String expireDate) throws ParseException {
        Date now = new Date();
        Date expire = new SimpleDateFormat(DATE_FORMAT).parse(expireDate);
        return (expire.getTime()-now.getTime())/1000;
    }

    public static boolean checkIfFuture(String expireDate) throws ParseException {
        Date now = new Date();
        Date expire = new SimpleDateFormat(DATE_FORMAT).parse(expireDate);
        return (expire.getTime() - now.getTime()) > 0;
    }

    public static String getDisplayTimestamp(Timestamp timestamp) {
        return new SimpleDateFormat(DATE_FORMAT).format(timestamp);
    }

}
