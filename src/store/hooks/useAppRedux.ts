import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

/**
 * Pre-typed useDispatch hook for the entire app
 * Use instead of plain `useDispatch` for full type safety
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Pre-typed useSelector hook for the entire app
 * Use instead of plain `useSelector` for full type safety
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
