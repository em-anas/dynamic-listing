/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FixedSizeList as List } from "react-window";
import { Alert } from "antd";
import { useDebounce } from "../hooks";
import type { VirtualizedListProps } from "../types";
import { LoadingSpinner } from "./common";

export interface VirtualizedListRef {
  scrollTo: (index: number) => void;
  scrollToTop: () => void;
  getVisibleRange: () => { start: number; end: number };
}

const ErrorBoundary: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({
  children,
  fallback = <Alert message="Error loading list" type="error" />,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

const VirtualizedList = forwardRef<
  VirtualizedListRef,
  VirtualizedListProps<any>
>(function VirtualizedList<T>(
  {
    items,
    itemHeight,
    renderItem,
    loadMoreItems,
    hasNextPage,
    isNextPageLoading,
    keyExtractor,
    overscan = 5,
    className = "",
    height = 600,
    width,
    onScroll,
    threshold = 5,
    loadingComponent,
    emptyComponent,
    errorComponent,
  }: VirtualizedListProps<T> & {
    onScroll?: (scrollTop: number) => void;
    threshold?: number;
    loadingComponent?: React.ReactNode;
    emptyComponent?: React.ReactNode;
    errorComponent?: React.ReactNode;
  },
  ref: React.ForwardedRef<VirtualizedListRef>
) {
  const listRef = useRef<List>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({
    width: typeof width === "number" ? width : window.innerWidth - 100,
    height,
  });

  useImperativeHandle(ref, () => ({
    scrollTo: (index: number) => {
      listRef.current?.scrollToItem(index, "start");
    },
    scrollToTop: () => {
      listRef.current?.scrollToItem(0, "start");
    },
    getVisibleRange: () => {
      return { start: 0, end: Math.ceil(height / itemHeight) };
    },
  }));

  const handleResize = useDebounce(() => {
    if (typeof width !== "number" && containerRef.current) {
      try {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        setDimensions((prev) => ({
          ...prev,
          width: Math.max(300, containerWidth - 32),
        }));
      } catch (err) {
        console.warn("Resize calculation failed:", err);
      }
    }
  }, 150);

  useEffect(() => {
    if (typeof width !== "number") {
      try {
        if (containerRef.current) {
          const containerWidth =
            containerRef.current.getBoundingClientRect().width;
          setDimensions((prev) => ({
            ...prev,
            width: Math.max(300, containerWidth - 32),
          }));
        }
      } catch (err) {
        console.warn("Initial width calculation failed:", err);
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize, width]);

  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < items.length,
    [hasNextPage, items.length]
  );

  const itemRenderer = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      if (!isItemLoaded(index)) {
        return (
          <div
            style={{
              ...style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              boxSizing: "border-box",
            }}
            className="list-item-loading"
          >
            {loadingComponent || <LoadingSpinner />}
          </div>
        );
      }

      try {
        const itemStyle = {
          ...style,
          width: "100%",
          boxSizing: "border-box" as const,
          padding: 0,
          margin: 0,
        };

        return renderItem(items[index], index, itemStyle);
      } catch (err) {
        console.error("Error rendering item:", err);
        return (
          <div
            style={{
              ...style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ff4d4f",
            }}
          >
            Error loading item
          </div>
        );
      }
    },
    [isItemLoaded, items, renderItem, loadingComponent]
  );

  const itemCount = useMemo(() => {
    return hasNextPage ? items.length + 1 : items.length;
  }, [hasNextPage, items.length]);

  const handleItemsRendered = useCallback(
    async ({
      visibleStopIndex,
      overscanStartIndex,
      overscanStopIndex,
    }: any) => {
      if (
        !isNextPageLoading &&
        hasNextPage &&
        visibleStopIndex >= items.length - Math.min(threshold, overscan)
      ) {
        try {
          await loadMoreItems(overscanStartIndex, overscanStopIndex);
        } catch (err) {
          setError("Failed to load more items");
          console.error("Load more items failed:", err);
        }
      }
    },
    [
      isNextPageLoading,
      hasNextPage,
      items.length,
      loadMoreItems,
      overscan,
      threshold,
    ]
  );

  const getItemKey = useCallback(
    (index: number) => {
      if (isItemLoaded(index)) {
        return keyExtractor(items[index], index);
      }
      return `loading-${index}`;
    },
    [isItemLoaded, items, keyExtractor]
  );

  const handleScroll = useCallback(
    ({ scrollOffset }: { scrollOffset: number }) => {
      onScroll?.(scrollOffset);
    },
    [onScroll]
  );

  if (items.length === 0 && !hasNextPage) {
    return (
      <div className={`virtualized-list-empty ${className}`}>
        {emptyComponent || (
          <div style={{ textAlign: "center", padding: "40px" }}>
            No items to display
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`virtualized-list-error ${className}`}>
        {errorComponent || (
          <Alert
            message="Loading Error"
            description={error}
            type="error"
            showIcon
            action={<button onClick={() => setError(null)}>Retry</button>}
          />
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={errorComponent}>
      <div
        ref={containerRef}
        className={`virtualized-list-container ${className}`}
        style={{
          height: dimensions.height,
          width: "100%",
          maxWidth: "100%",
          border: "1px solid #d9d9d9",
          borderRadius: "12px",
          overflow: "hidden",
          background: "white",
          boxSizing: "border-box",
        }}
        role="list"
        aria-label="Virtualized list"
      >
        <List
          ref={listRef}
          height={dimensions.height}
          width={dimensions.width}
          itemCount={itemCount}
          itemSize={itemHeight}
          onItemsRendered={handleItemsRendered}
          onScroll={handleScroll}
          overscanCount={overscan}
          itemKey={getItemKey}
          style={{ width: "100%", boxSizing: "border-box" }}
        >
          {itemRenderer}
        </List>
      </div>
    </ErrorBoundary>
  );
});

export default VirtualizedList;
