import type { DragonballData } from "@/interfaces";
import { api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Limit } from "@/types";

export const FetchDragonBall: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<Limit>('10');

  const getDragonballData = useCallback(async (): Promise<DragonballData> => {
    const fallback: DragonballData = {
      items: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: Number(limit),
        totalPages: 0,
        currentPage: page
      },
      links: { first: "", prev: "", next: "", last: "" }
    };
    try {
      const res = await api.get<DragonballData>("/characters", { params: { page, limit } });
      return res.data || fallback;
    } catch (err) {
      console.error("Fetch error:", err);
      return fallback;
    }
  }, [page, limit]);

  // Queries
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["characters", page, limit],
    queryFn: getDragonballData,
  });

  const totalPages = data?.meta.totalPages ?? 0;

  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const firstBlock = [1, 2, 3];
    const lastBlock = [totalPages - 2, totalPages - 1, totalPages];
    if (page <= 3) return [...firstBlock, -2, ...lastBlock];
    if (page >= totalPages - 2) return [...firstBlock, -1, ...lastBlock];
    // middle
    return [...firstBlock, -1, page, -2, ...lastBlock];
  }, [page, totalPages]);

  // Handlers
  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPage(p => Math.max(1, p - 1));
  }, []);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPage(p => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const handleSelectPage = useCallback(
    (target: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (target !== page) setPage(target);
    },
    [page]
  );

  const handleChangeLimit = useCallback((value: Limit) => {
    String(setLimit(value));
    setPage(1);
  }, []);

  return (
    <Card className="mx-auto max-w-7xl py-8 md:py-10 space-y-6">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Dragon Ball Characters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          {isLoading && (
            <div className="w-full rounded-md border p-6 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          )}
          {isError && (
            <div className="w-full rounded-md border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-red-600">
              {error?.message || "Error"}
            </div>
          )}
          <DataTable columns={columns} data={data?.items ?? []} />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#prev"
                    onClick={handlePrev}
                    aria-disabled={page === 1}
                    className={page === 1 ? "pointer-events-none opacity-40" : ""}
                  />
                </PaginationItem>

                {pages.map(p =>
                  p < 0 ? (
                    <PaginationItem key={p}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`#page-${p}`}
                        isActive={p === page}
                        onClick={handleSelectPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#next"
                    onClick={handleNext}
                    aria-disabled={page === totalPages || totalPages === 0}
                    className={page === totalPages || totalPages === 0 ? "pointer-events-none opacity-40" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Limit selector */}
            <div className="flex items-center gap-2">
              <Label htmlFor="limit" className="text-sm">
                Per page
              </Label>
              <Select value={limit.toString()} onValueChange={handleChangeLimit}>
                <SelectTrigger id="limit" className="w-24">
                  <SelectValue placeholder="Items" />
                </SelectTrigger>
                <SelectContent>
                  {(['5', '10', '20'] as Limit[]).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
