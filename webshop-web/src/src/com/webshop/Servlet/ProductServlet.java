package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Product.ProductBasicVM;
import src.com.webshop.Model.Product.ProductDetailedVM;
import src.com.webshop.Model.Product.ProductManager;
import src.com.webshop.Util.JsonUtil;
import src.com.webshop.Util.UrlUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(name = "ProductServlet")
public class ProductServlet extends BaseServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        super.setAccessControlHeaders(response);
        String uri = request.getRequestURI();
        if (UrlUtil.isUrlWithId(uri)) {
            sendProductDetails(response, UrlUtil.getIdFromUrl(uri));
        } else {
            sendAllProducts(response);
        }
    }

    private void sendAllProducts(HttpServletResponse response) throws IOException {
        ArrayList<ProductBasicVM> products = (ArrayList<ProductBasicVM>) ProductManager.getAllProducts();
        JsonObject jsonObject = JsonUtil.getJsonArray(products, "products");
        super.printJsonResponse(response, jsonObject);
    }

    private void sendProductDetails(HttpServletResponse response, int idFromUrl) throws IOException {
        ProductDetailedVM product = ProductManager.getProduct(idFromUrl);
        JsonObject jsonObject = JsonUtil.getJson(product, "product");
        super.printJsonResponse(response, jsonObject);
    }

}
