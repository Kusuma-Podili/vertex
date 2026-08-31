export interface CohortRow {
  cohortMonth: string;
  totalCustomers: number;
  retentionByMonth: number[]; // [100, 45.2, 38.1, 34.0, ...]
}

export function computeCohortRetentionRate(
  cohorts: Array<{ month: string; initial: number; activeMonthly: number[] }>
): CohortRow[] {
  return cohorts.map(c => ({
    cohortMonth: c.month,
    totalCustomers: c.initial,
    retentionByMonth: c.activeMonthly.map(act => Math.round((act / c.initial) * 1000) / 10),
  }));
}
