import React from "react";

export function User({ user }) {
  return (
    <div>
      <img src={ user.avatar } alt={ user.name } />
      <span>{user.name}</span>
    </div>
  );
} 