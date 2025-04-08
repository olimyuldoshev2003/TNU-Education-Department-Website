import React from "react";

// Mui Icons
// import AppsOutageIcon from "@mui/icons-material/AppsOutage";
// import TextsmsIcon from "@mui/icons-material/Textsms";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import BookmarksIcon from "@mui/icons-material/Bookmarks";
// import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
// import WebhookIcon from "@mui/icons-material/Webhook";

// chart
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

// chart2
import { ScatterChart, ScatterChartProps } from "@mui/x-charts/ScatterChart";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Chance from "chance";

// chart3
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from "recharts";

// chart3
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface CustomizedRectangleProps {
  formattedGraphicalItems: Array<{
    props: { points: { x: number; y: number; payload: { name: React.Key } }[] };
  }>;
}

interface CustomizedRectangleProps {
  formattedGraphicalItems: Array<{
    props: { points: { x: number; y: number; payload: { name: React.Key } }[] };
  }>;
}

const CustomizedRectangle: React.FC<CustomizedRectangleProps> = (props) => {
  const { formattedGraphicalItems } = props;

  if (!formattedGraphicalItems || formattedGraphicalItems.length < 2)
    return null;

  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  return (
    <>
      {firstSeries.props.points.map((firstSeriesPoint, index) => {
        const secondSeriesPoint = secondSeries.props.points[index];
        const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;

        return (
          <Rectangle
            key={firstSeriesPoint.payload.name}
            width={10}
            height={Math.abs(yDifference)} // Ensure height is positive
            x={secondSeriesPoint.x - 5}
            y={Math.min(firstSeriesPoint.y, secondSeriesPoint.y)} // Proper y positioning
            fill={yDifference > 0 ? "red" : yDifference < 0 ? "green" : "none"}
          />
        );
      })}
    </>
  );
};

const chance = new Chance(42);
function getGaussianSeriesData(mean: number[], stdev = [0.3, 0.4], N = 50) {
  return [...Array(N)].map((_, i) => {
    const x =
      Math.sqrt(-2.0 * Math.log(1 - chance.floating({ min: 0, max: 0.99 }))) *
        Math.cos(2.0 * Math.PI * chance.floating({ min: 0, max: 0.99 })) *
        stdev[0] +
      mean[0];
    const y =
      Math.sqrt(-2.0 * Math.log(1 - chance.floating({ min: 0, max: 0.99 }))) *
        Math.cos(2.0 * Math.PI * chance.floating({ min: 0, max: 0.99 })) *
        stdev[1] +
      mean[1];
    return { x, y, id: i };
  });
}

// type LegendPosition = {
//   vertical: "top" | "middle" | "bottom";
//   horizontal: "left" | "middle" | "right";
// };

// type LegendSlotProps = {
//   position: LegendPosition;
//   direction: "row" | "column";
//   itemGap: number;
// };

const legendPlacement: ScatterChartProps["slotProps"] = {
  legend: {
    position: {
      vertical: "top",
      horizontal: "right",
    },
    direction: "row",
    itemGap: 16,
  },
};
const series11 = [
  { label: "Series 1", data: getGaussianSeriesData([-5, 0]) },
  { label: "Series 2", data: getGaussianSeriesData([-4, 0]) },
  { label: "Series 3", data: getGaussianSeriesData([-3, 0]) },
  { label: "Series 4", data: getGaussianSeriesData([-2, 0]) },
  { label: "Series 5", data: getGaussianSeriesData([-1, 0]) },
  { label: "Series 6", data: getGaussianSeriesData([0, 0]) },
  { label: "Series 7", data: getGaussianSeriesData([1, 0]) },
  { label: "Series 8", data: getGaussianSeriesData([2, 0]) },
  { label: "Series 9", data: getGaussianSeriesData([3, 0]) },
  { label: "Series 10", data: getGaussianSeriesData([4, 0]) },
  { label: "Series 11", data: getGaussianSeriesData([5, 0]) },
  { label: "Series 12", data: getGaussianSeriesData([6, 0]) },
  { label: "Series 13", data: getGaussianSeriesData([7, 0]) },
].map((s) => ({
  ...s,
  valueFormatter: (v: { x: number; y: number }) =>
    `(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`,
}));

const categories = {
  Category10: [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ],
  Accent: [
    "#7fc97f",
    "#beaed4",
    "#fdc086",
    "#ffff99",
    "#386cb0",
    "#f0027f",
    "#bf5b17",
    "#666666",
  ],
  Dark2: [
    "#1b9e77",
    "#d95f02",
    "#7570b3",
    "#e7298a",
    "#66a61e",
    "#e6ab02",
    "#a6761d",
    "#666666",
  ],
  Paired: [
    "#a6cee3",
    "#1f78b4",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
    "#6a3d9a",
    "#ffff99",
    "#b15928",
  ],
  Pastel1: [
    "#fbb4ae",
    "#b3cde3",
    "#ccebc5",
    "#decbe4",
    "#fed9a6",
    "#ffffcc",
    "#e5d8bd",
    "#fddaec",
    "#f2f2f2",
  ],
  Pastel2: [
    "#b3e2cd",
    "#fdcdac",
    "#cbd5e8",
    "#f4cae4",
    "#e6f5c9",
    "#fff2ae",
    "#f1e2cc",
    "#cccccc",
  ],
  Set1: [
    "#e41a1c",
    "#377eb8",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#ffff33",
    "#a65628",
    "#f781bf",
    "#999999",
  ],
  Set2: [
    "#66c2a5",
    "#fc8d62",
    "#8da0cb",
    "#e78ac3",
    "#a6d854",
    "#ffd92f",
    "#e5c494",
    "#b3b3b3",
  ],
  Set3: [
    "#8dd3c7",
    "#ffffb3",
    "#bebada",
    "#fb8072",
    "#80b1d3",
    "#fdb462",
    "#b3de69",
    "#fccde5",
    "#d9d9d9",
    "#bc80bd",
    "#ccebc5",
    "#ffed6f",
  ],
  Tableau10: [
    "#4e79a7",
    "#f28e2c",
    "#e15759",
    "#76b7b2",
    "#59a14f",
    "#edc949",
    "#af7aa1",
    "#ff9da7",
    "#9c755f",
    "#bab0ab",
  ],
};

const Admin = () => {
  // chart
  const [seriesNb, setSeriesNb] = React.useState(2);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const handleItemNbChange = (_: Event, newValue: number | number[]) => {
    // Ensure newValue is a single number, not an array
    if (Array.isArray(newValue)) {
      return;
    }
    setItemNb(newValue);
  };
  const handleSeriesNbChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      return; // Ignore arrays, since this is a single-value slider
    }
    setSeriesNb(newValue); // Set the state with the new number value
  };

  // chart2
  const [colorScheme, setColorScheme] = React.useState("Category10");

  return (
    <>
      <div className="admin_component ">
        {/*row1  */}
        <div className="flex justify-evenly flex-wrap items-start">
          {/* box1 */}
          <div className=" bg-[white] rounded-2xl sm:w-[100%] lg:w-[50%] p-[2%]">
            <div className="md:flex justify-evenly items-center">
              <div>
                <GraphicEqIcon></GraphicEqIcon>
                <h3 className="font-mono text-[30px]">
                  Welcome{" "}
                  <span className="text-[#190404] font-semibold text-[38px]">
                    Admin
                  </span>
                </h3>
                {/* <div className="flex">
                  <div className="mx-5">
                    <p className="text-[#b9b8b8] font-sans text-[18px]">
                      Budget
                    </p>
                    <p className="text-[22px] font-bold">$88,557</p>
                  </div>
                  <div>
                    <p className="text-[#b9b8b8] font-sans text-[18px]">
                      Expense
                    </p>
                    <p className="text-[22px] font-bold">$148,789</p>
                  </div>
                </div> */}
              </div>
              <img src="/public/welcome-bg.png" alt="" />
            </div>
            {/* <marquee
              direction="right"
              className="bg-[black] text-[45px] rounded-xl"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Hello Back David
              </span>
            </marquee> */}
            <div>
              {/* Row1 */}
              <div className="flex my-4 justify-evenly">
                {/* Row1_threeBox1 */}
                {/* <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex w-[30%] items-center shadow-md rounded-lg md:text-[20px] font-semibold">
                  <AppsOutageIcon sx={{ fontSize: "40px", margin: "2%" }} />
                  <div>
                    <p>Total</p>
                    <p className="text-[yellow]">$93,48</p>
                  </div>
                </div> */}

                {/* Row1_threeBox2 */}
                {/* <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex w-[30%] items-center shadow-md rounded-lg md:text-[20px] font-semibold">
                  <TextsmsIcon sx={{ fontSize: "40px", margin: "2%" }} />
                  <div>
                    <p>SMS</p>
                    <p className="text-[yellow]">$93,48</p>
                  </div>
                </div> */}

                {/* Row1_threeBox3 */}
                {/* <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex w-[30%] items-center shadow-md rounded-lg md:text-[20px] font-semibold">
                  <AdminPanelSettingsIcon
                    sx={{ fontSize: "40px", margin: "2%" }}
                  />
                  <div>
                    <p>Admin</p>
                    <p className="text-[yellow]">$93,48</p>
                  </div>
                </div> */}
              </div>
              {/* Row2 */}
              <div className="flex justify-evenly my-8">
                {/* Row1_threeBox1 */}
                {/* <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex w-[30%] items-center shadow-md rounded-lg md:text-[20px] font-semibold">
                  <BookmarksIcon sx={{ fontSize: "40px", margin: "2%" }} />
                  <div>
                    <p>Main Save</p>
                    <p className="text-[yellow]">$93,48</p>
                  </div>
                </div> */}

                {/* Row1_threeBox2 */}
                {/* <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex w-[30%] items-center shadow-md rounded-lg md:text-[20px] font-semibold">
                  <ConnectWithoutContactIcon
                    sx={{ fontSize: "40px", margin: "2%" }}
                  />
                  <div>
                    <p>Social</p>
                    <p className="text-[yellow]">$93,48</p>
                  </div>
                </div> */}

                {/* Row1_threeBox3 */}
                {/* <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex w-[30%] items-center shadow-md rounded-lg md:text-[20px] font-semibold">
                  <WebhookIcon sx={{ fontSize: "40px", margin: "2%" }} />
                  <div>
                    <p>Webcite</p>
                    <p className="text-[yellow]">$93,48</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* chart2 */}
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: "100%", maxWidth: 600 }}
            className="shadow-xl rounded-md p-[1%]"
          >
            <ScatterChart
              height={400}
              series={series11}
              yAxis={[{ min: -1.5, max: 1.5 }]}
              colors={categories[colorScheme as keyof typeof categories]}
              {...legendPlacement}
            />
            <TextField
              select
              defaultValue="Category10"
              onChange={(event) => setColorScheme(event.target.value)}
            >
              {Object.entries(categories).map(([name, colors]) => (
                <MenuItem key={name} value={name}>
                  <Stack direction="row" alignItems="center">
                    <Typography sx={{ mr: 2 }}>{name}</Typography>
                    <div style={{ width: 200, height: 20 }}>
                      {colors.map((c) => (
                        <div
                          key={c}
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor: c,
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </div>
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </div>

        {/* #Row2 */}
        <div className="my-8 md:flex justify-evenly">
          {/* chart3 */}
          <div className="shadow-xl rounded-md md:w-[50%]">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                <Customized
                  component={(props: any) => <CustomizedRectangle {...props} />}
                />
                ;
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="shadow-lg md:w-[45%] rounded-lg p-2">
            {/* chart1 */}
            <Box sx={{ width: "100%" }}>
              <BarChart
                height={300}
                series={series
                  .slice(0, seriesNb)
                  .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
                skipAnimation={skipAnimation}
              />
              ;
              <FormControlLabel
                checked={skipAnimation}
                control={
                  <Checkbox
                    onChange={(event) => setSkipAnimation(event.target.checked)}
                  />
                }
                label="skipAnimation"
                labelPlacement="end"
              />
              <Typography id="input-item-number" gutterBottom>
                Number of items
              </Typography>
              <Slider
                value={itemNb}
                onChange={handleItemNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={20}
                aria-labelledby="input-item-number"
              />
              <Typography id="input-series-number" gutterBottom>
                Number of series
              </Typography>
              <Slider
                value={seriesNb}
                onChange={handleSeriesNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={10}
                aria-labelledby="input-series-number"
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

const highlightScope = {
  highlighted: "series", // Ensure this is a valid HighlightOptions value
  faded: "global", // Ensure this is a valid HighlightOptions value
};

type HighlightOptions = {
  highlighted: "series" | "item" | "none"; // Adjust based on docs
  faded: "global" | "none";
};

const series = [
  {
    label: "series 1",
    data: [
      2423, 2210, 764, 1879, 1478, 1373, 1891, 2171, 620, 1269, 724, 1707, 1188,
      1879, 626, 1635, 2177, 516, 1793, 1598,
    ],
  },
  {
    label: "series 2",
    data: [
      2362, 2254, 1962, 1336, 586, 1069, 2194, 1629, 2173, 2031, 1757, 862,
      2446, 910, 2430, 2300, 805, 1835, 1684, 2197,
    ],
  },
  {
    label: "series 3",
    data: [
      1145, 1214, 975, 2266, 1768, 2341, 747, 1282, 1780, 1766, 2115, 1720,
      1057, 2000, 1716, 2253, 619, 1626, 1209, 1786,
    ],
  },
  {
    label: "series 4",
    data: [
      2361, 979, 2430, 1768, 1913, 2342, 1868, 1319, 1038, 2139, 1691, 935,
      2262, 1580, 692, 1559, 1344, 1442, 1593, 1889,
    ],
  },
  {
    label: "series 5",
    data: [
      968, 1371, 1381, 1060, 1327, 934, 1779, 1361, 878, 1055, 1737, 2380, 875,
      2408, 1066, 1802, 1442, 1567, 1552, 1742,
    ],
  },
  {
    label: "series 6",
    data: [
      2316, 1845, 2057, 1479, 1859, 1015, 1569, 1448, 1354, 1007, 799, 1748,
      1454, 1968, 1129, 1196, 2158, 540, 1482, 880,
    ],
  },
  {
    label: "series 7",
    data: [
      2140, 2082, 708, 2032, 554, 1365, 2121, 1639, 2430, 2440, 814, 1328, 883,
      1811, 2322, 1743, 700, 2131, 1473, 957,
    ],
  },
  {
    label: "series 8",
    data: [
      1074, 744, 2487, 823, 2252, 2317, 2139, 1818, 2256, 1769, 1123, 1461, 672,
      1335, 960, 1871, 2305, 1231, 2005, 908,
    ],
  },
  {
    label: "series 9",
    data: [
      1792, 886, 2472, 1546, 2164, 2323, 2435, 1268, 2368, 2158, 2200, 1316,
      552, 1874, 1771, 1038, 1838, 2029, 1793, 1117,
    ],
  },
  {
    label: "series 10",
    data: [
      1433, 1161, 1107, 1517, 1410, 1058, 676, 1280, 1936, 1774, 698, 1721,
      1421, 785, 1752, 800, 990, 1809, 1985, 665,
    ],
  },
].map((s) => ({
  ...s,
  highlightScope: highlightScope as HighlightOptions, // Ensure the correct type
}));

// // chart3
// Example.demoUrl =
//   "https://codesandbox.io/p/sandbox/customized-line-chart-76fvmv";

export default Admin;
