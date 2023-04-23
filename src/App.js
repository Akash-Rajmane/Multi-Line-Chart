import React, { useRef, useEffect } from "react";
import { nest } from "d3-collection";
import * as d3 from "d3";

function App() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", 800)
      .attr("height", 800)
      .style("margin", 50)
      .style("overflow", "visible");

    const data = [
      { continent: "Africa", year: 1950, population: 228 },
      { continent: "Africa", year: 1955, population: 254 },
      { continent: "Africa", year: 1960, population: 285 },
      { continent: "Africa", year: 1965, population: 322 },
      { continent: "Africa", year: 1970, population: 366 },
      { continent: "Africa", year: 1975, population: 417 },
      { continent: "Africa", year: 1980, population: 479 },
      { continent: "Europe", year: 1950, population: 543 },
      { continent: "Europe", year: 1955, population: 574 },
      { continent: "Europe", year: 1960, population: 605 },
      { continent: "Europe", year: 1965, population: 634 },
      { continent: "Europe", year: 1970, population: 657 },
      { continent: "Europe", year: 1975, population: 677 },
      { continent: "Europe", year: 1980, population: 694 },
      { continent: "The Americas", year: 1950, population: 331 },
      { continent: "The Americas", year: 1955, population: 370 },
      { continent: "The Americas", year: 1960, population: 416 },
      { continent: "The Americas", year: 1965, population: 464 },
      { continent: "The Americas", year: 1970, population: 511 },
      { continent: "The Americas", year: 1975, population: 561 },
      { continent: "The Americas", year: 1980, population: 613 }
    ];

    const nested_data = nest()
      .key((d) => d.continent)
      .entries(data);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, 600]);

    svg
      .append("g")
      .attr("transform", "translate(50,700)")
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(8));

    const yScale = d3.scaleLinear().domain([700, 0]).range([0, 500]);

    svg
      .append("g")
      .attr("transform", "translate(50,200)")
      .call(d3.axisLeft(yScale));

    const color = ["red", "green", "orange"];

    const line = d3
      .line()
      .x(function (d) {
        return xScale(d.year);
      })
      .y(function (d) {
        return yScale(d.population);
      });

    svg
      .selectAll("lines")
      .data(nested_data)
      .enter()
      .append("g")
      .attr("transform", "translate(50,200)")
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d, i) => color[i])
      .attr("stroke-width", 1.5)
      .attr("d", (d) => line(d.values));

    svg.append("text").text("Year").attr("transform", "translate(350,750)");

    svg
      .append("text")
      .text("Population (in Millions)")
      .attr("transform", "translate(5,500)rotate(-90)");

    const continents = nested_data.map((d) => d.key);

    svg
      .selectAll("legends")
      .data(continents)
      .join("rect")
      .attr("x", 350)
      .attr("y", (d, i) => 50 + 25 * i)
      .attr("width", 50)
      .attr("height", 5)
      .style("fill", (d, i) => color[i]);

    svg
      .selectAll("labels")
      .data(continents)
      .join("text")
      .text((d) => d)
      .attr("x", 410)
      .attr("y", (d, i) => 50 + 25 * i)
      .attr("alignment-baseline", "central")
      .style("fill", (d, i) => color[i]);
  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default App;
