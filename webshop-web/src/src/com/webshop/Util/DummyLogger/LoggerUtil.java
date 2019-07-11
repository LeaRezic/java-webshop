package src.com.webshop.Util.DummyLogger;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class LoggerUtil {

    public static void log(String message) {
        StringBuilder sb = new StringBuilder();
        sb.append("****************************************************");
        sb.append("\n");
        sb.append(message);
        sb.append("\n");
        Writer output;
        try {
            output = new BufferedWriter(new FileWriter("/home/lrezic/Documents/faks/6.semestar/javaweb/projekt/webshop/webshop-web/src/src/com/webshop/Util/DummyLogger/log.txt", true));
            output.append(sb.toString());
            output.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
