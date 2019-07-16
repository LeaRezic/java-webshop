package src.com.webshop.Util;

import java.util.Random;

public class ReceiptNumberGenerator {

    public static String getRandomReceiptNumber() {
        // 498539171-9
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            sb.append(randomNum(10));
        }
        sb.append("-");
        sb.append(randomNum(10));
        return sb.toString();
    }

    private static int randomNum(int max) {
        return new Random().nextInt(max);
    }
}
