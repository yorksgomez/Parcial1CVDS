<h1 align="center">Parcial Primer Tercio CVDS: ElEstanco</h1>

<h2 align="center">Contexto</h2>

<p>"El Estanco de la Noche" es un sistema de ventas estilo Rappi, simplificado. Su enfoque es la venta de licores. 
Su sistema consta de una aplicación Android nativa, una página web con un sistema de administración integrado, junto con 
una api montada sobre la misma página web. El funcionamiento del sistema va así: </p>

<ol>
    <li>La aplicación android hace peticiones a la api tipo REST para funcionar</li>
    <li>El sistema web hace peticiones igualmente a la api que tiene montada por medio de CURL</li>
    <li>La app está desarrollada en Java y el sistema web en PHP</li>
    <li>La app funciona con POO, mientras que el sistema web es más bien funcional (Tampoco, sólo está más cerca)</li>
</ol>

<h2 align="center">Empezamos con las malas prácticas...</h2>

<p>El primer problema del sistema es que nunca estuvo en Github. Lo cual va en contra de la lógica de control de versiones. Por lo tanto el primer trabajo que se hace es montar el sistema en Github con propósito del parcial</p>

![image](https://user-images.githubusercontent.com/23731047/192082668-a1ba6418-494d-4630-b4c4-05e4c6bddec9.png)

<h2 align="center">MVC</h2>

<p>La aplicación android cuenta con una estructura Modelo Vista Controlador. Sin embargo, se comete el error de no agregar todas las clases necesarias al Modelo, por lo que se terminan usando campos (variables) para definir las funciones.</p>

Ejemplo: Clase OrderController, método addOrder, se crea una orden dentro del sistema

![image](https://user-images.githubusercontent.com/23731047/192083203-36dff2fe-48cc-4159-ba1d-c768612be541.png)

Podemos ver que sólo hay dos modelos creados

![image](https://user-images.githubusercontent.com/23731047/192083223-38d96ea6-8157-49d2-bd54-38a5a5fb4cdf.png)

<b>Solución:</b> adicionar los modelos necesarios

Como por ejemplo, con Order

![image](https://user-images.githubusercontent.com/23731047/192083588-bb52d919-6cd9-4875-890d-7a04e9413ab8.png)

<h2 align="center">Patterns</h2>

<b>Usado: </b> Inconscientemente, se usa el Patrón <b>Facade</b>, por el cual se simplifica con la creación del método MakeRequest todo el uso de la librería Apache Http (aunque de paso es alto singleton). 

![image](https://user-images.githubusercontent.com/23731047/192084543-c4b1ecf1-4f5d-4fdf-99fa-681791703a69.png)

<b>Propuesto: </b> Se recomendaría el uso del patrón <b>Iterator</b>. Actualmente en el sistema se usa una función (copiada en cada clase) llamada JSONDecoder para convertir las respuestas JSON en algo comprensible para la App, para generar una capa de abstracción y disminuir el acoplamiento de estas clases se podría convertir cada respuesta en un JSONIterable

Sin iterable:

![image](https://user-images.githubusercontent.com/23731047/192085351-3f857529-342a-4e78-a0aa-a797b30d55bf.png)

![Brush-#2](https://user-images.githubusercontent.com/23731047/192085286-a1b8a70e-510e-4561-a285-51bebc6b0fd7.png)

<h2 align="center">SOLID</h2>

<b>Cumple: </b> En general, los controladores de la aplicación cumplen la S de solid, debido a que por ejemplo, MakeRequest, cumple un sólo trabajo, que es crear request hacia la api indicada. Retomando la imagen del MakeRequest

![image](https://user-images.githubusercontent.com/23731047/192084543-c4b1ecf1-4f5d-4fdf-99fa-681791703a69.png)

<b>Propuesto: </b> Dependency Inversion Principle, el sistema usa el SHA256 para encriptar contraseñas. Actualmente SHA256 es de los métodos preferidos por los desarrolladores. Mientras que MD5 está lentamente dejando de usarse por la superioridad de SHA256. Sin embargo, así como en algún momento MD5 fue por mucho el método de encriptación más popular, ¿Qué pasará con el funcionamiento de nuestro sistema? ¿Sobreescribiremos la misma función manteniéndole el nombre, pero no la lógica? Eso no es muy coherente ni sostenible, el sistema no deberia ser dependiente de un sistema de encriptación específico.

![image](https://user-images.githubusercontent.com/23731047/192087330-9f9814cc-6bcb-446d-8fa2-02f3351d9930.png)

Solución propuesta:

![image](https://user-images.githubusercontent.com/23731047/192087578-7b1f27af-2239-461f-8875-c6a2df6d81c6.png)

<h2 align="center">Sobre Frameworks y el desarrollo</h2>

<p>En el sistema visto. Perfectamente se podría haber hecho un desarrollo con Laravel y podría estar la api sobre el sistema web sin necesidad de repetir tanto el código ni de tener dar tantas vueltas a la hora de hacer peticiones desde la web</p>

![image](https://user-images.githubusercontent.com/23731047/192087718-31a31830-287b-4db7-9a48-83dde8978a79.png)

![image](https://user-images.githubusercontent.com/23731047/192087739-a9b3221b-9cf0-4346-8dd2-2280c06cb164.png)

![image](https://user-images.githubusercontent.com/23731047/192086329-9eb24a19-a538-47e4-a31e-565c903270ce.png)

<h2 align="center">Testing</h2>

![Brush-#3](https://user-images.githubusercontent.com/23731047/192087951-d2d87a5f-afaa-41ae-9c87-cee13140a4fb.png)

Si, efectivamente, ninguno de los dos sistemas tiene un sólo test, es un lindo "desarrollo en caliente". De hecho muchas veces llegué a editar el sistema en producción directamente, dos prácticas horribles que van en contra del Pipeline y del TDD. Por lo tanto lo único que podemos hacer es proponer pruebas cumpliendo la estructura AAA y los principios FIRST.

![image](https://user-images.githubusercontent.com/23731047/192088593-44863cbc-e7b1-4893-ad91-6cdeb99c1c79.png)

<h1>Muchas gracias por ver esta desgracia de proyecto 👍 </h1>
