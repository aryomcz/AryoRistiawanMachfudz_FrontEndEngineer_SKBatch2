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
 * Check whether a role matches a search query across key fields.
 * Supports multi-word queries where every token must match at least one field.
 * @param {Object} role
 * @param {string} searchQuery
 * @returns {boolean}
 */
export function matchesRoleSearch(role, searchQuery) {
  const normalizedQuery = searchQuery?.trim().toLowerCase() || "";
  if (!normalizedQuery) return true;

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const searchableText = [
    role.title,
    role.departmentLabel,
    role.summary,
    role.workType,
    role.employmentType,
    role.level,
    role.location,
    ...(Array.isArray(role.skills) ? role.skills : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return tokens.every((token) => searchableText.includes(token));
}

/**
 * Filter roles by department ID and optional search query.
 * Returns all matching roles when departmentId is "all" or falsy.
 * @param {string} departmentId
 * @param {string} [searchQuery=""]
 * @returns {Array}
 */
export function getRolesByDepartment(departmentId, searchQuery = "") {
  return rolesData.filter((role) => {
    const matchesDept =
      !departmentId ||
      departmentId === DEFAULT_DEPARTMENT ||
      role.department === departmentId;

    return matchesDept && matchesRoleSearch(role, searchQuery);
  });
}

/**
 * Filter roles by departmentId and searchQuery object options.
 * @param {{ departmentId?: string, searchQuery?: string }} options
 * @returns {Array}
 */
export function filterRoles({ departmentId = DEFAULT_DEPARTMENT, searchQuery = "" } = {}) {
  return getRolesByDepartment(departmentId, searchQuery);
}

/**
 * Compute total role count per department ID, including "all" and zero-count departments.
 * Respects active search query so department badges reflect matching roles.
 * @param {string} [searchQuery=""]
 * @returns {Record<string, number>}
 */
export function getDepartmentCounts(searchQuery = "") {
  const counts = {
    [DEFAULT_DEPARTMENT]: 0,
  };

  for (const dept of DEPARTMENTS) {
    if (dept.id !== DEFAULT_DEPARTMENT) {
      counts[dept.id] = 0;
    }
  }

  for (const role of rolesData) {
    if (!matchesRoleSearch(role, searchQuery)) continue;

    counts[DEFAULT_DEPARTMENT] += 1;
    if (counts[role.department] !== undefined) {
      counts[role.department] += 1;
    }
  }

  return counts;
}
