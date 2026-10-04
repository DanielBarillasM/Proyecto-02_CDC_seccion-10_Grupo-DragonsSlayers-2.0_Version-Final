import { describe, expect, it } from "vitest";
import { analyzeInput } from "../lib/analyze";
import { resultToJson } from "../lib/downloads";

describe("analysis JSON export", () => {
  it.each(["lexer", "parser", "semantic", "tac"] as const)("retains every result field and metadata in %s mode", (mode) => {
    const result = analyzeInput("let value: integer = 1; print(value);", mode);
    const { generatedBy, project, ...exportedResult } = JSON.parse(resultToJson(result));

    expect(exportedResult).toEqual(JSON.parse(JSON.stringify(result)));
    expect(generatedBy).toBe("ANTLR 4 + antlr4ts + visitors semánticos y generador TAC TypeScript");
    expect(project).toBe("Proyecto 2: Compiscript Semantic & TAC IDE");
  });

  it("retains errors and skipped phases", () => {
    const result = analyzeInput("let value: integer = ;", "tac");
    const exported = JSON.parse(resultToJson(result));

    expect(exported.accepted).toBe(false);
    expect(exported.syntaxErrors).toEqual(result.syntaxErrors);
    expect(exported.semantic.status).toBe("skipped");
    expect(exported.tac.status).toBe("skipped");
  });
});
