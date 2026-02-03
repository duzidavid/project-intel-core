# Project Intel Core

Project Intel Core is a deterministic analysis engine for software projects.

Its purpose is to scan a project repository, extract structured factual signals,
derive potential risks from those signals, and provide a stable, machine-readable
output for downstream tools such as CLI applications, web UIs, CI pipelines, or AI layers.

This repository intentionally contains no AI, no UI, and no recommendations.

---

## Scope

This project is:
- a core analysis engine
- deterministic and reproducible
- designed to run locally, in CI/CD, or on servers
- a reusable foundation for multiple higher-level products

This project is not:
- an AI assistant
- a legal advisor
- a UI application
- opinionated about best practices

Interpretation and recommendations are explicitly out of scope.

---

## Analysis Model

The analysis pipeline is split into two explicit phases:

```
Filesystem
  ↓
File Analyzers
  ↓
Analysis Signals
  ↓
Signal Analyzers
  ↓
Analysis Risks
```

---

## Signals

Signals represent factual observations about a project.

```ts
export type SignalKind =
  | 'language'
  | 'framework'
  | 'runtime'
  | 'tooling'
  | 'architecture'
  | 'license'
  | 'dependency'
  | 'pattern'
  | 'config';

export interface AnalysisSignal {
  kind: SignalKind;
  code: string;
  value: string;
  source: string;
  confidence?: number;
  meta?: Record<string, unknown>;
}
```

---

## Risks

Risks are derived from signals using deterministic rules.

```ts
export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface AnalysisRisk {
  category: 'security' | 'maintainability' | 'performance' | 'legal' | 'unknown';
  severity: RiskSeverity;
  code: string;
  description: string;
  relatedSignals: string[];
  meta?: Record<string, unknown>;
}
```

---

## Analyzers

File analyzers operate on filesystem data.

```ts
export interface AnalyzerResult {
  signals: AnalysisSignal[];
  risks: AnalysisRisk[];
}

export interface Analyzer {
  readonly name: string;
  analyze(files: FileEntry[]): AnalyzerResult;
}
```

Signal analyzers operate only on signals.

```ts
export interface SignalAnalyzer {
  readonly name: string;
  analyze(signals: AnalysisSignal[]): AnalysisRisk[];
}
```

---

## Project Context

```ts
export interface ProjectContext {
  meta: {
    analyzedAt: string;
    rootPath: string;
    fileCount: number;
  };
  files: {
    path: string;
    size: number;
  }[];
  signals: AnalysisSignal[];
  risks: AnalysisRisk[];
}
```

---

## Testing and Constraints

- deterministic output
- no side effects
- no global state
- no IO outside analyzers
- stable public API