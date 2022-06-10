#  Reporte de Errores/Advertencias 
## Conceptos Básicos

El mecanismo de reporte de errores/advertencias permite mostrarle mensajes al usuario
para informarle de uno o más errores ocurridos, o darle advertencias de las consecuencias
de una operación (por ejemplo, el saldo de una cuenta quedó negativo).

Al trabajar en ambiente Web, únicamente se puede reportar los errores/advertencias dentro
de los WebPanel. Esto es contrario a otras arquitecturas, en donde podíamos reportar errores
dentro de los procedimientos. Por lo tanto, al escribir cómo implementamos una operación
también debemos escribir en el WebPanel código para reportar errores cuando el usuario
escribió algún dato mal, o cuando ocurre un error durante la ejecución de la operación, y no
podemos hacerlo desde los procedimientos.

Cuando necesitamos hacer una modificación en la base de datos debemos hacer una
llamada a un procedimiento. Al ejecutar este procedimiento se podría producir algún error,
por ejemplo, porque no se encontró un dato en la base de datos. A pesar que el error se haya
detectado durante la ejecución del procedimiento, debemos reportarlo en el WebPanel que
invocó al procedimiento. Para lograr esto lo que podemos hacer es agregar un parámetro en
el procedimiento que indique si ocurrió un error o no, y además el mensaje de error. Por ejemplo, podemos agregar un parámetro que se llame ErrMsg, en el cual se cargara el
mensaje de error si ocurre un error, y se dejará vacío si no ocurre un error. Luego, en el
WebPanel que invoca al procedimiento debemos consultar el valor que se devolvió en este
parámetro, y si no está vacío reportar el error.

Para reportar errores y advertencias se debe asignar el valor true al atributo
generateMsgReport (dentro del elemento web-ui). Luego, al generar la definición se crea la
subrutina “GP: Reportar mensaje”, con la cual podremos reportar errores y advertencias de
la siguiente forma:

``` genexus
&GP_Mensaje = Udp(PFRRepMsg, "Mensaje de error", "E")
Do 'GP: Reportar mensaje' 
```
Antes de invocar a la subrutina “GP: Reportar mensaje” se debe cargar en la variable
GP_Mensaje el texto del mensaje, y el tipo (“E” error y “W” advertencia). Para cargar la
variable GP_Mensaje se debe utilizar el procedimiento FRRepMsg como se muestra en el
ejemplo. El procedimiento recibe primero el texto del mensaje, luego el tipo y devuelve el
valor que se le debe asignar a la variable GP_Mensaje.

<img :src="$withBase('/img/21.png')" class="center">

El mecanismo de reporte de mensajes brinda la capacidad de reportar múltiples mensajes.
Es decir, en caso de tener la necesidad de reportar mas de un error, se puede invocar varias
veces a la subrutina “GP: Reportar mensaje” con los distintos mensajes. 

## Reporte de Mensajes En El Init 

Si se asigna el valor true al atributo generateInit (del elemento web-ui) se genera la subrutina
Init, la cual se invoca siempre antes de realizar una operación sobre la página. Un posible
uso de esta subrutina es para hacer validaciones que queremos que se realicen siempre
antes de hacer cualquier operación. Si se detecta un error, se lo puede reportar utilizando el
mecanismo de reporte de mensajes. Al reportar un error desde la subrutina Init, se
desplegará el error y no se ejecutará la operación. También podemos reportar advertencias
dentro de la subrutina Init, al reportar este tipo de mensajes se generará automáticamente
un pedido de confirmación antes de realizar la operación solicitada. 

## Identificadores de Mensajes 

Además del esquema anterior para reportar mensajes hay definido un esquema basado en
identificadores. A continuación se define cómo funciona este modelo. Dentro de la definición
del objeto se incluye un elemento llamado messages, donde se listan todos los mensajes
que se pueden reportar y se les asocia un código. Luego, para reportar un mensaje, en lugar
de indicar el texto del mensaje indicamos su código. De esta forma, no queda el texto
directamente en el código y podría ser más fácil hacer una aplicación para múltiples idiomas.

Este mecanismo, si bien está soportado, se está considerando eliminarlo, ya que hoy día se
disponen de otras herramientas para hacer aplicaciones para múltiples idiomas. Por lo tanto,
se recomienda reportar mensajes sin utilizar identificadores, sin embargo, se muestra un
ejemplo aquí para poder entender el funcionamiento de los identificadores, en caso de
encontrar un objeto que fue desarrollado utilizando este esquema. Primero mostraremos la
sección de definiciones de mensajes: 

``` xml
<messages>
    <message code="PaisNoExiste" text="El país {1} no existe." lang="sp" />
    <message code="PaisNoExiste" text="Country {1} does not exist." lang="en" />
</messages> 
```

En el ejemplo, dentro del elemento messages se definió un mensaje para indicar que un país
no existe en español y luego se definió el mismo mensaje en ingles. Aquí se puede observar
que ambos mensajes están definidos con el mismo código, pero en distintos lenguajes.
Dentro de los mensajes también se pueden incluir parámetros entre llaves (“{“ y “}”), en el
ejemplo anterior el código del país aparece como un parámetro del mensaje. Ahora veremos
el código necesario para reportar este mensaje e indicar el nombre del país: 

``` genexus
    // Reporta el mensaje "PaisNoExiste" con el código de país de la
    variable &PaiCod
    &GP_Mensaje = Udp(PFRBldMsg1, "PaisNoExiste",
    &PaiCod, "E") Do 'GP: Reportar mensaje' 
```
