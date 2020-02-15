import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import Fuse from "fuse.js";

import { categorias, quartos, subBairros } from "./params";

const generateTokens = (value, fuse, regex) => {
  return value
    .split(regex)
    .filter(
      item =>
        /\S/.test(item) &&
        item !== undefined &&
        item.length > 2 &&
        item !== "com"
    )
    .map(token =>
      fuse.search(token).map(param => (
        <li key={Math.random()} style={{ textAlign: "left" }}>
          {JSON.stringify({ token, ...param }, null, 2)}
        </li>
      ))
    );
};

const generateCategoriaTokens = value => {
  const categoriasFuse = new Fuse(categorias, {
    includeScore: true,
    threshold: 0.2,
    shouldSort: true,
    keys: ["categoria"]
  });

  return generateTokens(value, categoriasFuse, /\s|(\d\s*\S*)/);
};

const generateQuartoTokens = value => {
  const quartosFuse = new Fuse(quartos, {
    includeScore: true,
    threshold: 0.1,
    shouldSort: true,
    keys: ["quarto"]
  });

  return generateTokens(value, quartosFuse, /\s|(\d\s*\S*)/);
};

const generateSubBairroTokens = value => {
  const subBairrosFuse = new Fuse(subBairros, {
    includeScore: true,
    threshold: 0.2,
    keys: ["subBairro"]
  });

  return subBairrosFuse.search(value.split(/no\s|na\s|em\s/)[0]).map(
    subBairro =>
      subBairro && (
        <li key={Math.random()} style={{ textAlign: "left" }}>
          {JSON.stringify({ token: value, ...subBairro }, null, 2)}
        </li>
      )
  );
};

const Results = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <input type="search" onChange={e => setValue(e.target.value)} />
      <ul>
        {generateCategoriaTokens(value)}
        {generateQuartoTokens(value)}
        {generateSubBairroTokens(value)}
      </ul>
    </>
  );
};

export default Results;
