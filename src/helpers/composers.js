const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const composeCurrentYearData = (records) => {
  let data = [];
  let current_month = new Date().getMonth() + 1;
  let count = 1;
  let index = 0;
  while (count <= current_month) {
    const coordinates = {};
    const current_count = count;
    const current_month_records = records.filter(
      (record) =>
        parseInt(record.contribution_date.split("-")[1]) === current_count
    );
    const sum = current_month_records.reduce(
      (a, b) => a + parseFloat(b.amount),
      0
    );
    coordinates.month = months[index];
    coordinates.contribution = sum;
    data.push(coordinates);
    count += 1;
    index += 1;
  }
  return data;
};

// Don't delete this function because another function is using it
const composeAnnualData = (records, span) => {
  let data = [];
  let year = new Date().getFullYear();
  let count = span;
  while (count > 0) {
    const coordinates = {};
    const current_year = year;
    const annual_record = records.filter(
      (record) =>
        parseInt(record.contribution_date.split("-")[0]) === current_year
    );
    const sum = annual_record.reduce((a, b) => a + parseFloat(b.amount), 0);
    coordinates.year = year.toString();
    coordinates.contribution = sum;
    data.push(coordinates);
    year -= 1;
    count -= 1;
  }
  return data.reverse();
};

const composeAveContribution = (records, span) => {
  const data = [];
  const composedData = composeAnnualData(records, span);
  for (let coordinate of composedData) {
    const annual_records = records.filter(
      (record) => record.contribution_date.split("-")[0] === coordinate.year
    );
    const structuredData = composeData(annual_records, coordinate.year);
    data.push(structuredData);
  }
  return data;
};

const composeData = (records, year) => {
  let month_count = 1;
  const coordinates = { year: year };
  for (let month of months) {
    const current_month = month_count;
    const month_records = records.filter(
      (record) =>
        parseInt(record.contribution_date.split("-")[1]) === current_month
    );
    const sum = month_records.reduce((a, b) => a + parseFloat(b.amount), 0);
    coordinates[month] = sum;
    month_count += 1;
  }
  return coordinates;
};

const composeAnnualIncDecData = (records, span) => {
  const annualData = composeAnnualData(records, span);
  const data = [["year", "a", "b", "c", "d"]];
  let prev;
  for (let record of annualData) {
    const coordinates = [record.year];
    const contribution = record.contribution;
    if (annualData.indexOf(record) === 0) {
      prev = 0;
      coordinates.push(prev, prev, contribution, contribution);
      data.push(coordinates);
    } else {
      const incOrDec = contribution - prev;
      coordinates.push(prev, prev, incOrDec, incOrDec);
      data.push(coordinates);
    }
    prev = contribution;
  }
  return data;
};

export {
  composeCurrentYearData,
  composeAveContribution,
  composeAnnualData,
  composeAnnualIncDecData,
};
