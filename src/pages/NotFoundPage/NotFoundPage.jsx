import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={css.page}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/" className={css.link}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

export default NotFoundPage;
