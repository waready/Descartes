# Operaciones

## Conceptos Básicos

Las páginas Web por lo general se componen de un formulario y botones para realizar
operaciones. En la sección anterior exploramos los elementos básicos que ofrece el
diseñador para definir el formulario, aquí analizaremos la definición de operaciones.

Las operaciones determinan las acciones que el usuario puede hacer sobre la página. Al
generar la página Web, cada operación se representará como un botón que puede presionar
el usuario. Las operaciones se definen en el elemento operations dentro de web-ui. A continuación se muestra un ejemplo de una página Web que define la operación “Confirmar”
y “Cancelar”: 

```xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
 <web-ui title="País" class="other">
    <form>
        <field caption="Código" data="&amp;Cod" readOnly="false" allowNull="false" />
        <line-break />
        <field caption="Nombre" data="&amp;Nom" readOnly="false" allowNull="false" />
    </form>
    <operations>
        <operation caption="Confirmar" validateData="true" />
        <operation caption="Cancelar" validateData="false" />
    </operations>
 </web-ui>
</object-definition> 
```
La definición anterior contiene un campo para el código, otro para el nombre, una operación
para confirmar la creación del país, y otra para cancelar el ingreso.

Como se puede observar, por cada operación se debe utilizar un elemento operation que
debe contener en el atributo caption la etiqueta asociada al botón. Adicionalmente, el
ejemplo contiene el atributo validateData que indica si la operación requiriere validación de
datos o no.

Al ejecutar este objeto, si se presiona la operación “Confirmar”, y el código o nombre están
vacíos, se mostrará un error y no se ejecutará la operación. Esto se debe a que los campos
no permiten valores nulos y la operación “Confirmar” realiza validación de datos. Por otro
lado, al presionar cancelar no se validan los datos ingresados porque validateDate tiene el
valor false. El valor por defecto de validateData es false, por lo tanto, si no se especifica el
atributo no se realizan validaciones. Para obtener más información con respecto a las
validaciones se recomienda leer la sección 11.0 Validaciones.

Hasta ahora hemos definido la apariencia visual de la página Web, y algunas validaciones
sencillas, sin embargo aún nos está faltando definir el código que se ejecuta al presionar los
botones de las operaciones. Cuando se genera la definición el diseñador crea una subrutina
por operación. Dentro de estas subrutinas debemos escribir el código asociado a la
operación, y el diseñador se encarga de invocar a la subrutina cuando se presiona el botón
correspondiente.

En el ejemplo anterior la subrutina asociada a la operación “Confirmar” se define de esta
forma:

```genexus
    Sub 'GU: Op -> Confirmar (Click)' //$ ...
        // PARA HACER: Ingrese el código que se ejecuta al realizar la operación
    EndSub // 'GU: Op -> Confirmar (Click)' 
```
Dentro de esta subrutina debemos poner el código asociado a la operación “Confirmar”, por
ejemplo, una invocación a un procedimiento para crear un registro en la tabla de países.

Observar que la subrutina es de usuario (tiene prefijo “GU”), por lo tanto, al volver a generar
la definición no se modificará el código escrito en la subrutina.

## Actualización de Datos Luego de Presionar una Operación 

Cuando la página contiene grillas se debe tener precaución al modificar la base de datos
desde las operaciones, porque si modificamos alguna tabla asociada a una grilla, ésta no se
actualizará a menos que lo indiquemos. Es decir, si tenemos una grilla que muestra la lista
de países y desde una operación agregamos un registro en la tabla de países, no se verá el
nuevo registro en la grilla a menos que asignemos el valor true al atributo autoRefresh en el
elemento operation de la operación. Esta asignación provoca que, luego de ejecutarse la
operación, se vuelva a ejecutar el código que carga los datos en la grilla. Si no se asigna este
valor al atributo autoRefresh, no se reflejarán los cambios realizados en las grillas.

Al utilizar la opción autoRefresh se refrescan los datos de las grillas que estén dentro del
alcance de la operación. El alcance es el conjunto de elementos que puede afectar la
operación. Como veremos más adelante se pueden definir categorías y subcategorías, y
operaciones a nivel de una categoría o subcategoría; en estas situaciones el alcance es la
categoría o subcategoría, y sólo se refrescarán las grillas que estén definidas dentro de éstas.
También se pueden definir operaciones a nivel de una grilla, y aquí sólo se refrescará la grilla
a la cual están asociadas.

El atributo autoRefresh brinda un mecanismo sencillo para actualizar grillas que estén dentro
del mismo alcance de la operación, lo cual puede ser suficiente para la mayoría de los casos.
Sin embargo, para darle mayor flexibilidad al esquema también se proporciona el atributo
refreshGrids, el cual permite indicar de forma explícita que grillas se actualizan (en caso que
sea más de una se deben separar con comas), por ejemplo, si se necesitan actualizar las
grillas grdClientes y grdPaises se debe asignar el valor “grdClientes, grdPaises”.
Por defecto no se refrescan las grillas para evitar introducir carga innecesaria en la base de
datos y mejorar el rendimiento global de la aplicación. Por este motivo, cada vez que sea
necesario volver a cargar grillas es preciso indicarlo explícitamente.

El atributo autoRefresh no sólo se aplica en las grillas, sino que se utiliza también para
indicar si es necesario actualizar los datos de la página estamos volviendo de otra.
Supongamos que estamos en la página A y creamos una operación que nos hace ir a la
página B. Luego dentro de la página B apretamos una operación que nos hace volver a la
página A. Al volver, si la operación que nos hizo ir a la página B tiene el valor true en el atributo
autoRefresh se vuelven a cargar las grillas de la página A. La implementación de estos
esquemas de navegación se analizará en la sección 8.0 Navegación.

## Operaciones que requieren recarga de datos en el panel invocador 
En ocasiones se puede requerir que al realizar una modificación en los datos de un panel, se
actualicen los datos del panel invocador. Por ejemplo, si estamos en un panel que nos permite visualizar y modificar las comisiones de un préstamo, pero solo si se modifican
debemos actualizar los valores en el panel que invoca al de comisiones, debemos:

* Agregar a las operaciones que nos permiten modificar datos de las comisiones el
atributo clientRefreshEvents:
        ``` xml
            <operation caption="Agregar" clientRefreshEvents="CambioComisión" /> 
        ```
* Incluir en el web-ui del panel que invoca al de comisiones el atributo clientRefreshIf
        ``` xml
            <web-ui title="Persona" clientRefreshIf="CambioComisión" class="other">
        ```

## Operaciones con Confirmación 

Las operaciones pueden ser definidas con confirmación asignando el valor true al atributo
confirmation. Al definir una operación con confirmación, cuando el usuario realice la
operación se le pedirá una confirmación, y sólo se ejecutará el código asociado a la misma
si la confirma. A continuación se muestra un ejemplo de una operación con confirmación 

        ``` xml
            <operation caption="Borrar" confirmation="true" /> 
        ```

El uso de confirmaciones ayuda a evitar que el usuario realice acciones irreversibles por
accidente. Se recomienda pedir confirmaciones en operaciones para borrar y cualquier otra
que pueda producir un impacto importante en el sistema y su mal uso pueda provocar daños
difíciles de reparar

<img :src="$withBase('/img/07.png')" class="center">

## Preconfirmación

En algunas situaciones puede ser necesario determinar si se va a pedir confirmación en
tiempo de ejecución. Por ejemplo, si se tiene una operación que debita un montó de una
cuenta se podría pedir confirmación cuando el saldo va a quedar negativo.

Para resolver estas situaciones se debe utilizar el atributo generatePreConfirmation. Al
asignar true a este atributo se genera una subrutina en donde podemos evaluar si es
necesaria una confirmación. En el ejemplo anterior si se asigna true a
generatePreConfirmation se genera la siguiente subrutina:

```genexus
    Sub 'GU: Op -> Transferir (Pre-Confirmation)' //$ ... 
        // PARA HACER: Ingrese el código que verifica si es necesaria una
        // confirmación para la operación. La variable
        &GP_Op_Confirmada tendrá
        // el valor 'N' en caso de no haberse mostrado la confirmación aún, y 'S'
        // en caso que el usuario ya haya confirmado la operación
        // OBS1: Para evitar que se muestre la confirmación al usuario debe asignar // el valor 'N' a la variable
        &GP_Op_Transferir_MostrarConf, por defecto es // 'S'
        // OBS2: Para cambiar el mensaje de la confirmación debe asignarse el nuevo
        // texto a la variable &GP_Op_Transferir_TextoConf
    EndSub // 'GU: Op -> Transferir (Pre-Confirmation)'
```

Dentro de esta subrutina podemos escribir código que se ejecuta antes de mostrarle
confirmación. Adicionalmente, al generar una operación con preconfirmación se crean dos
variables que nos permiten controlar si mostramos o no la confirmación (variable
GP_Op_Transferir_MostrarConf) y el texto de la confirmación (variable
GP_Op_Transferir_TextoConf). En los comentarios de la subrutina generada se explica cómo
utilizarla, cómo se puede observar en caso que no queramos mostrar una confirmación
podemos asignarle “N” a la variable GP_Op_Transferir_MostrarConf.

La subrutina de preconfirmación se ejecuta antes de mostrar una confirmación y también
luego de confirmarla (pero antes de ejecutar la operación). Es decir, cuando el usuario
confirma la operación se vuelve a ejecutar la subrutina de preconfirmación y luego se ejecuta
la operación. Este comportamiento está definido así por seguridad, ya que, un uso común de
la subrutina de preconfirmación es para hacer validaciones antes de mostrarle una
confirmación, y durante la confirmación el usuario podría hacer cambios en la página. Por lo
tanto, es necesario volver a hacer las validaciones luego de la confirmación y así evitar que
se ejecute la operación en una situación no permitida. Sin embargo, a pesar que la subrutina
de preconfirmación se vuelva a ejecutar, no se mostrará nuevamente la confirmación. Se
ofrece la variable GP_Op_Confirmada para poder conocer si ya se realizó la confirmación o
no.

La subrutina de preconfirmación sirve principalmente para resolver tres situaciones:
* Hacer validaciones antes de mostrar una confirmación: Por ejemplo, podríamos
validar los datos que ingresó el usuario y si detectamos que no son correctos
podríamos mostrarle un error antes de pedir la confirmación. Si se reporta un error
dentro de la subrutina de pedido de confirmación, se muestra el error y no se pide
confirmación ni se ejecuta la operación. En caso que no tuviéramos este mecanismo
tendríamos que hacer la validación dentro de la subrutina asociada a la operación, y
el usuario tendría que confirmar la operación para ver el error.
 En el siguiente ejemplo se reporta un error si la cuenta de origen no tiene fondos: 

```genexus
    Sub 'GU: Op -> Transferir (Pre-Confirmation)' //$ ...
        // Verifica si hay fondos en la cuenta de origen
        Call(PVerificarFondos, &CuentaOrigen, &CuentaDestino, &TieneFondos)
        If (&TieneFondos = "N")
            // No hay fondos, reporta un error
            &GP_Mensaje = Udp(PFRRepMsg, "La cuenta de origen no tiene fondos suficientes.", "E")
            Do 'GP: Reportar mensaje'
        EndIf
    EndSub // 'GU: Op -> Transferir (Pre-Confirmation)'

```
* Determinar si mostramos una confirmación en tiempo de ejecución: En la subrutina
de preconfirmación podemos escribir código para determinar si mostramos la
confirmación según alguna situación particular utilizando la variable
GP_Op_`<nombre de la operación>`_MostrarConf). En el ejemplo de la transferencia
de una cuenta a otra, podríamos utilizar este mecanismo para pedir una confirmación
únicamente si no hay suficientes fondos en la cuenta de origen y va a quedar con un
saldo sobregirado: 


```genexus
    Sub 'GU: Op -> Transferir (Pre-Confirmation)' //$ ...
        // Verifica si hay fondos en la cuenta de origen
        Call(PVerificarFondos, &CuentaOrigen, &CuentaDestino, &TieneFondos)
        If (&TieneFondos = "N")
            // No hay fondos, reporta un error
            &GP_Mensaje = Udp(PFRRepMsg, "La cuenta de origen no tiene fondos suficientes.", "E")
            Do 'GP: Reportar mensaje'
        EndIf
    EndSub // 'GU: Op -> Transferir (Pre-Confirmation)'
```

* Reportar información adicional: Otra situación podría ser la siguiente: queremos pedir
siempre confirmación, pero además queremos notificar al usuario cuando la cuenta
se va a quedar sin fondos. Una posibilidad podría ser modificar el texto de
confirmación cuando no tiene fondos y así advertirle al usuario del caso. Sin embargo,
con esta solución es muy probable que el usuario no perciba que la cuenta no tiene
fondos porque va a estar acostumbrado a confirmar la operación y no va a leer el
mensaje. Una solución más adecuada sería generar una advertencia que indique que
la cuenta no tiene fondos, ya que las advertencias se muestran separadas del texto
de confirmación y es más probable que el usuario las perciba.

En el siguiente ejemplo se muestra como implementar esta solución: 

```genexus
    Sub 'GU: Op -> Transferir (Pre-Confirmation)' //$ ...
    // Verifica que aún no se confirmó, para no mostrar la advertencia
    // luego que el usuario confirmó la operación
        If (&GP_Op_Confirmada = "N")
            // Verifica si hay fondos en la cuenta de origen
            Call(PVerificarFondos, &CuentaOrigen, &CuentaDestino,&TieneFondos)
            If (&TieneFondos = "N")
                // No hay fondos, reporta una advertencia 
                &GP_Mensaje = Udp(PFRRepMsg, "La cuenta de origen no tiene fondos suficientes.", "W")
                Do 'GP: Reportar mensaje'
            EndIf
        EndIf
    EndSub // 'GU: Op -> Transferir (Pre-Confirmation)' 
```

<img :src="$withBase('/img/08.png')" class="center">

Para más información sobre reporte de mensajes ver sección 9.0 Reporte de
errores/advertencias.

## Tecla Asociada
A través del atributo key (del elemento operation) se puede asociar la tecla Enter a una
operación. Si definimos una operación con el valor enter en el atributo key, durante la
ejecución de la página al apretar la tecla Enter obtenemos el mismo efecto que al hacer clic
sobre el botón de la operación. 

## Definiendo si está Visible y Habilitada en Tiempo de Ejecución
El mecanismo es igual al que se comentó en el elemento field. Ver sección 10.0 Propiedades
dinámicas para más información. 

## Nombre Asociado
De la misma forma que las dependencias, las operaciones tienen un nombre que se utiliza
para generar los nombres de las subrutinas asociadas a la operación. El nombre se define
en el atributo name. Si no se define un nombre se utiliza el valor del atributo caption para
generar los nombres de las subrutinas. 

## Operaciones que abren Prompts
Existe una clase particular de operaciones que permiten abrir un prompt al ejecutar la
operación. Cuando se define una operación con el elemento operation se crea una subrutina
que permite ejecutar código en el servidor, y dentro de esa subrutina se podría ir a otra
página. En cambio, las operaciones de tipo prompt permiten abrir una página por encima de
la página actual, sin necesidad de irse de la página actual.

Este tipo de operaciones se pueden usar para pedir datos adicionales, realizar alguna acción
o mostrar información sin perder de vista la página actual. Se recomienda utilizar este tipo
de operaciones únicamente en caso particulares donde permitan mejorar la usabilidad de
una página Web.

Para definir operaciones que abren prompt se utiliza el elemento prompt-operation, en lugar
de operation. A continuación se muestra un ejemplo:



``` xml
    <prompt-operation caption="Plan de pagos" object="HPlanPagos" params="&amp;PreId" /> 
```

Esta es una operación que podría estar en una página Web donde se muestran los pagos de
un préstamo, y al presionar el botón asociado a la operación se podría mostrar un prompt
con el plan de pagos del préstamo. La ventaja del uso de un prompt en esta situación es que
permitirá ver el plan de pagos del préstamo sin perder de vista los pagos realizados.

Para definir un prompt se indica el objeto (un WebPanel generado con clase prompt) y la lista
de parámetros con qué se invoca al prompt. En la lista de parámetros se pueden incluir
también parámetros de salida que serán actualizados luego de cerrar el prompt.

A diferencia de las operaciones definidas con el elemento operation, con las operaciones de
tipo prompt no se genera una subrutina para escribir código, ya que la operación
simplemente abre un prompt. Sin embargo, dentro del elemento prompt-operation se dispone
del atributo generateEvent para definir también una subrutina que se invoca luego de cerrar
el prompt.

Al asignar el valor true al atributo generateEvent se genera una subrutina que se invoca en
el servidor inmediatamente después de cerrar el prompt. En caso que el prompt se haya
definido con botones de aceptar y cancelar (ver sección 2.8 Prompts para ingreso de datos),
la subrutina se invoca únicamente si se acepta el prompt.

Dentro del elemento prompt-operation también se dispone de los atributos autoRefresh,
confirmation, generatePreConfirmation, key, name y validateData. Estos atributos tienen el
mismo significado que en el elemento operation. También se dispone de los elementos hijos
enabled y visible para controlar si la operación está visible y/o habilitada.

El uso de algunos de los atributos anteriores puede forzar a que luego de cerrar el prompt
se haga una invocación dentro del servidor Web, por ejemplo, si indicamos que la operación
tiene preconfirmación, se ejecuta una subrutina en el servidor para realizar la
preconfirmación luego de cerrar el prompt. En resumen, se envía un pedido al servidor (luego
de cerrar el prompt) cuando vale true al menos uno de estos atributos: autoRefresh,
confirmation, generateEvent, generatePreConfirmation o validateData.