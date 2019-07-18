package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Shop.ShopDataManager;
import src.com.webshop.Model.Shop.ShopDataVM;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ShopDataServlet")
public class ShopDataServlet extends BaseServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        super.setAccessControlHeaders(response);
        ShopDataVM shopData = ShopDataManager.getShopData();
        JsonObject jsonObject = JsonUtil.getJson(shopData, "shop");
        super.printJsonResponse(response, jsonObject);
    }
}
