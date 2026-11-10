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
 * Retrieve a single role by its ID.
 * @param {string} roleId
 * @returns {Object|null}
 */
export function getRoleById(roleId) {
  if (!roleId) return null;
  return rolesData.find((role) => role.id === roleId) || null;
}

/**
 * Retrieve related roles in the same department (excluding the current role),
 * falling back to other open roles if needed.
 * @param {string} currentRoleId
 * @param {string} departmentId
 * @param {number} limit
 * @returns {Array}
 */
export function getRelatedRoles(currentRoleId, departmentId, limit = 2) {
  const sameDept = rolesData.filter(
    (role) => role.department === departmentId && role.id !== currentRoleId
  );

  if (sameDept.length >= limit) {
    return sameDept.slice(0, limit);
  }

  const others = rolesData.filter(
    (role) => role.department !== departmentId && role.id !== currentRoleId
  );

  return [...sameDept, ...others].slice(0, limit);
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
