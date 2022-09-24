package co.app.mercaditodesofi.controller;

import android.util.JsonWriter;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import co.app.mercaditodesofi.model.Order;
import co.app.mercaditodesofi.model.Product;

public class OrderController {


    public static void addOrder(Order order) {

        try {

            ArrayList<Product> products = CartController.getProducts();
            ArrayList<Integer> cantidades = CartController.getCantidades();

            StringWriter str_writed = new StringWriter();

            JsonWriter writer = new JsonWriter(str_writed);

            writer.beginArray();

            for(int i = 0; i < products.size(); i++) {
                Product product = products.get(i);
                writer.beginArray();
                writer.value(product.getId());
                writer.value(cantidades.get(i) / product.getPrice());
                writer.endArray();
            }

            writer.endArray();

            writer.flush();

            HashMap<String, String> params = new HashMap<>();
            params.put("id_usuario", String.valueOf(order.getIdUsuario()));
            params.put("direccion", order.getDireccion());
            params.put("forma_pago", order.getFormaPago);
            params.put("productos", str_writed.toString());

            RequestController.makeRequest(AppConstants.REQUEST_SERVER + "add_pedidos.php", "GET", params);
        } catch(Exception ex) {
            MessageController.showError(ex.toString());
        }

    }
}
