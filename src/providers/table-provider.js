import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { TableApi } from "@/api/data-client";
import { useUserState } from "@/providers/user-state-provider";

const TableContext = createContext();

const TABLE_CONFIG = {
  investors: {
    apiCall: (isVisitor, filters) =>
      isVisitor
        ? TableApi.investors(filters)
        : TableApi.investorsPrivate(filters),
  },
  startups: {
    apiCall: (isVisitor, filters) =>
      isVisitor
        ? TableApi.startups(filters)
        : TableApi.startupsPrivate(filters),
  },
};

export function TableProvider({ children, tableType }) {
  const { isVisitor } = useUserState();
  const [loading, setLoading] = useState(false);
  const [isInitial, setisInitial] = useState(false);
  const [tableData, setTableData] = useState({ items: [] });
  const tableRef = useRef(null);

  const scrollToTop = useCallback(() => {
    if (tableRef.current && typeof window !== "undefined") {
      const container = document.querySelector(".main-container");

      if (container) {
        // Get the position of the element relative to the container
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
        const response = await TABLE_CONFIG[tableType].apiCall(
          isVisitor,
          queryFilters
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
    [tableType, isVisitor, scrollToTop]
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
