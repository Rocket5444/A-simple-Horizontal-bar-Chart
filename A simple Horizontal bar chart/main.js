const data = getData();
const options = {
  container: document.getElementById("myChart"),
  data,
  title: {
    text: "Weekly Earnings",
  },
  footnote: {
    text: "Source: Office for National Statistics",
  },
  series: [
    {
      type: "bar",
      direction: "horizontal",
      xKey: "type",
      yKey: "earnings",
      cornerRadius: 4,
      errorBar: {
        yLowerKey: "earningsLower",
        yUpperKey: "earningsUpper",
      },
      label: {
        formatter: ({ value }) => `£${value.toFixed(0)}`,
      },
      formatter: ({ datum, yKey }) => ({
        fillOpacity: getOpacity(datum[yKey], yKey, 0.4, 1),
      }),
    },
  ],
  axes: [
    {
      type: "category",
      position: "left",
    },
    {
      type: "number",
      position: "bottom",
      title: {
        enabled: true,
        text: "£ / Week",
      },
    },
  ],
};

function getOpacity(value, key, minOpacity, maxOpacity) {
  const [min, max] = getDomain(key);
  let alpha = Math.round(((value - min) / (max - min)) * 10) / 10;
  return map(alpha, 0, 1, minOpacity, maxOpacity);
}

function getDomain(key) {
  const min = Math.min(...data.map((d) => d[key]));
  const max = Math.max(...data.map((d) => d[key]));
  return [min, max];
}

const map = (value, start1, end1, start2, end2) => {
  return ((value - start1) / (end1 - start1)) * (end2 - start2) + start2;
};

agCharts.AgCharts.create(options);
