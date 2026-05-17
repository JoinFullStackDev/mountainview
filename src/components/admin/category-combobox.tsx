"use client";

import { forwardRef, useMemo, useState, useTransition } from "react";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { createCategory } from "@/app/actions/categories";
import type { Category } from "@/types/database";

export interface CategoryComboboxProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
  onCategoryCreated?: (category: Category) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
}

export const CategoryCombobox = forwardRef<HTMLButtonElement, CategoryComboboxProps>(
  function CategoryCombobox(
    {
      categories,
      value,
      onChange,
      onCategoryCreated,
      placeholder = "Select category",
      disabled,
      invalid,
      className,
    },
    ref
  ) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isPending, startTransition] = useTransition();

    const trimmedQuery = query.trim();

    const matches = useMemo(() => {
      if (!trimmedQuery) return categories;
      const q = trimmedQuery.toLowerCase();
      return categories.filter((c) => c.name.toLowerCase().includes(q));
    }, [categories, trimmedQuery]);

    const exactMatch = useMemo(
      () =>
        trimmedQuery
          ? categories.find(
              (c) => c.name.toLowerCase() === trimmedQuery.toLowerCase()
            )
          : null,
      [categories, trimmedQuery]
    );

    const showCreate = !!trimmedQuery && !exactMatch;

    const handleCreate = () => {
      if (!trimmedQuery || isPending) return;
      startTransition(async () => {
        const result = await createCategory(trimmedQuery);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success(`Created category "${result.category.name}"`);
        onCategoryCreated?.(result.category);
        onChange(result.category.name);
        setQuery("");
        setOpen(false);
      });
    };

    const selectedLabel =
      categories.find((c) => c.name === value)?.name ?? value;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal",
              !value && "text-muted-foreground",
              invalid && "border-destructive focus-visible:ring-destructive",
              className
            )}
          >
            {value ? selectedLabel : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search or create category"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {matches.length === 0 && !showCreate ? (
                <CommandEmpty>No categories yet.</CommandEmpty>
              ) : (
                <CommandGroup heading={matches.length > 0 ? "Categories" : undefined}>
                  {matches.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.name}
                      onSelect={() => {
                        onChange(category.name);
                        setQuery("");
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === category.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {showCreate && (
                <>
                  {matches.length > 0 && <CommandSeparator />}
                  <CommandGroup>
                    <CommandItem
                      value={`__create__:${trimmedQuery}`}
                      onSelect={handleCreate}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      Create &ldquo;{trimmedQuery}&rdquo;
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
