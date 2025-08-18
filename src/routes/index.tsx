import { useEffect } from "react";
import { useNavigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/dashboard", replace: true });
  }, [navigate]);

  return null;
}