<h1 align="center">Parcial Primer Tercio CVDS: ElEstanco</h1>

<h2 align="center">Contexto</h2>

<p>"El Estanco de la Noche" es un sistema de ventas estilo Rappi, simplificado. Su enfoque es la venta de licores. 
Su sistema consta de una aplicación Android nativa, una página web con un sistema de administración integrado, junto con 
una api montada sobre la misma página web. El funcionamiento del sistema va así: </p>

<ol>
    <li>La aplicación android hace peticiones a la api tipo REST para funcionar</li>
    <li>El sistema web hace peticiones igualmente a la api que tiene montada por medio de CURL</li>
    <li>La app está desarrollada en Java y el sistema web en PHP</li>
</ol>

<h2 align="center">Empezamos con las malas prácticas...</h2>

<p>El primer problema del sistema es que nunca estuvo en Github. Lo cual va en contra de la lógica de control de versiones. Por lo tanto el primer trabajo que se hace es montar el sistema en Github con propósito del parcial</p>
