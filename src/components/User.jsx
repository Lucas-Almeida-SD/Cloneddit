import React from "react";

import '../styles/user.css';

export function User({ user }) {
  return (
    <div id="user">
      <img src={ user.avatar } alt={ user.name } referrerPolicy="no-referrer" />
      <span>{user.name}</span>
    </div>
  );
} 