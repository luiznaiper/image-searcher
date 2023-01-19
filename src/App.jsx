import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './css/index.css';
import './css/header.css';
import './css/content.css';
import './css/article.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const open = (url) => window.open(url);
  console.log({ photos });

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization: `Client-ID ${import.meta.env.VITE_CLIENT_ID}`,
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <h1>Image Searcher (No Responsive)</h1>
      <p>Images from unsplash API</p>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
