/// <reference types="node" />
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { documentUrl, getProjectDocuments } from "./project-documents";

describe("local project PDF configuration", () => {
  test("PDFs resolve only within the public project directory", () => {
    assert.equal(documentUrl("solar-design.pdf"), "/documents/projects/solar-design.pdf");
    assert.throws(() => documentUrl("https://example.com/report.pdf"));
    assert.throws(() => documentUrl("../report.pdf"));
  });
  test("multiple PDFs use the configured display order without mutating records", () => {
    const records = [
      { id: "drawing", filename: "drawing.pdf", title: "Drawing", description: "", order: 2 },
      { id: "report", filename: "report.pdf", title: "Report", description: "", order: 1 },
    ];
    assert.deepEqual(getProjectDocuments("solar", { solar: records }).map((d) => d.id), ["report", "drawing"]);
    assert.equal(records[0].id, "drawing");
  });
  test("unconfigured projects display no invented documents", () => {
    assert.deepEqual(getProjectDocuments("not-configured"), []);
  });
});