package src.com.webshop.Util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
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

    public static String getJsonString(Object object) {
        final Gson gson;
        gson = new GsonBuilder().create();
        return gson.toJson(object);
    }

    public static Object getObjFromJson(String json, Class objClass) {
        final Gson gson;
        gson = new GsonBuilder().create();
        return gson.fromJson(json, objClass);
    }

    public static Object getObjFromReader(BufferedReader reader, Class objClass) {
        final Gson gson;
        gson = new GsonBuilder().create();
        return gson.fromJson(reader, objClass);
    }
}
