import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { MenuCategory } from "../data/menu";
import type { SelectedMenuItem } from "../types/menu";
import {
  MenuSelectionContext,
  selectionKey,
} from "./menuSelection";

const STORAGE_KEY = "prathamesh:selected-menu";

function loadSelection(): SelectedMenuItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function MenuSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedItems, setSelectedItems] =
    useState<SelectedMenuItem[]>(loadSelection);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selectedItems),
      );
    } catch {
      // Storage unavailable (private mode) — selection just won't persist.
    }
  }, [selectedItems]);

  const value = useMemo(() => {
    const selectedKeys = new Set(
      selectedItems.map((selected) =>
        selectionKey(selected.categoryId, selected.item),
      ),
    );

    return {
      selectedItems,
      selectedKeys,

      toggleItem: (category: MenuCategory, item: string) => {
        const key = selectionKey(category.id, item);

        setSelectedItems((current) =>
          current.some(
            (selected) =>
              selectionKey(selected.categoryId, selected.item) === key,
          )
            ? current.filter(
                (selected) =>
                  selectionKey(selected.categoryId, selected.item) !== key,
              )
            : [
                ...current,
                {
                  categoryId: category.id,
                  categoryTitle: category.title,
                  item,
                },
              ],
        );
      },

      removeItem: (item: SelectedMenuItem) => {
        setSelectedItems((current) =>
          current.filter(
            (selected) =>
              !(
                selected.categoryId === item.categoryId &&
                selected.item === item.item
              ),
          ),
        );
      },

      clear: () => setSelectedItems([]),
    };
  }, [selectedItems]);

  return (
    <MenuSelectionContext.Provider value={value}>
      {children}
    </MenuSelectionContext.Provider>
  );
}
