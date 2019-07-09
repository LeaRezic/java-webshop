package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Product.ProductBasicVM;
import src.com.webshop.Model.Product.ProductManager;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(name = "ProductServlet")
public class ProductServlet extends BaseServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        super.setAccessControlHeaders(response);
        ArrayList<ProductBasicVM> products = (ArrayList<ProductBasicVM>) ProductManager.getAllProducts();
        JsonObject jsonObject = JsonUtil.getJsonArray(products, "products");
        super.printJsonResponse(response, jsonObject);
    }

}
