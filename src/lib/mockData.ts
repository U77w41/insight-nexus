// AML / Fraud Detection Mock Data
export interface FeatureImportance {
  feature: string;
  importance: number;
  direction: "positive" | "negative";
}

export interface BeeswarmPoint {
  feature: string;
  shapValue: number;
  featureValue: number;
}

export interface WaterfallStep {
  feature: string;
  contribution: number;
  cumulative: number;
}

export interface DataRow {
  id: number;
  transaction_velocity: number;
  account_age: number;
  risk_score: number;
  avg_transaction_amount: number;
  num_countries: number;
  is_pep: boolean;
  kyc_completeness: number;
  transaction_frequency: number;
  dormancy_period: number;
  prediction: number;
  label: string;
}

export interface TokenWeight {
  token: string;
  weight: number;
}

export const featureImportances: FeatureImportance[] = [
  { feature: "transaction_velocity", importance: 0.342, direction: "positive" },
  { feature: "risk_score", importance: 0.287, direction: "positive" },
  { feature: "num_countries", importance: 0.198, direction: "positive" },
  { feature: "account_age", importance: 0.176, direction: "negative" },
  { feature: "avg_transaction_amount", importance: 0.154, direction: "positive" },
  { feature: "dormancy_period", importance: 0.132, direction: "positive" },
  { feature: "kyc_completeness", importance: 0.118, direction: "negative" },
  { feature: "is_pep", importance: 0.097, direction: "positive" },
  { feature: "transaction_frequency", importance: 0.083, direction: "positive" },
];

export const generateBeeswarmData = (): BeeswarmPoint[] => {
  const features = featureImportances.map((f) => f.feature);
  const points: BeeswarmPoint[] = [];
  features.forEach((feature) => {
    for (let i = 0; i < 40; i++) {
      points.push({
        feature,
        shapValue: (Math.random() - 0.45) * 0.6,
        featureValue: Math.random(),
      });
    }
  });
  return points;
};

export const generateWaterfallData = (rowId: number): WaterfallStep[] => {
  const seed = rowId * 7;
  const steps: WaterfallStep[] = [
    { feature: "E[f(X)] = 0.312", contribution: 0.312, cumulative: 0.312 },
    { feature: "transaction_velocity", contribution: 0.15 + (seed % 5) * 0.02, cumulative: 0 },
    { feature: "risk_score", contribution: 0.12 + (seed % 3) * 0.01, cumulative: 0 },
    { feature: "num_countries", contribution: 0.08 - (seed % 4) * 0.03, cumulative: 0 },
    { feature: "account_age", contribution: -0.09 - (seed % 2) * 0.02, cumulative: 0 },
    { feature: "kyc_completeness", contribution: -0.06 + (seed % 3) * 0.01, cumulative: 0 },
    { feature: "avg_transaction_amount", contribution: 0.05 + (seed % 2) * 0.02, cumulative: 0 },
    { feature: "dormancy_period", contribution: 0.03 - (seed % 5) * 0.01, cumulative: 0 },
  ];
  let cum = steps[0].contribution;
  for (let i = 1; i < steps.length; i++) {
    cum += steps[i].contribution;
    steps[i].cumulative = parseFloat(cum.toFixed(4));
  }
  return steps;
};

export const dataRows: DataRow[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  transaction_velocity: parseFloat((Math.random() * 100).toFixed(1)),
  account_age: Math.floor(Math.random() * 3650),
  risk_score: parseFloat((Math.random() * 100).toFixed(2)),
  avg_transaction_amount: parseFloat((Math.random() * 50000).toFixed(2)),
  num_countries: Math.floor(Math.random() * 15) + 1,
  is_pep: Math.random() > 0.85,
  kyc_completeness: parseFloat((Math.random() * 100).toFixed(1)),
  transaction_frequency: Math.floor(Math.random() * 200),
  dormancy_period: Math.floor(Math.random() * 365),
  prediction: parseFloat((Math.random()).toFixed(4)),
  label: Math.random() > 0.7 ? "Suspicious" : "Legitimate",
}));

export const textTokens: TokenWeight[] = [
  { token: "The", weight: 0.01 },
  { token: "account", weight: 0.15 },
  { token: "holder", weight: 0.08 },
  { token: "initiated", weight: 0.03 },
  { token: "multiple", weight: 0.22 },
  { token: "high-value", weight: 0.45 },
  { token: "wire", weight: 0.38 },
  { token: "transfers", weight: 0.41 },
  { token: "to", weight: -0.02 },
  { token: "offshore", weight: 0.62 },
  { token: "accounts", weight: 0.28 },
  { token: "in", weight: -0.01 },
  { token: "jurisdictions", weight: 0.35 },
  { token: "with", weight: -0.01 },
  { token: "known", weight: 0.18 },
  { token: "secrecy", weight: 0.55 },
  { token: "laws.", weight: 0.05 },
  { token: "The", weight: 0.01 },
  { token: "pattern", weight: 0.30 },
  { token: "suggests", weight: 0.12 },
  { token: "structuring", weight: 0.58 },
  { token: "behavior", weight: 0.20 },
  { token: "consistent", weight: 0.10 },
  { token: "with", weight: -0.01 },
  { token: "layering", weight: 0.65 },
  { token: "techniques.", weight: 0.08 },
  { token: "Account", weight: 0.12 },
  { token: "activity", weight: 0.25 },
  { token: "remained", weight: -0.05 },
  { token: "dormant", weight: -0.35 },
  { token: "for", weight: -0.01 },
  { token: "18", weight: 0.15 },
  { token: "months", weight: -0.08 },
  { token: "before", weight: -0.03 },
  { token: "sudden", weight: 0.42 },
  { token: "reactivation.", weight: 0.38 },
];

export const modelSummary = {
  format: "XGBoost (.pkl)",
  modality: "Tabular",
  features: 9,
  parameters: "2.4M",
  baseValue: 0.312,
  accuracy: 0.943,
  auc: 0.971,
};

export const loadingSteps = [
  { label: "Loading Model Weights...", duration: 800 },
  { label: "Parsing Feature Schema...", duration: 600 },
  { label: "Running Inference Pipeline...", duration: 1200 },
  { label: "Computing SHAP Gradients...", duration: 1500 },
  { label: "Aggregating Explanations...", duration: 700 },
  { label: "Rendering Visualizations...", duration: 500 },
];

export const historyItems = [
  { id: 1, name: "AML Fraud Classifier v2.1", date: "2026-03-07", status: "completed" as const },
  { id: 2, name: "Credit Risk Model", date: "2026-03-05", status: "completed" as const },
  { id: 3, name: "NLP Sentiment (BERT)", date: "2026-03-03", status: "completed" as const },
  { id: 4, name: "ResNet-50 Image Cls", date: "2026-02-28", status: "failed" as const },
  { id: 5, name: "Anomaly Detection v1", date: "2026-02-25", status: "completed" as const },
];
