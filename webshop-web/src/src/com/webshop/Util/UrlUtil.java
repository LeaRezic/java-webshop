package src.com.webshop.Util;

public class UrlUtil {

    public static boolean isUrlWithId(String uri) {
        String lastSegment = getLastSegment(uri);
        try {
            int bla = Integer.parseInt(lastSegment);
            return bla > 0;
        } catch (NumberFormatException err) {
            return false;
        }
    }

    private static String getLastSegment(String uri) {
        String[] uriDetails = uri.split("/");
        return uriDetails[uriDetails.length -1];
    }

    public static int getIdFromUrl(String uri) {
        if (!isUrlWithId(uri)) {
            return -1;
        }
        return Integer.parseInt(getLastSegment(uri));
    }
}
