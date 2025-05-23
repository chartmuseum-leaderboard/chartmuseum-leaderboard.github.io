"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery, useTheme } from "@mui/material";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export interface ModelData {
  model: string;
  Size: string;
  visual: number;
  text: number;
  synthesis: number;
  "visual/text": number;
  overall: number;
  link?: string;
  color?: string;
  [key: string]: string | number | undefined;
}

const columnToPrettyName: { [key: string]: string } = {
  "visual": "Visual",
  "text": "Text",
  "synthesis": "Synthesis", 
  "visual/text": "Visual/Text",
  "overall": "Overall"
};

interface LeaderboardProps {
  scoresData: ModelData[];
}

const normalizeScore = (value: number, min: number, max: number): number =>
  Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

export default function Leaderboard({ scoresData }: LeaderboardProps) {
  const allColumns = Object.keys(scoresData[0]).filter(
    (key) => !["model", "Size", "overall", "color", "link"].includes(key)
  ) as (keyof ModelData)[];
  const allModels = scoresData.map((item) => item.model);
  const colorPalette = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

  const [chartFontSize, setChartFontSize] = useState("15px");
  const [selectedColumns, setSelectedColumns] =
    useState<(keyof ModelData)[]>(allColumns);
  const [selectedModels, setSelectedModels] = useState<string[]>([
    "o3 (high)",
    "o4-mini (high)",
    "Gemini-2.5-Pro",
    "Claude-3.7-Sonnet",
    "GPT-4.1",
    "Bespoke-MiniChart-7B",
    "Qwen2.5-VL-72B",
    "Qwen2.5-VL-7B",
  ]);
  const [sortColumn, setSortColumn] = useState<NumericDataColumn | "Size">("overall");
  const [maxNumModelsOptions, setMaxNumModelsOptions] = useState<number>(3);
  const [maxNumColumnsOptions, setMaxNumColumnsOptions] = useState<number>(3);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const filteredData = useMemo(
    () => scoresData.filter((item) => selectedModels.includes(item.model)),
    [selectedModels, scoresData]
  );

  const sortedData = useMemo(
    () =>
      [...filteredData].sort((a, b) => {
        if (sortColumn === "Size") {
          // Handle Size column sorting
          const sizeA = a.Size || "∞"; // Use infinity symbol if size is not available
          const sizeB = b.Size || "∞";
          
          // Parse sizes to numbers for comparison
          const parseSize = (size: string): number => {
            if (!size || size === "∞") return Infinity;
            
            const match = size.match(/(\d+(?:\.\d+)?)\s*([KMGT]?B?)/i);
            if (!match) return Infinity;
            
            const value = parseFloat(match[1]);
            const unit = match[2]?.toUpperCase() || "";
            
            // Convert to a common unit (e.g., MB)
            switch (unit) {
              case "B": return value / 1e6;
              case "KB": return value / 1e3;
              case "MB": case "M": return value;
              case "GB": case "G": return value * 1e3;
              case "TB": case "T": return value * 1e6;
              default: return value;
            }
          };
          
          // Sort in descending order (largest to smallest)
          return parseSize(sizeB) - parseSize(sizeA);
        }
        
        if (sortColumn === "overall") {
          const overallDiff = (b[sortColumn] as number) - (a[sortColumn] as number);
          if (Math.abs(overallDiff) < 0.05) {
            return a.model.localeCompare(b.model);
          }
          return overallDiff;
        }
        return (b[sortColumn] as number) - (a[sortColumn] as number);
      }),
    [filteredData, sortColumn]
  );

  const metricRanges = useMemo(() => {
    const ranges: { [key: string]: { min: number; max: number } } = {};
    allColumns.forEach((column) => {
      const values = scoresData.map((item) => item[column] as number);
      const dbg = scoresData.map((item) => ({
        model: item["model"],
        column: item[column],
      }));
      ranges[column] = {
        min: Math.floor(Math.min(...values)),
        max: Math.ceil(Math.max(...values)),
      };
    });
    return ranges;
  }, [allColumns, scoresData]);

  const chartData = useMemo(
    () => {
      // Define the specific order you want
      const orderedColumns = [ "text", "visual/text", "visual", "synthesis"];
      
      // Filter selectedColumns to only include ones in our order and sort them accordingly
      const orderedSelectedColumns = orderedColumns.filter(col => 
        selectedColumns.includes(col as keyof ModelData)
      ) as (keyof ModelData)[];
      
      return orderedSelectedColumns.map((column) => {
        // Use pretty names for the column labels (capitalize first letter)
        const entry: { [key: string]: string | number } = {
          // Use the pretty name from columnToPrettyName if available
          column: column in columnToPrettyName ? columnToPrettyName[column as string] : column,
        };
        
        filteredData.forEach((item) => {
          entry[item.model] = item[column] as number;
        });
        return entry;
      });
    },
    [selectedColumns, filteredData]
  );

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    if (isXl) {
      setChartFontSize("15px");
      setMaxNumModelsOptions(1);
      setMaxNumColumnsOptions(1);
    } else if (isLg) {
      setChartFontSize("12px");
      setMaxNumModelsOptions(1);
      setMaxNumColumnsOptions(1);
    } else if (isMd || isSm) {
      setChartFontSize("12px");
      setMaxNumModelsOptions(3);
      setMaxNumColumnsOptions(5);
    } else {
      setChartFontSize("10px");
      setMaxNumModelsOptions(1);
      setMaxNumColumnsOptions(1);
    }
  }, [isXl, isLg, isMd, isSm]);

  const modelOptions: Option[] = allModels.map((model) => ({
    label: model,
    value: model,
  }));
  const columnOptions: Option[] = allColumns.map((column) => ({
    label: columnToPrettyName[column as string] || column as string,
    value: column as string,
  }));

  return (
    <div className="flex flex-col items-stretch p-4">
      <div className="flex lg:flex-row flex-col shadow border rounded-lg p-2 inline-flex mb-4">
        <div className="flex lg:w-1/2">
          <ModelSelector
            options={modelOptions}
            value={selectedModels}
            onChange={setSelectedModels}
            maxCount={maxNumModelsOptions}
          />
        </div>
        <div className="flex lg:w-1/2">
          <ColumnSelector
            options={columnOptions}
            value={selectedColumns as string[]}
            onChange={setSelectedColumns}
            maxCount={maxNumColumnsOptions}
          />
        </div>
      </div>
      {selectedModels.length > 0 && selectedColumns.length > 0 ? (
        <Card className="mb-4 rounded-lg shadow-0">
          <CardHeader className="flex flex-row items-stretch space-y-0 border-b p-0">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 border-r">
              <CardTitle className="text-lg sm:text-xl">
                Model Comparison
              </CardTitle>
              <CardDescription className="sm:text-sm text-xs">
                Compare model performance across different metrics.
              </CardDescription>
            </div>
            <div className="flex flex-col items-center justify-center sm:px-6 sm:py-4 px-3 py-2">
              <h2 className="font-bold text-accented tracking-tight sm:text-xl text-lg">
                {selectedModels.length} / {modelOptions.length}{" "}
              </h2>
              <span className="text-muted-foreground sm:text-sm text-xs text-center">
                selected / available models
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <RadarChartComponent
              chartData={chartData}
              filteredData={filteredData}
              colorPalette={colorPalette}
              chartFontSize={chartFontSize}
              hoveredModel={hoveredModel}
              setHoveredModel={setHoveredModel}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="border p-2 shadow mb-4">
          <p className="text-muted-foreground">
            Please select a model or a column to display data.
          </p>
        </div>
      )}
      {selectedModels.length > 0 && (
        <div className="mb-4">
          <TableComponent
            sortedData={sortedData}
            selectedColumns={selectedColumns}
            sortColumn={sortColumn}
            requestSort={setSortColumn}
          />
        </div>
      )}
    </div>
  );
}

// Type definitions
type Option = { label: string; value: string };
type NumericDataColumn =
  | Exclude<keyof ModelData, "model" | "Size" | "color" | "link">
  | "overall";

// Utility functions
const isNumber = (value: any): value is number =>
  typeof value === "number" && !isNaN(value);

// Components
interface SelectorProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  maxCount: number;
}

const ModelSelector: React.FC<SelectorProps> = ({
  options,
  value,
  onChange,
  maxCount,
}) => (
  <div className="flex flex-col mr-4 lg:mb-0 mb-2">
    <MultiSelect
      options={options}
      onValueChange={onChange}
      defaultValue={value}
      placeholder="Select models"
      maxCount={maxCount}
    />
  </div>
);

const ColumnSelector: React.FC<SelectorProps> = ({
  options,
  value,
  onChange,
  maxCount,
}) => (
  <div className="flex-grow mr-4">
    <MultiSelect
      options={options}
      onValueChange={onChange}
      defaultValue={value}
      placeholder="Select columns"
      maxCount={maxCount}
    />
  </div>
);

interface RadarChartComponentProps {
  chartData: any[];
  filteredData: ModelData[];
  colorPalette: string[];
  chartFontSize: string;
  hoveredModel: string | null;
  setHoveredModel: React.Dispatch<React.SetStateAction<string | null>>;
}

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({
  chartData,
  filteredData,
  colorPalette,
  chartFontSize,
  hoveredModel,
  setHoveredModel,
}) => {
  const getColor = (item: ModelData, index: number) => {
    if (item.color) {
      return item.color;
    }
    return colorPalette[index % colorPalette.length];
  };

  const [isHovering, setIsHovering] = useState(false);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const overallDiff = b.overall - a.overall;
      if (Math.abs(overallDiff) < 0.05) {
        return a.model.localeCompare(b.model);
      }
      return overallDiff;
    });
  }, [filteredData]);

  const renderOrder = useMemo(() => {
    return [...sortedData].sort((a, b) => {
      const overallDiff = a.overall - b.overall;
      if (Math.abs(overallDiff) < 0.05) {
        return b.model.localeCompare(a.model);
      }
      return overallDiff;
    });
  }, [sortedData]);

  const hoveredRenderOrder = useMemo(() => {
    return [...renderOrder].sort((a, b) => {
      if (a.model === hoveredModel) return 1;
      if (b.model === hoveredModel) return -1;
      return 0;
    });
  }, [renderOrder, hoveredModel]);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row lg:items-stretch items-center">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="flex-grow sm:min-h-[400px] sm:min-w-[400px] sm:w-full sm:h-full min-h-[250px] min-w-[250px] items-center p-0"
      >
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="column" 
            tick={{ 
              fontSize: chartFontSize,
              dy: 5, // Add distance between the plot edge and labels
            }} 
            tickLine={{ stroke: 'transparent' }} // Hide tick lines if desired
            axisLine={{ strokeWidth: 0.5 }} // Make axis line slightly thinner
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tickCount={5}
            tick={{ 
              fontSize: chartFontSize,
              transform: "rotate(0 0 180)", 
            }}
            tickLine={true}
            axisLine={true}
            angle={270}
          />
          {hoveredRenderOrder.map((item) => (
            <Radar
              key={item.model}
              name={item.model}
              dataKey={item.model}
              stroke={getColor(item, sortedData.indexOf(item))}
              fill={getColor(item, sortedData.indexOf(item))}
              fillOpacity={
                hoveredModel === null
                  ? 0.4
                  : hoveredModel === item.model
                  ? 0.6  // Increased opacity for hovered model
                  : 0.1
              }
              strokeOpacity={
                hoveredModel === null
                  ? 1
                  : hoveredModel === item.model
                  ? 1
                  : 0
              }
              strokeWidth={hoveredModel === item.model ? 3 : 1} // Thicker line for hovered model
              isAnimationActive={!isHovering}
              style={{
                filter: hoveredModel === item.model ? 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' : 'none', // Add shadow for more emphasis
              }}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
      <ScrollArea.Root className="flex mt-4">
        <ScrollArea.Viewport className="lg:mt-0 lg:ml-4 lg:max-h-[380px] max-h-[100px] lg:min-w-[200px] w-full items-center">
          <div className="flex flex-col p-0">
            {sortedData.map((item, index) => (
              <div
                key={item.model}
                className="flex items-center mb-2 mr-4 lg:mr-0 flex-shrink-0 cursor-pointer"
                onMouseEnter={() => {
                  setIsHovering(true);
                  setHoveredModel(item.model);
                }}
                onMouseLeave={() => {
                  setIsHovering(true);
                  setHoveredModel(null);
                }}
                onTransitionEnd={() => setIsHovering(false)}
              >
                <div
                  className="w-3 h-3 mr-2 rounded-full"
                  style={{
                    backgroundColor: getColor(item, index),
                  }}
                />
                <span className="text-sm">{item.model}</span>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="h-full w-2.5 border-l border-l-transparent"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-border" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
};

interface TableComponentProps {
  sortedData: ModelData[];
  selectedColumns: (keyof ModelData)[];
  sortColumn: NumericDataColumn | "Size";
  requestSort: (column: NumericDataColumn | "Size") => void;
}

// Then update the TableComponent
const TableComponent: React.FC<TableComponentProps> = ({
  sortedData,
  selectedColumns,
  sortColumn,
  requestSort,
}) => {
  // Create a fixed order for columns
  const orderedColumns = ["visual", "synthesis", "visual/text", "text"];
  
  // Filter selectedColumns to only include ones in our order and sort them accordingly
  const displayColumns = orderedColumns.filter(col => 
    selectedColumns.includes(col as keyof ModelData)
  ) as (keyof ModelData)[];
  
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-32 px-2">Model</TableHead>
          <TableHead 
            className={`w-14 text-center cursor-pointer ${
              sortColumn === "Size" ? "text-primary" : ""
            }`}
            onClick={() => requestSort("Size")}
          >
            Size
            {sortColumn === "Size" && (
              <ArrowUp className="h-4 w-4 flex-shrink-0 inline" />
            )}
          </TableHead>
          {displayColumns.map((column) => (
            <TableHead
              key={column}
              onClick={() => requestSort(column as NumericDataColumn)}
              className={`w-14 break-words text-center cursor-pointer ${
                sortColumn === column ? "text-primary" : ""
              }`}
            >
              <div className="whitespace-normal overflow-hidden break-words">
                <span>
                  {column in columnToPrettyName
                    ? columnToPrettyName[column as string]
                    : column}
                </span>
                {sortColumn === column && (
                  <ArrowUp className="h-4 w-4 flex-shrink-0 inline" />
                )}
              </div>
            </TableHead>
          ))}
          <TableHead
            className={`cursor-pointer w-14 break-words ${
              sortColumn === "overall" 
              ? "text-primary bg-accent text-accent-foreground" 
              : "bg-accent text-accent-foreground"
            }`}
            onClick={() => requestSort("overall")}
          >
            <div className="whitespace-normal overflow-hidden break-words text-center">
              <span>Overall</span>
              {sortColumn === "overall" && (
                <ArrowUp className="h-4 w-4 flex-shrink-0 inline" />
              )}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              {item.link ? (
                <Link
                  target="_blank"
                  className="text-primary custom-link transition-colors duration-200"
                  href={item.link}
                >
                  {item.model}
                </Link>
              ) : (
                <span className="text-primary">{item.model}</span>
              )}
            </TableCell>
            <TableCell className={`text-center ${sortColumn === "Size" ? "font-medium text-primary" : ""}`}>
              {item.Size}
            </TableCell>
            {displayColumns.map((column) => (
              <TableCell 
                className={`text-center ${sortColumn === column ? "font-medium text-primary" : ""}`}
                key={column}
              >
                {isNumber(item[column])
                  ? (item[column] as number).toFixed(1)
                  : item[column]}
              </TableCell>
            ))}
            <TableCell 
              className={`text-center ${
                sortColumn === "overall" 
                ? "font-medium text-primary bg-accent text-accent-foreground" 
                : "bg-accent text-accent-foreground"
              }`}
            >
              {(item.overall).toFixed(1)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};