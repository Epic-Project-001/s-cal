import Calculator from "@/components/StudyDateCalculator";
import Results from "@/components/Results";

export default function Home() {
  return (
    <div className="grow flex flex-col">
      <Calculator />
      <Results />
    </div>
  );
}
