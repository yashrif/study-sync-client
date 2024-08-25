"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getAuthToken } from "@/utils/auth";
import { button } from "@assets/data/header";
import { Button } from "@components/ui/button";
import ProfileButton from "./ProfileButton";

const ActionButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  }, []);

  if (!isAuthenticated)
    return (
      <Link href={button.login.href}>
        <Button size={"lg"}>
          <span className="text-nav-link">{button.login.title}</span>
        </Button>
      </Link>
    );

  return <ProfileButton setIsAuthenticated={setIsAuthenticated} />;
};

export default ActionButton;
