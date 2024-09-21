"use client";

import { Table } from "@tanstack/react-table";

import { controlBar } from "@/assets/data/dashboard/controlBar";
import { Input } from "@/components/ui/input";
import { InputSizes, TTableControl } from "@allTypes";

type Props<TData> = {
  table: Table<TData>;
  style?: React.CSSProperties;
  searchKey: string;
} & TTableControl;

function SearchControl<TData>({
  table,
  style,
  order,
  title,
  Icon,
  variant,
  searchKey,
  size,
  ...rest
}: Props<TData>) {
  return (
    <Input
      dimension={
        (size as InputSizes) || (controlBar.search.size as InputSizes) || "sm"
      }
      placeholder={title || controlBar.search.title}
      value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(searchKey)?.setFilterValue(event.target.value)
      }
      className="focus:!ring-0 focus:!ring-offset-0 max-w-sm rounded-sm border-primary placeholder:text-muted-foreground/70"
      Icon={Icon || controlBar.search.Icon}
    />
  );
}

export default SearchControl;
