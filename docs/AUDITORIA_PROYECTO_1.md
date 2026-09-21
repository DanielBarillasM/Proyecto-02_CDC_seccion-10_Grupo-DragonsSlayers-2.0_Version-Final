# Auditoría técnica del frontend heredado y Proyecto 2

**Última verificación:** 20 de septiembre de 2026, sobre el árbol de trabajo del Proyecto 2 con generación TAC integrada.

## Resultado ejecutivo

La revisión contrastó el proyecto con el README del lenguaje, la gramática ANTLR, los requisitos de análisis semántico y la rúbrica proporcionada. Se conservó la arquitectura real React + Vite + TypeScript + Electron y se corrigieron defectos de semántica, gramática, casos integrados, experiencia de uso y documentación.

Estado final verificado:

- `npm run check`: aprobado;
- Línea base actual: 132 pruebas aprobadas en 8 archivos de prueba, incluida la generación TAC;
- `npm run build`: aprobado;
- parser regenerado desde la gramática activa;
- generador TAC conectado al CST y a la información semántica;
- temporales reutilizables, etiquetas, bloques básicos, layouts de clase y registros de activación;
- CLI, interfaz, exportaciones, ejemplos y documentación actualizados para la cuarta fase;
- informe heredado del Proyecto 1 identificado como material histórico, no como evidencia completa de TAC.

## Hallazgos y correcciones

| Prioridad | Área | Hallazgo | Corrección | Evidencia |
| --- | --- | --- | --- | --- |
| Crítica | Clases y ámbitos | Las clases se consultaban desde un registro global por nombre; una clase local podía verse fuera del bloque y nombres iguales colisionaban entre ámbitos hermanos. | Cada declaración recibe `classId`; el nombre se declara y resuelve mediante `ScopeManager`. | Regresiones de clase local y clases homónimas. |
| Alta | Tipos de instancia | La igualdad usaba únicamente el nombre textual de la clase. | Los tipos de clase e instancia conservan la identidad de declaración. | Clases hermanas no se confunden. |
| Alta | Inferencia de campos | Un método podía usar un campo antes de que su inicializador fuera analizado, haciendo el resultado dependiente del orden. | Se procesan campos antes que métodos y se restaura el orden del árbol presentado. | Regresión de campo declarado después del método. |
| Alta | Retornos | Las funciones sin anotación se trataban como `void`. | Se recopilan retornos observados, se calcula un tipo común y se actualiza la firma. | Regresión de retorno `integer` inferido. |
| Alta | Referencias | Accesos a clases, campos y métodos no actualizaban todos los contadores. | Miembros conservan `symbolId` y cada resolución registra la referencia real. | Prueba de referencias de clase/campo/método. |
| Alta | Tabla de símbolos | No existía una operación pública y acotada para demostrar actualización. | Se añadió `updateSymbol` con invariantes de identidad y se reutiliza en inicialización/captura. | Suite directa de `ScopeManager`. |
| Alta | Gramática | La gramática activa aceptaba instrucciones sin bloque en estructuras de control, a diferencia del archivo oficial adjunto. | `if`, ciclos y `foreach` vuelven a requerir `block`; se regeneró ANTLR. | Prueba sintáctica de llaves obligatorias. |
| Alta | Ejemplos | El ejemplo integral y el caso de recursión usaban `if` sin llaves, por lo que fallaron después de alinear la gramática. | Se actualizaron ejemplos, fixture integrado y prueba de recursión. | Suite integral aprobada. |
| Media | UI | Editor, gramática y resultados extensos competían en una pila difícil de leer. | Workbench con guía lateral, gramática plegable, editor dominante y explorador por pestañas. | Build de Vite y revisión de componentes. |
| Media | UI | Faltaban acciones y señales básicas del editor. | Copia con confirmación, indicador de preparación, guía de atajos y estados del pipeline. | `EditorTabs`, `CompilerGuide`, `MenuBar`. |
| Media | Documentación | El README indicaba ejecutar npm desde la raíz, aunque `package.json` está en la subcarpeta. | Comandos y estructura corregidos; se añadieron matriz, informe y presentación. | Documentos vigentes enlazados. |
| Media | Presentación | No existía un material autocontenido para explicar diseño, teoría y demostración. | Presentación HTML navegable, imprimible y con notas del expositor. | `presentation/compiscript-proyecto-1.html`. |
| Baja | Estilo | Había emojis en documentación heredada y elementos decorativos de la UI. | Se eliminan emojis del texto fuente; la UI utiliza iconos vectoriales consistentes. | Búsqueda Unicode final. |
| Crítica | Generación TAC | El generador inicial extraía texto crudo de nodos y producía operandos incorrectos en declaraciones, `print`, ciclos, retornos y expresiones. | Se reemplazó por un recorrido dirigido por sintaxis de los contextos ANTLR, con precedencia, lvalues, control de flujo, llamadas, arreglos, clases y closures. | `generatorV2.ts` y `tac.test.ts`. |
| Alta | Almacenamiento | Los registros se construían después de emitir instrucciones, por lo que los operandos no incluían frame ni offset. | Los frames y layouts se preparan antes de emitir; símbolos y temporales quedan asociados a almacenamiento abstracto. | Inspector TAC, exportaciones y pruebas de storage. |
| Media | UI TAC | La cuarta fase no aparecía de forma consistente y la pestaña activa podía quedar fuera del ancho visible. | Pipeline ordenado Lexer → Parser → Semántica → TAC y barra desplazable que centra la pestaña activa. | Revisión automatizada del build en navegador. |

## Decisiones conservadas

### Tipo `float`

El requisito semántico lo exige aunque la gramática base no lo incluya. Se mantiene como extensión explícita con literal decimal y promoción segura `integer -> float`.

### `switch`

Se conserva el discriminante escalar porque el ejemplo oficial utiliza `case 1` y la gramática acepta cualquier expresión. Cada caso debe ser comparable con el discriminante; los valores no escalares producen `SEM021`.

### Cascadas entre fases

Si lexer o parser producen errores, el análisis semántico no se ejecuta. Esta política evita fabricar errores sobre un CST incompleto.

### `break` y `continue`

`break` se permite en ciclos y `switch`; `continue` solo en ciclos. Es coherente con la estructura de control de lenguajes de la familia C/TypeScript.

## Distribución de pruebas

| Archivo | Fase | Cantidad |
| --- | --- | ---: |
| `semantic/semanticAnalyzer.test.ts` | semántico | 68 |
| `semantic/scopeManager.test.ts` | semántico | 4 |
| `semantic/projectExamples.test.ts` | semántico | 8 |
| `lexer.test.ts` | léxico | 5 |
| `parser.test.ts` | sintáctico | 9 |
| `rubric.examples.test.ts` | léxico + sintáctico | 8 |
| `testCases.defaults.test.ts` | las cuatro fases + rúbrica | 16 |
| `tac.test.ts` | código intermedio TAC | 14 |
| Total | | 132 |

Las pruebas semánticas incluyen programas válidos, diagnósticos `SEM001`–`SEM023`, flujo, arreglos, funciones, closures, herencia, constructores, identidad de clases, inferencia y referencias. La suite de ejemplos garantiza además que los archivos de exposición siguen siendo ejecutables y producen sus códigos documentados. Las pruebas directas de tabla de símbolos demuestran las cuatro operaciones solicitadas en la rúbrica: insertar, recuperar, actualizar y manejar alcances.

## Build

El build de producción transforma 3426 módulos y finaliza correctamente. Vite advierte que el chunk JavaScript principal supera 500 kB; es una recomendación de optimización, no un error funcional. El volumen proviene principalmente de Monaco Editor, que se empaqueta localmente para funcionar sin CDN.

## Empaquetado multiplataforma

`npm run exe:portable` genera el portable Windows x64; `npm run exe:mac` genera ZIP y DMG sin firma para Intel y Apple Silicon; `npm run exe:linux` genera AppImage x64. Los paquetes macOS se producen en una Mac o runner macOS. El AppImage puede generarse en Linux, WSL o Docker; el intento directo sobre NTFS puede fallar por permisos de enlaces simbólicos. El arranque de la aplicación fue verificado en macOS arm64 mediante Electron directo y en Linux arm64 dentro de un contenedor con Xvfb. Los avisos de D-Bus en entornos mínimos no afectan el IDE. Si un AppImage ejecutado en un sistema mínimo informa que falta `libz.so`, debe instalarse o exponerse la variante de desarrollo de zlib; los escritorios Linux habituales ya la proporcionan.

El [release V1.2.0](https://github.com/DanielBarillasM/Proyecto-01_CDC_seccion-10_Grupo-DragonsSlayers-2.0/releases/tag/Compiscript-Semantic-IDE-V1.2.0) corresponde al Proyecto 1 y no contiene esta implementación TAC. Hasta publicar un release propio del Proyecto 2, los artefactos deben compilarse desde el código fuente vigente.

## Límite de esta auditoría

La autoría individual solo puede verificarse en el historial real de Git. No se modificaron commits ni se atribuyeron contribuciones desde la documentación. Ese criterio debe revisarse manualmente antes de la entrega, tal como exige el enunciado.
