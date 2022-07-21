# Descartes4.1 –Agregados
[[toc]]
## Pantallas Anchas 

El ancho de las pantallas normales (no de los prompts) se puede modificar con el atributo
width en el elemento web-ui. Los valores que acepta son medium (mediano, valor por defecto)
y large (grande). En caso de definirlo como large la pantalla se ajusta a una resolución de
1024 píxeles de ancho, en lugar de lo usual que es 800 píxeles.

## Altura y Ancho de Campos de Texto



El ancho de los campos de texto (elementos field o elementos column -dentro de filtros- con
variables de tipo Character, VarChar o LongVarChar) se puede controlar con el atributo width.
Su valor es un número que indica la cantidad de caracteres que se quieren mostrar en él.
Adicionalmente, en el caso que se defina un ancho manualmente, se puede definir una altura
(sólo para variables de tipo VarChar o LongVarChar) con el atributo height. Su valor es un
número que indica la cantidad de renglones que se quieren mostrar en el campo.



## Prompts con Autorefresh

A cualquier elemento prompt se le puede asociar el atributo autoRefresh, que en caso de
valer true, va a forzar que la pantalla se refresque luego de que el prompt devuelve su valor.
Por ejemplo, si se quiere que luego de devolver el valor de una dependencia se refresque la 
pantalla se hace así: `<dependency caption="País" determinants="&amp;PaiCod" dependents="&amp;PaiNom"> <prompt object="HPmtPais" params="&amp;PaiCod,&amp;PaiNom" autoRefresh="true" /> </dependency>` Si el prompt se cierra de una forma. que no devuelva valores (por ejemplo presionando Alt+F4) no se refresca la página padre.


## Opciones de Refrescado en Check-Box y Value-List con style=”radioButton”

Se agregó a los elementos check-box la posibilidad de generar refrescados automáticos o
bien directamente generar un evento en el servidor que es invocado cuando el usuario
modifica el valor del mismo. Las opciones son similares a las de los elementos value-list y se
listan a continuación:
* Atributo autoRefreshOnChange="true": refresca la pantalla automáticamente la pantalla
* Atributo refreshGridsOnChange="grid1, grid2, ...": refresca las grillas listadas automáticamente
* Atributo refreshChartsOnChange="chart1, chart1, ...": refresca las gráficas listadas automáticamente
* Atributo generateEventOnChange="true": genera un evento de usuario que se ejecuta cuando el valor del campo cambia

Adicionalmente todas estas opciones están disponibles en los elementos value-list con estilo
tipo radio button (style=”radioButton”)

## Grillas

### Grillas Editables


Se agregó una nueva funcionalidad que permite definir grillas edtiables que mantienen
automáticamente los cambios hechos por el usuario al paginar, filtrar o al refrescar. De esta
forma se puede, por ejemplo, permitir que el usuario modifique varios registros (de diferentes
páginas) y solamente al final presione una operación para grabar todos los cambios hechos.
En el atributo editable de las grillas es posible definir dos nuevos valores:

* Valor keepValues: indique que se mantenga el valor de los campos editables
* Valor keepValuesWithAddRow: además de mantener los valores de los campos

editables, agrega un botón llamado “Agregar Fila” que permite al usuario agregar filas
al final de la grilla para ingresar nuevos registros (también se pueden agregar con la
tecla ENTER) 

Para obtener el comportamiento descrito es imprescindible definir el menos una columna
con el atributo keepValuesKey="true". Las columna o columnas marcadas con ese atributo en true van a ser los identificadores de los registros a nivel de la grilla (esto se necesita para
el manejo interno del mantenimiento del estado de los mismos). Por este motivo, no se puede
repetir la combinación de sus valores en dos filas diferentes (puede ser una columna autoenumerada oculta por ejemplo).

El modelo se sustenta en lo siguiente:
* Toda modificación, borrado o inserción sobre la grilla se graba en una tabla interna
de Descartes
* Al hacer la carga de la grilla se valida automáticamente por cada registro a agregar si
fue modificado (se muestra con las modificaciones), borrado (se ignora) o nuevo (se
considera como un registro más)
* Los cambios deben ser impactados manualmente en la tabla real de la base de datos;
para lograr esto se debe utilizar la rutina 'GP: Leer fila modificada &GP_K de
NombreGrilla' que carga en las variables correspondientes todos los valores de la fila
indicada en la variable &GP_K y adicionalmente en la variable
&GP_Gr_TipoModificacionFila un valor que indica el tipo de modificación realizada:

        1 FRRecordModification.New - registro nuevo

        2 FRRecordModification.Modified - registro modificado

        3 FRRecordModification.Deleted - registro borrado

A modo de ejemplo, el código de un WebPanel que impacta los datos de una grilla de este
tipo en la base de datos luciría así: 

``` genexus
For &GP_K = 1 To &GP_Gr_NombreGrilla_nFilasModificadas
    Do 'GP: Leer fila modificada &GP_K de NombreGrilla'
    Do Case
        Case &GP_Gr_TipoModificacionFila = FRRecordModification.New
            Call(PXXX, 'INS',...)
        Case &GP_Gr_TipoModificacionFila = FRRecordModification.Modified
            Call(PXXX, 'UPD',...)
        Case &GP_Gr_TipoModificacionFila = FRRecordModification.Deleted
            Call(PXXX, 'DLT',...)
    EndCase
EndFor
```

Adicionalmente se genera una rutina llamada 'GP: Restaurar grilla NombreGrilla' que permite
descartar todas las modificaciones realizadas hasta el momento por el usuario al ser
invocada. Se debe tener en cuenta que si la grilla se refresca de cualquier otra forma, se van
a seguir considerando las modificaciones hechas por el usuario. Por último se agregó otro
atributo relacionado con este tipo de grillas llamado generateDelete, que si se define con el
valor true genera una columna de check-box y un rutina llamada 'GP: Borrar registros
chequeados de NombreGrilla' que al ser invocada marca como eliminados todos los registros
que el usuario haya marcado en esa columna.

### Optimización de Acceso a la Base de Datos

Se agregó el atributo selectTopOptimization en el elemento grid, que en caso de definirse con
el valor true provoca optimiza los lecturas a la base de datos para cargar los elementos de la
grilla. En caso de tener tabla base (ver manual de Descartes sección 5) es completamente
automático, en caso de no tener tabla base (todas las columnas son variables) se genera un
comentario explicativo en el evento de carga: 


``` genexus
// OBS: En la variable &GP_Gr_NombreGrilla_nRegistros se encuentra el número máximo de
// registros que se deben agregar a la grilla. En caso que todos los filtros se
// escriban en los "Where" del "For Each" se puede utilizar el procedimiento
// "FRForEachMax" para optimizar la interacción con la Base de Datos
```

Entonces, si se está en un caso optimizable según lo explicado, se debe agregar la siguiente
línea de código al principio del evento: 

``` genexus
Call(PFRForEachMax, &GP_Gr_NombreGrilla_nRegistros)
```

### Columnas de Grillas para Ingreso de Contraseñas

Al igual que los elementos field, los elementos field-column soportan el atributo isPassword.
En caso de definirse su valor en true, se oculta el texto ingresado por el usuario.

### Carga por Fila de Columnas con Lista de Valores


Se agrega la posibilidad de generar un evento de usuario que se invoca exactamente antes
de cargar una fila de la grilla de forma de poder definir un conjunto de valores diferente para
las columnas de tipo value-list-column. El atributo para lograrlo es generateLoadPerRow, y en
caso de definirse con el valor true genera una evento similar al siguiente: 


``` genexus
Sub 'GU: Vl -> TituloColumna (LoadPerRow)' //$ ...
// PARA HACER: Ingrese el código que carga los valores posibles de
// la lista de valores por fila
EndSub // 'GU: Vl -> TituloColumna (LoadPerRow)
```
Al momento ejecutar ese evento, todas las variables asociadas a las columnas de la grilla
tienen el valor concreto de la fila que se está escribiendo.

### Columnas de Tipo Prompt

#### Título

Se puede definir un título a las columnas de tipo prompt-column mediante el atributo title.
Por defecto el mismo es vacío.

#### Evento en el Servidor Previo a la Apertura

Se puede generar un evento de usuario previo a la apertura del prompt en una columna de
tipo prompt-column. Esto se logra definiendo el valor true en el atributo
generatePreOpenEvent. El resultado será similar al siguiente: 

``` genexus
Sub 'GU: PrCol -> TituloColumna (Pre-Open)' //$ ...
// PARA HACER: Ingrese el código que se ejecuta previo a la apertura del "prompt".
// OBS1: Para evitar que se muestre el "prompt" al usuario debe asignar el valor 'N'
// a la variable &GP_PrCol_TituloColumna_MostrarPrompt, por defecto es 'S'
EndSub // 'GU: PrCol -> 333 (Pre-Open)' 
```

Como se indica en el comentario asociado, si se quiere evitar que se abra el prompt, se puede
asignar el valor 'N' en la variable &GP_PrCol_TituloColumna_MostrarPrompt.

## Evento Previo a la Apertura en Prompt-Opertation

Al igual que se presentó en la sección 5.5.2, las operaciones de tipo prompt-operation tienen
el atributo generatePreOpenEvent, que se comporta de forma similar a la descrita en esa
sección

##  Confirmación en Client-Operation

Al igual que las operaciones normales, se agregó en las client-operation la posibilidad de
generar confirmaciones automáticas y controlar las mismas mediante los siguientes
atributos

* Atributo confirmation="true": genera una confirmación al presionar la operación
* Atributo confitmationText="texto de la confirmación": modifica el texto de la confirmación
* Atributo generatePreConfirmation="true": genera un evento de usuario asociado a la confirmación


