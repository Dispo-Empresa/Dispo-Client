import { getRole } from "./authToken";
import { roles } from "utils/constants/constants";

const isRoleManager = () => getRole() === roles.Manager;

const isRolePurchasingManager = () => getRole() === roles.PurchasingManager;

const isRoleWarehouseOperator = () => getRole() === roles.WarehouseOperator;

export { isRoleManager, isRolePurchasingManager, isRoleWarehouseOperator };