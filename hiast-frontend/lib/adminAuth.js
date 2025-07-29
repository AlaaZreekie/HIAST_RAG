import { isAuthenticated, isAdmin } from "./api.js";

/**
 * Check if user is authenticated and has admin role
 * @returns {boolean} True if user is authenticated and has admin role
 */
export const checkAdminAuth = () => {
  return isAuthenticated() && isAdmin();
};

/**
 * Redirect user if not authenticated or not admin
 * @param {Function} router - Next.js router instance
 * @returns {boolean} True if user should continue, false if redirected
 */
export const requireAdminAuth = (router) => {
  if (!isAuthenticated()) {
    router.push("/admin/login");
    return false;
  }

  if (!isAdmin()) {
    router.push("/admin/login");
    return false;
  }

  return true;
};

/**
 * Get admin user data with role verification
 * @returns {Object|null} User data if admin, null otherwise
 */
export const getAdminUser = () => {
  if (!checkAdminAuth()) {
    return null;
  }

  const userStr = localStorage.getItem("admin_user");
  return userStr ? JSON.parse(userStr) : null;
};
