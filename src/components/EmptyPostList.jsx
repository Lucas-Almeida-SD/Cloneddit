import React from "react";

import '../styles/emptyPostList.css';

export function EmptyPostList({ src, alt, text }) {
  return (
    <section className="empty-post-list">
      <img src={ src } alt={ alt } />
      <h2>{text}</h2>
    </section>
  );
}