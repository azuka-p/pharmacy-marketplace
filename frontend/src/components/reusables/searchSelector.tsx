"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "../ui/multiple-selector";

interface comboBoxProps {
  data: Option[];
  placeholder: string;
  value: string | number;
  onSearch: (val: string) => void;
  onSelect: (val: string, label: string) => void;
  defaultValue?: string | number;
  editMode?: boolean;
  disabled?: boolean;
}

export function SearchSelector(props: comboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {props.editMode == false ? (
        <p className="px-4 py-2 font-medium">{props.defaultValue}</p>
      ) : (
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={props.disabled}
          >
            {props.value
              ? props.data.find((framework) => {
                  return framework.value == props.value;
                })?.label
              : props.defaultValue && !open
                ? props.defaultValue
                : `Select ${props.placeholder}`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
      )}
      <PopoverContent className="pointer-events-auto w-full p-0">
        <Command>
          <CommandInput
            onValueChange={(e) => props.onSearch(e)}
            placeholder={`Search ${props.placeholder}`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No {props.placeholder} found.</CommandEmpty>
            <CommandGroup>
              {props.data.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.label}
                  onSelect={() => {
                    props.onSelect(framework.value, framework.label);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
