package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Category.CategoryManager;
import src.com.webshop.Model.Category.CategoryVM;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(name = "CategoryServlet")
public class CategoryServlet extends BaseServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        super.setAccessControlHeaders(response);
        ArrayList<CategoryVM> categories = (ArrayList<CategoryVM>) CategoryManager.getAllCategories();
        JsonObject jsonObject = JsonUtil.getJsonArray(categories, "categories");
        super.printJsonResponse(response, jsonObject);
    }
}
