# Documentación del Proyecto 2

Esta carpeta conserva la documentación del frontend léxico, sintáctico y semántico heredado del Proyecto 1 y la evolución del Proyecto 2 hacia generación de código intermedio TAC. El diseño específico de la fase nueva se encuentra en `../TAC_DESIGN.md`.

El alcance termina en TAC: no se interpreta el programa ni se genera ensamblador, código máquina o código objeto.

| Documento | Uso recomendado |
| --- | --- |
| `ARQUITECTURA_PROYECTO_2.md` | Comprender el frontend heredado y su extensión con TAC, layouts y registros de activación |
| `DECISIONES_SEMANTICAS.md` | Justificar `float`, `switch`, ámbitos, inferencia y otras políticas |
| `AUDITORIA_PROYECTO_2.md` | Revisar el frontend heredado, la extensión TAC y la evidencia ejecutable |
| `MATRIZ_REQUISITOS.md` | Relacionar cada regla del enunciado con implementación y pruebas |
| `../TAC_DESIGN.md` | Diseño vigente de instrucciones, temporales, control de flujo, frames y clases |
| `informe/INFORME_PROYECTO_02.tex` | Fuente LaTeX del informe técnico vigente del Proyecto 2 |
| `informe/INFORME_PROYECTO_02.pdf` | Informe compilado del Proyecto 2 |
| `../presentation/compiscript-proyecto-2.html` | Presentación navegable vigente del Proyecto 2 |
| `informe/INFORME_PROYECTO_01.tex` | Informe histórico del frontend del Proyecto 1; no documenta por sí solo TAC |
| `informe/INFORME_PROYECTO_01.pdf` | Compilación histórica del informe del Proyecto 1 |
| [Release heredado V1.2.0](https://github.com/DanielBarillasM/Proyecto-01_CDC_seccion-10_Grupo-DragonsSlayers-2.0/releases/tag/Compiscript-Semantic-IDE-V1.2.0) | Binario del Proyecto 1; no representa la generación TAC actual |

Los documentos del Laboratorio 1, copias del enunciado y resúmenes históricos se retiraron para evitar que se confundan con el alcance actual.

Para casos ejecutables y trazables consulte `../examples/semantic/README.md` y `../examples/tac/README.md`.

## Estado documental verificado

La documentación fue contrastada con la versión 2.0.0 del Proyecto 2 el 4 de octubre de 2026. La verificación reproducible comprende TypeScript, **167 pruebas en 12 archivos**, build de producción y ejecución del caso integral TAC. La evidencia cubre lexer, parser, semántica, tabla de símbolos, bloques básicos, CFG, constructores implícitos/heredados y generación TAC.

El [release V1.2.0](https://github.com/DanielBarillasM/Proyecto-01_CDC_seccion-10_Grupo-DragonsSlayers-2.0/releases/tag/Compiscript-Semantic-IDE-V1.2.0) pertenece al Proyecto 1 y se conserva únicamente como referencia histórica. La versión 2.0.0 se compila desde este repositorio; el workflow `.github/workflows/release.yml` verifica y empaqueta Windows, macOS y Linux, y publica los artefactos cuando se crea un tag `v*`.

## Recursos visuales vigentes

Las ilustraciones de referencia adaptadas al estilo neobrutalista actual se encuentran en:

- `../presentation/assets/compiler-pipeline-neobrutalist.png`;
- `../presentation/assets/scopes-symbol-table-neobrutalist.png`.

Son diagramas conceptuales para documentación y exposición, no capturas de pantalla ni evidencia de ejecución. Las imágenes anteriores se conservan como material histórico y respaldo.
