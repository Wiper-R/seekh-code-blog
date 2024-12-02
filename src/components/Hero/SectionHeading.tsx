export function SectionHeading({ heading }: { heading: string }) {
  return (
    <h3 className="text-center text-2xl md:text-4xl font-semibold text-black dark:text-white">
      {heading}
    </h3>
  );
}
