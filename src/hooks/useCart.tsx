"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseCart = () => {
  const queryClient = useQueryClient();
  /// fetch cartData
  const {
    data: cart,
    isPending,
    error,
  } = useQuery({
    queryKey: ["CART"],
    queryFn: async () => {
      const result = await fetch("/api/cart/");
      if (!result.ok) throw new Error("failed to fetch");
      return result.json();
    },
    staleTime: 5 * 60 * 1000, //// cache for 5 minutes
  });

  const addToCartMutation = useMutation({
    mutationKey: ["ADDCART"],
    mutationFn: async (productId: string) => {
      const result = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: { "Content-type": "application/json" },
      });
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CART"] });
      alert("item is added");
    },
    onError: () => {
      alert("failed to add");
    },
  });
  const removeCartMutation = useMutation({
    mutationKey: ["ADDCART"],
    mutationFn: async (productId: string) => {
      const result = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: { "Content-type": "application/json" },
      });
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CART"] });
      alert("item is deleted");
    },
    onError: () => {
      alert("failed to delete");
    },
  });
  return { cart, isPending, error, addToCartMutation, removeCartMutation };
};
