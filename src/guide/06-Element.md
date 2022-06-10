# Datos Ocultos 

El modelo Web presenta una arquitectura sin estado. Este modelo brinda un esquema
orientado a mensajes, donde hay un cliente que envía mensajes a un servidor cada vez que
necesita efectuar alguna acción, el servidor los procesa y le envía otro mensaje al cliente
como respuesta a su solicitud. Es decir, cada vez que se presiona un botón en una página
Web se genera un mensaje (con los datos de la página), el cual se envía al servidor, el servidor
ejecuta un programa y le manda una respuesta al cliente que puede ser una nueva página
Web o la misma que teníamos antes pero con algunos datos actualizados

<img :src="$withBase('/img/18.png')" class="center">

En el momento que el servidor le envía la respuesta al cliente se cierra la conexión y se
pierden los valores de todas las variables en el servidor, por lo tanto, cada vez que el cliente
le haga un nuevo pedido le debe volver a mandar los valores de todas las variables. Por este
motivo, es que se dice que la arquitectura no tiene estado. El modelo sin estado ayuda a
hacer aplicaciones más escalables y tolerantes a fallos, sin embargo, como programadores
debemos preocuparnos de almacenar en el cliente los valores de las variables que no
queremos perder.

La pérdida de valores en las variables se puede dar cuando cargamos variables (que no están
en el formulario de la página) dentro de la subrutina Start y necesitamos accederlas desde
una subrutina asociada a alguna operación. La subrutina Start y la subrutina asociada a la operación se invocan en pedidos distintos al servidor, por lo tanto, los valores asignados en
el Start que no se almacenen en el cliente se perderán. También se presenta el mismo
problema si asignamos el valor de una variable dentro de una operación, y luego queremos
accederla desde otra operación. Recordemos que cada vez que invocamos una operación se
envía un nuevo pedido al servidor, por lo tanto, si al ejecutar la operación en el servidor
asignamos un valor a una variable y no la almacenamos en la respuesta, su valor se pierde.


Un mecanismo para mantener los valores de las variables es utilizar datos ocultos.
Básicamente los datos ocultos son campos de la página Web que no son visibles para el
usuario, sin embargo, se mantienen del lado del cliente y sus valores se mandan al servidor
en cada pedido.

Cuando el servidor recibe un pedido (por ejemplo, porque se presionó un botón) intenta
recuperar los valores de todas las variables en función de lo que le llega en el pedido. A partir
del pedido, el servidor carga todas las variables que se encuentren visibles en la página Web,
los parámetros y también recupera los valores que están como datos ocultos.

Los datos ocultos se definen en el elemento hidden-data dentro del elemento form. A
continuación mostramos un ejemplo que define la variable Mode como dato oculto:

``` xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
    <web-ui title="Titulo" class="other">
        <form>
        ...
        </form>
        <hidden-data>
        <data name="&amp;Mode" />
        </hidden-data>
    </web-ui>
</object-definition>

```

Como se observa en el ejemplo anterior los datos ocultos se definen con el elemento data.
El único atributo de este elemento es name, en el cual debe ir el nombre de una variable. El
concepto de datos ocultos es similar al de columnas ocultas dentro de las grillas, sin
embargo, en los datos ocultos se almacena un único valor y en las columnas ocultas se
almacena un valor por cada fila.


En resumen, una variable hay que definirla como dato oculto cuando: 


La variable no está asociada a un elemento de la página Web (por ejemplo, un campo
o una grilla), ni está definida en la regla Parm. Si la variable está asociada a un
elemento de la página Web no es necesario definirla como dato oculto, incluso
aunque el elemento tenga definido una condición de visibilidad que podría ocultarlo
en algún momento

* Además de la condición anterior, la variable debe cumplir al menos una de las
siguientes condiciones para que sea necesario declararla como oculta:

* Se le asigna un valor en una subrutina, y luego se consulta su valor en otra subrutina
que se invoca en un pedido distinto al servidor. Un caso típico de esta situación es:
inicializamos una variable en el Start y necesitamos utilizarla en una subrutina asociada a una operación. Otro caso típico es: cambiamos el valor de la variable en
una operación y necesitamos leer su valor en otra operación. En estos dos casos las
subrutinas mencionadas se invocan como consecuencia de pedidos distintos al
servidor, por lo tanto, si no almacenamos el valor de la variable como dato oculto, su
valor se pierde.

* Está referenciada en la lista de parámetros de un prompt y no está asociada a ningún
elemento visual de la página (como por ejemplo, un elemento field). Este caso se
puede dar si, por ejemplo, en un prompt queremos mostrar únicamente las facturas
de un cliente y le pasamos por parámetro la variable CliCod (con el código de cliente)
para filtrar los datos. Aquí también es necesario declarar la variable CliCod como dato
oculto si no aparece en otro elemento de la página. Por la forma en que se genera el
código para el caso particular de prompts, es obligatorio que todas las variables que
participan en los parámetros sean parte de la página Web (ya sea como dato oculto
o como un elemento del formulario), no alcanza con que estén declaradas en la regla
Parm.

* Forma parte de expresiones dentro del formulario (por ejemplo, se utiliza en una
condición de visibilidad sobre un campo).


