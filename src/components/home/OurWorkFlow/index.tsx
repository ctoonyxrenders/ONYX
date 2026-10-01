import ProcessSteps from "@/components/shared/ProcessSteps";
import { list } from "./StaticData";

export default function OurWorkFlow() {
  return (
    <ProcessSteps
      heading={"From drawings to final\nimages in [four steps]"}
      intro="No drawings? Sketches, photos or a reference board are enough to start."
      steps={list}
    />
  );
}