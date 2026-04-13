import type { WIPInventoryData, WIPInventoryPostDataAttributes } from "../interface";

  // ✅ 🔥 Transform function (IMPORTANT FIX)
 export  const buildPayload = (
    row: WIPInventoryData
  ): WIPInventoryPostDataAttributes => {
    console.log(row)
    return {
      batchId: row?.batch?.id ?? "", // adjust based on API
      quantity: row.quantity,
      cost: Number(row.cost),
      // 👉 add other required fields if your API needs them
    };
  };
