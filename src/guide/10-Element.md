#  Propiedades Dinámicas
## Conceptos Básicos
El modelo de propiedades dinámicas se utiliza para definir el valor de una propiedad en
función de una expresión. Por ejemplo, podemos asociar la expresión “&Mode = „I‟” para
indicar si un campo está habilitado, y el campo estará habilitado únicamente cuando la
variable Mode valga “I”. Si durante la ejecución de la página se asigna un valor distinto de “I”
a la variable, en cualquier lugar del código, el campo dejará de estar habilitado.

Este modelo lo que busca es abstraer el cambio de estado de la interfaz a la definición del
objeto. Es decir, marca una separación entre la definición de la interfaz y la escritura de lógica
de la interfaz. En lugar de escribir código para modificar si un campo está visible o no,
definimos una expresión para indicar cuando el campo está visible según el estado de la
página, y luego, en el código manejamos únicamente cambios de estados en las variables.

Para clarificar estos conceptos mostraremos un ejemplo de un WebPanel que se podría
utilizar para ingresar nuevos países o modificar países existentes. El WebPanel recibe una
variable llamada Mode que indica el modo en que se debe ejecutar la página. Si el modo es
“I” se ejecuta en modo de inserción y se debe pedir el código y el nombre. En caso que el
modo sea “U” se ejecuta en modo de modificación y se debe habilitar el campo del nombre
y deshabilitar el código. La página también se podría ejecutar en modo “V” para visualizar un país, y aquí se debe deshabilitar la edición en todos los campos. El código de la definición
para hacer esto sería el siguiente: 

``` xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
    <web-ui title="País" class="other">
        <form>
            <field caption="Código" data="&amp;PaiCod" allowNull="false">
                <enabled expression="&amp;Mode = 'I'"/>
            </field>
            <line-break />
            <field caption="Nombre" data="&amp;PaiNom" allowNull="false">
                <enabled expression="(&amp;Mode = 'I') Or (&amp;Mode = 'U')"/>
            </field>
        </form>
        <operations>
            <operation caption="Confirmar" validateData="true" />
            <operation caption="Cancelar" validateData="false" />
        </operations>
    </web-ui>
</object-definition> 
```

En la definición anterior se utiliza el elemento enabled en cada campo para indicar cuando
deben estar habilitados. Si en un momento dado la expresión indicada se evalúa como
verdadera, se habilita el campo, en caso contrario se deshabilita. Por lo tanto, aquí la interfaz
habilitará o deshabilitará sus campos en función de la variable Mode. Si en el código
cambiamos el valor de esta variable la interfaz se actualizará según su nuevo valor, por lo
tanto, en el código únicamente nos tendremos que preocupar de reflejar el estado actual en
la variable y no de qué campos debemos habilitar o deshabilitar en cada momento.

En relación a la forma convencional de modificar cuando un campo está habilitado (tener
una propiedad llamada Enabled por campo y modificar su valor desde el código), este
mecanismo ayuda a poder entender más fácilmente qué campos pueden deshabilitarse y
cuando se deshabilitan, al ver la definición del objeto. 

## Visibilidad y Habilitación de Campos

Para controlar cuando un campo está visible o habilitado se utiliza este esquema de
propiedades dinámicas. Dentro del elemento field podemos agregar el elemento visible o
enabled para determinar cuando el campo está visible y/o habilitado. En el siguiente ejemplo
se muestra una definición de estos elementos:

``` xml

<field caption="Código" data="&amp;PaiCod" allowNull="false">
 <enabled expression="&amp;Mode ='A'"/>
 <visible expression="(&amp;Mode ='A') Or (&amp;Mode ='B')"/>
</field> 
``` 
El elemento enabled y visible están disponibles también para otros componentes de la página
Web. A continuación se muestra una tabla que indica que elementos soportan el uso del
elemento enabled y visible:


<!-- <img :src="$withBase('/img/22.png')" class="center"> -->

<!-- | Elemento          | Enabled           | Visible   |
| ----------------  |:-----------------:| ---------:|
| text              | No soportado      | Soportado |
| field             | Soportado         | Soportado |
| check-box         | Soportado         | Soportado |
| value-list        | Soportado         | Soportado |
| dynamic-value-list| Soportado         | Soportado |
| dependency        | Soportado         | Soportado |
| grid              | No soportado      | Soportado |
| field-column      | Soportado         | Soportado |
| check-box-column  | Soportado         | Soportado |
| value-list-column | Soportado         | Soportado |
| dynamic-value-list-column        | Soportado         | Soportado |
| image-column      | No Soportado      | Soportado |
| prompt-column     | Soportado         | Soportado |
| operation         | Soportado         | Soportado |
| popup-operation   | Soportado         | Soportado |
| category          | No Soportado      | Soportado |
| sub-category      | No Soportado      | Soportado | -->

<OtherComponent/>

Para las columnas de las grillas también se brinda el elemento row-enabled, el cual permite
definir condiciones que se evalúan por cada fila. Al utilizar el elemento enabled en una
columna definimos si están habilitadas todas las celdas de la columna, en cambio, con el
elemento row-enabled podemos definir una condición que se evalúa por cada fila, y por lo
tanto, podríamos dejar el campo de la columna habilitado para algunas filas y para otras no.
Esto lo podríamos lograr incluyendo en la expresión del elemento row-enabled variables que
estén asociadas a otras columnas (visibles o ocultas) y en función de ellas determinar si está
habilitado un campo

Los tipos de columna que soportan el elemento row-enabled son: 

* field-column 
* check-box-column
* value-list-column
* dynamic-value-list-column

Para la columna prompt-column se brinda el elemento row-visible, que de la misma forma
permite determinar en que filas está visible el botón de prompt. 

## Destaque de Campos 

En la mayoría de los campos del formulario también se incluye el elemento highlighted. Este
elemento se comporta de la misma forma que visible y enabled. En caso que se cumpla la
expresión se pinta de rojo el campo para resaltarlo. No se recomienda abusar de este
elemento, sólo se recomienda su uso en casos particulares donde sea necesario resaltar un
campo para cumplir la funcionalidad requerida.

Los elementos donde se puede utilizar el elemento highlighted son: 

* text
* field
* check-box
* value-list
* dynamic-value-list
* dependency 

En las grillas se brinda un elemento análogo para lograr el mismo efecto en las filas de la
grilla. Por cada fila se evalúa la condición para determinar si hay que destacar la columna en
la fila. El elemento mencionado se llama row-highlighted y está disponible para los siguientes
tipos de columna: 

* field-column
* value-list-column
* dynamic-value-list-column 

## Títulos y Etiquetas Condicionales

El modelo de propiedades dinámicas también se utiliza para poder cambiar la etiqueta
asociada a un campo o el titulo de una categoría/subcategoría en tiempo de ejecución.

Dentro de los componentes del formulario se puede utilizar el elemento conditional-captions
para indicar todas las posibles etiquetas, y asociarles una expresión que determine que
etiqueta se debe mostrar en cada caso. 

En el siguiente ejemplo se muestra un campo que cambia su etiqueta según el valor de la
variable Mode: 

``` xml

<field caption="Cuenta" data="&amp;CtaNro">
    <conditional-captions>
        <caption text="Cuenta Origen" expression="&amp;Mode = 'O'" /> 
        <caption text="Cuenta Destino" expression="&amp;Mode = 'D'" />
    </conditional-captions>
</field> 
```
Cuando la variable Mode vale “O” la etiqueta del campo será “Cuenta Origen”, cuando vale
“D” será “Cuenta Destino”, y cuando no vale ninguno de estos valores se muestra “Cuenta”.
Las expresiones se van evaluando de arriba hacia abajo, y si no se cumple ninguna se deja
el texto que está en el atributo caption.

El elemento condicional-captions está soportado en:

* field
* check-box
* value-list
* dynamic-value-list
* dependency

Adicionalmente se encuentra el elemento conditional-titles que se utiliza de forma similar y
sirve para definir títulos condicionales en los elementos que tienen un titulo asociado. A
continuación se muestra un ejemplo de una columna definida con un titulo condicional: 

``` xml

<field-column title="Cuenta" data="&amp;CtaNro" >
    <conditional-titles>
    <title text="Cuenta Origen" expression="&amp;Mode = 'O'" /> <title text="Cuenta Destino" expression="&amp;Mode = 'D'" />
    </conditional-titles>
</field-column> 
```

Los elementos en donde se puede utilizar el elemento conditional-titles son: 
* web-ui
* field-column
* check-box-column
* value-list-column
* dynamic-value-list-column
* image-column
* category
* sub-category 

## Prompts Condicionales

Algunos elementos del formulario permiten asociarles un prompt. Los prompts se
representan como un botón a la derecha del campo de ingreso de datos, y al presionarlo se
invoca un programa en una nueva ventana. Generalmente este programa es fijo, pero
también está disponible el uso del esquema de propiedades dinámicas para poder definir
distintos prompts asociados al mismo campo.

En el ejemplo se muestra un campo que tiene prompts distintos según el valor de la variable
Mode: 

``` xml
<field caption="Cuenta" data="&amp;CtaNro">
    <prompt object="HPmtCuenta3" params="&amp;CtaNro" />
    <conditional-prompts>
        <prompt object="HPmtCuenta1" params="&amp;CtaNro" expression="&amp;Mode = 'A'"/>
        <prompt object="HPmtCuenta2" params="&amp;CtaNro" expression="&amp;Mode = 'B'"/>
    </conditional-prompts>
</field> 
```

Al presionar el botón de prompt, en caso que la variable Mode tenga el valor “A” se ejecuta
el prompt HPmtCuenta1, en caso que tenga el valor “B” se ejecuta el prompt HPmtCuenta2
y en caso que no valga ninguno de estos valores se ejecuta el prompt HPmtCuenta3. Un punto
importante a tener en cuenta aquí es que los prompts condicionales se determinan en el
servidor cuando éste tiene que resolver un pedido, por ejemplo, al presionar una operación.
Por lo tanto, si el usuario modifica algún valor en la página que era parte de una condición,
se seguirá ejecutando el prompt anterior hasta que se presione una operación o se realice
alguna otra acción que envíe un mensaje al servidor.

El algoritmo que se sigue para determinar el prompt utilizado es la siguiente. En primer lugar
se analizan de arriba hacia abajo los prompts condicionales, si la condición se cumple para
alguno de ellos se selecciona. En caso que no se cumpla para ninguno se verifica si hay
definido un elemento prompt. Si se encuentra dicho elemento se utiliza el objeto y los
parámetros indicados allí, en caso contrario, se oculta el botón de prompt y el campo queda
sin prompt asociado. 

Los elementos que soportan el uso de prompts condicionales son: 
* field
* dependency
* prompt-column



