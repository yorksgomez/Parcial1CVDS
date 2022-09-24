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



