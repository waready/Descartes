# Anexo A -Criterios de diseño 

## Introducción 

Dentro de este anexo se incluyen una serie de guías que pretenden unificar criterios durante
el proceso de desarrollo de una aplicación. Los criterios se presentan como una serie de
respuestas a preguntas que pueden surgirnos al estar diseñando una aplicación. 

## ¿Incluir una operación para “Cancelar”?

La operación de “Cancelar” sólo se debería definir en compañía de una o más operaciones
de confirmación. Por ejemplo, dentro de una página para agregar un país en el sistema
típicamente tendremos una operación para confirmar la creación del país y otra para cancelar
la creación.

En el ejemplo anterior el usuario podría cancelar la operación simplemente volviendo a la
página anterior con el botón de Volver (la flecha a la izquierda ubicada en la parte superior
izquierda de la ventana). Sin embargo, resulta más claro brindarle una operación de cancelar
para darle la confianza que no se va a agregar un nuevo país. Aunque, por lo general, la
operación de cancelar simplemente volverá a la página anterior. 

## ¿Incluir una operación para “Refrescar” o “Cerrar”? 

Al crear aplicaciones en ambiente Windows es común incluir en las ventanas una operación
para “refrescar” el contenido de las grillas, y otra para cerrar la ventana actual y volver a la
anterior. Dentro de aplicaciones en ambiente Web estas operaciones no son necesarias, ya
que en la barra superior se brinda un botón genérico para refrescar el contenido de la página
actual, y el equivalente al botón 

“Cerrar” sería el botón “Volver”. Por lo tanto, no se deberían crear las operaciones “Refrescar”
y “Cerrar” y así estimular que los usuarios usen los mecanismos de navegación estándares
definidos para aplicaciones Web.

Por ejemplo, supongamos que tenemos una página de consultas, en donde se pueden ver
los clientes y para cada cliente los productos que compró. Si el usuario está consultando los
productos de un cliente, no se debe brindar una operación “Cerrar” para volver a la página
anterior, sino que, el usuario debería presionar el botón Volver de la barra superior. 

<img :src="$withBase('/img/23.png')" class="center">

## ¿Devolver el nombre en el prompt de una dependencia?

El caso que se menciona aquí es el siguiente: supongamos que tenemos una dependencia
para representar una relación del tipo código-nombre, y le asociamos un prompt donde el
usuario puede seleccionar un elemento. La pregunta sería: ¿al seleccionar el elemento se le
debería cargar el código y el nombre, o sólo el código?. La respuesta sería sólo el código.

El motivo de esta decisión es para evitar inconsistencias en el ingreso de datos, ya que, si el
usuario escribe el código manualmente no ve el nombre hasta que presione una operación.
Al no traer el nombre junto con el prompt se reproducirá el mismo comportamiento, es decir,
no se pone el nombre a la derecha de la dependencia hasta que se presiona una operación. 

## ¿Categorías o subcategorías? 

Cuando estamos diseñando páginas en donde queremos mostrar muchos datos es
recomendable utilizar categorías para realizar agrupaciones y facilitar su legibilidad. El
diseñador brinda dos conceptos para realizar agrupaciones, uno es el de categorías y otro es
el de subcategorías. Una página se puede dividir en categorías, y cada categoría a su vez se
puede dividir en subcategorías. La existencia de estos dos conceptos brinda más flexibilidad
a la hora de tener que definir cómo vamos a presentarle los datos al usuario, sin embargo,
esta flexibilidad también provoca que puedan existir varias soluciones posibles para el mismo
problema. Por ejemplo, un mismo grupo de datos lo podríamos agrupar en dos categorías, o
en una categoría y dos subcategorías; y la pregunta que surge aquí es ¿qué opción debemos
utilizar?

Un criterio para determinar si utilizamos categorías o subcategorías puede ser el siguiente.
En primer lugar definimos categorías para agrupar grupos de datos que tratan un mismo
concepto, por ejemplo, podemos utilizar una categoría para representar los datos generales de una persona, otra para sus direcciones, y otra para sus teléfonos. Si luego de separar la
página en categorías encontramos nuevos grupos de datos que están fuertemente
relacionados entre sí, pero que no justifican nuevas categorías porque no son muchos datos
o están vinculados con la categoría, deberíamos definir subcategorías. Por ejemplo, si dentro
de la categoría de datos generales tenemos varios datos de su ocupación, como la profesión
y la experiencia, podemos agrupar estos dos datos en una subcategoría. Sin embargo,
siempre que sea posible debemos utilizar categorías en lugar de subcategorías, es decir, no
debería existir una página con una categoría y dos subcategorías, en su lugar deberíamos
definir la página con varias categorías y ninguna subcategoría.

