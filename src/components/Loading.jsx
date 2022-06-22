import React from "react";

import loadingImg from '../assets/images/loading.gif';

import '../styles/loading.css';

export function Loading() {
  return (
    <div className="loading">
      <img src={ loadingImg } alt="Carregando" />
    </div>
  );
}