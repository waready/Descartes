# Validaciones

## Conceptos Básicos 

Dentro del diseñador se ofrecen una serie de atributos para hacer validaciones sobre la
interfaz. Estas funcionalidades tienen el fin de generar automáticamente el código de
validaciones para una serie de situaciones sencillas, pero que son muy habituales dentro del
desarrollo de aplicaciones y de esta forma nos evitamos tener que escribir código para
resolverlas cada vez.

Estas validaciones incluyen:

* Verificar que un campo no haya quedado vacío
* Determinar que la selección sea correcta al presionar una operación de una grilla
* Reportar un error cuando no se ingresa un identificador valido en una dependencia 

## Campos Vacíos


Dentro de los campos de los formularios de la interfaz se incluye el atributo allowNull, este
atributo permite indicar si vamos a permitir que se ingrese un campo vacío o no. Con esta
funcionalidad podemos marcar, por ejemplo, que al ingresar los datos de una persona no
podemos dejar el nombre y el apellido vacíos. En la siguiente definición se ejemplifica esta
situación:

``` xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
    <web-ui title="Persona" class="other">
        <form>
            <field caption="Nombre" data="&amp;PerNom" readOnly="false" allowNull="false" />
            <line-break />
            <field caption="Apellido" data="&amp;PerApe" readOnly="false" allowNull="false" />
        </form>
        <operations>
            <operation caption="Confirmar" validateData="true" />
            <operation caption="Cancelar" validateData="false" />
        </operations>
    </web-ui>
</object-definition>
```

Tener en cuenta que el valor por defecto del atributo allowNull es false. Por lo tanto, si
queremos darle al usuario la posibilidad de dejar el campo vacío se debe asignar true a dicho
atributo.

Al definir las operaciones debemos indicar que operaciones necesitan validación y cuales no.
En el ejemplo anterior se ve como indicamos el valor true en el atributo validateData de la
operación “Confirmar”. Esto le indica al diseñador que al generar el código de la operación
debe validar que los datos cumplan las condiciones definidas antes de invocarla, es decir,
que el nombre y el apellido no estén vacíos. Si no se cumplen las condiciones de validación
se despliega uno o mas mensajes de error, y no se ejecuta el código de la operación.

En caso que no queramos que se hagan las validaciones en una operación debemos asignar
false al atributo validateData, u omitirlo, ya que su valor por defecto es false. 

## Control de Selección 

Otra de las validaciones implementadas consiste en un control de selección sobre las grillas.
Esta validación se realiza de forma automática al indicar el tipo de selección que requiere
una operación de una grilla. Por ejemplo, si definimos una operación de una grilla con
selección simple (selection = “single”), se genera código para validar que haya una fila
seleccionada al presionar la operación. En caso que presionemos el botón asociado a la
operación y no haya una fila seleccionada, se despliega un error y no se ejecuta el código de
la operación.

Esta validación también se hace cuando la selección es multiple (selection=“multiple”). Si se
presiona una operación con selección multiple se valida que haya al menos una fila
chequeada, si no hay ninguna se muestra un error y no se ejecuta la operación. 

## Chequeo de Existencia en Dependencias

Al definir una dependencia se genera una subrutina en la cual debemos escribir código
GeneXus para cargar los datos que se infieren en la dependencia (por ejemplo, el nombre de
un producto a partir de su código). Cuando se ingresa un valor en la dependencia y se ejecuta
este código pueden pasar dos cosas: que se logre identificar un elemento y se pueda determinar el valor inferido (es decir, que se haya ingresado el código de un producto valido)
o que el valor ingresado no corresponda a ningún elemento

Dentro de la subrutina generada se proporciona una variable que permite indicar si la
dependencia se cargó con éxito o no. Al presionar una operación se intentan cargar las
dependencias, si alguna no se puede cargar (y la dependencia no es de sólo lectura) y la
operación está definida con el valor true en el atributo validateData se despliega un error y
no se ejecuta la operación. Este control sólo se realiza para las dependencias que estén en
el alcance de la operación, por ejemplo, si la operación está definida a nivel de la página se
cargan todas las dependencias, y si está definida en una categoría o subcategoría se cargan
únicamente las dependencias de las categoría o subcategoría. En caso que la operación no
tenga el valor true en el atributo validateDate se ejecuta la operación aunque no se pueda
cargar alguna dependencia y no se muestran errores.

La funcionalidad de chequeo de existencia en dependencias garantiza que, al ejecutar una
operación que requiere validación, todas las dependencias del alcance se hayan podido
cargar correctamente. Se recomienda asignar el valor true al atributo validateData a todas
las operaciones que confirmen datos ingresados dentro de la página.



