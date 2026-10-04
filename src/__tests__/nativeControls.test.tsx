import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { analyzeInput } from "../lib/analyze";
import { DocumentationPanel } from "../ui/components/DocumentationPanel";
import { ProblemsPanel } from "../ui/components/ProblemsPanel";
import { SymbolTablePanel } from "../ui/components/SymbolTablePanel";

describe("native IDE controls", () => {
  it("opens all documentation sections with native disclosure controls", () => {
    const markup = renderToStaticMarkup(<DocumentationPanel />);
    expect(markup.match(/<details open=""/g)).toHaveLength(8);
    expect(markup.match(/<summary>/g)).toHaveLength(8);
    expect(markup).toContain("Catálogo de diagnósticos semánticos");
  });

  it("labels the native severity filter and retains all options", () => {
    const result = analyzeInput("print(missing);", "semantic");
    const markup = renderToStaticMarkup(<ProblemsPanel result={result} onRevealLine={() => {}} />);
    expect(markup).toContain('aria-label="Filtrar por severidad"');
    expect(markup.match(/<select\b/g)).toHaveLength(1);
    expect(markup).toContain('<option value="all" selected="">Todos</option>');
    expect(markup).toContain('<option value="error">Errores</option>');
    expect(markup).toContain('<option value="warning">Warnings</option>');
  });

  it("labels symbol filters and builds native options from analysis results", () => {
    const result = analyzeInput("let value: integer = 1;", "semantic");
    const markup = renderToStaticMarkup(<SymbolTablePanel result={result} />);
    expect(markup.match(/<select\b/g)).toHaveLength(2);
    expect(markup).toContain('aria-label="Filtrar por clase de símbolo"');
    expect(markup).toContain('aria-label="Filtrar por ámbito"');
    expect(markup).toContain('<option value="variable">variable</option>');
    expect(markup).toContain('<option value="scope-0">global');
  });
});
