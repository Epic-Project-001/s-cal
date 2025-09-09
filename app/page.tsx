import Calculator from "@/components/StudyDateCalculator";
import ResultsTable from "@/components/ResultsTable";

export default function Home() {
  return (
    <div className="grow flex flex-col">
      <Calculator />
      <ResultsTable />
    </div>
  );
}
