import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children, value }) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);
