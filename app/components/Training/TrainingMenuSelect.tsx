"use client";

import { useState } from "react";
import { Link } from "react-router";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

type TrainingMenu = {
  id: string;
  name: string;
  sets: number;
  reps: number;
};

type TrainingMenuSelectProps = {
  menus: TrainingMenu[];
  onSelect: (menuId: string) => void;
};

export function TrainingMenuSelect({
  menus,
  onSelect,
}: TrainingMenuSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // メニュー選択時の処理
  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    onSelect(currentValue);
    setOpen(false);
  };

  console.log(value);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-10 w-full justify-between text-left font-normal sm:max-w-[400px]"
            >
              {value
                ? menus.find((menu) => menu.id === value)?.name
                : "作成済みのメニューから選択..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100vw-2rem)] max-w-[300px] p-0 md:w-full">
            <Command>
              <CommandInput placeholder="メニューを検索..." className="h-10" />
              <CommandList>
                <CommandEmpty>
                  <div className="space-y-2 py-6 text-center">
                    <p>メニューが見つかりません</p>
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  {menus.map((menu) => (
                    <CommandItem
                      key={menu.id}
                      value={menu.id}
                      onSelect={handleSelect}
                      className="py-2"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === menu.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{menu.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {menu.sets}セット × {menu.reps}回
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button variant="outline" className="aspect-square max-sm:p-0" asChild>
        <Link to="/menus">
          <PlusIcon
            className="opacity-60 sm:-ms-1"
            size={16}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">新規作成</span>
        </Link>
      </Button>
    </div>
  );
}
