import { Formik, Form, Field } from 'formik';
import './css/index.css';
import './css/header.css';
import { useState } from 'react';

function App() {
  const [photos, setPhotos] = useState([]);
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
    </div>
  );
}

export default App;
