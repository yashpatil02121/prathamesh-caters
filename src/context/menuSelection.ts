import { createContext, useContext } from "react";
import type { MenuCategory } from "../data/menu";
import type { SelectedMenuItem } from "../types/menu";

export type MenuSelectionContextValue = {
  selectedItems: SelectedMenuItem[];
  selectedKeys: Set<string>;
  toggleItem: (category: MenuCategory, item: string) => void;
  removeItem: (item: SelectedMenuItem) => void;
  clear: () => void;
};

export const MenuSelectionContext =
  createContext<MenuSelectionContextValue | null>(null);

export function selectionKey(categoryId: string, item: string) {
  return `${categoryId}:${item}`;
}

export function useMenuSelection() {
  const context = useContext(MenuSelectionContext);

  if (!context) {
    throw new Error(
      "useMenuSelection must be used inside MenuSelectionProvider",
    );
  }

  return context;
}
