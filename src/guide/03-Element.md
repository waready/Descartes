# Componentes Básicos de un Formulario

## Elemento Form

Dijimos que el elemento principal de una página Web era el elemento web-ui, dentro de este
elemento se describen los elementos de la página Web para que el diseñador pueda
generarla. Uno de los componentes de esta definición es el formulario. El formulario es lo que
determina que elementos se le van a mostrar al usuario para ingresar o visualizar datos. Para
definir el formulario declaramos el elemento form (dentro del elemento web-ui) y dentro de
este indicamos los elementos que se van a mostrar al visualizar la página Web.

<img :src="$withBase('/img/04.png')" class="center">

Los elementos que brinda el diseñador para definir un formulario son:

* Text: Contiene un texto fijo que se muestra en la página.

* Field: Representa una caja de texto para ingresar un valor.

* Check-Box: Define una casilla de verificación, donde el usuario puede marcar o desmarcar una opción.

* Value-List: Permite seleccionar un valor de una lista de valores. Este elemento se puede mostrar como un cuadro de selección (un ComboBox) o botones de radio (RadioButtons).

* Dynamic-Value-List: También representa una lista de valores. La diferencia con el elemento anterior es que aquí los valores se cargan de la base de datos y en el elemento value-list se deben cargar manualmente. Para determinar los valores que se muestran en este elemento se debe especificar un par de atributos de una tabla y una condición que filtra los registros que se cargan.

* Dependency: Representa una relación de dependencia del tipo código-nombre. Este elemento se muestra como uno (o mas) campo/s donde se ingresa un código, y luego se carga a la derecha el concepto asociado al código. Adicionalmente, este elemento permite asociar un prompt. Cuando la dependencia tiene definido un prompt se muestra un botón con el cual el usuario puede abrir una nueva ventana con los valores posibles y seleccionar uno de esta lista.

* Grid: Permiten trabajar con listas de registros. Las grillas son lo que antes se conocían como subfiles en GeneXus, y a partir de la versión 8.0 se denominan también grillas. Este elemento puede ser utilizado tanto para mostrar datos como para ingresar datos en forma de tabla.

* Lline-break: Marca el fin de una línea, los elementos que estén luego de un line-break se ubicarán en la siguiente línea. Los elementos en el formulario se van ordenando de izquierda a derecha en la misma línea, se debe poner un line-break para marcar cuando termina una línea.

En la sección 7.0 Categorías y subcategorías se describirá cómo se pueden agrupar los campos de una página Web en categorías y subcategorías. Aunque por ahora dejaremos las categorías y subcategorías de lado y profundizaremos primero en cada uno de los elementos mencionados.

## Elemento Field

### Conceptos Básicos

El elemento field se debe usar cuando se necesita que el usuario ingrese un texto, un número o una fecha. Este elemento también puede ser utilizado para mostrar datos (sin permitir que se modifique). Los atributos principales del elemento field son: caption que define la etiqueta que se muestra a la izquierda del campo, y data que define la variable o el atributo de donde
se carga el valor del campo y en donde se graba al modificarlo. 

Por ejemplo, para mostrar un campo con el valor de la variable Nom se debe definir el campo de esta forma:

```xml
    <field caption="Nombre" data="&amp;Nom" /> 
```
Se recuerda que el signo “&” se debe poner como “&amp;” en XML (ya que es un carácter reservado). Por este motivo para hacer referencia a “&Nom” en un XML hay que escribir “&amp;Nom”.

En el ejemplo anterior el campo generado será de sólo lectura, es decir mostrará el valor de la variable Nom pero no dejará modificarla. Para crear un campo de lectura/escritura se debe
utilizar asignar el valor false en el atributo readOnly. Entonces, si se quisiera agregar un campo para que el usuario ingrese un nombre y quede almacenado en la variable Nom el código sería:

```xml
    <field caption="Nombre" data="&amp;Nom" readOnly="false" />  
```

### Prefijos y Sufijos
A través de los atributos leftText y rightText se puede incluir un texto a la izquierda y derecha del campo, respectivamente. Supongamos que queremos pedirle al usuario que ingrese la cantidad de días de un plazo podríamos poner el siguiente código: 

```xml
    <field caption="Plazo" data="&amp;Pla" rightText="días" readOnly="false" />
```
Al visualizar este elemento se mostraría una caja de texto, con un texto a la derecha en donde se visualizaría “días”. Con estos atributos se puede dar más información al usuario del dato que tiene que ingresar y crear interfaces más fáciles de usar.
 
<img :src="$withBase('/img/05.png')" class="center">

### Validaciones

Otro atributo que brinda el elemento field es allowNull. Este atributo permite definir si se
puede ingresar un valor vacío en el campo o no (por defecto su valor es false). Para utilizar
estas funcionalidades adicionalmente hay que emplear el atributo validateData en las
operaciones. Para hacer un análisis completo de este tema se necesita un conocimiento más
amplio de la definición de operaciones, por lo que, por ahora se dejarán pendientes las
validaciones y este tema se tratará de forma completa en la sección 11.0 Validaciones. 

### Visibilidad, Habilitación y Destaque
Dentro del elemento field se ofrecen una serie de elementos que permiten definir, en tiempo
de ejecución, cuando el campo está visible, cuando está habilitado y cuando es necesario
pintarlo de rojo para destacarlo. Estos elementos se llaman enabled, visible y highlighted
respectivamente. Cada uno tiene un atributo llamado expression donde se debe indicar una
expresión que determina si el valor de la propiedad es verdadero. Por ejemplo, si indicamos
la expresión “&Mode = „I‟” en el elemento visible dentro de un campo, éste sólo estará visible
cuando la variable Mode valga “I”, si queremos ocultar el campo deberíamos asignarle un
valor distinto a la variable. En la sección 10.0 Propiedades dinámicas se profundizará el
tema, y se enumerarán otras propiedades que pueden controlarse de la misma forma. 

A los campos se les puede asociar un prompt que pueda ayudar al usuario a ingresar un
campo. Por ejemplo, se podría asociar un prompt a un campo para que el usuario pueda
desplegar una lista con los valores posibles, o para ayudarlo a calcular un valor.

Para ejemplificar esta situación volveremos a utilizar el ejemplo de la sección 2.8 Prompts
para ingreso de datos. El ejemplo consiste en un campo donde el usuario debe ingresar un
porcentaje de comisión y puede desplegar un prompt para calcular el valor en función de una
lista de verificación con las comisiones a aplicar. El código para asociar este prompt al campo
sería el siguiente:

```xml
    <field caption="Plazo" data="&amp;Pla" rightText="días" readOnly="false" />
```

El prompt es el WebPanel PmtComision, que se define en el atributo object. Luego el atributo
params indica la lista de parámetros. Si hay más de un parámetro, se deben separar con
comas.

La característica más destacable que ofrecen los prompts es que aceptan parámetros de
salida. Por lo tanto, podemos utilizar los prompts para brindar al usuario una interfaz más
completa a la hora de asignar un valor a un campo. Para lograr esto, la variable del campo
debe estar declarada como variable de salida en el prompt (utilizando la palabra clave out
en la regla Parm), y al aceptar el valor del prompt, éste se cargaría en la página que lo abrió. 

### Campos con Contenido Oculto 

En los campos de contraseña, por lo general, se oculta el texto que escribe el usuario para
que otra persona no pueda ver su contraseña si mira la pantalla. El ocultamiento se realiza
sustituyendo los caracteres de los campos por otros como „*‟ o círculos. Mientras el usuario
escribe su contraseña sólo se verá una tira de *‟s en la pantalla y no se sabrá cual es la
contraseña que escribió.

Para crear campos que tengan este comportamiento el diseñador ofrece el atributo
isPassword. Si se quiere ocultar el contenido de un campo se debe agregar el atributo
isPassword con valor true en el elemento field. 

### Prompts y Etiquetas Condicionales 
Los campos pueden tener prompts y etiquetas condicionales, es decir, que se tengan una
lista de prompts y etiquetas posibles, y en base al valor de una expresión se determine en
tiempo de ejecución cual se utiliza. Los prompts condicionales se definen en el elemento hijo
conditionalprompts, y las etiquetas condicionales en el elemento conditional-captions. Este
tema se tratará con más detalle en la sección 10.0 Propiedades dinámicas. 

## Elemento Check-Box

### Conceptos Básicos 
El elemento check-box despliega una casilla de verificación en donde el usuario puede
marcar o no una opción o propiedad. La forma general de definir un elemento check-box es
muy similar al elemento field, únicamente es necesario agregar dos atributos para indicar el
valor que toma la variable o atributo cuando el campo está chequeado y cuando no lo esta:

```xml
    <check-box caption="Tiene hijos" data="&amp;TieHij"
    checkedValue="S" uncheckedValue="N" readOnly="false" /> 
```

Este código genera un casilla de verificación con el texto “Tiene hijos”, cuando está marcado
se asigna el valor “S” a la variable TieHij y cuando no lo está se asigna “N”. 

### Visbilidad, Habilitación y Destaque 

El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información. 

### Etiquetas Condicionales 

El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información. 

## Elemento Value-List 

### Conceptos Básicos

Este elemento se utiliza cuando se debe elegir un valor de una lista de valores posibles. Los
atributos básicos de este elemento son: caption (define la etiqueta asociada) y data (define
la variable o atributo asociado). Adicionalmente, se deben indicar los valores posibles dentro
del elemento items. A continuación se muestra un ejemplo para generar un campo que pida
el sexo de una persona: 

```xml
   <value-list caption="Sexo" data="&amp;Sexo" readOnly="false">
        <items> 
            <item text="Masculino" value="M" />
            <item text="Femenino" value="F" />
        </items>
    </valuelist>  
```
Dentro del elemento items se definen todos los valores posibles. Cada elemento está definido
por el atributo text, que indica el texto que se presenta al usuario, y el atributo value que
define el valor que se asigna a la variable al seleccionar el valor.

Si no se especifica el atributo readOnly la lista de valores es de sólo lectura (es decir, por
defecto su valor es true). Las listas de valores de sólo lectura se representan en la página
mostrando directamente el texto asociado al valor que está cargado en la variable o atributo.
Únicamente al indicar false en el atributo readOnly se le presentan al usuario todos los
valores posibles para que seleccione uno. 

### ComboBox o RadioButton

Con el atributo style (dentro del elemento check-box) se puede definir cómo se despliegan
los valores al usuario. Los estilos soportados son:

* ComboBox: Este es el estilo por defecto, y muestra los valores utilizando un cuadro
de selección con una flecha a la derecha, cuando el usuario presiona la flecha se
despliegan todos los valores posibles. La ventaja de este estilo es que ocupa poco
espacio en el formulario, pero tiene como desventaja que para ver todos los valores
es necesario presionar la flecha.

* RadioButton: Con este estilo se listan verticalmente todos los valores con un botón
de radio a la izquierda. Al presionar en uno de los botones de radio se selecciona el
valor y se deselecciona el anterior. Este mecanismo brinda como ventaja que se
despliegan todos los valores en el formulario. Sin embargo, si hay muchos valores la
lista de valores podría ser muy grande. Este estilo puede ser apropiado cuando hay
únicamente 2 o 3 valores posibles. 

### Prefijos y Sufijos 
El mecanismo es igual al que se comentó en el elemento field. Ver sección 3.3.2 Prefijos y
sufijos para más información. 

### Carga de Valores desde Código GeneXus

A través del elemento items se puede definir la lista de valores. Sin embargo, puede ser
necesario traer los valores de una tabla o tener que evaluar alguna condición para determinar
que valores se cargan. En estos casos se deben cargar los valores desde código GeneXus. Si
se quieren cargar los valores manualmente se debe omitir el elemento items.
Cuando no se define el elemento items, al generar el objeto el diseñador define una subrutina
para agregar valores y otra para borrar todos los valores. Si definimos la lista de valores de
la siguiente forma: 

```xml
<value-list caption="Ciudades" data="&amp;CiuCod" readOnly="false" />
```

Luego de generar se creará la subrutina “GP: Agregar valor a &CiuCod” y “GP: Borrar valores
de &CiuCod”. Además también se agregará la variable GP_Vl_Texto (de tipo VarChar) y
GP_Vl_CiuCod_Valor (que tiene el mismo tipo que la variable CuiCod).

Al invocar la subrutina “GP: Agregar valor a &CiuCod” para agregar un elemento en la lista
se toma el valor de la variable GP_Vl_CiuCod_Valor y el texto de GP_Vl_Texto. Se deben
utilizar estas subrutinas para agregar y borrar los valores de la lista así luego el diseñador
puede definir como se muestran en la página Web.

Si queremos cargar la lista de ciudades de un país, y el código de país está cargado en la
variable PaiCod, se debería agregar en el evento Init el siguiente código: 

```GeneXus
    For Each Order CuiNom
    Where PaiCod = &PaiCod
        &GP_Vl_CiuCod_Valor = CuiCod
        &GP_Vl_Texto = CuiNom
        Do 'GP: Agregar valor a &CiuCod' 
    EndFor 
```

Esta carga de valores se podría haber hecho con el elemento dynamic-value-list como se verá
más adelante, y no hubiera sido necesario escribir el For Each. Únicamente se mostró aquí
este segmento de código como un ejemplo sencillo para entender cómo se pueden cargar
los valores desde código GeneXus. Únicamente se deberán cargar los valores manualmente
cuando los datos no se cargan de una tabla o se tienen condiciones de carga muy complejas.

La carga de valores se debe realizar en el evento Init (ver sección 2.3 Init y Start). Cada vez
que el usuario hace una operación en la página se manda un mensaje HTTP al servidor con
la operación. Los valores de las listas de valores no se mandan en el mensaje, por lo que el
servidor debe recalcular la lista de valores para poder volver a dibujar la página. Por este
motivo es que la carga de valores debe estar en el Init.

Si en algún momento se quiere vaciar el contenido de la lista de valores simplemente se debe
invocar a la subrutina “GP: Borrar valores a &CiuCod” (no es necesario cargar ninguna
variable adicional) 

### Actualizar el Formulario al Cambiar el Valor Seleccionado 

Dentro del elemento value-list se brindan una serie de atributos para forzar que al cambiar
el valor seleccionado se produzcan actualizaciones en otras secciones de la página. Por
ejemplo, podríamos mostrar u ocultar algunos campos según el valor seleccionado en un 
value-list. Sin embargo, la visibilidad de los campos sólo se actualiza recién luego de
presionar una operación, para forzar a que se actualice la interfaz inmediatamente luego de
cambiar el valor seleccionado en el value-list disponemos de los atributos
autoRefreshOnChange y refreshGridsOnChange (dentro del elemento value-list).

El atributo autoRefreshOnChange admite los valores true o false (su valor por defecto es
false). Si asignamos true a este atributo al cambiar el valor seleccionado se generará un
pedido al servidor que provocará que se actualicen los valores de las propiedades que se
definen con expresiones (por ejemplo, visibilidad y habilitación). Adicionalmente, también se
volverán a cargar las grillas que estén definidas al mismo nivel que el elemento value-list (por
ejemplo, si definimos una grilla dentro del mismo elemento form que contiene el value-list
ésta se volverá a cargar al cambiar el valor seleccionado).

El atributo refreshGridsOnChange recibe una lista de nombres de grillas separadas por
comas. Si agregamos este atributo, al cambiar el valor seleccionado del value-list se volverán
a cargar las grillas indicadas en el valor del atributo mencionado. Dicho atributo puede ser
de utilidad si el valor del valuelist participa en las condiciones de carga de la grilla.
Adicionalmente, si se utiliza el atributo refreshGridsOnChange al cambiar el valor
seleccionado también se actualizan las propiedades que estén definidas con expresiones, al
igual que con el atributo autoRefreshOnChange. 

### Ejecutar Código al Cambiar el Valor Seleccionado

Los mecanismos mencionados anteriormente permiten definir actualizaciones automáticas
al cambiar el valor seleccionado, aunque no nos permiten escribir código que se ejecute
antes de las actualizaciones. En cambio, si asignamos true al atributo
generateEventOnChange, al generar la definición, el diseñador generará una subrutina que
se invocará al cambiar el valor. De esta forma podríamos escribir código para que se ejecute
al cambiar el valor seleccionado y realizar acciones más específicas (por ejemplo, cambiar el
valor asignado a otro campo).

Si definimos la siguiente lista de valores: 



```xml
 <value-list caption="Formato" data="&amp;Fmt" readOnly="false" generateEventOnChange="true">
    <items>
        <item text="Simple" value="S" />
        <item text="Extendido" value="E" />
    </items>
</value-list>
```
Se generará la siguiente subrutina: 

```GeneXus
    Sub 'GU: Vl -> Formato (Change)' //$ ...
        // PARA HACER: Ingrese el código que se ejecuta al ocurrir un
    cambio
        // en el valor de la lista de valores
    EndSub // 'GU: Vl -> Formato (Change)'
```

En el ejemplo anterior dentro del value-list se asignó true al atributo generateEventOnChange,
pero no se utilizó ninguno de los otros atributos mencionados para refrescar el formulario
(por ejemplo, autoRefreshOnChange). Cuando definimos una lista de valores de esta forma
luego de ejecutar la subrutina también se actualizan las propiedades definidas con
expresiones (como por ejemplo, las que determinan la visibilidad de los campos), pero no se
actualizan las grillas de la página como con los atributos autoRefreshOnChange o
refreshGridsOnChange. 

###  Nombre Asociado 

Como vimos anteriormente, a través del atributo generateEventOnChange podemos generar
una subrutina con nombre “GU: Vl -> `<nombre de la lista de valores>` (Change)”. En este caso
como la lista de valores no tenía un nombre asociado se toma el valor del atributo caption.
Sin embargo, si generamos dos value-list con el mismo texto asociado e indicamos para
ambas que se genere la subrutina mencionada se producirá un conflicto porque las dos
subrutinas tendrían el mismo nombre. Para resolver este conflicto se le debe asignar un
nombre al menos a una de las listas de valores a través del atributo name. Así, la subrutina
asociada se generará con el valor del atributo name (en lugar del atributo caption) y se evitará
el conflicto. 

### Visibilidad, Habilitación y Destaque 
El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información. 

### Etiquetas Condicionales

El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información.

## Elemento Dynamic-value-list

### Conceptos Básicos

El elemento dynamic-value-list se comporta visualmente de la misma forma que el elemento
value-list. La diferencia entre estos elementos es que el elemento dynamic-value-list permite
utilizar un par de atributos y una condición para definir los valores, y el diseñador utiliza estos
datos para genera un For Each que carga los valores desde la base de datos.

A continuación se muestra cómo se podrían cargar los nombres de las ciudades de un país
(con código PaiCod). Este ejemplo es el mismo que se mostró para ejemplificar la carga de
valores en un value-list desde código GeneXus. Sin embargo, aquí se muestra cómo se puede
lograr la misma funcionalidad utilizando el elemento dynamic-value-list y sin necesidad de
escribir código adicional. 

```xml
 <dynamic-value-list caption="Ciudades" data="&amp;CiuCod"
    text="CuiNom" value="CiuCod" readOnly="false">
    <condition expression="PaiCod = &amp;PaiCod" />
</dynamic-value-list>
```
La definición anterior es equivalente a realizar el siguiente For Each para cargar los valores: 

```GeneXus
    For Each Order CuiNom
    Where PaiCod = &PaiCod
        &GP_Vl_CiuCod_Valor = CuiCod
        &GP_Vl_Texto = CuiNom
        Do 'GP: Agregar valor a &CiuCod'
    EndFor'
```
En value se define el atributo de donde se extraen los valores, en text se define el atributo de
donde se extraen los textos asociados, en caption la etiqueta asociada y en data se define la
variable o el atributo de donde se lee y escribe el valor seleccionado.

Finalmente, en el elemento condition se puede especificar una condición para filtrar los
valores que se cargan, si no se indica este elemento se cargan todos los registros de la tabla.
Al definir una condición se debe tener en cuenta que no se puede utilizar es símbolo “<”, sino
que, en su lugar se debe escribir “&lt;”, por ejemplo, para indicar la condición “PaiHab <
1000000” se debe escribir “PaiHab &lt; 1000000”. Esto se debe a que dentro de XML el
símbolo “<” es un carácter reservado. Adicionalmente, si bien se puede escribir el símbolo
“>”, éste también es un carácter reservado y se debe representar con “&gt;”, por lo tanto, la
herramienta sustituye los “>” por “&gt;” luego de generar. 

### ComboBox o RadioButton

El mecanismo es igual al que se comentó en el elemento value-list. Ver sección 3.4.2
ComboBox o RadioButton para más información. 

### Prefijos y Sufijos 
El mecanismo es igual al que se comentó en el elemento field. Ver sección 3.2.2 Prefijos y
sufijos para más información. 

###  Actualizar el Formulario al Cambiar el Valor Seleccionado

El mecanismo es igual al que se comentó en el elemento value-list. Ver sección 3.4.5
Actualizar el formulario al cambiar el valor seleccionado para más información.

### Ejecutar Código al Cambiar el Valor Seleccionado 
El mecanismo es igual al que se comentó en el elemento value-list. Ver sección 3.4.6 Ejecutar
código al cambiar el valor seleccionado para más información. 

### Nombre Asociado

El mecanismo es igual al que se comentó en el elemento value-list. Ver sección 3.4.7 Nombre
asociado para más información. 

### Visibilidad, Habilitación y Destaque 
El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información. 

### Etiquetas Condicionales

El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información.

## Elemento Dependency 

### Conceptos Básicos

Las dependencias se utilizan para representar relaciones asociativas del tipo código-nombre.
Este elemento se debe utilizar cuando se necesita pedir un código, y luego a partir del código
se quiere mostrar a la derecha el nombre asociado, para que el usuario pueda verificar el
código ingresado.

Este elemento se encarga de resolver la representación visual de este tipo de relaciones y de
generar el código para cargar los valores inferidos antes de ejecutar una operación.

Como ejemplo se muestra una dependencia para pedir el código de un país e inferir su
nombre: 

```xml
<dependency caption="País" determinants="&amp;PaiCod" dependents="&amp;PaiNom">
    <prompt object="HPmtPais" params="&amp;PaiCod, &amp;PaiNom" />
</dependency> 
```
Las dependencias básicamente se definen a través de dos conceptos: los determinantes y
los dependientes.

El concepto de determinante es similar al de clave de una tabla, los determinantes son los
valores que determinan un elemento de la dependencia. Los determinantes se especifican
en el atributo determinants y en el ejemplo el determinante sería el código del país, ya que
determina un país. En caso que haya más de un determinante se puede poner una lista de
variables separada por comas.

Los dependientes son los valores que se infieren a partir de el/los determinante/s. En el
ejemplo sería el nombre del país, que se infiere a partir del código. La definición de
dependientes se hace en el atributo dependents, en caso que haya más de uno también se
separan por comas.

En el ejemplo también hay asociado un prompt en la dependencia. Al presentarle la
dependencia al usuario se agregará un botón a la derecha del código que el usuario puede
presionar para invocar el prompt asociado. En este caso, el WebPanel PmtPais le podría
mostrar al usuario la lista de países para que pueda buscar uno específico si no recuerda su
código.

En resumen, para definir una dependencia hay que poner por un lado en el atributo
determinants las variables donde se va a capturar la clave del objeto, y luego en dependents
las variables donde se van a cargar los valores que se infieren.
Luego, al generar la definición, por cada dependencia el diseñador crea una subrutina para
cargar los valores dependientes en función 

``` genexus
Sub 'GU: Dep -> País (Load)' //$ ...
    // PARA HACER: Verifique que el código cargue el/los valor/es dependiente/s 
    // OBS: En caso de que la carga NO haya sido exitosa el valor de la variable
    // &GP_Dep_Pais_Cargada debe ser 'N', por defecto el
    valor es 'S'
    For Each
    Where PaiCod = &PaiCod
        &PaiNom = PaiNom
        When None
        &GP_Dep_Pais_Cargada ='N' 
    EndFor
EndSub // 'GU: Dep -> País (Load)' 
``` 

El diseñador genera un For Each que utiliza atributos con igual nombre a las variables. En
caso que las variables tengan nombres de atributos de la base de datos el For Each
probablemente sea correcto. Sin embargo, si por algún motivo no se pueden utilizar los
mismos nombres o la condición de carga es más compleja será necesario modificar el For
Each para que cargue correctamente la dependencia.

La subrutina de carga es de usuario, y por lo tanto se puede modificar sin temor a perder los
cambios al volver a generar. Recordemos que las subrutinas de usuario son las que tienen
prefijo “GU” y son creadas por el diseñador para que escribamos código en ella. La primera
vez que se generan el diseñador escribe un código base, pero luego no las sobrescribe.

En la subrutina de carga básicamente lo que se debe hacer es determinar los valores de las
variables dependientes en función de las variables determinantes. Si no se puede cargar la
dependencia se debe establecer la variable GP_Dep_Pais_Cargada en „N‟ (o la variable que
corresponda según la etiqueta de la dependencia).

La subrutina para cargar dependencias se invoca luego del Start e Init (es decir, al cargar la
página), y antes de invocar a una operación. En caso que no se pueda cargar alguna
dependencia al invocar una operación, si la operación tiene el valor true en el atributo
validateData se muestra un error y no se ejecuta el código asociado a la operación.

Otras particularidades de la subrutina de carga: al invocar una operación sólo se cargan las
dependencias del alcance de la operación (ver sección 7.0 Categorías y subcategorías) y en
caso que el valor del atributo allowNull sea false no se invoca a la subrutina de carga luego
del Start e Init si algún determinante es nulo (ver sección 2.3 Init y Start) 

### Prompts y Dependencias de sólo Lectura 

Las dependencias deberían tener definido un prompt para darle la posibilidad al usuario de
seleccionar el valor de una lista si no lo recuerda. Esto se hace a través del elemento prompt
como se puede observar en el ejemplo anterior. Para definir un prompt se debe indicar el
objeto y las variables del prompt.

En caso que no se defina un prompt, la dependencia se crea en modo de sólo lectura. Es
decir, no se permite al usuario ingresar el determinante de la dependencia. En general se
usan dependencias de sólo lectura en páginas de consulta cuando se necesite visualizar una 
relación de tipo código-nombre. El diseñador también se encarga de generar el código para
cargar este tipo de dependencias de la misma forma que las de lectura/escritura. 

<img :src="$withBase('/img/06.png')" class="center">

Adicionalmente se cuenta con el atributo readOnly (en el elemento dependency) que permite
controlar si la dependencia es de sólo lectura. Por defecto este atributo vale auto, pero
también acepta los valores true (sólo lectura) o false (lectura/escritura). En caso que valga
auto la dependencia es de sólo lectura si no hay un prompt definido como se mencionó
anteriormente.

### Validaciones 
En las dependencias también se incluye el atributo allowNull (al igual que en elemento field).
A partir de este atributo se puede definir si se permite que haya valores nulos en los
determinantes. Su valor por defecto es false. Cuando el atributo vale false se reporta
automáticamente un error si al menos uno de los determinantes es nulo al invocar una
operación.

El diseñador también genera código para validar la carga de la dependencia. Como se
mencionó previamente, en caso que se tenga que cargar una dependencia y la subrutina de
carga no la pueda cargar se muestra un error. Para más información sobre las validaciones
ver sección 11.0 Validaciones.

### Visibilidad, Habilitación y Destaque

El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información.

### Prompts y Etiquetas Condicionales

El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información. 

### Nombre Asociado 

Por cada dependencia el generador crea una subrutina de carga y una variable auxiliar para
controlar si la dependencia está cargada. Si no se le asigna un nombre a la dependencia (en
el atributo name) el diseñador utiliza el valor del atributo caption para generar su nombre.
Por ejemplo, si el valor del atributo caption es “País” se generará la subrutina “GU: Dep ->
País (Load)”.

En caso de trabajar con una página con varias categorías (ver sección 7.0 Categorías y
subcategorías) se podrían necesitar dos dependencias con la misma etiqueta (mismo
caption) y esto produciría un conflicto en las variables generadas. Para evitar este conflicto
se debe utilizar el atributo name (del elemento dependency). En dicho atributo se puede
especificar un nombre para la dependencia, y al generar el diseñador usará ese nombre para
definir la subrutina y variable de carga que están asociadas a la dependencia. 

### Advertencias Automáticas ante Cambios

El elemento dependency brinda un atributo llamado warningOnChange que permite generar
advertencias automáticas cuando cambia un valor dependiente. Este atributo acepta los
valores true o false, por defecto es false.

Si warningOnChange vale true se hace un control de cambios al cargar la dependencia. En
caso que la subrutina de carga genere al menos un valor distinto al anterior para los
dependientes (y el valor anterior no sea nulo) genera una advertencia que le notifica al
usuario que cambió el valor inferido de la dependencia.

No se recomienda utilizar frecuentemente este atributo. Sólo se presenta para casos
particulares en que sea muy importante que el usuario sea notificado cuando cambia el valor
dependiente. Si por ejemplo se tiene una página Web que pide un código de país, y se quiere
que el usuario pueda ver el nombre del país antes de realizar una operación se deben utilizar
operaciones con confirmación (ver sección 4.3 Operaciones con confirmación).

Se debe tener en cuenta que las dependencias se cargan recién en el momento que se
ejecuta la operación, por lo tanto, si no se pide confirmación el usuario no alcanzará a ver el
nombre inferido hasta después que realice la operación. En cambio, si se pide una
confirmación (con el atributo warningOnChange en la dependencia o confirmation en la
operación) el usuario podrá ver el nombre del país indicado con la confirmación y verificar si
es correcto antes de ejecutarla. 

## Elemento Grid 

Representan una tabla para desplegar o editar una lista de registros. La definición de grillas
incluye el enunciado de sus columnas, las operaciones asociadas a la misma, y también
filtros que permiten al usuario restringir los datos que visualiza.

Debido a que el tema de grillas es amplio se dedicará una sección completa para estudiarlo.
Más adelante volveremos a este tema en la sección 5.0 Grillas 

Este elemento se utiliza para marcar el fin de una línea de elementos. Dentro de un formulario
los elementos (como field, dependency, etc.) se van ordenando de izquierda a derecha, para
marcar el inicio de una nueva línea se debe utilizar el elemento line-break. Observar la
siguiente definición:



```xml
<form>
    <field caption="A" data="&amp;A" />
    <field caption="B" data="&amp;B" /> 
    <line-break />
    <field caption="C" data="&amp;C" />
    <field caption="D" data="&amp;D" />
    <line-break />
    <field caption="E" data="&amp;E"/>
</form>
```
Aquí el formulario tendría tres líneas. En la primera línea se encontrarían los campos A y B.
Luego en la segunda línea se encontrarían los campos C y D. Finalmente, en la última línea
estaría sólo el campo “E”.

Se recomienda el siguiente criterio para agrupar las líneas. En caso que el formulario tenga
pocos campos definir una nueva línea por campo. Si el formulario tiene muchos campos se
sugiere agrupar campos relacionados en la misma línea para reducir su altura. Se entiende
que un formulario tiene muchos campos cuando al ponerlos uno en cada línea es necesario
utilizar la barra de desplazamiento para poder ver toda la página.