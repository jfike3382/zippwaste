import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { TableApi } from "@/api/data-client";

const TableContext = createContext();

const TABLE_CONFIG = {
  companies: {
    apiCall: (filters) => TableApi.companies(filters),
  },
};

export function TableProvider({ children, tableType }) {
  const [loading, setLoading] = useState(false);
  const [isInitial, setisInitial] = useState(false);
  const [tableData, setTableData] = useState({ items: [] });
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
        const response = await TABLE_CONFIG[tableType].apiCall(queryFilters);
        setTableData(response.main_data);
        setisInitial(true);
        return response.main_data;
      } catch (error) {
        console.error("Failed to fetch table:", error);
      } finally {
        setLoading(false);
      }
    },
    [tableType, scrollToTop]
  );

  return (
    <TableContext.Provider
      value={{
        fetchTable,
        loading,
        tableData,
        tableType,
        tableRef,
        isInitial,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => useContext(TableContext);
