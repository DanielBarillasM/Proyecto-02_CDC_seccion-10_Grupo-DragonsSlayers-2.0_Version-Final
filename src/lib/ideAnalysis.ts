import { analyzeInput } from "./analyze";
import type { AnalyzeResult } from "./types";

/**
 * Ejecuta desde el IDE el pipeline completo sobre la fuente visible.
 *
 * El modo TAC incluye lexer, parser y semántica. Si alguna fase falla,
 * `analyzeInput` devuelve TAC con estado `skipped` y una causa explícita.
 */
export function analyzeForIde(input: string): AnalyzeResult {
  return analyzeInput(input, "tac");
}
