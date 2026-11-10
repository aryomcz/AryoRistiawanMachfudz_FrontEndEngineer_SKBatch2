export const DEFAULT_DEPARTMENT = "all";

export const SIMULATED_LOADING_DELAY_MS = 300;

export const DEPARTMENTS = [
  { id: "all", label: "Semua Departemen" },
  { id: "engineering", label: "Engineering" },
  { id: "product", label: "Product" },
  { id: "design", label: "Design" },
  { id: "data", label: "Data & Analytics" },
  { id: "marketing", label: "Marketing" },
  { id: "legal", label: "Legal & People" }, // Intentionally 0 roles in JSON to demonstrate Empty State
];

export const VALID_DEPARTMENT_IDS = DEPARTMENTS.map((dept) => dept.id);
