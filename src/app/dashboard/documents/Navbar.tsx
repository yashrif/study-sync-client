import { navbarButtons } from "@/assets/data/dashboard/documents";
import { DataTableViewOptions } from "@/components/table/ColumnToggle";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <div className="flex gap-16 items-center justify-between">
      <div className="flex gap-3 items-center">
        {[navbarButtons.upload, navbarButtons.addFolder].map(
          (button, index) => (
            <Button
              key={index}
              variant={button.variant}
              size={button.size}
              className="flex items-center gap-1.5"
            >
              <button.Icon className="h-4 w-auto" />
              {button.title}
            </Button>
          )
        )}
        <IconSearch className="h-6 w-auto text-primary cursor-pointer hover:scale-110 transition-all duration-300" />
      </div>
      <div className="flex gap-3 items-center">
        {/* <DataTableViewOptions table={table} /> */}

        {[navbarButtons.sort].map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            size={button.size}
            className="flex items-center gap-1.5"
          >
            <button.Icon className="h-4 w-auto" />
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
