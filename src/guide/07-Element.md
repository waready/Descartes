# Categorías y Subcategorías
[[toc]]
## Conceptos Básicos 

Con el fin de poder organizar mejor la información en páginas con mucho contenido de datos
se provee el concepto de categorías y subcategorías. Estos dos conceptos permiten realizar
agrupaciones de datos y asociarles un título.

En general no se recomienda hacer páginas con demasiados datos para evitar tener que
utilizar la barra de desplazamiento vertical para observar todos los datos. Sin embargo, en
algunas páginas puede ser más práctico mostrar todos los datos juntos y así evitar que el
usuario tenga que navegar por distintas páginas para ver toda la información que necesita.
Se debe analizar cada caso de forma particular y evaluar cuál es el mejor medio de
presentación en función de las necesidades del usuario.

En el siguiente ejemplo se muestra una definición con categorías y subcategorías:

<img :src="$withBase('/img/19.png')" class="center">

``` xml
<object-definition libraryName="Dlya.Basic" libraryVersion="1.0" designer="WebUI">
    <web-ui title="Persona" class="other">
        <form>
            <category title="Datos generales">
                <form>
                    <field caption="Nombre" data="&amp;PerNom" allowNull="false" readOnly="false" />
                    <line-break />
                    <field caption="Apellido" data="&amp;PerApe" allowNull="false" readOnly="false" />
                    <sub-category title="Teléfono">
                    <form>
                        <field caption="Casa" data="&amp;PerTelCas" readOnly="false" />
                        <field caption="Trabajo" data="&amp;PerTelTrb" readOnly="false" />
                        <field caption="Celular" data="&amp;PerCel" readOnly="false" />
                    </form>
                </sub-category>
                </form>
            </category>
            <category title="Domicilios">
                <form>
                    <grid name="grdDomicilios">
                        <columns>
                            <field-column title="Calle" data="&amp;DirCal" />
                            <field-column title="Número" data="&amp;DirNum" />
                            <field-column title="Apto" data="&amp;DirApt" />
                        </columns>
                        <operations> 
                            <operation caption="Agregar" selection="none" /> 
                            <operation caption="Borrar" selection="single" />
                        </operations>
                    </grid>
                </form>
            </category>
        </form>
        <operations>
            <operation caption="Confirmar" validateData="true" />
            <operation caption="Cancelar" validateData="false" />
        </operations>
    </web-ui>
</object-definition>

```

Las categorías se definen con el elemento category dentro del elemento form (de web-ui). El
título de la categoría se indica en el atributo title, y el formulario de la categoría se define
dentro del elemento form. De forma análoga, las subcategorías se definen con el elemento
sub-category dentro del elemento form (de category), y estas también tienen un título y un
formulario. Tanto en el caso de las categorías, como en el de las subcategorías, el formulario
se define de la misma forma que en el elemento web-ui y se soportan los mismos elementos
(exceptuando category). Al definir una categoría se puede utilizar el elemento sub-category
(dentro de la definición del formulario) para agregar una subcategoría.

En caso de utilizarse categorías, al definir una pantalla no pueden haber elementos que no
sean categorías dentro del formulario (elemento form) del web-ui. Es decir, o bien no hay
categorías ni subcategorías y todos los datos están a nivel de la página, o bien no hay datos
a nivel de la página y los mismos se encuentran dentro de alguna categoría o subcategoría.

## Operaciones 
En las categorías y subcategorías también se pueden asociar operaciones. Al definir
operaciones a este nivel, visualmente se representan dentro en la parte inferior del cuadro
que agrupa los componentes de la categoría o subcategoría.

Las operaciones se definen con el elemento operations (dentro de category o sub-category),
utilizando el mismo formato del elemento operations de web-ui. Es decir, las operaciones se
definen indicando una secuencia de elementos operation y/o popup-operation con los
mismos atributos.

Al trabajar dependencias y operaciones dentro de categorías y subcategorías se deben tener
en cuenta que al presionar los botones de las operaciones sólo se cargan las dependencias
que están contenidas dentro del elemento donde está definida la operación. Es decir, si
tenemos una dependencia en la categoría A y otra dependencia en la categoría B, y definimos
una operación en la categoría A al presionar el botón asociado a ella sólo se va a cargar la
dependencia de la categoría A. 

El uso de operaciones dentro de las categorías brinda un grado más de libertad a la hora de
tener que decidir donde ubicamos una operación. Los lugares posibles son: en las grillas, en
las categorías, en las subcategorías y en la página dentro del elemento web-ui. Para
determinar la ubicación de una operación se deben analizar los datos que afecta la
operación, y escoger el elemento más pequeño que los cubra. Por ejemplo, si una operación
opera sobre los datos de una grilla, debe ir en la grilla. Si una operación sólo trabaja con los
datos de una categoría debe ir en la categoría, y en caso que haya varias categorías y la
operación utilice datos de más de una categoría se debe ubicar la operación a nivel de la
página. 

## Visibilidad 

Dentro de las categorías y subcategorías se proporciona el elemento visible para determinar
cuándo una categoría o subcategoría está visible. Esta funcionalidad permite ocultar y
mostrar categorías y subcategorías según sea necesario. En la sección 10.0 Propiedades
dinámicas se explica con más detalle cómo definir la visibilidad en función de expresiones. 

## Títulos Condicionales

El mecanismo de títulos condicionales permite variar el título de la categoría o subcategoría
en tiempo de ejecución. Se definen indicando la lista de títulos posibles y expresiones que
permiten determinar que título se muestra en cada situación. Los títulos condicionales se
definen con el elemento conditional-titles. Para más información ver sección 10.0
Propiedades dinámicas.


















