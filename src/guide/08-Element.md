# Navegación 

## Conceptos Básicos 

Denominamos navegación al hecho de ir de una página a otra dentro de una aplicación Web.
Dentro de esta sección analizaremos las consideraciones que se deben tener al resolver la
navegación de una aplicación y cómo implementar distintos escenarios de navegación con
el diseñador. 

## Ir a otra Página 

Para ir desde una página a otra, no se puede hacer directamente un Call. El modelo estándar
de navegación en Web presenta una libertad muy grande, y puede introducir problemas de
seguridad al utilizarlo en aplicaciones. El diseñador implementa un mecanismo de
navegación más adaptado a las necesidades de una aplicación y fortaleciendo el esquema
de seguridad. Por este motivo la navegación se debe hacer a través de subrutinas generadas
por el diseñador.

Por ejemplo, si estamos en un WebPanel y queremos ir al WebPanel NuevoWbp haciendo la
llamada con dos parámetros (Param1 y Param2), en lugar de:

    ** Call(HNuevoWbp, &Param1, &Param2) 

Tenemos que hacer:


``` genexus
&GP_Url = Link(HNuevoWbp, &Param1, &Param2)
Do 'GP: Ir con retorno a &GP_Url'
```

La subrutina “GP: Ir con retorno a &GP_Url” actúa como el Call, realizando la llamada a la
página asignada en la variable GP_Url. La subrutina anterior no se genera por defecto, y para
que el diseñador genere esta subrutina se debe asignar el valor returnable al atributo
generateCall (del elemento web-ui).

Existen dos tipos de llamadas:

* Con retorno: Al hacer una llamada con retorno se brinda la posibilidad de volver a la
página que hizo la llamada. Cuando se hace una llamada de este tipo el usuario
puede volver a la página anterior al presionar el botón “Anterior” (representado con
una flecha a la izquierda en el extremo superior izquierdo de la pantalla). Al hacer
una llamada de este tipo también podemos volver a la página anterior desde código
(utilizando el atributo generateReturn). Las llamadas con retorno se realizan
invocando a la subrutina “GP: Ir con retorno a &GP_Url”, para que el diseñador genere
esta subrutina se debe asignar el valor returnable o both al atributo generateCall
(dentro de web-ui).

* Sin retorno: Al hacer una llamada sin retorno, la página anterior se pierde y no se
puede volver a ella con el botón “Anterior”, ni desde código GeneXus. Este tipo de
llamadas se realizan invocando a la subrutina “GP: Ir sin retorno a &GP_Url”, para
generar esta subrutina se debe asignar el valor notReturnable o both al atributo
generateCall (dentro de web-ui). 

En la mayoría de los casos se deben utilizar llamadas con retorno, ya que, por lo general
vamos a necesitar volver a la página anterior. Por ejemplo, si tenemos un “trabajar con” con
la lista de países, y al presionar el botón “Agregar” navegamos a una nueva página para
definir los datos del país. Luego que terminamos de agregar un nuevo país vamos a desear
volver a la página anterior, por lo tanto, se debe hacer una llamada con retorno a la página
de ingreso de datos del país.

Únicamente utilizamos llamadas sin retorno cuando el usuario no debe volver a la página
anterior. Esto puede ocurrir si tenemos alguna operación que se realiza en varios pasos (es
decir, está dividida en varias páginas, y cada vez que completa una página pasa a la
siguiente), y no queremos que pueda volver atrás y modificar los datos de un página que ya
había completado. 

En resumen, para hacer una llamada a otra página:

* Hay que agregar el atributo generateCall al elemento web-ui. Si queremos hacer
llamadas con retorno le debemos asignar returnable, si queremos hacer llamadas sin
retorno le debemos asignar notReturnable y se necesitamos realizar ambos tipos de
llamadas le debemos asignar both.

* Al agregar el atributo anterior se generan la variable GP_Url y la/s subrutina/s para
hacer las llamadas ( “GP: Ir con retorno a &GP_Url” y/o “GP: Ir sin retorno a &GP_Url”)

* Finalmente para ir a otra página hay que utilizar la función Link con el nombre del
objeto y los parámetros. El resultado de esta función se debe asignar a la variable
GP_Url e invocar a una de las subrutinas anteriores.

## Ir a otra Página (Dinámicamente)

La función Link no se puede invocar pasándole una variable en lugar del nombre del
programa, ya que, por decisiones de diseño en GeneXus no funciona correctamente en estos
casos. Para poder realizar correctamente navegaciones dinámicas se debe invocar al
procedimiento FRVarLink luego de invocar a la función Link.

Por ejemplo, para ir con retorno al WebPanel de la variable NomProg con los parámetros
Param1 y Param2 se debe escribir el siguiente código:

``` genexus
&GP_Url = Link(&NomProg, &Param1, &Param2)
Call(PFRVarLink, &GP_Url)
Do 'GP: Ir con retorno a &GP_Url' 
```

Si el nombre del programa se obtiene de una tabla, es recomendable invocar a la función
Trim con el mismo (antes que la función Link) para quitarle los espacios sobrantes. Cuando
se hace una llamada dinámica el nombre del programa no puede contener espacios, y si se
obtiene de un atributo de tipo Character, GeneXus completa el valor con espacios adicionales
hasta el largo del atributo, por lo cual es necesario quitarlos antes con la función Trim.

En caso de invocar a la función Link con el nombre de un programa entre comillas (por
ejemplo Link(„HProg1‟)) se puede presentar un caso similar. Si el programa que está entre
comillas es parte de la Base de Conocimiento, GeneXus se comporta como si hubiéramos
hecho la invocación sin las comillas. En cambio, si el programa no esta en la Base de
Conocimiento la situación es similar a si hiciéramos el Link con una variable y asignáramos
a la variable un texto con el nombre del programa. Es decir, en este último caso también
tendríamos que invocar al procedimiento FRVarLink para corregir el resultado de la función
Link.

## Volver a la Página Anterior 

Si estamos posicionado en una página y queremos volver a la anterior, debemos invocar a la
subrutina “GP: Volver”, este mecanismo es análogo al comando Return de GeneXus. La
subrutina de volver no se genera por defecto, y para que el diseñador la genere se debe
asignar true al atributo generateReturn. 

Al volver a la página anterior con el botón “Anterior” (la flecha ubicada en la esquina superior
izquierda) la página queda exactamente en el estado que se había dejado. Sin embargo, al
volver utilizando la subrutina “GP: Volver” se puede indicar que se vuelvan a cargar los datos
de la página anterior, por ejemplo, para reflejar los cambios en una tabla. Supongamos que
tenemos una página Web con una lista de países, y apretamos el botón “Agregar” para definir
un nuevo país. Al apretar dicho botón se abriría una nueva página donde ingresamos los
datos del país, luego aceptamos el alta del país, y tendríamos que volver a la página anterior.
Sería deseable que al volver veamos el nuevo país en la lista de países, por lo tanto, en este
caso es necesario que al volver se actualicen los datos de la grilla de países.

Para controlar si al volver se vuelve a cargar una página utilizamos el atributo autoRefresh
de las operaciones. Este atributo sirve para indicar si al ejecutar una operación se actualizan
las grillas de la página. Existen básicamente dos escenarios: 

* La operación no navega a otra página: Este escenario abarca cuando por ejemplo
dentro de la operación invocamos un procedimiento para borrar un registro de una
tabla, y luego queremos que se actualice la grilla para reflejar los cambios.

* La operación navega a otra página: Este es el escenario que nos interesa aquí. Se
presenta cuando dentro de la operación escribimos código para ir a otra página (por
ejemplo, en el botón “Agregar” de la página para administrar los países navega a una
nueva página para ingresar los datos del país). En este escenario se debe asignar
true al atributo autoRefresh de la operación “Agregar” para que al volver a la página
luego de agregar el país, se carguen nuevamente todas las grillas y dependencias (es
decir, al volver se invocarán todas las subrutinas de carga para actualizar los datos
de la página) 

## Volver a la Página Anterior (Cambiando los Parámetros) 

Existe una variación del caso anterior que consiste en volver a la página anterior, pero
cambiando los valores de sus parámetros. Esto sirve, por ejemplo, para devolver a la página
anterior información que le permita determinar si se ejecutó la operación con éxito o no. Por
ejemplo, la página para agregar nuevos países podría volver a la página de mantenimiento
de países cambiando los parámetros para indicarle si se agregó realmente un país o no.

La forma de hacer esto es similar al mecanismo anterior. Se debe asignar true al atributo
generateReturn (dentro del elemento web-ui), e invocar a la subrutina “GP: Volver”. La única
diferencia es que antes de invocar a la subrutina se debe asignar a la variable “GP_NuevaUrl”
el resultado de invocar a la función Link del objeto con los nuevos parámetros.

Por ejemplo, para volver al WebPanel WbpAnt pasa

``` genexus
&GP_NuevaUrl = Link(HWbpAnt, &Var1, &Var2)
Do 'GP: Volver'
```

Al utilizar este mecanismo se debe tener en cuenta que si se vuelve a una página previa
cambiando los parámetros se vuelve a cargar completamente la página. Esto significa que  se vuelve a ejecutar el Start y si tenemos cargado algún valor en la interfaz se perderá. Si no
cambiamos los parámetros, es decir, si no asignamos ningún valor a GP_NuevaUrl se
mantienen los valores cargados en la interfaz, y no se vuelve a ejecutar el Start. 

## Abrir un Reporte 

El mecanismo que se debe utilizar para abrir un reporte es el método convencional que ofrece
GeneXus, simplemente se debe invocar al comando Call con el reporte.

Para poder invocar los reportes de esta forma tienen que estar definidos con salida PDF. A
continuación se listan los pasos que se deben seguir:

* Definir la regla: output_file(“test.pdf”, “pdf”); (el nombre del archivo se ignora porque
se generará en memoria, así que se puede poner cualquier nombre)

* Asignar el valor “Only To Screen” a la propiedad “Report output” • Declarar el objeto
como “main”.

* Asignar el valor “HTTP" a la propiedad “Call protocol”

En el siguiente ejemplo se muestra cómo hacer una invocación normal al reporte con nombre
“Reporte”:

``` genexus
Call(RReporte, &Cod) 
```
En caso de querer hacer una invocación dinámica también se hace de la forma habitual,
simplemente se tiene precaución de poner una “o” como prefijo del nombre, ya que el reporte
es “main”. A continuación se muestra un ejemplo:

``` genexus
&Reporte = "OReporte"
Call(&Reporte, &Cod) 
```
## Marcas de Navegación

Las marcas de navegación se crean para resolver escenarios en que necesitamos volver a
una página particular dentro de una secuencia de páginas. Por ejemplo, supongamos que
definimos una operación que se realiza en varios pasos, y por cada paso se abre una nueva
página, pero luego de terminar el último paso queremos volver a la primera página. En esta
situación se debe definir una marca de navegación en la primer página, y en el último paso
invocar a un comando para volver a la página que se marcó.

Las marcas de navegación se definen con el atributo navigationMark (dentro del elemento
web-ui). Una marca es simplemente un texto que permite identificar a la página, si queremos
volver a una página específica utilizamos su marca de generación para identificarla. 

<img :src="$withBase('/img/20.png')" class="center">

Por ejemplo, supongamos que tenemos una página desde la cual administramos los
empleados de una empresa. Dentro de esta página podemos agregar nuevos empleados, y
también, modificar o borrar uno existente. La página anterior será el WebPanel
WWEmpleados. Debido a que queremos registrar muchos datos de los empleados, hemos
dividido la información en tres páginas (que están definidas en los WebPanels EmpDatos1,
EmpDatos2 y EmpDatos3). Estas páginas se van mostrando una a una y cada vez que
llenamos una pasamos a la siguiente. Cuando terminamos de llenar la última página
debemos volver al WebPanel WWEmpleados.

Existen dos forma de implementar esta navegación y la elección del mecanismo a utilizar se
puede determinar contestando a la pregunta: ¿El usuario debería poder volver un paso
anterior luego que lo terminó? En caso que digamos que no nos interesa que pueda volver,
podemos hacer la navegación al siguiente paso haciendo un “ir sin retorno”. De esta forma,
cuando el usuario termine el último paso, podemos invocar a la subrutina para volver a la
página anterior, y como llamamos a los pasos intermedios sin retorno, volveremos al
WebPanel WWEmpleados.

Planteemos ahora la situación en que queremos darle la libertad al usuario de poder volver
a un paso anterior luego que lo terminó. La ventaja de este esquema es la mayor libertad que
le damos al usuario, en caso que se de cuenta que cometió un error puede volver a un paso
anterior para corregirlo en lugar de tener que empezar todo nuevamente. Con este esquema
ya no podemos utilizar el “ir sin retorno”, sino que para ir al siguiente paso deberemos utilizar
un “ir con retorno” para que el usuario pueda volver hacia atrás. Sin embargo, el problema
aquí es lograr volver a la página WWEmpleados luego que terminó el último paso. Para
resolver este problema utilizaremos las marcas de navegación.

En primer lugar debemos asociarle una marca de navegación al WebPanel WWEmpleados
que permita identificarlo. A modo de ejemplo, mostraremos como quedaría el elemento webui en este WebPanel (sólo se incluye la marca de navegación y el titulo)

``` xml
    <web-ui title="Empleados" navigationMark="WWEmpleados">
```

Luego, en el último paso (el WebPanel EmpDatos3) deberíamos invocar a una subrutina para
volver al WebPanel WWEmpleados. Para lograr esto debemos agregar el atributo
generateMarkedReturn con valor toConcreteMark en el elemento web-ui del WebPanel
EmpDatos3. Un esquema de la definición del elemento web-ui en el WebPanel EmpDatos3
sería:

``` xml
<web-ui title="Datos del empleado (3)" generateMarkedReturn="toConcreteMark"> 
```
Al asignar este atributo se genera la subrutina “GP: Volver a marca &GP_Marca” que nos
permite volver a una marca particular. Luego, dentro de la operación que confirma los datos del WebPanel EmpDatos3 debemos agregar el siguiente código para volver al WebPanel
WWEmpleados:

``` genexus
&GP_Marca = "WWEmpleados"
Do 'GP: Volver a marca &GP_Marca' 
```

En este caso se utilizó el nombre del objeto para la marca. Esta no es una restricción, pero
se recomienda utilizar el mismo nombre para facilitar la identificación de la marca. Sin
embargo, se definen dos conceptos separados (el de marca de navegación y el nombre del
objeto) para poder manejarlos de forma independiente y evitar descomponer la navegación
de la aplicación al cambiar el nombre de un objeto. Además, al tener dos conceptos distintos
se pueden tener dos objetos que definan la misma marca de navegación, por ejemplo,
podríamos tener otra versión del WebPanel WWEmpleados personalizado para un usuario en
particular, y al definir una marca de navegación con el mismo nombre podemos utilizar la
misma secuencia de WebPanels para agregar un nuevo empleado.

La lista completa de los valores del atributo generateMarkedReturn (dentro de web-ui) es la
siguiente:
* ToConcreteMark: Genera la subrutina “GP: Volver a marca &GP_Marca” que permite
volver a la marca que se asigne en la variable “GP_Marca”

* ToLastMark: Genera la subrutina “GP: Volver a última marca” que permite volver a la
última página que tenga una marca de navegación.

* Both: Genera ambas subrutinas.

* False: No genera ninguna subrutina de navegación a marca.

Adicionalmente en las subrutinas para volver a una página con marca se puede utilizar la
variable GP_NuevaUrl para volver a invocar a la página con otros parámetros. Se aplican las
mismas consideraciones que para la subrutina “GP: Volver”. Ver sección 8.5 Volver a la
página anterior (cambiando los parámetros) para más información.

## Llamadas Desde otra Aplicación

Por motivos de seguridad no se permite invocar directamente a los WebPanels desde otras
aplicaciones. Este control se realiza para garantizar que se siga el flujo de navegación que
definió el programador, sino, un usuario que conozca la URL asociada a un WebPanel podría
ejecutar directamente el WebPanel sin pasar por lo pasos previos que se definan (y así,
saltearse los controles de seguridad que hayamos definido en los programas). Por este
motivo, al navegar a una página se controla que se haya sido invocada dentro de un contexto
de ejecución valido (esto incluye el menú, y cualquier llamada que hagamos desde código).

En caso que necesitemos que un programa generado con la herramienta Descartes pueda
ser invocado desde otra aplicación debemos definirlo como punto de acceso. Esto se realiza
asignando el valor true al atributo accessPoint (del elemento web-ui). Cuando un WebPanel
está definido como punto de acceso no se controla que haya sido invocado dentro de la
aplicación, y se puede invocar desde otra aplicación. 

