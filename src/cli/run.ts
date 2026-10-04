import * as fs from "node:fs";
import * as path from "node:path";
import { styleText } from "node:util";
import { ANALYZER_ENGINE, analyzeInput } from "../lib/analyze";
import { displayType } from "../semantic/semanticTypes";
import type { AnalyzerMode } from "../lib/types";

function parseArguments(args: string[]): { file?: string; mode: AnalyzerMode } {
  let file: string | undefined;
  let mode: AnalyzerMode = "semantic";

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--mode" || arg === "-m") {
      const next = args[index + 1];
      if (next === "lexer" || next === "parser" || next === "semantic" || next === "tac") {
        mode = next;
        index += 1;
      } else {
        throw new Error("El modo debe ser lexer, parser, semantic o tac.");
      }
    } else if (!arg.startsWith("-")) {
      file = arg;
    } else {
      throw new Error(`Opción desconocida: ${arg}`);
    }
  }

  return { file, mode };
}

async function main(): Promise<void> {
  let parsed: { file?: string; mode: AnalyzerMode };
  try {
    parsed = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (!parsed.file) {
    console.error("Uso: npm run cli -- <archivo.cps> [--mode lexer|parser|semantic|tac]");
    process.exit(1);
  }

  const filePath = path.resolve(parsed.file);
  if (path.extname(filePath).toLowerCase() !== ".cps") {
    console.error("Error: el archivo de entrada debe tener extensión .cps.");
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`Error: no se encontró el archivo ${filePath}.`);
    process.exit(1);
  }

  const input = fs.readFileSync(filePath, "utf8");
  const result = analyzeInput(input, parsed.mode);

  console.log(styleText("cyan", "\nCOMPISCRIPT SEMANTIC & TAC IDE: PIPELINE DE COMPILACIÓN"));
  console.log(`Archivo: ${filePath}`);
  console.log(`Modo: ${parsed.mode}`);
  console.log(`Motor: ${ANALYZER_ENGINE}`);
  console.log(`Tokens reconocidos: ${result.summary.tokenCount}\n`);

  if (result.lexicalErrors.length > 0) {
    console.log(styleText(["red", "bold"], "Errores léxicos:"));
    for (const error of result.lexicalErrors) {
      console.log(`  Línea ${error.line}, columna ${error.column}: ${error.offendingSymbol ?? "<EOF>"}: ${error.message}`);
    }
  }

  if (result.syntaxErrors.length > 0) {
    console.log(styleText(["yellow", "bold"], "Errores sintácticos:"));
    for (const error of result.syntaxErrors) {
      console.log(`  Línea ${error.line}, columna ${error.column}: ${error.offendingSymbol ?? "<EOF>"}: ${error.message}`);
    }
  }

  if (parsed.mode === "semantic" || parsed.mode === "tac") {
    if (result.semantic.status === "skipped") {
      console.log(styleText("yellow", `\nSemántica omitida: ${result.semantic.skipReason ?? "errores previos"}`));
    } else if (result.semantic.status === "completed") {
      console.log(styleText(["magenta", "bold"], "\nDiagnósticos semánticos:"));
      if (result.semantic.diagnostics.length === 0) {
        console.log("  Sin diagnósticos.");
      } else {
        for (const diagnostic of result.semantic.diagnostics) {
          const severityColor = diagnostic.severity === "error" ? "red" : "yellow";
          console.log(styleText(severityColor, `  [${diagnostic.code}] L${diagnostic.line}:C${diagnostic.column}: ${diagnostic.message}`));
        }
      }

      console.log(`\nSímbolos: ${result.semantic.metrics.symbolCount} | Ámbitos: ${result.semantic.metrics.scopeCount} | Referencias: ${result.semantic.metrics.referenceCount} | Capturas: ${result.semantic.metrics.capturedVariableCount}`);
      if (result.semantic.symbols.length > 0) {
        console.log(styleText("cyan", "Tabla de símbolos (resumen):"));
        for (const symbol of result.semantic.symbols) {
          console.log(`  ${symbol.name.padEnd(18)} ${symbol.kind.padEnd(10)} ${displayType(symbol.type).padEnd(18)} scope=${symbol.scopeId}`);
        }
      }
    }
  }

  if (parsed.mode === "tac") {
    if (result.tac.status === "completed") {
      console.log(styleText(["cyan", "bold"], "\nCódigo intermedio TAC:"));
      console.log(result.tac.formattedCode);
      console.log(
        `\nInstrucciones: ${result.tac.metrics.instructionCount} | Bloques: ${result.tac.basicBlocks.length} | Aristas: ${result.tac.controlFlowEdges.length} | Temporales: ${result.tac.metrics.temporaryCount} | Reutilizados: ${result.tac.metrics.temporariesReuseCount} | Etiquetas: ${result.tac.metrics.labelCount} | Frames: ${result.tac.metrics.activationRecordCount}`
      );
    } else {
      console.log(styleText("yellow", `\nTAC ${result.tac.status}: ${result.tac.skipReason ?? "sin resultado"}`));
    }
  }

  if (result.accepted) {
    const label = parsed.mode === "tac"
      ? "Programa aceptado: se generó el código intermedio TAC."
      : parsed.mode === "semantic"
      ? "Programa aceptado: no se encontraron errores léxicos, sintácticos ni semánticos."
      : parsed.mode === "parser"
        ? "Archivo aceptado: no se encontraron errores léxicos ni sintácticos."
        : "Archivo aceptado léxicamente.";
    console.log(styleText("green", `\n${label}`));
  } else {
    console.log(styleText("red", `\nAnálisis finalizado con ${result.summary.totalErrorCount} error(es).`));
  }

  process.exit(result.accepted ? 0 : 1);
}

main().catch((error: unknown) => {
  console.error("Error inesperado durante el análisis:", error);
  process.exit(2);
});
