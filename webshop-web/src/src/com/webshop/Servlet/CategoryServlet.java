package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Shop.Category.CategoryManager;
import src.com.webshop.Model.Shop.Category.CategoryVM;
import src.com.webshop.Util.JsonResponseWriter;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(name = "CategoryServlet")
public class CategoryServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ArrayList<CategoryVM> categories = (ArrayList<CategoryVM>) CategoryManager.getInstance().getAllCategories();
        JsonObject jsonObject = JsonUtil.getJsonArray(categories, "categories");
        JsonResponseWriter.printJsonResponse(response, jsonObject);
    }
}
