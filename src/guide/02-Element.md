# Elemento WEB-UI
[[toc]]
## Conceptos Básicos

Como se observó en el ejemplo inicial la interfaz se define dentro del elemento web-ui. Vamos a volver a presentar el mismo ejemplo para recordarlo:

```xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
    <web-ui title="Persona" class="other">
    <form>
        <field caption="Nombre" data="&amp;PerNom" readOnly="false" allowNull="false" />
        <line-break />
        <field caption="Apellido" data="&amp;PerApe" readOnly="false" allowNull="false" />
        <line-break />
        <value-list caption="Sexo" data="&amp;PerSex" readOnly="false">
            <items>
                <item text="Femenino" value="M" /> 
                <item text="Masculino" value="F" />
            </items>
        </value-list>
    </form>
    <operations>
        <operation caption="Confirmar" validateData="true" />
        <operation caption="Cancelar" validateData="false" />
    </operations>
    </web-ui>
</object-definition>
```

Aquí se puede ver que todos los componentes de la página Web están contenidos dentro del
elemento web-ui. Este es el elemento principal y en toda página Web se debe escribir este
elemento. Dentro del elemento web-ui se definen las propiedades básicas del formulario,
como por ejemplo, su título.

El elemento web-ui también nos permite indicarle al diseñador que genere variables y/o
subrutinas adicionales que implementen alguna necesidad concreta que tengamos, como
por ejemplo, reportar mensajes de error. Los atributos que se utilizan para estos fines tienen
el prefijo generate, por ejemplo, si asignamos el valor true al atributo generateMsgReport se
creará una subrutina que nos permite reportar mensajes de error al usuario (aunque esto lo
veremos más adelante en la sección 9.0 Reporte de errores/advertencias).

Al comenzar a definir una página Web se debe definir el elemento web-ui (debajo del
elemento objectdefinition) con los atributos title y class. El atributo title debe contener el título
de la página. Este título se mostrará en la parte superior al ejecutar la interfaz. Además del
título, se debe indicar la clase en el atributo class. Este atributo permite darle información

adicional al generador de cuál será el uso de la interfaz. Por el momento sólo se soportan
dos valores aquí:

::: tip *
Prompt: Se utiliza cuando la página Web se va a utilizar como lista de selección. Por
ejemplo, si se tiene un campo donde se pide un código de un país, se podría asociar
una página de tipo prompt que permita desplegar la lista de países. En este caso, la
página se debería mostrar por encima de la anterior y por eso debe tener asociada la
clase prompt.
:::

::: tip *
Other: Representa una clase genérica que se debe utilizar para todas aquellas
páginas Web que no son prompt.
:::

Ejemplo básico de definición de un prompt (en la sección 5.5 Grillas en prompts se puede
encontrar la definición completa):

``` xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI"> 
 <web-ui title="Selección de Países" class="prompt"> 
 (... aquí iría la definición de campos de la página Web ...) 
 </web-ui> 
</object-definition> 

```
<img :src="$withBase('/img/02.png')" class="center">

##  Servicios Expuestos por el Diseñador

El diseñador además de generar el diseño gráfico de la página Web también se encarga de 
implementar parte de la lógica de la interfaz. Al crear interfaces Web se puede observar que 
hay mucho código que se repite, por ejemplo, para paginar una lista de datos, o para reportar 
errores. 

Durante la construcción de este diseñador se hizo un análisis para intentar identificar 
segmentos comunes de código para que los pueda resolver automáticamente el diseñador. 
Lo que se buscó fue que la creación de interfaces esté enfocada en la lógica de negocio 
asociada a la interfaz, y descargar el proceso de desarrollo de actividades que no aportan 
valor como escribir código repetitivo. 

En el proceso de creación del diseñador también se buscó simplificar los problemas comunes 
que se deben enfrentar al desarrollar páginas Web. Para esto, el generador expone una serie 
de servicios que pueden ser utilizados para resolver situaciones como reportes de mensajes, 
esquemas de navegación complejos, entre otros. 

Estos servicios se exponen como subrutinas que escribe el diseñador para que las usemos. 
El diseñador no crea por defecto todas las subrutinas extra para evitar escribir código que no 
es necesario. Por lo tanto, es necesario indicarle explícitamente que subrutinas extras vamos
a utilizar. Varios elementos contienen una serie de atributos que tienen el prefijo generate 
que permiten indicarle al generador que incluya variables y/o subrutinas adicionales y así 
extender la funcionalidad generada. 

A continuación se detallan los servicios que expone el diseñador a través del elemento web 
ui.

## Init y Start

Comúnmente es necesario incluir código para definir los valores por defecto de los campos o el estado inicial de la página. Para escribir código de inicialización el diseñador expone dos mecanismos, la subrutina Init (se invoca al abrir la página y antes de cada operación) y la subrutina Start (se invoca únicamente al abrir la página). Al indicar true al atributo generateInit y/o generateStart, el diseñador genera la subrutina Init y Start respectivamente. Dentro de estas subrutinas debemos escribir el código que se debe ejecutar durante la inicialización y el diseñador se encarga de invocarlas en el instante adecuado.

La diferencia entre las dos subrutinas radica en el momento en que se invocan:

::: tip Init 
Esta subrutina se invoca al abrir la página y también cada vez que realizamos una operación sobre la misma. Es decir, aquí podemos poner código que necesitamos que se ejecute siempre antes de invocar un evento en el servidor. Esta subrutina no se usa muy frecuentemente, sin embargo, un uso típico es para cargar manualmente los valores de un ComboBox, ya que sino se pierden luego de apretar una operación
:::

::: tip Start 
La subrutina Start se invoca una única vez al abrir la página. En esta subrutina se puede incluir código para definir valores por defecto en los campos de la interfaz. A diferencia de la subrutina Init, esta subrutina no se invoca nuevamente cada vez que se presiona una operación. Por lo tanto, si se carga el valor inicial de un campo en la subrutina Start, no se volverá a redefinir su valor al ejecutar una operación (como pasaría si se definiera en la subrutina Init). En caso de que se genere tanto la subrutina Init como la subrutina Start, cuando se abre la página Web se invoca a la subrutina Start antes de invocar a la subrutina: Init.
:::

El mecanismo que propone el diseñador para escribir código de inicialización es a través de
estas dos subrutinas. En ningún momento se debe modificar el código del evento Start (de
GeneXus) o algún otro evento, debido a que es el diseñador el encargado de escribir el
contenido de los mismos, y si se modificasen, se perderían los cambios al volver a generar.
Por lo tanto, como regla general, nunca se debe modificar el código de un evento GeneXus,
sino que se debe trabajar con las subrutinas que genera el diseñador.

Cabe destacar que la subrutina Start del diseñador no se comporta de forma similar que el
evento Start que define GeneXus para los WebPanels. El evento de GeneXus se ejecuta cada
vez que se hace una operación, y los valores de las variables se cargan luego de ejecutar el
evento, por lo tanto, las variables están cargadas con el valor nulo al ejecutar al evento. Este
comportamiento no resulta muy intuitivo, y se ha observado que no es adecuado en muchas
situaciones. Para subsanar este problema se creó en el diseñador la subrutina Start que se
comporta de forma similar al Start de los WorkPanels; y también se agregó la subrutina Init
que si bien se llama cada vez que se hace una operación, no tiene la restricción de acceso a
las variables que tiene el evento Start de GeneXus. 

## Reporte de Mensajes de Error/Advertencias

A través del atributo generateMsgReport se puede indicar al diseñador que genere una
subrutina para reportar errores/advertencias. Al reportar errores con esta subrutina el
diseñador se encarga de desplegar los mensajes en la página siguiendo el estándar gráfico.

Cuando el atributo generateMsgReport tiene valor true el diseñador genera la subrutina “GP:
Reportar mensaje” y la variable GP_Mensaje. Para reportar un mensaje de error debemos
invocar al procedimiento FRRepMsg con el texto del mensaje, asignar el resultado a
GP_Mensaje e invocar a la subrutina “GP: Reportar mensaje”. En la sección 9.0 Reporte de
errores/advertencias se explica con más detalle este tema.

## Navegación

Otro de los servicios importantes brindados a través del elemento web-ui son los servicios de
navegación. La tecnología Web tiene una naturaleza muy flexible, debido a que fue concebida
para publicar información, y al estar buscando documentos es común que queramos volver
para atrás o ir a otro sitio. En cambio, en una aplicación tanta libertad puede atentar contra
su seguridad.

El diseñador brinda servicios que permiten definir las características de la navegación, por
ejemplo, definir si al ir de una página A a una B podemos luego volver libremente a la A desde
la B.

Los servicios de navegación son muy amplios, por lo que se dedicará más adelante una
sección exclusiva para tratar el tema. Aquí simplemente se quería hacer una pequeña reseña
a los mismos porque es otro de los servicios importantes que se generan a partir del elemento
web-ui. 

## Consideraciones al Utilizar un Prompt
Como mencionamos anteriormente los WebPanels pueden ser utilizados como prompts. Los
prompts por lo general son listas de selección que se muestran como una ventana por encima
de otro WebPanel. Por ejemplo, si necesitamos pedir en un campo el código de un cliente
podemos darle al usuario la posibilidad de apretar un botón y desplegar la lista de clientes,
el programa que muestra la lista de clientes es lo que denominamos prompt. En las
siguientes secciones seguiremos explorando este concepto, pero lo que debe quedar claro
aquí es su significado y su funcionamiento.

Al explorar los distintos elementos que podemos utilizar para definir la página veremos que
varios de ellos nos brindan la posibilidad de utilizar un elemento llamado prompt para
asociarle un WebPanel.

En el siguiente código se define un campo donde se pide el código de cliente y se le asocia
un prompt: 

```xml
<dependency caption="Cliente" determinants="&amp;CliCod" dependents="&amp;CliNom">
    <prompt object="HPmtClientes" params="&amp;PaiCod " />
</dependency> 

```
El elemento dependency define un campo para pedir el código del cliente, y luego a partir del
código permitirá visualizar el nombre (más adelante analizaremos con detalle este elemento).
Lo importante aquí es observar cómo se asocia el prompt. Dentro del elemento dependency
se define un elemento llamado prompt, que indica el objeto que actúa como prompt en el
atributo object y la lista de parámetros con que se invoca en el atributo params, en este caso,
se utiliza la variable PaiCod como parámetro, al cerrar el prompt se cargará en dicha variable
el código seleccionado (en la sección 5.5 Grillas en prompts se explicará cómo lograr devolver
la selección de una grilla en los parámetros del prompt). 
Al definir los parámetros se pueden utilizar únicamente variables que cumplan una de las
siguientes condiciones:

* Estén utilizadas en algún elemento visual de la página (por ejemplo, un campo de
ingreso de datos)

* Estén declaradas como datos ocultos (ver sección 6.0 Datos ocultos). Los datos
ocultos son variables que no están visibles al usuario pero se mantienen ocultas
dentro de la página para poder referenciarlas. 

## Personalización de Prompts 

Por defecto el tamaño de la ventana asociada al prompt es fijo y está calculado para mostrar
una grilla con datos, una línea con un filtro y el botón “Cerrar”. Sin embargo, para casos
particulares en que el tamaño por defecto pueda ser muy chico o muy grande se brindan una
serie de atributos adicionales en el elemento web-ui para controlar el tamaño de la ventana
del prompt.

A través del atributo promptWidth se controla el ancho, y con el atributo promptHeight se
controla la altura. Los valores que admiten estos atributos son small (pequeño), medium
(mediano) y large (grande). Los valores por defecto son medium en ambos casos. 

## Prompts para Ingreso de Datos

El uso más típico de los prompts es para mostrar una lista de elementos y seleccionar uno.
Cuando se necesita pedirle al usuario que ingrese un código, el uso de un prompt puede
permitirle al usuario desplegar la lista de códigos posibles y buscar uno en particular a partir
de algún criterio de búsqueda.

Sin embargo, los prompts también se pueden utilizar para asistir al usuario o para pedir datos
adicionales sin necesidad de tener que ir a otra página. Por ejemplo, en una página donde
registramos las ventas de un vendedor e indicamos su comisión, podemos utilizar un prompt
para desplegar una ventana donde el usuario pueda marcar las comisiones que se aplican y
calcular el total a partir de ellas. Lo primero que debemos hacer es asociarle el prompt al
campo donde se ingresa la comisión, esto se hace con el elemento prompt: 

```xml
<field caption="Comision" data="&amp;Com" >
    <prompt object="HPmtComision" params="&amp;Com" />
</field> 

```
Al definir el campo de esta forma se agrega un botón a su derecha, que al presionarlo abre
una nueva ventana con el WebPanel PmtComision. En este caso la variable Com sería un
parámetro de salida del prompt. En el WebPanel PmtComision se podrían mostrar una lista
de verificación con las comisiones que el usuario puede aplicar a una comisión base. Luego
de seleccionar las comisiones que se aplican, el usuario presionaría “Confirmar” y se
actualizaría el campo “Comisión” con el total resultante.

En este caso el prompt debe tener un botón para aceptar la operación y otro para cancelarla.
Para lograr esto se dispone del atributo promptAcceptCancel. Al asignar true a este atributo,
se genera en el objeto un botón de aceptar y otro de cancelar. Si se aprieta el botón de
aceptar se confirman lo campos y se mandan los valores de las variables de salida a la página
que llamó al prompt. En caso de presionar el botón cancelar no se mandan los valores de las
variables de salida.

<img :src="$withBase('/img/03.png')" class="center">

A continuación se muestra como podría ser la definición del prompt para calcular las
comisiones:

```xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
 <web-ui title="Comisiones" class="prompt" promptAcceptCancel="true"> 
    <form>
        <field caption="Base" data="&amp;ComBase" readOnly="false" rightText="%" />
        <line-break />
        <check-box caption="Producto bonificado" data="&amp;AplCom1" uncheckedValue="N" checkedValue="S" readOnly="false" />
        <line-break />
        <check-box caption="Cliente preferencial" data="&amp;AplCom2" uncheckedValue="N" checkedValue="S" readOnly="false" />
        <line-break />
        <check-box caption="Feriado" data="&amp;AplCom3" uncheckedValue="N" checkedValue="S" readOnly="false" />
        <line-break />
        <field caption="Total" data="&amp;Com" rightText="%" />
    </form>
    <operations>
        <operation caption="Calcular" />
    </operations>
 </web-ui>
</object-definition>

```

Adicionalmente se debe agregar la regla Parm para definir que el resultado se devuelve en la variable Com:

    * Parm(out:&Com); 

La ventaja de los prompts en estas situaciones es que permiten utilizar parámetros de salida
y además le permiten al usuario seguir visualizando, detrás del prompt, la página con que
está trabajando.

