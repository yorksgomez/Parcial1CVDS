package co.app.mercaditodesofi;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() {
        assertEquals(4, 2 + 2);
    }

product.setId(reader.nextInt());
            product.setName(reader.nextString());
            product.setDescription(reader.nextString());
            product.setImgUrl(reader.nextString());
            product.setCategory(reader.nextString());
            product.setPrice(reader.nextInt());
            product.setSubcategory(reader.nextString());    

    @Test
    public void GivenProductInJson_ThenCreateProductArrayList() {
        //Arrage
        String json = "[{id:5,name:'p1',description:'desc',imgurl:'photos/img.jpg',category:'bebida',price:500,subcategory:'licor'},{id:5,name:'p1',description:'desc',imgurl:'photos/img.jpg',category:'bebida',price:500,subcategory:'licor'}]";
        Product expected1 = new Product("p1", "desc", "photos/img.jpg", "bebida", 500, "licor"),
                expected2 = new Product("p1", "desc", "photos/img.jpg", "bebida", 500, "licor"),;        


        //Action
        ArrayList<Product> products = ProductController.jsonToArray(json);

        //Assert
        assertEquals(products.get(0), expected1);
        assertEquals(products.get(0), expected1);
    }
    
}
