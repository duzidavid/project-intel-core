import { SignalAnalyzer } from './Analyzer';
import { AnalysisSignal, AnalysisRisk } from '../model';

export class RiskMapperAnalyzer implements SignalAnalyzer {
    readonly name = 'RiskMapperAnalyzer';

    analyze(signals: AnalysisSignal[]): AnalysisRisk[] {
        const risks: AnalysisRisk[] = [];

        const signalCodes = new Set(signals.map(s => s.code));

        // ── Rule: GPL license detected ───────────────────────────────
        const gplLicenses = [
            'license.gpl',
            'license.gpl-2.0',
            'license.gpl-3.0'
        ];

        if (gplLicenses.some(code => signalCodes.has(code))) {
            risks.push({
                category: 'legal',
                severity: 'high',
                code: 'risk.license.gpl',
                description: 'GPL license detected, which may impose strong copyleft obligations.',
                relatedSignals: [...signalCodes].filter(c => c.startsWith('license.'))
            });
        }

        // ── Rule: missing license ────────────────────────────────────
        const hasLicense = [...signalCodes].some(c => c.startsWith('license.'));
        if (!hasLicense) {
            risks.push({
                category: 'legal',
                severity: 'medium',
                code: 'risk.license.missing',
                description: 'No license information found in the project.',
                relatedSignals: []
            });
        }

        // ── Rule: too many dependencies ──────────────────────────────
        const dependencyCount = [...signalCodes].filter(c =>
            c.startsWith('dependency.')
        ).length;

        if (dependencyCount > 50) {
            risks.push({
                category: 'maintainability',
                severity: 'medium',
                code: 'risk.dependencies.too_many',
                description: `Project has a high number of dependencies (${dependencyCount}).`,
                relatedSignals: [...signalCodes].filter(c =>
                    c.startsWith('dependency.')
                )
            });
        }

        return risks;
    }
}