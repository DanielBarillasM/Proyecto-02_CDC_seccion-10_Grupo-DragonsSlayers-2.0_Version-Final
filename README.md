# Proyecto 02 — Compiscript Semantic & TAC IDE

IDE de escritorio para analizar Compiscript y producir una representación intermedia de tres direcciones. El proyecto conserva el frontend ANTLR del Proyecto 1 y agrega generación TAC, temporales reutilizables, etiquetas, almacenamiento abstracto, layouts de clases y registros de activación.

## Pipeline

```text
Código .cps
   ↓
Lexer ANTLR
   ↓
Parser ANTLR + CST
   ↓
Análisis semántico + tabla de símbolos + ámbitos
   ↓
Generador TAC
   ↓
Instrucciones + frames + layouts + exportaciones
```

TAC se genera únicamente cuando las fases léxica, sintáctica y semántica terminan sin errores. El proyecto no interpreta Compiscript ni genera ensamblador, código máquina o archivos objeto.

## Funcionalidades

- Lexer y parser generados con ANTLR 4/ANTLR4TS.
- Recuperación de errores léxicos y sintácticos.
- Análisis semántico de tipos, nombres, funciones, clases, arreglos, ámbitos y closures.
- Código de tres direcciones tipado y determinista.
- Precedencia, asignaciones, ternario y cortocircuito lógico.
- `if`, `while`, `do-while`, `for`, `foreach`, `switch`, `break` y `continue`.
- Funciones, parámetros, llamadas, retornos y recursión.
- Arreglos, propiedades, objetos, constructores, métodos y herencia.
- Representación de `try/catch` y variables capturadas.
- Asignación y reutilización segura de temporales por frame.
- Tabla de símbolos con clase de almacenamiento, frame, offset, tamaño y alineación.
- Registros de activación para global, funciones, métodos y constructores.
- Layouts deterministas de clases.
- Interfaz con editor Monaco, diagnósticos, TAC textual, bloques básicos y exportaciones.
- CLI para lexer, parser, semántica y TAC.

## Requisitos

- Node.js 20 o superior.
- npm o pnpm.

## Instalación

Con npm:

```powershell
npm.cmd install
npm.cmd run check
npm.cmd test
npm.cmd run dev
```

Con pnpm:

```powershell
pnpm.cmd install
pnpm.cmd run check
pnpm.cmd test
pnpm.cmd run dev
```

## CLI TAC

```powershell
npm.cmd run cli -- examples/tac/13_programa_integral.cps --mode tac
```

Los errores de fases anteriores bloquean el resultado:

```powershell
npm.cmd run cli -- examples/tac/14_error_lexico.cps --mode tac
npm.cmd run cli -- examples/tac/15_error_sintactico.cps --mode tac
npm.cmd run cli -- examples/tac/16_error_semantico.cps --mode tac
```

## Comandos

| Comando | Propósito |
|---|---|
| `npm.cmd run generate` | Regenera lexer, parser y Visitor desde la gramática |
| `npm.cmd run check` | Verifica TypeScript |
| `npm.cmd test` | Ejecuta todas las pruebas |
| `npm.cmd run build` | Genera el frontend de producción |
| `npm.cmd run dev` | Inicia el IDE web |
| `npm.cmd run desktop` | Compila y abre Electron |
| `npm.cmd run cli -- <archivo> --mode tac` | Genera TAC desde consola |

## Ejemplos

- `examples/compiscript`: lexer y parser.
- `examples/semantic`: reglas semánticas y tabla de símbolos.
- `examples/rubric`: recuperación de errores.
- `examples/tac`: expresiones, control, funciones, arreglos, clases, closures y bloqueo por errores.

## Documentación técnica

- [Diseño TAC](TAC_DESIGN.md)
- [Arquitectura](docs/ARQUITECTURA_PROYECTO_1.md)
- [Decisiones semánticas](docs/DECISIONES_SEMANTICAS.md)
- [Matriz de requisitos](docs/MATRIZ_REQUISITOS.md)

## Equipo

DragonsSlayers 2.0 — Construcción de Compiladores, Sección 10.
