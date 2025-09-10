function interventionSequence(n: number) {
  if (n === 1) return 14;
  if (n === 2) return 28;
  if (n === 3) return 56;
  return 84 * (n - 3);
}

function weeklySequence(n: number) {
  if (n < 10) return 7 * n;
  return 84;
}

export const tableData: TableData = {
  randomized_intervention: [
    {
      interval: "Screening/Day 1",
      planned_visit_interval: 0,
      allowed_interval_visit: "N/A",
    },
    ...Array.from({ length: 7 }, (_, index): TableRow => {
      const isWeekTwo = index === 0;
      return {
        interval: `${isWeekTwo ? "Week 2" : `Month ${index}`} `,
        planned_visit_interval: interventionSequence(index + 1),
        allowed_interval_visit: isWeekTwo ? 2 : 7,
      };
    }),
  ],
  ati: [
    ...Array.from(
      { length: 11 },
      (_, index): TableRow => ({
        interval: `Week ${index === 10 ? 12 : index + 1}`,
        planned_visit_interval: weeklySequence(index + 1),
        allowed_interval_visit: 2,
      })
    ),
  ],
  follow_up: [
    ...Array.from({ length: 11 }, (_, index): TableRow => {
      const isWeekTwo = index === 0;
      return {
        interval: isWeekTwo ? "Week 2" : `Month ${index}`,
        planned_visit_interval: interventionSequence(index + 1),
        allowed_interval_visit: isWeekTwo ? 2 : 7,
      };
    }),
  ],
};
