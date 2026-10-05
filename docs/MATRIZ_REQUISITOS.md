# Matriz de trazabilidad de requisitos

Esta matriz contrasta el enunciado de análisis semántico con la implementación entregada. “Cubierto” significa que existe lógica concreta y al menos una prueba automatizada o una verificación de integración asociada.

## Generación de código intermedio — Proyecto 2

| Requisito | Evidencia | Estado |
|---|---|---|
| Diseño de TAC tipado | `src/tac/types.ts`, `TAC_DESIGN.md` | Cubierto |
| Traducción desde ANTLR | `src/tac/generator.ts` | Cubierto |
| Temporales y reutilización | `src/tac/allocators.ts`, pruebas TAC | Cubierto |
| Tabla de símbolos con almacenamiento | `SymbolStorage`, panel de símbolos | Cubierto |
| Registros de activación | `ActivationRecord`, inspector TAC | Cubierto |
| Clases y offsets | `ClassLayout`, inspector TAC | Cubierto |
| Bloqueo ante errores previos | `analyze.ts`, pruebas TAC | Cubierto |
| Ejemplos correctos y erróneos | `examples/tac` | Cubierto |
| CLI y exportaciones | `src/cli/run.ts`, `src/lib/downloads.ts` | Cubierto |
| Archivo propio en modo TAC | `src/lib/analyze.ts`, `src/ui/App.tsx`, selector `.cps` | Cubierto |
| Bloques básicos y CFG | `src/tac/controlFlow.ts`, `TacGenerationResult`, pruebas TAC | Cubierto |
| Verificación y empaquetado multiplataforma | `.github/workflows/release.yml` | Cubierto; la publicación ocurre con tags `v*` |

## Rúbrica ponderada del Proyecto 2 — 25 puntos

| Criterio evaluado | Puntos | Evidencia principal | Prueba o demostración | Estado |
| --- | ---: | --- | --- | --- |
| Diseño de la representación intermedia | 3 | `src/tac/types.ts`, `TAC_DESIGN.md`, opcodes tipados y metadatos de fuente/scope/frame | exportación TAC y caso integral | Cubierto |
| Declaraciones y asignaciones | 1 | `MOV`, resolución de lvalues y almacenamiento de símbolos | `tac.test.ts`: precedencia y operandos reales | Cubierto |
| Operaciones aritméticas | 1 | `ADD`, `SUB`, `MUL`, `DIV`, `MOD` | pruebas de precedencia y programa integral | Cubierto |
| Operaciones lógicas | 1 | `NOT`, cortocircuito mediante saltos y temporales booleanos | programas semánticos y TAC válidos | Cubierto |
| Arreglos | 1 | `NEW_ARRAY`, `ARRAY_GET`, `ARRAY_SET`, `ARRAY_LENGTH` | prueba de arreglos y `foreach` | Cubierto |
| Estructuras de control | 3 | etiquetas, saltos, bloques básicos y CFG para `if`, ciclos y `switch` | `tac.test.ts`, `tacVisual.test.tsx` | Cubierto |
| Funciones y parámetros | 2 | `FUNC_BEGIN`, `PARAM`, `CALL`, `RETURN` y registros de activación | prueba de funciones/llamadas/retornos | Cubierto |
| Recursión | 2 | etiquetas estables, llamada a la propia función y frame por invocación abstracta | ejemplo integral semántico y suite de funciones | Cubierto |
| Clases y objetos | 2 | layouts, `NEW_OBJECT`, campos, métodos y constructor explícito o implícito | regresión de constructor implícito con inicialización de campos | Cubierto |
| Herencia | 2 | layout heredado, resolución de métodos y encadenamiento del constructor padre | regresión de constructor heredado y campo propio de la hija | Cubierto |
| Manejo de excepciones `try/catch` | 2 | `TRY_BEGIN`, `TRY_END`, `CATCH_BEGIN`, `CATCH_END` | prueba de `switch` y `try/catch` | Cubierto |
| Creación y reciclaje de temporales | 3 | `TemporaryAllocator`, pools por frame y métricas de reutilización | pruebas del allocator y cero temporales vivos al finalizar | Cubierto |
| Nuevas funciones de tabla de símbolos | 2 | almacenamiento, offsets, referencias, actualización y scopes | `scopeManager.test.ts` e inspector de símbolos | Cubierto |
| **Total** | **25** | **Implementación, interfaz y documentación** | **167 pruebas en 12 archivos** | **Cubierto** |

## Reglas semánticas

| Área | Requisito del enunciado | Implementación | Evidencia automatizada | Estado |
| --- | --- | --- | --- | --- |
| Tipos | Operaciones aritméticas numéricas | `typeSystem.ts`, `semanticVisitor.ts` | casos válidos, `SEM004`, funciones como operandos | Cubierto |
| Tipos | Operaciones lógicas booleanas | `typeSystem.ts` | aceptación y rechazo de operandos lógicos | Cubierto |
| Tipos | Comparaciones compatibles | `typeSystem.ts` | comparación numérica y comparación incompatible | Cubierto |
| Tipos | Asignación compatible | `semanticVisitor.ts` | `SEM003`, promoción `integer -> float` | Cubierto |
| Tipos | Inicialización de constantes | gramática y Visitor | rechazo sintáctico de `const` sin valor y reasignación | Cubierto |
| Tipos | Elementos homogéneos en listas | `commonType`, análisis de literales | `SEM017` y arreglo válido | Cubierto |
| Ámbitos | Resolución local/global | `ScopeManager.resolve` | acceso global desde función y prueba directa de padres | Cubierto |
| Ámbitos | Variable no declarada | resolución de identificadores | `SEM001` | Cubierto |
| Ámbitos | Redeclaración en el mismo entorno | `ScopeManager.declare` | `SEM002` y prueba directa | Cubierto |
| Ámbitos | Acceso desde bloques anidados | cadena de ámbitos | shadowing y restauración al salir | Cubierto |
| Ámbitos | Entornos de función, clase y bloque | `enterScope`/`exitScope` | inspección de ámbitos; loop, switch y catch | Cubierto |
| Funciones | Cantidad y tipo de argumentos | validación de firmas | `SEM006` y `SEM007` | Cubierto |
| Funciones | Tipo de retorno | contexto de función e inferencia | `SEM008`, retorno válido y retorno inferido | Cubierto |
| Funciones | Recursión | hoisting de declaraciones | programa recursivo válido | Cubierto |
| Funciones | Funciones anidadas y closures | marca `captured` | programa con closure válido | Cubierto |
| Funciones | Funciones duplicadas sin sobrecarga | declaración por ámbito | duplicado con hoisting, `SEM002` | Cubierto |
| Flujo | Condiciones booleanas | análisis de `if` y ciclos | `SEM005`, `while`, `do-while`, `for` | Cubierto |
| Flujo | Uso contextual de `break` y `continue` | pila de contextos | `SEM010`, `SEM011` y usos válidos | Cubierto |
| Flujo | `return` dentro de función | contexto de función | `SEM009` y retorno válido | Cubierto |
| Clases | Existencia de atributos y métodos | registro y búsqueda heredada | `SEM012`, miembros propios y heredados | Cubierto |
| Clases | Llamada correcta al constructor | firma explícita o implícita | aridad y tipo del constructor | Cubierto |
| Clases | Uso contextual de `this` | contexto de clase | clase válida y `SEM013` | Cubierto |
| Listas | Tipo de elementos | unificación de tipos | arreglo homogéneo y `SEM017` | Cubierto |
| Listas | Índices válidos | validación de receptor e índice | `SEM015` y `SEM016` | Cubierto |
| General | Código muerto | `flowAnalysis.ts` | después de `return`, `break` y `continue` | Cubierto |
| General | Expresiones con sentido | reglas de operadores e invocación | operación aritmética sobre función | Cubierto |
| General | Declaraciones y parámetros duplicados | tabla y firmas | `SEM002` y `SEM019` | Cubierto |

## Requisitos de construcción

| Requisito | Evidencia | Estado |
| --- | --- | --- |
| Parser generado | `src/grammars/Compiscript.g4` y `src/generated/` | Cubierto |
| Recorrido con Visitor | `SemanticAnalyzer` implementa el Visitor generado por ANTLR | Cubierto |
| Árbol con representación visual | CST y árbol semántico tipado en el explorador de resultados | Cubierto |
| Batería de casos exitosos y fallidos | `src/__tests__/`, `examples/semantic/` y `projectExamples.test.ts` | Cubierto |
| Tabla de símbolos | `semantic/scopes.ts`, tabla, referencias y árbol de ámbitos | Cubierto |
| IDE para escribir y compilar | React/Vite, editor, análisis y exportaciones | Cubierto |
| Arquitectura y ejecución documentadas | README, arquitectura, decisiones, auditoría e informe | Cubierto |
| Repositorio y contribuciones | El historial de Git es la única fuente válida de autoría | Revisión manual |

## Evidencia específica de la tabla de símbolos

La rúbrica mostrada solicita demostrar cuatro operaciones. Se cubren de esta forma:

| Operación | API o comportamiento | Prueba |
| --- | --- | --- |
| Insertar | `ScopeManager.declare` | “inserta y recupera símbolos del ámbito activo” |
| Recuperar | `resolveCurrent` y `resolve` | pruebas de ámbito activo y resolución de padres |
| Actualizar | `updateSymbol`, `markInitialized`, `markCaptured` | “actualiza información sin cambiar la identidad” |
| Manejar alcances | `enterScope`, `exitScope`, shadowing | “resuelve padres, permite shadowing y restaura el ámbito” |

El archivo `examples/semantic/symbol_table_demo.cps` permite observar estas operaciones desde la UI o CLI. La suite de ejemplos comprueba que el símbolo `pendiente` cambia a inicializado, que la firma inferida de `incrementar` se actualiza a `integer`, que se registran referencias y que las variables del closure quedan capturadas.

## Diferencia interpretativa de `switch`

El enunciado incluye `switch` en la lista de condiciones booleanas, pero el README oficial muestra `switch (x)` con `case 1`, y la gramática acepta cualquier `expression`. Se adopta el comportamiento del lenguaje mostrado: discriminante escalar y casos comparables. Esta política se valida con `SEM021` y se explica en `DECISIONES_SEMANTICAS.md`.

## Criterio de mantenimiento

Cada cambio futuro de una regla debe actualizar tres elementos en conjunto: implementación, prueba de éxito/fallo y esta matriz. Así se evita declarar cobertura únicamente desde la documentación.
