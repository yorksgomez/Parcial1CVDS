package co.app.mercaditodesofi.model;

public class Order {

    private int id_usuario; 
    private String direccion; 
    private String forma_pago

    public Order(int id_usuario, String direccion, String forma_pago) {
        this.id_usuario = id_usuario;
        this.direccion=direccion;
        this.forma_pago = forma_pago;
    }

    private int getIdUsuario() {
        return id_usuario
    }

    private String getDireccion() {
        return direccion;
    }
    
    private String getFormaPago() {
        return forma_pago;
    }  

}
