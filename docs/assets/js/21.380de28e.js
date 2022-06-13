(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{461:function(e,a,r){"use strict";r.r(a);var s=r(65),o=Object(s.a)({},(function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"agregados-en-la-nueva-version-de-descartes"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#agregados-en-la-nueva-version-de-descartes"}},[e._v("#")]),e._v(" Agregados en la Nueva Versión de Descartes")]),e._v(" "),r("h2",{attrs:{id:"pantallas-anchas"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#pantallas-anchas"}},[e._v("#")]),e._v(" Pantallas Anchas")]),e._v(" "),r("p",[e._v("El ancho de las pantallas normales (no de los prompts) se puede modificar con el atributo\nwidth en el elemento web-ui. Los valores que acepta son medium (mediano, valor por defecto)\ny large (grande). En caso de definirlo como large la pantalla se ajusta a una resolución de\n1024 píxeles de ancho, en lugar de lo usual que es 800 píxeles.")]),e._v(" "),r("h2",{attrs:{id:"altura-y-ancho-de-campos-de-texto"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#altura-y-ancho-de-campos-de-texto"}},[e._v("#")]),e._v(" Altura y Ancho de Campos de Texto")]),e._v(" "),r("p",[e._v("El ancho de los campos de texto (elementos field o elementos column -dentro de filtros- con\nvariables de tipo Character, VarChar o LongVarChar) se puede controlar con el atributo width.\nSu valor es un número que indica la cantidad de caracteres que se quieren mostrar en él.\nAdicionalmente, en el caso que se defina un ancho manualmente, se puede definir una altura\n(sólo para variables de tipo VarChar o LongVarChar) con el atributo height. Su valor es un\nnúmero que indica la cantidad de renglones que se quieren mostrar en el campo.")]),e._v(" "),r("h2",{attrs:{id:"prompts-con-autorefresh"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#prompts-con-autorefresh"}},[e._v("#")]),e._v(" Prompts con Autorefresh")]),e._v(" "),r("p",[e._v("A cualquier elemento prompt se le puede asociar el atributo autoRefresh, que en caso de\nvaler true, va a forzar que la pantalla se refresque luego de que el prompt devuelve su valor.\nPor ejemplo, si se quiere que luego de devolver el valor de una dependencia se refresque la\npantalla se hace así: "),r("code",[e._v('<dependency caption="País" determinants="&amp;PaiCod" dependents="&amp;PaiNom"> <prompt object="HPmtPais" params="&amp;PaiCod,&amp;PaiNom" autoRefresh="true" /> </dependency>')]),e._v(" Si el prompt se cierra de una forma. que no devuelva valores (por ejemplo presionando Alt+F4) no se refresca la página padre.")]),e._v(" "),r("h2",{attrs:{id:"opciones-de-refrescado-en-check-box-y-value-list-con-style-radiobutton"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#opciones-de-refrescado-en-check-box-y-value-list-con-style-radiobutton"}},[e._v("#")]),e._v(" Opciones de Refrescado en Check-Box y Value-List con style=”radioButton”")]),e._v(" "),r("p",[e._v("Se agregó a los elementos check-box la posibilidad de generar refrescados automáticos o\nbien directamente generar un evento en el servidor que es invocado cuando el usuario\nmodifica el valor del mismo. Las opciones son similares a las de los elementos value-list y se\nlistan a continuación:")]),e._v(" "),r("ul",[r("li",[e._v('Atributo autoRefreshOnChange="true": refresca la pantalla automáticamente la pantalla')]),e._v(" "),r("li",[e._v('Atributo refreshGridsOnChange="grid1, grid2, ...": refresca las grillas listadas automáticamente')]),e._v(" "),r("li",[e._v('Atributo refreshChartsOnChange="chart1, chart1, ...": refresca las gráficas listadas automáticamente')]),e._v(" "),r("li",[e._v('Atributo generateEventOnChange="true": genera un evento de usuario que se ejecuta cuando el valor del campo cambia')])]),e._v(" "),r("p",[e._v("Adicionalmente todas estas opciones están disponibles en los elementos value-list con estilo\ntipo radio button (style=”radioButton”)")]),e._v(" "),r("h2",{attrs:{id:"grillas"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#grillas"}},[e._v("#")]),e._v(" Grillas")]),e._v(" "),r("h3",{attrs:{id:"grillas-editables"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#grillas-editables"}},[e._v("#")]),e._v(" Grillas Editables")]),e._v(" "),r("p",[e._v("Se agregó una nueva funcionalidad que permite definir grillas edtiables que mantienen\nautomáticamente los cambios hechos por el usuario al paginar, filtrar o al refrescar. De esta\nforma se puede, por ejemplo, permitir que el usuario modifique varios registros (de diferentes\npáginas) y solamente al final presione una operación para grabar todos los cambios hechos.\nEn el atributo editable de las grillas es posible definir dos nuevos valores:")]),e._v(" "),r("ul",[r("li",[e._v("Valor keepValues: indique que se mantenga el valor de los campos editables")]),e._v(" "),r("li",[e._v("Valor keepValuesWithAddRow: además de mantener los valores de los campos")])]),e._v(" "),r("p",[e._v("editables, agrega un botón llamado “Agregar Fila” que permite al usuario agregar filas\nal final de la grilla para ingresar nuevos registros (también se pueden agregar con la\ntecla ENTER)")]),e._v(" "),r("p",[e._v('Para obtener el comportamiento descrito es imprescindible definir el menos una columna\ncon el atributo keepValuesKey="true". Las columna o columnas marcadas con ese atributo en true van a ser los identificadores de los registros a nivel de la grilla (esto se necesita para\nel manejo interno del mantenimiento del estado de los mismos). Por este motivo, no se puede\nrepetir la combinación de sus valores en dos filas diferentes (puede ser una columna autoenumerada oculta por ejemplo).')]),e._v(" "),r("p",[e._v("El modelo se sustenta en lo siguiente:")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("Toda modificación, borrado o inserción sobre la grilla se graba en una tabla interna\nde Descartes")])]),e._v(" "),r("li",[r("p",[e._v("Al hacer la carga de la grilla se valida automáticamente por cada registro a agregar si\nfue modificado (se muestra con las modificaciones), borrado (se ignora) o nuevo (se\nconsidera como un registro más)")])]),e._v(" "),r("li",[r("p",[e._v("Los cambios deben ser impactados manualmente en la tabla real de la base de datos;\npara lograr esto se debe utilizar la rutina 'GP: Leer fila modificada &GP_K de\nNombreGrilla' que carga en las variables correspondientes todos los valores de la fila\nindicada en la variable &GP_K y adicionalmente en la variable\n&GP_Gr_TipoModificacionFila un valor que indica el tipo de modificación realizada:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[e._v("  1 FRRecordModification.New - registro nuevo\n\n  2 FRRecordModification.Modified - registro modificado\n\n  3 FRRecordModification.Deleted - registro borrado\n")])])])])]),e._v(" "),r("p",[e._v("A modo de ejemplo, el código de un WebPanel que impacta los datos de una grilla de este\ntipo en la base de datos luciría así:")]),e._v(" "),r("div",{staticClass:"language-genexus line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("For &GP_K = 1 To &GP_Gr_NombreGrilla_nFilasModificadas\n    Do 'GP: Leer fila modificada &GP_K de NombreGrilla'\n    Do Case\n        Case &GP_Gr_TipoModificacionFila = FRRecordModification.New\n            Call(PXXX, 'INS',...)\n        Case &GP_Gr_TipoModificacionFila = FRRecordModification.Modified\n            Call(PXXX, 'UPD',...)\n        Case &GP_Gr_TipoModificacionFila = FRRecordModification.Deleted\n            Call(PXXX, 'DLT',...)\n    EndCase\nEndFor\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br"),r("span",{staticClass:"line-number"},[e._v("5")]),r("br"),r("span",{staticClass:"line-number"},[e._v("6")]),r("br"),r("span",{staticClass:"line-number"},[e._v("7")]),r("br"),r("span",{staticClass:"line-number"},[e._v("8")]),r("br"),r("span",{staticClass:"line-number"},[e._v("9")]),r("br"),r("span",{staticClass:"line-number"},[e._v("10")]),r("br"),r("span",{staticClass:"line-number"},[e._v("11")]),r("br")])]),r("p",[e._v("Adicionalmente se genera una rutina llamada 'GP: Restaurar grilla NombreGrilla' que permite\ndescartar todas las modificaciones realizadas hasta el momento por el usuario al ser\ninvocada. Se debe tener en cuenta que si la grilla se refresca de cualquier otra forma, se van\na seguir considerando las modificaciones hechas por el usuario. Por último se agregó otro\natributo relacionado con este tipo de grillas llamado generateDelete, que si se define con el\nvalor true genera una columna de check-box y un rutina llamada 'GP: Borrar registros\nchequeados de NombreGrilla' que al ser invocada marca como eliminados todos los registros\nque el usuario haya marcado en esa columna.")]),e._v(" "),r("h3",{attrs:{id:"optimizacion-de-acceso-a-la-base-de-datos"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#optimizacion-de-acceso-a-la-base-de-datos"}},[e._v("#")]),e._v(" Optimización de Acceso a la Base de Datos")]),e._v(" "),r("p",[e._v("Se agregó el atributo selectTopOptimization en el elemento grid, que en caso de definirse con\nel valor true provoca optimiza los lecturas a la base de datos para cargar los elementos de la\ngrilla. En caso de tener tabla base (ver manual de Descartes sección 5) es completamente\nautomático, en caso de no tener tabla base (todas las columnas son variables) se genera un\ncomentario explicativo en el evento de carga:")]),e._v(" "),r("div",{staticClass:"language-genexus line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('// OBS: En la variable &GP_Gr_NombreGrilla_nRegistros se encuentra el número máximo de\n// registros que se deben agregar a la grilla. En caso que todos los filtros se\n// escriban en los "Where" del "For Each" se puede utilizar el procedimiento\n// "FRForEachMax" para optimizar la interacción con la Base de Datos\n')])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br")])]),r("p",[e._v("Entonces, si se está en un caso optimizable según lo explicado, se debe agregar la siguiente\nlínea de código al principio del evento:")]),e._v(" "),r("div",{staticClass:"language-genexus line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("Call(PFRForEachMax, &GP_Gr_NombreGrilla_nRegistros)\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br")])]),r("h3",{attrs:{id:"columnas-de-grillas-para-ingreso-de-contrasenas"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#columnas-de-grillas-para-ingreso-de-contrasenas"}},[e._v("#")]),e._v(" Columnas de Grillas para Ingreso de Contraseñas")]),e._v(" "),r("p",[e._v("Al igual que los elementos field, los elementos field-column soportan el atributo isPassword.\nEn caso de definirse su valor en true, se oculta el texto ingresado por el usuario.")]),e._v(" "),r("h3",{attrs:{id:"carga-por-fila-de-columnas-con-lista-de-valores"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#carga-por-fila-de-columnas-con-lista-de-valores"}},[e._v("#")]),e._v(" Carga por Fila de Columnas con Lista de Valores")]),e._v(" "),r("p",[e._v("Se agrega la posibilidad de generar un evento de usuario que se invoca exactamente antes\nde cargar una fila de la grilla de forma de poder definir un conjunto de valores diferente para\nlas columnas de tipo value-list-column. El atributo para lograrlo es generateLoadPerRow, y en\ncaso de definirse con el valor true genera una evento similar al siguiente:")]),e._v(" "),r("div",{staticClass:"language-genexus line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("Sub 'GU: Vl -> TituloColumna (LoadPerRow)' //$ ...\n// PARA HACER: Ingrese el código que carga los valores posibles de\n// la lista de valores por fila\nEndSub // 'GU: Vl -> TituloColumna (LoadPerRow)\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br")])]),r("p",[e._v("Al momento ejecutar ese evento, todas las variables asociadas a las columnas de la grilla\ntienen el valor concreto de la fila que se está escribiendo.")]),e._v(" "),r("h3",{attrs:{id:"columnas-de-tipo-prompt"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#columnas-de-tipo-prompt"}},[e._v("#")]),e._v(" Columnas de Tipo Prompt")]),e._v(" "),r("h4",{attrs:{id:"titulo"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#titulo"}},[e._v("#")]),e._v(" Título")]),e._v(" "),r("p",[e._v("Se puede definir un título a las columnas de tipo prompt-column mediante el atributo title.\nPor defecto el mismo es vacío.")]),e._v(" "),r("h4",{attrs:{id:"evento-en-el-servidor-previo-a-la-apertura"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#evento-en-el-servidor-previo-a-la-apertura"}},[e._v("#")]),e._v(" Evento en el Servidor Previo a la Apertura")]),e._v(" "),r("p",[e._v("Se puede generar un evento de usuario previo a la apertura del prompt en una columna de\ntipo prompt-column. Esto se logra definiendo el valor true en el atributo\ngeneratePreOpenEvent. El resultado será similar al siguiente:")]),e._v(" "),r("div",{staticClass:"language-genexus line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("Sub 'GU: PrCol -> TituloColumna (Pre-Open)' //$ ...\n// PARA HACER: Ingrese el código que se ejecuta previo a la apertura del \"prompt\".\n// OBS1: Para evitar que se muestre el \"prompt\" al usuario debe asignar el valor 'N'\n// a la variable &GP_PrCol_TituloColumna_MostrarPrompt, por defecto es 'S'\nEndSub // 'GU: PrCol -> 333 (Pre-Open)' \n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br"),r("span",{staticClass:"line-number"},[e._v("5")]),r("br")])]),r("p",[e._v("Como se indica en el comentario asociado, si se quiere evitar que se abra el prompt, se puede\nasignar el valor 'N' en la variable &GP_PrCol_TituloColumna_MostrarPrompt.")]),e._v(" "),r("h2",{attrs:{id:"evento-previo-a-la-apertura-en-prompt-opertation"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#evento-previo-a-la-apertura-en-prompt-opertation"}},[e._v("#")]),e._v(" Evento Previo a la Apertura en Prompt-Opertation")]),e._v(" "),r("p",[e._v("Al igual que se presentó en la sección 5.5.2, las operaciones de tipo prompt-operation tienen\nel atributo generatePreOpenEvent, que se comporta de forma similar a la descrita en esa\nsección")]),e._v(" "),r("h2",{attrs:{id:"confirmacion-en-client-operation"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#confirmacion-en-client-operation"}},[e._v("#")]),e._v(" Confirmación en Client-Operation")]),e._v(" "),r("p",[e._v("Al igual que las operaciones normales, se agregó en las client-operation la posibilidad de\ngenerar confirmaciones automáticas y controlar las mismas mediante los siguientes\natributos")]),e._v(" "),r("ul",[r("li",[e._v('Atributo confirmation="true": genera una confirmación al presionar la operación')]),e._v(" "),r("li",[e._v('Atributo confitmationText="texto de la confirmación": modifica el texto de la confirmación')]),e._v(" "),r("li",[e._v('Atributo generatePreConfirmation="true": genera un evento de usuario asociado a la confirmación')])])])}),[],!1,null,null,null);a.default=o.exports}}]);