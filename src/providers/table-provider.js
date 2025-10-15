import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { TableApi } from "@/api/data-client";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isInitial, setisInitial] = useState(false);
  const [tableData, setTableData] = useState({
    items: [],
    itemsTotal: 0,
    curPage: 1,
    perPage: 40,
    pageTotal: 1,
    expanded: false,
    zip_code_requested: null,
  });
  const tableRef = useRef(null);

  const scrollToTop = useCallback(() => {
    if (tableRef.current && typeof window !== "undefined") {
      const container = document.querySelector(".main-container");

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = tableRef.current.getBoundingClientRect();
        const relativeTop = elementRect.top - containerRect.top;

        container.scrollTo({
          top: container.scrollTop + relativeTop,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const fetchTable = useCallback(
    async (queryFilters = {}) => {
      setLoading(true);
      scrollToTop();
      try {
        const response = await TableApi.companies(queryFilters);
        console.log("API Response:", response);
        console.log("Main data:", response.main_data);
        console.log("Expanded from API:", response.main_data?.expanded);
        console.log(
          "ZIP code requested:",
          response.main_data?.zip_code_requested
        );
        setTableData(response.main_data);
        setisInitial(true);
        return response.main_data;
      } catch (error) {
        console.error("Failed to fetch table:", error);
      } finally {
        setLoading(false);
      }
    },
    [scrollToTop]
  );

  return (
    <TableContext.Provider
      value={{
        fetchTable,
        loading,
        tableData,
        tableRef,
        isInitial,
        items: tableData?.items,
        itemsTotal: tableData?.itemsTotal,
        expanded: tableData?.expanded,
        zip_code_requested: tableData?.zip_code_requested,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => useContext(TableContext);
