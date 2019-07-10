package src.com.webshop.Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.List;

public class JsonUtil {

    public static JsonObject getJsonArray(List<?> objects, String arrayName) {
        final Gson gson;
        gson = new GsonBuilder().create();
        JsonArray jarray = gson.toJsonTree(objects).getAsJsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add(arrayName, jarray);
        return jsonObject;
    }

    public static JsonObject getJson(Object object, String objectName) {
        final Gson gson;
        gson = new GsonBuilder().create();
        JsonObject jsonObject = new JsonObject();
        jsonObject.add(objectName, gson.toJsonTree(object));
        return jsonObject;
    }
}
