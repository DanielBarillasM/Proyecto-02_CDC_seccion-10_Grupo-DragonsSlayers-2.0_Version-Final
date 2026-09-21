import type { ProgramContext } from "../generated/CompiscriptParser";
import type { SemanticAnalysisResult } from "../lib/types";
import type { TacGenerationResult } from "./types";
import { generateTacV2 } from "./generatorV2";

/**
 * Punto de entrada estable para la generación de código de tres direcciones.
 * La implementación dirigida por los contextos tipados de ANTLR vive en
 * `generatorV2.ts`; esta fachada evita mantener dos generadores divergentes.
 */
export function generateTac(
  program: ProgramContext,
  semantic: SemanticAnalysisResult
): TacGenerationResult {
  return generateTacV2(program, semantic);
}
