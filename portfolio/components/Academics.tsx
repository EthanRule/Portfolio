export default function Academics() {
  return (
    <div className="relative h-0">
      <DegreeInformation />
    </div>
  );
}

function DegreeInformation() {
  return (
    <div
      className="absolute bottom-0 left-0 z-50 bg-zinc-950 pr-6 pt-6 pb-6 text-zinc-300 text-sm"
      style={{
        width: "220px",
        height: "220px",
      }}
    >
      <div className="pt-24 -ml-2 flex flex-col items-center">
        <div className="mb-2">
          <img
            src="/Project-Images/wsu.png"
            alt="Washington State University"
            className="h-12 w-auto mb-2"
          />
        </div>
        <p className="mb-1 text-center">
          BS Comp Sci • 2024
        </p>
      </div>
    </div>
  );
}
