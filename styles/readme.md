A la racine de l'app main.jsx / index.jsx

<!-- import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; -->

import "./sass/main.scss";

<!-- ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); -->

header/
| Header.jsx
| header.scss

<!-- ------------------------ -->

Style module modulaire sass

header/
| Header.jsx
| header.module.scss

<!-- dans Header.jsx -->

import styles from "./header.module.scss"

<h1 clasName={styles.h1}></h1>
<h2 clasName={`${styles.h2} ${styles.red}`}></h2>
 
<!-- dans header.module.scss -->
.h1 {
}
.h2 {
    &.red { }
}

<!------------------------------- Pour les variables  -->
 <!--  Dans variables.scss -->

$primary-color: #007bff;
$secondary-color: #6c757d;

<!-- ------ -->

 <!--Dans  header.module.scss -->

@use 'variables' as \*;

.header {
background-color: $primary-color;
color: $secondary-color;
}
