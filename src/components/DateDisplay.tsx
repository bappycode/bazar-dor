const DateDisplay = async () => {
  "use cache";

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      {date}
    </p>
  );
};

export default DateDisplay;