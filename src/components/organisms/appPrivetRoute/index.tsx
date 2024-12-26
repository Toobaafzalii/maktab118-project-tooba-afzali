import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type PrivateRouteProps = {
  children: ReactNode;
  canAccess: boolean;
  redirectTo?: string;
};

const AppPrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  canAccess,
  redirectTo = "/",
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!canAccess) {
      router.push(redirectTo);
    }
  }, [canAccess, redirectTo, router]);

  return canAccess ? <>{children}</> : null;
};

export default AppPrivateRoute;
