const DayWeather = ({ date, temp }) => {
  return (
    <div className="text-xl p-4 border rounded-md border-white">
      <h3>{date}</h3>
      <h2>Temperature: {temp} C</h2>
    </div>
  );
};

export default DayWeather;
