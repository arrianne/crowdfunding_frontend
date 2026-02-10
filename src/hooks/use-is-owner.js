import { useMemo } from "react";
import { useAuth } from "./use-auth";

function getId(value) {
  if (value == null) return null;

  // nested object: { id }, { pk }, etc.
  if (typeof value === "object") return value.id ?? value.pk ?? null;

  // number/string id
  return value;
}

export default function useIsOwner(resource, options = {}) {
  const { auth } = useAuth();

  const ownerKeys = options.ownerKeys ?? ["owner", "owner_id", "ownerId"];
  const userIdKeys = options.userIdKeys ?? [
    "user.id",
    "user_id",
    "id",
    "userId",
  ];

  const currentUserId = useMemo(() => {
    for (const key of userIdKeys) {
      const path = key.split(".");
      let v = auth;
      for (const p of path) v = v?.[p];
      const id = getId(v);
      if (id != null) return id;
    }
    return null;
  }, [auth, userIdKeys]);

  const ownerId = useMemo(() => {
    if (!resource) return null;

    for (const key of ownerKeys) {
      const id = getId(resource?.[key]);
      if (id != null) return id;
    }
    return null;
  }, [resource, ownerKeys]);

  const isOwner = useMemo(() => {
    if (currentUserId == null || ownerId == null) return false;
    return String(currentUserId) === String(ownerId);
  }, [currentUserId, ownerId]);

  return { isOwner, currentUserId, ownerId };
}
