# Grillas

## Conceptos Básicos 

El uso de grillas permite desplegar una lista de registros de una tabla. El concepto es análogo
al de grillas en GeneXus (o subfiles, como eran conocidos hasta la versión 7.5). A través de
una grilla se brinda una vista de tabla para desplegar un conjunto de datos. Adicionalmente,
las grillas también se pueden utilizar para ingresos de datos utilizando el mismo estilo de
vista.

Una grilla se define indicando sus columnas y cómo se van a cargar los datos en las mismas.
Más adelante veremos que también se pueden asociar otros elementos a las grillas, como
por ejemplo filtros sobre los datos y operaciones. Pero por ahora comencemos analizando un
ejemplo sencillo de una página con una grilla:


``` xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
    <web-ui title="Países" class="other">
        <form>
            <grid name="grdPaises">
                <columns>
                    <field-column title="Código" data="PaiCod" />
                    <field-column title="Nombre" data="PaiNom" />
                </columns>
            </grid>
        </form>
    </web-ui>
</object-definition>

```

<img :src="$withBase('/img/09.png')" class="center">

Este ejemplo representa una grilla que muestra la lista de países. Los datos que muestra la
grilla se determinan a partir de las columnas definidas en el elemento columns. En el código
se definen dos columnas: una con el atributo PaiCod (código de país) y otra con el atributo
PaiNom (nombre del país). Al definir la grilla a partir de atributos se genera automáticamente
el código que carga los datos de la tabla en la grilla, de la misma forma que lo hace GeneXus.

Por lo tanto, con este código ya tenemos todo lo necesario para presentar la lista de países
registrados en la base de datos.

Al trabajar con tablas grandes pueden surgir inconvenientes por el volumen de información.
Resultaría muy costoso (en tiempo de ejecución) recorrer toda la tabla, y además, podría ser
impráctico para el usuario presentarle una página con todos los registros de la misma. Por
este motivo, cuando se tiene que cargar una grilla con muchos registros se agrega un
paginado de forma automática.

El concepto de paginado consiste en mostrar los datos de la tabla por páginas. Es decir,
primero se muestra una página con los primeros 10 registros, luego si el usuario decide ir a
la siguiente página se le muestran los siguientes 10 registros, y así sucesivamente. Al mostrar
una grilla con paginado se agrega en la parte inferior un botón para ir a la página anterior,
otro para ir a la página siguiente y una referencia a la página actual.

El número de registros que se muestran por páginas se determina según el tamaño de la
grilla, el cual se fija con el atributo height. El valor por defecto de este atributo corresponde
a una grilla de 10 filas como máximo (más adelante analizaremos todos los valores de este
atributo). En caso que la cantidad de registros que se necesitan cargar supere la cantidad de
filas máxima, se muestran los botones de paginado, y en caso contrario se omiten.

Al definir una grilla es obligatorio darle un nombre a ésta con el atributo name. Si bien este
nombre no lo verá el usuario en la página Web generada, el diseñador lo necesita para definir
las subrutinas y variables asociadas a la grilla. En caso que se defina más de una grilla dentro
de una página Web, se debe asignar un nombre distinto a cada una para que no se produzcan
conflictos. 

## Tipos de Grilla 

Cuando la grilla contiene atributos se tiene una grilla con tabla base, y aquí se puede inferir
un For Each para leer los datos de la base de datos. Una grilla se define con tabla base
cuando tiene:

* Asociado al menos un atributo en una columna (dentro del elemento columns o hiddencolumns)
* Definido un orden (atributo orderBy dentro de grid)
* Atributos para determinar la tabla (atributo definedBy dentro de grid)

En cambio, si las columnas de la grilla se definieron únicamente con variables, se tiene una
grilla sin tabla base, y aquí es necesario escribir completamente el código para cargar los
datos de la grilla. También se tiene un caso intermedio que se presenta cuando la grilla está
definida con atributos y variables simultáneamente. Este es otro caso de grilla con tabla base
y también se infiere un For Each para cargar los atributos, sin embargo, aquí hay que escribir
código para asignar los valores de las columnas definidas con variables. 

### Grillas con Tabla Base (Definidas sólo con Atributos) 

Las grillas con tabla base son aquellas en las cuales se puede inferir una tabla de la base de
datos para cargar los registros que se despliegan. Se dice que una grilla tiene tabla base
cuando al menos una de sus columnas está definida con un atributo. En esto casos se infiere
un For Each para cargar los datos utilizando los atributos de las columnas.

Si los atributos de las columnas no son suficientes para que GeneXus determine la tabla
deseada se pueden indicar atributos adicionales dentro del atributo definedBy. De esta forma
se puede inducir a GeneXus a tomar una tabla particular, en caso que la tabla que determina
no sea correcta.

Por ejemplo, para la siguiente grilla: 

``` xml
<grid name="grdPaises" definedBy="PaiDsc">
    <columns>
        <field-column title="Código" data="PaiCod" />
        <field-column title="Nombre" data="PaiNom" />
    </columns> 
</grid>

```
El For Each generado tendría la siguiente forma: 

``` Genexus
For Each
Defined By PaiDsc
    &GP_A_PaiCod = PaiCod
    &GP_A_PaiNom = PaiNom
    // Aquí va el código que carga el registro en la grilla
EndFor

```
Cuando la grilla está definida únicamente con atributos no es necesario escribir código
adicional, porque todos los datos que se muestran se pueden extraer de la base de datos.
Sin embargo, como se verá en la siguiente sección, si hay al menos una columna definida
con una variable se genera una subrutina que se invoca por cada registro cargado. Esta
subrutina no es generada si no hay columnas con variables. Ahora bien, en caso que sea
necesario realizar un procesamiento por registro cargado, es posible forzar su generación
asignando el valor true al atributo generateRecordLoad (en el elemento grid). En la siguiente
sección analizaremos con más detalle cómo se utiliza esta subrutina. 

### Grillas con Tabla Base (Definidas con Atributos y Variables)

En caso que no podamos extraer todos los datos directamente de la base de datos tenemos
que agregar columnas con variables asociadas, y cargar manualmente los valores de las
variables. Si la grilla está compuesta tanto de atributos como de variables, se infiere un For
Each con los atributos utilizados, y luego se invoca una subrutina en la cual debemos cargar
los valores de las variables.

Dada la siguiente grilla:
``` xml
<grid name="grdPaises">
    <columns>
        <field-column title="Código" data="PaiCod" />
        <field-column title="Nombre" data="PaiNom" />
        <field-column title="Cantidad de ciudades" data="&amp;CiuCnt" />
    </columns> 
</grid>

```
El diseñador genera el siguiente For Each para cargar los datos de la grilla:

``` Genexus
For Each
    &GP_A_PaiCod = PaiCod
    &GP_A_PaiNom = PaiNom
    // Invoca la carga de un registro
    &GP_Gr_grdPaises_AgregarFila = 'S'
    Do 'GU: Gr -> grdPaises (LoadRecord)'
    // Agrega el registro a la grilla (si &GP_Gr_grdPaises_AgregarFila = 'S')
EndFor

```

Además se genera la subrutina:

``` Genexus
Sub 'GU: Gr -> grdPaises (LoadRecord)' //$ ...
 // PARA HACER: Ingrese el código que se ejecuta al cargar
    cada registro // OBS: Es posible utilizar la variable
    &GP_Gr_grdPaises_AgregarFila como
    // bandera para indicar si se desea cargar el registro ('S') o no ('N').
    // Por defecto su valor es 'S'.
    // PARA HACER: Cargar las variables de un registro
    &CiuCnt =
EndSub // 'GU: Gr -> grdPaises (LoadRecord)' 

```

Dentro de esta subrutina se debe escribir el código para cargar la variable (observar los
comentarios de la subrutina). Aunque se debe tener en cuenta que no se pueden referenciar
directamente los atributos porque si no GeneXus inferiría un nuevo For Each, ya que el For
Each que recorre la tabla base y llama a la subrutina anterior esta en otra subrutina. Para
evitar este problema el diseñador genera una variable por cada atributo utilizado en una
columna y le asigna el valor del atributo. Las variables creadas se nombran con el prefijo
GP_A_ y luego el nombre del atributo (por ejemplo, GP_A_PaiCod y GP_A_PaiNom). Dentro de
las subrutinas, estas variables están cargadas con los valores de los atributos y deben ser
referenciadas en lugar de los atributos.

Por ejemplo, si quisiéramos cargar la cantidad de ciudades de cada país la subrutina podría
definirse de la siguiente forma: 

``` Genexus
Sub 'GU: Gr -> grdPaises (LoadRecord)' //$ ... 
    &CiuCnt = 0
    For Each
    Where PaiCod = &GP_A_PaiCod
    DefinedBy CiuCod
        &CiuCnt += 1
    EndFor
EndSub // 'GU: Gr -> grdPaises (LoadRecord)'

```

En caso de necesitar algún otro atributo que no aparece en el For Each, se debe declarar en
un elemento denominado hidden-columns. En este elemento se pueden definir columnas
adicionales que si bien no se muestran al usuario, al definirlas a partir de atributos, también
se cargan en variables y pueden ser referenciadas. Para más información ver sección 5.9
Columnas ocultas.

Dentro de la subrutina “GU: Gr -> `<nombre de la grilla>` (LoadRecord)” también se dispone
de una variable para indicar si efectivamente queremos cargar el registro o no (el nombre de
la variable se puede ver en los comentarios generados, en este caso es
GP_Gr_grdPaises_AgregarFila). Si se asigna „N‟ a la variable se ignora el registro y no se
carga en la grilla (su valor por defecto es „S‟, por lo tanto, si no se modifica el valor de la
variable se agrega el registro)

La variable mencionada anteriormente puede ser útil para resolver condiciones complejas
de carga, se puede validar una condición y luego asignar un valor a ella para determinar si el
registro se carga o no. Sin embargo, más adelante veremos que también disponemos de
otros mecanismos que pueden ser más útiles para resolver los casos más habituales y
sencillos. En la sección 5.3 conditions, definedBy y orderBy se analizará el elemento
conditions que permite definir una condición de carga sobre el For Each generado para cargar
los datos de la tabla base. 

## Grillas sin Tabla Base (Definidas sólo con Variables) 

Si una grilla no tiene ninguna columna definida con un atributo no se puede inferir un For
Each, y se dice que la grilla no tiene tabla base. En este caso, en lugar del For Each se genera
una subrutina en la cual debemos realizar toda la carga manualmente. Por lo tanto, en este
esquema se gana más libertad, ya que debemos escribir completamente el código para
cargar la grilla, sin embargo, es necesario escribir más código que en las grillas con tabla
base.

Para ejemplificar este escenario, definiremos una tabla para cargar la lista de países (de la
misma forma que se hizo en el ejemplo con tabla base) pero esta vez lo haremos sin tabla
base. El código que se expone a continuación se presenta únicamente como ejemplo, la
forma más adecuada de resolver este problema sería con una grilla con tabla base, como se
mostró anteriormente. 


``` xml
<grid name="grdPaises">
    <columns>
        <field-column title="Código" data="&amp;PaiCod" />
        <field-column title="Nombre" data="&amp;PaiNom" />
    </columns> 
<grid> 

```
Para la grilla anterior el diseñador genera la subrutina: 

``` Genexus
Sub 'GU: Gr -> grdPaises (LoadRecords)' //$ ...
// Código para cargar los registros de la grilla
    For Each
        // PARA HACER: Cargar las variables de la grilla
        &PaiCod =
        &PaiNom =

        // Agrega el registro a la grilla
        Do 'GP: Agregar registro a grdPaises'

        // Realiza el control de carga. Termina la carga si se cargó
        // la página actual completamente
        If &GP_CargaTerminada = 'S'
            Exit
        EndIf
    EndFor
EndSub // 'GU: Gr -> grdPaises (LoadRecords)'
```

Ahora nos resta escribir todo el código de carga en la subrutina anterior. Al crear la subrutina
el diseñador genera un esqueleto de la forma que podría tener el código de carga, para
facilitarnos la escritura del mismo. Al observar el código podemos encontrar una invocación
a la subrutina “GP: Agregar registro a grdPaises”, y un If que corta el For Each si el valor de la
variable GP_CargaTerminada es “S”. En los siguientes párrafos nos dedicaremos a estudiar
estos dos segmentos de código.

Como se ve en el código generado, luego que cargamos las variables de la grilla debemos
invocar a una subrutina para agregar el registro a la grilla. Para las grillas sin tabla base el
diseñador genera una subrutina con nombre “GP: Agregar registro a  `<nombre de la grilla>`”
para realizar esta tarea. En este caso la subrutina para agregar registros es “GP: Agregar
registro a grdPaises”.

Las grillas se manejan con paginado si la cantidad de registros es demasiado grande. En las
grillas con tabla base el control de paginado se realiza de forma automática. Sin embargo,
en las grillas sin tabla base hay que hacer un control manual para evitar recorrer toda la tabla
cuando se termina de cargar la página actual. Este control está representado en el último If
del código generado.

El mecanismo seguido para cargar las páginas es el siguiente. Si se quiere cargar la página
1, se cargan uno a uno los registros hasta completar la página 1 y al invocar a la subrutina
“GP: Agregar registro a grdPaises” con el primer registro de la página 2 se asigna “S” a
GP_CargaTerminada para indicar que no se necesitan más registros. Si se necesita cargar la
página 2, la subrutina “GP: Agregar registro a grdPaises” ignora todos los registros hasta
llegar al primero de la página 2, de ahí en más agrega los registros a la grilla y luego de
completar la página 2 se asigna “S” a GP_CargaTerminada. El proceso es análogo para el resto de las páginas, es decir, se recorre siempre desde el comienzo hasta llegar a la página
buscada (ya que no hay mecanismos directos en GeneXus para saltearse un grupo de
registros) y se utiliza la variable GP_CargaTerminada para indicar cuando termina la carga,

En definitiva, para manejar el paginado lo que se debe hacer es agregar registros de forma
secuencial y terminar la carga cuando el valor de la variable GP_CargaTerminada es “S”. El
diseñador generará código interno para controlar cuando hay que agregar realmente el
registro. Por lo tanto, sólo hay que preocuparse de terminar la carga cuando
GP_CargaTerminada vale “S”. 

El código para cargar los países (de la misma forma que en el ejemplo con tabla base) sería: 

``` Genexus
Sub 'GU: Gr -> grdPaises (LoadRecords)' //$ ...
// Código para cargar los registros de la grilla
    For Each
    Defined By PaiDsc
        &PaiCod = PaiCod
        &PaiNom = PaiNom
        // Agrega el registro a la grilla
        Do 'GP: Agregar registro a grdPaises'
        // Realiza el control de carga. Termina la carga si se cargó
        // completamente la página actual
        If &GP_CargaTerminada = 'S'
        Exit
        EndIf
    EndFor
EndSub // 'GU: Gr -> grdPaises (LoadRecords)' 
```

## Conditions, DefinedBy y OrderBy

Al trabajar con grilla con tabla base, el diseñador es quien genera el For Each. Para evitar
perder generalidad se ofrecen una serie de elementos que permiten agregarle al For Each
generado: condiciones, una cláusula Defined By y el orden en que se cargan los datos.

De esta forma, el diseñador busca proveer un mecanismo flexible y sencillo para trabajar
con grillas con tabla base. Se recomienda intentar utilizar este tipo de grillas en la mayor
cantidad de casos posibles y así evitar tener que escribir manualmente el código completo
de carga.

Dentro del elemento grid se dispone de los atributos definedBy y orderBy. Estos atributos
definen la cláusula Order y Defined By del For Each. El valor de estos atributos puede ser un
atributo o una lista de atributos separados por espacios o comas. En caso que no se
especifique alguno de estos atributos, se omitirá la cláusula asociada en el For Each.

Por otro lado, para definir una condición de carga se dispone del elemento conditions (que
va dentro del elemento grid). Si escribimos este elemento en una grilla se agrega una cláusula
Where con la expresión indicada en el atributo expression del elemento. 


Por ejemplo, dada la siguiente definición de una grilla: 
``` xml
<grid name="grdPaises" definedBy="PaiDsc" orderBy="PaiNom">
    <conditions expression="PaiHab &gt; 1000000" />
    <columns>
        <field-column title="Código" data="PaiCod" />
        <field-column title="Nombre" data="PaiNom" />
    </columns>
</grid>

```
El For Each generado en este caso sería:

``` Genexus
For Each Order PaiNom
Where PaiHab > 1000000
Defined By PaiDsc
    &GP_A_PaiCod = PaiCod
    &GP_A_PaiNom = PaiNom
    // Aquí va el código que carga el registro en la grilla
EndFor

```

Recordemos que en XML los caracteres “<” y “>” están reservados por el lenguaje, y por lo
tanto, no se deberían utilizar en el valor de un atributo. Al escribir una condición se debe
escribir “&lt;” en lugar de “<”, y “&gt;” en lugar de “>”. Por este motivo, en el ejemplo anterior
se definió la condición como “PaiHab &gt; 1000000”, en lugar de, “PaiHab > 1000000”.

## Definición de Condiciones Complejas de Carga

Como se vio en la sección anterior el elemento conditions brinda la posibilidad de definir
condiciones de cargas en las grillas con tabla base. Sin embargo, las grillan ofrecen otro
mecanismo que puede ser útil para resolver situaciones más complejas. Este mecanismo ya
fue mencionado en la sección 5.2 Grillas con tabla base (definidas con atributos y variables)
y es el siguiente: cuando tenemos una grilla definida con atributos y variables se ejecuta una
subrutina por cada registro y dentro de esta subrutina disponemos de una variable que
permite indicar si se carga o no el registro. De esta forma, se brinda la posibilidad de definir
condiciones con código GeneXus cuando no se pueda representar la condición en una
expresión. Consultar la sección mencionada anteriormente para más información.

Cuando se trabaja con grillas que tienen sólo atributos no se genera automáticamente la
subrutina de carga. Sin embargo, se puede forzar su generación, y disponer de este
mecanismo de filtrado, asignando true al atributo generateRecordLoad del elemento grid.

## Grillas en Prompts 

El uso más común de los prompts es para seleccionar un valor de una lista. Generalmente,
se muestra una lista con valores posibles en una grilla y el usuario debe seleccionar uno. Por
ejemplo, si necesitamos un código de país, le podemos mostrar al usuario un prompt con una
grilla, donde estén cargados los países, y así podrá seleccionar uno de la grilla.

Para permitir que el usuario seleccione un elemento de la grilla dentro un prompt se brinda
un atributo específico llamado prompt. Al asignar true a este atributo se genera una columna
contra la derecha de la grilla, con un botón que permite al usuario seleccionar una fila
particular y luego automáticamente cerrar el prompt (ver Figura 5-2). De esta forma, se puede
seleccionar un elemento de un prompt con un sólo clic. Además, al hacerlo de esta forma,
también se cargan los parámetros de salida del prompt con el valor seleccionado.

Si queremos definir un prompt de países que devuelve el código seleccionado las reglas
serían: 

    ** Parm(out:&GP_A_PaiCod); 

Y la definición sería: 

``` xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
    <web-ui title="Selección de Países" class="prompt">
        <form>
        <grid name="grdPaises" prompt="true" orderBy="PaiNom">
        <filters>
        <column caption="Desde nombre" data="PaiNom" />
        </filters>
            <columns>
                <field-column title="Código" data="PaiCod" />
                <field-column title="Nombre" data="PaiNom" />
            </columns>
        </grid>
    </form>
    </web-ui>
</object-definition> 

```

En el ejemplo también se incluye un filtro (en el elemento filters) dentro de la grilla. Los filtros
definen condiciones de carga sobre la grilla, por ejemplo, en este caso al ingresar un valor en
el filtro de nombre sólo se cargaran los países que tengan un nombre mayor o igual al
indicado. El uso de filtros es de mucha utilidad en los prompts ya que le facilitan al usuario
la tarea de localizar un registro específico. Más adelante se verán con mayor profundidad los
filtros en grillas.

<img :src="$withBase('/img/10.png')" class="center">

## Operaciones 

###  Conceptos Básicos

Las operaciones en las grillas se definen con el elemento operations dentro de grid. El
formato de la definición de operaciones el mismo que se utiliza en el elemento form. Dentro
del elemento operations se debe definir la lista de operaciones permitidas escribiendo
elementos con nombre operation o prompt-operation. Se pueden utilizar los mismos atributos
y elementos que se mencionaron en la sección 4.0 Operaciones, como por ejemplo, el
atributo caption para definir la etiqueta, confirmation para pedir una confirmación, o los
elementos enabled y visible para controlar si la operación está habilitada y/o visible.

Dentro de las operaciones de la grilla también se dispone del atributo autoRefresh. Con este
atributo podemos indicar si es necesario que se vuelva a cargar la grilla de la operación luego
de ejecutarla. Adicionalmente, también se cuenta con el atributo refreshGrids que permite
indicar de forma explicita las grillas que se actualizan luego de presionar la operación (en la
sección 4.2 Actualización de datos luego de presionar una operación se brinda más
información de estos dos atributos). Si definimos una operación que modifica los datos de
una grilla debemos utilizar una de las opciones anteriores para actualizarla, sino se seguirán
mostrando datos viejos luego de ejecutar la operación. Al volver a cargar una grilla, por lo
general, es necesario al menos un acceso a la base de datos. Por lo tanto, se recomienda indicar que es necesario actualizar una grilla únicamente cuando es estrictamente necesario,
y evitar generar carga innecesaria en el servidor de base de datos. 

### Control de Selección 
En las operaciones de las grillas se agrega el atributo selection. Este atributo indica si se
necesita que el usuario seleccione algún registro antes de ejecutar la operación. En función
de este atributo el diseñador escribe código de validación para las operaciones de las grillas
y además genera los elementos gráficos necesarios para permitir la selección. Por ejemplo,
si hay al menos una operación con selección simple brinda al usuario la posibilidad de
seleccionar una fila al hacer clic sobre ella. En caso que haya al menos una operación con
selección múltiple, se agrega una columna con casillas de verificación para que el usuario
pueda marcar más de una fila.

<img :src="$withBase('/img/11.png')" class="center">

Los valores posibles del atributo selection son:

* None: La operación no requiere selección.
* Single: La operación requiere que haya una fila seleccionada. Si se intenta invocar la operación y no hay selección se muestra un error.
* Multiple: La operación permite selección múltiple. Se puede chequear una o más fila,en caso que se invoque la operación y no haya al menos una fila chequeada se muestra también un error.

En las operaciones de la grilla se manejan dos conceptos distintos para la selección: la fila
seleccionada (que es sólo una) y las filas chequeadas (que pueden ser más de una). La fila
seleccionada no necesariamente tiene que coincidir con la fila chequeada y viceversa. La
diferencia de estos conceptos se puede observar visualmente. Las filas chequeadas son
aquellos que tienen tildada la casilla de verificación y la fila seleccionada se determina al
hacer clic sobre una fila, cuando una fila está seleccionada se pinta de otro color. 

A continuación se muestra un ejemplo de una grilla con los tres tipos de operaciones:

``` xml
<grid name="grdPaises">
    <columns>
        <field-column title="Código" data="PaiCod" />
        <field-column title="Nombre" data="PaiNom" />
    </columns>
    <operations>
        <operation caption="Agregar" selection="none" autoRefresh="true" />
        <operation caption="Borrar" selection="multiple" autoRefresh="true" />
        <operation caption="Visualizar" selection="single" />
    </operations>
</grid>
```

### Datos seleccionados (Selección Simple)

Al trabajar con operaciones con selección simple se pueden obtener los datos seleccionados
directamente a través de las variables asociadas a las columnas. En las columnas que están
definidas con una variable la selección se carga en la variable, y en las columnas que están
definidas con atributos el valor seleccionado se asigna a una variable que crea el diseñador
con nombre GP_A_`<nombre del atributo>`.
Dentro de la operación “Visualizar” del ejemplo anterior se pueden obtener los datos
seleccionados en las variables GP_A_PaiCod y GP_A_PaiNom.


###  Datos Seleccionados (Selección Simple)

<img :src="$withBase('/img/12.png')" class="center">

Adicionalmente, al crear la subrutina asociada a las operaciones con selección múltiple el
diseñador genera un esqueleto del código necesario para iterar sobre las filas chequeadas.
En el ejemplo anterior se crea una subrutina para la operación “Borrar” con el siguiente
código: 

``` Genexus
Sub 'GU: Op -> Borrar (Click)' //$ ...
    // PARA HACER: Ingrese el código que se ejecuta al realizar la operación
    For &GP_K = 1 To &GP_Gr_grdPaises_nFilasCheq
        // Carga en las variables la fila chequeada número &GP_K
        Do 'GP: Leer fila chequeada &GP_K de grdPaises'
        // PARA HACER: Procesar la fila chequeada
    EndFor
EndSub // 'GU: Op -> Borrar (Click)' 

```

Como se puede observar, en el código de la subrutina se genera un ciclo que recorre las filas
chequeadas, y dentro del ciclo se invoca a la subrutina “GP: Leer fila chequeada &GP_K de
grdPaises” para cargar los valores de la fila en las variables asociadas. Luego de cada
invocación a dicha subrutina se pueden acceder a los valores chequeados a través de las
variables GP_A_PaiCod y GP_A_PaiNom. A continuación se muestra un ejemplo del código
anterior invocando un procedimiento para borrar los países chequeados:

``` Genexus
Sub 'GU: Op -> Borrar (Click)' //$ ...
    For &GP_K = 1 To &GP_Gr_grdPaises_nFilasCheq
        // Carga en las variables la fila chequeada número &GP_K
        Do 'GP: Leer fila chequeada &GP_K de grdPaises'
        // Borra el país chequeado
        Call(PBorrarPais, &GP_A_PaiCod)
    EndFor
EndSub // 'GU: Op -> Borrar (Click)' 

```

En resumen, los valores chequeados se obtienen iterando desde 1 hasta el valor de la
variable GP_Gr_grdPaises_nFilasCheq (que contiene la cantidad de filas chequeadas), e
invocando a la subrutina “GP: Leer fila chequeada &GP_K de grdPaises” que carga en las
variables los datos de la fila chequeada con índice GP_K (este índice corresponde a una lista
virtual que contiene sólo las filas chequeadas y tiene largo igual a
GP_Gr_grdPaises_nFilasCheq).

## Filtros

### Conceptos Básicos

Al trabajar con grillas que tienen muchos datos puede ser necesario incluir algún mecanismo
que le facilite al usuario buscar un registro en particular. Por ejemplo, supongamos que
tenemos una aplicación que tiene una tabla con los clientes de una empresa, y se debe
proveer una página Web que permita visualizar los clientes registrados. Para resolver este requerimiento definimos una grilla que cargue los clientes registrados, sin embargo, luego de
poner en funcionamiento la aplicación detectamos que un caso de uso común es que el
usuario busque a un cliente por su apellido. Una solución para mejorar la usabilidad podría
ser incluir un campo que permita al usuario escribir parte del apellido y posicionarse en los
clientes que tienen un apellido mayor o igual al escrito como se muestra en la Figura 5-6. En
caso que haya mucha cantidad de datos, esta clase de mecanismos le brindan al usuario la
posibilidad de ir rápidamente a un registro específico sin necesidad de paginar sobre los
datos para encontrarlo.

El diseñador introduce en las grillas el concepto de filtros para manejar estas situaciones.
Los filtros permiten a los usuarios imponer condiciones sobre los registros que se cargan en
la grilla. Otro ejemplo de un filtro sería un cuadro de selección que permita seleccionar si se
muestran sólo los clientes extranjeros, sólo los nacionales o ambos.

Dentro del elemento „grid‟ se encuentra el elemento „filters‟ para indicar los filtros de la
grilla. Los filtros se definen indicando: un tipo de control (field, check-box, etc.), una etiqueta,
una variable para almacenar el filtro y la condición de filtrado. A partir de la definición de
filtros, el diseñador genera código para aplicar la condición de filtrado al cargar los datos en
la grilla (si el filtro no está vacío).

Las condiciones de filtrado se verifican siempre antes de agregar un registro a una grilla,
incluso aunque la grilla no tenga tabla base. En este último caso la condición de filtrado se
valida desde la subrutina para agregar registros a la grilla, en caso que no se cumpla la
condición se ignora el registro.

El diseñador ofrece un tipo particular de filtro en el cual hereda el tipo de control de una
columna y define automáticamente su condición. Este tipo de filtro se representa con el
elemento column, y es la forma más sencilla que ofrece el diseñador para definir filtros. A
continuación se muestra un ejemplo de cómo utilizar estos filtros. 

Este ejemplo consiste en una grilla con los datos de los clientes y un filtro por el apellido:

``` xml
<grid Name="grdClientes" orderBy="CliApe, CliNom">
<filters>
    <column caption="Desde apellido" data="CliApe" />
    </filters>
    <columns>
        <field-column title="Código" data="CliCod" />
        <field-column title="Apellido" data="CliApe" />
        <field-column title="Nombre" data="CliNom" />
    </columns> 
</grid>
```

<img :src="$withBase('/img/13.png')" class="center">

Como se observa en el ejemplo, para definir un filtro con el elemento column se debe indicar:
una etiqueta en el atributo caption y un atributo o variable que haya sido asociada a una de
las columnas en el atributo data. En función de esta definición el diseñador agrega un campo
por encima de la grilla que permite filtrar los datos por la columna indicada. Adicionalmente,
a la derecha del campo se agrega un botón para aplicar el filtro. Al presionar dicho botón, se
vuelven a cargar los datos de la grilla, cargando únicamente los registros de la tabla de
clientes en los cuales CliApe es mayor o igual al valor ingresado en el campo de filtrado (si
no es nulo). Para quitar el filtro se puede dejar vacío el campo y volver a presionar el botón
de filtrado.

A continuación describiremos brevemente los elementos disponibles para definir filtros, y en
las siguientes secciones mostraremos ejemplos de cómo se puede utilizar cada uno de ellos:

* Column: Permite definir un filtro a partir de una columna con condición de mayor o
igual, o directamente igual, dependiendo del tipo de control asociado como se verá a
continuación en la sección 5.7.2 Elemento column. Al utilizar este tipo de filtro el
diseñador infiere el tipo de control de la definición de la columna, crea una variable
(con sufijo _Filtro) para el filtro y define la condición de filtrado.

* Column-dependency: Este elemento permite definir un filtro que se comporta como
una dependencia y la condición se infiere automáticamente al igual que en el
elemento column.

* Field: Define un campo para filtrar. A diferencia del elemento column aquí se debe
especificar la variable en la que se captura el valor del filtro y permite indicar la
condición de filtrado. En el resto de los elementos que se listan también hay que
definir la condición manualmente.

* Check-box: Permite utilizar una casilla de verificación para representar el filtro. Este
tipo de filtro generalmente se utiliza para definir si se debe cumplir o no una
condición, por ejemplo, podríamos agregar una casilla de verificación para indicar
que se deben mostrar sólo los clientes con deuda.

* Value-list: Genera un control para que el usuario seleccione el valor del filtro. Por
ejemplo, se podría decidir filtrar los clientes por su nacionalidad y brindar una lista
de valores que permita elegir entre “Nacional”, “Extranjero” o “Ambos”. 

* Dynamic-value-list: Es similar al anterior, salvo que se indican una par de atributos de
la base de datos y se genera automáticamente un For Each para cargar los valores.

* Depedency: Define un filtro que se representa como una dependencia.

* Line-break: Marca el fin de una línea de filtros. En caso que se tengan muchos filtros
se puede utilizar este elemento para separarlos en más de una línea.

Dentro de los filtros podemos distinguir dos tipos: los automáticos y los manuales. Los filtros
automáticos son column y column-dependency, para estos filtros se genera
automáticamente una condición de mayor o igual (o dircetamente igual, dependiendo del
control asociado) y las variables necesarias para capturar los filtros que ingresa el usuario.
El resto de los filtros constituyen los filtros manuales. En estos filtros hay que indicar una
variable para capturar el filtro y se debe indicar manualmente la condición de filtrado como
veremos más adelante. 

### Elemento Column 

Este es el mecanismo más simple para definir filtros dentro de una grilla. Utilizando el
elemento grid se pueden definir filtros basados en columnas de la grilla. Lo único que se
necesita para definir un filtro de este tipo es indicar la etiqueta del filtro en el atributo caption
y el dato asociado a la columna en el atributo data. Luego, el diseñador define la condición
de filtrado y genera la variable necesaria para almacenar el valor del filtro. Dicha variable se
genera como GP_A_`<atributo>`_Filtro (si la columna está definida con un atributo), o
GP_`<variable>`_Filtro (si la columna está definida con una variable).

Al definir un filtro basado en una columna también se infiere el control utilizado para
representar la columna. Más adelante veremos cómo se pueden definir columnas que
representan con una casilla de verificación (ver sección 5.8.3 Elemento check-box-column
para más información). En caso que se defina un filtro sobre una columna de este tipo, el
filtro se muestra como una casilla de verificación y la condición de filtrado será de igualdad
exacta.

Opcionalmente también se puede incluir un prompt en el filtro de la misma forma que con
los elementos de los formularios. A continuación se muestra un ejemplo: 

``` xml
<grid name="grdClientes">
    <filters>
        <column caption="Desde apellido" data="CliApe">
            <prompt object="HPmtApellido" params="CliApe" />
        </column>
    </filters>
    <columns>
        <field-column title="Código" data="CliCod" />
        <field-column title="Apellido" data="CliApe" />
        <field-column title="Nombre" data="CliNom" />
    </columns>
</grid>

```

Los valores que ingresa el usuario en un filtro de este tipo se almacenan en la variable
generada (con sufijo _Filtro). Sin embargo, en el ejemplo anterior vemos que en la lista de
parámetros de la definición del prompt no es necesario referenciar directamente la variable
generada, sino que alcanza con referenciar el dato del filtro directamente. En particular, en este ejemplo, se podría haber colocado en el atributo params del elemento prompt, la
variable GP_CliApe_Filtro, obteniendo exactamente el mismo resultado. Se recomienda
referenciar directamente los datos del filtro (en este caso CliApe) para ganar claridad en la
definición y evitar errores.

### Elemento Column - Dependency 
El elemento column-depedency permite definir filtros automáticos que se representan como
dependencias. Para definir un filtro de este tipo se debe especificar la etiqueta en el atributo
caption, los datos de una o más columnas determinantes en el atributo determinantColumns
y los datos dependientes en el atributo dependents.

Se tomará como referencia un sistema hipotético de facturación para brindar un ejemplo. El
ejemplo consiste en una página Web donde se muestra la lista de facturas emitidas, y en la
cual queremos definir un filtro por cliente: 

``` xml
<grid name="grdClientes">
    <filters>
        <column caption="Desde apellido" data="CliApe">
            <prompt object="HPmtApellido" params="CliApe" />
        </column>
    </filters>
    <columns>
        <field-column title="Código" data="CliCod" />
        <field-column title="Apellido" data="CliApe" />
        <field-column title="Nombre" data="CliNom" />
    </columns>
</grid>

```

Al igual que en las dependencias de los formularios se genera una subrutina para cargar la
dependencia (el nombre se genera de igual forma que en el elemento dependency).

La condición de este filtro es de mayor o igual, sin embargo, para el caso mostrado en el
ejemplo anterior podría ser más útil un filtro de igual. Es decir, en lugar de mostrar todas las
facturas con código de cliente mayor o igual al indicado, tal vez sea más apropiado mostrar
sólo las facturas del cliente indicado. Para poder realizar este tipo de filtros se debe definir
el filtro con el elemento dependency e indicar manualmente la condición. Cuando analicemos
este elemento retomaremos este caso y mostraremos un ejemplo de cómo implementarlo.

### Elemento Field 
Este elemento define un filtro manual que se representa con una caja de texto. Al definir un
filtro de este tipo se debe indicar la etiqueta del filtro en el atributo caption, una variable para Este elemento define un filtro manual que se representa con una caja de texto. 

Al definir un filtro de este tipo se debe indicar la etiqueta del filtro en el atributo caption, una variable para almacenar el valor del filtro en el atributo variable y la expresión de filtrado en el elemento
hijo filter-condition.

Al describir el elemento column se mostró un ejemplo de una grilla para mostrar los clientes,
en la cual se podía filtrar por el apellido del cliente. En este caso mostraremos el mismo
ejemplo pero utilizando el elemento field: 

``` xml
<grid name="grdClientes">
    <filters>
        <field caption="Desde apellido" variable="&amp;CliApeFiltro">
            <filter-condition expression="CliApe &gt;=&amp;CliApeFiltro" />
        </field>
    </filters>
    <columns>
        <field-column title="Código" data="CliCod" />
        <field-column title="Apellido" data="CliApe" />
        <field-column title="Nombre" data="CliNom" />
    </columns> 
</grid>
```

Recordemos que al definir la condición de filtrado no se pueden utilizar los caracteres “<” y
“>”, ya que estos son caracteres especiales de XML. En lugar de “<” se debe escribir “&lt;”, y
en lugar de “>” se debe escribir “&gt;”. Por este motivo, en el ejemplo anterior se definió la
condición como “CliApe &gt;= &amp;CliApeFiltro”, en lugar de, “CliApe >= &amp;CliApeFiltro”.

En los filtros de este tipo también se puede asociar un prompt agregando el elemento prompt
(dentro de field) de la misma forma que en el elemento field de los formularios. 

### Elemento Check-Box

A través de este elemento se pueden utilizar casillas de verificación para definir filtros. El
filtro se define indicando la etiqueta del filtro en el atributo caption, la variable asociada en
el atributo variable, el valor que toma cuando está chequeado en el atributo checkedValue y
cuando no está chequeado en uncheckedValue, y por último, la condición de filtro en el
elemento filter-condition.

El siguiente ejemplo muestra la definición de un filtro definido con el elemento check-box: 
``` xml
<check-box caption="Sólo clientes con pagos pendientes" variable="&amp;SoloPagPnd" checkedValue="S" uncheckedValue="N">
    <filter-condition expression="CliPagPnd = &amp;SoloPagPnd" />
</check-box> 

```

### Elemento Value-List
Este elemento se utiliza cuando se necesita mostrarle al usuario una lista de valores posibles
para que seleccione uno. Para definir un filtro a partir de este elemento se debe indicar la
etiqueta en el atributo caption, la variable asociada en el atributo variable, la lista de valores
en el elemento hijo items, y la condición de filtrado en el elemento filter-condition.

A continuación se muestra un ejemplo de un filtro de este tipo. El filtro se aplicaría a una grilla
que muestra una lista de personas, y se utilizaría para determinar el sexo de las personas
que queremos ver en la misma:

``` xml
<value-list caption="Sexo" variable="&amp;Sexo">
    <filter-condition expression="(&amp;Sexo = 'A') Or (PerSex =&amp;Sexo)" />
    <items>
        <item text="Ambos" value="A" />
        <item text="Masculino" value="M" />
        <item text="Femenino" value="F" />
    </items>
</value-list> 
```

Dentro del elemento value-list también se dispone del atributo style para indicar si se
representa como ComboBox o RadioButton. Adicionalmente, se cuenta con el atributo
generateAddClear para cargar desde código los elementos, en caso que no se especifiquen
los elementos se generan automáticamente las subrutinas para agregar elementos.

También se cuenta con los siguientes atributos: autoRefreshOnChange,
refreshGridsOnChange y generateEventOnChange. Su comportamiento es análogo al
elemento value-list de los formularios, para obtener más información consultar la sección 3.5
Elemento value-list. Junto a estos atributos también se encuentra el atributo name, que
permite asociarle un nombre a la lista de valores y así evitar conflictos si hay más de una lista
de valores con el mismo valor en el atributo caption.

Existe únicamente una particularidad en los value-list que actúan como filtros que los
diferencia de los value-list de los formularios. Al definir un value-list como filtro se agrega
automáticamente un valor nulo al comienzo, es decir, la lista mostrará todos los valores que
le indiquemos más un valor nulo. De esta forma, el usuario podría decidir no aplicar el filtro
al seleccionar el valor nulo, ya que la condición de filtrado sólo se aplica si la variable del
filtro no tiene un valor nulo. Si por alguna circunstancia no queremos que se agregue este
valor nulo se puede asignar el valor false al atributo addNullValue (del elemento value-list).
Sin embargo, se recomienda dejar el valor nulo para que el usuario tenga la posibilidad de
no aplicar el filtro, sólo se debería quitarlo cuando no se le quiere dar esta opción al usuario. 

Este elemento permite definir listas de elementos que se obtienen de la base de datos. A
diferencia del elemento anterior, en este elemento se indica un par de atributos de una tabla
y el diseñador genera un For Each para cargar los valores desde allí. Los filtros de este tipo
se definen indicando la etiqueta en el atributo caption, la variable asociada en el atributo
variable, el atributo del cual se extrae el texto asociado a los valores en el atributo text y el
atributo del cual se extraen los valores en el atributo value.

A continuación se muestra un ejemplo de una definición de un elemento de este tipo para
definir un filtro por país: 

``` xml
<dynamic-value-list caption="País" variable="&amp;PaiCod" text="PaiNom" value="PaiCod">
 <filter-condition expression="PaiCod = &ampPaiCod" />
</dynamic-value-list> 
```
De la misma forma que en el elemento value-list aquí también se agrega un valor nulo
además de los valores cargados de la base de datos, el cual le permite al usuario indicar que
no quiere aplicar el filtro. En caso que no se quiera que se agregue el valor nulo, para no dar
la posibilidad de no aplicar el filtro, se debe asignar el valor false al atributo addNullValue
(del elemento dynamic-value-list).

En este elemento también se incluyen los atributos autoRefreshOnChange,
refreshGridsOnChange y generateEventOnChange; los cuales permiten realizar acciones
cuando se cambia el valor seleccionado, ver sección 3.5 Elemento value-list para más
información. El elemento dynamic-valuelist brinda también el atributo name para poder
asociarle una nombre a la lista de valores y resolver conflictos de nombres si hay más de una
lista de valores con el mismo valor en el atributo caption.

### Elemento Dependency

Dentro de los filtros también se pueden utilizar dependencias con una condición de filtro. La
definición de las dependencias consiste en una etiqueta en el atributo caption, uno o más
determinantes en el atributo determinants y uno o más dependientes en el atributo
dependents. Adicionalmente, se puede incluir un prompt utilizando el elemento prompt.


Al analizar el elemento column-dependency se presentó un ejemplo de una página Web para
mostrar una lista de facturas emitidas que permitía filtrarlas por el cliente asociado. Sin
embargo, el filtro que se obtiene con el elemento anterior utiliza el operador mayor o igual y
quizás no es lo más conveniente para este caso. Aquí mostraremos el mismo ejemplo pero
con una dependencia manual y una condición de igualdad: 

``` xml
<grid name="grdFacturas">
    <filters>
        <dependency caption="Cliente" determinants="&amp;CliCod" dependents="&amp;CliNom">
        <filter-condition expression="CliCod = &amp;CliCod" /> 
        <prompt object="HPmtClientes" params="&amp;CliCod, &amp;CliNom" /> </dependency>
    </filters>
    <columns>
        <field-column title="Número" data="FacNum" />
        <field-column title="Fecha" data="FacFec" />
        <field-column title="Cliente" data="CliCod" />
        <field-column title="Total" data="FacTot" />
    </columns> 
</grid> 
```

La implementación de la dependencia también se hace a través de una subrutina que genera
el diseñador para cargar los valores dependientes. Esta subrutina se nombra de la misma
forma que al utilizar el elemento dependency en los formularios. Ver la sección 3.7 Elemento
dependency para más información. 

### Elemento Line-Break

Este elemento se utiliza de la misma forma que en los formularios, y sirve para separar los
filtros en distintas filas. Cuando se incluye un elemento de este tipo dentro de los filtros se
marca el fin de una línea de filtros, y los próximos filtros se ubican en la línea siguiente. 

### Definición de Condiciones Complejas de Filtrado

Hasta ahora vimos básicamente dos formas de definir la condición de filtrado, la primera fue
utilizar un filtro automático y dejar que el diseñador defina automáticamente una condición
de mayor o igual; y segunda fue utilizando elemento filter-condition dentro de un filtro
manual. Sin embargo, si tenemos condiciones demasiado complejas quizás no podamos
escribirlas con una expresión y no podríamos utilizar ninguno de los mecanismos anteriores.

Para escenarios complejos, en donde la condición de carga de los registros en la grilla no se
puede escribir en una expresión, el diseñador tiene previsto un mecanismo adicional para
las grillas con tabla base. El método ya fue mencionado previamente y consiste en controlar
el valor de una bandera durante la subrutina que se llama al cargar cada registro (ver sección
5.4 Definición de condiciones complejas de carga para más información). Al trabajar con
filtros también se puede aprovechar este mecanismo para resolver condiciones de filtrado
complejas (que no se puede expresar en el elemento filter-condition). Durante las subrutinas
de carga se pueden consultar los valores de las variables asociadas a los filtros y en base a
estos determinar si se carga o no el registro.

### Filter-Condition vs Conditions

Al aplicar un filtro se vuelven a cargar los registros de la grilla según la nueva condición de
carga. Los filtros que se definen con el elemento filter-condition son expresiones sobre los datos de la grilla. Por otro lado, las grillas brindan el elemento conditions que permite definir
una expresión que deben cumplir los registros de la grilla. Se puede ver que estos dos
conceptos son similares, ya que ambos definen la condición que deben cumplir los registros
para ser cargados, y por lo tanto se podría pensar que se puede definir la condición de filtrado
en cualquiera de los dos, sin embargo no son totalmente equivalentes.

La diferencia entre el uso de estas dos alternativas es la siguiente. Si se define la condición
de filtrado en el elemento filter-condition, el diseñador generara código para aplicar esta
condición únicamente si el campo no está vacío, en cambio sí se define en el elemento
conditions se aplicará siempre la condición. Por lo tanto, se recomienda utilizar el elemento
filter-condition para definir condiciones de filtrado parametrizables por el usuario. 

## Tipos de Columnas 

### Conceptos Básicos 

Las columnas de la grilla se definen dentro del elemento columns (en el elemento grid). Hasta
ahora sólo se hizo mención al elemento field-column, como forma de representar una
columna en la grilla, sin embargo existen otros tipos de columnas que pueden utilizarse al
definir una grilla. 

Los elementos para definir columnas son:

* Field-column: Este tipo de columna es el más habitual y se utiliza cuando se quiere
mostrar un texto con el valor de una variable o atributo. También se puede utilizar
esta columna para situar una caja de texto en la cual se pueda ingresar un valor para
cada celda de la columna.

* Check-box-column: Presenta una casilla de verificación por cada fila.

* Value-list-column: Asocia un control para seleccionar un valor en una lista de valores.
Este tipo de columna se utiliza cuando se va a utilizar la grilla para ingreso de datos
y se desea presentar en cada celda de la columna una lista de valores para que el
usuario seleccione uno.

* Dynamic-value-list-column: Representa una lista de valores, en la cual sus valores se
extraen de la base de datos.

* Prompt-column: Al definir una columna con este elemento se dibuja un botón de
prompt por cada fila en el lugar de la columna. En este botón se puede asociar un
WebPanel (de clase prompt) que se llame al presionarlo.

* Image-column: Permite mostrar imágenes en las celdas de la columna

A través de este elemento se despliega el valor de una variable o atributo (en formato de
texto) dentro de una columna. La columna puede ser tanto de lectura como de escritura. En
este último caso se mostrará una caja de texto para ingresar la variable. En definitiva, este
tipo de columnas se utiliza para mostrar un texto con el valor de la variable o atributo
asociado.

Para definir una columna en la cual únicamente se muestra un valor, se debe especificar al
menos el atributo title con el título de la columna, y en data el atributo o variable asociada.

Si queremos definir una columna para mostrar el valor del nombre de un país, que se
encuentra en el atributo PaiNom, lo podríamos hacer de la siguiente forma: 


``` xml
<field-column title="Nombre" data="PaiNom" /> 

```
En caso que queramos utilizar la columna para ingreso de datos debemos asignar false al
atributo readOnly y asociarle una variable: 

``` xml
<field-column title="Nombre" data="&amp;PaiNom" readOnly="false" />

```

Dentro de este elemento también se dispone del atributo allowNull para indicar si se permiten
valores nulos. El último atributo a mencionar de este elemento es total. Si se asigna true a
este atributo se agrega al final de la grilla un total de la columna, dicho total se calcula como
la suma de los valores en las celdas de la columna. 

### Elemento Check-Box-Column 

Este elemento permite mostrar casillas de verificación en una columna, se define de forma
muy similar al elemento anterior, aunque se agregan los atributos checkedValue y
uncheckedValue para indicar el valor que corresponde cuando está chequeada y cuando no
respectivamente. A continuación se muestra un ejemplo de una columna para marcar si un
país tiene costas con algún océano:

``` xml
<check-box-column 
        title="Litoral" 
        data="&amp;PaiLit" 
        readOnly="false" 
        uncheckedValue="N" 
        checkedValue="S" />

```
Cabe destacar que si se define un filtro de tipo column asociado a este tipo de columnas, la
condición generada será de igualdad estricta no de mayor o igual. 

### Elemento Value-List-Column

A través de este elemento se puede definir una columna que muestre una lista de valores en
la cual el usuario deba seleccionar uno. El siguiente ejemplo muestra la definición de una
columna para indicar el continente de un país: 

``` xml
<value-list-column title="Continente" data="amp;PaiCon" readOnly="false">
    <items>
        <item text="África" value="A" />
        <item text="América" value="M" />
        <item text="Asia" value="S" />
        <item text="Europa" value="E" />
        <item text="Oceanía" value="O" />
    </items>
</value-list-column>

```
En este tipo de columnas también se puede utilizar el atributo generateAddClear para que el
diseñador genere subrutinas para definir manualmente los elementos de la lista de valores.
Además, dentro de este tipo de columnas se incluye el atributo style para definir el estilo con
que se muestra la lista de valores (comboBox o radioButton).

Adicionalmente, se incluyen los atributos autoRefreshOnChange, refreshGridsOnChange y
generateEventOnChange para realizar alguna acción al cambia el valor seleccionado, estos
atributos se comportan de forma analoga los atributos con el mismo nombre del elemento
value-list, ver sección 3.5 Elemento value-list para más información. Al igual que en el
elemento value-list también se incluye el atributo name para poder asociarle un nombre a la
columna y resolver conflictos de nombres en las subrutinas generadas.

Cabe destacar que si se define un filtro asociado a este tipo de columnas con el elemento
column, la condición generada será de igualdad estricta no de mayor o igual. 

### Elemento Dynamic-Value-List-Column

Las listas de valores dinámicas toman sus valores de una tabla en lugar de requerir que se
definan manualmente. Comparten los mismos atributos y elementos que la columna de tipo
value-list-column, con las diferencias que marcaremos a continuación.

En lugar de definir los elementos con el elemento items se deben utilizar los atributos data
y text. En el atributo data se indica el atributo de la base de datos del cual se extrae el valor,
y en el atributo text se indica el atributo con el texto asociado. Luego, el diseñador arma un
For Each con estos atributos para cargar los valores de la columna. Debido a que los valores
se cargan automáticamente no se incluye el atributo generateAddClear del elemento valuelist-column.

Si se desean filtrar los elementos que se cargan en la columna se puede utilizar el elemento
condition para definir una condición de carga. En el siguiente ejemplo se muestra cómo se
pueden cargar las ciudades del país definido en la variable PaiCod en una columna de este
tipo. 

``` xml
<value-list-column title="Ciudad" data="&amp;Ciudad" readOnly="false" text="CiuNom" value="CiuCod">
    <condition expression="PaiCod = &amp;PaiCod" />
</value-list-column>

```

Este tipo de columna también incluye los atributos autoRefreshOnChange,
refreshGridsOnChange, generateEventOnChange y name, los cuales se comportan de la
misma forma que en el elemento value-list del formulario, para más información consultar la
sección 3.5 Elemento value-list. De la misma forma que en el elemento value-list-column, si
se define un filtro asociado a este tipo de columnas con el elemento column, la condición
generada será de igualdad estricta. 

### Elemento Prompt-Column

Las columnas de tipo prompt-column permiten generar un botón de prompt y asociar un
WebPanel (con clase prompt) en una columna de la grilla. Por cada fila de la grilla se agrega
un botón en el lugar de la columna como se muestra en la Figura 5-7. Al presionar este botón
se invoca el WebPanel asociado al prompt. Es importante remarcar que este tipo de columnas
no tiene datos asociados porque lo único que contienen es un botón por fila.

<img :src="$withBase('/img/14.png')" class="center">

En el siguiente ejemplo se muestra cómo definir una columna de este tipo que tiene asociado
el WebPanel PopCiudades pasando como parámetro el código del país PaiCod, que es parte
de la grilla. El objetivo sería mostrar las ciudades del país correspondiente a la fila del botón
presionado en el prompt asociado.

``` xml
<grid name="grdPaises">
    <columns>
        <field-column title="Código" data="PaiCod" />
        <prompt-column>
        <prompt object="HPopCuidades" params="PaiCod" />
        </prompt-column>
        <field-column title="Nombre" data="PaiNom" /> 
    </columns>
</grid>

```

Este tipo de columnas soportan la posibilidad de definir una lista de posibles prompts y
asociar una expresión a cada uno de ellos. La definición de los mismos se hace utilizando el
elemento conditionalprompts. En tiempo de ejecución se evalúan las expresiones definidas
para los prompts y se utiliza el primer prompt para el cual su expresión resulte verdadera.
Este tema se analizará con más profundidad en la sección 10.0 Propiedades dinámicas.

### Elemento Image-Column

Este elemento sirve para crear una columna para mostrar imágenes. Las columnas de este
tipo se definen indicando una variable o un atributo en donde se carga el nombre del archivo
de imagen asociado a cada fila. Luego, al visualizar la página Web, por cada fila se busca el
archivo en la carpeta del servidor Web y se muestra la imagen.

Los atributos básicos para definir este tipo de columnas son title donde se especifica el título
de la columna, y data donde se asocia una variable o atributo del cual se extrae el nombre
de archivo de imagen. El siguiente ejemplo muestra una definición de una columna de este
tipo: 

``` xml
<image-column title="Imagen" data="&amp;RutaImagen" />

```
## Columnas Ocultas 

Las columnas ocultas permiten almacenar información adicional en las filas que no es visible
al usuario. Por ejemplo, si tenemos una grilla en donde queremos mostrar el nombre de los
países (pero no su código) y tenemos operaciones que necesitan el código del país
seleccionado podemos poner el código como columna oculta. De esta forma, dentro las
subrutinas asociadas a las operaciones podemos consultar el valor del código del país como
si fuera otra columna más. 

El código para representar el ejemplo anterior sería: 

``` xml
<grid name="grdPaises">
    <columns>
        <field-column title="Nombre" data="PaiNom" readOnly="false"/>
    </columns>
    <hidden-columns>
        <column data="PaiCod"/>
    </hidden-columns>
    <operations>
        <operation caption="Visualizar" selection="single"/>
    </operations>
</grid> 

```

Al generar esta grilla dentro de la subrutina asociada a la operación “Visualizar” podemos
consultar los valores de las variables GP_A_PaiNom y GP_A_PaiCod para obtener los valores
de los atributos PaiNom y PaiCod para la fila seleccionada.

Como se observa en el ejemplo las columnas ocultas se definen dentro del elemento hiddencolumns con el elemento column. Para definir una columna oculta únicamente es necesario
definir el dato asociado en el atributo data, el cual puede ser un atributo o una variable, al
igual que en las columnas visibles.

Como vimos anteriormente, si se definen columnas con variables asociadas el diseñador
genera una subrutina para cargar los valores de estas variables. Esto se cumple tanto para
variables en columnas ocultas como visibles. Debido a que no se pueden referenciar
directamente atributos en las subrutinas generadas (porque GeneXus generaría un For Each
implícito adicional) es necesario que el generador nos cargue todos los atributos que
necesitamos en variables. Esto también se puede lograr utilizando columnas ocultas.

Para plantear un ejemplo de lo anterior supongamos que queremos mostrar una lista de
países, en donde para cada país queremos mostrar la densidad de población la cual se
calcula como la cantidad de habitantes (PaiHab) sobre la superficie (PaiSup). Entonces, la
definición de la grilla sería: 


``` xml
<grid name="grdPaises">
    <columns>
        <field-column title="Nombre" data="PaiNom" />
        <field-column title="Dens. Pob." data="&amp;PaiDenPob" />
    </columns>
    <hidden-columns>
        <column data="PaiHab" scope="load" />
        <column data="PaiSup" scope="load" />
    </hidden-columns>
</grid> 

```
De esta forma se dispone de los valores de los atributos PaiHab y PaiSup para cada país
cargado. Se asigna el atributo scope con valor load para indicarle al diseñador que sólo
utilizaremos los valores en la carga de la grilla. De esta forma, el diseñador genera código
más óptimo para esta situación. Sin embargo, los valores de los atributos definidos de esta
forma no estarán disponibles en operaciones asociadas a la grilla.

Finalmente, el código que habría que agregar para cargar la variable PaiDenPob es el
siguiente:

``` genexus
Sub 'GU: Gr -> grdPaises (LoadRecord)' //$ ...
 &PaiDenPob = &GP_A_PaiHab / &GP_A_PaiSup
EndSub // 'GU: Gr -> grdPaises (LoadRecord)' 
```

## Visibilidad de Grillas 

Las grillas ofrecen el elemento visible para poder ocultarlas. Dentro de dicho elemento se
define una expresión para indicar cuando está visible, al igual que en el resto de los
elementos del formulario. Sin embargo, hay una diferencia que vale la pena destacar. Cuando
se oculta la grilla se pierden los valores que hay en ella, y luego si se muestra nuevamente
se tienen que volver a cargar. Por lo tanto, cuando una grilla se hace visible se invoca a la
subrutina de carga y se vuelven a leer los datos. 

### Visibilidad, Habilitación y Destaque de Columnas

Para controlar si una columna está visible y/o habilitada se pueden utilizar los elementos
visibles y enabled (de la misma forma que con los elementos del formulario). Los elementos
mencionados permiten determinar si se oculta la columna en tiempo de ejecución y/o si se
habilitan sus campos.

Al utilizar el elemento enabled sobre una columna, la expresión definida se aplica en todas
las filas, es decir, si no se cumple la expresión se deshabilita la columan en todas las filas.
Para poder definir si el campo de una fila en particular está habilitado o no, se brinda el
elemento row-enabled. Este elemento también se define a partir de una expresión, pero aquí
si se pueden poner variables asociadas a otras columnas. Durante la ejecución de la página
se evalúa la expresión por cada fila y en función del resultado se habilita o no el campo de la
columna para la fila.

Para mostrar un ejemplo de cómo utilizar el elemento row-enabled supongamos que tenemos
una grilla en donde mostramos los países. A los que tengan una cantidad de habitantes
mayor a 3000000 les vamos a asignar una calificación (No Aplica, A, B o C), en el resto de
los países la selección de clasificación debería deshabilitarse. A continuación se muestra
como podría ser el código de la grilla para representar esta situación. 

``` xml
<grid name="grdPaises">
    <columns>
    <field-column title="País" data="PaiNom"/>
        <value-list-column title="Calificación" data="&amp;PaiCal">
        <row-enabled expression="PaiHab &gt; 3000000" />
            <items>
                <item text="N/A" value="N" />
                <item text="A" value="A" />
                <item text="B" value="B" />
                <item text="C" value="C" />
            </items>
        </value-list-column>
    </columns>
    <hidden-columns>
        <column data="PaiHab" />
    </hidden-columns>
</grid>

```

A través del elemento row-highlighted también se pueden definir condiciones para resaltar
una o más filas. Las filas resaltadas se pintan de rojo, y pueden ser útiles para destacar
situaciones inusuales en que el usuario debería prestar atención. Al igual que el elemento
row-enabled, el elemento rowhighligted se escribe dentro de la definición de las columnas y
se evalúa por fila. 

Además de estos dos elementos se encuentra el elemento row-visible, el cual está disponible
para el tipo de columna prompt-column. Con este elemento se puede definir una condición
para determinar si se muestra el botón de prompt en cada fila.

Se debe tener en cuenta que los elementos mencionados no están soportados para todos
los tipos de columnas, por ejemplo, row-enabled no se soporta para el tipo de columna
prompt-column, ya que a efectos prácticos se puede lo mismo con el elemento row-visible.
En el editor de la definición se pueden verificar los elementos soportados para cada tipo de
columna, adicionalmente en la sección 10.0 Propiedades dinámicas se encuentra ésta
información en detalle

## Títulos Condicionales

Los títulos condicionales permiten definir distintos títulos para una columna en función de
alguna condición. Dentro del elemento conditional-titles se pueden definir una serie de
posibles títulos y asociarle una expresión a cada uno. Las expresiones se evalúan de arriba
a abajo luego de efectuar una operación y la primera condición que se cumple es la que
define el título de la columna. En caso que no se cumpla ninguna se toma el título asociado
en el atributo title. En la sección 10.4 Títulos y etiquetas condicionales se puede encontrar
un ejemplo de la definición de títulos condicionales y más información sobre el tema.

## Evento Refresh y Altura de la Grilla 

### Evento Refresh

Dentro de GeneXus se provee este evento para las grillas, el cual se produce antes de cargar
los registros de las mismas. Al asignar true al atributo generateRefresh (del elemento grid) el
diseñador genera una subrutina análoga con nombre “GU: Gr -> `<nombre de la grilla>`
(Refresh)”. Esta subrutina se invoca siempre que es necesario volver a cargar una grilla. 

### Altura de una Grilla

La grilla tiene una altura que determina la cantidad máxima de filas. La altura se define a
través del atributo height (del elemento grid). Los valores soportados son: 

* VerySmall: 3 filas.
* Small: 6 filas.
* Medium: 10 filas.
* Large: 15 filas.
* VeryLarge: 20 filas.
* Custom: Se define la cantidad de filas en atributo customHeight. 

En caso que no se defina este atributo se asume el valor medium. Al definir la altura de una
grilla se puede utilizar el valor custom para definir el número exacto de filas, sin embargo no
se recomienda su uso para evitar que las grillas de diferentes páginas Web (creadas por
desarrolladores distintos) tengan alturas muy desiguales. Por este motivo se encuentran
definidos una serie de valores preestablecidos con el fin de uniformizar las alturas posibles
de las grillas. Sólo se debe utilizar el valor custom en casos muy particulares. 

## Grillas para Ingreso de Datos

### Conceptos Básicos 


El uso más común de las grillas es para mostrar información, sin embargo también se pueden
utilizar como esquema para ingresar datos, y pueden ser útiles en escenarios donde el
usuario necesite hacer modificaciones en varios registros simultáneamente.

Existen dos escenarios de grillas editables: 

* Modificación de columnas específicas: Al definir una grilla se pueden definir una a
una si las columnas son editables. Supongamos que queremos crear una página Web
para que los ejecutivos de cuenta definan qué tipo de promoción se le va a ofrecer a
cada cliente, entonces podríamos crear una grilla donde se listen los clientes y a la
derecha de cada nombre se pone un cuadro de selección (value-list-column) para que
el ejecutivo de cuenta seleccione qué tipo de oferta es la más adecuada para el
cliente (por ejemplo, préstamo tipo X, Y o Z).

<img :src="$withBase('/img/15.png')" class="center">

* Finalmente, luego de seleccionar las promociones asociadas a cada cliente, se
presionaría el botón “Grabar” para almacenar toda la información. Como se puede
observar, en este caso resulta más práctico definir las promociones de todos los
clientes juntos, así no se tiene que abrir una página nueva por cada uno. 

A modo de ejemplo se muestra como definir ésta grilla, en el código se puede
observar que la columna que define el tipo de oferta tiene el valor false en el atributo
readOnly:

``` xml
<grid name="grdOfertas">
<columns>
    <field-column title="Apellido" data="&amp;Ape" />
    <field-column title="Nombre" data="&amp;Nom" /> 
    <valuelist-column title="Oferta" data="&amp;Ofe" readOnly="false">
        <items>
        <item text="Prestamo X" value="PX" />
        <item text="Prestamo Y" value="PY" />
        <item text="Prestamo Z" value="PZ" />
        </items>
    </value-list-column>
</columns>
    <operations>
        <operation caption="Grabar" selection="none"/>
    </operations>
</grid> 

```
* Ingreso de registros: El otro uso típico es para ingresar datos masivos. Supongamos
el caso de un usuario que tiene que pasar una planilla extensa al sistema informático.
Aquí puede resultar más apropiado definir una grilla con campos en blanco para que
vaya llenando los datos como si fuera una planilla electrónica. El ingreso de esta
forma es más rápido porque evitamos tener que abrir una página por cada registro
que va a ingresar. Al llenar la grilla el usuario podría apretar un botón para agregar
una nueva página en blanco y poder seguir ingresando datos.


<img :src="$withBase('/img/16.png')" class="center">

En el siguiente ejemplo se muestra como se podría definir la grilla que está en la figura. El
aspecto más relevante es el atributo editable dentro del elemento grid. Con este atributo se
le puede dar la posibilidad al usuario de completar las filas vacías (valor completePage) o
incluso de permitirle también agregar nuevas páginas (valor enableAddPage).



``` xml
<grid name="grdMonedas" editable="enableAddPage">
    <columns> 
        <field-column title="Codigo" data="&amp;Cod" readOnly="false" />
        <field-column title="Nombre" data="&amp;Nom" readOnly="false" />
    </columns>
    <operations>
        <operation caption="Grabar" selection="none" />
    </operations>
</grid>

```

En resumen, el primer caso mencionado de grillas editables (Modificación de columnas
específicas) se implementa definiendo columnas sin aplicar el atributo readOnly, o asignando
false al mismo. En caso que la columna no se defina como de sólo lectura pasa a ser editable.

Para resolver el segundo caso se utiliza el atributo editable de las grillas. Este valor permite
definir el comportamiento cuando la grilla es editable. Por defecto el valor de este atributo es
normal y se comporta como se menciono hasta ahora, es decir, se habilita la edición en las
columnas que no se asignó el atributo readOnly o su valor sea false. Si se asigna el valor
completePage al atributo editable se agregan filas vacías en la grilla hasta completar su
tamaño, es decir, mientras la altura de la grilla sea mayor más filas se van a agregar (ver
sección 5.13.2 Altura de una grilla para más información). Finalmente se encuentra el valor
enableAddPage, si se asigna este valor se completa la grilla con filas vacías y se incluye un
botón que permite agregar una nueva página. Esta última opción permite seguir agregando
registros en nuevas páginas cuando se completa una. No olvidar que por defecto las
columnas no son editables, por lo que para escribir datos en las columnas antes que nada
hay que asignarle el valor false al atributo readOnly de las mismas.

Si se asigna el valor enableAddPage al atributo editable se debe escribir código para
almacenar los valores de la página cuando se agrega una nueva, de lo contrario se perderían.
Con este fin, el diseñador genera una subrutina con nombre “GU: Gr -> `<nombre de la grilla>`
(SavePage)”. Esta subrutina se invoca en los eventos que leen la base de datos para refrescar
los valores de la grilla, antes que se borre la página actual (siempre y cuando haya alguna
fila nueva). Específicamente, esta subrutina es llamada en los eventos de paginado, filtrado
y el propio agregado de página. Dentro de la subrutina se debe escribir código para almacenar
los valores de las filas que se agregaron en la página. Al generar la subrutina el diseñador
arma un segmento de código que muestra cómo recorrer las filas agregadas.

Cabe aclarar que en caso de tener operaciones con el atributo autorefresh en true, no se
invocará la subrutina destinada a guardar los datos de la página. En estos casos queda en
manos del programador hacer un uso adecuado de la misma desde el evento asociado a la
operación, para no perder los posibles datos ingresados por el usuario. Recordemos que en
las operaciones con autorefresh, luego de la ejecución del código de usuario, se refrescan
las grillas que están en su alcance (ver sección 4.2 Actualización de datos).

### Lectura de Valores en las Filas

Cuando se trabaja con grillas editables es necesario poder disponer de algún mecanismo
para leer los datos que ingresó el usuario. Al asignar true al atributo generateRead (del
elemento grid) el diseñador crea una subrutina que nos permite leer los valores de la grilla.

En el siguiente segmento de código vamos a definir una grilla para mostrar las monedas que
hay cargadas en la base de datos. En la grilla se incluirá una columna editable, y luego
utilizaremos las subrutinas de lectura para leer los valores que se ingresaron en dicha
columna.

``` xml
<grid name="grdMonedas" generateRead="true">
    <columns>
        <field-column title="Código" data="MonCod" />
        <field-column title="Nombre" data="MonNom" />
        <field-column title="Notas" data="&amp;MonNot" readOnly="false" />
    </columns>
</grid>
```

Debido a que se le asignó true al atributo generateRead cuando se genera la grilla el
diseñador crea la subrutina “GP: Leer fila &GP_K de grdMonedas”. Al invocar ésta subrutina
se cargan las variables asociadas a las columnas con los valores de la fila número GP_K. A
partir de ésta subrutina se puede iterar sobre las filas de la grilla y obtener los valores
ingresados en la columna editable. Para saber la cantidad de filas se puede consultar el valor
de la variable GP_Gr_`<nombre de la grilla>`_nFilas. 


Por ejemplo para leer los valores de la grilla anterior se debe escribir el siguiente código: 

``` genexus
For &GP_K = 1 To
&GP_Gr_grdMonedas_nFilas
// Carga los valores de la fila &GP_K
 Do 'GP: Leer fila &GP_K de grdMonedas'
    // PARA HACER: Procesamiento del la fila. En &GP_A_MonCod queda el
    // valor de la columna asociada al atributo MonCod, en &GP_A_MonNom
    // la columna asociada al atributo MonNom y en &MonNot la columna asociada
    // a la variable MonNot
EndFor

```

<img :src="$withBase('/img/17.png')" class="center">

El valor por defecto del atributo generateRead es auto. Esto significa que si la grilla tiene
selección múltiple se generaran automáticamente las subrutinas para leer las filas sin
necesidad de definir un atributo adicional. Aunque sólo se incluye la subrutina para leer las
filas chequeadas, se debe asignar el valor true para poder leer todas las filas. En caso de
asignar false al atributo generateRead no se genera ninguna de las subrutinas mencionadas
anteriormente.


Si se asigna true a generateRead y se tiene alguna operación con selección simple el
diseñador genera la subrutina “GP: Leer fila seleccionada de `<nombre de la grilla>`” para leer
la fila seleccionada, y si se tiene alguna operación con selección múltiple se genera, como se
mencionó, la subrutina “GP: Leer fila chequeada &GP_K de `<nombre de la grilla>`” para leer
las filas chequeadas.

### Escribir Valores en las Filas 

En caso que queramos modificar los valores de la grilla desde código debemos asignar el
valor true al atributo generateWrite (del elemento grid). Al generar el diseñador definirá
subrutinas para escribir sobre las filas. Veamos la siguiente definición:

``` xml
<grid name="grdMonedas" generateWrite=”true”>
    <columns>
        <field-column title="Código" data="MonCod" />
        <field-column title="Nombre" data="MonNom" readOnly="false" />
        <field-column title="Notas" data="&amp;MonNot" readOnly="false" />
    </columns> 
</grid>
```

Cuando se asigna true a generateWrite el diseñador genera la subrutina “GP: Escribir fila
&GP_K de

`<nombre de la grila>`” para escribir valores en la grilla. En caso que haya operaciones con
selección simple también genera la subrutina “GP: Escribir fila seleccionada de `<nombre de la grilla>`”, si hay operaciones con selección múltiple genera la subrutina “GP: Escribir fila
chequeada &GP_K de `<nombre de la grilla>`” y en caso que se puedan ingresar filas nuevas
(atributo editable distinto de normal) también genera la subrutina “GP: Escribir fila nueva
&GP_K de grdMonedas”. 

Por ejemplo, para escribir los valores de las filas visibles se podría usar el siguiente código: 

``` genexus
For &GP_K = 1 To &GP_Gr_grdMonedas_nFilas
    // PARA HACER: Cargar los valores de &GP_A_MonCod, &GP_A_MonNom y
    // &MonNot con los valores que se quieren escribir en la fila
    &GP_K
    // Escribe los valores de la fila &GP_K
    Do 'GP: Escribir fila &GP_K de grdMonedas'
EndFor
``` 

Si se tiene selección simple, para cambiar los valores de la fila seleccionada el código
es el siguiente:

``` genexus
// PARA HACER: Cargar los valores de &GP_A_MonCod, &GP_A_MonNom y
// &MonNot con los valores que se quieren escribir
// Escribe los valores de la fila seleccionada
    Do 'GP: Escribir fila seleccionada de grdMonedas'
``` 
Si se tiene selección múltiple, para cambiar únicamente los valores de las filas que están
chequeadas el código es el siguiente:

``` genexus
For &GP_K = 1 To &GP_Gr_grdMonedas_nFilasCheq
    // PARA HACER: Cargar los valores de &GP_A_MonCod, &GP_A_MonNom y
    // &MonNot con los valores que se quieren escribir en la fila chequeada &GP_K
    // Escribe los valores de la fila chequeada
    Do 'GP: Escribir fila chequeada &GP_K de grdMonedas'
EndFor
```

Si la grilla soporta agregar nuevas filas, para cambiar únicamente los valores de las filas que
agregó el usuario el código es el siguiente:

``` genexus
For &GP_K = 1 To &GP_Gr_grdMonedas_nFilasNuevas
    // PARA HACER: Cargar los valores de &GP_A_MonCod, &GP_A_MonNom y 
    // &MonNot con los valores que se quieren escribir en la fila nueva &GP_K
    // Escribe los valores de la fila nueva
    Do 'GP: Escribir fila nueva &GP_K de grdMonedas'
EndFor
``` 