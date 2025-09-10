type Cohort = "randomized_intervention" | "ati" | "follow_up";

interface TableRow {
  interval: string;
  planned_visit_interval: number;
  allowed_interval_visit: number | "N/A";
}

type TableData = {
  [K in Cohort]: TableRow[];
};
