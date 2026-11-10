import rolesData from "@/data/roles.json";
import { DEPARTMENTS, DEFAULT_DEPARTMENT } from "@/lib/constants";

/**
 * Retrieve all available roles.
 * @returns {Array}
 */
export function getAllRoles() {
  return rolesData;
}

/**
 * Filter roles by department ID.
 * Returns all roles when departmentId is "all" or falsy.
 * @param {string} departmentId
 * @returns {Array}
 */
export function getRolesByDepartment(departmentId) {
  if (!departmentId || departmentId === DEFAULT_DEPARTMENT) {
    return rolesData;
  }
  return rolesData.filter((role) => role.department === departmentId);
}

/**
 * Compute total role count per department ID, including "all" and zero-count departments.
 * @returns {Record<string, number>}
 */
export function getDepartmentCounts() {
  const counts = {
    [DEFAULT_DEPARTMENT]: rolesData.length,
  };

  for (const dept of DEPARTMENTS) {
    if (dept.id !== DEFAULT_DEPARTMENT) {
      counts[dept.id] = 0;
    }
  }

  for (const role of rolesData) {
    if (counts[role.department] !== undefined) {
      counts[role.department] += 1;
    }
  }

  return counts;
}
