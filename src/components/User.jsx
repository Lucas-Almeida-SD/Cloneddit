import React from "react";

export function User(user) {
  return (
    <div>
      <img src={user.avatar} alt="" />
      <span>{user.name}</span>
    </div>
  );
} 